# Skylimits — Full E-Commerce Homepage Redesign

## Background

The existing Next.js 16 / Tailwind CSS v4 site already has:
- `MegaMenu.jsx` — sticky nav with search, auth, cart, mega-dropdown
- `VideoBanner.jsx` — autoplay hero video with mute toggle
- `furnitureData.js` — 140+ products across 4 categories (Living Room, Bedroom, Dining, Office)
- `ProductCard.jsx`, `ProductGrid.jsx` — reusable product display
- `page.js` — minimal homepage (hero + trust strip + 3 featured + brand story)

The goal is to **rebuild `app/page.js`** and introduce **new components** that satisfy every section in the brief — without touching the existing nav/footer that already work.

---

## Proposed Changes

### Core Page — `app/page.js`
Replace with a fully orchestrated homepage that imports all new sections.

---

### 1. Hero / Category Grid Section — `components/CategoryGrid.jsx` [NEW]

- **Tabs**: Living Room | Bedroom | Dining | Office (client component)
- **Grid**: 5 columns desktop → 3 tablet → 2 mobile using CSS grid
- **25 products per category** pulled from `furnitureData` by `category` field
- Each card: image (Unsplash URLs already in data), name, price, **Add to Cart** + **Quick View** buttons on hover
- Micro-animation: card lifts on hover, overlay buttons slide up
- Active tab underline transition

---

### 2. Full-Width Video Showcase — `components/VideoShowcase.jsx` [NEW]

- **Full-width** cinematic section (not dual-column like the current hero)
- Reuses the `NEXT_PUBLIC_GANESH_VIDEO_URL` env var (same as current VideoBanner) as the primary video
- Custom play/pause button, mute/unmute, timeline scrubber
- Gradient overlay with overlay text: "Our Story in Motion" + CTA button
- Subtle parallax scroll effect on the text layer

---

### 3. Offers & Highlights Carousel — `components/OffersCarousel.jsx` [NEW]

- 5 slides minimum, touch-swipe + left/right arrows + dot indicators
- Slides:
  1. **Franchise Opportunities** — Join the SKY network
  2. **New Collections** — Hollow Collection landing
  3. **1K Club / Membership Rewards** — VIP Pro upgrade
  4. **Workshop Updates & Events** — Craftsmanship workshops
  5. **Special Seasonal Discounts** — Festive sale
- Auto-play with pause-on-hover
- Each card: gradient background, large heading, description, CTA button

---

### 4. Partners & Collaborators — `components/PartnersMarquee.jsx` [NEW]

- Auto-scrolling logo ticker (two rows, opposite directions for visual richness)
- Partner logos rendered as styled text-badges (since we don't have real logos) + colored accents
- CSS `@keyframes` infinite scroll — no JS needed for the animation
- Pause on hover

---

### 5. Enhanced Footer — Update `app/layout.js` Footer function

- Current footer is decent but needs: newsletter form, social icons, more nav columns
- Add: Dining, Office links; social icons (Instagram, Pinterest, YouTube, X); newsletter email input
- Tighten padding to reduce vertical footprint

---

### 6. Global CSS additions — `app/globals.css`

- `@keyframes marquee` for partner ticker
- `@keyframes fadeSlideUp` for carousel transitions
- `max-w-content` utility already defined via Tailwind theme

---

## Design Tokens (Existing — preserved)

| Token | Value |
|-------|-------|
| `--color-ink` | `#1E2A32` |
| `--color-paper` | `#FBFAF7` |
| `--color-cloud` | `#EDE8DE` |
| `--color-timber` | `#8B5E3C` |
| `--color-brass` | `#B08D57` |
| `--color-flame` | `#E8583A` |
| `--color-sage` | `#7C8C7A` |
| `--color-plum` | `#7A2E58` |

New accent for carousel slides: per-slide gradient combos using existing tokens.

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `app/page.js` | **MODIFY** — replace body with new section imports |
| `components/CategoryGrid.jsx` | **NEW** — tabbed 5×5 product grid |
| `components/VideoShowcase.jsx` | **NEW** — full-width cinematic video |
| `components/OffersCarousel.jsx` | **NEW** — 5-slide offers carousel |
| `components/PartnersMarquee.jsx` | **NEW** — scrolling partner logos |
| `app/layout.js` | **MODIFY** — enhanced footer |
| `app/globals.css` | **MODIFY** — add keyframe animations |

---

## Open Questions

> [!IMPORTANT]
> **Hamburger mobile menu**: The existing `MegaMenu.jsx` appears to be desktop-only (no hamburger). Should I add a mobile hamburger to the existing `MegaMenu.jsx`, or leave it as-is and focus on the new sections below the nav?

> [!NOTE]
> **Video URL**: The video showcase will use `process.env.NEXT_PUBLIC_GANESH_VIDEO_URL`. If that env var isn't set, a branded fallback placeholder will be shown. Is that acceptable?

> [!NOTE]
> **Cart functionality**: "Add to Cart" buttons will be wired to the existing `RightSidebar` cart pattern if you'd like, or can be simple visual buttons. Let me know which you prefer.

---

## Verification Plan

### Automated
- `npm run build` — ensure zero TypeScript/compilation errors

### Manual
- Visual check at 1440px, 1024px, 768px, 375px viewport widths
- Carousel swipe on touch device/DevTools touch simulation
- Video play/pause/mute controls
- Category tab switching (all 4 tabs, 25 items each)
