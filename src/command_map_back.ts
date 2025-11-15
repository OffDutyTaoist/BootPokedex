// src/command_map_back.ts
import type { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

  for (const loc of locations.results) {
    console.log(loc.name);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}
