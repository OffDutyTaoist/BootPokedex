// src/command_pokedex.ts
import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const names = Object.keys(state.pokedex);

  if (names.length === 0) {
    console.log("Your Pokedex is empty.");
    return;
  }

  const sorted = names.sort();

  console.log("Your Pokedex:");
  for (const name of sorted) {
    console.log(` - ${name}`);
  }
}
