import React, { useState } from 'react';
import { PresetPet, AdoptedPet } from '@petto/shared';
import { X, Award, Sparkles } from 'lucide-react';

interface SanctuaryCertificateModalProps {
  presetPet: PresetPet;
  onConfirmAdoption: (petName: string) => void;
  onClose: () => void;
}

export default function SanctuaryCertificateModal({ presetPet, onConfirmAdoption, onClose }: SanctuaryCertificateModalProps) {
  const [petName, setPetName] = useState(presetPet.name);

  const todayDateStr = 'JUL 25, 2026';
  const badgeDateStr = '2026.07.25';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px'
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '780px',
          width: '100%',
          background: '#FDFBF7',
          border: '12px solid #EAE3D2',
          borderRadius: '24px',
          padding: '40px 48px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          textAlign: 'center',
          color: '#3A2E2B',
          fontFamily: "'Georgia', serif"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#F3EBDD',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} color="#7F5539" />
        </button>

        {/* Attached Leather Lanyard Badge (Screenshot #5 Top-Left) */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            left: '30px',
            width: '150px',
            background: '#F3E5D8',
            border: '2px solid #D4C2B0',
            borderRadius: '16px',
            padding: '12px',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            transform: 'rotate(-8deg)',
            fontFamily: 'sans-serif',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#5C3D2E', marginBottom: '6px' }}>
            N/A
          </div>
          <div style={{ fontSize: '3rem', margin: '4px 0' }}>
            {presetPet.species === 'Cat' ? '🐱' : '🐶'}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#8D7B75', fontWeight: 600 }}>
            🎂 {presetPet.age || 'Age 2'} · {presetPet.gender || '♀️'} Female
          </div>
          <div style={{ fontSize: '0.7rem', color: '#5C3D2E', fontWeight: 700, marginTop: '2px' }}>
            Adoption Date
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3A2E2B' }}>
            {badgeDateStr}
          </div>
          <div style={{ fontSize: '0.62rem', color: '#9C8881', marginTop: '2px' }}>
            {presetPet.badgeId || 'ID: FD-26-O6C511'}
          </div>
        </div>

        {/* Certificate Title */}
        <h1 style={{ fontSize: '2.8rem', fontStyle: 'italic', fontWeight: 400, color: '#3A2E2B', margin: '0 0 4px 0' }}>
          Adoption Certificate
        </h1>
        <div style={{ fontSize: '0.78rem', letterSpacing: '2px', fontWeight: 700, color: '#8D7B75', textTransform: 'uppercase', marginBottom: '32px' }}>
          THIS CERTIFIES THAT
        </div>

        {/* Name Input Line */}
        <div style={{ maxWidth: '440px', margin: '0 auto 24px auto' }}>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Give her a name"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '2px solid #C68B59',
              textAlign: 'center',
              fontSize: '1.8rem',
              fontStyle: 'italic',
              color: '#3A2E2B',
              padding: '6px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ fontSize: '0.78rem', letterSpacing: '2px', fontWeight: 700, color: '#8D7B75', textTransform: 'uppercase', marginBottom: '16px' }}>
          HAS BEEN OFFICIALLY ADOPTED ON
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#C68B59', marginBottom: '24px' }}>
          {todayDateStr}
        </div>

        <p style={{ fontSize: '0.85rem', color: '#665A55', fontStyle: 'italic', maxWidth: '460px', margin: '0 auto 36px auto', lineHeight: 1.6 }}>
          Granting herewith all rights, privileges, treats, and naps as a beloved member of the family.
        </p>

        {/* Action Button */}
        <button
          onClick={() => onConfirmAdoption(petName)}
          style={{
            padding: '14px 48px',
            borderRadius: '9999px',
            border: 'none',
            background: '#D4A373',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '1.05rem',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(212, 163, 115, 0.4)',
            transition: 'all 0.2s'
          }}
        >
          Make it Official
        </button>
      </div>
    </div>
  );
}
