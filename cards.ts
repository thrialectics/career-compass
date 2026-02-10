export interface Card {
  id: string;
  round: 1 | 2 | 3 | 4;
  text: string;
  tags: string[];
  source: "real" | "crafted";
}

// Round 1: Company Vibes (12 cards)
const companyVibes: Card[] = [
  {
    id: "co-1",
    round: 1,
    text: `Recidiviz — A tech nonprofit with ~60 engineers building\ntools that help reduce mass incarceration.\nRemote-first with offices in NYC and Oakland.\nTeam members come from Google, Apple, Dropbox.\nThey ship fast and measure impact directly.`,
    tags: ["mission-driven", "civic-tech", "remote-first", "engineering", "small-team"],
    source: "real",
  },
  {
    id: "co-2",
    round: 1,
    text: `Duolingo — A public edtech company with 700+ employees.\nBuilds the world's most popular language-learning app.\nData-driven culture: every feature is A/B tested.\nPittsburgh HQ with offices worldwide.\nKnown for gamification and quirky brand voice.`,
    tags: ["edtech", "large-org", "product", "data-heavy", "profit-driven"],
    source: "real",
  },
  {
    id: "co-3",
    round: 1,
    text: `Anthropic — An AI safety company building Claude.\n~1,000 employees, growing fast. SF and NYC offices.\nResearch-heavy culture with deep technical rigor.\nMission: build AI systems that are safe and beneficial.\nHigh autonomy, high expectations.`,
    tags: ["ai", "mission-driven", "engineering", "large-org", "hybrid"],
    source: "real",
  },
  {
    id: "co-4",
    round: 1,
    text: `Bonterra — Nonprofit SaaS platform serving 16,000+ orgs.\nTools for fundraising, grantmaking, and advocacy.\nRemote-first, ~500 employees. Acquired several\nlegacy nonprofit tools and is unifying them.\nYour users are fundraisers, grant managers, advocates.`,
    tags: ["nonprofit-saas", "mission-driven", "remote-first", "customer-facing", "large-org"],
    source: "real",
  },
  {
    id: "co-5",
    round: 1,
    text: `Vercel — The company behind Next.js.\n~500 employees, fully remote. Developer tools\nfocused on making the web faster.\nOpen-source core with enterprise cloud product.\nEngineering-led culture, ships constantly.`,
    tags: ["devtools", "remote-first", "tooling", "engineering", "profit-driven"],
    source: "real",
  },
  {
    id: "co-6",
    round: 1,
    text: `Notion — A productivity tool used by millions.\n~500 employees, SF-based with hybrid work.\nDesign-obsessed culture. Product decisions are\ndriven by user research and taste.\nKnown for a calm, thoughtful work environment.`,
    tags: ["b2b-saas", "product", "hybrid", "large-org", "customer-facing"],
    source: "real",
  },
  {
    id: "co-7",
    round: 1,
    text: `A 15-person climate startup building carbon\naccounting software for mid-size companies.\nSeed-funded, everyone wears multiple hats.\nFully remote, async-first. Weekly all-hands\non Fridays. Moving fast to find product-market fit.`,
    tags: ["climate", "startup", "small-team", "remote-first", "product"],
    source: "crafted",
  },
  {
    id: "co-8",
    round: 1,
    text: `A Fortune 500 enterprise with 50,000+ employees.\nDedicated engineering teams for each product line.\nStructured career ladders, annual reviews, RSUs.\nIn-office 3 days/week at a downtown campus.\nLots of process, but also lots of stability.`,
    tags: ["profit-driven", "established", "large-org", "in-office", "engineering"],
    source: "crafted",
  },
  {
    id: "co-9",
    round: 1,
    text: `Nava PBC — A public benefit corporation that\nbuilds technology for government services.\n~200 employees, fully remote.\nClients include CMS, VA, and state agencies.\nYour work directly affects how people access benefits.`,
    tags: ["civic-tech", "mission-driven", "remote-first", "public-sector", "customer-facing"],
    source: "real",
  },
  {
    id: "co-10",
    round: 1,
    text: `Railway — A small developer tools company (~30 people)\nbuilding a modern cloud platform.\nFully remote, async-heavy. Engineers ship\nfeatures end-to-end. Strong community culture.\nCompetes with Heroku, Render, Fly.io.`,
    tags: ["devtools", "startup", "small-team", "remote-first", "infrastructure"],
    source: "real",
  },
  {
    id: "co-11",
    round: 1,
    text: `Khan Academy — Free online education for anyone.\n~700 employees, remote-friendly (US/Canada).\nRecently launched AI tutoring features.\nMission-driven with a calm, supportive culture.\nLong release cycles, high quality bar.`,
    tags: ["edtech", "mission-driven", "remote-first", "product", "established"],
    source: "real",
  },
  {
    id: "co-12",
    round: 1,
    text: `A mid-stage B2B SaaS company (~150 people) in fintech.\nSeries C, growing 80% year-over-year.\nHybrid work (2 days/week in NYC office).\nFast-paced with aggressive quarterly goals.\nBig on metrics, dashboards, and OKRs.`,
    tags: ["fintech", "profit-driven", "hybrid", "data-heavy", "b2b-saas"],
    source: "crafted",
  },
];

// Round 2: Daily Work (15 cards)
const dailyWork: Card[] = [
  {
    id: "dw-1",
    round: 2,
    text: `Write technical documentation for developer-facing\nAPIs. Explain complex systems in clear language.\nWork closely with engineers to understand features\nbefore they ship, then write the docs.`,
    tags: ["writing-heavy", "devtools", "devrel", "tooling"],
    source: "crafted",
  },
  {
    id: "dw-2",
    round: 2,
    text: `Coordinate with 5 engineering teams to ship a\nquarterly release. Run standups, track blockers,\nmanage timelines, and communicate status to\nleadership. You're the glue between teams.`,
    tags: ["people-heavy", "large-org", "product-management", "established"],
    source: "crafted",
  },
  {
    id: "dw-3",
    round: 2,
    text: `Build internal tools that help other engineers\ndeploy faster. Write CLI tools, dashboards, and\nautomation scripts. Your users are your coworkers.`,
    tags: ["tooling", "internal-tools", "engineering", "code-heavy"],
    source: "crafted",
  },
  {
    id: "dw-4",
    round: 2,
    text: `Talk to customers every day. Hop on calls to\nunderstand their problems, then translate those\ninto feature requests for the product team.\nYou're the bridge between users and engineers.`,
    tags: ["customer-facing", "people-heavy", "solutions", "product"],
    source: "crafted",
  },
  {
    id: "dw-5",
    round: 2,
    text: `Spend most of your day writing code. Deep focus\nblocks of 3-4 hours. You own features end-to-end:\ndesign the API, build the frontend, write tests.\nCode review is your main interaction with the team.`,
    tags: ["code-heavy", "engineering", "small-team", "product"],
    source: "crafted",
  },
  {
    id: "dw-6",
    round: 2,
    text: `Analyze user behavior data to figure out why\nsignup conversion dropped 15%. Build dashboards,\nrun SQL queries, present findings to leadership.\nYour recommendations directly shape the roadmap.`,
    tags: ["data-heavy", "product", "b2b-saas", "product-management"],
    source: "crafted",
  },
  {
    id: "dw-7",
    round: 2,
    text: `Create tutorials, sample apps, and blog posts\nthat help developers use your company's platform.\nSpeak at meetups and conferences. Engage with\nthe community on Discord and Twitter.`,
    tags: ["devrel", "writing-heavy", "devtools", "content"],
    source: "crafted",
  },
  {
    id: "dw-8",
    round: 2,
    text: `Triage and respond to support tickets from\nenterprise customers. Debug their integration\nissues, write up solutions, and escalate bugs\nto engineering. Fast turnaround expected.`,
    tags: ["support", "customer-facing", "people-heavy", "b2b-saas"],
    source: "crafted",
  },
  {
    id: "dw-9",
    round: 2,
    text: `Design and run A/B experiments on the product.\nDefine hypotheses, set up test variants, analyze\nresults. You work at the intersection of product,\ndesign, and data science.`,
    tags: ["data-heavy", "product", "product-management", "code-heavy"],
    source: "crafted",
  },
  {
    id: "dw-10",
    round: 2,
    text: `Manage cloud infrastructure: Kubernetes clusters,\nCI/CD pipelines, monitoring and alerting.\nYou're on-call one week per month. Most of\nyour work is automation and reliability.`,
    tags: ["infrastructure", "code-heavy", "engineering", "tooling"],
    source: "crafted",
  },
  {
    id: "dw-11",
    round: 2,
    text: `Lead product discovery for a new feature. Run\nuser interviews, sketch wireframes, write specs.\nYou decide what gets built and why. Engineers\ntrust your judgment on priorities.`,
    tags: ["product-management", "people-heavy", "customer-facing", "product"],
    source: "crafted",
  },
  {
    id: "dw-12",
    round: 2,
    text: `Help nonprofit clients configure and launch\nyour platform. Run onboarding calls, build\ncustom reports, and train their staff.\nYou see the direct impact of your work.`,
    tags: ["solutions", "customer-facing", "nonprofit-saas", "mission-driven"],
    source: "crafted",
  },
  {
    id: "dw-13",
    round: 2,
    text: `Build and maintain the design system. Create\nreusable components, write usage guidelines,\nand ensure visual consistency across the product.\nYou work closely with designers every day.`,
    tags: ["engineering", "product", "code-heavy", "tooling"],
    source: "crafted",
  },
  {
    id: "dw-14",
    round: 2,
    text: `Write grant proposals and technical reports\nfor government contracts. Translate engineering\nwork into language that program officers and\npolicy makers can understand and fund.`,
    tags: ["writing-heavy", "public-sector", "mission-driven", "content"],
    source: "crafted",
  },
  {
    id: "dw-15",
    round: 2,
    text: `Pair program with teammates most of the day.\nMob programming sessions, live code reviews,\nand frequent knowledge sharing. The team\nlearns together and ships together.`,
    tags: ["people-heavy", "engineering", "code-heavy", "small-team"],
    source: "crafted",
  },
];

// Round 3: Problems & Projects (12 cards)
const problemsProjects: Card[] = [
  {
    id: "pp-1",
    round: 3,
    text: `Design the onboarding experience for new\ndevelopers using your platform. Make the\nfirst 5 minutes magical — from signup to\ndeploying their first app.`,
    tags: ["devtools", "product", "customer-facing", "devrel"],
    source: "crafted",
  },
  {
    id: "pp-2",
    round: 3,
    text: `Analyze why users drop off during signup\nand run experiments to fix it. You'll dig\ninto analytics, talk to churned users, and\nship 3-4 variants per month.`,
    tags: ["data-heavy", "product", "product-management", "b2b-saas"],
    source: "crafted",
  },
  {
    id: "pp-3",
    round: 3,
    text: `Build a system that automatically detects\nand alerts on infrastructure failures.\nDesign it to be low-noise and actionable.\nWhen it pages someone at 3am, it should matter.`,
    tags: ["infrastructure", "engineering", "code-heavy", "tooling"],
    source: "crafted",
  },
  {
    id: "pp-4",
    round: 3,
    text: `Create a data pipeline that processes court\nrecords from 50 states into a unified format.\nThe data helps public defenders identify\npeople eligible for resentencing.`,
    tags: ["civic-tech", "data-heavy", "engineering", "mission-driven"],
    source: "crafted",
  },
  {
    id: "pp-5",
    round: 3,
    text: `Build an AI-powered assistant that helps\nnonprofit grant writers draft proposals.\nIntegrate with their existing workflow tools.\nMeasure success by grants funded.`,
    tags: ["ai", "nonprofit-saas", "product", "mission-driven"],
    source: "crafted",
  },
  {
    id: "pp-6",
    round: 3,
    text: `Redesign your company's billing system.\nMigrate 10,000 customers from the old system\nwithout downtime. Handle edge cases in\nprorations, refunds, and tax calculations.`,
    tags: ["engineering", "infrastructure", "fintech", "code-heavy"],
    source: "crafted",
  },
  {
    id: "pp-7",
    round: 3,
    text: `Launch a developer community program.\nBuild a Discord, create a certification\nprogram, and organize a virtual conference.\nSuccess = active community contributors.`,
    tags: ["devrel", "content", "devtools", "people-heavy"],
    source: "crafted",
  },
  {
    id: "pp-8",
    round: 3,
    text: `Build the real-time collaboration engine\nfor a document editor. Handle conflicts\nwhen two people edit the same paragraph.\nLatency matters — it should feel instant.`,
    tags: ["engineering", "code-heavy", "b2b-saas", "product"],
    source: "crafted",
  },
  {
    id: "pp-9",
    round: 3,
    text: `Design a carbon footprint calculator that\ncompanies actually trust. Integrate with\ntheir accounting systems, apply EPA emission\nfactors, and generate audit-ready reports.`,
    tags: ["climate", "data-heavy", "product", "customer-facing"],
    source: "crafted",
  },
  {
    id: "pp-10",
    round: 3,
    text: `Help a state agency modernize their benefits\napplication portal. Replace a 20-year-old\nsystem so that applying for SNAP or Medicaid\nis as easy as ordering from Amazon.`,
    tags: ["civic-tech", "public-sector", "customer-facing", "mission-driven"],
    source: "crafted",
  },
  {
    id: "pp-11",
    round: 3,
    text: `Build an adaptive learning engine that\npersonalizes lesson difficulty based on\nstudent performance. Design the algorithm,\nrun experiments, measure learning outcomes.`,
    tags: ["edtech", "ai", "data-heavy", "engineering"],
    source: "crafted",
  },
  {
    id: "pp-12",
    round: 3,
    text: `Create a CLI tool that lets developers\npreview database migrations before running\nthem. Show exactly what will change, flag\nrisky operations, and generate rollback plans.`,
    tags: ["devtools", "tooling", "engineering", "internal-tools"],
    source: "crafted",
  },
];

// Round 4: Work Style (8 cards)
const workStyle: Card[] = [
  {
    id: "ws-1",
    round: 4,
    text: `Fully remote, async-first. You set your own\nhours. Communication happens in documents and\nthreads, not meetings. You might go days\nwithout a video call.`,
    tags: ["remote-first", "writing-heavy", "small-team"],
    source: "crafted",
  },
  {
    id: "ws-2",
    round: 4,
    text: `Small team (5-8 people), everyone wears\nmultiple hats. You might write code in the\nmorning and run a customer call in the\nafternoon. High ownership, high variety.`,
    tags: ["small-team", "startup", "customer-facing"],
    source: "crafted",
  },
  {
    id: "ws-3",
    round: 4,
    text: `Pair programming and daily standups are the\nnorm. The team ships together. Lots of\ncollaboration, real-time communication.\nRarely working alone for long stretches.`,
    tags: ["people-heavy", "in-office", "engineering"],
    source: "crafted",
  },
  {
    id: "ws-4",
    round: 4,
    text: `Structured sprints with clear deliverables.\nProduct managers write detailed specs.\nYou know exactly what you're building\neach week. Predictable, steady pace.`,
    tags: ["established", "large-org", "product-management"],
    source: "crafted",
  },
  {
    id: "ws-5",
    round: 4,
    text: `Move fast and break things. Ship an MVP\nthis week, get feedback, iterate. Decisions\nare made in Slack threads, not committees.\nComfort with ambiguity is essential.`,
    tags: ["startup", "code-heavy", "small-team"],
    source: "crafted",
  },
  {
    id: "ws-6",
    round: 4,
    text: `Cross-functional pods: 1 PM, 2 engineers,\n1 designer. Your pod owns a product area\nend-to-end. Quarterly goals, weekly demos.\nAutonomy within clear guardrails.`,
    tags: ["product", "hybrid", "established"],
    source: "crafted",
  },
  {
    id: "ws-7",
    round: 4,
    text: `Deep work culture. No meetings before noon.\nFocus on craft and quality over speed.\nCode reviews are thorough — PRs often go\nthrough 3-4 rounds before merging.`,
    tags: ["code-heavy", "engineering", "remote-first"],
    source: "crafted",
  },
  {
    id: "ws-8",
    round: 4,
    text: `Your work is visible to leadership. You\npresent to executives monthly. Impact is\nmeasured in business metrics. Strong\nwriters and communicators thrive here.`,
    tags: ["people-heavy", "writing-heavy", "large-org"],
    source: "crafted",
  },
];

export const roundNames: Record<number, string> = {
  1: "Company Vibes",
  2: "Daily Work",
  3: "Problems & Projects",
  4: "Work Style",
};

export const allCards: Card[] = [
  ...companyVibes,
  ...dailyWork,
  ...problemsProjects,
  ...workStyle,
];

export const getCardsByRound = (round: number): Card[] =>
  allCards.filter((c) => c.round === round);
