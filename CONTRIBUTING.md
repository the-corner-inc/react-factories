# Contributing to react-factories

Component conventions and checklist for the shared registry.

## Design tokens

Always use shadcn semantic tokens. Never hardcode colors.

```tsx
// Correct
className="border border-border bg-background text-foreground"
className="text-muted-foreground"
className="bg-primary text-primary-foreground hover:bg-primary/90"
className="focus-visible:ring-2 focus-visible:ring-ring"

// Wrong
className="border border-zinc-300 bg-white text-zinc-950"
className="text-zinc-600 dark:text-zinc-400"
```

Tokens: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `focus-visible:ring-ring`, `bg-muted`, `bg-accent`, `text-accent-foreground`, `bg-secondary`, `text-secondary-foreground`.

Error/success feedback can use utility colors (`text-red-600`, `text-emerald-700`) as they are semantic, not theme-dependent.

## File placement

| Type | Directory |
|------|-----------|
| UI primitives (button, input, badge…) | `src/components/ui/` |
| Page sections (hero, grid, faq…) | `src/components/sections/` |
| Navigation (navbar, footer…) | `src/components/navigation/` |
| Layout helpers (cookie banner, consent…) | `src/components/layouts/` |
| Forms (newsletter…) | `src/components/forms/` |
| Libraries (utils, i18n, seo…) | `src/lib/` |

## Props conventions

- Every visible string is a prop with an English default value
- Components never import data — everything comes via props
- Use `cn()` from `@/lib/utils` for all className merging
- Export both the component and its Props type
- For section components that support color themes, use `SectionVariant` from `@/lib/section-variants`

## Client/Server

Prefer Server Components. Add `"use client"` only when the component uses:
- `useState`, `useEffect`, `useRef`, `useCallback`
- Event handlers (`onClick`, `onChange`) that manage local state
- Browser APIs (`window`, `navigator`, `localStorage`)

## Accessibility

Every component must include:
- Semantic HTML elements (`<form>`, `<nav>`, `<section>`, `<button>`)
- Visible `focus-visible:ring-2 focus-visible:ring-ring` states
- `aria-*` attributes when state changes (e.g. `aria-invalid`, `aria-describedby`)
- `aria-label` on icon-only buttons
- `sr-only` labels where a visible label would be redundant
- `role="alert"` / `aria-live` for dynamic status messages

## Registry entry

After creating a component, add it to `registry/registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "Short description of what it does.",
  "files": [{ "path": "src/components/ui/my-component.tsx", "type": "registry:component" }],
  "dependencies": ["lucide-react"],
  "registryDependencies": ["cn"]
}
```

| Field | Notes |
|-------|-------|
| `type` | `registry:ui` for primitives, `registry:block` for composed sections, `registry:lib` for libraries |
| `dependencies` | npm packages the consumer must install |
| `registryDependencies` | Other items from this registry that are required |

Then run `pnpm registry:sync` to rebuild the publishable manifest.

## Component checklist

- [ ] Uses shadcn design tokens (no hardcoded colors)
- [ ] All strings are props with English defaults
- [ ] Imports `cn` from `@/lib/utils` for className merging
- [ ] `"use client"` only when necessary
- [ ] Props type is exported
- [ ] Accessible (semantic HTML, aria, focus rings, keyboard nav)
- [ ] Registry entry added to `registry/registry.json`
- [ ] Example usage provided (optional but recommended)
- [ ] `pnpm registry:sync` ran successfully
- [ ] `pnpm typecheck` passes
