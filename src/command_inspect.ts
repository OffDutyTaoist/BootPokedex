// src/command_inspect.ts
import type { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  const [rawName] = args;

  if (!rawName) {
    console.log("Usage: inspect <pokemon-name>");
    return;
  }

  const name = rawName.toLowerCase();
  const pokemon = state.pokedex[name];

  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);

  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }

  console.log("Types:");
  const sortedTypes = [...pokemon.types].sort((a, b) => a.slot - b.slot);
  for (const t of sortedTypes) {
    console.log(`  - ${t.type.name}`);
  }
}
