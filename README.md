# Factory Design System

Factory Design System is a routed React spec app backed by generated design tokens. The canonical sources are `src/tokens/primitives.json` and `src/tokens/semantic.json`; everything else in the visual system is derived from those inputs.

## Artifact Roles

- Token values and aliases:
  - `src/tokens/primitives.json`
  - `src/tokens/semantic.json`
- Global system policy and route contract:
  - `DESIGN.md`
- Normalized component behavior contracts:
  - `docs/component-specs.md`
- Figma execution checklist:
  - `docs/figma-edit-checklist.md`
- Icon subset and usage policy:
  - `docs/icon-guidelines.md`
- Rendered specimens and route copy:
  - `src/docs/routes.tsx`
- Runtime implementation:
  - `src/components/**`
- Tests and contract enforcement:
  - `src/test/**`

## Architecture

```
primitives.json + semantic.json
          ↓
scripts/generate-tokens.mjs
          ↓
src/generated/primitives.css
src/generated/semantic.css
src/generated/token-docs.ts
          ↓
Routed spec app + token-driven components
```

- `primitives.json` stores raw values: color scales, spacing, radius, border width, elevation, icon size, typography, opacity.
- `semantic.json` stores role-based aliases: action, surface, text, border, feedback, focus, layout, typography.
- Components consume semantic color, border, focus, and elevation tokens. Primitive values stay in foundations and generated aliases.

## Routes

- `#/overview`
- `#/foundations/colors`
- `#/foundations/typography`
- `#/foundations/layout`
- `#/foundations/icons`
- `#/components/buttons`
- `#/components/forms`
- `#/components/links`
- `#/components/tabs`
- `#/components/badges`
- `#/components/alerts`
- `#/components/cards`

`#/overview` is the narrative entry route.

Every foundation and component route includes:

- state coverage
- usage guidance
- token mapping
- accessibility notes

## Canonical Visual Language

- Typeface: Geist Mono only
- Brand accents: orange + ink
- Blue: informational-only semantic feedback, not a secondary brand color

## Component API Highlights

- `Button`
  - `leadingIcon`, `trailingIcon`, `loading`
- `Tabs`
  - `value`, `onValueChange`, `items: { value, label, icon?, count?, disabled?, content? }[]`
- `Alert`
  - `tone: neutral | info | success | attention | error`
  - `action`, `dismissible`, `showIcon`
- `Badge`
  - `tone: brand | info`
  - `max` for explicit overflow handling
- `Link`
  - `appearance: default | inverse`
  - `disabled`
- `InputField`, `Select`, `Textarea`
  - shared field shell for `label`, `helperText`, `error`, `disabled`, `readOnly`, `required`

## Scripts

```bash
npm run dev
npm run check
npm run build
npm run test
npm run typecheck
npm run generate:tokens
```

## Testing

The repo includes:

- token generation drift checks
- component behavior tests for buttons, alerts, badges, tabs, and field controls
- docs-route acceptance tests that verify every route renders state coverage and accessibility guidance
- `jest-axe` smoke coverage for representative UI

## Notes

- Generated artifacts live in `src/generated/` and are committed as deterministic build outputs.
- The app uses `HashRouter` so the docs routes work on static hosting without server-side rewrite rules.
- `DESIGN.md` contains the higher-level system spec and implementation rules.
- `Badge` keeps a deliberately small public surface: `brand` maps to the filled `New` state and `info` maps to the outlined `Informational` state.
