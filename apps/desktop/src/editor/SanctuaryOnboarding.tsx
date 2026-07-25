import React from 'react';
import { ArrowRight, Heart, Gift } from 'lucide-react';

interface SanctuaryOnboardingProps {
  onSelectOption: (option: 'custom' | 'catalog') => void;
}

export default function SanctuaryOnboarding({ onSelectOption }: SanctuaryOnboardingProps) {
  return (
    <div
      style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '24px 20px',
        textAlign: 'center',
        color: '#4A3E3D',
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box'
      }}
    >
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px', color: '#3A2E2B' }}>
        Who's joining you today?
      </h1>
      <p style={{ color: '#8D7B75', fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: 1.4 }}>
        Invite your own buddy to move in or adopt a friend who's waiting for a home.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Card 1: Invite my pet */}
        <div
          style={{
            background: '#FAF6F0',
            borderRadius: '20px',
            padding: '20px 18px',
            boxShadow: '0 8px 24px rgba(127, 85, 57, 0.08)',
            border: '1px solid #EFE6DD',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onClick={() => onSelectOption('custom')}
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3A2E2B', marginBottom: '14px' }}>
              Invite my pet
            </h2>
            <div
              style={{
                height: '110px',
                borderRadius: '16px',
                background: 'radial-gradient(circle at center, #F4ECE1 0%, #E8DCCF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '3rem'
              }}
            >
              🐱🐶
            </div>
          </div>

          <button
            style={{
              padding: '8px 24px',
              borderRadius: '9999px',
              border: 'none',
              background: '#C68B59',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(198, 139, 89, 0.3)',
              transition: 'background 0.2s'
            }}
          >
            Continue
          </button>
        </div>

        {/* Card 2: See who's waiting */}
        <div
          style={{
            background: '#FAF6F0',
            borderRadius: '20px',
            padding: '20px 18px',
            boxShadow: '0 8px 24px rgba(127, 85, 57, 0.08)',
            border: '1px solid #EFE6DD',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onClick={() => onSelectOption('catalog')}
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3A2E2B', marginBottom: '14px' }}>
              See who's waiting
            </h2>
            <div
              style={{
                height: '110px',
                borderRadius: '16px',
                background: 'radial-gradient(circle at center, #F4ECE1 0%, #E8DCCF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '3rem'
              }}
            >
              🎁🐾
            </div>
          </div>

          <button
            style={{
              padding: '8px 24px',
              borderRadius: '9999px',
              border: 'none',
              background: '#C68B59',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(198, 139, 89, 0.3)',
              transition: 'background 0.2s'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
