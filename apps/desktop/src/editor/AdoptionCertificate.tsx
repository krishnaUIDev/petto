import React from 'react';
import { AdoptedPet } from '@petto/shared';
import { Award, Calendar, Heart, Download } from 'lucide-react';

interface AdoptionCertificateProps {
  pet: AdoptedPet;
  onClose?: () => void;
}

export default function AdoptionCertificate({ pet, onClose }: AdoptionCertificateProps) {
  const formattedBirthday = new Date(pet.birthday).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '3px double #f59e0b',
        borderRadius: '24px',
        padding: '36px',
        maxWidth: '520px',
        margin: '0 auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        textAlign: 'center',
        position: 'relative',
        color: '#ffffff'
      }}
    >
      <div style={{ position: 'absolute', top: '16px', right: '20px', color: '#f59e0b', fontSize: '1.8rem' }}>
        📜
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(245, 158, 11, 0.15)',
          color: '#f59e0b',
          padding: '6px 16px',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}
      >
        <Award size={16} /> Official Certificate of Adoption
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', margin: '8px 0', letterSpacing: '-0.5px' }}>
        PAWSTEP REGISTRY
      </h2>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
        Official Companion Birth Record
      </p>

      <div
        style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}
      >
        <p style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>This certifies that</p>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: '6px 0' }}>
          {pet.name}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '16px' }}>
          a <span style={{ color: '#8b5cf6', fontWeight: 600 }}>{pet.speciesName}</span> of <span style={{ color: '#ec4899', fontWeight: 600 }}>{pet.personality}</span> disposition
        </div>

        <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>ADOPTED BY (OWNER)</span>
            <strong style={{ fontSize: '1rem', color: '#f8fafc' }}>{pet.ownerName}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>OFFICIAL BIRTHDAY</span>
            <strong style={{ fontSize: '0.95rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {formattedBirthday}
            </strong>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: '#f59e0b' }}>Pawstep Registry</div>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Authorized Signature</span>
        </div>

        <button
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
          onClick={() => alert('Certificate image downloaded!')}
        >
          <Download size={16} /> Save Certificate
        </button>
      </div>
    </div>
  );
}
