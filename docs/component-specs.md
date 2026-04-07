# Component Specs

This document is the normalized behavior-contract index for Factory Design System.

Use it with:

- `DESIGN.md` for global policy, layout rules, and accessibility policy
- `src/docs/routes.tsx` for rendered specimens and examples
- `src/components/**` for runtime implementation details

Every component family should be documented with the same contract shape:

1. Anatomy
2. Variants
3. Sizes
4. States
5. Behavior
6. Content Rules
7. Placement Rules
8. Semantic Intent
9. Implementation Notes
10. Responsive Failure Modes
11. Accessibility Notes

When a field is not relevant, mark it `Not applicable` rather than omitting it.

## Buttons

- Route: `#/components/buttons`
- Anatomy:
  - shell
  - label
  - leading icon
  - trailing icon
  - loading spinner
- Variants:
  - `primary`
  - `secondary`
- Sizes:
  - `sm`
  - `md`
  - `lg`
- States:
  - default
  - hover
  - focus
  - pressed
  - disabled
  - loading
- Behavior:
  - loading disables repeated activation
  - focus uses the shared external outline
- Content Rules:
  - keep explicit labels visible in all states
  - icons are supporting affordances, not the only label
- Placement Rules:
  - one primary action per region
  - secondary supports lower-priority actions
- Semantic Intent:
  - primary is the brand/action treatment
  - secondary is a supporting action, not a new hierarchy or color family
- Implementation Notes:
  - use semantic action, text, and focus tokens only
  - loading preserves layout and label context
- Responsive Failure Modes:
  - long labels must wrap or trigger layout reflow before hit targets shrink below 44px
  - button groups should stack instead of forcing two-dimensional scrolling
- Accessibility Notes:
  - keyboard focus must remain visible
  - disabled and loading cannot rely on color alone

## Forms

- Route: `#/components/forms`
- Anatomy:
  - visible label
  - field shell
  - helper text
  - error text
  - optional adornment or arrow
  - binary control box or track for checkbox, radio, and toggle
- Variants:
  - `InputField`
  - `Select`
  - `Textarea`
  - `Checkbox`
  - `Radio`
  - `Toggle`
- Sizes:
  - shared touch-target minimum
  - textarea height is content-oriented rather than size-tokenized
- States:
  - default
  - hover
  - focus
  - error
  - disabled
  - read-only
  - helper text
  - error text
  - select/date guidance
- Behavior:
  - read-only remains visible and selectable
  - disabled leaves the interaction flow
  - date is spec-only in the current phase
- Content Rules:
  - every field needs a visible label
  - helper text explains intent
  - error text explains correction
- Placement Rules:
  - group related fields through spacing, not decorative containers
  - binary controls should align to label baselines and maintain readable spacing
- Semantic Intent:
  - all fields share one hard-edge shell and one messaging system
- Implementation Notes:
  - `label`, `helperText`, `error`, `disabled`, `readOnly`, and `required` are the shared contract
  - do not introduce component-specific field shells
- Responsive Failure Modes:
  - stacked layouts are preferred to multi-column compression
  - long helper or error text must wrap without overlapping controls
  - select/date variants must preserve the same field shell on narrow screens
- Accessibility Notes:
  - visible label plus programmatic association is required
  - custom focus styles cannot remove visible focus
  - read-only and disabled must remain distinguishable without lowering contrast too far

## Links

- Route: `#/components/links`
- Anatomy:
  - label
  - underline
- Variants:
  - `default`
  - `inverse`
- Sizes:
  - `regular`
  - `small`
- States:
  - default
  - hover
  - focus
  - visited
  - disabled
- Behavior:
  - disabled links drop out of the interaction model
  - visited is a browser state, not a separate component type
- Content Rules:
  - link copy should remain textual and descriptive
- Placement Rules:
  - use for inline navigation and secondary inline actions
  - do not replace primary buttons with links
- Semantic Intent:
  - links are navigational or inline-action affordances, not button substitutes
- Implementation Notes:
  - underline remains visible before hover
  - inverse is reserved for dark surfaces
- Responsive Failure Modes:
  - long inline links must wrap cleanly and keep the underline treatment
  - inverse links must preserve contrast on narrow dark panels
- Accessibility Notes:
  - focus visible is required
  - color alone cannot be the only link signal

## Tabs

- Route: `#/components/tabs`
- Anatomy:
  - tablist
  - tab
  - optional icon
  - optional count
  - indicator
  - tabpanel
- Variants:
  - default
  - with icon
  - with number
  - disabled item
- Sizes:
  - Not applicable as a separate public size system in this phase
- States:
  - default
  - selected
  - focus
  - disabled
  - overflow/mobile
- Behavior:
  - arrow keys move between enabled tabs
  - Home/End jump to first/last enabled tab
  - selected tab controls its panel
- Content Rules:
  - labels stay primary
  - icons and counts are supporting metadata
- Placement Rules:
  - use for sibling content panels, not route-level navigation
- Semantic Intent:
  - tabs are a composite widget with shared content context
- Implementation Notes:
  - explicit tab and panel ids
  - correct ARIA wiring
- Responsive Failure Modes:
  - horizontal overflow is acceptable
  - labels should not compress below readable tap targets
- Accessibility Notes:
  - follow WAI tab semantics and keyboard behavior
  - focus and selection state must remain distinct

## Badges

- Route: `#/components/badges`
- Anatomy:
  - dot or count
- Variants:
  - `brand`
  - `neutral`
  - `info`
  - `success`
  - `attention`
  - `error`
- Sizes:
  - `md`
  - `lg`
- States:
  - dot
  - count
  - overflow
  - placement
- Behavior:
  - `max` defines explicit overflow formatting
- Content Rules:
  - counts are supporting metadata, not primary labels
- Placement Rules:
  - place near the object or control the count refers to
- Semantic Intent:
  - only `brand` uses action semantics
  - neutral/info/status tones come from semantic feedback tokens
- Implementation Notes:
  - avoid action-token fills for neutral or informational badges
- Responsive Failure Modes:
  - overflow must stay explicit and predictable in dense layouts
  - badge placement cannot obscure the parent control or label
- Accessibility Notes:
  - announce what the count refers to
  - do not use tone alone as the only signal

## Alerts

- Route: `#/components/alerts`
- Anatomy:
  - panel shell
  - optional icon
  - title
  - optional body
  - optional action
  - optional dismiss control
- Variants:
  - `neutral`
  - `info`
  - `success`
  - `attention`
  - `error`
- Sizes:
  - Not applicable as a separate public size system in this phase
- States:
  - neutral vs info
  - dismissible vs non-dismissible
  - icon vs no icon
  - title/body/action
  - stacked behavior
- Behavior:
  - `status` for non-disruptive messaging
  - `alert` for disruptive attention/error
- Content Rules:
  - title and body should explain the condition and next step
  - actions must be few and explicit
- Placement Rules:
  - alerts stack with deliberate spacing
  - avoid using alerts for routine layout copy
- Semantic Intent:
  - neutral is the white/ink status family
  - info is the blue informational family
- Implementation Notes:
  - the prior white “info” treatment is now `neutral`
- Responsive Failure Modes:
  - stacked alerts must stay separated and readable
  - action and dismiss controls must remain reachable without horizontal scrolling
- Accessibility Notes:
  - choose `status` versus `alert` intentionally
  - dismiss controls need visible label and focus visibility

## Cards

- Route: `#/components/cards`
- Anatomy:
  - shell
  - optional image
  - text block
  - optional CTA
- Variants:
  - static
  - clickable
  - square media
  - landscape media
- Sizes:
  - Not applicable as a separate public size system in this phase
- States:
  - static
  - clickable
  - hover/focus
  - image ratio
  - CTA hierarchy
- Behavior:
  - clickable cards lift on hover/focus
  - static cards can expose explicit CTA text
- Content Rules:
  - CTA hierarchy must be unambiguous
  - interactive cards should not nest conflicting actions
- Placement Rules:
  - use consistent spacing and ratio patterns across card groups
- Semantic Intent:
  - cards are surface containers, not generic layout wrappers
- Implementation Notes:
  - cards share the same square shell and border family as alerts and panels
- Responsive Failure Modes:
  - card grids should stack rather than force horizontal scrolling
  - media ratios must remain predictable as card widths shrink
- Accessibility Notes:
  - clickable cards need a discernible accessible name
  - nested interactive targets should be avoided
