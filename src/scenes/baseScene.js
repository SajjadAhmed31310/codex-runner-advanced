// مشهد أساسي تُشتقّ منه باقي المشاهد

export class BaseScene {
  constructor(engine) {
    this.engine = engine;
    this.input = engine.input;
    this.audio = engine.audio;
  }

  onEnter() {}
  onExit() {}
  update(delta) {}
  draw(ctx) {}
}
