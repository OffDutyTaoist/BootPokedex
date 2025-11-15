// src/command_map.ts
import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const pageURL = state.nextLocationsURL ?? undefined;

  const locations = await state.pokeapi.fetchLocations(pageURL);

  for (const loc of locations.results) {
    console.log(loc.name);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}
