// src/pokeapi.ts

import { Cache } from "./pokecache.js"

export type ShallowLocation = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShallowLocation[];
};

export type PokemonRef = {
  name: string;
  url: string;
};

export type PokemonEncounter = {
  pokemon: PokemonRef;
  // other fields exist, we don't care about them here. We do, but we don't. It's complicated.
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: PokemonEncounter[];
  // space to add moar fields! MOAR!!!
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  // Listen babe, tons of other fields exist, but we only need you. Promise.
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cacheIntervalMs = 30_000) {
    this.#cache = new Cache(cacheIntervalMs);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area?limit=20`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      // Optional debug:
      // console.log(`[cache] hit for ${url}`);
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch locations: ${res.status} ${res.statusText}`,
      );
    }

    const data = (await res.json()) as ShallowLocations;
    this.#cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.#cache.get<Location>(url);
    if (cached) {
      // console.log(`[cache] hit for ${url}`);
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location ${locationName}: ${res.status} ${res.statusText}`,
      );
    }

    const data = (await res.json()) as Location;
    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    const lcName = name.toLowerCase();
    const url = `${PokeAPI.baseURL}/pokemon/${lcName}`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch pokemon ${lcName}: ${res.status} ${res.statusText}`,
      );
    }

    const data = (await res.json()) as Pokemon;
    this.#cache.add(url, data);
    return data;
  }
}
