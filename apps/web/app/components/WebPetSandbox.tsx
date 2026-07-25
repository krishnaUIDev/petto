'use client';

import React, { useState } from 'react';
import { PRESET_PETS, PresetPet } from '@petto/shared';
import { Heart, Pizza, Smile, Sparkles, Volume2 } from 'lucide-react';

export default function WebPetSandbox() {
  const [selectedPet, setSelectedPet] = useState<PresetPet>(PRESET_PETS[0]);
  const [petAction, setPetAction] = useState<string | null>(null);
  const [happiness, setHappiness] = useState(88);
  const [hunger, setHunger] = useState(80);

  const triggerFeedback = (msg: string) => {
    setPetAction(msg);
    setTimeout(() => setPetAction(null), 1800);
  };

  const handleFeed = () => {
    setHunger((prev) => Math.min(100, prev + 15));
    setHappiness((prev) => Math.min(100, prev + 5));
    triggerFeedback(`🍕 Fed treat to ${selectedPet.name}!`);
  };

  const handlePet = () => {
    setHappiness((prev) => Math.min(100, prev + 15));
    triggerFeedback(`💖 Petted ${selectedPet.name}!`);
  };

  const handlePlay = () => {
    setHappiness((prev) => Math.min(100, prev + 20));
    setHunger((prev) => Math.max(10, prev - 5));
    triggerFeedback(`⚽ Playing fetch with ${selectedPet.name}!`);
  };

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '720px',
        margin: '0 auto',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
        color: '#ffffff',
        textAlign: 'center'
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px' }}>
        <Sparkles size={14} /> Try Live Online Simulator
      </div>

      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
        Interactive <span className="gradient-text">Pet Sandbox</span>
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '24px' }}>
        Play with companion pets directly in your web browser before installing.
      </p>

      {/* Pet Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {PRESET_PETS.map((pet) => {
          const isSelected = selectedPet.id === pet.id;
          return (
            <button
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: `2px solid ${isSelected ? pet.previewColor : 'rgba(255,255,255,0.1)'}`,
                background: isSelected ? `${pet.previewColor}30` : 'rgba(15, 23, 42, 0.6)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{pet.species === 'Cat' ? '🐱' : pet.species === 'Dog' ? '🐶' : pet.species === 'Dragon' ? '🐉' : '🟢'}</span>
              {pet.name}
            </button>
          );
        })}
      </div>

      {/* Simulator Playground Canvas Box */}
      <div
        style={{
          height: '200px',
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0.8) 70%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          overflow: 'hidden'
        }}
      >
        {petAction && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.6)',
              animation: 'fadeIn 0.2s'
            }}
          >
            {petAction}
          </div>
        )}

        <div style={{ fontSize: '4.5rem', marginBottom: '8px', cursor: 'pointer' }} onClick={handlePet}>
          {selectedPet.species === 'Cat' ? '🐱' : selectedPet.species === 'Dog' ? '🐶' : selectedPet.species === 'Dragon' ? '🐉' : '🟢'}
        </div>

        <div style={{ fontSize: '1rem', fontWeight: 800 }}>{selectedPet.name}</div>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Click to pet {selectedPet.name}!</span>
      </div>

      {/* Care Stat Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', textAlign: 'left' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 }}>
            <span>💖 Happiness</span>
            <span>{happiness}%</span>
          </div>
          <div style={{ height: '8px', background: '#0f172a', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${happiness}%`, height: '100%', background: 'linear-gradient(90deg, #ec4899 0%, #f43f5e 100%)', transition: 'width 0.3s' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 }}>
            <span>🍕 Fullness</span>
            <span>{hunger}%</span>
          </div>
          <div style={{ height: '8px', background: '#0f172a', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${hunger}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b 0%, #eab308 100%)', transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button className="btn btn-secondary" onClick={handlePet} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
          <Heart size={16} color="#ec4899" /> Pet Companion
        </button>
        <button className="btn btn-secondary" onClick={handleFeed} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
          <Pizza size={16} color="#f59e0b" /> Feed Treat
        </button>
        <button className="btn btn-primary" onClick={handlePlay} style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
          <Smile size={16} /> Play Fetch ⚽
        </button>
      </div>
    </div>
  );
}
