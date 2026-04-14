# Contributing

Factory uses a repo-first workflow.

- `main` is the canonical source of truth.
- Figma is the collaborative working surface.
- Only `WIP` content in Figma may diverge from `main`.
- Accepted changes land in git first, then move into canonical Figma pages and published assets.

For the full repo↔Figma handshake, see [docs/designer-workflow.md](docs/designer-workflow.md).

## Local Setup

- Node: `20.x`
- Package manager: `npm`

1. Install dependencies with `npm ci`.
2. Run `npm run dev` while iterating on the docs app.
3. Run `npm run check` before opening a PR.
4. Run `npm run build` if you changed routing, assets, or token generation.

Use Node 20 before installing dependencies. The repo-level version contract lives in `.nvmrc`.

## Allowed Edit Surfaces

Designers should usually keep changes inside the canonical design-system surfaces:

- `src/tokens/primitives.json`
- `src/tokens/semantic.json`
- `DESIGN.md`
- `docs/component-specs.md`
- `docs/figma-edit-checklist.md`
- `docs/icon-guidelines.md`
- `docs/designer-workflow.md`
- `src/docs/**` when the visual contract or specimen copy changes
- `src/components/**` when a spec change requires matching runtime updates

If a change crosses into broader engineering setup, keep the PR open and call out the needed follow-up explicitly.

## Source Of Truth

- Edit `src/tokens/primitives.json` and `src/tokens/semantic.json` for token changes.
- Edit `DESIGN.md` and `docs/*.md` when the documented contract changes.
- Update `src/docs/**` and component code when the accepted design contract changes.
- Do not hand-edit files in `src/generated/`; regenerate them through the token pipeline.
- Do not merge a canonical Figma change without a matching repo PR.

## Pull Requests

- Keep changes scoped to one contract or repo-health concern.
- Update tests when behavior or route copy changes.
- Include screenshots when UI structure or visual treatment changes.
- Include the Figma page or frame link.
- State the affected routes, components, or token groups.
- State whether a Figma publish is required after merge.
