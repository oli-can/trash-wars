// src/game/tower.js
import { path } from '../config/path.js';
import { tower } from './tower.js';
import { towerConfig } from '../config/tower.js';
import { checkCollisionWithPath, checkCollisionWithTowers } from './collision.js';


// Placement handler
export function handleTowerPlacement(canvas, towers) {
    let currentTower = null;

    canvas.addEventListener('mousedown', e => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        currentTower = new tower(x, y, { isPlaced: false });
        towers.push(currentTower);
    });

    canvas.addEventListener('mousemove', e => {
        if (!currentTower) return;
        const rect = canvas.getBoundingClientRect();
        currentTower.x = e.clientX - rect.left;
        currentTower.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseup', () => {
        if (!currentTower) return;
        if (currentTower.isValidPlacement(towers.filter(t => t !== currentTower))) {
            currentTower.isPlaced = true;
        } else {
            // Remove invalid placement
            towers.splice(towers.indexOf(currentTower), 1);
        }
        currentTower = null;
    });
}

export class towerManager {
  constructor(canvas, ctx, path, state) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.path = path;
    this.state = state;
    this.towers = [];
  }

  handleClick(e, type = 'basic') {
  const rect = this.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const config = towerTypes[type];
  const newTower = new tower(x, y, config);

  if (newTower.isValidPlacement(this.towers)) {
    if (this.state.money >= newTower.cost) {
      newTower.isPlaced = true;
      this.towers.push(newTower);
      this.state.money -= newTower.cost;
    } else {
      console.log("Not enough money to place tower.");
    }
  } else {
    console.log("Invalid placement.");
  }
}

  update(deltaTime) {
    this.towers.forEach(t => t.update(deltaTime));
  }

  render() {
    this.towers.forEach(t => t.draw(this.ctx));
  }
}
