// src/repl.ts
import type { State, CLICommand } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") {
    return [];
  }

  return trimmed.split(/\s+/);
}

export function startREPL(state: State): Promise<void> {
  const { rl, commands } = state;

  return new Promise((resolve) => {
    rl.prompt();

    rl.on("line", async (line) => {
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
        await command.callback(state);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error executing command:", error.message);
        } else {
          console.error("Error executing command:", error);
        }
      }

      // If exit didn't kill the process, re-prompt
      rl.prompt();
    });

    rl.on("close", () => {
      resolve();
    });

    rl.on("SIGINT", async () => {
      const exitCmd = commands["exit"];

      if (exitCmd) {
        try {
          await exitCmd.callback(state);
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error executing exit command:", error.message);
          } else {
            console.error("Error executing exit command:", error);
          }
          process.exit(1);
        }
      } else {
        rl.close();
        console.log();
        console.log("Closing the Pokedex... Goodbye!");
        process.exit(0);
      }
    });
  });
}
