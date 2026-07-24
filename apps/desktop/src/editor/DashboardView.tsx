import React, { useState } from 'react';
import { AdoptedPet, CustomPetManifest } from '@petto/shared';
import AdoptionWizard from './AdoptionWizard';
import CustomPetCreator from './CustomPetCreator';
import AdoptionCertificate from './AdoptionCertificate';
import { Heart, Plus, Sparkles, Award, User, Settings } from 'lucide-react';

interface DashboardViewProps {
  adoptedPets: AdoptedPet[];
  onAdoptPet: (pet: AdoptedPet) => void;
}

export default function DashboardView({ adoptedPets, onAdoptPet }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'my_pets' | 'adopt' | 'creator'>('my_pets');
  const [customPets, setCustomPets] = useState<CustomPetManifest[]>([]);
  const [selectedCertificatePet, setSelectedCertificatePet] = useState<AdoptedPet | null>(null);

  const handleSaveCustomPet = (manifest: CustomPetManifest) => {
    setCustomPets((prev) => [...prev, manifest]);
    alert(`Custom pet "${manifest.name}" created! You can now adopt it in the Adoption Wizard.`);
    setActiveTab('adopt');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f17', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      {/* Dashboard Header */}
      <header style={{ padding: '20px 32px', background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
            🐾
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Petto Dashboard</span>
        </div>

        <nav style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { setActiveTab('my_pets'); setSelectedCertificatePet(null); }}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'my_pets' ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
              color: activeTab === 'my_pets' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            My Pets ({adoptedPets.length})
          </button>
          <button
            onClick={() => { setActiveTab('adopt'); setSelectedCertificatePet(null); }}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'adopt' ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
              color: activeTab === 'adopt' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Adopt Pet
          </button>
          <button
            onClick={() => { setActiveTab('creator'); setSelectedCertificatePet(null); }}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'creator' ? 'rgba(236, 72, 153, 0.25)' : 'transparent',
              color: activeTab === 'creator' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Custom Creator
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>
          <User size={18} color="#8b5cf6" /> Alex Parker
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        {selectedCertificatePet ? (
          <div>
            <button className="btn btn-secondary" onClick={() => setSelectedCertificatePet(null)} style={{ marginBottom: '24px' }}>
              ← Back to My Pets
            </button>
            <AdoptionCertificate pet={selectedCertificatePet} />
          </div>
        ) : (
          <>
            {activeTab === 'my_pets' && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>
                  My Adopted <span className="gradient-text">Companions</span>
                </h2>

                {adoptedPets.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '24px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🐾</div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>No Pets Adopted Yet</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Adopt your first companion to see them roam on your desktop!</p>
                    <button className="btn btn-primary" onClick={() => setActiveTab('adopt')}>
                      <Plus size={18} /> Adopt Your First Pet
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                    {adoptedPets.map((pet) => (
                      <div
                        key={pet.id}
                        style={{
                          padding: '24px',
                          background: 'rgba(30, 41, 59, 0.7)',
                          borderRadius: '20px',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <div style={{ fontSize: '2.5rem' }}>🐾</div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', textTransform: 'capitalize' }}>
                            {pet.personality}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '4px' }}>{pet.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
                          Species: {pet.speciesName}
                        </p>
                        <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '16px' }}>
                          🎂 Birthday: {new Date(pet.birthday).toLocaleDateString()}
                        </div>

                        <button
                          className="btn btn-secondary"
                          style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}
                          onClick={() => setSelectedCertificatePet(pet)}
                        >
                          <Award size={16} /> View Birth Certificate
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'adopt' && (
              <AdoptionWizard
                onAdoptFinished={(pet) => {
                  onAdoptPet(pet);
                  setActiveTab('my_pets');
                }}
                customPets={customPets}
              />
            )}

            {activeTab === 'creator' && (
              <CustomPetCreator onSaveCustomPet={handleSaveCustomPet} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
