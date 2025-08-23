import { gameState, canvas, ctx } from "./state.js";
import { selectTower } from "./towers.js";
import { startWave } from "./waves.js";
import { togglePause } from "./controls.js";

export function init() {
  const c = document.getElementById("gameCanvas");
  gameState.canvas = c;
  gameState.ctx = c.getContext("2d");

  c.width = window.innerWidth;
  c.height = window.innerHeight;

  // Events
  c.addEventListener("click", () => {}); // placeholder for placement logic
  document.getElementById("startWave").addEventListener("click", startWave);
  document.getElementById("pauseGame").addEventListener("click", togglePause);

 document.querySelectorAll(".tower-btn").forEach(btn => {
  btn.addEventListener("click", () => towerManager.selectTower(btn.dataset.tower));
});

  window.addEventListener("resize", () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });
}
