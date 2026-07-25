import React, { useState } from 'react';
import { AdoptedPet, CustomPetManifest, PresetPet, UserProfile } from '@petto/shared';
import PetCareWidget from './PetCareWidget';
import PetChatBubble from './PetChatBubble';
import WoodenPetHouseGrid from './WoodenPetHouseGrid';
import SanctuaryCertificateModal from './SanctuaryCertificateModal';
import LivingRoomSanctuary from './LivingRoomSanctuary';

interface DashboardViewProps {
  adoptedPets: AdoptedPet[];
  onAdoptPet: (pet: AdoptedPet) => void;
}

export default function DashboardView({ adoptedPets, onAdoptPet }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'living_room' | 'sanctuary_grid'>('sanctuary_grid');
  const [selectedPresetPetForCertificate, setSelectedPresetPetForCertificate] = useState<PresetPet | null>(null);
  const [showCareModal, setShowCareModal] = useState(false);

  // User Auth State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleConfirmSanctuaryAdoption = (chosenName: string) => {
    if (!selectedPresetPetForCertificate) return;

    const newPet: AdoptedPet = {
      id: `pet_${Date.now()}`,
      userId: userProfile?.id || 'guest',
      ownerName: userProfile?.name || 'Alex Parker',
      name: chosenName || selectedPresetPetForCertificate.name,
      speciesId: selectedPresetPetForCertificate.id,
      speciesName: selectedPresetPetForCertificate.species,
      breed: selectedPresetPetForCertificate.breed || selectedPresetPetForCertificate.species,
      gender: selectedPresetPetForCertificate.gender || '♂️',
      age: selectedPresetPetForCertificate.age || 'Age 1',
      bio: selectedPresetPetForCertificate.bio || selectedPresetPetForCertificate.description,
      badgeId: selectedPresetPetForCertificate.badgeId || `FD-26-${Date.now().toString(36).toUpperCase()}`,
      birthday: new Date().toISOString(),
      personality: selectedPresetPetForCertificate.defaultPersonality,
      scale: 1.0,
      position: { x: 100, y: 100 },
      createdAt: new Date().toISOString()
    };

    onAdoptPet(newPet);
    setSelectedPresetPetForCertificate(null);
    setActiveTab('living_room');
  };

  if (activeTab === 'living_room') {
    return (
      <>
        <LivingRoomSanctuary
          adoptedPets={adoptedPets}
          onOpenDashboard={() => setShowCareModal(true)}
          onAdoptMore={() => setActiveTab('sanctuary_grid')}
        />
        {showCareModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
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
                background: '#FAF6F0',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
                color: '#3A2E2B',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '1px solid #EFE6DD'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Pet Care & Companions</h3>
                <button
                  onClick={() => setShowCareModal(false)}
                  style={{ background: '#EAE3D2', border: 'none', borderRadius: '50%', width: '32px', height: '32px', fontWeight: 800, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              {adoptedPets.length === 0 ? (
                <p style={{ color: '#8D7B75' }}>No adopted pets yet. Click "Adopt More" to pick a companion!</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {adoptedPets.map((pet) => (
                    <div key={pet.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <PetCareWidget pet={pet} />
                      <PetChatBubble pet={pet} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <WoodenPetHouseGrid
        onSelectPet={(pet) => setSelectedPresetPetForCertificate(pet)}
        onBack={() => setActiveTab('living_room')}
      />
      {selectedPresetPetForCertificate && (
        <SanctuaryCertificateModal
          presetPet={selectedPresetPetForCertificate}
          onConfirmAdoption={handleConfirmSanctuaryAdoption}
          onClose={() => setSelectedPresetPetForCertificate(null)}
        />
      )}
    </>
  );
}
