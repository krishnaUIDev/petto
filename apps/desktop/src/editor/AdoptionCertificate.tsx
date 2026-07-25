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

  const handleDownloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Dark Slate & Gold Parchment
    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    // Double Gold Foil Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 12;
    ctx.strokeRect(24, 24, 1152, 752);

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 720);

    // Header Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('OFFICIAL CERTIFICATE OF ADOPTION', 600, 120);

    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('PAWSTEP REGISTRY', 600, 180);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px sans-serif';
    ctx.fillText('OFFICIAL COMPANION BIRTH RECORD', 600, 220);

    // Inner Details Card
    ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
    ctx.fillRect(150, 260, 900, 360);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(150, 260, 900, 360);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '24px sans-serif';
    ctx.fillText('This certifies that', 600, 310);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px sans-serif';
    ctx.fillText(pet.name, 600, 390);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px sans-serif';
    ctx.fillText(`a ${pet.speciesName} of ${pet.personality} disposition`, 600, 440);

    // Owner & Birthday
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px sans-serif';
    ctx.fillText('ADOPTED BY (OWNER)', 200, 520);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(pet.ownerName, 200, 560);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px sans-serif';
    ctx.fillText('OFFICIAL BIRTHDAY', 1000, 520);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(formattedBirthday, 1000, 560);

    // Footer Signature
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'italic 32px cursive';
    ctx.fillText('Pawstep Registry', 160, 680);
    ctx.fillStyle = '#64748b';
    ctx.font = '18px sans-serif';
    ctx.fillText('Authorized Signature', 160, 710);

    // Trigger Image Download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${pet.name.replace(/\s+/g, '_')}_Adoption_Certificate.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '2px double #f59e0b',
        borderRadius: '20px',
        padding: '20px 24px',
        maxWidth: '460px',
        margin: '0 auto',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)',
        textAlign: 'center',
        position: 'relative',
        color: '#ffffff'
      }}
    >
      <div style={{ position: 'absolute', top: '12px', right: '16px', color: '#f59e0b', fontSize: '1.5rem' }}>
        📜
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(245, 158, 11, 0.15)',
          color: '#f59e0b',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}
      >
        <Award size={14} /> Official Certificate of Adoption
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', margin: '4px 0', letterSpacing: '-0.5px' }}>
        PAWSTEP REGISTRY
      </h2>
      <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
        Official Companion Birth Record
      </p>

      <div
        style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '14px'
        }}
      >
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>This certifies that</p>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>
          {pet.name}
        </div>
        <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '12px' }}>
          a <span style={{ color: '#8b5cf6', fontWeight: 600 }}>{pet.speciesName}</span> of <span style={{ color: '#ec4899', fontWeight: 600 }}>{pet.personality}</span> disposition
        </div>

        <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'left' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>ADOPTED BY (OWNER)</span>
            <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>{pet.ownerName}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>OFFICIAL BIRTHDAY</span>
            <strong style={{ fontSize: '0.85rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {formattedBirthday}
            </strong>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontFamily: 'cursive', fontSize: '1.05rem', color: '#f59e0b' }}>Pawstep Registry</div>
          <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Authorized Signature</span>
        </div>

        <button
          className="btn btn-primary"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          onClick={handleDownloadCertificate}
        >
          <Download size={14} /> Download Image PNG
        </button>
      </div>
    </div>
  );
}
