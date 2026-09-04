# MECHANICS — forge-registry (shared registry)

> **Repo** : forge-registry (shared Base UI component registry, 52 items — NOT a website) · **Branch** : main · **Status** : shared mechanics **available** to every site via `registry:pull`.
> This file documents what the registry OFFERS to sites (may be removed later since it is not a site project).
> **Legend** : ✅ available · ⚠️ partial · ➖ not provided
> **Last update** : 04.09.2026

## 1. Changelog (registry lifetime)

- **Foundation**: 46 items, framework-agnostic (zero `next/*` imports, `ui-shims` contract), `build-registry.mjs` (embedded manifest → `public/registry/registry.json`), consumer `registry:pull` protocol with skip-list/clobber protection.
- **Components**: accordion (height keyframes on measured `--accordion-panel-height` — replaced janky grid-rows), reveal (useInView + post-hydration animate — was dead), not-found-page (themed: logo/icon/badge/dual CTAs/footnote), cookie-banner (selection always visible), navbar (`loginHref`), footer (forge attribution default), faq-list, sections (cta-band, trust, services-grid, testimonials, method-steps, pricing-table, contact-info), legal-page, theming/font presets + switchers.
- **SEO/perf items**: lazy image default, content-visibility, srcset props (home-hero/service-card), build-metadata (canonical/hreflang/OG), JSON-LD helpers.
- **CI**: GitHub Actions `sync` (auto-manifest on push), `packageManager` pin (fixes pnpm/action-setup@v4), `permissions: contents: write`.
- **Lessons**: grid-rows never paints a `0fr` start frame (hidden + preflight display:none) → height keyframes; motion ignores `initial` after mount → useInView; pull clobbers site customizations → skip-list protocol.
- **Intranet (corner)**: 6 items ported from tc-website's visual language — `corner-tokens` (deep-teal/pale-blue/warm-cream semantic tokens), `corner` (CornerFrame/CornerLabel/CornerRule), `menu-item` (sidebar menu model), `sidebar` + `sidebar-nav` (Base UI data-driven sidebar), `admin-shell` (dashboard layout). Framework-agnostic, props-driven, zero data hooks.

## 2. Registry items (52)

| Category | Item | Description | Status |
|---|---|---|---|
| Libs | `cn` | Class-name utility (cnfast re-export) | ✅ |
| Libs | `section-variants` | SectionVariant type + color map | ✅ |
| Libs | `i18n-engine` | getDictionary + t()/tNode() dot-path resolver, locale config | ✅ |
| Libs | `build-metadata` | Canonical, hreflang (+x-default), Open Graph, Twitter, robots | ✅ |
| Libs | `json-ld` | Organization/LocalBusiness, Breadcrumb, FAQ, Service schemas | ✅ |
| Libs | `theme-presets` | Industry+mood presets (10 in source, 5 shipped) | ⚠️ |
| Libs | `font-presets` | 13 presets in source, 7 shipped | ⚠️ |
| UI | `social-icons` | Inline SVG: IG, FB, LinkedIn, YouTube, X, TikTok, WhatsApp | ✅ |
| UI | `animations` | FadeUp/FadeIn/ScaleIn/Stagger/HeroAnimation/ImageReveal | ✅ |
| UI | `reveal` | Scroll-triggered fade-up (useInView + post-hydration — actually plays) | ✅ |
| UI | `share-button` | Web Share API + clipboard fallback | ✅ |
| UI | `back-to-top` | Floating scroll-to-top | ✅ |
| UI | `section-heading` | Eyebrow + title + subtitle | ✅ |
| UI | `image-with-fallback` | Image shim + error placeholder | ✅ |
| UI | `lightbox` | Click-to-enlarge + Escape/overlay dismiss | ✅ |
| UI | `cta-button` | CtaLink + CtaExternal, 4 variants, 2 sizes | ✅ |
| UI | `breadcrumb` | Semantic breadcrumb, aria-current | ✅ |
| UI | `dropdown-menu` | Base UI menu (items/groups/separators/submenus) | ✅ |
| UI | `sheet` | Base UI drawer (4 sides) | ✅ |
| UI | `ui-shims` | Framework contracts (link/image/script/use-location) — site-provided by design | ⚠️ |
| UI | `newsletter` | Email form with validation + aria-live states | ✅ |
| UI | `language-switcher` | Locale dropdown preserving path | ✅ |
| UI | `manage-cookies-button` | Reopens cookie banner | ✅ |
| UI | `theme-provider` / `theme-switcher` | Preset tokens injection + preview switcher | ✅ |
| UI | `font-provider` / `font-switcher` | Font tokens + preview switcher | ✅ |
| Sections | `navbar` | Sticky, dropdowns, mobile Sheet, switchers, CTA, loginHref | ✅ |
| Sections | `footer` | Brand + columns + contact + socials + legal + newsletter + manage-cookies | ✅ |
| Sections | `home-hero` | 90vh hero, bg image, gradients, dual CTAs, backgroundPriority/srcSet | ✅ |
| Sections | `page-hero` | Inner hero + breadcrumb | ✅ |
| Sections | `cta-band` / `trust-section` / `services-grid` / `service-card` | Composed sections, content-visibility | ✅ |
| Sections | `testimonials` / `method-steps` / `pricing-table` | Composed sections | ✅ |
| Sections | `faq-list` | Accordion FAQ with category filters | ✅ |
| Sections | `contact-info` | Contact + hours + lazy Google Maps embed | ✅ |
| Sections | `legal-page` | Legal prose layout, whitespace-pre-line | ✅ |
| Layouts | `cookie-banner` | Consent Mode v2, granular toggles, persistence, storage sync | ✅ |
| Layouts | `not-found-page` | Themed 404: logo, icon pastille, badge, dual CTAs, footnote | ✅ |
| Lib | `footer-helpers` | getFooterProps + placeholders + Corner attribution default | ✅ |
| Intranet | `corner-tokens` | Corner semantic tokens (deep-teal/pale-blue/warm-cream) + signature classes, dark mode | ✅ |
| Intranet | `corner` | CornerFrame / CornerLabel / CornerRule (clipped frame + conic glow) | ✅ |
| Intranet | `menu-item` | Sidebar menu model (link/collapsible/group/separator) + collectMenuItemPaths | ✅ |
| Intranet | `sidebar` | Base UI sidebar primitives (Provider/Trigger/Inset/Menu*/mobile Sheet/Cmd+B) | ✅ |
| Intranet | `sidebar-nav` | Data-driven sidebar nav (groups/collapsibles + user footer) | ✅ |
| Intranet | `admin-shell` | Admin shell layout (SidebarProvider + SidebarNav + SidebarInset) | ✅ |
| Tooling | registry:sync / registry:check | Manifest build + validation | ✅ |
| Tooling | CI auto-sync | GitHub Actions + packageManager + contents:write | ✅ |
| Docs | README / CONTRIBUTING | 52-item inventory, conventions, srcset rules, entry checklist | ✅ |

## 3. Gaps / notes

| # | Note | Tag |
|---|---|---|
| 1 | `theme-presets` / `font-presets`: shipped JSON count (5/7) < source imports (10/13) — pulling these items can hit broken imports unless all presets are copied | ⚠️ |
| 2 | No tests, no Storybook, no visual regression for registry items | PRO |
| 3 | No versioning of the registry (single `main` manifest) — sites pull latest | PRO |
| 4 | Registry is framework-agnostic by contract; site shims (`ui-shims`) are mandatory before build | CORE |
| 5 | No i18n-ready string linting (keys validated manually per site) | PRO |
