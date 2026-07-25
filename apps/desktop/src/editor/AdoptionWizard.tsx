import React, { useState } from 'react';
import { AdoptedPet, PRESET_PETS, PresetPet, CustomPetManifest, PetPersonality } from '@petto/shared';
import AdoptionCertificate from './AdoptionCertificate';
import { Heart, Sparkles, Award, ArrowRight, Check } from 'lucide-react';

interface AdoptionWizardProps {
  onAdoptFinished: (newPet: AdoptedPet) => void;
  customPets?: CustomPetManifest[];
  userProfile?: { name?: string } | null;
}

export default function AdoptionWizard({ onAdoptFinished, customPets = [], userProfile }: AdoptionWizardProps) {
  const [step, setStep] = useState<'catalog' | 'name' | 'certificate'>('catalog');
  const [selectedPreset, setSelectedPreset] = useState<PresetPet>(PRESET_PETS[0]);
  const [selectedCustom, setSelectedCustom] = useState<CustomPetManifest | null>(null);

  const [ownerName, setOwnerName] = useState(userProfile?.name || '');
  const [petName, setPetName] = useState('Milo');
  const [personality, setPersonality] = useState<PetPersonality>('playful');

  const [completedPet, setCompletedPet] = useState<AdoptedPet | null>(null);

  const handleSelectPreset = (preset: PresetPet) => {
    setSelectedPreset(preset);
    setSelectedCustom(null);
    setPetName(preset.name.split(' ')[0]);
    setPersonality(preset.defaultPersonality);
  };

  const handleSelectCustom = (custom: CustomPetManifest) => {
    setSelectedCustom(custom);
    setPetName(custom.name);
    setPersonality('cheerful');
  };

  const handleCompleteAdoption = () => {
    const isCustom = selectedCustom !== null;
    const newPet: AdoptedPet = {
      id: `pet_${Date.now()}`,
      userId: 'user_google_123',
      ownerName: ownerName || 'Pet Owner',
      name: petName || 'My Pet',
      speciesId: isCustom ? selectedCustom.id : selectedPreset.id,
      speciesName: isCustom ? selectedCustom.name : selectedPreset.species,
      birthday: new Date().toISOString(), // Today's date is official Birthday
      personality: personality,
      scale: 1.0,
      position: { x: 100, y: 100 },
      customManifest: isCustom ? selectedCustom : undefined,
      createdAt: new Date().toISOString()
    };

    setCompletedPet(newPet);
    setStep('certificate');
  };

  return (
    <div style={{ padding: '12px 16px', color: '#ffffff', maxWidth: '800px', margin: '0 auto' }}>
      {/* Wizard Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ padding: '6px 14px', borderRadius: '9999px', background: step === 'catalog' ? 'var(--gradient-brand)' : '#1e293b', fontWeight: 700, fontSize: '0.8rem' }}>
          1. Choose Companion
        </div>
        <div style={{ width: '24px', height: '2px', background: '#334155' }} />
        <div style={{ padding: '6px 14px', borderRadius: '9999px', background: step === 'name' ? 'var(--gradient-brand)' : '#1e293b', fontWeight: 700, fontSize: '0.8rem' }}>
          2. Name & Personality
        </div>
        <div style={{ width: '24px', height: '2px', background: '#334155' }} />
        <div style={{ padding: '6px 14px', borderRadius: '9999px', background: step === 'certificate' ? 'var(--gradient-brand)' : '#1e293b', fontWeight: 700, fontSize: '0.8rem' }}>
          3. Birth Certificate
        </div>
      </div>

      {step === 'catalog' && (
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px', textAlign: 'center' }}>
            Choose Your <span className="gradient-text">Pet Companion</span>
          </h2>
          <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
            Select from pre-loaded pixel pets or your custom uploaded sprite sheets.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            {PRESET_PETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id && !selectedCustom;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                    border: `2px solid ${isSelected ? '#8b5cf6' : 'rgba(255, 255, 255, 0.08)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '6px' }}>
                    {preset.species === 'Cat' ? '🐱' : preset.species === 'Dog' ? '🐶' : preset.species === 'Dragon' ? '🐉' : '🟢'}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{preset.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{preset.species}</span>
                </div>
              );
            })}

            {customPets.map((custom) => {
              const isSelected = selectedCustom?.id === custom.id;
              return (
                <div
                  key={custom.id}
                  onClick={() => handleSelectCustom(custom)}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(236, 72, 153, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                    border: `2px solid ${isSelected ? '#ec4899' : 'rgba(255, 255, 255, 0.08)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '6px' }}>✨</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{custom.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#ec4899' }}>Custom Upload</span>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={() => setStep('name')} style={{ padding: '10px 24px' }}>
              Continue to Naming <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 'name' && (
        <div style={{ maxWidth: '480px', margin: '0 auto', background: 'rgba(30, 41, 59, 0.85)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px', textAlign: 'center' }}>
            2. Name & Personality
          </h2>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
              Owner Name (Your Name)
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
              Pet Name
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
              Select Personality
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {(['cheerful', 'playful', 'calm', 'curious'] as PetPersonality[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPersonality(p)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `2px solid ${personality === p ? '#8b5cf6' : '#334155'}`,
                    background: personality === p ? 'rgba(139, 92, 246, 0.25)' : '#0f172a',
                    color: personality === p ? '#ffffff' : '#94a3b8',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {p} {personality === p ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button className="btn btn-secondary" onClick={() => setStep('catalog')} style={{ flex: 1, padding: '6px 12px', fontSize: '0.82rem' }}>
              ← Back
            </button>
            <button className="btn btn-primary" onClick={handleCompleteAdoption} style={{ flex: 1.5, padding: '6px 12px', fontSize: '0.82rem' }}>
              Generate Birth Certificate 📜 →
            </button>
          </div>
        </div>
      )}

      {step === 'certificate' && completedPet && (
        <div style={{ textAlign: 'center' }}>
          <AdoptionCertificate pet={completedPet} />
          <div style={{ marginTop: '14px' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              onClick={() => onAdoptFinished(completedPet)}
            >
              Finish & See Companion in My Pets 🐾
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
