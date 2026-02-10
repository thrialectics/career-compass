import type { Card } from "./cards.ts";
import { allCards } from "./cards.ts";

export type Reaction = "y" | "n" | "s";

interface Swipe {
  cardId: string;
  reaction: Reaction;
  timestamp: string;
}

interface Profile {
  dimensions: Record<string, number>;
  topDrawn: string[];
  topAvoid: string[];
  matchingRoles: string[];
  matchingCompanies: string[];
}

const prefsDir = import.meta.dir + "/prefs";
const swipesPath = prefsDir + "/swipes.json";
const profilePath = prefsDir + "/profile.json";

const swipes: Swipe[] = [];
const scores: Record<string, number> = {};

export function recordSwipe(card: Card, reaction: Reaction) {
  swipes.push({ cardId: card.id, reaction, timestamp: new Date().toISOString() });

  if (reaction === "s") return;
  const delta = reaction === "y" ? 1 : -1;
  for (const tag of card.tags) {
    scores[tag] = (scores[tag] ?? 0) + delta;
  }
}

export function getDimensionScores(): Record<string, number> {
  const entries = Object.entries(scores);
  if (entries.length === 0) return {};

  const maxAbs = Math.max(...entries.map(([, v]) => Math.abs(v)), 1);
  const normalized: Record<string, number> = {};
  for (const [key, val] of entries) {
    normalized[key] = Math.round((val / maxAbs) * 10) / 10;
  }
  return normalized;
}

export function getTopDimensions(n: number, direction: "positive" | "negative") {
  const dims = getDimensionScores();
  return Object.entries(dims)
    .filter(([, v]) => (direction === "positive" ? v > 0 : v < 0))
    .sort((a, b) => (direction === "positive" ? b[1] - a[1] : a[1] - b[1]))
    .slice(0, n);
}

const roleMap: Record<string, string[]> = {
  "devtools": ["Developer Experience Engineer", "Developer Relations"],
  "tooling": ["Developer Experience Engineer", "Platform Engineer"],
  "product": ["Product Manager", "Product Engineer"],
  "product-management": ["Technical Program Manager", "Product Manager"],
  "engineering": ["Software Engineer", "Platform Engineer"],
  "code-heavy": ["Software Engineer", "Fullstack Engineer"],
  "customer-facing": ["Solutions Engineer", "Customer Success Engineer"],
  "people-heavy": ["Technical Program Manager", "Engineering Manager"],
  "writing-heavy": ["Technical Writer", "Developer Relations"],
  "data-heavy": ["Analytics Engineer", "Data Scientist"],
  "devrel": ["Developer Relations", "Developer Advocate"],
  "content": ["Technical Writer", "Content Strategist"],
  "solutions": ["Solutions Engineer", "Solutions Architect"],
  "support": ["Support Engineer", "Customer Success Engineer"],
  "infrastructure": ["Site Reliability Engineer", "Platform Engineer"],
  "internal-tools": ["Platform Engineer", "Developer Experience Engineer"],
  "mission-driven": ["Civic Tech Engineer", "Impact-Focused PM"],
};

const companyMap: Record<string, { name: string; sector: string; location: string }[]> = {
  "civic-tech": [
    { name: "Recidiviz", sector: "Civic Tech", location: "remote, NYC" },
    { name: "Nava PBC", sector: "Civic Tech", location: "remote" },
    { name: "Code for America", sector: "Civic Tech", location: "remote" },
    { name: "Ad Hoc", sector: "Civic Tech", location: "remote" },
    { name: "CivicActions", sector: "Civic Tech", location: "remote" },
  ],
  "mission-driven": [
    { name: "Recidiviz", sector: "Civic Tech", location: "remote, NYC" },
    { name: "Khan Academy", sector: "EdTech", location: "remote" },
    { name: "Bonterra", sector: "Nonprofit SaaS", location: "remote" },
  ],
  "devtools": [
    { name: "Vercel", sector: "Developer Tools", location: "remote" },
    { name: "Railway", sector: "Developer Tools", location: "remote" },
    { name: "Render", sector: "Developer Tools", location: "remote" },
    { name: "Supabase", sector: "Developer Tools", location: "remote" },
    { name: "Replit", sector: "Developer Tools", location: "remote" },
  ],
  "edtech": [
    { name: "Khan Academy", sector: "EdTech", location: "remote" },
    { name: "Duolingo", sector: "EdTech", location: "Pittsburgh" },
    { name: "Brilliant", sector: "EdTech", location: "remote" },
    { name: "Coursera", sector: "EdTech", location: "remote" },
  ],
  "nonprofit-saas": [
    { name: "Bonterra", sector: "Nonprofit SaaS", location: "remote" },
    { name: "Submittable", sector: "Nonprofit SaaS", location: "remote" },
    { name: "CauseVox", sector: "Nonprofit SaaS", location: "remote" },
    { name: "Candid", sector: "Nonprofit SaaS", location: "NYC" },
    { name: "Instrumentl", sector: "Nonprofit SaaS", location: "remote" },
  ],
  "ai": [
    { name: "Anthropic", sector: "AI", location: "SF, NYC" },
    { name: "Replit", sector: "AI/DevTools", location: "remote" },
  ],
  "b2b-saas": [
    { name: "Notion", sector: "Productivity", location: "SF" },
    { name: "Airtable", sector: "Productivity", location: "SF" },
    { name: "Figma", sector: "Design Tools", location: "SF" },
    { name: "Mercury", sector: "Fintech", location: "remote" },
  ],
  "climate": [
    { name: "Watershed", sector: "Climate Tech", location: "SF" },
  ],
};

export function getMatchingRoles(): string[] {
  const top = getTopDimensions(5, "positive").map(([dim]) => dim);
  const seen = new Set<string>();
  const roles: string[] = [];
  for (const dim of top) {
    for (const role of roleMap[dim] ?? []) {
      if (!seen.has(role)) { seen.add(role); roles.push(role); }
    }
  }
  return roles.slice(0, 5);
}

export function getMatchingCompanies() {
  const sectorDims = new Set(Object.keys(companyMap));
  const top = Object.entries(getDimensionScores())
    .filter(([dim, v]) => v > 0 && sectorDims.has(dim))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([dim]) => dim);
  const seen = new Set<string>();
  const companies: { name: string; sector: string; location: string }[] = [];
  for (const dim of top) {
    for (const co of companyMap[dim] ?? []) {
      if (!seen.has(co.name)) { seen.add(co.name); companies.push(co); }
    }
  }
  return companies.slice(0, 6);
}

export async function saveResults() {
  await Bun.write(swipesPath, JSON.stringify(swipes, null, 2));
  const profile: Profile = {
    dimensions: getDimensionScores(),
    topDrawn: getTopDimensions(5, "positive").map(([d]) => d),
    topAvoid: getTopDimensions(5, "negative").map(([d]) => d),
    matchingRoles: getMatchingRoles(),
    matchingCompanies: getMatchingCompanies().map((c) => c.name),
  };
  await Bun.write(profilePath, JSON.stringify(profile, null, 2));
}

export async function ensurePrefsDir() {
  const { mkdir } = await import("node:fs/promises");
  await mkdir(prefsDir, { recursive: true });
}
