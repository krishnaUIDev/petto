import React from 'react';

interface RealisticPetAssetProps {
  speciesId: string;
  size?: number;
}

export default function RealisticPetAsset({ speciesId, size = 120 }: RealisticPetAssetProps) {
  // High-res photorealistic generated pet portraits matching the original design
  const petImages: Record<string, string> = {
    sandra_bengal: '/pets/sandra.png',
    bruno_labrador: '/pets/bruno.png',
    papi_cavalier: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
    luna_cat: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80',
    barnaby_samoyed: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&w=400&q=80',
    milo_corgi: 'https://images.unsplash.com/photo-1612536057832-2ff7ead7819c?auto=format&fit=crop&w=400&q=80'
  };

  const imageUrl = petImages[speciesId] || petImages['sandra_bengal'];

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '50%',
        boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
        background: '#FAF6F0',
        border: '3px solid #EFE6DD'
      }}
    >
      <img
        src={imageUrl}
        alt="Photorealistic Pet Companion"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </div>
  );
}
