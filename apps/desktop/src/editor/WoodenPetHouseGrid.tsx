import React, { useState } from 'react';
import { PRESET_PETS, PresetPet } from '@petto/shared';
import { ChevronLeft, X } from 'lucide-react';
import AnimatedPetSprite from './AnimatedPetSprite';

interface WoodenPetHouseGridProps {
  onSelectPet: (pet: PresetPet) => void;
  onBack?: () => void;
}

export default function WoodenPetHouseGrid({ onSelectPet, onBack }: WoodenPetHouseGridProps) {
  const [activePet, setActivePet] = useState<PresetPet | null>(null); // No popup by default

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E6D5C3 0%, #D4C2AF 100%)',
        padding: '24px',
        position: 'relative',
        boxSizing: 'border-box',
        color: '#4A3E3D',
        overflow: 'hidden'
      }}
    >
      {/* Bottom Left Circular Back Arrow Button (Matching Video) */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            bottom: '36px',
            left: '36px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: 'none',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 50
          }}
        >
          <ChevronLeft size={26} color="#4A3E3D" />
        </button>
      )}

      {/* Multi-tier Wooden Cubby Shelf Grid */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '20px auto 0 auto',
          background: '#B08968',
          border: '12px solid #7F5539',
          borderRadius: '24px',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '14px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          position: 'relative'
        }}
      >
        {PRESET_PETS.map((pet, idx) => {
          const isSelected = activePet?.id === pet.id;
          return (
            <div
              key={pet.id}
              onClick={() => setActivePet(pet)}
              style={{
                height: '170px',
                background: 'radial-gradient(circle at top, #FFF4E0 0%, #E6CFA9 90%)',
                borderRadius: idx % 2 === 0 ? '50% 50% 12px 12px' : '18px',
                border: `3px solid ${isSelected ? '#C68B59' : '#9C6644'}`,
                boxShadow: isSelected ? '0 0 20px rgba(198, 139, 89, 0.8), inset 0 0 15px rgba(255, 230, 180, 0.6)' : 'inset 0 0 15px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: isSelected ? 'scale(1.04)' : 'scale(1)'
              }}
            >
              <AnimatedPetSprite pet={pet} size={90} />

              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#5C3D2E', marginTop: '2px' }}>
                {pet.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Profile Card ONLY shown when user clicks a card */}
      {activePet && (
        <div
          style={{
            position: 'absolute',
            left: '48px',
            top: '38%',
            transform: 'translateY(-50%)',
            width: '310px',
            background: '#FFFFFF',
            borderRadius: '28px',
            padding: '28px 26px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '1px solid #EFE6DD',
            animation: 'fadeIn 0.25s',
            zIndex: 40,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <button
            onClick={() => setActivePet(null)}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: '#F3EBDD',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} color="#7F5539" />
          </button>
          {/* Subtitle / Tagline */}
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#3A2E2B', marginBottom: '2px' }}>
            {activePet.gender === '♀️' ? 'Drama Queen' : 'Gentle Soul'}
          </div>

          {/* Large Name */}
          <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#3A2E2B', margin: '0 0 8px 0', lineHeight: 1 }}>
            {activePet.name}
          </h2>

          {/* Details */}
          <div style={{ color: '#8D7B75', fontSize: '0.85rem', marginBottom: '14px', fontWeight: 600 }}>
            {activePet.gender || '♂️'} · {activePet.age || 'Age 3'} · {activePet.breed || activePet.species}
          </div>

          {/* Bio */}
          <p style={{ fontSize: '0.86rem', color: '#665A55', lineHeight: 1.5, marginBottom: '24px' }}>
            {activePet.bio || activePet.description}
          </p>

          {/* Dynamic Gender Button ("I want her" vs "I want him") */}
          <button
            onClick={() => onSelectPet(activePet)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '9999px',
              border: 'none',
              background: '#C68B59',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(198, 139, 89, 0.4)',
              transition: 'all 0.2s'
            }}
          >
            {activePet.gender === '♀️' ? 'I want her' : 'I want him'}
          </button>
        </div>
      )}
    </div>
  );
}
