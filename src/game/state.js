export let canvas, ctx;

export const gameState = {
  coins: 100,
  health: 20,
  wave: 1,
  enemies: [],
  towers: [],
  projectiles: [],
  selectedTower: null,
  gameRunning: false,
  isPaused: false,
  waveInProgress: false,
};
