# react-factories

Reusable shadcn component registry for generating showcase websites (Next.js today, TanStack Start next). 45 props-driven, multilingual (fr/en/de/it) components, **framework-agnostic** (no `next/*` imports, no Radix — Base UI primitives).

## What is included

- Next.js 16 (App Router) + React 19 project shell (showroom app only — components are framework-agnostic)
- TypeScript strict with path aliases (`#/*` for registry files, `@/*` for the showroom)
- Tailwind CSS v4 global styles (`@theme inline`, `@utility`)
- shadcn/ui initialization config (`/components.json`)
- motion (animations)
- Registry manifests (`/registry/registry.json` → `/public/registry/registry.json`)

## Installing from the registry

The factory template includes a pull script that fetches all components from the published registry:

```bash
# From the factory-template project
pnpm registry:pull
```

The published `public/registry/registry.json` embeds all source file contents, so consumers can pull components without cloning this repo.

## Components (46)

### Libs (9)

| Name | Description |
|------|-------------|
| `cn` | Class-name utility (re-exports `cnfast`) |
| `section-variants` | Shared SectionVariant type and color map for themeable sections |
| `i18n-engine` | getDictionary, t(), locale middleware (fr/en/de/it) |
| `build-metadata` | Canonical, hreflang, Open Graph, Twitter cards |
| `json-ld` | Organization, Breadcrumb, FAQ, Service schemas |
| `theme-presets` | Industry + mood based theme preset system with 5 starter presets |
| `font-presets` | Category/family based font preset system with 7 shipped presets (13 in source) |

### UI Primitives (20)

| Name | Description |
|------|-------------|
| `social-icons` | Inline SVG icons: Instagram, Facebook, LinkedIn, YouTube |
| `animations` | FadeUp, FadeIn, ScaleIn, StaggerContainer, HeroAnimation, ImageReveal |
| `reveal` | Scroll-triggered fade-up (useInView + post-hydration animate - actually plays) |
| `share-button` | Web Share API + clipboard fallback |
| `back-to-top` | Floating scroll-to-top button |
| `section-heading` | Eyebrow + title + subtitle, alignment and inverted variants |
| `image-with-fallback` | Image (shim) with error placeholder |
| `lightbox` | Click-to-enlarge image with overlay |
| `cta-button` | CtaLink + CtaExternal, 4 variants, 2 sizes |
| `breadcrumb` | Semantic breadcrumb navigation |
| `dropdown-menu` | Base UI dropdown menu |
| `sheet` | Base UI slide-out panel (drawer) |
| `ui-shims` | Framework shims: link/image/script/use-location (every site must install this item) |
| `newsletter` | Email signup form |
| `language-switcher` | Language selector dropdown |
| `manage-cookies-button` | Client-side button to reopen cookie banner |
| `theme-provider` | React context provider that applies a theme preset by injecting CSS custom properties |
| `theme-switcher` | Dropdown menu switcher for theme presets with color swatches |
| `font-provider` | React context provider that applies a font preset by injecting --font-sans and --font-heading CSS custom properties |
| `font-switcher` | Dropdown menu switcher for font presets, grouped by mood |

### Blocks (16)

| Name | Description |
|------|-------------|
| `cookie-banner` | GA4 Consent Mode v2 with localStorage |
| `navbar` | Responsive, dropdowns, mobile Sheet menu, language switcher, CTA |
| `footer` | Multi-column with brand, contact, socials, legal links |
| `home-hero` | Full-viewport hero with image, gradient, CTA |
| `page-hero` | Inner page hero with breadcrumb |
| `cta-band` | Full-width CTA banner |
| `trust-section` | Trust/expertise icon grid |
| `service-card` | Service card with image, icon, hover effect |
| `services-grid` | Responsive grid of service cards |
| `faq-list` | Accordion FAQ with category filters |
| `testimonials` | Client testimonials |
| `method-steps` | Numbered steps with connecting line |
| `pricing-table` | Dynamic pricing table |
| `contact-info` | Contact details + hours + Google Maps embed |
| `legal-page` | Prose layout for legal pages |
| `not-found-page` | Themed 404: optional logo, icon pastille, badge, dual CTAs, foot line, `ctaClassName` |

## Design system

The file `src/styles/globals.css` defines:

- **CSS variables**: `--primary`, `--secondary`, `--accent`, `--muted`, `--border`, `--ring`, `--dark-foreground`
- **Dark mode**: via `prefers-color-scheme`
- **Custom utilities**: `container-premium` (responsive padding), `section-padding` (responsive vertical)
- **Fonts**: `font-sans` and `font-heading` (Montserrat by default)
- **Animation keyframes**: enter/exit with fade, zoom, and slide utilities

Components using `inverted` (e.g. `section-heading`) rely on `text-dark-foreground` and `font-heading`.

## Principles

1. **Props-driven**: no component imports its own data — everything comes via props
2. **Framework-agnostic**: NO `next/*` imports (link/image/script/pathname go through the `ui-shims` item — each site provides the implementation for its framework); NO Radix — Base UI primitives only
3. **Server Components by default**: `"use client"` only when necessary
4. **No non-overridable hardcoded text**: all labels are props with English defaults
5. **a11y**: semantic HTML, aria-labels, keyboard nav, focus states

### Framework shims (ui-shims item)

The registry never imports `next/link`, `next/image`, `next/script` or `next/navigation`.
It imports `#/components/ui/{link,image,script,use-location}` instead — those files are
shipped by the `ui-shims` registry item, and **each site provides its own implementation**:

| Shim | Next.js site | TanStack site |
|---|---|---|
| `link.tsx` | re-export `next/link` | re-export `@tanstack/react-router` Link |
| `image.tsx` | re-export `next/image` | plain `<img>` |
| `script.tsx` | re-export `next/script` (strategies) | plain `<script>` in route head |
| `use-location.ts` | re-export `next/navigation` usePathname | router `useLocation().pathname` |

> After pulling components, a site MUST provide the 4 shim implementations before `pnpm build`.
> The shipped defaults are minimal (plain `<a>`, `<img>`, `<script>`, `window.location`).

## Registry workflow

1. Create reusable source files under `/registry/components/*`.
2. Add corresponding registry items to `/registry/registry.json`.
3. Ensure each registry entry includes a unique `name`, a valid `type` (`registry:ui`, `registry:block`, etc.), and file references.
4. Run `pnpm registry:sync` to build the publishable manifest (with embedded file content) to `/public/registry/`.
5. Validate JSON with `pnpm registry:check`.
6. Push to `main` — the GitHub Actions `sync` workflow auto-rebuilds the manifest and commits it back. Requirements: repo workflow permissions = **Read and write**, and `packageManager: pnpm@11.20.0` in `package.json` (required by `pnpm/action-setup@v4`).

## Scripts

```bash
pnpm dev              # Dev server
pnpm build            # Production build
pnpm typecheck        # TypeScript verification
pnpm registry:check   # Validate registry.json
pnpm registry:sync    # Build publishable registry with embedded content
```

## Project structure

```
registry/              ← Distributed component library (stack-agnostic)
  components/
    ui/             # Primitives (cta-button, section-heading, animations...)
    navigation/     # navbar, footer, language-switcher, manage-cookies-button, theme-switcher, font-switcher
    sections/       # home-hero, services-grid, faq-list, testimonials...
    layouts/        # cookie-banner, not-found-page
    forms/          # newsletter, newsletter-example
  lib/
    utils.ts        # cn()
    section-variants.ts  # Shared SectionVariant type
    themes/         # Theme preset data (index.ts + presets/*.json)
    fonts/          # Font preset data (index.ts + presets/*.json)
    seo/            # build-metadata, json-ld
  registry.json     # Source manifest (45 items)
src/                  ← Next.js showroom app (not distributed)
  app/              # Demo pages (home, newsletter...)
  lib/i18n/         # Dictionaries (shipped via the `i18n-engine` item, project-specific)
  styles/globals.css     # Design system
  middleware.ts     # Locale detection + redirect
scripts/
  build-registry.mjs  # Reads source files, builds publishable manifest
public/
  registry/
    registry.json   # Published copy with embedded content, target=src/ for consumers
```

## Adding a new component

See [CONTRIBUTING.md](./CONTRIBUTING.md) for conventions and component checklist.
