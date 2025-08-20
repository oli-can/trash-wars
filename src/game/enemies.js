import { gameState } from "./state.js";
import { enemyTypes } from "../config/enemies.js";
import { path } from "../config/path.js";

export function spawnEnemy(type = "basic") {
  const e = {
    ...enemyTypes[type],
    x: path[0].x,
    y: path[0].y,
    pathIndex: 0,
    health: enemyTypes[type].health
  };
  gameState.enemies.push(e);
}

export function updateEnemies() {
  const speedMult = 2; // adjust difficulty
  for (let i = gameState.enemies.length - 1; i >= 0; i--) {
    let e = gameState.enemies[i];
    let target = path[e.pathIndex + 1];
    if (!target) {
      gameState.health--;
      gameState.enemies.splice(i, 1);
      continue;
    }

    let dx = target.x - e.x;
    let dy = target.y - e.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 1) {
      e.pathIndex++;
    } else {
      e.x += (dx / dist) * e.speed * speedMult;
      e.y += (dy / dist) * e.speed * speedMult;
    }

    if (e.health <= 0) {
      gameState.coins += e.reward;
      gameState.enemies.splice(i, 1);
    }
  }
}

export function drawEnemies() {
  const ctx = gameState.ctx;
  gameState.enemies.forEach(e => {
    ctx.fillStyle = e.color;
    ctx.beginPath();
    ctx.arc(e.x, e.y, 15, 0, Math.PI * 2);
    ctx.fill();

    // Health bar
    ctx.fillStyle = "red";
    ctx.fillRect(e.x - 15, e.y - 20, 30, 5);
    ctx.fillStyle = "lime";
    ctx.fillRect(e.x - 15, e.y - 20, (e.health / enemyTypes.basic.health) * 30, 5);
  });
}
