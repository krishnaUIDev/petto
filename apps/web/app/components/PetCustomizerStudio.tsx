'use client';

import React, { useState } from 'react';
import { PRESET_PETS } from '@petto/shared';
import { Palette, Sparkles, Shirt, Eye } from 'lucide-react';

export default function PetCustomizerStudio() {
  const [selectedPet, setSelectedPet] = useState(PRESET_PETS[0]);
  const [hat, setHat] = useState<'none' | 'party' | 'crown' | 'glasses'>('party');
  const [aura, setAura] = useState<'violet' | 'gold' | 'pink' | 'emerald'>('violet');

  const auraGlows = {
    violet: '0 0 25px rgba(139, 92, 246, 0.8)',
    gold: '0 0 25px rgba(245, 158, 11, 0.8)',
    pink: '0 0 25px rgba(236, 72, 153, 0.8)',
    emerald: '0 0 25px rgba(16, 185, 129, 0.8)'
  };

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#ffffff'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px' }}>
          <Palette size={14} /> Web Accessory Studio
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
          Interactive <span className="gradient-text">Pet Style Studio</span>
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
          Customize companion hats, accessories, and glowing aura colors live.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
        {/* Accessories Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Companion Hat & Accessories
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { id: 'party', label: '🥳 Party Hat' },
                { id: 'crown', label: '👑 Gold Crown' },
                { id: 'glasses', label: '🕶️ Cool Shades' },
                { id: 'none', label: '❌ No Accessories' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setHat(item.id as any)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${hat === item.id ? '#8b5cf6' : '#334155'}`,
                    background: hat === item.id ? 'rgba(139, 92, 246, 0.25)' : '#0f172a',
                    color: hat === item.id ? '#ffffff' : '#94a3b8',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Aura Sparkle Glow
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { id: 'violet', color: '#8b5cf6' },
                { id: 'gold', color: '#f59e0b' },
                { id: 'pink', color: '#ec4899' },
                { id: 'emerald', color: '#10b981' }
              ].map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAura(a.id as any)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: a.color,
                    border: `3px solid ${aura === a.id ? '#ffffff' : 'transparent'}`,
                    cursor: 'pointer',
                    boxShadow: aura === a.id ? `0 0 12px ${a.color}` : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Accessory Preview Box */}
        <div
          style={{
            height: '220px',
            background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'relative',
              fontSize: '4.5rem',
              boxShadow: auraGlows[aura],
              borderRadius: '50%',
              padding: '10px'
            }}
          >
            {hat !== 'none' && (
              <span
                style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '2rem'
                }}
              >
                {hat === 'party' ? '🥳' : hat === 'crown' ? '👑' : '🕶️'}
              </span>
            )}
            {selectedPet.species === 'Cat' ? '🐱' : selectedPet.species === 'Dog' ? '🐶' : selectedPet.species === 'Dragon' ? '🐉' : '🟢'}
          </div>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '12px' }}>
            Customized {selectedPet.name} with {aura.toUpperCase()} Aura
          </span>
        </div>
      </div>
    </div>
  );
}
