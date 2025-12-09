// إدارة إدخال لوحة المفاتيح لتستخدمه كل المشاهد

export class InputManager {
  constructor() {
    this.keysDown = new Set();
    this.keysPressedOnce = new Set();

    document.addEventListener("keydown", (e) => {
      if (!this.keysDown.has(e.key)) {
        this.keysPressedOnce.add(e.key);
      }
      this.keysDown.add(e.key);
    });

    document.addEventListener("keyup", (e) => {
      this.keysDown.delete(e.key);
    });
  }

  isDown(key) {
    return this.keysDown.has(key);
  }

  // يتم مسح الضغط بعد قراءة واحدة فقط
  consumePressed(key) {
    if (this.keysPressedOnce.has(key)) {
      this.keysPressedOnce.delete(key);
      return true;
    }
    return false;
  }

  // استدعائها في آخر كل إطار
  endFrame() {
    this.keysPressedOnce.clear();
  }
}
