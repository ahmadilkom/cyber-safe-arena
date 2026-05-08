"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, Shield, Globe, MessageSquare, 
  Search, Lock, ArrowLeft, PlayCircle, Play, Video,
  Cpu, Users, Heart, CheckCircle2, LockIcon
} from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const materiData = [
  {
    id: 'kecakapan',
    title: 'KECAKAPAN DIGITAL',
    icon: Cpu,
    color: 'var(--accent-cyan)',
    content: [
      { subtitle: 'Penggunaan Perangkat', text: 'Kemampuan menggunakan perangkat keras dan lunak serta sistem operasi untuk aktivitas harian.' },
      { subtitle: 'Mesin Pencari Informasi', text: 'Keterampilan mencari, menyaring, dan memilah informasi yang akurat dari mesin pencari seperti Google.' },
      { subtitle: 'Transaksi Digital', text: 'Memahami cara menggunakan dompet digital, e-commerce, dan perbankan digital dengan benar.' }
    ],
    caseStudy: {
      title: 'Belanja Online Bijak',
      scenario: 'Budi ingin membeli sepatu diskon 70% di sebuah toko online baru yang belum punya rating. Harga aslinya 1 juta, tapi dijual hanya 300 ribu.',
      lesson: 'Kecakapan digital mengajarkan Budi untuk mengecek kredibilitas toko, membaca ulasan pembeli lain, dan tidak mudah tergiur harga yang tidak masuk akal sebelum bertransaksi.'
    }
  },
  {
    id: 'budaya',
    title: 'BUDAYA DIGITAL',
    icon: Globe,
    color: 'var(--accent-purple)',
    content: [
      { subtitle: 'Cinta Produk Indonesia', text: 'Mempromosikan dan mengonsumsi produk serta karya seni budaya dalam negeri melalui ruang digital.' },
      { subtitle: 'Pancasila & Bhinneka Tunggal Ika', text: 'Menerapkan nilai-nilai luhur bangsa dalam berinteraksi dengan sesama warga di internet.' },
      { subtitle: 'Hak Digital', text: 'Memahami hak-hak kita sebagai warga digital sekaligus menghargai hak cipta dan privasi orang lain.' }
    ],
    caseStudy: {
      title: 'Menjaga Persatuan di Sosmed',
      scenario: 'Siti melihat sebuah postingan video tarian daerah yang diejek oleh beberapa netizen di kolom komentar dengan kata-kata kasar.',
      lesson: 'Budaya digital mendorong Siti untuk tidak ikut mengejek, melainkan memberikan komentar positif yang mengapresiasi keberagaman budaya Indonesia sesuai nilai Pancasila.'
    }
  },
  {
    id: 'etika',
    title: 'ETIKA DIGITAL',
    icon: Heart,
    color: '#facc15',
    content: [
      { subtitle: 'Netiket (Netiquette)', text: 'Tata krama berkomunikasi di dunia maya. Gunakan bahasa yang sopan dan tidak menyinggung.' },
      { subtitle: 'Hindari Hoaks & Hate Speech', text: 'Berhenti menyebarkan berita bohong atau ujaran kebencian yang dapat memecah belah bangsa.' },
      { subtitle: 'Interaksi Positif', text: 'Membangun komunitas digital yang sehat dengan saling mendukung dan menghargai perbedaan.' }
    ],
    caseStudy: {
      title: 'Candaan yang Melampaui Batas',
      scenario: 'Di grup WhatsApp kelas, seorang siswa mengirim foto memalukan teman lain yang sedang tidur di kelas sebagai bahan tertawaan.',
      lesson: 'Etika digital mengingatkan kita bahwa privasi orang lain harus dihormati. Kita tidak boleh menyebarkan konten yang merugikan atau mempermalukan orang lain meskipun niatnya bercanda.'
    }
  },
  {
    id: 'keamanan',
    title: 'KEAMANAN DIGITAL',
    icon: Shield,
    color: 'var(--danger)',
    content: [
      { subtitle: 'Proteksi Perangkat', text: 'Menggunakan kata sandi kuat, antivirus, dan pembaruan sistem untuk menjaga perangkat dari malware.' },
      { subtitle: 'Proteksi Data Pribadi', text: 'Tidak membagikan informasi sensitif seperti NIK, nomor HP, atau lokasi rumah kepada orang asing.' },
      { subtitle: 'Keamanan Transaksi', text: 'Waspada terhadap penipuan online dan selalu gunakan verifikasi dua langkah (2FA).' }
    ],
    caseStudy: {
      title: 'Waspada Link Hadiah Palsu',
      scenario: 'Andi menerima pesan dari nomor asing yang menyatakan ia menang hadiah iPhone 15. Ia diminta mengklik link dan memasukkan ID serta Password akun media sosialnya.',
      lesson: 'Keamanan digital mengajarkan Andi untuk waspada terhadap teknik Phishing. Jangan pernah memberikan password kepada siapapun dan selalu cek kebenaran informasi dari sumber resmi.'
    }
  },
  {
    id: 'video',
    title: 'VIDEO LITERASI',
    icon: Video,
    color: '#ff0000',
    isVideo: true,
    content: []
  }
];

export default function MateriLiterasi() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(materiData[0].id);
  const [finishedTabs, setFinishedTabs] = useState<string[]>([]);
  const [isYouTubeFinished, setIsYouTubeFinished] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        new window.YT.Player('youtube-player', {
          events: {
            'onStateChange': (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                setIsYouTubeFinished(true);
              }
            }
          }
        });
      };
    } else {
      // Re-initialize if already loaded (for tab switching)
      setTimeout(() => {
        if (activeTab === 'video') {
          new window.YT.Player('youtube-player', {
            events: {
              'onStateChange': (event: any) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  setIsYouTubeFinished(true);
                }
              }
            }
          });
        }
      }, 500);
    }
  }, [activeTab]);

  useEffect(() => {
    const saved = localStorage.getItem('finished_materi_tabs');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFinishedTabs(parsed);
      if (parsed.includes('video')) {
        setIsYouTubeFinished(true);
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    // Reset timer when switching tabs
    if (!finishedTabs.includes(activeTab) && activeTab !== 'video') {
      setCountdown(60);
    } else {
      setCountdown(0);
    }
  }, [activeTab, finishedTabs]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleMarkAsFinished = (id: string) => {
    if (!finishedTabs.includes(id)) {
      const newFinished = [...finishedTabs, id];
      setFinishedTabs(newFinished);
      localStorage.setItem('finished_materi_tabs', JSON.stringify(newFinished));
      
      // If all finished, set the global flag
      if (newFinished.length === materiData.length) {
        localStorage.setItem('materi_finished', 'true');
      }
    }
  };

  const isTabLocked = (id: string) => {
    const index = materiData.findIndex(m => m.id === id);
    if (index === 0) return false;
    return !finishedTabs.includes(materiData[index - 1].id);
  };

  const isAllFinished = finishedTabs.length === materiData.length;
  const currentMateri = materiData.find(m => m.id === activeTab) || materiData[0];

  return (
    <main className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
      <div className="w-full max-w-6xl px-4">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <button 
            onClick={() => router.push('/')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '10px',
              color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ArrowLeft size={18} /> Beranda
          </button>
          <div style={{ textAlign: 'right' }}>
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>4 Pilar Literasi Digital</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Panduan lengkap untuk generasi digital Indonesia</p>
          </div>
        </div>

        <div className="flex-mobile-col" style={{ display: 'flex', gap: '2rem', flexDirection: 'row' }}>
          
          {/* Navigation Tabs */}
          <div style={{ 
            flex: '1', 
            minWidth: '280px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }} className="materi-tabs-container">
            {materiData.map((m) => {
              const Icon = m.icon;
              const isActive = activeTab === m.id;
              const isFinished = finishedTabs.includes(m.id);
              const isLocked = isTabLocked(m.id);
              
              return (
                <button
                  key={m.id}
                  onClick={() => !isLocked && setActiveTab(m.id)}
                  disabled={isLocked}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    padding: '1.2rem',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: isActive ? m.color : isLocked ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                    background: isActive ? `${m.color}15` : isLocked ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.02)',
                    textAlign: 'left',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isActive ? `0 0 20px ${m.color}25` : 'none',
                    position: 'relative',
                    opacity: isLocked ? 0.4 : 1
                  }}
                >
                  <div style={{ 
                    background: isActive ? m.color : 'rgba(255,255,255,0.1)', 
                    padding: '10px', 
                    borderRadius: '12px',
                    color: isActive ? '#000' : isLocked ? 'rgba(255,255,255,0.2)' : '#fff',
                    transition: 'all 0.4s'
                  }}>
                    {isLocked ? <LockIcon size={24} /> : <Icon size={24} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem', 
                      color: isActive ? m.color : isLocked ? 'rgba(255,255,255,0.2)' : '#fff',
                      letterSpacing: '0.05em'
                    }}>{m.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                      {isFinished ? 'Selesai Dibaca' : isLocked ? 'Materi Terkunci' : 'Sedang Dipelajari'}
                    </div>
                  </div>
                  {isFinished && (
                    <div style={{ color: 'var(--success)', opacity: 0.8 }}>
                      <CheckCircle2 size={18} />
                    </div>
                  )}
                </button>
              );
            })}

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Heart size={16} color="var(--accent-purple)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Tahukah Kamu?</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                Indeks Literasi Digital Indonesia terus meningkat! Dengan belajar 4 pilar ini, kamu ikut membangun ruang siber yang sehat.
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ flex: '2', minWidth: '350px' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ width: '4px', height: '32px', background: currentMateri.color, borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '2rem', margin: 0, letterSpacing: '0.02em' }}>{currentMateri.title}</h2>
              </div>

              {currentMateri.isVideo ? (
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Tonton video ini untuk memahami konsep literasi digital secara visual:
                  </p>
                  <div style={{ 
                    position: 'relative', 
                    paddingBottom: '56.25%', 
                    height: 0, 
                    overflow: 'hidden', 
                    borderRadius: '16px',
                    boxShadow: `0 0 30px rgba(0,0,0,0.5), 0 0 10px ${currentMateri.color}20`,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <iframe
                      id="youtube-player"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none'
                      }}
                      src="https://www.youtube.com/embed/ThCcmEbBLc8?enablejsapi=1"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
                  {currentMateri.content.map((item, idx) => (
                    <div key={idx} style={{ 
                      position: 'relative', 
                      padding: '1.5rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'transform 0.3s'
                    }}>
                      <div style={{ 
                        position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', 
                        width: '20px', height: '2px', background: currentMateri.color,
                        boxShadow: `0 0 10px ${currentMateri.color}`
                      }}></div>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: currentMateri.color, fontWeight: '700' }}>{item.subtitle}</h3>
                      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {currentMateri.caseStudy && (
                <div style={{ 
                  marginTop: '2.5rem', 
                  padding: '2rem', 
                  background: 'rgba(250, 204, 21, 0.05)', 
                  borderRadius: '20px', 
                  border: '1px dashed rgba(250, 204, 21, 0.3)',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute', top: '-12px', left: '20px', 
                    background: '#facc15', color: '#000', padding: '4px 12px', 
                    borderRadius: '8px', fontSize: '0.75rem', fontWeight: '900',
                    letterSpacing: '0.1em'
                  }}>
                    STUDI KASUS NYATA
                  </div>
                  <h4 style={{ color: '#facc15', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{currentMateri.caseStudy.title}</h4>
                  <p style={{ color: '#fff', fontSize: '1rem', fontStyle: 'italic', marginBottom: '1rem', lineHeight: '1.5' }}>
                    "{currentMateri.caseStudy.scenario}"
                  </p>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid #facc15' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
                      <strong>Pelajaran:</strong> {currentMateri.caseStudy.lesson}
                    </p>
                  </div>
                </div>
              )}

              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {!finishedTabs.includes(activeTab) && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Only show circle if there is text to show */}
                      {(!currentMateri.isVideo || !isYouTubeFinished) && (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentMateri.color, animation: 'pulse 1s infinite' }}></div>
                      )}
                      
                      {currentMateri.isVideo 
                        ? (!isYouTubeFinished ? 'Selesaikan menonton video untuk membuka tombol' : '')
                        : 'Baca materi ini sampai tuntas'}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  {!finishedTabs.includes(activeTab) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button
                        onClick={() => handleMarkAsFinished(activeTab)}
                        disabled={(currentMateri.isVideo && !isYouTubeFinished) || countdown > 0}
                        style={{
                          padding: '1rem 2rem',
                          borderRadius: '12px',
                          background: ((currentMateri.isVideo && !isYouTubeFinished) || countdown > 0) ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                          color: ((currentMateri.isVideo && !isYouTubeFinished) || countdown > 0) ? 'rgba(255,255,255,0.2)' : '#fff',
                          fontWeight: '700',
                          border: '1px solid',
                          borderColor: ((currentMateri.isVideo && !isYouTubeFinished) || countdown > 0) ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                          cursor: ((currentMateri.isVideo && !isYouTubeFinished) || countdown > 0) ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          if (!((currentMateri.isVideo && !isYouTubeFinished) || countdown > 0)) {
                            e.currentTarget.style.background = `${currentMateri.color}20`;
                            e.currentTarget.style.borderColor = currentMateri.color;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!((currentMateri.isVideo && !isYouTubeFinished) || countdown > 0)) {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          }
                        }}
                      >
                        {countdown > 0 ? `Tunggu (${countdown}s)` : 
                         (currentMateri.isVideo && !isYouTubeFinished ? 'Sedang Menonton...' : 'Sudah Selesai Dipelajari')}
                      </button>
                    </div>
                  ) : activeTab === materiData[materiData.length - 1].id ? (
                    <button
                      onClick={() => router.push('/student/login')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '1rem 2.5rem',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)',
                        color: '#000',
                        fontWeight: '900',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        boxShadow: '0 0 20px rgba(102, 252, 241, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 0 35px rgba(102, 252, 241, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(102, 252, 241, 0.4)';
                      }}
                    >
                      <PlayCircle size={22} /> MULAI BERMAIN
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const idx = materiData.findIndex(m => m.id === activeTab);
                        setActiveTab(materiData[idx + 1].id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '1rem 2rem',
                        borderRadius: '12px',
                        background: 'rgba(102, 252, 241, 0.1)',
                        color: 'var(--accent-cyan)',
                        fontWeight: '700',
                        border: '1px solid var(--accent-cyan)',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 0 15px rgba(102, 252, 241, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--accent-cyan)';
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(102, 252, 241, 0.1)';
                        e.currentTarget.style.color = 'var(--accent-cyan)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Lanjut ke Materi Berikutnya <Play size={18} fill="currentColor" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.4; transform: scale(0.8); }
        }
        @media (max-width: 768px) {
          .materi-tabs-container {
            flex-direction: row !important;
            min-width: 100% !important;
            padding: 4px;
          }
          .materi-tabs-container button {
            min-width: 200px;
            flex-shrink: 0;
          }
        }
      `}} />
    </main>
  );
}
