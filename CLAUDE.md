# CLAUDE.md — Punk School YPSA

Rebel base interactive scene built with React + Vite, deployed to GitHub Pages.

---

## Project Structure

```
src/
  constants/
    colors.js          # PC palette — single source of truth for all colours
  styles/
    animations.css     # All CSS keyframe animations + scroll-container class
  components/
    primitives.jsx     # SmokeParticle, Graffiti, NeonSign, WindowPane,
                       # Antenna, WeedTuft, Boombox, WoodenCrate
    characters.jsx     # PunkStudent, PunkGirl, LapCouple, GraffitiPainter
    environment.jsx    # FireBarrel, Campfire, NightSky, GroundLayer, Rat, Bird
    scenes.jsx         # CampfireScene, BasketballCourt, Armory, MainBuilding,
                       # Workshop, Watchtower, Cafeteria, SkateRamp, SchoolBus
  PunkSchoolBase.jsx   # Root composition — places all scenes on the 1060×660 canvas
  main.jsx             # React entry point
tests/
  visual.spec.js       # Playwright tests
index.html
vite.config.js
playwright.config.js
```

---

## Scene Canvas

- **Size**: 1060 × 660 px (scrollable, drag-to-pan)
- **Origin**: top-left corner of the scene canvas
- **Coordinate system**: CSS `position: absolute`, `left`/`top` in pixels
- **Overflow**: `overflow: visible` on all scene sub-containers — do **not** add
  `overflow: hidden` inside the scene or characters will be clipped

---

## Colour Palette (`PC`)

| Key    | Value     | Use |
|--------|-----------|-----|
| `g1`   | `#ff2a6d` | neon pink / magenta |
| `g2`   | `#05d9e8` | neon cyan |
| `g3`   | `#d1f7ff` | ice blue |
| `g4`   | `#ff6b35` | neon orange |
| `g5`   | `#7b2ff7` | neon purple |
| `neon` / `neon2` | aliases for g1 / g2 |
| `skin` | `#ddb892` | male skin |
| `skinF`| `#e8c8a0` | female skin |

Always import from `src/constants/colors.js`.

---

## Character Sizing Reference (pixels)

### PunkStudent (sitting)
| Part     | top | height |
|----------|-----|--------|
| Mohawk   | -8  | 8      |
| Head     | -2  | 10     |
| Body     | 8   | 12     |
| Thighs   | 18  | 3      |
| Lower legs | 21 | 5    |
| Shadow   | 22  | 6      |

### PunkGirl (onLap)
| Part     | top | height |
|----------|-----|--------|
| Hair     | -5  | ~18    |
| Head     | -2  | 10     |
| Top      | 8   | 6      |
| Midriff  | 14  | 4      |
| Skirt    | 16  | 5      |
| Dangling legs | 18 | 13 |

### LapCouple positioning formula
```
Guy at (0, 0)
Girl at (0, -3)   ← her skirt bottom (–3+21=18) aligns with guy's thighs (0+18)
Girl z-index: 3   ← rendered in front of guy (z:1) and arm (z:4)
Guy's arm overlay: z:4
```

---

## Adding New Characters / Props

1. **New primitive shape** → add to `components/primitives.jsx`
2. **New character variant** → add props to `PunkStudent` or `PunkGirl`;
   for complex multi-character compositions create a new compound component
3. **New building/zone** → add to `components/scenes.jsx`; position it in
   `PunkSchoolBase.jsx`

### Rules for scene placement
- Graffiti goes **on building walls** or explicitly on dark path surfaces.
  Never float text in open grass/sky.
- All scene elements must be **fully within the 1060 × 660 canvas** (check top/left +
  rendered height/width).
- The Watchtower top is at absolute y ≈ 130 − 97 = 33 px — keep scene top padding ≥ 30 px.
- Use `data-testid` on every distinct interactive / compositional element so
  Playwright tests can target them reliably.

---

## Animation Conventions

- All `@keyframes` live in `src/styles/animations.css` — never use inline `<style>` tags.
- Frame-based animations use the `tick` state (increments every 100 ms) passed down as
  a prop. Do not create additional `setInterval` calls inside child components.
- Keep animation durations reasonable: micro-animations ≤ 1 s, ambient loops 2–8 s.

---

## Testing

```bash
npm run dev        # dev server at http://localhost:5173/PunkSchoolYPSA/
npm run build      # production build → dist/
npm test           # Playwright headless tests
npm run test:ui    # Playwright UI mode
npm run test:report
```

### Playwright test philosophy
Tests are **composition checks**, not pixel-perfect snapshots:
1. Element exists & is visible (bounding box > 0)
2. Element is within expected scene area
3. Key compositions (e.g. girl on guy's lap) are verified by relative positions
4. Visual snapshots taken for the campfire scene and basketball court as
   regression guards (stored in `tests/snapshots/`)

When you add a new feature that changes the visual output of a tested area,
**update the snapshots** with:
```bash
npx playwright test --update-snapshots
```

---

## GitHub Pages Deployment

Automated via `.github/workflows/deploy.yml`:
- Trigger: push to `main` branch
- Build: `npm ci && npm run build`
- Deploy: `dist/` → `gh-pages` branch via `actions/deploy-pages`
- Live URL: `https://<org>.github.io/PunkSchoolYPSA/`

`vite.config.js` sets `base: "/PunkSchoolYPSA/"` so all asset paths are correct.

---

## Common Pitfalls

| Symptom | Cause | Fix |
|---------|-------|-----|
| Characters clipped at scene edge | Parent has `overflow: hidden` | Add `overflow: visible` |
| Girl doesn't look on lap | Wrong y-offset | Use `LapCouple` component |
| Graffiti floats on grass | Placed outside building div | Wrap in building `div` or path slab |
| Basketball ball disappears | Court div clips ball path | Court uses `overflow: visible` |
| Watchtower off-screen top | `top` too small | Keep watchtower `top ≥ 130` |
| GH Pages 404 on refresh | Missing `base` in vite config | Already set to `/PunkSchoolYPSA/` |
| Fonts not loading in build | Google Fonts in `<link>` only | Already in `index.html` `<head>` |
