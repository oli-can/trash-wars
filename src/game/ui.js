import { gameState } from "./state.js";

export function updateUI() {
  document.getElementById("coins").textContent = gameState.coins;
  document.getElementById("health").textContent = gameState.health;
  document.getElementById("wave").textContent = gameState.wave;
  document.getElementById("enemies").textContent = gameState.enemies.length;
}
