# Lumina Shop — Award-Winning Storefront Design Spec

**Date:** 2026-04-13
**Status:** Approved
**Approach:** Incremental Overlay — replace presentation layer, preserve existing API/store infrastructure

---

## 1. Concept & Vision

Lumina Shop is an enterprise-grade, responsive e-commerce storefront for artisanal and handcrafted goods. The experience communicates that every object is made with intention — by hand, in small batches, built to last. The visual language is Minimal Luxury: restrained, warm, and deeply considered. Every pixel, transition, and interaction should feel like it was placed by a designer who cares about craft.

**Award targets:** Awwwards, CSS Design Awards, Red Dot (Digital Design)

---

## 2. Design Language

### Aesthetic Direction
**Minimal Luxury** — warm restraint. Think Aesop meets Kinfolk magazine. Nothing superfluous. Every element is there because it earns its place.

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Background | `#faf9f7` | Primary canvas — warm off-white |
| Surface | `#f0ebe3` | Secondary surfaces, image panels |
| Border/Divider | `#e8ddd4` | Lines, dividers, subtle separators |
| Muted | `#d4c8ba` | Placeholder images, disabled states |
| Accent Warm | `#c9b99a` | Gold/warm accents, selected states |
| Text Secondary | `#8a7a64` | Secondary text, labels, metadata |
| Text Primary | `#6b5e4a` | Body text, descriptions |
| Text Dark | `#4a3f32` | Subheadings, item names |
| Brand/CTA | `#2c2417` | Headings, primary buttons, logo |

### Typography
- **Display/Headings:** `Playfair Display` (Google Fonts) — serif, editorial, expressive. Used for page titles, product names, hero text. Weights: 400, 700. Italic variant for emphasis.
- **Body/UI:** `DM Sans` (Google Fonts) — geometric humanist sans. Clean, warm, readable. Used for navigation, labels, buttons, body copy, form inputs. Weights: 400, 500.
- **Price/Narrative accent:** `Georgia, serif` — fallback serif for prices and italic emphasis in product descriptions.

**Type Scale:**
- Hero title: 72px / 80px line-height (desktop), 48px (mobile)
- Page title: 40px / 48px
- Product title: 34px / 40px
- Section heading: 24px / 32px
- Subheading/label: 11px uppercase, 0.2em letter-spacing
- Body: 15px / 1.75 line-height
- Caption/meta: 13px / 1.5

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Container max-width: 1200px
- Component gaps: 16px, 24px, 32px, 48px
- Form field height: 52px

### Motion Philosophy
**Fluid Choreography** — orchestrated, purposeful, never decorative.
- Every animation has a reason: to reveal hierarchy, confirm an action, or guide attention.
- Timing: 200–400ms for most transitions. Entrances use ease-out; hovers use ease-in-out.
- Stagger: 80–100ms between sequential items.

**Core animation tokens:**
| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Hovers, toggles |
| `--duration-fast` | 200ms | Micro-interactions |
| `--duration-base` | 350ms | Panel transitions |
| `--duration-slow` | 500ms | Page-level reveals |

---

## 3. Layout & Structure

### Global Elements

**Navigation (Header)**
- Fixed top, full-width, `background: #faf9f7` with subtle backdrop blur
- Logo (wordmark "LUMINA" in Playfair Display) centered or left-aligned
- Nav links: Shop · Collections · About · Journal — DM Sans 12px uppercase 0.12em letter-spacing
- Right: Cart icon with item count badge
- Mobile: Hamburger → full-screen overlay drawer

**Footer**
- Minimal: Logo, copyright, nav links, social icons
- Warm grey background `#f0ebe3`

### Page: Homepage — Full-Bleed Editorial

**Hero Section** (100vh)
- Full-bleed warm gradient: `#e8ddd4` → `#d4c4b0` → `#c9b99a`
- No navigation images — abstract atmospheric gradient
- Content centered: small tag "Handcrafted Objects · Spring Collection" → H1 "Crafted with *Intention*" in Playfair Display 72px → subheadline in Georgia italic → CTA button
- Subtle scroll indicator (1px vertical line, animated draw-down)
- **Animation:** Logo fade → nav stagger → hero content fade-up (400ms, 300ms delay) → scroll indicator draw

**Below the Fold: Product Strip**
- 3-column grid of featured products
- Each card: product image (aspect-ratio 1:1), product name (Playfair italic), price (Georgia italic)
- Scroll-entry animation: cards stagger in with 100ms delay between them
- "View All" link below

### Page: Product Detail Page — Split View

**Layout:** Two-column sticky split
- **Left (sticky, 50%):** Product image gallery
  - Main image: 75% width, aspect-ratio 1:1, subtle warm shadow
  - Thumbnail strip: vertical, left edge of panel, 60×60px thumbnails
  - Image transitions: crossfade 250ms on thumbnail click
  - Gallery sticks to top of viewport on scroll

- **Right (scrollable, 50%):** Product narrative
  - Category tag: "Ceramics · One of 12" — uppercase 10px
  - Title: Playfair Display 34px, stacked two lines
  - Price: Georgia italic 20px, muted warm tone
  - Description: Georgia 15px, 1.75 line-height
  - Visual divider: 40px wide warm line
  - Option selectors (color/size): minimal circle buttons with border
  - Add to Cart: full-width dark button, fills from left on hover
  - Maker credit: subtle, uppercase label + Georgia italic name + location
  - Tab strip: Details / Materials / Care / Shipping — underline on active

- **Animation sequence:**
  1. Left panel scales in from 0.97 → 1.0 (400ms)
  2. Right content staggers: title → price → description → options → button (100ms apart)

### Page: Cart Drawer + Checkout — All-in-One

**Layout:** Side drawer, 420px wide, full viewport height

**Drawer structure:**
- Left panel (55%): Cart items
  - Header: "Your Cart" + item count
  - Each item: 60×60 thumbnail, name, variant label, quantity stepper (−/+/numeric), price, "Remove" link
  - Quantity change: number scales briefly (1.15x, 150ms)
  - Remove: item height collapses (200ms), others slide up

- Divider: 2px warm line `#e8ddd4`

- Right panel (45%): Summary + checkout
  - Subtotal, shipping (calculated), taxes (calculated) — DM Sans rows
  - Total row: bold label + Playfair Display 22px amount
  - "Proceed to Checkout" button — full width, dark, fills left on hover
  - Trust signals: "🔒 Secure checkout · SSL encrypted"
  - Three trust icons: Free Returns / Sustainably Packaged / Maker Direct

- **Drawer animation:**
  - Open: slides from right (350ms ease-out), backdrop fades in (200ms)
  - Items stagger in from right (80ms delay each)
  - Close: reverse at 1.5x speed

---

## 4. Features & Interactions

### Navigation
- Logo click → homepage
- Cart icon click → open cart drawer (does not navigate)
- Mobile menu: hamburger → full-screen overlay, links stagger in
- Active nav link: warm underline sweep animation

### Product Listing (Collections Page)
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Product card hover: image subtle scale (1.0 → 1.03, 300ms), product name color shift
- Filter/sort: minimal dropdown — no sidebar filters (clean, editorial)
- Lazy load products with staggered entrance animation

### Product Detail Page
- Gallery: click thumbnail → crossfade to new image
- Options: click circle → selected state draws border (200ms)
- Add to Cart: click → button shows brief pulse → cart count in header increments with scale animation
- Tabs: click → content crossfades (150ms), underline slides to new tab
- Scroll: left panel remains sticky, right panel scrolls beneath

### Cart Drawer
- Open: from any "Add to Cart" action or cart icon click
- Quantity: −/+ buttons, number updates with brief scale pulse
- Remove: click → item collapses smoothly
- Subtotal: updates immediately on any item change
- Checkout button: click → loading state → Stripe checkout redirect
- Close: click backdrop or ✕ button, drawer slides out

### Error & Edge States
- Out of stock: button disabled, "Notify Me" variant shown
- Empty cart: centered message "Your cart is empty" + "Continue Shopping" link
- Form validation: inline error messages in warm red (`#c44`), field border shifts to error color
- Loading states: skeleton screens matching layout, not spinners
- Image error: warm grey placeholder with subtle icon

---

## 5. Component Inventory

### Global
| Component | States | Notes |
|-----------|--------|-------|
| `Header` | Default, scrolled (subtle shadow), mobile-open | Backdrop blur on scroll |
| `Footer` | Default | Minimal, warm grey |
| `CartDrawer` | Closed, open, loading, empty | Slides from right |
| `CartItem` | Default, qty-changing, removing | Collapsible |
| `MobileMenu` | Closed, open | Full-screen overlay |

### Homepage
| Component | States | Notes |
|-----------|--------|-------|
| `HeroSection` | Loading, loaded | Full-viewport gradient |
| `ProductStrip` | Default, scroll-animated | 3-col grid |

### PDP
| Component | States | Notes |
|-----------|--------|-------|
| `ProductGallery` | Default, image-switching | Sticky left panel |
| `ProductInfo` | Default, out-of-stock | Scrollable right |
| `OptionSelector` | Default, selected, disabled | Circle buttons |
| `AddToCartButton` | Default, hover, loading, success | Fills left on hover |
| `ProductTabs` | Tab 1-4 active | Underline slides |
| `MakerCredit` | Default | Subtle presence |

### Shared
| Component | States | Notes |
|-----------|--------|-------|
| `Button` | Default, hover, active, loading, disabled | Primary/destructive/ghost variants |
| `Input` | Default, focus, error, disabled | Warm focus ring |
| `Skeleton` | Pulsing | Matches component layout |
| `Badge` | Various colors | Category, status labels |

---

## 6. Technical Approach

### Framework & Architecture
- **Next.js 16** (App Router) — existing foundation
- **Incremental overlay:** New design system components live in `src/components/design-system/` and replace existing UI components at page level
- **CSS:** CSS Modules + CSS custom properties (design tokens). No Tailwind. Consistent with existing project style.
- **Animations:** CSS transitions/animations + `framer-motion` for complex orchestration (page transitions, cart drawer)
- **Fonts:** Google Fonts via `next/font/google` — Playfair Display, DM Sans

### Design Tokens
CSS custom properties defined on `:root` in a global `tokens.css` file:

```css
:root {
  --color-bg: #faf9f7;
  --color-surface: #f0ebe3;
  --color-border: #e8ddd4;
  --color-muted: #d4c8ba;
  --color-accent: #c9b99a;
  --color-text-secondary: #8a7a64;
  --color-text-body: #6b5e4a;
  --color-text-dark: #4a3f32;
  --color-brand: #2c2417;

  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', Helvetica, sans-serif;
  --font-narrative: Georgia, serif;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 200ms;
  --duration-base: 350ms;
  --duration-slow: 500ms;
}
```

### File Structure
```
src/
  components/
    design-system/
      tokens.css                    # Design tokens (CSS variables)
      Header/
      Footer/
      CartDrawer/
      ProductCard/
      Button/
      Input/
      Skeleton/
      Badge/
    homepage/
      HeroSection.tsx
      ProductStrip.tsx
    pdp/
      ProductGallery.tsx
      ProductInfo.tsx
      OptionSelector.tsx
      AddToCartButton.tsx
      ProductTabs.tsx
      MakerCredit.tsx
  app/
    (shop)/
      products/
        page.tsx                   # Collections/listing page
        [slug]/page.tsx           # PDP — updated to split-view layout
      cart/page.tsx               # Full cart page (links from drawer)
    layout.tsx                     # Updated Header + Footer + CartDrawer
    template.tsx                   # Page transition hooks
```

### Existing Infrastructure (Preserved)
- `src/stores/cartStore.ts` — Zustand cart state
- `src/stores/uiStore.ts` — UI state (cart open/closed, mobile menu)
- `src/app/api/cart/route.ts` — Cart API
- `src/app/api/checkout/route.ts` — Stripe checkout
- `src/app/api/products/route.ts` — Products API
- `src/lib/stripe.ts` — Stripe client
- `src/lib/prisma.ts` — Prisma client
- `prisma/schema.prisma` — Database schema

### Animation Implementation
- **Framer Motion** (`framer-motion` package) for:
  - Page route transitions (template.tsx)
  - Cart drawer open/close
  - Product card stagger reveals on scroll
  - Add-to-cart button pulse
- **CSS animations** for:
  - Hover state micro-interactions (underline sweep, button fill)
  - Scroll indicator draw
  - Thumbnail border transition

### Image Strategy
- `next/image` with blur placeholder for all product photography
- Aspect ratio containers enforced (1:1 for product cards, gallery)
- Unsplash or placeholder service for artisan-style imagery during development

### Responsive Breakpoints
| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, stacked |
| Tablet | 768–1024px | 2-column grids |
| Desktop | > 1024px | Full layouts |

- PDP split view collapses to single column on mobile (image above, info below)
- Cart drawer goes full-screen on mobile

---

## 7. Implementation Phases

### Phase 1: Design System Foundation
- Install `framer-motion`
- Create `tokens.css` with all design tokens
- Update `src/app/layout.tsx` to include global CSS + fonts
- Build `Button`, `Input`, `Skeleton`, `Badge` primitives

### Phase 2: Homepage
- Build `HeroSection` with animation choreography
- Build `ProductStrip` with scroll-triggered stagger
- Integrate into homepage route

### Phase 3: PDP (Split View)
- Build `ProductGallery` with sticky behavior
- Build `ProductInfo`, `OptionSelector`, `ProductTabs`, `AddToCartButton`
- Build `MakerCredit`
- Integrate into `src/app/(shop)/products/[slug]/page.tsx`

### Phase 4: Cart Drawer + Checkout
- Build `CartDrawer` with `framer-motion`
- Build `CartItem` with qty controls and remove animation
- Integrate into `layout.tsx` as global overlay
- Connect to existing `cartStore`

### Phase 5: Polish & Integration
- Page transitions via `template.tsx`
- Mobile navigation drawer
- Empty/loading/error states
- Responsive refinement

---

*Spec self-review: all sections complete, no TBDs, architecture matches feature descriptions, scope is focused for single implementation plan.*
