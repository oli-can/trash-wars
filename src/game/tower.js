// src/game/tower.js
import { path } from '../config/path.js';

export class Tower {
  constructor(x, y, config = {}) {
    this.x = x;
    this.y = y;
    this.radius = config.radius || 20;
    this.range = config.range || 100;
    this.fireRate = config.fireRate || 1000;
    this.cost = config.cost || 20;
    this.damage = config.damage || 10;
    this.color = config.color || 'gray';
    this.splash = config.splash || false;
    this.slow = config.slow || false;
    this.lastShot = 0;
    this.isPlaced = config.isPlaced || false;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.isValidPlacement() ? this.color : 'rgba(200,0,0,0.5)';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
  }



  // Prevent tower overlap with path (treat path as thick line)
  const roadWidth = 40; // must match your ctx.lineWidth in gameLoop
  const buffer = roadWidth / 2 + this.radius; 

  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];

    // Distance from tower center to segment (p1 → p2)
    const dist = this._pointToSegmentDistance(this.x, this.y, p1, p2);
    if (dist < buffer) return false; // too close to the road
  }

  // Prevent overlap with other towers
  for (const tower of existingTowers) {
    const dx = tower.x - this.x;
    const dy = tower.y - this.y;
    if (Math.sqrt(dx * dx + dy * dy) < this.radius * 2) return false;
  }

  return true;
}

// Helper: distance from a point to a line segment
_pointToSegmentDistance(px, py, p1, p2) {
  const A = px - p1.x;
  const B = py - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let t = lenSq !== 0 ? dot / lenSq : -1;

  if (t < 0) {
    return Math.sqrt((px - p1.x) ** 2 + (py - p1.y) ** 2);
  } else if (t > 1) {
    return Math.sqrt((px - p2.x) ** 2 + (py - p2.y) ** 2);
  }
  return Math.sqrt(
    (px - (p1.x + t * C)) ** 2 +
    (py - (p1.y + t * D)) ** 2
  );
}


  update(deltaTime, enemies, bullets) {
    if (!this.isPlaced) return; // Only act if placed
    this.lastShot += deltaTime;

    if (this.lastShot >= 1 / this.fireRate) {
      // Find nearest enemy in range
      let target = null;
      let minDist = Infinity;

      for (const enemy of enemies) {
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.range && dist < minDist) {
          minDist = dist;
          target = enemy;
        }
      }

      if (target) {
        bullets.push({ x: this.x, y: this.y, target });
        this.lastShot = 0;
      }
    }
  }
}
