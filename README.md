# Career Compass

A CLI tool that helps you discover your career preferences by reacting to concrete examples — like Tinder for career discovery.

Instead of introspecting abstractly about what you want, you swipe through real companies, job duties, projects, and work styles. The engine tracks your reactions and builds a preference profile.

## How it works

1. You see a "card" — a company description, a job duty, a project type, or a work-style scenario
2. You react: `y` (like), `n` (pass), `s` (skip)
3. Each card has hidden dimension tags (e.g. `remote-first`, `tooling`, `mission-driven`, `small-team`)
4. After each round, you see your emerging preference profile
5. At the end, you get a full profile with top dimensions and matching roles

## Rounds

| Round | Cards | What you're reacting to |
|-------|-------|------------------------|
| 1. Company Vibes | 12 | Real and archetypal company descriptions |
| 2. Daily Work | 15 | What your day-to-day would look like |
| 3. Problems & Projects | 12 | The kind of problems you'd solve |
| 4. Work Style | 8 | How the team works together |

47 cards total. Takes about 5-10 minutes.

## Run it

```
bun run discover.ts
```

## Output

Your results are saved to `prefs/`:

- `swipes.json` — raw swipe history (card ID, reaction, timestamp)
- `profile.json` — computed preference profile with dimension scores, matching roles, and companies

## Stack

Zero external dependencies. Built with Bun.

## File structure

```
cards.ts      # 47 cards organized by round, each with dimension tags
engine.ts     # Preference scoring engine — weighted dimensions, role/company matching
display.ts    # Terminal rendering — card boxes, bar charts, profile display
discover.ts   # Main CLI loop — shuffles cards, reads input, runs rounds
```
