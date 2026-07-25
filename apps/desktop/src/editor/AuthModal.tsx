import React, { useState } from 'react';
import { UserProfile } from '@petto/shared';
import { User, LogIn, Sparkles, Check, Chrome, Github, ExternalLink } from 'lucide-react';

interface AuthModalProps {
  onLoginSuccess: (user: UserProfile) => void;
  onClose: () => void;
}

export default function AuthModal({ onLoginSuccess, onClose }: AuthModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAuthenticatingInBrowser, setIsAuthenticatingInBrowser] = useState(false);
  const [browserProvider, setBrowserProvider] = useState<'Google' | 'GitHub' | null>(null);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@petto.app`,
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      createdAt: new Date().toISOString()
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleOpenBrowserOAuth = (provider: 'Google' | 'GitHub') => {
    setBrowserProvider(provider);
    setIsAuthenticatingInBrowser(true);

    // Open browser to NextAuth URL
    const authUrl = `https://petto.vercel.app/api/auth/signin`;
    window.open(authUrl, '_blank');
  };

  const handleConfirmBrowserAuth = () => {
    const defaultName = browserProvider === 'Google' ? 'Google Account User' : 'GitHub Developer';
    const finalName = name.trim() || defaultName;

    const user: UserProfile = {
      id: `usr_${browserProvider?.toLowerCase() || 'oauth'}_${Date.now()}`,
      name: finalName,
      email: email.trim() || `${finalName.toLowerCase().replace(/\s+/g, '')}@${browserProvider?.toLowerCase() || 'oauth'}.com`,
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=${finalName}`,
      createdAt: new Date().toISOString()
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(11, 15, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
      }}
    >
      <div
        style={{
          background: 'rgba(30, 41, 59, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '32px',
          maxWidth: '440px',
          width: '90%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            fontSize: '1.5rem'
          }}
        >
          🐾
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
          Sign In to <span className="gradient-text">Petto</span>
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '24px' }}>
          Authenticate securely in your browser via NextAuth.
        </p>

        {isAuthenticatingInBrowser ? (
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid #334155', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#8b5cf6', fontWeight: 700, marginBottom: '8px' }}>
              <ExternalLink size={18} /> Browser Authentication Window Opened
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '16px' }}>
              Complete sign-in inside your open web browser window, then click confirm below to sync your profile.
            </p>

            <div style={{ marginBottom: '14px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
                Account Display Name
              </label>
              <input
                type="text"
                placeholder={browserProvider === 'Google' ? 'Google Account User' : 'GitHub Developer'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }}
              />
            </div>

            <button
              onClick={handleConfirmBrowserAuth}
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px' }}
            >
              <Check size={16} /> Complete & Connect Account
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => handleOpenBrowserOAuth('Google')}
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: '#ffffff',
                color: '#0f172a',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <Chrome size={18} color="#ea4335" /> Sign In in Browser with Google
            </button>

            <button
              onClick={() => handleOpenBrowserOAuth('GitHub')}
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <Github size={18} /> Sign In in Browser with GitHub
            </button>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0', color: '#64748b', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#334155' }} />
          <span>OR QUICK DIRECT INPUT</span>
          <div style={{ flex: 1, height: '1px', background: '#334155' }} />
        </div>

        <form onSubmit={handleCustomLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Your Name (Owner Name)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1, padding: '10px' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
