// src/command_catch.ts
import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const [rawName] = args;

  if (!rawName) {
    console.log("Usage: catch <pokemon-name>");
    return;
  }

  const name = rawName.toLowerCase();

  // Already caught?
  if (state.pokedex[name]) {
    console.log(`${name} is already in your Pokedex!`);
    return;
  }

  console.log(`Throwing a Pokeball at ${name}...`);

  let pokemon;
  try {
    pokemon = await state.pokeapi.fetchPokemon(name);
  } catch (error) {
    console.log(`Could not find Pokemon: ${name}`);
    return;
  }

  // Basic catch probability based on base_experience:
  // higher base XP => harder to catch
  const baseExp = pokemon.base_experience || 50;

  // Scale baseExp into a catch chance between 0.2 and 0.9
  // low baseExp (~50) => high chance, high baseExp (~300) => lower chance
  const difficulty = Math.min(baseExp / 400, 1); // 0..1-ish
  const catchChance = Math.max(0.2, 0.9 - difficulty); // keep it reasonable
  //hopefully functions better than Baldurs Gate 3 RNG

  const roll = Math.random();

  if (roll < catchChance) {
    console.log(`${name} was caught!`);
    state.pokedex[name] = pokemon;
    console.log("You may now inspect it with the inspect command.");
  } else {
    console.log(`${name} escaped!`);
  }
}
