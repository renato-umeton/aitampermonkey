# Contributing to AI Tampermonkey Bookmarklet Menu

## Before You Start

**You MUST read and follow these files before making any changes:**

- [`CLAUDE.md`](CLAUDE.md) — Architecture, conventions, and AI-agent instructions
- This file (`CONTRIBUTING.md`) — Workflow and release process

## Development Workflow

1. **Branch from `main`** — Create a feature or fix branch (e.g., `feature/my-change`).
2. **Edit only `universal-bookmarklet-menu.user.js`** — This is the single canonical script. Do not rename it.
3. **Archive the current version first** — Before making changes, copy the current script to `previous-versions/` using the naming convention `NN Universal Bookmarklet Menu-X.Y.user.txt` (where `NN` is the next sequential number).
4. **Test manually** — Load the script in Tampermonkey and verify on both desktop and mobile browsers. There is no automated test suite.
5. **Open a PR against `main`** — Include a clear description of what changed and why.

## Version Bumps

When releasing a new version, update **all three** of these in `universal-bookmarklet-menu.user.js`:

1. `@version` in the UserScript metadata header
2. `SCRIPT_VERSION` constant
3. `SCRIPT_DATE` constant (use the release date, `YYYY-MM-DD`)

Also update `README.md`:

- Update the version number in the "Functionalities" heading
- Add a new row to the top of the **Change log** table

## Code Style

- ES6+ JavaScript (async/await, const/let, arrow functions, template literals).
- No build tools, transpilers, or package managers — the script runs directly in Tampermonkey.
- CSS is injected via `GM_addStyle`. Use CSS custom properties (`--var`) for theming.
- Keep all code in a single IIFE — do not split into modules.

## File Structure

```
universal-bookmarklet-menu.user.js   # Current active script (stable filename)
previous-versions/                   # Archived older versions (.user.txt)
CLAUDE.md                            # AI-agent and architecture reference
CONTRIBUTING.md                      # This file
README.md                            # User-facing docs and changelog
```

## What NOT to Do

- Do not change the `@name` or `@namespace` metadata — this breaks auto-updates and wipes user data (`GM_setValue` storage).
- Do not add build dependencies (npm, webpack, etc.).
- Do not commit API keys or secrets.
- Do not modify files in `previous-versions/` — they are read-only archives.

## AI Agent Contributors (Claude Code, Copilot, etc.)

If you are an AI agent working on this repo:

1. **Read `CLAUDE.md` in full** before making any changes. It contains the project architecture, conventions, and detailed notes you need.
2. **Follow this `CONTRIBUTING.md`** for the release workflow (version bumps, archiving, changelog updates).
3. **Do not skip the version archive step** — always copy the current script to `previous-versions/` before editing.
