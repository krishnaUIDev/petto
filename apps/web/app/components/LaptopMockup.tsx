'use client';

import React, { useEffect, useRef } from 'react';
import { PRESET_PETS } from '@petto/shared';

export default function LaptopMockup() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let posX = 40;
    let posY = 150;
    let direction = 1;
    let frame = 0;
    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw simulated desktop wallpaper gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e1b4b');
      gradient.addColorStop(0.5, '#311b92');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle desktop taskbar at bottom
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fillRect(0, canvas.height - 24, canvas.width, 24);

      // Draw simulated desktop app windows
      ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(30, 30, 200, 100, 8);
      ctx.fill();
      ctx.stroke();

      // Window Header dots
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(42, 42, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(54, 42, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(66, 42, 4, 0, Math.PI * 2); ctx.fill();

      // Move pet sprite back and forth
      posX += direction * 0.8;
      if (posX > canvas.width - 80) direction = -1;
      if (posX < 30) direction = 1;

      // Draw animated pet sprite (Shiba / Cat pixel representation)
      ctx.save();
      ctx.translate(posX + 20, posY + 20);
      if (direction === -1) ctx.scale(-1, 1);

      // Draw cute pixel body
      ctx.fillStyle = '#f59e0b'; // Shiba Orange body
      ctx.fillRect(-16, -12, 32, 24);
      // Head
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(8, -20, 16, 16);
      // Ears
      ctx.fillStyle = '#b45309';
      ctx.fillRect(10, -26, 4, 6);
      ctx.fillRect(18, -26, 4, 6);
      // Tail (wagging animation)
      const tailOffset = Math.sin(frame * 0.2) * 4;
      ctx.fillRect(-22, -18 + tailOffset, 8, 8);

      // Legs (walking animation step)
      const legStep = Math.sin(frame * 0.3) * 4;
      ctx.fillStyle = '#d97706';
      ctx.fillRect(-10, 12, 6, 8 + legStep);
      ctx.fillRect(4, 12, 6, 8 - legStep);

      ctx.restore();

      frame++;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '520px', margin: '0 auto' }}>
      {/* Laptop Screen Frame */}
      <div
        style={{
          background: '#1e293b',
          border: '12px solid #0f172a',
          borderRadius: '16px 16px 4px 4px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <canvas
          ref={canvasRef}
          width={480}
          height={280}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
      {/* Laptop Base */}
      <div
        style={{
          height: '14px',
          background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: '60px',
            height: '4px',
            background: '#64748b',
            borderRadius: '2px',
            margin: '0 auto'
          }}
        />
      </div>
    </div>
  );
}
