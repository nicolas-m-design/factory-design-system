# Icon Guidelines

This document defines the approved Factory icon subset, semantic usage rules, and growth policy.

It complements:

- `DESIGN.md`
- `docs/component-specs.md`
- `src/docs/routes.tsx`
- `src/components/Icon/Icon.tsx`

## Canonical Rules

- The icon library is curated, not open-ended.
- Orange/ink remains the primary visual language.
- Blue is reserved for informational semantics.
- Icons inherit `currentColor`; they do not carry hardcoded colors.
- Icons use semantic size slots, not per-screen guesses.
- Icons reinforce meaning; they do not replace visible labels on their own.

## Runtime Shape

The runtime icon component is defined in `src/components/Icon/Icon.tsx`.

Current implementation constraints:

- Remix-icon-derived path data
- `24 × 24` viewBox
- `currentColor` fill
- explicit, named subset only

Do not treat the presence of more path data in code as permission to use every icon everywhere. This document controls the approved subset.

## Approved Subset

### Navigation

- `menu-line`
- `arrow-left-line`
- `arrow-right-line`
- `search-line`

### Actions

- `add-line`
- `download-line`
- `upload-line`
- `settings-3-line`
- `delete-bin-line`

### Feedback

- `information-fill`
- `checkbox-circle-fill`
- `error-warning-fill`
- `close-line`

### Content

- `file-text-line`
- `folder-line`
- `clipboard-line`
- `image-line`

### People & Media

- `user-line`
- `group-line`
- `play-circle-line`
- `chat-3-line`

## Semantic Size Slots

Use semantic size tokens instead of arbitrary pixel values:

- `--icon-size-control`
  - buttons
  - tabs
  - compact controls
- `--icon-size-body`
  - alerts
  - inline support content
  - text-adjacent semantic icons
- `--icon-size-emphasis`
  - highlighted motifs
  - stronger visual accents that still belong to the approved subset

If a use case does not fit one of these slots, add or revise the token before introducing one-off sizes.

## Semantic Color Rules

- Action and navigation icons:
  - inherit action or text tokens from the parent component
- Informational icons:
  - use semantic info tokens only
- Success, attention, and error icons:
  - use the corresponding feedback family
- Decorative or passive icons:
  - use neutral text color tokens

Do not:

- hardcode icon colors in component CSS
- recolor icons with primitive tokens when semantic tokens exist
- use informational blue as a general accent

## Style Rules

- Prefer line icons for navigation, actions, and general interface structure.
- Prefer filled icons for feedback and status contexts.
- Keep icons visually secondary to text labels unless the icon itself is the semantic signal.
- Maintain the existing square, hard-edge system language around icons. Do not add circular icon containers or soft decorative treatments unless the system contract is updated.

## Placement Rules

- Buttons:
  - icons are supporting adornments, not replacements for labels
- Tabs:
  - icons are optional metadata next to a visible label
- Alerts:
  - icons reinforce tone and may be omitted if copy still communicates the status
- Forms:
  - icons should not replace visible labels or error messaging
- Cards:
  - icons may support CTA or metadata patterns, but should not become the primary card content without an explicit contract

## Accessibility Rules

- If an icon communicates meaning, pair it with visible text or accessible labeling.
- If an icon is decorative, mark it decorative in implementation.
- Do not rely on icon shape alone to signal success, warning, or error.
- Keep icon contrast aligned to the surrounding semantic text or state.

## Growth Policy

Add a new icon only when all of the following are true:

- the existing approved subset cannot express the use case clearly
- the icon belongs to a stable category, not a one-off screen request
- the target component contract identifies where it will appear
- the semantic size slot is clear
- the accessibility intent is clear

For every addition, record:

- icon name
- category
- intended component or pattern
- semantic role
- default size slot
- whether it is line or filled

## Review Checklist For New Icons

- Is there already an approved icon that solves the same use case?
- Is the icon role navigational, actionable, informational, or decorative?
- Does it belong to one of the approved categories?
- Is the size slot explicit?
- Is the color role semantic?
- Is the icon paired with text where meaning depends on it?

If any answer is unclear, do not add the icon yet.
