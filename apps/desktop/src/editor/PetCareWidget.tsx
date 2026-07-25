import React, { useState } from 'react';
import { AdoptedPet } from '@petto/shared';
import { playPetSound } from '../audio/SoundFx';
import { Heart, Zap, Pizza, Sparkles, Smile, Moon } from 'lucide-react';

interface PetCareWidgetProps {
  pet: AdoptedPet;
  onUpdatePetStats?: (updatedPet: AdoptedPet) => void;
}

export default function PetCareWidget({ pet, onUpdatePetStats }: PetCareWidgetProps) {
  const [hunger, setHunger] = useState(pet.stats?.hunger ?? 85);
  const [happiness, setHappiness] = useState(pet.stats?.happiness ?? 90);
  const [energy, setEnergy] = useState(pet.stats?.energy ?? 75);
  const [notification, setNotification] = useState<string | null>(null);

  const showFloatingFeedback = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleFeed = () => {
    const newHunger = Math.min(100, hunger + 20);
    const newHappy = Math.min(100, happiness + 5);
    setHunger(newHunger);
    setHappiness(newHappy);
    playPetSound('feed');
    showFloatingFeedback(`🍕 ${pet.name} loved the treat! (+20 Hunger)`);
  };

  const handlePlay = () => {
    const newHappy = Math.min(100, happiness + 25);
    const newEnergy = Math.max(10, energy - 10);
    setHappiness(newHappy);
    setEnergy(newEnergy);
    playPetSound(pet.speciesName === 'Cat' ? 'meow' : 'woof');
    showFloatingFeedback(`⚽ Played fetch with ${pet.name}! (+25 Joy)`);
  };

  const handleNap = () => {
    const newEnergy = Math.min(100, energy + 35);
    setEnergy(newEnergy);
    playPetSound('happy');
    showFloatingFeedback(`💤 ${pet.name} had a cozy nap! (+35 Energy)`);
  };

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '16px 20px',
        maxWidth: '380px',
        width: '100%',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        color: '#ffffff',
        position: 'relative'
      }}
    >
      {notification && (
        <div
          style={{
            position: 'absolute',
            top: '-36px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#fff',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.5)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {notification}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '1.4rem' }}>
            {pet.speciesName === 'Cat' ? '🐱' : pet.speciesName === 'Dog' ? '🐶' : pet.speciesName === 'Dragon' ? '🐉' : '🟢'}
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{pet.name}</h4>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              {pet.speciesName} • <span style={{ color: '#8b5cf6' }}>{pet.personality}</span>
            </span>
          </div>
        </div>
        <button
          onClick={() => playPetSound(pet.speciesName === 'Cat' ? 'meow' : 'woof')}
          style={{
            background: 'rgba(139, 92, 246, 0.2)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            color: '#c084fc',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🔊 Pet Sound
        </button>
      </div>

      {/* Care Stat Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {/* Happiness */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '3px' }}>
            <span><Heart size={12} color="#ec4899" /> Happiness</span>
            <span>{happiness}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#0f172a', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${happiness}%`, height: '100%', background: 'linear-gradient(90deg, #ec4899 0%, #f43f5e 100%)', transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Hunger */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '3px' }}>
            <span>🍖 Fullness</span>
            <span>{hunger}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#0f172a', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${hunger}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b 0%, #eab308 100%)', transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Energy */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '3px' }}>
            <span><Zap size={12} color="#3b82f6" /> Energy</span>
            <span>{energy}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#0f172a', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${energy}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)', transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        <button
          onClick={handleFeed}
          style={{
            padding: '8px',
            borderRadius: '10px',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#fbbf24',
            fontWeight: 700,
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Pizza size={14} /> Feed Treat
        </button>

        <button
          onClick={handlePlay}
          style={{
            padding: '8px',
            borderRadius: '10px',
            background: 'rgba(236, 72, 153, 0.2)',
            border: '1px solid rgba(236, 72, 153, 0.4)',
            color: '#f472b6',
            fontWeight: 700,
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Smile size={14} /> Play Fetch
        </button>

        <button
          onClick={handleNap}
          style={{
            padding: '8px',
            borderRadius: '10px',
            background: 'rgba(59, 130, 246, 0.2)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: '#60a5fa',
            fontWeight: 700,
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Moon size={14} /> Nap Time
        </button>
      </div>
    </div>
  );
}
