'use client';

import React, { useState } from 'react';
import { Award, Calendar } from 'lucide-react';

export default function CertificatePreviewer() {
  const [ownerName, setOwnerName] = useState('Alex Parker');
  const [petName, setPetName] = useState('Milo');
  const [species, setSpecies] = useState('Calico Cat');

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: '32px',
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#ffffff'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
          Customize Your <span className="gradient-text">Birth Certificate</span>
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Preview your official Pawstep Registry companion certificate live.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Your Name (Owner)
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Pet Name
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Companion Species
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }}
            >
              <option value="Calico Cat">🐱 Calico Cat</option>
              <option value="Shiba Inu">🐶 Shiba Dog</option>
              <option value="Baby Dragon">🐉 Baby Dragon</option>
              <option value="Cute Slime">🟢 Cute Slime</option>
            </select>
          </div>
        </div>

        {/* Certificate Card Live Preview */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '2px double #f59e0b',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: '10px', right: '14px', color: '#f59e0b', fontSize: '1.4rem' }}>
            📜
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#f59e0b',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            <Award size={12} /> Official Certificate of Adoption
          </div>

          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b', margin: '2px 0' }}>
            PAWSTEP REGISTRY
          </h4>

          <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '12px', margin: '12px 0' }}>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0 }}>This certifies that</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '2px 0' }}>
              {petName || 'Milo'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              a <span style={{ color: '#8b5cf6', fontWeight: 600 }}>{species}</span> companion
            </div>

            <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', marginTop: '10px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textAlign: 'left' }}>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '0.65rem', display: 'block' }}>OWNER</span>
                <strong>{ownerName || 'Alex Parker'}</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.65rem', display: 'block' }}>DATE</span>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>{todayStr}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
