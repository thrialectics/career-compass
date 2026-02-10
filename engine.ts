import type { Card } from "./cards.ts";

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
  lookFor: string[];
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
  "design-heavy": ["UX Designer", "Product Designer"],
  "security": ["Security Engineer", "Application Security Engineer"],
  "mobile": ["Mobile Engineer", "iOS/Android Developer"],
  "ai": ["ML Engineer", "AI/ML Engineer"],
  "research": ["Research Engineer", "Research Scientist"],
  "qa": ["QA Engineer", "Test Automation Engineer"],
  "gaming": ["Game Developer", "Game Engineer"],
  "management-track": ["Engineering Manager", "Director of Engineering"],
  "healthcare": ["Health Tech Engineer", "Clinical Software Engineer"],
};

// Archetype recommendations: dimension combos → descriptive suggestions
interface Archetype {
  description: string;
  requires: string[];   // all must be positive
  bonus?: string[];     // boost score if also positive
}

const archetypes: Archetype[] = [
  { description: "Remote-first developer tools startups (< 50 people)", requires: ["devtools", "remote-first"], bonus: ["small-team", "startup"] },
  { description: "Mission-driven orgs building civic tech or public interest software", requires: ["mission-driven", "civic-tech"], bonus: ["remote-first", "public-sector"] },
  { description: "Mid-size product companies with strong design culture", requires: ["product", "design-heavy"], bonus: ["established", "hybrid"] },
  { description: "Fast-growing B2B SaaS with data-driven product teams", requires: ["b2b-saas", "data-heavy"], bonus: ["product", "profit-driven"] },
  { description: "Small engineering-led startups shipping fast", requires: ["startup", "code-heavy"], bonus: ["small-team", "engineering"] },
  { description: "Large established companies with structured career ladders", requires: ["large-org", "established"], bonus: ["profit-driven", "in-office"] },
  { description: "AI/ML companies doing applied research", requires: ["ai", "research"], bonus: ["engineering", "data-heavy"] },
  { description: "EdTech organizations improving access to education", requires: ["edtech", "mission-driven"], bonus: ["product", "remote-first"] },
  { description: "Healthcare tech companies building patient-facing tools", requires: ["healthcare", "product"], bonus: ["mission-driven", "security"] },
  { description: "Nonprofit SaaS platforms serving social sector organizations", requires: ["nonprofit-saas", "mission-driven"], bonus: ["customer-facing", "remote-first"] },
  { description: "Climate tech startups tackling sustainability", requires: ["climate", "startup"], bonus: ["mission-driven", "small-team"] },
  { description: "Gaming studios building multiplayer experiences", requires: ["gaming", "code-heavy"], bonus: ["in-office", "product"] },
  { description: "Ecommerce platforms operating at massive scale", requires: ["ecommerce", "infrastructure"], bonus: ["data-heavy", "large-org"] },
  { description: "Infrastructure and platform engineering teams", requires: ["infrastructure", "tooling"], bonus: ["engineering", "remote-first"] },
  { description: "Consulting or client-facing technical roles with travel", requires: ["customer-facing", "consulting"], bonus: ["people-heavy"] },
  { description: "Remote async teams with high individual autonomy", requires: ["remote-first", "high-autonomy"], bonus: ["writing-heavy", "small-team"] },
  { description: "Companies with strong mentorship and learning culture", requires: ["mentorship", "established"], bonus: ["people-heavy", "engineering"] },
  { description: "Social media companies working on trust and safety", requires: ["social-media", "ai"], bonus: ["data-heavy", "engineering"] },
  { description: "Fintech companies building financial infrastructure", requires: ["fintech", "engineering"], bonus: ["code-heavy", "infrastructure"] },
  { description: "Logistics and supply chain optimization companies", requires: ["logistics", "data-heavy"], bonus: ["infrastructure", "engineering"] },
  { description: "Media and streaming companies with personalization focus", requires: ["media", "data-heavy"], bonus: ["ai", "large-org"] },
];

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

export function getMatchingArchetypes(): string[] {
  const dims = getDimensionScores();

  const scored = archetypes.map((a) => {
    const allRequired = a.requires.every((d) => (dims[d] ?? 0) > 0);
    if (!allRequired) return { description: a.description, score: -1 };

    let score = a.requires.reduce((sum, d) => sum + (dims[d] ?? 0), 0);
    for (const b of a.bonus ?? []) {
      if ((dims[b] ?? 0) > 0) score += (dims[b] ?? 0) * 0.5;
    }
    return { description: a.description, score };
  });

  return scored
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((a) => a.description);
}

export async function saveResults() {
  await Bun.write(swipesPath, JSON.stringify(swipes, null, 2));
  const profile: Profile = {
    dimensions: getDimensionScores(),
    topDrawn: getTopDimensions(5, "positive").map(([d]) => d),
    topAvoid: getTopDimensions(5, "negative").map(([d]) => d),
    matchingRoles: getMatchingRoles(),
    lookFor: getMatchingArchetypes(),
  };
  await Bun.write(profilePath, JSON.stringify(profile, null, 2));
}

export async function ensurePrefsDir() {
  const { mkdir } = await import("node:fs/promises");
  await mkdir(prefsDir, { recursive: true });
}
