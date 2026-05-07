"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Users, Home, Lock } from 'lucide-react';

const avatars = [
  { id: 'Alpha', label: 'ALPHA', seed: 'Alpha' },
  { id: 'Nexus', label: 'NEXUS', seed: 'Nexus' },
  { id: 'Prime', label: 'PRIME', seed: 'Prime' }
];

export default function StudentLogin() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('Alpha');
  const [isLoading, setIsLoading] = useState(false);
  const [materiFinished, setMateriFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const finished = localStorage.getItem('materi_finished') === 'true';
    setMateriFinished(finished);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (materiFinished && name.trim() && className.trim()) {
      localStorage.setItem('student_name', name);
      localStorage.setItem('student_class', className);
      localStorage.setItem('student_avatar', selectedAvatar);
      router.push('/student/game');
    }
  };

  return (
    <main className="page-container">
      <div className="glass-panel max-w-md w-full" style={{ padding: '2.5rem' }}>
        <h2 className="text-gradient text-center mb-1" style={{ fontSize: '2rem' }}>Siap Bermain?</h2>
        <p className="text-center text-secondary mb-4">Masukkan data diri Anda untuk memulai</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-8">
            <label className="text-secondary text-xs font-black tracking-widest uppercase mb-3 block">Pilih Unit Tempur</label>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', flexWrap: 'wrap' }}>
              {avatars.map((av) => (
                <button 
                  type="button"
                  key={av.id}
                  onClick={() => setSelectedAvatar(av.seed)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.5s ease',
                    border: '2px solid',
                    borderColor: selectedAvatar === av.seed ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                    backgroundColor: selectedAvatar === av.seed ? 'rgba(102,252,241,0.1)' : 'transparent',
                    boxShadow: selectedAvatar === av.seed ? '0 0 30px rgba(102,252,241,0.4)' : 'none',
                    transform: selectedAvatar === av.seed ? 'scale(1.1)' : 'scale(1)',
                    zIndex: selectedAvatar === av.seed ? 10 : 1
                  }}
                >
                  <div className={selectedAvatar === av.seed ? 'animate-pulse' : ''} style={{ position: 'relative' }}>
                    {selectedAvatar === av.seed && (
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--accent-cyan)', filter: 'blur(20px)', opacity: 0.4, borderRadius: '50%' }}></div>
                    )}
                    <img 
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${av.seed}&backgroundColor=transparent`} 
                      width={70} 
                      height={70} 
                      alt={av.label} 
                      style={{ position: 'relative', zIndex: 10 }}
                    />
                  </div>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: '900', 
                    letterSpacing: '-0.05em', 
                    marginTop: '0.75rem', 
                    color: selectedAvatar === av.seed ? 'var(--accent-cyan)' : 'var(--text-secondary)' 
                  }}>
                    {av.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                id="name"
                type="text"
                className="input-field w-full"
                style={{ paddingLeft: '40px' }}
                placeholder="Ketikkan nama lengkap" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-6">
            <label htmlFor="className">Kelas</label>
            <div style={{ position: 'relative' }}>
              <Users size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                id="className"
                type="text"
                className="input-field w-full"
                style={{ paddingLeft: '40px' }}
                placeholder="Ketikkan kelas (contoh: 9.1)" 
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            </div>
          </div>

          {!materiFinished && (
            <div style={{ 
              background: 'rgba(231, 76, 60, 0.1)', 
              border: '1px solid var(--danger)', 
              padding: '1rem', 
              borderRadius: '12px', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Lock size={20} color="var(--danger)" />
              <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0 }}>
                Oops! Kamu harus menyelesaikan <strong>semua materi</strong> terlebih dahulu sebelum bisa bermain.
              </p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading || !materiFinished}
            style={{
              width: '100%',
              padding: '1.2rem',
              fontSize: '1.1rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#000',
              background: materiFinished 
                ? 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)' 
                : 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '16px',
              cursor: (isLoading || !materiFinished) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: materiFinished ? '0 0 20px rgba(102, 252, 241, 0.4)' : 'none',
              opacity: (isLoading || !materiFinished) ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading && materiFinished) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(102, 252, 241, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && materiFinished) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(102, 252, 241, 0.4)';
              }
            }}
          >
            {isLoading ? 'MEMPROSES...' : materiFinished ? 'MASUK KE ARENA' : 'MATERI BELUM SELESAI'}
          </button>
        </form>
        
        {!materiFinished && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button 
              onClick={() => router.push('/student/materi')}
              style={{
                background: 'rgba(102, 252, 241, 0.1)',
                border: '1px solid var(--accent-cyan)',
                color: 'var(--accent-cyan)',
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 252, 241, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(102, 252, 241, 0.1)'}
            >
              PELAJARI MATERI SEKARANG
            </button>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button 
            type="button" 
            onClick={() => router.push('/')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-cyan)';
              e.currentTarget.style.background = 'rgba(102, 252, 241, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Home size={16} />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>
  );
}
