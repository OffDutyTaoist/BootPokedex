// src/repl.ts
import type { State, CLICommand } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") {
    return [];
  }

  return trimmed.split(/\s+/);
}

export function startREPL(state: State): void {
  const { rl, commands } = state;

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
      command.callback(state);
    } catch (error) {
      console.error("Error executing command:", error);
    }

    rl.prompt();
  });

  rl.on("SIGINT", () => {
    const exitCommand = commands["exit"];
    if (exitCommand) {
      exitCommand.callback(state);
    } else {
      rl.close();
      console.log();
      console.log("Closing the Pokedex... Goodbye!");
      process.exit(0);
    }
  });
}

