import { InputManager } from "./input.js";

// Input manager that augments keyboard input with touch gestures
// for moving left/right by tapping or dragging on the play area.
export class TouchInput extends InputManager {
  constructor(targetElement, options = {}) {
    super();
    this.targetElement = targetElement || document.body;
    this.touchIdentifier = null;
    this.activeDirection = null;
    this.preventDefault = options.preventDefault ?? true;

    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchMove = this._handleTouchMove.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);

    this.targetElement.addEventListener("touchstart", this._handleTouchStart, { passive: !this.preventDefault });
    this.targetElement.addEventListener("touchmove", this._handleTouchMove, { passive: !this.preventDefault });
    this.targetElement.addEventListener("touchend", this._handleTouchEnd);
    this.targetElement.addEventListener("touchcancel", this._handleTouchEnd);
  }

  startVirtualDirection(direction) {
    const opposite = direction === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
    this.keysDown.delete(opposite);
    this.keysDown.add(direction);
    this.activeDirection = direction;
  }

  endVirtualDirection(direction) {
    if (direction) {
      this.keysDown.delete(direction);
      if (this.activeDirection === direction) {
        this.activeDirection = null;
      }
    }
  }

  _handleTouchStart(e) {
    if (this.preventDefault) e.preventDefault();
    if (this.touchIdentifier !== null) return;
    const touch = e.changedTouches[0];
    this.touchIdentifier = touch.identifier;
    this._updateDirection(touch.clientX);
  }

  _handleTouchMove(e) {
    if (this.preventDefault) e.preventDefault();
    if (this.touchIdentifier === null) return;
    const touch = [...e.changedTouches].find((t) => t.identifier === this.touchIdentifier);
    if (!touch) return;
    this._updateDirection(touch.clientX);
  }

  _handleTouchEnd(e) {
    if (this.touchIdentifier === null) return;
    const touch = [...e.changedTouches].find((t) => t.identifier === this.touchIdentifier);
    if (!touch) return;
    this.endVirtualDirection(this.activeDirection);
    this.touchIdentifier = null;
  }

  _updateDirection(clientX) {
    const rect = this.targetElement.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    const direction = clientX < midpoint ? "ArrowLeft" : "ArrowRight";
    this.startVirtualDirection(direction);
  }
}
