import React from 'react';
import { AdoptedPet } from '@petto/shared';
import { BookOpen, Calendar, Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface PetJournalProps {
  pets: AdoptedPet[];
}

export default function PetJournal({ pets }: PetJournalProps) {
  const milestones = [
    { id: 1, title: 'First Adoption Certificate', desc: 'Adopted your first pixel companion.', icon: '📜', completed: pets.length > 0 },
    { id: 2, title: 'Master Caregiver', desc: 'Maintained 80%+ happiness streak for 3 days.', icon: '💖', completed: true },
    { id: 3, title: 'Arcade Champion', desc: 'Scored 100+ points in Treat Catcher game.', icon: '🏆', completed: true },
    { id: 4, title: 'Custom Creator', desc: 'Designed & uploaded a custom sprite companion.', icon: '🎨', completed: true }
  ];

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen size={20} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Companion Journal & Milestones</h3>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Track your companion growth & caregiver achievements.</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {milestones.map((m) => (
          <div
            key={m.id}
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: m.completed ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${m.completed ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.8rem' }}>{m.icon}</span>
              {m.completed && <CheckCircle2 size={18} color="#c084fc" />}
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px 0' }}>{m.title}</h4>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
