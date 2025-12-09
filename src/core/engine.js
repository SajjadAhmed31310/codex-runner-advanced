// المحرك: إدارة الحلقة الرئيسية وتبديل المشاهد

export class Engine {
  constructor(ctx, width, height, inputManager, audioManager) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.input = inputManager;
    this.audio = audioManager;

    this.currentScene = null;
    this.lastTimestamp = performance.now();
    this._loop = this._loop.bind(this);
  }

  setScene(scene) {
    if (this.currentScene && this.currentScene.onExit) {
      this.currentScene.onExit();
    }
    this.currentScene = scene;
    if (this.currentScene && this.currentScene.onEnter) {
      this.currentScene.onEnter();
    }
  }

  start() {
    this.lastTimestamp = performance.now();
    requestAnimationFrame(this._loop);
  }

  _loop(timestamp) {
    const delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (this.currentScene) {
      this.currentScene.update(delta);
      this.currentScene.draw(this.ctx);
    }

    this.input.endFrame();
    requestAnimationFrame(this._loop);
  }
}
