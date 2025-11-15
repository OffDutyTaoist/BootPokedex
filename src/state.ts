// src/state.ts
import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
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
  };
}

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = buildCommands();

  return { rl, commands };
}
