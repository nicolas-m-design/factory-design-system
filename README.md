# Factory Design System

A token-driven brand architecture that bridges Figma and code. Design tokens are extracted from Figma, generated as structured files (JSON + CSS custom properties), and consumed by React components with zero hardcoded values.

Built by [Nicolas Menard](https://nicolasmenard.design) as a portfolio case study exploring how design systems can be authored in Figma and delivered to production through a strict token pipeline.

## How it works

```
Figma Variables  →  JSON Tokens  →  CSS Custom Properties  →  React Components
(Primitives)        (primitives.json)  (primitives.css)          (Button.css)
(Semantics)         (semantic.json)    (semantic.css)            zero hardcoded values
```

### Three-layer token architecture

| Layer | Scope | Example |
|---|---|---|
| **Primitives** | `:root` — raw values | `--primitive-orange-9: #E8520A` |
| **Semantics** | `[data-brand="default"]` — meaningful aliases | `--color-action-primary: var(--primitive-orange-9)` |
| **Components** | BEM classes — consume tokens only | `background: var(--color-action-primary)` |

This separation means a full rebrand (new colors, new typography) only touches the primitive and semantic layers. Components never change.

## What's in the box

### Foundations
- **72-color palette** across 6 hues (orange, neutral, sand, red, green, blue) using a Radix-style 12-step scale
- **Typography** — Geist Mono, 5 weights, 10-step size scale
- **Spacing** — strict 4px grid
- **Elevation** — shadow system with focus ring pattern

### Components
- **Button** — Primary / Secondary, pill-shaped, 2 sizes
- **Card** — 3 variants (image+text+link, image+link, text+link)
- **Badge** — Notification indicator, new/informational states, 3 sizes
- **Tag** — Status labels (neutral, success, warning, error, info)
- **Alert** — Info / Success / Error with icon, title, optional description
- **InputField** — Text input with label, helper text, error/disabled states

### Figma sync
- Figma Variables (114 primitives + 41 semantics) are the source of truth
- W3C DTCG format JSON for Figma Variables Import plugin
- Figma MCP server used for design-to-code inspection

## DESIGN.md

The [`DESIGN.md`](./DESIGN.md) file captures the entire design system specification in plain markdown — colors, typography, component specs, spacing, guardrails, and agent instructions. Any AI coding tool (Claude, Cursor, Copilot) can read it and generate components that match the system without additional context.

## Tech stack

- **Vite** + **React** + **TypeScript**
- Plain CSS with custom properties (no Tailwind, no CSS-in-JS)
- BEM naming convention
- Figma as design source of truth

## Getting started

```bash
npm install
npm run dev
```

## Credits

- **Kyle Anthony Miller** ([brasshands.com](https://brasshands.com)) — Brand and design direction inspiration
- **Jocelyn Lin** ([jocelyn-lin.com](https://www.jocelyn-lin.com/dls-2026-case-study.html)) — Token-driven architecture and design systems methodology inspiration
