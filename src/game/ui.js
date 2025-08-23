import { gameState } from "./state.js";
import { tower } from './tower.js';
import { path } from '../config/path.js'; // Make sure this exports your path rectangles

export function updateUI() {
  document.getElementById("coins").textContent = gameState.coins;
  document.getElementById("health").textContent = gameState.health;
  document.getElementById("wave").textContent = gameState.wave;
  document.getElementById("enemies").textContent = gameState.enemies.length;
}

//Tower Logic appending base ui state


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let mouseX = 0;
let mouseY = 0;
const towerSize = 40;
const towers = [];
const roadWidth = 40;   // match the width used when drawing the path

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('click', () => {
    const towerX = mouseX - towerSize / 2;
    const towerY = mouseY - towerSize / 2;
    if (canPlaceTower(towerX, towerY)) {
        towers.push(new tower(towerX, towerY, towerSize));
    }
});


export function canPlaceTower(x, y, existingTowers = []) {
  // Check distance to path segments
  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];

    const dist = pointToSegmentDistance(x, y, p1, p2);
    if (dist < towerRadius + roadWidth / 2) return false; // too close to path
  }

  // Check distance to other towers
  for (const tower of existingTowers) {
    const dx = tower.x - x;
    const dy = tower.y - y;
    if (Math.sqrt(dx * dx + dy * dy) < towerRadius * 2) return false;
  }

  return true; // placement is valid
}

// Helper: distance from point (px,py) to line segment p1-p2
function pointToSegmentDistance(px, py, p1, p2) {
  const A = px - p1.x;
  const B = py - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let t = lenSq !== 0 ? dot / lenSq : -1;

  if (t < 0) return Math.sqrt((px - p1.x) ** 2 + (py - p1.y) ** 2);
  else if (t > 1) return Math.sqrt((px - p2.x) ** 2 + (py - p2.y) ** 2);

  const projX = p1.x + t * C;
  const projY = p1.y + t * D;
  return Math.sqrt((px - projX) ** 2 + (py - projY) ** 2);
}



function drawTowerPreview() {
    const x = mouseX - towerSize / 2;
    const y = mouseY - towerSize / 2;
    ctx.fillStyle = canPlaceTower(x, y) ? 'rgba(0,255,0,0.5)' : 'rgba(255,0,0,0.5)';
    ctx.fillRect(x, y, towerSize, towerSize);
}



export function drawUI() {
    // Draw existing towers
    for (const tower of towers) {
        tower.draw(ctx);
    }
    // Draw hover preview
    drawTowerPreview();
}
