"use client";

import Link from 'next/link';
import { Shield, BookOpen, Lock, Info, CheckCircle2, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [materiFinished, setMateriFinished] = useState(false);

  useEffect(() => {
    const finished = localStorage.getItem('materi_finished') === 'true';
    setMateriFinished(finished);
  }, []);

  return (
    <main className="page-container">
      <div className="glass-panel max-w-4xl text-center" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Shield size={64} color="var(--accent-cyan)" />
        </div>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          CyberSafe
        </h1>
        <p className="mb-4 text-secondary" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Jelajahi dunia digital dengan aman. Pelajari literasi digital melalui skenario interaktif dan tingkatkan kesadaran keamanan siber Anda.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center' }}>
          <Link href="/student/materi" style={{ textDecoration: 'none', width: '100%', maxWidth: '320px' }}>
            <button 
              style={{ 
                width: '100%', 
                padding: '1.2rem', 
                borderRadius: '16px', 
                border: 'none', 
                background: 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)', 
                color: '#000', 
                fontWeight: '800', 
                fontSize: '1.2rem', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                boxShadow: '0 0 20px rgba(102, 252, 241, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(102, 252, 241, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(102, 252, 241, 0.4)';
              }}
            >
              <BookOpen size={24} />
              BELAJAR MATERI
            </button>
          </Link>

          <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '400px', justifyContent: 'center' }}>
            <Link href={materiFinished ? "/student/login" : "#"} style={{ textDecoration: 'none', flex: 1 }}>
              <button 
                disabled={!materiFinished}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  border: '1px solid',
                  borderColor: materiFinished ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', 
                  background: materiFinished ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.3)', 
                  color: materiFinished ? '#fff' : 'rgba(255,255,255,0.15)', 
                  fontWeight: '600', 
                  cursor: materiFinished ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: materiFinished ? 'none' : 'inset 0 0 10px rgba(0,0,0,0.5)'
                }}
                onMouseEnter={(e) => {
                  if (materiFinished) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (materiFinished) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }
                }}
              >
                {!materiFinished ? <Lock size={16} opacity={0.5} /> : null}
                Mulai Bermain
              </button>
            </Link>
            
            <Link href="/teacher/login" style={{ textDecoration: 'none', flex: 1 }}>
              <button 
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  background: 'rgba(255,255,255,0.05)', 
                  color: '#fff', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                Portal Guru
              </button>
            </Link>
          </div>
          
          {!materiFinished && (
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--accent-cyan)', 
              marginTop: '1rem', 
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block' }}></span>
              Kunci bermain akan terbuka setelah materi selesai dipelajari
            </p>
          )}
        </div>

        {/* Petunjuk Bermain Section */}
        <div style={{ marginTop: '4rem', textAlign: 'left', width: '100%', maxWidth: '800px', margin: '4rem auto 0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
            <Info size={24} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Petunjuk Operasi</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '4rem', fontWeight: '900', opacity: 0.05, color: '#fff' }}>01</div>
              <div style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}><BookOpen size={28} /></div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>PELAJARI MODUL</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Baca 4 Pilar Literasi Digital dan tonton video edukasi untuk membekali diri sebelum bertarung.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '4rem', fontWeight: '900', opacity: 0.05, color: '#fff' }}>02</div>
              <div style={{ marginBottom: '1rem', color: 'var(--accent-purple)' }}><CheckCircle2 size={28} /></div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>SELESAIKAN MISI</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Konfirmasi setiap modul yang telah dipelajari untuk membuka kunci akses ke Battle Arena.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '4rem', fontWeight: '900', opacity: 0.05, color: '#fff' }}>03</div>
              <div style={{ marginBottom: '1rem', color: '#facc15' }}><Zap size={28} /></div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>MENANGKAN LEVEL</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Jawab pertanyaan kuis dengan benar untuk menyerang musuh dan meraih skor tertinggi!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Credits */}
        <footer style={{ 
          marginTop: '6rem', 
          padding: '2rem 0', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center',
          width: '100%'
        }}>
          <p style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            opacity: 0.5,
            letterSpacing: '0.05em',
            margin: 0
          }}>
            &copy; {new Date().getFullYear()} CyberSafe Arena
          </p>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#fff', 
            opacity: 0.8,
            marginTop: '0.5rem',
            fontWeight: '500'
          }}>
            Dikembangkan oleh <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>Ahmad Habibullaah</span>
          </p>
          <p style={{ 
            fontSize: '0.8rem', 
            color: 'var(--text-secondary)', 
            opacity: 0.6,
            marginTop: '0.2rem'
          }}>
            Guru Informatika SMP Global Madani
          </p>
        </footer>
      </div>
    </main>
  );
}
