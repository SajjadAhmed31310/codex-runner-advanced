import { GAME_CONFIG } from "../config.js";

export class HUD {
  constructor() {
    this.score = 0;
    this.highScore = 0;
    this.lives = 1;
  }

  setScore(score) {
    this.score = score;
    if (score > this.highScore) {
      this.highScore = score;
      try {
        localStorage.setItem("codexRunnerHighScore", String(this.highScore));
      } catch (e) {}
    }
  }

  loadHighScore() {
    try {
      const stored = localStorage.getItem("codexRunnerHighScore");
      if (stored !== null) {
        this.highScore = parseInt(stored) || 0;
      }
    } catch (e) {}
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.colors.hudText;
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + this.score, 10, 30);

    ctx.textAlign = "right";
    ctx.fillText("High: " + this.highScore, GAME_CONFIG.width - 10, 30);
    ctx.textAlign = "left";
  }
}
