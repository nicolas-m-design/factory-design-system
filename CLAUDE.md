# CLAUDE.md — Token Brand System

## Project Overview

This is a token-driven brand architecture project. The goal is to extract design tokens from a Figma file via MCP, generate structured token files (JSON + CSS custom properties), and build React components that consume tokens with zero hardcoded values.

This project follows the methodology described in Jocelyn Lin's case study: https://www.jocelyn-lin.com/dls-2026-case-study.html — adapted for a single-brand implementation.

## Key Architecture Rules

1. **Three-layer token system**: Primitives → Semantics → Components
2. **Zero hardcoded values** in React components — every visual decision resolves through the token chain
3. **BEM class composition** for component styling
4. **CSS custom properties** as the delivery mechanism — no CSS-in-JS, no Tailwind
5. **`data-brand` attribute** on the root element scopes all token values (even for one brand — the architecture must support future brand additions)
6. **Figma is the source of truth** — tokens are extracted, not invented in code

## Tech Stack

- React + TypeScript
- CSS Custom Properties (3 layers)
- Vite (build tool)
- Vercel (deployment)

## Figma MCP Workflow

The Figma MCP server is connected. When working with Figma:
- Use frame/component URLs provided by the user to extract design context
- Extract Variables and Variable Collections for token generation
- Never guess values — always pull from Figma

## Token File Structure

```
src/
  tokens/
    primitives.json       # Raw values: colors, spacing, type scale, radii
    semantic.json          # Mapped meanings referencing primitives
  styles/
    primitives.css         # CSS custom properties for primitive values
    semantic.css           # CSS custom properties referencing primitives
    components.css         # Component-level token consumption
    globals.css            # Imports all layers in correct order
  components/
    Button/
      Button.tsx
      Button.css
    Card/
      Card.tsx
      Card.css
    InputField/
      InputField.tsx
      InputField.css
```

## Component Scope

Three proof-of-concept components:
1. **Button** — variants (primary, secondary, ghost), states (default, hover, active, focus, disabled), sizes (sm, md, lg)
2. **Card** — surface colors, spacing, typography hierarchy, radius, elevation
3. **InputField** — states (default, focus, error, disabled), label + helper text

## Phase Execution

Follow PROJECT_BRIEF.md for the full phase breakdown. Execute one phase at a time, confirm results with the user before moving to the next.

## Code Style

- Functional React components with TypeScript
- BEM naming: `.button`, `.button--primary`, `.button__label`
- No default exports — use named exports
- Props interface defined for each component
- All CSS values must reference `var(--token-name)` — never raw values
