# Factory Design System

> A token-driven brand architecture that extracts design tokens from Figma, generates structured token files (JSON + CSS custom properties), and builds React components consuming only tokens — zero hardcoded values.

## Credits & Inspiration

- **Kyle Anthony Miller** ([brasshands.com](https://brasshands.com)) — Brand and design direction inspiration. His work on Factory's visual identity shaped this system's warm industrial aesthetic and orange-forward palette.

## Visual Theme & Atmosphere

Factory is warm, industrial, and modern. Bold orange as the primary color, warm neutrals, and clean typography. The system feels confident and grounded, never cold or clinical.

- **Mood**: Warm industrial, approachable yet professional
- **Primary brand color**: Orange (#E8520A) — energetic, bold, distinctive
- **Neutral palette**: Warm-tinted grays (not blue-cool)
- **Typography**: Founders Grotesk — humanist grotesque, 5 weights
- **Surfaces**: Light, layered, with subtle shadow depth
- **Corners**: Pill-shaped buttons, soft-rounded cards

---

## Architecture

Three-layer token system: **Primitives → Semantics → Components**

| Layer | Role | Scoping |
|---|---|---|
| Primitives | Raw values (hex, px, weights) | `:root` — global |
| Semantics | Meaningful aliases (action-primary, text-link) | `[data-brand="default"]` — themeable |
| Components | Consumed tokens only, zero hardcoded values | BEM class names |

**Design system structure**: Foundations / Components / Patterns (replaces Atomic Design).

---

## Color Palette

### Primitives — 72 colors, 6 hues, 12 Radix-style steps each

Role-based steps: 1–2 backgrounds, 3–5 component fills, 6–8 borders, 9–10 solid fills, 11–12 text.

#### Orange (Primary)
| Step | Hex | Role |
|---|---|---|
| 1 | `#FFFAF5` | Background tint |
| 2 | `#FFF0E5` | Subtle surface |
| 3 | `#FFE0C7` | Component fill light |
| 4 | `#FFCEA6` | Component fill |
| 5 | `#FFBB85` | Component fill bold |
| 6 | `#F5A163` | Border light |
| 7 | `#E88842` | Border |
| 8 | `#DA6E22` | Border bold |
| 9 | `#E8520A` | **Solid / Primary action** |
| 10 | `#CC4708` | **Solid hover** |
| 11 | `#9E3706` | Text on light |
| 12 | `#672404` | Text high contrast |

#### Neutral (Warm gray)
| Step | Hex |
|---|---|
| 1 | `#FFFFFF` |
| 2 | `#FAF9F8` |
| 3 | `#F2F0EE` |
| 4 | `#E9E7E4` |
| 5 | `#DFDDD9` |
| 6 | `#D2CFCB` |
| 7 | `#BCB8B3` |
| 8 | `#9E9A94` |
| 9 | `#7E7A74` |
| 10 | `#6B6760` |
| 11 | `#4A4740` |
| 12 | `#1A1A18` |

#### Sand
| Step | Hex |
|---|---|
| 1 | `#FDFCF9` |
| 2 | `#F8F5EE` |
| 3 | `#F0EBDF` |
| 4 | `#E8E1D1` |
| 5 | `#DFD7C4` |
| 6 | `#D5CBB5` |
| 7 | `#C4B89E` |
| 8 | `#AFA388` |
| 9 | `#9A8E72` |
| 10 | `#857A62` |
| 11 | `#5E5545` |
| 12 | `#3A3328` |

#### Red (Error / Danger)
| Step | Hex |
|---|---|
| 1 | `#FFF8F8` |
| 2 | `#FFF0F1` |
| 3 | `#FFE0E4` |
| 4 | `#FFD0D6` |
| 5 | `#FFC0C8` |
| 6 | `#F2A8B2` |
| 7 | `#E08D99` |
| 8 | `#D06F7E` |
| 9 | `#D1334A` |
| 10 | `#B82A40` |
| 11 | `#9C2236` |
| 12 | `#6E1826` |

#### Green (Success)
| Step | Hex |
|---|---|
| 1 | `#F7FDF8` |
| 2 | `#EEFBF0` |
| 3 | `#DCFADF` |
| 4 | `#C4F2CA` |
| 5 | `#ABE8B4` |
| 6 | `#8DDA98` |
| 7 | `#6CC97A` |
| 8 | `#45B85E` |
| 9 | `#008928` |
| 10 | `#007622` |
| 11 | `#005C1A` |
| 12 | `#003D11` |

#### Blue (Info)
| Step | Hex |
|---|---|
| 1 | `#F8FBFF` |
| 2 | `#F0F6FF` |
| 3 | `#E0EDFF` |
| 4 | `#CCE1FF` |
| 5 | `#B7D5FF` |
| 6 | `#9DC3F5` |
| 7 | `#7EADEA` |
| 8 | `#5592D8` |
| 9 | `#0075E1` |
| 10 | `#0066C6` |
| 11 | `#004E99` |
| 12 | `#002E5C` |

### Semantic Tokens

Scoped to `[data-brand="default"]`. All map to primitive references.

| Token | Primitive | Usage |
|---|---|---|
| `--color-action-primary` | orange-9 | Primary buttons, links, focus rings |
| `--color-action-primary-hover` | orange-10 | Primary hover state |
| `--color-action-on-primary` | neutral-1 | Text on primary buttons |
| `--color-surface-page` | neutral-1 | Page background |
| `--color-surface-muted` | neutral-3 | Muted backgrounds, disabled fills |
| `--color-surface-subtle` | neutral-2 | Subtle differentiation |
| `--color-surface-secondary` | orange-2 | Secondary button hover fill |
| `--color-surface-sand` | sand-3 | Warm accent surface |
| `--color-text-primary` | neutral-12 | Body text, headings |
| `--color-text-secondary` | neutral-10 | Helper text, captions |
| `--color-text-disabled` | neutral-8 | Disabled text, placeholders |
| `--color-text-on-action` | neutral-1 | White text on solid fills |
| `--color-text-link` | orange-9 | Inline links |
| `--color-border-default` | neutral-7 | Input borders |
| `--color-border-hover` | neutral-12 | Input hover |
| `--color-border-subtle` | neutral-6 | Dividers |
| `--color-border-focus` | orange-9 | Focus ring border |
| `--color-border-error` | red-9 | Error state border |
| `--color-feedback-success` | green-9 | Success messaging |
| `--color-feedback-attention` | orange-9 | Warning messaging |
| `--color-feedback-error` | red-9 | Error messaging |
| `--color-feedback-info` | blue-9 | Informational messaging |
| `--color-feedback-*-surface` | {hue}-2 | Light background per feedback type |

---

## Typography Rules

**Font family**: Founders Grotesk, system-ui, sans-serif

### Weights
| Name | Value | Usage |
|---|---|---|
| Light | 300 | Subtitles, large decorative text |
| Regular | 400 | Body text, button labels |
| Medium | 500 | Card titles, alert titles, badges, link labels |
| Semibold | 600 | Tags, form labels |
| Bold | 700 | Page headings, section titles |

### Size Scale (10 steps)
| Token | Size | Line height | Usage |
|---|---|---|---|
| xs | 12px | 16px | Tags, micro labels |
| sm | 14px | 20px | Helper text, small buttons |
| base | 16px | 24px | Body, regular buttons, alerts |
| lg | 18px | 28px | Card titles, badges (md) |
| xl | 20px | 28px | Subheadings |
| 2xl | 24px | 32px | Badges (lg) |
| 3xl | 30px | 36px | Section headings |
| 4xl | 36px | 40px | Page titles |
| 5xl | 48px | 56px | Hero text |
| 6xl | 60px | 60px | Display |

### Documentation font
JetBrains Mono Medium — used for component labels, color palette category names, and swatch names. Not used in components.

---

## Spacing & Layout

### 4px base grid
| Token | Value | Usage |
|---|---|---|
| space-1 | 4px | Tight inline gaps, icon-to-label |
| space-2 | 8px | Default inline gaps, card inner padding |
| space-3 | 12px | Button vertical padding (md), alert header padding |
| space-4 | 16px | Button horizontal padding (sm), content gaps |
| space-6 | 24px | Button horizontal padding (md), card body top padding |
| space-8 | 32px | Section gaps, alert description indent |
| space-12 | 48px | Section spacing |
| space-16 | 64px | Page-level padding |

### Border radius
| Token | Value | Usage |
|---|---|---|
| radius-sm (4px) | Inputs, image corners | |
| radius-md (8px) | Cards, alerts | |
| radius-lg (16px) | Reserved | |
| radius-full (9999px) | Buttons, badges, tags | |

### Border width
| Token | Value |
|---|---|
| border-default | 1px |
| border-thick | 2px |
| border-heavy | 4px |

---

## Depth & Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-elevation-1` | `0 2px 8px rgba(25,25,25,0.08)` | Cards |
| `--shadow-focus` | `0 0 0 3px orange-9` | Focus ring (outer) |
| `--shadow-focus-inset` | `0 0 0 2px neutral-1` | Focus ring (inner white gap) |

Focus pattern: 2px white inset + 3px orange outer ring. Applied on `:focus-visible`.

---

## Component Specifications

### Button
- **Variants**: primary, secondary
- **Sizes**: sm (small), md (regular/default)
- **Shape**: Pill (border-radius: full / 9999px)
- **Font weight**: Regular (400)
- **Primary**: Solid orange fill, white text. Hover darkens to orange-10.
- **Secondary**: Transparent fill, orange border, orange text. Hover fills with orange-2.
- **Min-width**: sm = 64px, md = 96px
- **Padding**: sm = 8px 16px, md = 12px 24px
- **Disabled**: 50% opacity, cursor not-allowed
- **No ghost variant**

### Card
- **3 variants**: Image + Text + Link, Image + Link, Text + Link
- **Outer padding**: 8px (creates inset frame around image)
- **Image**: 1:1 aspect ratio, 4px border-radius, object-fit cover
- **Card radius**: 8px
- **Shadow**: elevation-1
- **Title**: 18px medium
- **Description**: 16px regular
- **Link**: Orange (text-link), underlined, medium weight. No arrow icon.
- **Cards do not stretch** to fill grid rows (align-self: start)

### Badge (Notification)
- **States**: new (orange/action-primary), informational (white/page)
- **Sizes**: sm (23px), md (31px), lg (40px)
- **Digit modes**: single, multiple, overflow (dot)
- **Font weight**: Medium (500)
- **Font sizes**: sm = 14px, md = 18px, lg = 24px
- **Shape**: Pill (full radius)
- **Overflow**: Shows a 4px dot, not "99+" text

### Tag (Status label)
- **Variants**: neutral, success, warning, error, info
- **Shape**: Pill (full radius)
- **Font**: 12px semibold (xs)
- **Padding**: 4px 8px
- **Colors**: Neutral = muted bg + primary text. Others = solid feedback color + white text.

### Alert
- **Variants**: info, success, error
- **Background**: White (surface-page), rounded 8px. No colored border-left, no colored surface.
- **Header**: Icon (16px) + title in a row, dismiss X button right-aligned
- **Title**: 16px medium. Color varies: info = text-primary, success = green-9, error = red-9
- **Description**: 16px regular. Color matches variant.
- **Description indent**: padded to 32px left (aligns under title, past icon)
- **Dismiss**: 16px X icon, 12px padding, hover fills with muted surface

### InputField
- **Label**: 14px bold, above input
- **Input**: 16px regular, 4px radius, 1px border (neutral-7)
- **Padding**: 8px vertical, 16px horizontal
- **Hover**: border darkens to neutral-12
- **Focus**: orange focus ring (inset white + outer orange)
- **Error**: red border, red helper text
- **Disabled**: 50% opacity, muted background, not-allowed cursor
- **Helper text**: 14px regular, secondary color (or red for errors)

---

## Design Guardrails

### Do
- Reference tokens exclusively in component CSS — `var(--color-action-primary)`, never `#E8520A`
- Use BEM naming for CSS classes: `.block__element--modifier`
- Scope semantic tokens under `[data-brand="default"]`
- Place primitives on `:root`
- Use the 4px spacing grid for all measurements
- Keep transitions to 0.15s for micro-interactions
- Use `font-weight: regular` (400) for button labels
- Use `font-weight: medium` (500) for card titles, alert titles, link labels
- Use named exports for components: `export function Button() {}`

### Do not
- Hardcode hex colors in component CSS files
- Hardcode pixel values for spacing (use space tokens)
- Use Tailwind classes — this project uses plain CSS with custom properties
- Create a ghost button variant — only primary and secondary exist
- Use `border-left` accent on alerts — alerts are clean white cards
- Use feedback-error (red) for badge "new" state — it uses action-primary (orange)
- Add a third button size — only sm and md exist
- Use bold (700) for button labels — buttons use regular (400)

---

## Responsive Behavior

- Cards use CSS grid: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Inputs grid: `repeat(auto-fill, minmax(260px, 1fr))`
- Max content width: 960px, centered
- Page padding: 64px vertical, 24px horizontal
- Touch targets: Buttons have min-width (64px/96px) and generous padding

---

## File Structure

```
src/
  styles/
    primitives.css    — :root, raw values (72 colors, spacing, type, radius)
    semantic.css      — [data-brand="default"], meaningful aliases
    globals.css       — Import orchestration + reset
  components/
    Button/           — Button.tsx + Button.css
    Card/             — Card.tsx + Card.css
    Badge/            — Badge.tsx + Badge.css
    Tag/              — Tag.tsx + Tag.css
    Alert/            — Alert.tsx + Alert.css
    InputField/       — InputField.tsx + InputField.css
  App.tsx             — Demo page with all components
  App.css             — Demo layout styles
```

---

## Agent Quick Reference

When building new components for this system:

1. **Never hardcode** — always reference `var(--token-name)`
2. **Check semantic.css first** — use existing semantic tokens before reaching for primitives
3. **Follow BEM** — `.component`, `.component__element`, `.component--modifier`
4. **Named exports** — `export function ComponentName() {}`
5. **Co-locate** — each component gets its own folder with `.tsx` + `.css`
6. **Import CSS** in the component file — `import './Component.css'`
7. **Accessible by default** — use `aria-label`, `aria-describedby`, `role` where appropriate
8. **Founders Grotesk** is the only component font — JetBrains Mono is documentation only

### Token naming convention
- Primitives: `--primitive-{category}-{value}` (e.g., `--primitive-orange-9`)
- Semantics: `--color-{role}-{variant}` (e.g., `--color-action-primary`)
- Spacing: `--space-{context}-{size}` or `--primitive-space-{n}`
- Radius: `--radius-{component}` (e.g., `--radius-button`)

### Adding a new component
1. Create `src/components/NewComponent/NewComponent.tsx` and `.css`
2. Use only semantic tokens in CSS (fall back to primitives for spacing)
3. Match font sizes/weights to the typography scale
4. Add to `App.tsx` demo page with a section title and examples
5. Verify zero hardcoded hex values: `grep -r '#[0-9a-fA-F]' src/components/NewComponent/`
