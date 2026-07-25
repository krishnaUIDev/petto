import React, { useState } from 'react';
import { AdoptedPet, CustomPetManifest, UserProfile } from '@petto/shared';
import AdoptionWizard from './AdoptionWizard';
import CustomPetCreator from './CustomPetCreator';
import AdoptionCertificate from './AdoptionCertificate';
import PetCareWidget from './PetCareWidget';
import AuthModal from './AuthModal';
import HabitatThemes, { HABITAT_THEMES, HabitatTheme } from './HabitatThemes';
import TreatCatcherGame from './TreatCatcherGame';
import PetJournal from './PetJournal';
import { Heart, Plus, Sparkles, Award, User, LogIn, LogOut, Gamepad2, Trees, BookOpen } from 'lucide-react';

interface DashboardViewProps {
  adoptedPets: AdoptedPet[];
  onAdoptPet: (pet: AdoptedPet) => void;
}

export default function DashboardView({ adoptedPets, onAdoptPet }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'my_pets' | 'adopt' | 'creator' | 'habitats' | 'arcade' | 'journal'>('my_pets');
  const [customPets, setCustomPets] = useState<CustomPetManifest[]>([]);
  const [selectedCertificatePet, setSelectedCertificatePet] = useState<AdoptedPet | null>(null);
  const [currentTheme, setCurrentTheme] = useState<HabitatTheme>(HABITAT_THEMES[0]);

  // User Auth State (NextAuth Integration)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSaveCustomPet = (manifest: CustomPetManifest) => {
    setCustomPets((prev) => [...prev, manifest]);
    alert(`Custom pet "${manifest.name}" created! You can now adopt it in the Adoption Wizard.`);
    setActiveTab('adopt');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0b0f17', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onLoginSuccess={(user) => setUserProfile(user)}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Dashboard Header */}
      <header style={{ padding: '12px 24px', background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
            🐾
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Petto Dashboard</span>
        </div>

        <nav style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { setActiveTab('my_pets'); setSelectedCertificatePet(null); }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'my_pets' ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
              color: activeTab === 'my_pets' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            My Pets ({adoptedPets.length})
          </button>
          <button
            onClick={() => { setActiveTab('adopt'); setSelectedCertificatePet(null); }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'adopt' ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
              color: activeTab === 'adopt' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            + Adopt Pet
          </button>
          <button
            onClick={() => { setActiveTab('creator'); setSelectedCertificatePet(null); }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'creator' ? 'rgba(236, 72, 153, 0.25)' : 'transparent',
              color: activeTab === 'creator' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Custom Creator
          </button>
          <button
            onClick={() => { setActiveTab('habitats'); setSelectedCertificatePet(null); }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'habitats' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
              color: activeTab === 'habitats' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Habitats
          </button>
          <button
            onClick={() => { setActiveTab('arcade'); setSelectedCertificatePet(null); }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'arcade' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
              color: activeTab === 'arcade' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🕹️ Arcade
          </button>
          <button
            onClick={() => { setActiveTab('journal'); setSelectedCertificatePet(null); }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'journal' ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
              color: activeTab === 'journal' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            📖 Journal
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {userProfile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
                {userProfile.image ? (
                  <img src={userProfile.image} alt={userProfile.name} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                ) : (
                  <User size={16} color="#8b5cf6" />
                )}
                {userProfile.name}
              </div>
              <button
                onClick={() => setUserProfile(null)}
                title="Sign Out"
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => setShowAuthModal(true)}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              <LogIn size={14} /> Sign In
            </button>
          )}
        </div>
      </header>

      {/* Full-width Scrollable Container */}
      <div style={{ flex: 1, overflowY: 'auto', width: '100%', background: currentTheme.bgGradient }}>
        {/* Main Centered Content Area */}
        <main style={{ maxWidth: '960px', margin: '0 auto', padding: '16px 20px' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    {adoptedPets.map((pet) => (
                      <div key={pet.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <PetCareWidget pet={pet} />
                        <button
                          className="btn btn-secondary"
                          style={{ width: '100%', padding: '8px', fontSize: '0.82rem' }}
                          onClick={() => setSelectedCertificatePet(pet)}
                        >
                          <Award size={14} /> View Official Birth Certificate 📜
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
                userProfile={userProfile}
              />
            )}

            {activeTab === 'creator' && (
              <CustomPetCreator onSaveCustomPet={handleSaveCustomPet} />
            )}

            {activeTab === 'habitats' && (
              <HabitatThemes
                currentThemeId={currentTheme.id}
                onSelectTheme={(theme) => setCurrentTheme(theme)}
              />
            )}

            {activeTab === 'arcade' && (
              <TreatCatcherGame />
            )}

            {activeTab === 'journal' && (
              <PetJournal pets={adoptedPets} />
            )}
          </>
        )}
      </main>
      </div>
    </div>
  );
}
