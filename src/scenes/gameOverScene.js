import { BaseScene } from "./baseScene.js";
import { GAME_CONFIG } from "../config.js";

export class GameOverScene extends BaseScene {
  constructor(engine, lastScore = 0, highScore = 0, message = "game") {
    super(engine);
    this.lastScore = lastScore;
    this.highScore = highScore;
    this.messageType = message; // "death" أو "pause"
    this._callback = null;
  }

  setData(lastScore, highScore, message, callback) {
    this.lastScore = lastScore;
    this.highScore = highScore;
    this.messageType = message;
    this._callback = callback;
  }

  update(delta) {
    if (this.input.consumePressed("Enter")) {
      if (this._callback) this._callback();
    }
  }

  draw(ctx) {
    // خلفية شفافة فوق اللعبة
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

    ctx.textAlign = "center";

    if (this.messageType === "pause") {
      ctx.fillStyle = "#ffff55";
      ctx.font = "40px Arial";
      ctx.fillText("متوقّف مؤقّتاً", GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 - 30);

      ctx.fillStyle = "#ffffff";
      ctx.font = "22px Arial";
      ctx.fillText(
        "اضغط Enter للعودة إلى اللعب",
        GAME_CONFIG.width / 2,
        GAME_CONFIG.height / 2 + 10
      );
    } else {
      ctx.fillStyle = "#ff4444";
      ctx.font = "40px Arial";
      ctx.fillText("Game Over", GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 - 40);

      ctx.fillStyle = "#ffffff";
      ctx.font = "22px Arial";
      ctx.fillText(
        `Score: ${this.lastScore} · High: ${this.highScore}`,
        GAME_CONFIG.width / 2,
        GAME_CONFIG.height / 2
      );

      ctx.font = "20px Arial";
      ctx.fillText(
        "اضغط Enter للعب مرة أخرى",
        GAME_CONFIG.width / 2,
        GAME_CONFIG.height / 2 + 40
      );
    }

    ctx.textAlign = "left";
  }
}
