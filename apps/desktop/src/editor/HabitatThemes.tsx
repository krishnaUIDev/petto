import React, { useState } from 'react';
import { Sparkles, Sun, Trees, Zap, Rocket, Check } from 'lucide-react';

export interface HabitatTheme {
  id: 'cozy_room' | 'enchanted_forest' | 'cyberpunk_city' | 'space_station';
  name: string;
  description: string;
  icon: string;
  bgGradient: string;
  accentColor: string;
}

export const HABITAT_THEMES: HabitatTheme[] = [
  {
    id: 'cozy_room',
    name: 'Cozy Living Room',
    description: 'Warm hearth ambiance with soft carpets and ambient ambient light.',
    icon: '🏡',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
    accentColor: '#f59e0b'
  },
  {
    id: 'enchanted_forest',
    name: 'Enchanted Forest',
    description: 'Glowing magical fireflies, mossy hollows, and whispering trees.',
    icon: '🌲',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
    accentColor: '#10b981'
  },
  {
    id: 'cyberpunk_city',
    name: 'Cyberpunk Neon City',
    description: 'Rain-slicked neon streets, glowing holographic grids, and synthwave vibe.',
    icon: '🌆',
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
    accentColor: '#ec4899'
  },
  {
    id: 'space_station',
    name: 'Outer Space Station',
    description: 'Twinkling starry cosmos, zero-g floating debris, and deep space view.',
    icon: '🚀',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
    accentColor: '#8b5cf6'
  }
];

interface HabitatThemesProps {
  currentThemeId: string;
  onSelectTheme: (theme: HabitatTheme) => void;
}

export default function HabitatThemes({ currentThemeId, onSelectTheme }: HabitatThemesProps) {
  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '24px',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#ffffff'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
          <Sparkles size={14} /> Desktop Habitat Ambiance
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
          Companion <span className="gradient-text">Habitats</span>
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
        {HABITAT_THEMES.map((theme) => {
          const isSelected = currentThemeId === theme.id;
          return (
            <div
              key={theme.id}
              onClick={() => onSelectTheme(theme)}
              style={{
                background: theme.bgGradient,
                border: `2px solid ${isSelected ? theme.accentColor : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '18px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
                boxShadow: isSelected ? `0 8px 20px -5px ${theme.accentColor}50` : 'none'
              }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>{theme.icon}</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px 0' }}>{theme.name}</h4>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '0 0 10px 0', lineHeight: 1.4 }}>{theme.description}</p>
              {isSelected ? (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.accentColor, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={14} /> Active
                </span>
              ) : (
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Click to apply</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
