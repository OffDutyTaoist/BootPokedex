// src/pokeapi.ts

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

export type Location = {
  id: number;
  name: string;
  // space to add moar fields! MOAR!!!
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area?limit=20`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch locations: ${res.status} ${res.statusText}`,
      );
    }

    return res.json() as Promise<ShallowLocations>;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location ${locationName}: ${res.status} ${res.statusText}`,
      );
    }

    return res.json() as Promise<Location>;
  }
}
