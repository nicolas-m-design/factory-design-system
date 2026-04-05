# PROJECT BRIEF — Token Brand System

## Context

This project demonstrates how AI (Claude Code + Figma MCP) can accelerate design system development by automating token extraction, structured file generation, and component scaffolding.

**Inspiration**: Jocelyn Lin's multi-brand token architecture case study
→ https://www.jocelyn-lin.com/dls-2026-case-study.html

**Our adaptation**: Single-brand, end-to-end — focused on the workflow itself as a practitioner's walkthrough. The portfolio article tells the story of the process, not just the output.

**Author**: Nicolas Ménard — nicolasmenard.design

---

## Architecture: Three-Layer Token System

```
┌─────────────────────────────────────────────────┐
│  Layer 3: Components                            │
│  .button { background: var(--color-action-primary) }  │
│  Consumes semantic tokens via CSS custom props   │
├─────────────────────────────────────────────────┤
│  Layer 2: Semantic Tokens                        │
│  --color-action-primary: var(--primitive-blue-600)     │
│  Meaningful names → reference primitives         │
├─────────────────────────────────────────────────┤
│  Layer 1: Primitives                             │
│  --primitive-blue-600: #2563EB                   │
│  Raw values: colors, spacing, radii, type scale  │
└─────────────────────────────────────────────────┘
```

### Layer 1 — Primitives (brand-owned raw values)
- **Color**: Full palette with numbered scale (50–950)
- **Spacing**: 4px base, modular scale (space-1 through space-12)
- **Typography**: Font family, weight, size, line-height, letter-spacing
- **Border radius**: Radius scale (none, sm, md, lg, full)
- **Border width**: Width scale
- **Elevation**: Shadow definitions
- **Opacity**: Opacity levels

### Layer 2 — Semantic Tokens (mapped meanings)
- **color.action.primary** → main CTA color
- **color.action.primary.hover** → CTA hover state
- **color.surface.card** → card background
- **color.surface.page** → page background
- **color.text.primary** → main content text
- **color.text.secondary** → supporting text
- **color.text.on-action** → text on CTA buttons
- **color.border.default** → default border color
- **color.border.input.default** → input border default
- **color.border.input.focus** → input border focus state
- **color.border.input.error** → input border error state
- **color.feedback.error** → error messaging
- **font.heading.family** → heading typeface
- **font.body.family** → body typeface
- **radius.button** → button corner radius
- **radius.card** → card corner radius
- **radius.input** → input field corner radius
- **shadow.card** → card elevation shadow

### Layer 3 — Components
- CSS classes consume only semantic tokens
- BEM naming convention
- No raw values anywhere

---

## Phases

### Phase 1: Figma Token Foundation
**Goal**: Set up Figma Variables and Variable Collections

Tasks:
1. Audit existing Figma components — identify all colors, type styles, spacing, and radii in use
2. Create "Primitives" Variable Collection in Figma — register all raw values
3. Create "Semantics" Variable Collection in Figma — map meaningful names to primitives
4. Wire existing components to consume Figma Variables instead of raw values

**Done when**: All components in Figma resolve through Variables, zero hardcoded values in Figma.

---

### Phase 2: MCP Token Extraction
**Goal**: Extract token data from Figma via MCP into structured JSON

Tasks:
1. Use Claude Code + Figma MCP to read Variable Collections
2. Generate `primitives.json` with all raw values
3. Generate `semantic.json` with all mappings (semantic name → primitive reference)
4. Validate extracted JSON matches Figma source of truth

**Done when**: Two clean JSON files that fully represent the Figma token structure.

---

### Phase 3: CSS Custom Properties Generation
**Goal**: Auto-generate layered CSS from token JSON

Tasks:
1. Generate `primitives.css` — all primitive values as CSS custom properties
2. Generate `semantic.css` — semantic tokens referencing primitive vars
3. Generate `globals.css` — import order and `[data-brand="default"]` scoping
4. Validate the cascade: semantic vars resolve to primitive vars at runtime

**Done when**: A browser can load globals.css and all semantic vars resolve correctly.

---

### Phase 4: React Component Build
**Goal**: Build three components consuming only CSS tokens

Tasks:
1. Scaffold Vite + React + TypeScript project
2. Build `Button` component — variants, states, sizes
3. Build `Card` component — image, title, description, CTA
4. Build `InputField` component — label, placeholder, helper text, error state
5. Build a demo page showcasing all components and states
6. Audit: grep for any hardcoded color/spacing/radius values — must be zero

**Done when**: Demo page renders all components, all values resolve through tokens.

---

### Phase 5: Deploy + Portfolio Article
**Goal**: Ship to Vercel and document the process

Tasks:
1. Deploy to Vercel
2. Write portfolio article for nicolasmenard.design
3. Link to Jocelyn Lin's article as the inspiration/reference framework
4. Document: what worked, what didn't, what AI handled vs. what needed manual work

---

## Portfolio Article Structure (Draft Outline)

### Title ideas
- "From Figma to Production: Building a Token-Driven UI with AI"
- "How I Used Claude Code + Figma MCP to Build a Design Token Pipeline"

### Sections
1. **The problem** — Why tokens matter, what breaks without them
2. **The reference** — Jocelyn Lin's multi-brand architecture (link + credit)
3. **My approach** — Single-brand, workflow-focused, learning exercise
4. **The setup** — Claude Code + Figma MCP configuration
5. **Phase 1: Figma tokens** — Screenshots of Variable Collections, before/after
6. **Phase 2: Extraction** — Terminal screenshots, JSON output
7. **Phase 3: CSS generation** — The three-layer cascade explained
8. **Phase 4: Components** — Live demo, code snippets, zero-hardcoded audit
9. **What AI handled vs. what I did manually** — Honest assessment
10. **What I'd do differently** — Lessons learned

---

## Brand Direction

Extract from existing Figma components. Formalize what's already there rather than inventing a new brand. The article narrative: "I took my existing design work and systematized it using AI."

---

## Success Criteria

- [ ] Figma Variables fully set up (Primitives + Semantics)
- [ ] Token JSON files generated via MCP extraction
- [ ] CSS custom properties auto-generated from JSON
- [ ] 3 React components with zero hardcoded values
- [ ] `data-brand` attribute scoping works
- [ ] Deployed to Vercel
- [ ] Portfolio article published on nicolasmenard.design
