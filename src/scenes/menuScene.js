import { BaseScene } from "./baseScene.js";
import { GAME_CONFIG } from "../config.js";

export class MenuScene extends BaseScene {
  constructor(engine, startGameCallback) {
    super(engine);
    this.startGameCallback = startGameCallback;
  }

  update(delta) {
    if (this.input.consumePressed("Enter")) {
      this.startGameCallback();
    }
  }

  draw(ctx) {
    // خلفية
    const grad = ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.height);
    grad.addColorStop(0, "#050505");
    grad.addColorStop(1, "#151515");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

    ctx.textAlign = "center";

    ctx.fillStyle = "#00d4ff";
    ctx.font = "42px Arial";
    ctx.fillText("CodeX Runner", GAME_CONFIG.width / 2, GAME_CONFIG.height / 2 - 80);

    ctx.fillStyle = "#ffffff";
    ctx.font = "22px Arial";
    ctx.fillText(
      "تحرّك بالأسهم ← → وتجنّب المربعات الحمراء",
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2 - 20
    );

    ctx.font = "20px Arial";
    ctx.fillText(
      "Powerups ذهبية: درع أو إبطاء الوقت",
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2 + 15
    );

    ctx.fillStyle = "#aaaaaa";
    ctx.font = "18px Arial";
    ctx.fillText(
      "اضغط Enter للبدء · اضغط P للإيقاف المؤقت أثناء اللعب",
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2 + 55
    );

    ctx.textAlign = "left";
  }
}
