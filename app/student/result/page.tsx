"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Home, RotateCcw, Skull, Medal, Users } from 'lucide-react';

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
          
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>SKOR ANDA</h3>
            <div style={{ 
              fontSize: '4.5rem', 
              fontWeight: '900', 
              lineHeight: '1', 
              color: '#ffffff',
              textShadow: isGameOver ? '0 0 15px rgba(231, 76, 60, 0.8)' : '0 0 15px rgba(46, 204, 113, 0.8)'
            }}>
              {score}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                padding: '1rem', borderRadius: '14px', border: 'none',
                background: isGameOver ? 'linear-gradient(135deg, #e74c3c, #8e44ad)' : 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)',
                color: isGameOver ? '#ffffff' : '#000000',
                fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
              onClick={() => {
                localStorage.removeItem('student_score');
                localStorage.removeItem('student_status');
                router.push('/student/game');
              }}
            >
              <RotateCcw size={18} /> ULANGI
            </button>
            
            <button 
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                padding: '1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: '#fff',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
            >
              <Home size={18} /> BERANDA
            </button>
          </div>
        </div>

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
