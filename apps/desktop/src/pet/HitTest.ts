import { invoke } from '@tauri-apps/api/core';

export class HitTestController {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isIgnoringCursor = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Could not get 2D context for alpha hit test');
    this.ctx = ctx;

    this.initEvents();
  }

  private initEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);

      if (x < 0 || y < 0 || x >= this.canvas.width || y >= this.canvas.height) {
        this.setIgnore(true);
        return;
      }

      try {
        const pixel = this.ctx.getImageData(x, y, 1, 1).data;
        const alpha = pixel[3]; // 0 to 255

        if (alpha < 15) {
          this.setIgnore(true);
        } else {
          this.setIgnore(false);
        }
      } catch (err) {
        // Fallback
      }
    });
  }

  private async setIgnore(ignore: boolean) {
    if (this.isIgnoringCursor === ignore) return;
    this.isIgnoringCursor = ignore;
    try {
      await invoke('set_ignore_cursor_events', { ignore });
    } catch (e) {
      // Ignore when running in browser mode
    }
  }
}
