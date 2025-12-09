import { clamp } from "../core/utils.js";
import { GAME_CONFIG } from "../config.js";

export class Player {
  constructor() {
    this.width = GAME_CONFIG.player.width;
    this.height = GAME_CONFIG.player.height;
    this.reset();
  }

  reset() {
    this.x = GAME_CONFIG.width / 2 - this.width / 2;
    this.y = GAME_CONFIG.height - this.height - 10;
    this.speed = GAME_CONFIG.player.speed;
    this.shield = 0; // عدد الضربات التي يتحمّلها (من الـ powerup)
  }

  update(input, delta) {
    if (input.isDown("ArrowLeft") || input.isDown("a")) {
      this.x -= this.speed;
    }
    if (input.isDown("ArrowRight") || input.isDown("d")) {
      this.x += this.speed;
    }

    this.x = clamp(this.x, 0, GAME_CONFIG.width - this.width);
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.colors.player;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // إذا كان عنده درع، نرسم حافة حوله
    if (this.shield > 0) {
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x - 3, this.y - 3, this.width + 6, this.height + 6);
    }
  }
}
