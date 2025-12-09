import { GAME_CONFIG } from "./config.js";
import { TouchInput } from "./core/TouchInput.js";
import { AudioManager } from "./core/audio.js";
import { Engine } from "./core/engine.js";

import { MenuScene } from "./scenes/menuScene.js";
import { GameScene } from "./scenes/gameScene.js";
import { GameOverScene } from "./scenes/gameOverScene.js";

// تحضير الـ canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = GAME_CONFIG.width;
canvas.height = GAME_CONFIG.height;

// تهيئة الأنظمة الأساسية
const input = new TouchInput(canvas);
const audio = new AudioManager();
const engine = new Engine(ctx, GAME_CONFIG.width, GAME_CONFIG.height, input, audio);

// نجهّز المشاهد
let menuScene;
let gameScene;
let gameOverScene;

function goToMenu() {
  engine.setScene(menuScene);
}

function startGame() {
  gameScene = new GameScene(engine, (reason, score, highScore) => {
    // عند Game Over أو Pause نستخدم نفس المشهد مع رسالة مختلفة
    if (!gameOverScene) {
      gameOverScene = new GameOverScene(engine);
    }
    if (reason === "pause") {
      gameOverScene.setData(0, 0, "pause", () => {
        engine.setScene(gameScene);
      });
    } else {
      gameOverScene.setData(score, highScore, "death", () => {
        // إعادة إنشاء GameScene من جديد
        startGame();
      });
    }
    engine.setScene(gameOverScene);
  });
  engine.setScene(gameScene);
}

menuScene = new MenuScene(engine, startGame);

// بدء اللعبة من القائمة
engine.setScene(menuScene);
engine.start();

// إعداد أزرار اللمس الاختيارية
const touchControls = document.getElementById("touchControls");
if (touchControls) {
  const leftBtn = touchControls.querySelector('[data-direction="left"]');
  const rightBtn = touchControls.querySelector('[data-direction="right"]');

  const bindButton = (btn, direction) => {
    if (!btn) return;
    const key = direction === "left" ? "ArrowLeft" : "ArrowRight";
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      input.startVirtualDirection(key);
    });
    ["pointerup", "pointerleave", "pointercancel", "pointerout"].forEach((evt) => {
      btn.addEventListener(evt, (e) => {
        e.preventDefault();
        input.endVirtualDirection(key);
      });
    });
  };

  bindButton(leftBtn, "left");
  bindButton(rightBtn, "right");
}
