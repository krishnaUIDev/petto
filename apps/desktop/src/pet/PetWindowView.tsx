import React, { useEffect, useRef, useState } from 'react';
import { AdoptedPet, PRESET_PETS } from '@petto/shared';
import { PetFSM, FSMState } from './PetFSM';
import { CanvasEngine } from './CanvasEngine';
import { HitTestController } from './HitTest';

interface PetWindowViewProps {
  activePet?: AdoptedPet | null;
}

export default function PetWindowView({ activePet }: PetWindowViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(activePet?.scale || 1.2);
  const [currentState, setCurrentState] = useState<FSMState>('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Determine pet preset configuration or custom manifest
    const preset = PRESET_PETS.find((p) => p.id === activePet?.speciesId) || PRESET_PETS[0];

    const config = activePet?.customManifest || {
      frameWidth: preset.frameWidth,
      frameHeight: preset.frameHeight,
      columns: preset.columns,
      rows: preset.rows,
      fps: preset.fps,
      animations: preset.animations
    };

    const engine = new CanvasEngine(canvas, config);
    if (activePet?.customManifest?.spriteUrl) {
      engine.loadSprite(activePet.customManifest.spriteUrl).catch(() => {});
    }

    const hitTest = new HitTestController(canvas);
    const fsm = new PetFSM((state) => setCurrentState(state));

    let lastTime = performance.now();
    let animId: number;

    const gameLoop = (now: number) => {
      const deltaTimeMs = now - lastTime;
      const deltaTimeSec = deltaTimeMs / 1000;
      lastTime = now;

      fsm.update(deltaTimeSec);
      engine.updateAndRender(fsm.getState(), fsm.getDirection(), scale, deltaTimeMs);

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    // Scroll to resize listener
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prev) => Math.min(Math.max(prev - e.deltaY * 0.001, 0.5), 3.0));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activePet, scale]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        style={{ display: 'block', background: 'transparent' }}
      />
    </div>
  );
}
