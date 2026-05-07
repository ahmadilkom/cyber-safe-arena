"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, RefreshCw, Trophy, Users, Trash2, AlertTriangle, Search } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  class_name: string;
  score: number;
  played_at: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('teacher_auth');
    if (!isAuth) {
      router.push('/teacher/login');
      return;
    }

    fetchStudents();
  }, [router]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      if (data.students) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Failed to fetch students', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('teacher_auth');
    router.push('/');
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/students?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStudents(students.filter(s => s.id !== id));
        setShowDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Failed to delete student', error);
      alert('Gagal menghapus data.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetAll = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/students?all=true`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStudents([]);
        setShowResetConfirm(false);
      }
    } catch (error) {
      console.error('Failed to reset data', error);
      alert('Gagal mereset data.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading && students.length === 0) {
    return (
      <main className="page-container">
        <div className="text-gradient font-bold text-2xl">Memuat data...</div>
      </main>
    );
  }

  const averageScore = students.length > 0 
    ? Math.round(students.reduce((acc, curr) => acc + curr.score, 0) / students.length)
    : 0;

  return (
    <main className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '4rem' }}>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gradient m-0" style={{ fontSize: '2.5rem' }}>Dashboard Guru</h1>
          <button 
            onClick={() => setShowLogoutConfirm(true)} 
            className="btn-secondary" 
            style={{ 
              padding: '10px 20px', 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--danger)';
              e.currentTarget.style.borderColor = 'var(--danger)';
              e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            <LogOut size={16} /> KELUAR
          </button>
        </div>

        <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
          <div className="glass-panel" style={{ flex: '1', minWidth: '200px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(102, 252, 241, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <Users size={32} color="var(--accent-cyan)" />
            </div>
            <div>
              <p className="text-secondary mb-1" style={{ fontSize: '0.9rem' }}>Total Siswa Bermain</p>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{students.length}</h2>
            </div>
          </div>
          
          <div className="glass-panel" style={{ flex: '1', minWidth: '200px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(155, 81, 224, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <Trophy size={32} color="var(--accent-purple)" />
            </div>
            <div>
              <p className="text-secondary mb-1" style={{ fontSize: '0.9rem' }}>Rata-rata Skor</p>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{averageScore}</h2>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' }}>
              <h3 style={{ margin: 0, whiteSpace: 'nowrap' }}>Daftar Nilai Siswa</h3>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="text" 
                  placeholder="Cari nama siswa..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 38px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(102, 252, 241, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setShowResetConfirm(true)} 
                className="btn-secondary" 
                style={{ 
                  padding: '8px 16px', 
                  border: '1px solid rgba(231, 76, 60, 0.3)', 
                  background: 'rgba(231, 76, 60, 0.05)', 
                  color: 'var(--danger)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Trash2 size={16} /> Reset Semua
              </button>
              <button onClick={fetchStudents} className="btn-secondary" style={{ padding: '8px 16px', border: 'none', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} /> Refresh
              </button>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Nama Siswa</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Kelas</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Skor</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Waktu Bermain</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      {searchTerm ? `Tidak ada siswa dengan nama "${searchTerm}"` : 'Belum ada siswa yang bermain.'}
                    </td>
                  </tr>
                ) : (
                  students
                    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((student) => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{student.name}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{student.class_name}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          background: student.score >= 200 ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)',
                          color: student.score >= 200 ? 'var(--success)' : 'var(--danger)',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }}>
                          {student.score}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {new Date(student.played_at).toLocaleString('id-ID')}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => setShowDeleteConfirm(student.id)}
                          style={{
                            background: 'rgba(231, 76, 60, 0.1)',
                            border: '1px solid rgba(231, 76, 60, 0.2)',
                            color: 'var(--danger)',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(231, 76, 60, 0.2)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          title="Hapus Data"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'var(--bg-color)', border: '2px solid var(--accent-cyan)', borderRadius: '24px', padding: '2.5rem', maxWidth: '360px', width: '95%', textAlign: 'center', boxShadow: '0 0 60px rgba(102, 252, 241, 0.4)' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(102, 252, 241, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(102, 252, 241, 0.3)' }}>
                <AlertTriangle size={40} color="var(--accent-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.75rem', color: '#fff' }}>KELUAR DASHBOARD?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Anda harus login kembali untuk mengakses data nilai siswa.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>BATAL</button>
                <button onClick={handleLogout} style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, var(--danger), #c0392b)', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>YA, KELUAR</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'var(--bg-color)', border: '2px solid var(--danger)', borderRadius: '24px', padding: '2.5rem', maxWidth: '360px', width: '95%', textAlign: 'center', boxShadow: '0 0 60px rgba(231, 76, 60, 0.3)' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(231, 76, 60, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(231, 76, 60, 0.3)' }}>
                <Trash2 size={40} color="var(--danger)" />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.75rem', color: '#fff' }}>HAPUS DATA SISWA?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Tindakan ini tidak dapat dibatalkan. Data nilai siswa akan hilang selamanya.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowDeleteConfirm(null)} style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>BATAL</button>
                <button 
                  onClick={() => handleDelete(showDeleteConfirm)} 
                  disabled={isDeleting}
                  style={{ 
                    flex: 1, 
                    padding: '0.85rem', 
                    borderRadius: '12px', 
                    border: 'none', 
                    background: 'linear-gradient(135deg, #e74c3c, #c0392b)', 
                    color: '#fff', 
                    fontWeight: '700', 
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    opacity: isDeleting ? 0.7 : 1
                  }}
                >
                  {isDeleting ? 'MENGHAPUS...' : 'HAPUS DATA'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset All Confirmation Modal */}
        {showResetConfirm && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'var(--bg-color)', border: '2px solid var(--danger)', borderRadius: '24px', padding: '3rem 2.5rem', maxWidth: '400px', width: '95%', textAlign: 'center', boxShadow: '0 0 80px rgba(231, 76, 60, 0.5)' }}>
              <div style={{ width: '90px', height: '90px', backgroundColor: 'rgba(231, 76, 60, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '2px solid var(--danger)', animation: 'pulse-red 2s infinite' }}>
                <AlertTriangle size={48} color="var(--danger)" />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: '#fff', letterSpacing: '0.05em' }}>RESET SELURUH DATA?</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                Tindakan ini akan <strong style={{ color: 'var(--danger)' }}>MENGHAPUS PERMANEN</strong> semua nilai siswa yang ada. Data yang sudah dihapus tidak dapat dikembalikan.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowResetConfirm(false)} style={{ flex: 1, padding: '1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>BATAL</button>
                <button 
                  onClick={handleResetAll} 
                  disabled={isDeleting}
                  style={{ 
                    flex: 1, 
                    padding: '1rem', 
                    borderRadius: '14px', 
                    border: 'none', 
                    background: 'linear-gradient(135deg, #ff4757, #ff6b81)', 
                    color: '#fff', 
                    fontWeight: '800', 
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 0 25px rgba(255, 71, 87, 0.5)'
                  }}
                >
                  {isDeleting ? 'MERESET...' : 'YA, RESET SEMUA'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(231, 76, 60, 0); }
          100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        tr:hover {
          background: rgba(255,255,255,0.02);
        }
      `}} />
    </main>
  );
}
