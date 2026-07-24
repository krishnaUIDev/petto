'use client';

import React, { useState } from 'react';
import LaptopMockup from './components/LaptopMockup';
import { PRESET_PETS } from '@petto/shared';
import { Apple, Monitor, Sparkles, Heart, FileCheck, Upload, Disc as Discord, Instagram, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [selectedPet, setSelectedPet] = useState(PRESET_PETS[0]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* Top Navbar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(16px)',
          background: 'rgba(11, 15, 23, 0.8)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem'
            }}
          >
            🐾
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }} className="brand-font">
            Petto
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '28px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-muted)' }}>
          <a href="#features" style={{ transition: 'color 0.2s' }}>Features</a>
          <a href="#catalog" style={{ transition: 'color 0.2s' }}>Pet Catalog</a>
          <a href="#certificate" style={{ transition: 'color 0.2s' }}>Adoption Certificate</a>
          <a href="#creator" style={{ transition: 'color 0.2s' }}>Custom Creator</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <Discord size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <Instagram size={20} />
          </a>
          <button className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 40px 100px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(139, 92, 246, 0.15)',
              color: 'var(--accent-violet)',
              fontWeight: 600,
              fontSize: '0.85rem',
              marginBottom: '24px',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            <Sparkles size={14} /> Desktop Companions Reinvented
          </div>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: '24px'
            }}
          >
            Meet your <br />
            <span className="gradient-text">desktop pet</span>
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '36px',
              maxWidth: '480px',
              lineHeight: 1.6
            }}
          >
            Petto brings interactive animated companions gently to life on your desktop screen with custom adoption, dynamic behaviors, and official birth certificates.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">
              <Apple size={20} /> Download for macOS
            </button>
            <button className="btn btn-secondary">
              <Monitor size={20} /> Download for Windows
            </button>
          </div>
        </div>

        <div>
          <LaptopMockup />
        </div>
      </section>

      {/* Preset Pet Catalog Showcase */}
      <section
        id="catalog"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 40px',
          borderTop: '1px solid var(--bg-card-border)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Choose Your <span className="gradient-text">Companion</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Select from our pre-loaded pixel pets or create your own custom companion.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {PRESET_PETS.map((pet) => (
            <div
              key={pet.id}
              className="glass-panel"
              style={{
                padding: '28px',
                transition: 'all 0.3s',
                cursor: 'pointer',
                borderColor: selectedPet.id === pet.id ? 'var(--accent-violet)' : 'var(--bg-card-border)',
                boxShadow: selectedPet.id === pet.id ? '0 10px 30px -10px rgba(139, 92, 246, 0.5)' : 'none'
              }}
              onClick={() => setSelectedPet(pet)}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `${pet.previewColor}20`,
                  border: `1px solid ${pet.previewColor}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '20px'
                }}
              >
                {pet.species === 'Cat' ? '🐱' : pet.species === 'Dog' ? '🐶' : pet.species === 'Dragon' ? '🐉' : '🟢'}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>{pet.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{pet.description}</p>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: pet.previewColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Personality: {pet.defaultPersonality}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adoption Certificate Showcase */}
      <section
        id="certificate"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          borderTop: '1px solid var(--bg-card-border)'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(234, 179, 8, 0.15)',
              color: '#f59e0b',
              fontWeight: 600,
              fontSize: '0.85rem',
              marginBottom: '20px'
            }}
          >
            <FileCheck size={14} /> Official Birth Certificate
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px' }}>
            Adopt & Celebrate <br />
            Their <span className="gradient-text">Official Birthday</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
            When you adopt a pet, your pet's adoption date becomes their official birthday! Petto generates a gold-embossed digital birth certificate that you can view and download anytime.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
              <Heart size={18} color="var(--accent-pink)" /> Give your pet a custom name & personality
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
              <Sparkles size={18} color="var(--accent-violet)" /> Birthday celebration animations on screen
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
              <FileCheck size={18} color="#f59e0b" /> Downloadable PNG certificate for social sharing
            </li>
          </ul>
        </div>

        {/* Certificate Card Mockup */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.05) 0%, rgba(30, 41, 59, 0.8) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📜</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '1px', color: '#f59e0b', textTransform: 'uppercase' }}>
            Certificate of Adoption
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>PETTO OFFICIAL COMPANION REGISTRY</p>
          
          <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>This certifies that</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>Milo</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              was adopted by <strong style={{ color: 'var(--accent-violet)' }}>Alex Parker</strong> on <br />
              <span style={{ color: '#f59e0b', fontWeight: 600 }}>July 24, 2026</span> (Official Birthday)
            </div>
          </div>
        </div>
      </section>

      {/* Custom Pet Creator Showcase */}
      <section
        id="creator"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 40px 120px 40px',
          borderTop: '1px solid var(--bg-card-border)'
        }}
      >
        <div className="glass-panel" style={{ padding: '60px', borderRadius: '32px', textAlign: 'center' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}
          >
            <Upload size={28} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
            Create & Upload <span className="gradient-text">Your Own Pet</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 36px auto' }}>
            Have a custom sprite sheet or your real-life pet drawn in pixel art? Upload your custom PNG/GIF sprite sheets, slice grid frames, and test animations on our live editor!
          </p>
          <button className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
            Explore Custom Creator <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--bg-card-border)', padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>© 2026 Petto Desktop Companions. All rights reserved.</p>
      </footer>
    </div>
  );
}
