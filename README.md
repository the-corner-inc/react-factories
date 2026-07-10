# react-factories

Reusable shadcn component registry for generating Next.js showcase websites. 36 props-driven, multilingual (fr/en/de/it) components, ready to use.

## What is included

- Next.js 16 (App Router) + React 19 project shell
- TypeScript strict with path aliases (`@/*`)
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

## Components (36)

### Libs (5)

| Name | Description |
|------|-------------|
| `cn` | clsx + tailwind-merge |
| `section-variants` | Shared SectionVariant type and color map for themeable sections |
| `i18n-engine` | getDictionary, t(), locale middleware (fr/en/de/it) |
| `build-metadata` | Canonical, hreflang, Open Graph, Twitter cards |
| `json-ld` | Organization, Breadcrumb, FAQ, Service schemas |

### UI Primitives (17)

| Name | Description |
|------|-------------|
| `social-icons` | Inline SVG icons: Instagram, Facebook, LinkedIn, YouTube |
| `animations` | FadeUp, FadeIn, ScaleIn, StaggerContainer, HeroAnimation, ImageReveal |
| `reveal` | Scroll-triggered fade-up |
| `share-button` | Web Share API + clipboard fallback |
| `back-to-top` | Floating scroll-to-top button |
| `section-heading` | Eyebrow + title + subtitle, alignment and inverted variants |
| `image-with-fallback` | next/image with error placeholder |
| `lightbox` | Click-to-enlarge image with overlay |
| `cta-button` | CtaLink + CtaExternal, 4 variants, 2 sizes |
| `breadcrumb` | Semantic breadcrumb navigation |
| `dropdown-menu` | Radix dropdown menu |
| `sheet` | Radix slide-out panel (drawer) |
| `newsletter` | Email signup form |
| `cookie-banner` | GA4 Consent Mode v2 with localStorage |
| `language-switcher` | Language selector dropdown |
| `manage-cookies-button` | Client-side button to reopen cookie banner |
| `not-found-page` | Styled 404 page |

### Blocks (14)

| Name | Description |
|------|-------------|
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
2. **Server Components by default**: `"use client"` only when necessary
3. **No non-overridable hardcoded text**: all labels are props with English defaults
4. **a11y**: semantic HTML, aria-labels, keyboard nav, focus states

## Registry workflow

1. Create reusable source files under `/registry/components/*`.
2. Add corresponding registry items to `/registry/registry.json`.
3. Ensure each registry entry includes a unique `name`, a valid `type` (`registry:ui`, `registry:block`, etc.), and file references.
4. Run `pnpm registry:sync` to build the publishable manifest (with embedded file content) to `/public/registry/`.
5. Validate JSON with `pnpm registry:check`.

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
    navigation/     # navbar, footer, language-switcher, manage-cookies-button
    sections/       # home-hero, services-grid, faq-list, testimonials...
    layouts/        # cookie-banner, consent-init, not-found-page
    forms/          # newsletter
  lib/
    utils.ts        # cn()
    section-variants.ts  # Shared SectionVariant type
    seo/            # build-metadata, json-ld
  registry.json     # Source manifest (37 items)
src/                  ← Next.js showroom app (not distributed)
  app/              # Demo pages (home, newsletter...)
  lib/i18n/         # Dictionaries (skipped by pull, project-specific)
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
