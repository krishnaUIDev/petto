import React from 'react';
import { PresetPet } from '@petto/shared';
import RealisticPetAsset from './RealisticPetAsset';

interface AnimatedPetSpriteProps {
  pet: PresetPet;
  size?: number;
}

export default function AnimatedPetSprite({ pet, size = 120 }: AnimatedPetSpriteProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        userSelect: 'none'
      }}
    >
      <style>{`
        @keyframes petBreatheWag {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-4px) rotate(1.5deg) scale(1.02); }
          50% { transform: translateY(0px) rotate(0deg) scale(1); }
          75% { transform: translateY(-3px) rotate(-1.5deg) scale(1.01); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
      `}</style>

      {/* Animated Realistic Pet Container */}
      <div
        style={{
          animation: 'petBreatheWag 3.2s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <RealisticPetAsset speciesId={pet.id} size={size} />
      </div>
    </div>
  );
}
