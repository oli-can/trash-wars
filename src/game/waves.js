import { gameState } from "./state.js";
import { spawnEnemy } from "./enemies.js";

export function startWave() {
  if (gameState.waveInProgress) return;
  gameState.waveInProgress = true;
  gameState.gameRunning = true;

  let count = 5 + gameState.wave * 2;
  let i = 0;

  let interval = setInterval(() => {
    spawnEnemy("basic");
    i++;
    if (i >= count) {
      clearInterval(interval);
      gameState.wave++;
      gameState.waveInProgress = false;
    }
  }, 1000);
}
