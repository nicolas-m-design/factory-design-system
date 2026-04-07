# Figma Edit Checklist

Use this checklist when updating the Factory Design System in Figma.

This file is not the source of truth for token values. It is the execution checklist that keeps Figma aligned with:

- `src/tokens/primitives.json`
- `src/tokens/semantic.json`
- `DESIGN.md`
- `docs/component-specs.md`

## Before Editing

- Confirm the change belongs in the system, not just a one-off screen.
- Confirm whether the change is:
  - token-only
  - component-only
  - spec-only
  - cross-cutting
- Read the relevant route in `src/docs/routes.tsx` before editing so the Figma artifact stays aligned with the authored contract.
- Do not introduce a second visual language:
  - Geist Mono only
  - orange + ink as the brand language
  - blue reserved for informational semantics
  - zero radius everywhere

## Token Sync Checklist

- Primitive tokens:
  - add only raw values
  - do not encode semantic meaning in primitive names
- Semantic tokens:
  - map intent, not raw color convenience
  - do not bind components directly to primitive color values if a semantic token should exist
- Confirm the chain is explicit:
  - primitive -> semantic -> component usage
- If a token is added in Figma, add the corresponding code-side token in:
  - `src/tokens/primitives.json`
  - `src/tokens/semantic.json`
- If a token is renamed, update both Figma and code-side references in the same change.

## Foundation Checklist

### Colors

- Orange is the only brand accent.
- Ink stays the neutral page and text system.
- Blue is informational only.
- Neutral, informational, success, attention, and error feedback tokens must remain distinct.
- Do not use action tokens as a shortcut for neutral or informational fills.

### Typography

- Geist Mono is the only display and interface typeface.
- Keep the semantic roles explicit:
  - display
  - heading
  - body
  - label
  - caption
  - code
- Do not create parallel type roles inside component pages or Figma local styles.

### Spacing & Structure

- Use the documented spacing scale only.
- Radius stays `0px` everywhere.
- Border width and elevation stay on the existing token ladder.
- Icon sizing must map to semantic slots:
  - control
  - body
  - emphasis

### Icons

- Use only the approved subset unless the icon policy is updated in `docs/icon-guidelines.md`.
- New icons require:
  - category
  - product use case
  - semantic role
  - size slot

## Component Checklist

Apply this to every component family you touch:

- Anatomy is labeled.
- Variants are explicit.
- Sizes are explicit or marked `Not applicable`.
- State matrix is complete.
- Behavior notes are explicit.
- Content rules are explicit.
- Placement rules are explicit.
- Semantic intent is explicit.
- Responsive failure modes are explicit.
- Accessibility notes are explicit.

If any of those are missing from the Figma page, update the page annotations before considering the edit complete.

## Component-Specific Checks

### Buttons

- Primary and secondary stay in the same semantic family.
- Loading remains inline and preserves the label.
- Disabled keeps the square shell and does not fade into invisibility.
- Long labels and narrow-screen stacking are documented.

### Forms

- Visible labels remain present.
- Helper text and error text stay in one shared field shell pattern.
- Input, select, textarea, checkbox, radio, and toggle stay square.
- Read-only and disabled are differentiated.
- Date-field behavior is documented even if the runtime component does not exist yet.
- Long helper/error text and narrow-screen stacking are documented.

### Links

- Underline remains visible before hover.
- Focus, visited, disabled, and inverse are documented.
- Long link wrapping is documented.

### Tabs

- Use the canonical orange/ink treatment, not a legacy blue tab system.
- Tab, tablist, and tabpanel relationships are annotated.
- Arrow keys and Home/End behavior are documented.
- Icon, count, disabled, and overflow/mobile behavior are documented.

### Badges

- Brand is the only action-toned badge.
- Neutral and info stay semantic, not action-colored.
- `max` overflow behavior is documented.
- Placement relative to parent controls or labels is explicit.

### Alerts

- Neutral and info remain distinct.
- `status` versus `alert` intent is explicit.
- Dismissible and non-dismissible behavior is explicit.
- Stacked behavior is shown.

### Cards

- Static versus clickable is explicit.
- Hover/focus treatment is explicit.
- CTA hierarchy is explicit.
- Media ratio behavior is explicit.
- Narrow-screen stacking is explicit.

## Page Annotation Checklist

For any system page or screen template shown in Figma:

- One page-level heading is identified.
- Section headings descend in order.
- Landmarks are identified where relevant:
  - header
  - navigation
  - main
  - complementary
  - footer
- Reading order is explicit when layout could imply a different source order.
- Focus order is explicit when interaction changes context.
- Status/live-message placement is explicit when alerts or system feedback exist.

## Responsive Stress Checklist

For every edited component or pattern, check:

- long labels
- long helper/error text
- dense content
- narrow screen width
- horizontal overflow
- stacking behavior
- preservation of 44px touch targets
- avoidance of unnecessary two-dimensional scrolling

If the Figma page only shows the ideal state, the spec is incomplete.

## Handoff Checklist

- The Figma page matches the relevant route in `src/docs/routes.tsx`.
- The route still matches `docs/component-specs.md`.
- Any token changes are reflected in the JSON token files.
- Any icon additions are reflected in `docs/icon-guidelines.md`.
- The page-level annotations are present when the component or pattern changes screen structure.
- The edit can be implemented without inventing hidden behavior.

## Done Criteria

The Figma edit is complete only when:

- the visual change is present
- the token mapping is explicit
- the component contract is explicit
- the responsive failure mode is explicit
- the accessibility intent is explicit
