// src/command_exit.ts
import type { State } from "./state.js"

export function commandExit(state: State): void {
  state.rl.close();
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}
