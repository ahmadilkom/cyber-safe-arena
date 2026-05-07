"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, UserCircle, Home } from 'lucide-react';

export default function TeacherLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials for MVP
    if (username === 'guru' && password === 'admin123') {
      localStorage.setItem('teacher_auth', 'true');
      router.push('/teacher/dashboard');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <main className="page-container">
      <div className="glass-panel max-w-md w-full" style={{ padding: '2.5rem' }}>
        <h2 className="text-gradient text-center mb-1" style={{ fontSize: '2rem' }}>Portal Guru</h2>
        <p className="text-center text-secondary mb-4">Silakan login untuk memantau nilai siswa</p>

        {error && (
          <div style={{ background: 'rgba(231, 76, 60, 0.2)', border: '1px solid var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: 'white', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div style={{ position: 'relative' }}>
              <UserCircle size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                id="username"
                type="text"
                className="input-field w-full"
                style={{ paddingLeft: '40px' }}
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                id="password"
                type="password"
                className="input-field w-full"
                style={{ paddingLeft: '40px' }}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#000',
              background: 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(102, 252, 241, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(102, 252, 241, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(102, 252, 241, 0.4)';
            }}
          >
            Masuk ke Portal
          </button>
        </form>
        
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
