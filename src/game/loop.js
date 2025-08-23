import { gameState } from "./state.js";
import { updateEnemies, drawEnemies } from "./enemies.js";
import { updateTowers, drawTowers } from "./towers.js";
import { updateProjectiles, drawProjectiles } from "./projectiles.js";
import { path } from "../config/path.js";
import { updateUI } from "./ui.js";

export function gameLoop() {
  if (!gameState.gameRunning || gameState.isPaused) {
    requestAnimationFrame(gameLoop);
    return;
  }

  const ctx = gameState.ctx;
  const canvas = gameState.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw path
 // inside gameLoop in loop.js
ctx.beginPath();
ctx.moveTo(path[0].x, path[0].y);
for (let i = 1; i < path.length; i++) {
  ctx.lineTo(path[i].x, path[i].y);
}
ctx.strokeStyle = "#555";
ctx.lineWidth = 40; // make path wider so it looks like a real road
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.stroke();


  updateEnemies();
  updateTowers();
  updateProjectiles();

  drawEnemies();
  drawTowers();
  drawProjectiles();

  updateUI();
}

  //Draw UI from first moment of the game
import { drawUI } from './game/ui.js';

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();        // your existing function
    drawPath();       // your existing function
    drawUI();         // tower placement & previews
    requestAnimationFrame(gameLoop);
}

gameLoop();


  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


towers.forEach(tower => {
  tower.update(towers, path); // Update placement status
  tower.draw(ctx);            // Draw tower
});

