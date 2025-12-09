// نظام صوت بسيط جداً – حالياً بدون ملفات حقيقية
// يمكن لاحقاً إضافة أصوات حقيقية (collision, powerup, click)

export class AudioManager {
  constructor() {
    this.enabled = true;
    this.sounds = new Map();
  }

  // في المستقبل: تحميل ملفات صوت
  registerSound(name, src) {
    const audio = new Audio(src);
    this.sounds.set(name, audio);
  }

  play(name) {
    if (!this.enabled) return;
    const audio = this.sounds.get(name);
    if (audio) {
      // تشغيل نسخة جديدة حتى لا تنقطع
      const clone = audio.cloneNode();
      clone.play().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
  }
}
