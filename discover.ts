import { getCardsByRound, allCards, roundNames, type Card } from "./cards.ts";
import {
  recordSwipe,
  getTopDimensions,
  getMatchingRoles,
  getMatchingArchetypes,
  saveResults,
  ensurePrefsDir,
  type Reaction,
} from "./engine.ts";
import {
  clearScreen,
  renderCard,
  renderRoundSummary,
  renderFinalProfile,
  renderWelcome,
  renderContinuePrompt,
} from "./display.ts";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

async function readKey(): Promise<string> {
  process.stdin.setRawMode(true);
  return new Promise((resolve) => {
    const onData = (buf: Buffer) => {
      process.stdin.removeListener("data", onData);
      process.stdin.setRawMode(false);
      const key = buf.toString();
      // Handle Ctrl+C
      if (key === "\x03") {
        console.log();
        process.exit(0);
      }
      resolve(key);
    };
    process.stdin.on("data", onData);
    process.stdin.resume();
  });
}

async function waitForEnter() {
  process.stdin.setRawMode(true);
  return new Promise<void>((resolve) => {
    const onData = (buf: Buffer) => {
      process.stdin.removeListener("data", onData);
      process.stdin.setRawMode(false);
      const key = buf.toString();
      if (key === "\x03") {
        console.log();
        process.exit(0);
      }
      resolve();
    };
    process.stdin.on("data", onData);
    process.stdin.resume();
  });
}

const overallTotal = allCards.length;
let overallDone = 0;

async function runRound(round: number): Promise<boolean> {
  const cards = shuffle(getCardsByRound(round));

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]!;
    clearScreen();
    renderCard(card, i, cards.length, overallDone, overallTotal);

    let validInput = false;
    while (!validInput) {
      const key = await readKey();
      const k = key.toLowerCase();

      if (k === "q") return false;

      if (k === "y" || k === "n" || k === "s") {
        recordSwipe(card, k as Reaction);
        validInput = true;
        overallDone++;
      }
    }
  }
  return true;
}

async function main() {
  await ensurePrefsDir();

  clearScreen();
  renderWelcome();
  console.log("  Press any key to begin...");
  await readKey();

  const rounds = [1, 2, 3, 4] as const;

  for (let ri = 0; ri < rounds.length; ri++) {
    const round = rounds[ri]!;
    const cont = await runRound(round);
    if (!cont) break;

    clearScreen();
    const drawn = getTopDimensions(5, "positive");
    const avoid = getTopDimensions(5, "negative");
    renderRoundSummary(round, drawn, avoid);

    if (ri < rounds.length - 1) {
      renderContinuePrompt(rounds[ri + 1]!);
      await waitForEnter();
    }
  }

  // Final profile
  clearScreen();
  const drawn = getTopDimensions(5, "positive");
  const avoid = getTopDimensions(5, "negative");
  const roles = getMatchingRoles();
  const archetypes = getMatchingArchetypes();
  renderFinalProfile(drawn, avoid, roles, archetypes);

  await saveResults();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
