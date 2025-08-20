import { gameState } from "./state.js";
import { towerTypes } from "../config/towers.js";

export function selectTower(type) {
  gameState.selectedTower = type;
  document.querySelectorAll(".tower-btn").forEach(btn =>
    btn.classList.remove("selected")
  );
  document
    .querySelector(`[data-tower="${type}"]`)
    .classList.add("selected");
}

export function placeTower(x, y) {
  const type = gameState.selectedTower;
  if (!type) return;
  const def = towerTypes[type];
  if (gameState.coins < def.cost) return;

  gameState.towers.push({
    type,
    x,
    y,
    cooldown: 0,
    ...def
  });
  gameState.coins -= def.cost;
}

export function updateTowers() {
  const now = performance.now();
  for (let tower of gameState.towers) {
    if (now - tower.cooldown < tower.fireRate) continue;

    const target = gameState.enemies.find(e => {
      const dx = e.x - tower.x;
      const dy = e.y - tower.y;
      return dx * dx + dy * dy <= tower.range * tower.range;
    });

    if (target) {
      gameState.projectiles.push({
        x: tower.x,
        y: tower.y,
        target,
        damage: tower.damage,
        speed: 5,
        color: tower.color
      });
      tower.cooldown = now;
    }
  }
}

export function drawTowers() {
  const ctx = gameState.ctx;
  gameState.towers.forEach(t => {
    ctx.fillStyle = t.color;
    ctx.beginPath();
    ctx.arc(t.x, t.y, 20, 0, Math.PI * 2);
    ctx.fill();
  });
}
