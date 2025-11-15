import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const state = initState();
  startREPL(state);
}

main().catch((error) => {
  console.error("Unexpected error in main:", error);
  process.exit(1);
});
