# CodeX Runner Advanced

A lightweight browser runner game that uses vanilla JavaScript modules to deliver a fast, obstacle-dodging experience on canvas.

## Quick start (static server)
1. Install or use any static file server (examples below).
2. Start the server from the project root.
   - Using Python: `python -m http.server 8000`
   - Using `serve` (Node): `npx serve .`
3. Open `http://localhost:8000` in your browser and play.

> Opening `index.html` directly from the file system will block ES module imports in some browsers. Always run through a static server.

## Tech stack
- HTML5 canvas for rendering.
- Vanilla JavaScript with ES modules for game logic.
- Lightweight DOM and LocalStorage usage for input and high scores.
- Plain CSS for layout and styling.

## Directory map
- `index.html` – Bootstraps the canvas and loads the module entry point.
- `styles.css` – Basic layout and canvas styling.
- `src/config.js` – Tunable game dimensions, speeds, colors, and difficulty curve.
- `src/main.js` – Entry point that wires up core services and scenes.
- `src/core/` – Shared systems (engine, input, audio, utilities).
- `src/entities/` – Gameplay objects (player, obstacles, powerups).
- `src/scenes/` – Scene state machines (menu, gameplay, pause/game over overlays).
- `src/ui/` – HUD overlay for score/high score display.

## System summaries
- **Engine (`src/core/engine.js`)**: Manages the main loop, delta timing, and scene transitions while sharing the input/audio managers with every scene.
- **Input (`src/core/input.js`)**: Tracks keys held vs. single-frame presses so scenes can differentiate continuous movement from discrete actions (e.g., pause/confirm).
- **Player (`src/entities/player.js`)**: Horizontal mover with clamp-to-track logic, configurable speed/size, and a consumable shield visualized via an outline.
- **Track/background**: Gradient canvas fill defined in `GAME_CONFIG` to provide depth while constraining entities to the configured width/height.
- **Obstacles (`src/entities/obstacle.js`)**: Falling blocks spawned at a difficulty-driven interval with speed scaling from score-based multipliers.
- **Powerups (`src/entities/powerup.js`)**: Shield or slow-motion pickups that apply temporary defense or time scaling for the current run.
- **Levels/difficulty**: Dynamic pacing from `GAME_CONFIG.difficulty` decreases spawn intervals every `scoreStepInterval` until reaching `minInterval`, making runs progressively harder.
- **UI (`src/ui/hud.js`, `src/scenes/menuScene.js`, `src/scenes/gameOverScene.js`)**: HUD overlays for score/high score plus menu and pause/death overlays with localized prompts.
- **Audio (`src/core/audio.js`)**: Toggleable audio manager ready to register/play sounds; currently stubbed for future sound effects.

## Extension ideas
- Add sprite art/particle effects and a parallax track to improve visual feedback.
- Introduce varied obstacle patterns (lanes, zigzags) and telegraphed warnings.
- Expand powerups (e.g., magnet, multi-hit shields) with iconography and timers.
- Persist full run history and achievements alongside the existing high score.
- Hook up real sound effects/music and a volume toggle in the UI.
- Package a PWA build for offline play with install prompts.
