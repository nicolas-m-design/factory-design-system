# Figma Variable Collections — Manual Creation Guide

## Before you start

- Open your Figma file: NOT-EF Design System
- Open the **Local variables** panel (right sidebar > Local variables, or shortcut)
- You'll create **2 collections**: Primitives, then Semantics

---

## Collection 1: Primitives

Create a new collection, name it **`Primitives`**. Rename the default mode to **`Default`**.

### Color group: `color/`

Create variables of type **Color**. Use the slash `/` in the name to create folder nesting.

#### `color/blue/`

| Variable name | Value | Scopes |
|---|---|---|
| `color/blue/50` | `#E5F3FF` | FRAME_FILL, SHAPE_FILL |
| `color/blue/500` | `#009EEB` | ALL_FILLS |
| `color/blue/600` | `#0075E1` | ALL_FILLS |
| `color/blue/accent` | `#00B5E2` | ALL_FILLS |

#### `color/neutral/`

| Variable name | Value | Scopes |
|---|---|---|
| `color/neutral/0` | `#FFFFFF` | ALL_FILLS |
| `color/neutral/50` | `#F5F5F5` | FRAME_FILL, SHAPE_FILL |
| `color/neutral/100` | `#F2F2F2` | FRAME_FILL, SHAPE_FILL |
| `color/neutral/300` | `#DADADA` | STROKE_COLOR |
| `color/neutral/400` | `#BFBFBF` | STROKE_COLOR |
| `color/neutral/500` | `#8C8C8C` | STROKE_COLOR, TEXT_FILL |
| `color/neutral/600` | `#737373` | TEXT_FILL |
| `color/neutral/900` | `#191919` | ALL_FILLS, TEXT_FILL |

#### `color/red/`

| Variable name | Value | Scopes |
|---|---|---|
| `color/red/500` | `#D1334A` | ALL_FILLS |

#### `color/green/`

| Variable name | Value | Scopes |
|---|---|---|
| `color/green/500` | `#008928` | ALL_FILLS |

#### `color/orange/`

| Variable name | Value | Scopes |
|---|---|---|
| `color/orange/500` | `#E2720C` | ALL_FILLS |

**Total: 15 color variables**

---

### Spacing group: `space/`

Create variables of type **Number**.

| Variable name | Value | Scopes |
|---|---|---|
| `space/1` | `4` | GAP |
| `space/2` | `8` | GAP |
| `space/3` | `12` | GAP |
| `space/4` | `16` | GAP |
| `space/6` | `24` | GAP |
| `space/8` | `32` | GAP |
| `space/12` | `48` | GAP |
| `space/16` | `64` | GAP |

**Total: 8 spacing variables**

---

### Border radius group: `radius/`

Create variables of type **Number**.

| Variable name | Value | Scopes |
|---|---|---|
| `radius/sm` | `4` | CORNER_RADIUS |
| `radius/md` | `8` | CORNER_RADIUS |
| `radius/lg` | `16` | CORNER_RADIUS |
| `radius/full` | `9999` | CORNER_RADIUS |

**Total: 4 radius variables**

---

### Border width group: `border/`

Create variables of type **Number**.

| Variable name | Value | Scopes |
|---|---|---|
| `border/default` | `1` | STROKE_FLOAT |
| `border/thick` | `2` | STROKE_FLOAT |
| `border/heavy` | `4` | STROKE_FLOAT |

**Total: 3 border width variables**

---

### Font size group: `font-size/`

Create variables of type **Number**.

| Variable name | Value | Scopes |
|---|---|---|
| `font-size/xs` | `12` | FONT_SIZE |
| `font-size/sm` | `14` | FONT_SIZE |
| `font-size/md` | `16` | FONT_SIZE |
| `font-size/lg` | `18` | FONT_SIZE |
| `font-size/5xl` | `56` | FONT_SIZE |

**Total: 5 font size variables**

---

### Line height group: `line-height/`

Create variables of type **Number**.

| Variable name | Value | Scopes |
|---|---|---|
| `line-height/tight` | `16` | LINE_HEIGHT |
| `line-height/normal` | `24` | LINE_HEIGHT |
| `line-height/relaxed` | `28` | LINE_HEIGHT |
| `line-height/display` | `64` | LINE_HEIGHT |

**Total: 4 line height variables**

---

### Font weight group: `font-weight/`

Create variables of type **Number**.

| Variable name | Value | Scopes |
|---|---|---|
| `font-weight/light` | `300` | FONT_WEIGHT |
| `font-weight/book` | `450` | FONT_WEIGHT |
| `font-weight/bold` | `700` | FONT_WEIGHT |

**Total: 3 font weight variables**

---

### Opacity group: `opacity/`

Create variables of type **Number**.

| Variable name | Value | Scopes |
|---|---|---|
| `opacity/disabled` | `0.5` | OPACITY |
| `opacity/divider` | `0.3` | OPACITY |

**Total: 2 opacity variables**

---

**Primitives collection total: 44 variables**

---

## Collection 2: Semantics

Create a new collection, name it **`Semantics`**. Rename the default mode to **`Default`**.

Every value in this collection is an **alias** pointing to a Primitives variable.
When entering the value, type the Primitives variable name and select it to create the alias link.

### `color/action/`

| Variable name | Alias → (Primitives) |
|---|---|
| `color/action/primary` | → `color/blue/600` |
| `color/action/primary-vivid` | → `color/blue/500` |
| `color/action/on-primary` | → `color/neutral/0` |

### `color/surface/`

| Variable name | Alias → (Primitives) |
|---|---|
| `color/surface/page` | → `color/neutral/0` |
| `color/surface/muted` | → `color/neutral/100` |
| `color/surface/subtle` | → `color/neutral/50` |
| `color/surface/secondary` | → `color/blue/50` |

### `color/text/`

| Variable name | Alias → (Primitives) |
|---|---|
| `color/text/primary` | → `color/neutral/900` |
| `color/text/secondary` | → `color/neutral/600` |
| `color/text/disabled` | → `color/neutral/500` |
| `color/text/on-dark` | → `color/neutral/0` |
| `color/text/on-action` | → `color/neutral/0` |
| `color/text/link` | → `color/blue/600` |

### `color/border/`

| Variable name | Alias → (Primitives) |
|---|---|
| `color/border/default` | → `color/neutral/500` |
| `color/border/hover` | → `color/neutral/900` |
| `color/border/subtle` | → `color/neutral/300` |
| `color/border/on-dark` | → `color/neutral/400` |
| `color/border/focus` | → `color/blue/600` |
| `color/border/error` | → `color/red/500` |

### `color/feedback/`

| Variable name | Alias → (Primitives) |
|---|---|
| `color/feedback/success` | → `color/green/500` |
| `color/feedback/attention` | → `color/orange/500` |
| `color/feedback/error` | → `color/red/500` |

### `radius/`

| Variable name | Alias → (Primitives) |
|---|---|
| `radius/button` | → `radius/sm` |
| `radius/input` | → `radius/sm` |
| `radius/card` | → `radius/md` |
| `radius/tag` | → `radius/full` |

### `space/`

| Variable name | Alias → (Primitives) |
|---|---|
| `space/inline/tight` | → `space/1` |
| `space/inline/default` | → `space/2` |
| `space/inline/loose` | → `space/4` |
| `space/stack/tight` | → `space/2` |
| `space/stack/default` | → `space/4` |
| `space/stack/loose` | → `space/6` |
| `space/inset/tight` | → `space/2` |
| `space/inset/default` | → `space/4` |
| `space/inset/loose` | → `space/6` |
| `space/section` | → `space/12` |
| `space/page` | → `space/16` |

---

**Semantics collection total: 36 variables**

---

## After creating both collections

### Fixes to apply to existing components:

1. **Attention swatch** (Colors page): Change the rectangle fill from `#FAB005` to `#E2720C`
2. **Tags page**: Replace `#EF3340` with `#D1334A` and `#509E2F` with `#008928`
3. **All 5px radii** across Buttons/Forms: Change to `4px`
4. **Sub-pixel stroke widths** (~1.05px, ~1.1px, ~1.21px): Normalize to `1px`

### Then wire components to variables:

Once both collections exist, select each component element and replace its hardcoded fill/stroke/radius/spacing with the corresponding Semantic variable from the right sidebar panel.

---

## Quick reference — Full token count

| Category | Primitives | Semantics |
|---|---|---|
| Colors | 15 | 22 |
| Spacing | 8 | 11 |
| Radii | 4 | 4 |
| Border widths | 3 | — |
| Font sizes | 5 | — |
| Line heights | 4 | — |
| Font weights | 3 | — |
| Opacity | 2 | — |
| **Total** | **44** | **37** |
