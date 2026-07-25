'use client';

import React, { useState, useEffect } from 'react';
import { Apple, Monitor, CheckCircle, Download, ShieldCheck } from 'lucide-react';

export default function OSInstallerGuide() {
  const [detectedOS, setDetectedOS] = useState<'mac' | 'win' | 'other'>('mac');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes('win')) {
        setDetectedOS('win');
      } else if (ua.includes('mac')) {
        setDetectedOS('mac');
      }
    }
  }, []);

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '840px',
        margin: '0 auto',
        color: '#ffffff'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px' }}>
          <ShieldCheck size={14} /> Auto System Detection & Setup
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
          Installation <span className="gradient-text">Guide & Setup</span>
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
          Detected System: <strong style={{ color: '#c084fc' }}>{detectedOS === 'mac' ? 'macOS (Apple Silicon / Intel)' : 'Windows (x64)'}</strong>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* macOS Setup Card */}
        <div
          style={{
            padding: '24px',
            borderRadius: '20px',
            background: detectedOS === 'mac' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.6)',
            border: `2px solid ${detectedOS === 'mac' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.08)'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Apple size={24} color="#ffffff" />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>macOS Setup (.dmg)</h4>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>macOS 11.0 Big Sur or later</span>
            </div>
          </div>

          <ol style={{ fontSize: '0.82rem', color: '#cbd5e1', paddingLeft: '18px', margin: 0, lineHeight: 1.6 }}>
            <li>Click <strong>Download for macOS</strong> to get <code>Petto.dmg</code>.</li>
            <li>Double click <code>Petto.dmg</code> in your Downloads.</li>
            <li>Drag <strong>Petto.app</strong> into your Applications folder.</li>
            <li>Launch Petto to meet your desktop companion!</li>
          </ol>
        </div>

        {/* Windows Setup Card */}
        <div
          style={{
            padding: '24px',
            borderRadius: '20px',
            background: detectedOS === 'win' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(15, 23, 42, 0.6)',
            border: `2px solid ${detectedOS === 'win' ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Monitor size={24} color="#3b82f6" />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Windows Setup (.exe)</h4>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Windows 10 / 11 64-bit</span>
            </div>
          </div>

          <ol style={{ fontSize: '0.82rem', color: '#cbd5e1', paddingLeft: '18px', margin: 0, lineHeight: 1.6 }}>
            <li>Click <strong>Download for Windows</strong> to get <code>Petto-setup.exe</code>.</li>
            <li>Run <code>Petto-setup.exe</code> to launch the installer.</li>
            <li>Follow the 1-click wizard to complete installation.</li>
            <li>Enjoy your companion floating on your Windows desktop!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
