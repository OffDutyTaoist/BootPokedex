// src/command_help.ts
import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const key of Object.keys(commands)) {
    const cmd = commands[key];
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
