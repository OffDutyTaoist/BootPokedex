// src/repl.ts
import { createInterface } from "readline";

export function cleanInput(input: string): string[] {
  // 1. Trim outer whitespace
  const trimmed = input.trim().toLowerCase();

  // 2. If string is now empty, return empty array
  if (trimmed === "") {
    return [];
  }

  // 3. Split on one-or-more whitespace characters
  return trimmed.split(/\s+/);
}

export function startREPL(): void {
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

    const command = words[0];
    console.log(`Your command was: ${command}`);
    rl.prompt();
  });

  // Optional: nicer Ctrl+C behavior (not required, but sane)
  rl.on("SIGINT", () => {
    rl.close();
  });
}