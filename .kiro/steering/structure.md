# Project Structure

```
src/
├── components/        # All UI components
│   ├── ui/            # shadcn/ui primitives (do not edit directly)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── TechTicker.tsx
│   ├── Leadership.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── ScrollProgress.tsx
│   └── TerminalWindow.tsx
├── pages/
│   ├── Index.tsx      # Main SPA page — composes all section components
│   └── NotFound.tsx
├── hooks/             # Custom React hooks
├── lib/
│   └── utils.ts       # cn() helper (clsx + tailwind-merge)
├── test/              # Vitest setup and tests
├── App.tsx            # Router + providers setup
├── main.tsx           # React root entry
└── index.css          # Global styles, CSS variables, custom animations
```

## Conventions

- Each portfolio section is its own component in `src/components/`
- Section components are assembled in order inside `src/pages/Index.tsx`
- New routes go in `App.tsx` above the `*` catch-all route
- Use the `@/` alias for all internal imports (never relative `../../`)
- Styling uses Tailwind utility classes; custom design tokens are CSS variables defined in `index.css`
- Use `cn()` from `@/lib/utils` to merge conditional class names
- Font utilities: `font-display`, `font-body`, `font-code`, `font-label`
- Color tokens: `primary`, `teal`, `green`, `amber`, `surface`, `terminal` (all via CSS vars)
- Animations are done with Framer Motion or Tailwind/CSS keyframes defined in `index.css`
