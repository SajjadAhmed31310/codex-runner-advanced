import { BaseScene } from "./baseScene.js";
import { GAME_CONFIG } from "../config.js";
import { Player } from "../entities/player.js";
import { Obstacle } from "../entities/obstacle.js";
import { Powerup, PowerupType } from "../entities/powerup.js";
import { HUD } from "../ui/hud.js";
import { rectsOverlap } from "../core/utils.js";

export class GameScene extends BaseScene {
  constructor(engine, onGameOver) {
    super(engine);
    this.onGameOver = onGameOver;

    this.player = new Player();
    this.obstacles = [];
    this.powerups = [];
    this.hud = new HUD();
    this.hud.loadHighScore();

    this.score = 0;
    this.elapsed = 0;
    this.lastObstacleTime = 0;
    this.lastPowerupTime = 0;

    this.slowMotionTimer = 0;
    this.paused = false;
  }

  onEnter() {
    this.reset();
  }

  reset() {
    this.player.reset();
    this.obstacles = [];
    this.powerups = [];
    this.score = 0;
    this.elapsed = 0;
    this.lastObstacleTime = 0;
    this.lastPowerupTime = 0;
    this.slowMotionTimer = 0;
  }

  update(delta) {
    // إيقاف مؤقت
    if (this.input.consumePressed("p") || this.input.consumePressed("P")) {
      this.engine.setScene(this.onGameOver("pause")); // سنستخدم GameOverScene لنصّين مختلفين
      return;
    }

    this.elapsed += delta;

    // إذا كان مفعّل إبطاء الوقت نعدّل الزمن الفعلي
    let timeFactor = 1;
    if (this.slowMotionTimer > 0) {
      this.slowMotionTimer -= delta;
      timeFactor = 0.4;
    }

    const effectiveDelta = delta * timeFactor;

    this.player.update(this.input, effectiveDelta);

    // حساب الصعوبة (الفاصل بين العوائق)
    const diffCfg = GAME_CONFIG.difficulty;
    const steps = Math.floor(this.score / diffCfg.scoreStepInterval);
    const interval =
      diffCfg.baseInterval - steps * diffCfg.intervalStep > diffCfg.minInterval
        ? diffCfg.baseInterval - steps * diffCfg.intervalStep
        : diffCfg.minInterval;

    // توليد عائق
    if (this.elapsed - this.lastObstacleTime > interval) {
      const speedMultiplier = 1 + this.score * 0.02;
      this.obstacles.push(new Obstacle(speedMultiplier));
      this.lastObstacleTime = this.elapsed;
    }

    // توليد Powerup كل فترة
    if (this.elapsed - this.lastPowerupTime > 7000) {
      const type = Math.random() < 0.5 ? PowerupType.SHIELD : PowerupType.SLOW;
      this.powerups.push(new Powerup(type));
      this.lastPowerupTime = this.elapsed;
    }

    // تحديث العوائق
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      o.update(effectiveDelta);
      if (o.isOutOfBounds()) {
        this.obstacles.splice(i, 1);
        this.score += 1;
      }
    }

    // تحديث الـ Powerups
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const p = this.powerups[i];
      p.update(effectiveDelta);
      if (p.isOutOfBounds()) {
        this.powerups.splice(i, 1);
      }
    }

    // اصطدام مع العوائق
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      if (
        rectsOverlap(
          { x: this.player.x, y: this.player.y, width: this.player.width, height: this.player.height },
          { x: o.x, y: o.y, width: o.width, height: o.height }
        )
      ) {
        if (this.player.shield > 0) {
          this.player.shield -= 1;
          this.obstacles.splice(i, 1);
        } else {
          this.hud.setScore(this.score);
          this.onGameOver("death", this.score, this.hud.highScore);
          return;
        }
      }
    }

    // اصطدام مع Powerups
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const p = this.powerups[i];
      if (
        rectsOverlap(
          { x: this.player.x, y: this.player.y, width: this.player.width, height: this.player.height },
          { x: p.x, y: p.y, width: p.size, height: p.size }
        )
      ) {
        p.applyTo(this.player, this);
        this.powerups.splice(i, 1);
      }
    }

    this.hud.setScore(this.score);
  }

  draw(ctx) {
    // خلفية متدرجة بسيطة
    const grad = ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.height);
    grad.addColorStop(0, GAME_CONFIG.colors.backgroundTop);
    grad.addColorStop(1, GAME_CONFIG.colors.backgroundBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

    // اللاعب
    this.player.draw(ctx);

    // العوائق
    this.obstacles.forEach((o) => o.draw(ctx));

    // Powerups
    this.powerups.forEach((p) => p.draw(ctx));

    // HUD
    this.hud.draw(ctx);

    // إشارة صغيرة إذا كان تباطؤ مفعّل
    if (this.slowMotionTimer > 0) {
      ctx.fillStyle = "rgba(0, 255, 255, 0.2)";
      ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
      ctx.fillStyle = "#aaffff";
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Slow Motion!",
        GAME_CONFIG.width / 2,
        60
      );
      ctx.textAlign = "left";
    }
  }
}
