"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Home, RotateCcw, Skull, Medal, Users, AlertTriangle } from 'lucide-react';

interface StudentData {
  id: number;
  name: string;
  class_name: string;
  avatar: string;
  score: number;
  played_at: string;
}

export default function StudentResult() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'victory' | 'game_over'>('victory');
  const [leaderboard, setLeaderboard] = useState<StudentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('student_name');
    const storedScore = localStorage.getItem('student_score');
    const storedStatus = localStorage.getItem('student_status') as 'victory' | 'game_over';
    
    if (!storedName) {
      router.push('/student/login');
      return;
    }

    setName(storedName);
    setScore(parseInt(storedScore || '0', 10));
    if (storedStatus) {
      setStatus(storedStatus);
    }

    // Fetch leaderboard
    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        if (data.students) {
          // Sort by score descending
          const sorted = data.students.sort((a: StudentData, b: StudentData) => b.score - a.score);
          setLeaderboard(sorted.slice(0, 10)); // Show top 10 now since it's vertical
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [router]);

  const isGameOver = status === 'game_over';

  return (
    <main className="page-container" style={{ padding: '4rem 1rem', overflowY: 'auto', display: 'block' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Result Card */}
        <div 
          className="glass-panel" 
          style={{ 
            width: '100%',
            maxWidth: '500px',
            padding: '3rem 2.5rem', 
            border: isGameOver ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid rgba(46, 204, 113, 0.3)',
            boxShadow: isGameOver ? '0 0 40px rgba(231, 76, 60, 0.2)' : '0 0 40px rgba(46, 204, 113, 0.2)',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {isGameOver ? (
              <div style={{ background: 'rgba(231, 76, 60, 0.15)', padding: '1.5rem', borderRadius: '50%' }}>
                <Skull size={64} color="var(--danger)" />
              </div>
            ) : (
              <div style={{ background: 'rgba(46, 204, 113, 0.15)', padding: '1.5rem', borderRadius: '50%' }}>
                <Trophy size={64} color="var(--success)" />
              </div>
            )}
          </div>
          
          <h2 className="mb-2" style={{ fontSize: '2.2rem', color: isGameOver ? '#ff7675' : 'var(--success)', fontWeight: '900' }}>
            {isGameOver ? 'MISI GAGAL!' : 'MISI BERHASIL!'}
          </h2>
          
          <p className="text-secondary mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            {isGameOver 
              ? `Sistem Anda telah diambil alih oleh peretas, ${name}. Jangan menyerah, pelajari kesalahan Anda dan coba lagi.`
              : `Luar biasa, ${name}! Anda telah menyelesaikan seluruh Misi Literasi Digital dengan aman.`}
          </p>
          
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '20px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>SKOR AKHIR</h3>
            <div style={{ 
              fontSize: '4.5rem', 
              fontWeight: '900', 
              lineHeight: '1', 
              color: score >= 20000 ? 'var(--success)' : '#ffffff',
              textShadow: score >= 20000 ? '0 0 20px rgba(46, 204, 113, 0.5)' : 'none'
            }}>
              {score.toLocaleString()}
            </div>
          </div>

          {/* Pesan Instruksi */}
          <div style={{ 
            background: score >= 20000 ? 'rgba(46, 204, 113, 0.05)' : 'rgba(231, 76, 60, 0.05)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            marginBottom: '2.5rem',
            border: score >= 20000 ? '1px solid rgba(46, 204, 113, 0.2)' : '1px solid rgba(231, 76, 60, 0.2)',
            textAlign: 'left'
          }}>
            {score >= 20000 ? (
              <>
                <p style={{ color: 'var(--success)', fontWeight: '800', marginBottom: '10px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Medal size={20} /> KRITERIA LULUS TERCAPAI
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Selamat! Meskipun misi Anda mungkin ada kendala, karena skor Anda sudah mencapai minimal <strong>20.000</strong>, Anda telah dinyatakan kompeten dan tidak perlu mengulangi permainan ini.
                  <br/><br/>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>📸 PENTING:</span> Silakan <strong>Screenshot</strong> halaman ini sekarang sebagai bukti dan kirimkan ke <strong>WhatsApp Guru</strong> Anda.
                </p>
              </>
            ) : (
              <>
                <p style={{ color: 'var(--danger)', fontWeight: '800', marginBottom: '10px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={20} /> SKOR BELUM MENCAPAI TARGET
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Maaf, skor Anda masih di bawah <strong>20.000</strong>. Anda harus mengulangi misi ini untuk mencapai standar kompetensi.
                  <br/><br/>
                  Gunakan tombol <strong>Ulangi Sekarang</strong> di bawah untuk langsung mencoba kembali. Jika Anda kembali ke beranda, maka progres belajar akan tereset dan Anda harus mengulang materi dari awal.
                </p>
              </>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={() => {
                localStorage.removeItem('student_score');
                localStorage.removeItem('student_status');
                router.push('/student/game');
              }}
              className="btn-primary"
              style={{ 
                width: '100%', gap: '12px', fontSize: '1.1rem', padding: '16px',
                background: score >= 20000 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)',
                color: score >= 20000 ? '#fff' : '#000',
                border: score >= 20000 ? '1px solid rgba(255,255,255,0.2)' : 'none'
              }}
            >
              <RotateCcw size={20} /> ULANGI SEKARANG
            </button>
            
            <button 
              onClick={() => setShowHomeConfirm(true)}
              className="btn-secondary"
              style={{ width: '100%', gap: '12px', padding: '14px' }}
            >
              <Home size={20} /> KEMBALI KE BERANDA
            </button>
          </div>
        </div>

        {/* Home Confirmation Modal */}
        {showHomeConfirm && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
          }}>
            <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '450px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ background: 'rgba(231, 76, 60, 0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <AlertTriangle size={36} color="var(--danger)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Yakin kembali ke Beranda?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                Jika Anda kembali ke Beranda, seluruh progres belajar Anda akan <strong>dihapus</strong>. Anda harus mengulang materi dari awal untuk bermain lagi.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setShowHomeConfirm(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Batal
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('materi_finished');
                    localStorage.removeItem('finished_materi_tabs');
                    router.push('/');
                  }}
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px', background: 'var(--danger)', color: '#fff', boxShadow: '0 0 15px rgba(231, 76, 60, 0.3)' }}
                >
                  Ya, Kembali
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Card (Now Below) */}
        <div 
          className="glass-panel" 
          style={{ 
            width: '100%',
            padding: '2.5rem', 
            border: '1px solid rgba(102, 252, 241, 0.1)',
            background: 'rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Medal color="var(--accent-cyan)" size={24} />
              <h2 style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '0.05em' }}>PAPAN SKOR GLOBAL</h2>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} /> 10 TERBAIK
            </div>
          </div>

          {isLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Mengunduh data arena...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {leaderboard.length > 0 ? leaderboard.map((player, idx) => (
                <div 
                  key={player.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    borderRadius: '16px',
                    background: player.name === name && player.score === score 
                      ? 'rgba(102, 252, 241, 0.1)' 
                      : 'rgba(255,255,255,0.02)',
                    border: player.name === name && player.score === score 
                      ? '1px solid var(--accent-cyan)' 
                      : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', 
                    background: idx === 0 ? '#f1c40f' : idx === 1 ? '#bdc3c7' : idx === 2 ? '#e67e22' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: idx < 3 ? '#000' : '#fff', fontWeight: 'bold', fontSize: '1rem'
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ 
                    width: '44px', height: '44px', borderRadius: '12px', overflow: 'hidden', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <img 
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.avatar}&backgroundColor=transparent`} 
                      alt="avatar"
                      width={44} height={44}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>{player.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                      KELAS: <span style={{ color: 'var(--accent-cyan)' }}>{player.class_name}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '900', color: 'var(--accent-cyan)', fontSize: '1.5rem', lineHeight: '1' }}>{player.score}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>POINTS</div>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  Belum ada unit tempur yang terdaftar di papan skor.
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
