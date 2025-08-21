export class Tower {
  constructor(x, y, config) {
    this.x = x;
    this.y = y;
    this.size = config.size;
    this.range = config.range;
    this.cost = config.cost;
  }

  draw(ctx) { /* ... */ }
  update() { /* ... */ }
}
