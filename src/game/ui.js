import { gameState } from "./state.js";
import { Tower } from './tower.js';
import { pathTiles } from './config/path.js'; // Make sure this exports your path rectangles

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

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('click', () => {
    const towerX = mouseX - towerSize / 2;
    const towerY = mouseY - towerSize / 2;
    if (canPlaceTower(towerX, towerY)) {
        towers.push(new Tower(towerX, towerY, towerSize));
    }
});

function canPlaceTower(x, y) {
    // Check against path
    for (const tile of pathTiles) {
        if (x + towerSize > tile.x && x < tile.x + tile.width &&
            y + towerSize > tile.y && y < tile.y + tile.height) {
            return false;
        }
    }
    // Check against other towers
    for (const tower of towers) {
        if (tower.collidesWith(x, y, towerSize)) return false;
    }
    return true;
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
