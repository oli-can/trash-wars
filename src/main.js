import { gameState } from "./game/state.js";
import { init } from "./game/init.js";
import "./game/loop.js"; // runs game loop

window.addEventListener("load", () => {
  init();
});
