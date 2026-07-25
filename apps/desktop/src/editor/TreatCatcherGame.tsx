import React, { useState, useEffect } from 'react';
import { playPetSound } from '../audio/SoundFx';
import { Gamepad2, Trophy, Sparkles, RefreshCw } from 'lucide-react';

interface Treat {
  id: number;
  x: number;
  y: number;
  icon: string;
  points: number;
}

export default function TreatCatcherGame() {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(120);
  const [treats, setTreats] = useState<Treat[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const treatTypes = [
    { icon: '🍕', points: 10 },
    { icon: '🍔', points: 15 },
    { icon: '🥩', points: 20 },
    { icon: '🐟', points: 15 },
    { icon: '⭐', points: 50 }
  ];

  const spawnTreat = () => {
    const randomTreat = treatTypes[Math.floor(Math.random() * treatTypes.length)];
    const newTreat: Treat = {
      id: Date.now() + Math.random(),
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 70) + 15,
      icon: randomTreat.icon,
      points: randomTreat.points
    };
    setTreats((prev) => [...prev.slice(-6), newTreat]);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      spawnTreat();
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCatchTreat = (id: number, points: number) => {
    setScore((prev) => prev + points);
    setCoins((prev) => prev + Math.floor(points / 5));
    setTreats((prev) => prev.filter((t) => t.id !== id));
    playPetSound('happy');
  };

  const handleStartGame = () => {
    setScore(0);
    setTreats([]);
    setIsPlaying(true);
    spawnTreat();
  };

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '24px',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#ffffff'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Gamepad2 size={20} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Treat Catcher Arcade</h3>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Catch treats for your pet to earn Pet Coins!</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '6px 14px', borderRadius: '9999px' }}>
            🪙 {coins} Pet Coins
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ec4899', background: 'rgba(236, 72, 153, 0.15)', padding: '6px 14px', borderRadius: '9999px' }}>
            <Trophy size={14} /> Score: {score}
          </div>
        </div>
      </div>

      {/* Arcade Screen Box */}
      <div
        style={{
          height: '240px',
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0.95) 80%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!isPlaying ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎯</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>Ready to Play?</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>Click floating treats as fast as you can!</p>
            <button className="btn btn-primary" onClick={handleStartGame} style={{ padding: '10px 24px' }}>
              <Sparkles size={16} /> Start Game
            </button>
          </div>
        ) : (
          <>
            {treats.map((treat) => (
              <button
                key={treat.id}
                onClick={() => handleCatchTreat(treat.id, treat.points)}
                style={{
                  position: 'absolute',
                  left: `${treat.x}%`,
                  top: `${treat.y}%`,
                  fontSize: '2.2rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  animation: 'bounce 0.8s infinite alternate',
                  transition: 'transform 0.1s'
                }}
              >
                {treat.icon}
              </button>
            ))}
          </>
        )}
      </div>

      {isPlaying && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button className="btn btn-secondary" onClick={() => setIsPlaying(false)} style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
            <RefreshCw size={14} /> Stop Arcade Session
          </button>
        </div>
      )}
    </div>
  );
}
