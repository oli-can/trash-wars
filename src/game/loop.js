import { gameState } from "./state.js";
import { updateEnemies, drawEnemies } from "./enemies.js";
import { updateTowers, drawTowers } from "./towers.js";
import { updateProjectiles, drawProjectiles } from "./projectiles.js";
import { path } from "../config/path.js";
import { updateUI } from "./ui.js";
import { drawUI } from './ui.js';

// ✅ Single gameLoop definition
export function gameLoop() {
  if (!gameState.gameRunning || gameState.isPaused) {
    requestAnimationFrame(gameLoop);
    return;
  }

  const ctx = gameState.ctx;
  const canvas = gameState.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw path
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 40;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  // Update world
  updateEnemies();
  updateTowers();
  updateProjectiles();

  // Draw world
  drawEnemies();
  drawTowers();
  drawProjectiles();

  // UI layer
  drawUI();
  updateUI();

  // Loop again
  requestAnimationFrame(gameLoop);
}
