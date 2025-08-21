// src/game/collision.js

export function checkCollisionWithPath(tower, path) {
  // Example: simple distance check with path points
  for (const point of path) {
    const dx = tower.x - point.x;
    const dy = tower.y - point.y;
    if (Math.sqrt(dx * dx + dy * dy) < tower.size) return true;
  }
  return false;
}

export function checkCollisionWithTowers(tower, towers) {
  for (const other of towers) {
    const dx = tower.x - other.x;
    const dy = tower.y - other.y;
    if (Math.sqrt(dx * dx + dy * dy) < tower.size) return true;
  }
  return false;
}
