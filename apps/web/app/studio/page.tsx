import React from 'react';
import PetCustomizerStudio from '../components/PetCustomizerStudio';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StudioPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '32px'
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <PetCustomizerStudio />
      </div>
    </div>
  );
}
