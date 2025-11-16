// src/state.ts
import { createInterface, type Interface } from "readline";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_map_back.js";
import { commandExplore } from "./command_explore.js"
import { commandCatch } from "./command_catch.js"
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

function buildCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Display the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display the previous 20 location areas",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explore a location area for Pokemon",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a Pokemon by name",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a caught Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List all caught Pokemon",
      callback: commandPokedex,
    },
  };
}

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const pokeapi = new PokeAPI();
  const commands = buildCommands();

  return {
    rl,
    commands,
    pokeapi,
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
}

