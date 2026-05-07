"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle, ShieldCheck, Heart, Zap, Crosshair,
  Swords, SplitSquareHorizontal, FastForward, Wrench,
  User, Bug, Ghost, Skull, Bot, Volume2, VolumeX, Home
} from 'lucide-react';
import { allScenarios, Scenario } from '@/lib/questions';

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function Game() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);

  // Adventure Mechanics
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [shake, setShake] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Battle Animations
  const [attackAnimation, setAttackAnimation] = useState<'none' | 'hero_laser' | 'enemy_laser'>('none');
  const [playerName, setPlayerName] = useState('Alpha');
  const [isMuted, setIsMuted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lifelines
  const [fiftyFiftyCount, setFiftyFiftyCount] = useState(2);
  const [skipCount, setSkipCount] = useState(1);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [gameScenarios, setGameScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    const name = localStorage.getItem('student_name');
    if (!name) {
      router.push('/student/login');
      return;
    }
    
    const avatar = localStorage.getItem('student_avatar') || 'Hero';
    setPlayerName(avatar);

    // Audio initialization
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (!isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed, user interaction needed"));
    }

    const shuffledQuestions = shuffleArray(allScenarios).map(scenario => ({
      ...scenario,
      options: shuffleArray(scenario.options)
    }));

    setGameScenarios(shuffledQuestions);
  }, [router]);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed"));
      }
    }
  }, [isMuted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;

    setSelectedOption(optionIndex);
    setShowFeedback(true);

    const isCorrect = gameScenarios[currentStep].options[optionIndex].isCorrect;

    if (isCorrect) {
      if (!isMuted) new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3').play().catch(() => {});
      const points = 100 + (combo * 50); // Base 100 + 50 per combo streak
      setEarnedPoints(points);
      setScore(prev => prev + points);
      setCombo(prev => prev + 1);
      setAttackAnimation('hero_laser');
    } else {
      if (!isMuted) new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3').play().catch(() => {});
      setEarnedPoints(0);
      setCombo(0);
      setLives(prev => prev - 1);
      setAttackAnimation('enemy_laser');

      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleFiftyFifty = () => {
    if (fiftyFiftyCount <= 0 || showFeedback || hiddenOptions.length > 0) return;

    setFiftyFiftyCount(prev => prev - 1);

    const currentScenario = gameScenarios[currentStep];
    const incorrectIndices = currentScenario.options
      .map((opt, idx) => ({ opt, idx }))
      .filter(item => !item.opt.isCorrect)
      .map(item => item.idx);

    const shuffledIncorrect = shuffleArray(incorrectIndices);
    setHiddenOptions([shuffledIncorrect[0], shuffledIncorrect[1]]);
  };

  const handleSkip = () => {
    if (skipCount <= 0 || showFeedback) return;

    setSkipCount(prev => prev - 1);

    const correctIndex = gameScenarios[currentStep].options.findIndex(opt => opt.isCorrect);

    setSelectedOption(correctIndex);
    setShowFeedback(true);
    setAttackAnimation('hero_laser'); // Visual reward for bypassing

    const points = 100; // Base points, bypass doesn't trigger combo multiplier
    setEarnedPoints(points);
    setScore(prev => prev + points);
    setCombo(0); // Break the combo since it's a bypass
  };

  const handleNext = async () => {
    const isCorrect = gameScenarios[currentStep].options[selectedOption!].isCorrect;

    if (!isCorrect && lives === 0) {
      await finishGame('game_over');
      return;
    }

    if (currentStep < gameScenarios.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
      setHiddenOptions([]);
      setAttackAnimation('none'); // Reset animation
    } else {
      await finishGame('victory');
    }
  };

  const finishGame = async (status: 'victory' | 'game_over') => {
    setIsSaving(true);
    const name = localStorage.getItem('student_name');
    const className = localStorage.getItem('student_class');
    const avatar = localStorage.getItem('student_avatar');

    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, className, score, avatar })
      });

      localStorage.setItem('student_score', score.toString());
      localStorage.setItem('student_status', status);
      router.push('/student/result');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan nilai.');
      setIsSaving(false);
    }
  };

  if (gameScenarios.length === 0) {
    return (
      <main className="page-container">
        <h2 className="text-gradient">Menyiapkan Misi...</h2>
      </main>
    );
  }

  if (isFinished) return null;

  const currentScenario = gameScenarios[currentStep];
  const isGameOverNext = showFeedback && lives === 0 && !currentScenario.options[selectedOption!].isCorrect;

  // Determine Enemy Sprite based on level
  const EnemyIcons = [Bug, Ghost, Skull, Bot];
  const EnemyIcon = EnemyIcons[currentStep % EnemyIcons.length];

  return (
    <main className="page-container" style={{ justifyContent: 'flex-start', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className={`glass-panel max-w-4xl w-full ${shake ? 'shake-animation' : ''}`} style={{ padding: '2rem' }}>

        {/* HUD (Heads Up Display) */}
        <div className="flex justify-between items-center mb-6 bg-black/40 p-4 rounded-xl border border-white/10">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setShowExitConfirm(true)}
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.color = 'var(--accent-cyan)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(102,252,241,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              title="Kembali ke Beranda"
            >
              <Home size={20} />
            </button>

            <button 
              onClick={() => setIsMuted(!isMuted)}
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                backgroundColor: isMuted ? 'rgba(231, 76, 60, 0.1)' : 'rgba(102, 252, 241, 0.1)',
                border: '1px solid',
                borderColor: isMuted ? 'rgba(231, 76, 60, 0.2)' : 'rgba(102, 252, 241, 0.2)',
                color: isMuted ? 'var(--danger)' : 'var(--accent-cyan)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isMuted ? 'none' : '0 0 10px rgba(102,252,241,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = isMuted ? '0 0 15px rgba(231,76,60,0.3)' : '0 0 15px rgba(102,252,241,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = isMuted ? 'none' : '0 0 10px rgba(102,252,241,0.2)';
              }}
              title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>

            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  size={28}
                  color={i < lives ? "var(--danger)" : "var(--text-secondary)"}
                  fill={i < lives ? "var(--danger)" : "transparent"}
                  style={{ transition: 'all 0.3s ease', transform: i < lives ? 'scale(1.1)' : 'scale(1)' }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-1">Total Skor</span>
            <span className="text-gradient font-black" style={{ fontSize: '1.8rem', lineHeight: '1' }}>{score}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${combo > 1 ? 'text-yellow-400' : 'text-secondary'}`} style={{ transition: 'color 0.3s' }}>
              <Zap size={24} fill={combo > 1 ? "#facc15" : "transparent"} />
              <span className="font-bold text-xl">{combo}x</span>
            </div>
          </div>
        </div>

        {/* BATTLE ARENA (RPG Style) */}
        <div className="battle-arena" style={{ 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: '20px',
          marginBottom: '1.5rem',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          height: '240px',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,1)',
          padding: '0 2rem'
        }}>

          {/* Hero Side (Left) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <div className={`${attackAnimation === 'hero_laser' ? 'animate-hero-cast' : ''} ${attackAnimation === 'enemy_laser' ? 'animate-hero-take-damage' : 'animate-float'}`}>
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30 rounded-full"></div>
                  <div className="relative bg-gradient-to-b from-blue-900/40 to-black/80 p-3 rounded-full border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(102,252,241,0.3)] backdrop-blur-md">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${playerName}&backgroundColor=transparent`} width={80} height={80} alt="Hero" className="rounded-full" />
                  </div>
                </div>
                {/* Pedestal */}
                <div className="w-24 h-4 bg-cyan-400/40 blur-md rounded-[100%] mt-6"></div>
              </div>
            </div>
          </div>

          {/* Projectiles */}
          {attackAnimation === 'hero_laser' && (
            <div className="projectile projectile-hero" style={{ top: '50%', marginTop: '-20px' }}></div>
          )}
          {attackAnimation === 'enemy_laser' && (
            <div className="projectile projectile-enemy" style={{ top: '50%', marginTop: '-20px' }}></div>
          )}

          {/* Enemy Side (Right) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <div className={`${attackAnimation === 'enemy_laser' ? 'animate-enemy-cast' : ''} ${attackAnimation === 'hero_laser' ? 'animate-enemy-take-damage' : 'animate-float-delayed'}`}>
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 blur-2xl opacity-30 rounded-full"></div>
                  <div className="relative bg-gradient-to-b from-red-900/40 to-black/80 p-3 rounded-full border-2 border-red-500/50 shadow-[0_0_30px_rgba(231,76,60,0.3)] backdrop-blur-md">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=Enemy${currentStep}&backgroundColor=transparent`} width={80} height={80} alt="Enemy" className="rounded-full" />
                  </div>
                </div>
                {/* Pedestal */}
                <div className="w-24 h-4 bg-red-500/40 blur-md rounded-[100%] mt-6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar (Adventure Map style) */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-secondary mb-2 font-semibold">
            <span>Misi {currentStep + 1}</span>
            <span>Misi {gameScenarios.length}</span>
          </div>
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '12px', borderRadius: '6px', position: 'relative' }}>
            <div
              style={{
                width: `${(currentStep / gameScenarios.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                height: '100%',
                borderRadius: '6px',
                transition: 'width 0.5s ease'
              }}
            />
            <div style={{
              position: 'absolute',
              left: `calc(${(currentStep / gameScenarios.length) * 100}% - 12px)`,
              top: '-6px',
              transition: 'left 0.5s ease',
              background: 'var(--bg-color)',
              borderRadius: '50%',
              padding: '2px'
            }}>
              <Crosshair size={20} color="var(--accent-cyan)" />
            </div>
          </div>
        </div>

        {/* Toolkit Section */}
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Wrench size={20} color="var(--accent-cyan)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Toolkit Ekstraksi</h3>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleFiftyFifty}
              disabled={fiftyFiftyCount <= 0 || showFeedback || hiddenOptions.length > 0}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                background: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? 'linear-gradient(145deg, rgba(155, 81, 224, 0.15), rgba(155, 81, 224, 0.05))' : 'rgba(255,255,255,0.02)',
                border: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? '1px solid rgba(155, 81, 224, 0.4)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                cursor: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                color: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? 'white' : 'rgba(255,255,255,0.3)',
              }}
              className={fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? 'hover-lifeline-purple' : ''}
            >
              <div className="flex items-center gap-3">
                <div style={{ background: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? 'rgba(155, 81, 224, 0.2)' : 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                  <SplitSquareHorizontal size={24} color={fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? '#d8b4fe' : 'rgba(255,255,255,0.3)'} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? '#e9d5ff' : 'inherit' }}>Hack 50:50</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Eliminasi 2 salah</div>
                </div>
              </div>
              <div style={{
                background: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)',
                color: fiftyFiftyCount > 0 && !showFeedback && hiddenOptions.length === 0 ? 'white' : 'rgba(255,255,255,0.3)',
                fontWeight: 'bold', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {fiftyFiftyCount}
              </div>
            </button>

            <button
              onClick={handleSkip}
              disabled={skipCount <= 0 || showFeedback}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                background: skipCount > 0 && !showFeedback ? 'linear-gradient(145deg, rgba(102, 252, 241, 0.15), rgba(102, 252, 241, 0.05))' : 'rgba(255,255,255,0.02)',
                border: skipCount > 0 && !showFeedback ? '1px solid rgba(102, 252, 241, 0.4)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                cursor: skipCount > 0 && !showFeedback ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                color: skipCount > 0 && !showFeedback ? 'white' : 'rgba(255,255,255,0.3)',
              }}
              className={skipCount > 0 && !showFeedback ? 'hover-lifeline-cyan' : ''}
            >
              <div className="flex items-center gap-3">
                <div style={{ background: skipCount > 0 && !showFeedback ? 'rgba(102, 252, 241, 0.2)' : 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                  <FastForward size={24} color={skipCount > 0 && !showFeedback ? '#a5f3fc' : 'rgba(255,255,255,0.3)'} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: skipCount > 0 && !showFeedback ? '#cffafe' : 'inherit' }}>Bypass Sistem</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Lewati misi ini</div>
                </div>
              </div>
              <div style={{
                background: skipCount > 0 && !showFeedback ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
                color: skipCount > 0 && !showFeedback ? 'black' : 'rgba(255,255,255,0.3)',
                fontWeight: 'bold', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {skipCount}
              </div>
            </button>
          </div>
        </div>

        {/* Scenario Card */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', borderLeft: '4px solid var(--accent-purple)' }}>
          <h2 className="text-white mb-3" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Swords size={28} color="var(--accent-purple)" />
            {currentScenario.title}
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{currentScenario.description}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentScenario.options.map((option, index) => {
            if (hiddenOptions.includes(index)) {
              return (
                <div key={index} style={{ padding: '1.2rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', opacity: 0.3, textAlign: 'center', fontFamily: 'Outfit' }}>
                  Pilihan Dieliminasi (Hack 50:50)
                </div>
              );
            }

            let buttonStyle = {
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--glass-border)',
              padding: '1.2rem',
              borderRadius: '12px',
              color: 'white',
              cursor: showFeedback ? 'default' : 'pointer',
              textAlign: 'left' as const,
              fontSize: '1rem',
              fontFamily: 'Outfit',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            };

            if (showFeedback && selectedOption === index) {
              if (option.isCorrect) {
                buttonStyle.background = 'rgba(46, 204, 113, 0.2)';
                buttonStyle.border = '1px solid var(--success)';
              } else {
                buttonStyle.background = 'rgba(231, 76, 60, 0.2)';
                buttonStyle.border = '1px solid var(--danger)';
              }
            } else if (showFeedback && option.isCorrect) {
              buttonStyle.border = '1px solid var(--success)';
              buttonStyle.background = 'rgba(46, 204, 113, 0.05)';
            }

            return (
              <button
                key={index}
                style={buttonStyle}
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
                className={!showFeedback ? "hover-highlight" : ""}
              >
                <div style={{ marginTop: '2px' }}>
                  {showFeedback && selectedOption === index && option.isCorrect && <ShieldCheck color="var(--success)" size={20} />}
                  {showFeedback && selectedOption === index && !option.isCorrect && <AlertTriangle color="var(--danger)" size={20} />}
                  {(!showFeedback || selectedOption !== index) && <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }}></div>}
                </div>
                <span style={{ opacity: (!showFeedback || selectedOption === index || option.isCorrect) ? 1 : 0.5 }}>{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <div
            className="feedback-animation"
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              borderRadius: '12px',
              background: currentScenario.options[selectedOption!].isCorrect ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
              border: `1px solid ${currentScenario.options[selectedOption!].isCorrect ? 'var(--success)' : 'var(--danger)'}`
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 style={{ color: currentScenario.options[selectedOption!].isCorrect ? 'var(--success)' : 'var(--danger)', fontSize: '1.4rem' }}>
                {currentScenario.options[selectedOption!].isCorrect ? 'Serangan Berhasil Ditepis!' : 'Anda Terkena Jebakan!'}
              </h3>
              {currentScenario.options[selectedOption!].isCorrect && (
                <div className="font-bold text-xl text-yellow-400">+{earnedPoints} Poin</div>
              )}
            </div>

            <p className="text-white/90 leading-relaxed mb-4">{currentScenario.options[selectedOption!].explanation}</p>

            {isGameOverNext && (
              <div className="bg-red-500/20 text-red-400 p-3 rounded-lg border border-red-500/30 mb-4 text-center font-bold">
                PERINGATAN KRITIS: Sistem Anda telah diambil alih! Nyawa Anda habis.
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className={isGameOverNext ? "btn-danger" : "btn-primary"}
                onClick={handleNext}
                disabled={isSaving}
              >
                {isSaving ? 'Menyimpan...' :
                  (isGameOverNext ? 'Selesaikan Misi (Gagal)' :
                    (currentStep < gameScenarios.length - 1 ? 'Lanjutkan Perjalanan' : 'Selesaikan Misi (Berhasil)'))}
              </button>
            </div>
          </div>
        )}
        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px'
          }}>
            <div style={{
              backgroundColor: 'var(--bg-color)',
              border: '2px solid var(--accent-cyan)',
              borderRadius: '24px',
              padding: '2.5rem',
              maxWidth: '360px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(102, 252, 241, 0.4)',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: 'rgba(102, 252, 241, 0.1)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: '1px solid rgba(102, 252, 241, 0.3)'
              }}>
                <AlertTriangle size={40} color="var(--accent-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.75rem', color: '#fff', letterSpacing: '0.05em' }}>KELUAR MISI?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                Seluruh progres dan skor Anda saat ini akan hilang. Tetap ingin keluar?
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setShowExitConfirm(false)}
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  BATAL
                </button>
                <button 
                  onClick={() => router.push('/')}
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--danger), #c0392b)',
                    color: '#fff',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(231, 76, 60, 0.4)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  YA, KELUAR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .hover-highlight:hover {
          background: rgba(155, 81, 224, 0.1) !important;
          border-color: var(--accent-purple) !important;
          transform: translateX(4px);
        }
        
        .hover-lifeline-purple:hover {
          transform: translateY(-2px);
          background: linear-gradient(145deg, rgba(155, 81, 224, 0.25), rgba(155, 81, 224, 0.1)) !important;
          box-shadow: 0 8px 25px rgba(155, 81, 224, 0.25) !important;
          border-color: rgba(155, 81, 224, 0.8) !important;
        }
        
        .hover-lifeline-cyan:hover {
          transform: translateY(-2px);
          background: linear-gradient(145deg, rgba(102, 252, 241, 0.25), rgba(102, 252, 241, 0.1)) !important;
          box-shadow: 0 8px 25px rgba(102, 252, 241, 0.25) !important;
          border-color: rgba(102, 252, 241, 0.8) !important;
        }

        @keyframes matrixScroll {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .matrix-rain {
          animation: matrixScroll 10s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float 3s ease-in-out infinite 1.5s; }

        /* Ranged Magic Animations */
        @keyframes heroCastMagic {
          0% { transform: translateX(0) scale(1); }
          20% { transform: translateX(-20px) scale(0.9); filter: drop-shadow(0 0 10px var(--accent-cyan)); }
          40% { transform: translateX(40px) scale(1.1); filter: drop-shadow(0 0 30px var(--accent-cyan)); }
          60% { transform: translateX(40px) scale(1.1); }
          100% { transform: translateX(0) scale(1); }
        }
        .animate-hero-cast { animation: heroCastMagic 0.8s ease-out forwards; }

        @keyframes enemyCastMagic {
          0% { transform: translateX(0) scale(1); }
          20% { transform: translateX(20px) scale(0.9); filter: drop-shadow(0 0 10px var(--danger)); }
          40% { transform: translateX(-40px) scale(1.1); filter: drop-shadow(0 0 30px var(--danger)); }
          60% { transform: translateX(-40px) scale(1.1); }
          100% { transform: translateX(0) scale(1); }
        }
        .animate-enemy-cast { animation: enemyCastMagic 0.8s ease-out forwards; }

        /* Projectiles */
        .projectile {
          position: absolute;
          top: 50%;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          z-index: 20;
          margin-top: -20px;
        }
        .projectile-hero {
          background: radial-gradient(circle, #fff 20%, var(--accent-cyan) 80%);
          box-shadow: 0 0 20px var(--accent-cyan), 0 0 40px var(--accent-cyan);
          animation: shootRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes shootRight {
          0%, 30% { left: 25%; transform: scale(0); opacity: 0; }
          35% { left: 25%; transform: scale(0.5); opacity: 1; }
          60% { left: 75%; transform: scale(1.2); opacity: 1; filter: brightness(2); }
          65% { left: 75%; transform: scale(3); opacity: 0; }
          100% { left: 75%; opacity: 0; }
        }

        .projectile-enemy {
          background: radial-gradient(circle, #fff 20%, var(--danger) 80%);
          box-shadow: 0 0 20px var(--danger), 0 0 40px var(--danger);
          animation: shootLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes shootLeft {
          0%, 30% { right: 25%; transform: scale(0); opacity: 0; }
          35% { right: 25%; transform: scale(0.5); opacity: 1; }
          60% { right: 75%; transform: scale(1.2); opacity: 1; filter: brightness(2); }
          65% { right: 75%; transform: scale(3); opacity: 0; }
          100% { right: 75%; opacity: 0; }
        }

        /* Damage Animations */
        @keyframes enemyTakeMagicDamage {
          0%, 55% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 transparent); }
          60% { transform: translateX(20px) scale(0.8) rotate(15deg); filter: brightness(2) drop-shadow(0 0 40px red); }
          70% { transform: translateX(10px) scale(0.5); opacity: 1; }
          100% { transform: scale(0); opacity: 0; filter: brightness(0); }
        }
        .animate-enemy-take-damage { animation: enemyTakeMagicDamage 0.8s forwards; }

        @keyframes heroTakeMagicDamage {
          0%, 55% { transform: scale(1); filter: brightness(1); }
          60% { transform: translateX(-20px) scale(0.8) rotate(-15deg); filter: brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(10); }
          70% { transform: translateX(-10px) scale(0.9); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        .animate-hero-take-damage { animation: heroTakeMagicDamage 0.8s forwards; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        .shake-animation {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          border-color: var(--danger) !important;
          box-shadow: 0 0 20px rgba(231, 76, 60, 0.3) !important;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .feedback-animation {
          animation: slideUp 0.4s ease-out forwards;
        }

        @media (max-width: 768px) {
          .battle-arena {
            gap: 1rem !important;
          }
          .character-unit {
            width: 100px !important;
            height: 100px !important;
          }
          .character-unit img {
            width: 80px !important;
            height: 80px !important;
          }
          .hud-stats {
            padding: 0.75rem !important;
          }
          .hud-stats span {
            font-size: 0.8rem !important;
          }
        }
      `}} />
    </main>
  );
}
