import { gameState } from "./state.js";

export function updateProjectiles() {
  for (let i = gameState.projectiles.length - 1; i >= 0; i--) {
    let p = gameState.projectiles[i];
    let dx = p.target.x - p.x;
    let dy = p.target.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 5) {
      p.target.health -= p.damage;
      gameState.projectiles.splice(i, 1);
      continue;
    }

    p.x += (dx / dist) * p.speed;
    p.y += (dy / dist) * p.speed;
  }
}

export function drawProjectiles() {
  const ctx = gameState.ctx;
  gameState.projectiles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}
