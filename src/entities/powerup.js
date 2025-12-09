import { GAME_CONFIG } from "../config.js";
import { randRange } from "../core/utils.js";

export const PowerupType = {
  SHIELD: "shield",
  SLOW: "slow",
};

export class Powerup {
  constructor(type = PowerupType.SHIELD) {
    this.type = type;
    this.size = 30;
    this.x = randRange(0, GAME_CONFIG.width - this.size);
    this.y = -this.size;
    this.speed = 3;
  }

  update(delta) {
    this.y += this.speed;
  }

  isOutOfBounds() {
    return this.y > GAME_CONFIG.height;
  }

  applyTo(player, gameState) {
    if (this.type === PowerupType.SHIELD) {
      player.shield = 1; // ضربة واحدة يتحمّلها
    } else if (this.type === PowerupType.SLOW) {
      gameState.slowMotionTimer = 3000; // إبطاء لمدة 3 ثوانٍ
    }
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.colors.powerup;
    ctx.beginPath();
    ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
