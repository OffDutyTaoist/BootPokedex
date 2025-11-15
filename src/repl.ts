// src/repl.ts

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
