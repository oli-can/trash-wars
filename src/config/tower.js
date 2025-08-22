// src/config/tower.js
export const towerTypes = {
  basic: {
    cost: 20,
    damage: 15,
    range: 80,
    fireRate: 1000,   // ms per shot
    radius: 20,
    color: "#4CAF50"
  },
  sniper: {
    cost: 50,
    damage: 40,
    range: 150,
    fireRate: 2000,
    radius: 20,
    color: "#FF9800"
  },
  splash: {
    cost: 75,
    damage: 25,
    range: 70,
    fireRate: 1500,
    radius: 20,
    splash: true,
    color: "#F44336"
  },
  freezer: {
    cost: 40,
    damage: 10,
    range: 90,
    fireRate: 800,
    radius: 20,
    slow: true,
    color: "#00BCD4"
  }
};


export const TILE_SIZE = 32; 
