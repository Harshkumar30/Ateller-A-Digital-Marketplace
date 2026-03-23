# Design System: High-End Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Atelier"**

This design system is not a template; it is a curated gallery. To achieve the "LUXE" aesthetic, we move away from standard e-commerce density and embrace the spatial luxury of a high-end fashion magazine. The experience must feel "bespoke"—driven by intentional asymmetry, vast white space (breathing room), and a rejection of traditional UI boundaries.

By breaking the rigid grid through overlapping imagery and varying typographic scales, we transform a transactional interface into a cinematic brand journey. We do not just sell products; we present a lifestyle through sophisticated tonal depth and "silent" navigation.

---

## 2. Colors & Surface Architecture
The palette is a dialogue between the stark authority of `on_background` (#1c1b1b) and the ethereal softness of `surface` (#fcf9f8), punctuated by the warmth of champagne gold (`secondary`).

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. 
Structure must be defined through:
- **Tonal Shifts:** Transitioning from `surface` to `surface_container_low`.
- **Negative Space:** Using the Spacing Scale (e.g., `24` or `20`) to create clear mental models of separation.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials. 
- **Base Layer:** `surface` (#fcf9f8) for the main viewport.
- **In-set Content:** `surface_container_low` (#f6f3f2) for product carousels.
- **Floating Accents:** `surface_container_lowest` (#ffffff) for high-focus cards.
*Result:* A subtle, organic depth that feels like layered vellum rather than a digital grid.

### The "Glass & Gradient" Rule
To elevate CTAs beyond flat "web-standard" buttons:
- Use **Glassmorphism** for floating navigation bars or quick-view overlays. Apply `surface` at 80% opacity with a `20px` backdrop-blur.
- Use **Champagne Gradients** for primary interactions, transitioning from `secondary` (#735c00) to `secondary_fixed_dim` (#e9c349) to simulate the way light hits precious metal.

---

## 3. Typography
The typographic identity relies on the tension between the classicism of `notoSerif` and the modern utility of `manrope`.

*   **Display & Headlines (`notoSerif`):** Use `display-lg` (3.5rem) with generous tracking (-0.02em) for hero moments. Headings should feel like editorial titles—occasionally center-aligned and isolated in a sea of white space.
*   **Body & Utility (`manrope`):** Use `body-md` (0.875rem) for product descriptions. The sans-serif must be "airy"; ensure line-height is at least 1.6x the font size to maintain a premium, readable feel.
*   **Labels (`manrope`):** Use `label-md` in All-Caps with +0.1em letter spacing for "NEW ARRIVALS" or "SOLD OUT" tags. This provides an authoritative, "stamped" look.

---

## 4. Elevation & Depth
In this system, elevation is a feeling, not a drop-shadow.

*   **Tonal Layering:** Depth is achieved by "stacking." A product card (`surface_container_highest`) sitting on a `surface` background creates a soft, natural lift.
*   **Ambient Shadows:** If a floating element (like a shopping bag preview) requires a shadow, use a 24px blur at 4% opacity, tinted with `on_background` (#1c1b1b). It should look like a soft shadow cast by museum lighting.
*   **The "Ghost Border" Fallback:** If a container requires definition (e.g., a search input), use `outline_variant` (#cdc6b3) at **15% opacity**. High-contrast outlines are the enemy of luxury.

---

## 5. Components

### Buttons
*   **Primary:** Solid `on_background` (#1c1b1b) with `on_primary` (#ffffff) text. Sharp corners (`0px` radius). Large padding (e.g., `spacing.5` top/bottom, `spacing.10` left/right).
*   **Secondary (Champagne):** Use the `secondary` gold token. Reserved for "Add to Cart" or high-value conversion points.
*   **Tertiary:** Text-only in `notoSerif`, underlined by a 1px line of `secondary` that expands on hover.

### Cards & Product Grids
*   **Constraint:** Forbid the use of divider lines between items. 
*   **Style:** Use `surface_container_low` as a background for product photography to separate the image from the `surface` page background.
*   **Asymmetry:** In product listings, occasionally vary the width of cards (e.g., one 2-column image followed by two 1-column images) to create a rhythmic, magazine-style layout.

### Input Fields
*   **Style:** Minimalist. No background fill. Only a bottom border using `outline_variant` at 40% opacity. 
*   **Active State:** The bottom border transforms into a 1px `on_background` line.

### Editorial Overlays (New Component)
*   A semi-transparent `surface_container_highest` panel that slides over imagery, containing `title-lg` typography and a single CTA. This allows text to sit over busy photography without losing legibility.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme white space. If you think there is enough space, add 20% more.
*   **Do** use `0px` border radius for everything. Sharp edges convey precision and architectural luxury.
*   **Do** prioritize high-fashion photography. The UI is the frame; the product is the art.
*   **Do** use subtle transitions. Fades (300ms) are preferred over "snappy" movements.

### Don't:
*   **Don't** use 100% opaque borders to separate content sections. Use background color shifts.
*   **Don't** use standard shadows or "Material Design" style floating action buttons.
*   **Don't** crowd the interface. If a screen has more than two primary competing elements, move one to a different layer or section.
*   **Don't** use bright, saturated "web-safe" colors for errors. Use the muted `error` (#ba1a1a) token sparingly.

---

## 7. Spacing Scale Reference
| Token | Value | Context |
| :--- | :--- | :--- |
| `spacing.8` | 2.75rem | Standard padding for product cards. |
| `spacing.16` | 5.5rem | Vertical gap between major editorial sections. |
| `spacing.24` | 8.5rem | Padding for Hero headers to create the "LUXE" sense of scale. |