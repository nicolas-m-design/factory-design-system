# Contributing

## Workflow

1. Install dependencies with `npm ci`.
2. Run `npm run dev` while iterating on the docs app.
3. Run `npm run check` before opening a PR.
4. Run `npm run build` if you changed routing, assets, or token generation.

## Source Of Truth

- Edit `src/tokens/primitives.json` and `src/tokens/semantic.json` for token changes.
- Edit `DESIGN.md` and `docs/*.md` when the documented contract changes.
- Do not hand-edit files in `src/generated/`; regenerate them through the token pipeline.

## Pull Requests

- Keep changes scoped to one contract or repo-health concern.
- Update tests when behavior or route copy changes.
- Include screenshots when UI structure or visual treatment changes.
