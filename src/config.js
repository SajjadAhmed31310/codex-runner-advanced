// إعدادات عامة للعبة – يمكن تعديلها بسهولة
export const GAME_CONFIG = {
  width: 800,
  height: 600,
  player: {
    width: 50,
    height: 50,
    speed: 7,
  },
  obstacle: {
    width: 50,
    height: 50,
    baseSpeed: 4,
  },
  difficulty: {
    baseInterval: 900,
    minInterval: 220,
    scoreStepInterval: 5,   // كل 5 نقاط نقلل الفاصل
    intervalStep: 50,
  },
  colors: {
    backgroundTop: "#05070a",
    backgroundBottom: "#181c20",
    player: "#00ff7f",
    obstacle: "#ff4b4b",
    powerup: "#ffd700",
    hudText: "#ffffff",
  },
};
