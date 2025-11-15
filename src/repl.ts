// src/repl.ts
import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import type { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") {
    return [];
  }

  return trimmed.split(/\s+/);
}

export function startREPL(): void {
  const commands = getCommands();

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command: CLICommand | undefined = commands[commandName];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      command.callback(commands);
    } catch (error) {
      console.error("Error executing command:", error);
    }

    rl.prompt();
  });

  rl.on("SIGINT", () => {
    console.log();
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
  });
}
