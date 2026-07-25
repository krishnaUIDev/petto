import React, { useState } from 'react';
import { AdoptedPet } from '@petto/shared';
import { Settings, MessageSquare, X, Plus } from 'lucide-react';

interface LivingRoomSanctuaryProps {
  adoptedPets: AdoptedPet[];
  onOpenDashboard: () => void;
  onAdoptMore: () => void;
}

export default function LivingRoomSanctuary({ adoptedPets, onOpenDashboard, onAdoptMore }: LivingRoomSanctuaryProps) {
  const activePet = adoptedPets[0] || {
    name: 'bruno',
    breed: 'Labrador',
    age: '1 year old',
    gender: '♂️'
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at top, #FAF3EB 0%, #E8DCCF 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top Header Bar */}
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        {/* Window Controls Dot Placeholders */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
        </div>

        {/* Calendar Widget (Tue 16) */}
        <div
          style={{
            background: '#FAF6F0',
            borderRadius: '20px',
            padding: '10px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            textAlign: 'center',
            border: '1px solid #EFE6DD'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 800, textTransform: 'uppercase' }}>Tue</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#3A2E2B', lineHeight: 1 }}>16</div>
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenDashboard}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#FAF6F0',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Settings size={20} color="#7F5539" />
        </button>
      </div>

      {/* Main Living Room Viewport */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Lounging Pet on Couch (Bruno) */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: '11rem', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }}>
            🐕
          </div>
        </div>

        {/* Floating Pet Card Widget (Screenshot #1 Right) */}
        <div
          style={{
            position: 'absolute',
            right: '60px',
            top: '40%',
            transform: 'translateY(-50%)',
            background: '#FFFFFF',
            borderRadius: '28px',
            padding: '24px 32px',
            boxShadow: '0 20px 40px rgba(127, 85, 57, 0.12)',
            border: '1px solid #EFE6DD',
            width: '280px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#8D7B75', fontWeight: 600 }}>
              {activePet.gender || '♂️'} · {activePet.age || '1 year old'} · {activePet.breed || 'Labrador'}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <MessageSquare size={16} color="#8D7B75" />
              <X size={16} color="#8D7B75" />
            </div>
          </div>

          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#3A2E2B', margin: 0, textTransform: 'lowercase' }}>
            {activePet.name}
          </h2>
        </div>
      </div>

      {/* Bottom Wooden House Dock (Screenshot #1 Bottom) */}
      <div
        style={{
          height: '160px',
          background: '#B08968',
          borderTop: '8px solid #7F5539',
          display: 'flex',
          gap: '12px',
          padding: '12px 24px',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.15)'
        }}
      >
        {/* Cubbies */}
        {Array.from({ length: 7 }).map((_, idx) => {
          const petInCubby = adoptedPets[idx];
          return (
            <div
              key={idx}
              onClick={petInCubby ? onOpenDashboard : onAdoptMore}
              style={{
                flex: 1,
                background: 'radial-gradient(circle at top, #FFF4E0 0%, #E6CFA9 90%)',
                borderRadius: '16px',
                border: '2px solid #9C6644',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {petInCubby ? (
                <>
                  <div style={{ fontSize: '2.5rem' }}>🐕</div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#5C3D2E', marginTop: '4px' }}>
                    {petInCubby.name}
                  </span>
                </>
              ) : (
                <div style={{ color: '#A08070', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <Plus size={20} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>Empty</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
