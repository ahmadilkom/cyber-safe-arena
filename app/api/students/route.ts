import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, className, score, avatar, status } = body;

    if (!name || !className || score === undefined) {
      return NextResponse.json(
        { error: 'Name, className, and score are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          name,
          class_name: className,
          score,
          avatar: avatar || 'Alpha',
          status: status || 'game_over'
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Failed to save student data to Supabase:', error);
    return NextResponse.json(
      {
        error: 'Gagal menyimpan data ke Database Cloud',
        details: error.message || 'Cek koneksi Supabase Anda',
        hint: 'Pastikan tabel students sudah dibuat dan RLS diizinkan'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data: students, error } = await supabase
      .from('students')
      .select('*')
      .order('score', { ascending: false })
      .order('played_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json(
      { students },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error: any) {
    console.error('Failed to fetch students from Supabase:', error);
    return NextResponse.json(
      {
        error: 'Gagal mengambil data dari Database Cloud',
        details: error.message || 'Cek koneksi Supabase Anda',
        hint: 'Pastikan tabel students sudah dibuat di Supabase SQL Editor'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const all = searchParams.get('all');

    if (all === 'true') {
      const { error } = await supabase
        .from('students')
        .delete()
        .neq('id', 0); // Delete all rows

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Ensure id is treated as a number if it's numeric
    const numericId = !isNaN(Number(id)) ? Number(id) : id;

    const { error, count } = await supabase
      .from('students')
      .delete({ count: 'exact' })
      .eq('id', numericId);

    if (error) throw error;

    if (count === 0) {
      console.error(`Failed to delete: No student found with ID ${numericId}. This might be due to RLS policies.`);
      return NextResponse.json(
        { error: 'Data tidak ditemukan atau Anda tidak memiliki izin untuk menghapus.', count: 0 },
        { status: 404 }
      );
    }

    console.log(`Successfully deleted student with ID: ${id}, rows affected: ${count}`);
    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error('Failed to delete student from Supabase:', error);
    return NextResponse.json(
      { error: 'Failed to delete data', details: error.message },
      { status: 500 }
    );
  }
}
