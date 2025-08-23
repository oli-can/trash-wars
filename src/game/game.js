import { initLoop } from './loop.js';
import { path } from '../config/path.js';
import { towerManager } from './towers.js'; // FIXED import
import { UI } from './ui.js';
import { config } from '../config/config.js';

// Main game object
export const game = {
  canvas: null,
  ctx: null,
  path: null,
  towers: null,
  ui: null,
  state: {
    money: 100,
    lives: 10,
    score: 0,
  },

  init() {
    // Create canvas and append to DOM
    this.canvas = document.createElement('canvas');
    this.canvas.width = config.canvasWidth || window.innerWidth;
    this.canvas.height = config.canvasHeight || window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Initialize modules
    this.path = new path(this.canvas, this.ctx);
    this.towers = new towerManager(this.canvas, this.ctx, this.path, this.state);
    this.ui = new UI(this.canvas, this.ctx, this.state);

    // Initialize input/events
    this.initEvents();

    // Start game loop
    initLoop(this.update.bind(this), this.render.bind(this));
  },

  initEvents() {
    this.canvas.addEventListener('click', (e) => {
      this.towers.handleClick(e);
      this.ui.handleClick(e);
    });
  },

  update(deltaTime) {
    this.towers.update(deltaTime);
    this.ui.update(deltaTime);
    // TODO: add enemies, projectiles, collisions here later
  },

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render modules
    this.path.render();
    this.towers.render();
    this.ui.render();
  },
};

// Initialize game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  game.init();
});
