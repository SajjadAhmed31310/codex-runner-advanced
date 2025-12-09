import { GAME_CONFIG } from "../config.js";
import { randRange } from "../core/utils.js";

export class Obstacle {
  constructor(speedMultiplier = 1) {
    this.width = GAME_CONFIG.obstacle.width;
    this.height = GAME_CONFIG.obstacle.height;
    this.x = randRange(0, GAME_CONFIG.width - this.width);
    this.y = -this.height;
    const base = GAME_CONFIG.obstacle.baseSpeed;
    this.speed = base * speedMultiplier;
  }

  update(delta) {
    this.y += this.speed;
  }

  isOutOfBounds() {
    return this.y > GAME_CONFIG.height;
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.colors.obstacle;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
