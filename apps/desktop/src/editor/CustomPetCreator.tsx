import React, { useState, useRef, useEffect } from 'react';
import { CustomPetManifest, AnimationStateFrames } from '@petto/shared';
import { Upload, Play, Check, Sparkles } from 'lucide-react';

interface CustomPetCreatorProps {
  onSaveCustomPet: (manifest: CustomPetManifest) => void;
}

export default function CustomPetCreator({ onSaveCustomPet }: CustomPetCreatorProps) {
  const [petName, setPetName] = useState('My Pixel Friend');
  const [spriteUrl, setSpriteUrl] = useState<string | null>(null);
  const [frameWidth, setFrameWidth] = useState(64);
  const [frameHeight, setFrameHeight] = useState(64);
  const [columns, setColumns] = useState(4);
  const [rows, setRows] = useState(4);
  const [fps, setFps] = useState(8);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSpriteUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!spriteUrl || !previewCanvasRef.current) return;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = spriteUrl;
    let frameIndex = 0;
    let animId: number;

    img.onload = () => {
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const col = frameIndex % columns;
        const row = Math.floor(frameIndex / columns);

        ctx.drawImage(
          img,
          col * frameWidth,
          row * frameHeight,
          frameWidth,
          frameHeight,
          (canvas.width - frameWidth) / 2,
          (canvas.height - frameHeight) / 2,
          frameWidth,
          frameHeight
        );

        frameIndex = (frameIndex + 1) % (columns * rows);
        setTimeout(() => {
          animId = requestAnimationFrame(render);
        }, 1000 / fps);
      };
      render();
    };

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [spriteUrl, frameWidth, frameHeight, columns, rows, fps]);

  const handleSave = () => {
    if (!spriteUrl) {
      alert('Please upload a sprite sheet image first!');
      return;
    }

    const manifest: CustomPetManifest = {
      id: `custom_${Date.now()}`,
      name: petName,
      spriteUrl: spriteUrl,
      frameWidth,
      frameHeight,
      columns,
      rows,
      fps,
      animations: {
        idle: Array.from({ length: columns }, (_, i) => i),
        walk: Array.from({ length: columns }, (_, i) => i + columns),
        sit: Array.from({ length: columns }, (_, i) => i + columns * 2),
        sleep: Array.from({ length: columns }, (_, i) => i + columns * 3)
      },
      isCustom: true
    };

    onSaveCustomPet(manifest);
  };

  return (
    <div style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles color="#8b5cf6" /> Custom Pet Creator & Slicer
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
        Upload any PNG or GIF sprite sheet, set grid dimensions, and test animations live before adopting!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Pet Name
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Upload Sprite Sheet (PNG / GIF)
            </label>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileUpload}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Frame W (px)</label>
              <input
                type="number"
                value={frameWidth}
                onChange={(e) => setFrameWidth(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Frame H (px)</label>
              <input
                type="number"
                value={frameHeight}
                onChange={(e) => setFrameHeight(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Columns</label>
              <input
                type="number"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Rows</label>
              <input
                type="number"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>FPS</label>
              <input
                type="number"
                value={fps}
                onChange={(e) => setFps(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', border: '1px solid #334155', color: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#8b5cf6', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Play size={14} /> Live Slicer Animation Preview
          </h4>

          {spriteUrl ? (
            <canvas ref={previewCanvasRef} width={140} height={140} style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #334155' }} />
          ) : (
            <div style={{ width: '140px', height: '140px', background: '#0f172a', borderRadius: '12px', border: '1px dashed #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.85rem' }}>
              Upload Image
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={handleSave}
            style={{ marginTop: '24px', width: '100%', padding: '12px' }}
          >
            <Check size={18} /> Save & Add to Catalog
          </button>
        </div>
      </div>
    </div>
  );
}
