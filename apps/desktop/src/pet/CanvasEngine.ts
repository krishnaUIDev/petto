import { AnimationStateFrames } from '@petto/shared';
import { FSMState } from './PetFSM';

export interface CanvasEngineConfig {
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  fps: number;
  animations: AnimationStateFrames;
  scale?: number;
}

export class CanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement | null = null;
  private config: CanvasEngineConfig;
  private currentFrameIndex = 0;
  private frameTimer = 0;
  private isLoaded = false;

  constructor(canvas: HTMLCanvasElement, config: CanvasEngineConfig) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D canvas context');
    this.ctx = ctx;
    this.config = config;
  }

  public loadSprite(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.image = img;
        this.isLoaded = true;
        resolve();
      };
      img.onerror = (err) => reject(err);
    });
  }

  public drawFallbackPet(state: FSMState, direction: 1 | -1, scale: number = 1.0) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2 + 10);
    ctx.scale(direction * scale, scale);

    // Cute fallback pixel cat / shiba drawing
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-20, -15, 40, 30);
    // Head
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(10, -25, 20, 20);
    // Ears
    ctx.fillStyle = '#b45309';
    ctx.fillRect(12, -32, 6, 8);
    ctx.fillRect(22, -32, 6, 8);

    // Eyes
    ctx.fillStyle = '#000000';
    if (state === 'sleep') {
      ctx.fillRect(20, -18, 6, 2); // Closed sleeping eyes
    } else {
      ctx.fillRect(22, -20, 4, 4);
    }

    ctx.restore();
  }

  public updateAndRender(state: FSMState, direction: 1 | -1, scale: number = 1.0, deltaTimeMs: number) {
    if (!this.isLoaded || !this.image) {
      this.drawFallbackPet(state, direction, scale);
      return;
    }

    const stateAnim = this.config.animations[state as keyof AnimationStateFrames] || this.config.animations.idle;
    const framesCount = stateAnim.length;

    this.frameTimer += deltaTimeMs;
    const frameDuration = 1000 / (this.config.fps || 8);

    if (this.frameTimer >= frameDuration) {
      this.currentFrameIndex = (this.currentFrameIndex + 1) % framesCount;
      this.frameTimer = 0;
    }

    const frameId = stateAnim[this.currentFrameIndex] || 0;
    const col = frameId % this.config.columns;
    const row = Math.floor(frameId / this.config.columns);

    const sx = col * this.config.frameWidth;
    const sy = row * this.config.frameHeight;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    this.ctx.translate(centerX, centerY);
    this.ctx.scale(direction * scale, scale);

    this.ctx.drawImage(
      this.image,
      sx,
      sy,
      this.config.frameWidth,
      this.config.frameHeight,
      -this.config.frameWidth / 2,
      -this.config.frameHeight / 2,
      this.config.frameWidth,
      this.config.frameHeight
    );

    this.ctx.restore();
  }
}
