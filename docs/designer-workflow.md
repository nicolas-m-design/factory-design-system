# Designer Workflow

This document defines how designers contribute to the repo and the shared Figma file without breaking the canonical contract.

## Collaboration Model

- The repo is canonical.
- Figma is collaborative, but only `WIP` content may diverge from `main`.
- Canonical variables, components, and page examples in Figma must match the merged repo state.
- A design change is not accepted until the repo PR is merged.

## One-Time Admin Setup

### GitHub

- Give at least two maintainers admin access to the repository.
- Protect `main`.
- Disallow direct pushes to `main`.
- Require the existing `CI` status check.
- Require 1 approving review before merge.
- Dismiss stale approvals when new commits are pushed.
- Enable CODEOWNERS-based review requests.

### Figma

- Give at least two maintainers admin access to the shared file or owning team.
- Keep one shared file for the system.
- Restrict publishing variables and components to maintainers.
- Reserve `WIP` work for experimentation and review, not publishing.

## Fixed Figma Page Roles

Use this page structure in the shared file:

- `00 Start Here`
- `10 Foundations`
- `20 Components`
- `90 WIP`
- `99 Archive`

Rules:

- `10 Foundations` and `20 Components` are canonical.
- `90 WIP` is explicitly non-canonical and must never be published.
- `99 Archive` holds retired patterns and migration references only.
- Do not add a second canonical page for the same system surface.

## Start Here Page Content

The `00 Start Here` page should communicate these rules directly in the file:

```md
Factory Design System

Repo canonical: accepted changes land in git first.
Figma WIP may diverge; published assets may not.

Page roles:
- 10 Foundations: canonical variables, styles, and primitives
- 20 Components: canonical published components
- 90 WIP: design exploration and review work only
- 99 Archive: retired references, never publish

Required links:
- GitHub repo
- Preview
- DESIGN.md
- component-specs.md
- figma-edit-checklist.md

Naming rules:
- dot notation only
- one canonical token taxonomy
- Geist Mono only for core UI styles
- no legacy names in canonical pages

Canonical change rule:
- every accepted Figma change needs a matching repo PR
- publish only after the PR is merged
```

## Allowed Repo Surfaces For Designers

Designers should usually stay within:

- `src/tokens/primitives.json`
- `src/tokens/semantic.json`
- `DESIGN.md`
- `docs/component-specs.md`
- `docs/figma-edit-checklist.md`
- `docs/icon-guidelines.md`
- `docs/designer-workflow.md`
- `src/docs/**`
- `src/components/**` when the component contract change requires matching runtime behavior

## Canonical Change Flows

### Token change

1. Explore in Figma under `90 WIP`.
2. Update the canonical token source files in the repo.
3. Update any dependent docs, preview artifacts, or derived outputs in the same PR.
4. Merge the PR.
5. Update canonical Figma variables or components to match `main`.
6. Publish from the canonical page only.

### Component change

1. Explore in Figma under `90 WIP`.
2. Update repo specs, routed specimens, and any runtime component or test coverage required by the change.
3. Merge the PR.
4. Update the canonical component on `20 Components`.
5. Publish only after the canonical repo state is merged.

### Figma-only exploration

- Keep the work in `90 WIP`.
- Do not publish it.
- Do not update canonical pages until the repo PR is accepted.

## Definition Of Done

A design-system change is done only when all of the following are true:

- the repo PR is merged
- canonical docs and token files match the accepted design
- the preview or routed specimen reflects the accepted change when relevant
- canonical Figma pages match `main`
- the change is published from a canonical page only if publication is required
