# react-factories

Reusable AI website component registry scaffold built with Next.js, TypeScript, Tailwind CSS, shadcn/ui conventions, and pnpm.

## What is included

- Next.js + App Router project shell
- TypeScript path aliases (`@/*`)
- Tailwind CSS global styles (`/src/styles/globals.css`)
- shadcn/ui initialization config (`/components.json`)
- Registry foundation (`/registry/registry.json`)
- Public registry location (`/public/registry/registry.json`)
- Placeholder folders for future components and registry entries

## Project structure

```txt
src/
  app/
  components/
    ui/
    sections/
    layouts/
    marketing/
    forms/
    navigation/
  lib/
    utils.ts
    registry.ts
  styles/
    globals.css

registry/
  components/
  sections/
  layouts/
  registry.json

public/
  registry/
```

## Registry workflow (for future additions)

1. Create reusable source files under `/src/components/*`.
2. Add corresponding registry items to `/registry/registry.json` (or dedicated files under `/registry/components`, `/registry/sections`, `/registry/layouts` and reference them from `items`).
3. Ensure each registry entry includes a unique `name`, a valid `type` (`registry:ui`, `registry:block`, etc.), and file references once real components are added.
4. Copy or generate publishable manifest files into `/public/registry/` for external consumers.
5. Validate JSON with:

```bash
pnpm registry:check
```

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm registry:check
```

## Notes

- This is intentionally a shell-only setup.
- No production-ready components are implemented yet.
