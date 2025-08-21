// src/game/tower.js

import { pathSegments } from '../config/path.js';
import { TILE_SIZE } from '../config/game.js';

export class Tower {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.radius = options.radius || 20;
        this.range = options.range || 100;
        this.fireRate = options.fireRate || 1;
        this.lastShot = 0;
        this.isPlaced = options.isPlaced || false;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isValidPlacement() ? 'rgba(0,200,0,0.5)' : 'rgba(200,0,0,0.5)';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.restore();
    }

    isValidPlacement(existingTowers = []) {
        // Prevent overlap with path
        for (const segment of pathSegments) {
            if (this.x > segment.x && this.x < segment.x + segment.width &&
                this.y > segment.y && this.y < segment.y + segment.height) {
                return false;
            }
        }
        // Prevent overlap with other towers
        for (const tower of existingTowers) {
            const dx = tower.x - this.x;
            const dy = tower.y - this.y;
            if (Math.sqrt(dx * dx + dy * dy) < this.radius * 2) return false;
        }
        return true;
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

// Placement handler
export function handleTowerPlacement(canvas, towers) {
    let currentTower = null;

    canvas.addEventListener('mousedown', e => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        currentTower = new Tower(x, y, { isPlaced: false });
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

