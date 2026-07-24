import React, { useState, useEffect } from 'react';
import { AdoptedPet, PRESET_PETS } from '@petto/shared';
import DashboardView from './editor/DashboardView';
import PetWindowView from './pet/PetWindowView';

export default function App() {
  const [windowHash, setWindowHash] = useState(window.location.hash);
  const [adoptedPets, setAdoptedPets] = useState<AdoptedPet[]>([]);

  useEffect(() => {
    const handleHashChange = () => setWindowHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdoptPet = (newPet: AdoptedPet) => {
    setAdoptedPets((prev) => [...prev, newPet]);
  };

  if (windowHash === '#pet') {
    return <PetWindowView activePet={adoptedPets[0] || null} />;
  }

  return (
    <DashboardView
      adoptedPets={adoptedPets}
      onAdoptPet={handleAdoptPet}
    />
  );
}
