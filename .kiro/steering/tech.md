# Tech Stack

## Core
- React 18 + TypeScript
- Vite 5 (build tool, dev server on port 8080)
- React Router v6 (client-side routing)
- TanStack Query v5 (server state management)

## Styling
- Tailwind CSS v3 with custom design tokens via CSS variables
- shadcn/ui component library (Radix UI primitives)
- Framer Motion for animations
- Custom fonts: Syne (display), DM Mono (body), Fira Code (code), Space Mono (labels)

## Forms & Validation
- React Hook Form + Zod

## Testing
- Vitest + jsdom (unit/component tests)
- Testing Library (React)
- Playwright (e2e)

## Path Alias
`@/` maps to `./src/`

## Common Commands

```bash
npm run dev        # start dev server (localhost:8080)
npm run build      # production build
npm run preview    # preview production build
npm run lint       # ESLint
npm run test       # run tests once (vitest run)
npm run test:watch # vitest in watch mode
```
