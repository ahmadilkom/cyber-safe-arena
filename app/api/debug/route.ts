import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase.from('students').select('*').limit(1);
    if (error) throw error;
    return NextResponse.json({ sample: data[0], columns: data[0] ? Object.keys(data[0]) : [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
