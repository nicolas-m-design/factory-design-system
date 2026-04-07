# Factory Design System

## Summary

Factory Design System is a token-driven spec app built around one canonical visual language:

- Typeface: Geist Mono
- Brand palette: orange + ink
- Semantic blue: informational-only

The repo is intentionally structured so the token inputs are the single source of truth and the spec site is the visible expression of those tokens.

## Source of Truth

Only these files define token values and aliases:

- `src/tokens/primitives.json`
- `src/tokens/semantic.json`

All generated CSS variables and token docs derive from those files.

## Artifact Governance

The repo has more than one canonical layer. Each artifact has a different job:

- Token values and alias relationships:
  - `src/tokens/primitives.json`
  - `src/tokens/semantic.json`
- Global design language, layout policy, accessibility policy, and route contract:
  - `DESIGN.md`
- Normalized component behavior contracts:
  - `docs/component-specs.md`
- Figma execution checklist for system edits:
  - `docs/figma-edit-checklist.md`
- Icon subset, growth rules, and semantic usage:
  - `docs/icon-guidelines.md`
- Rendered specimens, examples, and route copy:
  - `src/docs/routes.tsx`
- Runtime implementation details:
  - `src/components/**`
- Consistency enforcement:
  - `src/test/**`

Do not treat the routed spec pages as the only source of truth for behavior. They are the rendered expression of the authored contracts above.

## Token Pipeline

`primitives.json` and `semantic.json` are processed by `scripts/generate-tokens.mjs`.

That script is responsible for:

- validating token references
- generating `src/generated/primitives.css`
- generating `src/generated/semantic.css`
- generating `src/generated/token-docs.ts`

The build and test scripts always run token generation first.

## Token Taxonomy

### Primitives

Raw values only. No meaning beyond the value itself.

- `color`
  - `orange`, `ink`, `sand`, `red`, `green`, `blue`
- `space`
- `radius`
- `borderWidth`
- `elevation`
- `iconSize`
- `fontFamily`
- `fontSize`
- `lineHeight`
- `fontWeight`
- `opacity`

Generated CSS format:

- `--primitive-color-orange-9`
- `--primitive-space-4`
- `--primitive-border-width-strong`

### Semantics

Meaningful aliases that components consume.

- `color.action`
- `color.surface`
- `color.text`
- `color.border`
- `color.feedback`
- `focus`
- `layout`
- `radius`
- `borderWidth`
- `elevation`
- `iconSize`
- `opacity`
- `typography`

Generated CSS format:

- `--color-action-primary`
- `--color-feedback-info-surface`
- `--focus-outline-color`
- `--layout-page-inset`
- `--typography-heading-size`

## Route Structure

The app uses `HashRouter` and mirrors the design-system information architecture.

### Overview

- `#/overview`

### Foundations

- `#/foundations/colors`
- `#/foundations/typography`
- `#/foundations/layout`
- `#/foundations/icons`

### Components

- `#/components/buttons`
- `#/components/forms`
- `#/components/links`
- `#/components/tabs`
- `#/components/badges`
- `#/components/alerts`
- `#/components/cards`

### Route Contract

The `Overview` route is intentionally different from the rest of the system. It is the narrative entry point and must include:

- system model
- reference implementation
- accessibility notes

Every foundation and component route must include:

- state coverage
- usage guidance
- token mapping
- accessibility notes

Optional sections such as best practices, curated galleries, or interactive demos may be added when they clarify the contract.

## Component Contracts

### Button

- Variants: `primary | secondary`
- Sizes: `sm | md | lg`
- Props:
  - `leadingIcon?`
  - `trailingIcon?`
  - `loading?`

Required documentation states:

- default
- hover
- focus
- pressed
- disabled
- loading

### Forms

Shared field contract across `InputField`, `Select`, and `Textarea`:

- `label`
- `helperText`
- `error`
- `disabled`
- `readOnly`
- `required`

Required documentation coverage:

- default
- hover
- focus
- error
- disabled
- read-only
- helper/error text
- select/date guidance

Date input remains spec-only in this phase.

### Link

- Appearances: `default | inverse`
- States:
  - default
  - hover
  - focus
  - visited
  - disabled

### Tabs

- Props:
  - `value`
  - `onValueChange`
  - `items: { value, label, icon?, count?, disabled?, content? }[]`

Behavior requirements:

- explicit tab and tabpanel ids
- arrow key navigation
- Home/End navigation
- icon and count variants
- overflow/mobile guidance

### Badge

- Tones:
  - `brand`
  - `neutral`
  - `info`
  - `success`
  - `attention`
  - `error`
- `max` controls overflow formatting

Badge semantics rule:

- neutral and informational badges must not use action tokens as their fill

### Alert

- Tones:
  - `neutral`
  - `info`
  - `success`
  - `attention`
  - `error`
- Props:
  - `action?`
  - `dismissible?`
  - `showIcon?`

Accessibility rule:

- use `role="status"` for non-disruptive tones
- use `role="alert"` for disruptive attention/error tones

Semantic rule:

- the former white “info” treatment is now `neutral`
- blue info is a true informational tone

### Card

Documented behaviors:

- static vs clickable
- hover/focus lift
- square vs landscape media ratios
- CTA hierarchy

## Visual Rules

- Orange is the only brand accent.
- Ink surfaces and text anchor the system.
- Blue is reserved for informational semantics.
- Do not reintroduce a second documentation font.
- Do not use primitive color tokens directly in component CSS.

## Accessibility Rules

- Focus must remain clearly visible on all interactive elements.
- Touch targets must stay at or above 44px.
- Labels must remain visible for form fields.
- Tabs must preserve correct ARIA wiring and keyboard interaction.
- Alerts must use appropriate live-region semantics.
- Links must remain identifiable before hover.

## Page Annotation Rules

Any page, screen, or flow documented through this system should annotate page-level structure as well as component-level behavior.

- Heading hierarchy:
  - one page-level heading
  - section headings must descend in order
- Landmarks:
  - annotate primary regions such as header, navigation, main, complementary, and footer when they exist
- Semantic order:
  - document reading order and source order when the visual layout could imply a different sequence
- Focus order:
  - note where focus enters, how it moves through composite widgets, and where it lands after dismiss or navigation actions
- Status and live messaging:
  - identify when passive status uses `status` semantics and when disruptive messaging uses `alert`

Page annotation rules are part of the authored system contract even when the routed spec page is primarily visual.

## Testing Rules

The repo must keep these checks passing:

- `npm run build`
- `npm run test`

The automated suite covers:

- token reference validation and generated-file drift
- component behavior for buttons, alerts, badges, tabs, and fields
- docs-route acceptance coverage
- accessibility smoke tests with `jest-axe`

## Implementation Guardrails

- Update token JSON first, then regenerate outputs.
- Keep generated files deterministic and committed.
- Prefer semantic tokens in components.
- Use the routed docs app as the primary artifact, not a single long gallery page.
- When a new component or state is added, update both the runtime component and its route-level spec coverage.
