// src/command_help.ts
import type { State, CLICommand } from "./state.js";

export function commandHelp(state: State): void {
  const commands: Record<string, CLICommand> = state.commands;

  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const key of Object.keys(commands)) {
    const cmd = commands[key];
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
