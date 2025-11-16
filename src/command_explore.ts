// src/command_explore.ts
import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const [locationName] = args;

  if (!locationName) {
    console.log("Usage: explore <location-area-name>");
    return;
  }

  console.log(`Exploring ${locationName}...`);

  const location = await state.pokeapi.fetchLocation(locationName);

  if (!location.pokemon_encounters || location.pokemon_encounters.length === 0) {
    console.log("No Pokemon found.");
    return;
  }

  const names = location.pokemon_encounters.map((enc) => enc.pokemon.name);

  // Deduplicate and sort for nicer output. NOICE!!!
  const uniqueSorted = Array.from(new Set(names)).sort();

  console.log("Found Pokemon:");
  for (const name of uniqueSorted) {
    console.log(` - ${name}`);
  }
}
