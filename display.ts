import type { Card } from "./cards.ts";
import { roundNames } from "./cards.ts";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const MAGENTA = "\x1b[35m";

const WIDTH = 48;
const LINE = "━".repeat(WIDTH);
const THIN = "─".repeat(WIDTH);

export function clearScreen() {
  process.stdout.write("\x1b[2J\x1b[H");
}

function progressBar(current: number, total: number, width: number = 30): string {
  const pct = current / total;
  const filled = Math.min(Math.round(pct * width), width);
  const empty = width - filled;
  return `${CYAN}${"━".repeat(filled)}${RESET}${DIM}${"━".repeat(empty)}${RESET}`;
}

function roundDots(currentRound: number): string {
  return [1, 2, 3, 4]
    .map((r) => (r < currentRound ? `${GREEN}●${RESET}` : r === currentRound ? `${CYAN}●${RESET}` : `${DIM}○${RESET}`))
    .join(" ");
}

export function renderCard(card: Card, index: number, total: number, overallDone: number, overallTotal: number) {
  const roundName = roundNames[card.round] ?? `Round ${card.round}`;
  const header = `  ${CYAN}${BOLD}Career Compass — Round ${card.round}: ${roundName} (${index + 1}/${total})${RESET}`;
  const pct = Math.round((overallDone / overallTotal) * 100);

  const lines = card.text.split("\n").map((l) => `  ${l}`);

  console.log();
  console.log(`  ${roundDots(card.round)}  ${DIM}${pct}%${RESET}`);
  console.log(`  ${progressBar(overallDone, overallTotal)}`);
  console.log();
  console.log(header);
  console.log(`  ${DIM}${LINE}${RESET}`);
  console.log();
  for (const line of lines) console.log(line);
  console.log();
  console.log(`  ${DIM}${THIN}${RESET}`);
  console.log(`  ${GREEN}[y]${RESET} Like  ${RED}[n]${RESET} Pass  ${YELLOW}[s]${RESET} Skip  ${DIM}[q] Quit${RESET}`);
  console.log();
}

function bar(value: number): string {
  const abs = Math.abs(value);
  const filled = Math.round(abs * 10);
  const empty = 10 - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

export function renderRoundSummary(
  round: number,
  drawn: [string, number][],
  avoid: [string, number][],
) {
  const roundName = roundNames[round] ?? `Round ${round}`;

  console.log();
  console.log(`  ${MAGENTA}${BOLD}Round ${round} Results — Your Emerging Profile${RESET}`);
  console.log(`  ${DIM}${LINE}${RESET}`);

  if (drawn.length > 0) {
    console.log();
    console.log(`  ${GREEN}${BOLD}Drawn to:${RESET}`);
    for (const [dim, score] of drawn) {
      const label = dim.padEnd(18);
      console.log(`    ${label} ${GREEN}${bar(score)}${RESET}  ${score > 0 ? "+" : ""}${score}`);
    }
  }

  if (avoid.length > 0) {
    console.log();
    console.log(`  ${RED}${BOLD}Want to avoid:${RESET}`);
    for (const [dim, score] of avoid) {
      const label = dim.padEnd(18);
      console.log(`    ${label} ${RED}${bar(score)}${RESET}  ${score}`);
    }
  }

  if (drawn.length === 0 && avoid.length === 0) {
    console.log();
    console.log(`  ${DIM}Not enough data yet — keep swiping!${RESET}`);
  }

  console.log();
}

export function renderFinalProfile(
  drawn: [string, number][],
  avoid: [string, number][],
  roles: string[],
  archetypes: string[],
) {
  console.log();
  console.log(`  ${CYAN}${BOLD}Your Career Compass Profile${RESET}`);
  console.log(`  ${DIM}${LINE}${RESET}`);

  if (drawn.length > 0) {
    console.log();
    console.log(`  ${GREEN}${BOLD}You're drawn to:${RESET}`);
    for (const [dim, score] of drawn) {
      const label = dim.padEnd(18);
      console.log(`    ${label} ${GREEN}${bar(score)}${RESET}  +${score}`);
    }
  }

  if (avoid.length > 0) {
    console.log();
    console.log(`  ${RED}${BOLD}You want to avoid:${RESET}`);
    for (const [dim, score] of avoid) {
      const label = dim.padEnd(18);
      console.log(`    ${RED}${bar(score)}${RESET}  ${score}  ${label}`);
    }
  }

  if (roles.length > 0) {
    console.log();
    console.log(`  ${MAGENTA}${BOLD}Top matching roles:${RESET}`);
    roles.forEach((r, i) => console.log(`    ${i + 1}. ${r}`));
  }

  if (archetypes.length > 0) {
    console.log();
    console.log(`  ${MAGENTA}${BOLD}What to look for:${RESET}`);
    archetypes.forEach((a, i) => console.log(`    ${i + 1}. ${a}`));
  }

  console.log();
  console.log(`  ${DIM}Profile saved to prefs/profile.json${RESET}`);
  console.log();
}

export function renderWelcome() {
  console.log();
  console.log(`  ${CYAN}${BOLD}Career Compass${RESET}`);
  console.log(`  ${DIM}${LINE}${RESET}`);
  console.log();
  console.log(`  Discover your career preferences by reacting to`);
  console.log(`  real companies, job duties, projects, and work styles.`);
  console.log();
  console.log(`  ${GREEN}[y]${RESET} Like — this resonates with you`);
  console.log(`  ${RED}[n]${RESET} Pass — not for you`);
  console.log(`  ${YELLOW}[s]${RESET} Skip — no strong feeling`);
  console.log(`  ${DIM}[q] Quit at any time${RESET}`);
  console.log();
  console.log(`  4 rounds, 70 cards. Takes about 10 minutes.`);
  console.log();
}

export function renderContinuePrompt(nextRound: number) {
  const name = roundNames[nextRound] ?? `Round ${nextRound}`;
  console.log(`  ${DIM}Press Enter to continue to Round ${nextRound}: ${name}...${RESET}`);
}
