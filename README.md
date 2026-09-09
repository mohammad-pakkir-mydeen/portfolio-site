# Mohammad Pakkir Mydeen — Portfolio

A premium, interactive 3D portfolio built with React, TypeScript, React Three Fiber, Tailwind
CSS, and Framer Motion. The two supplied avatars (`intro.glb`, `ep.glb`) are rendered as real 3D
models — not images — and integrated into the Hero and Experience sections.

## Stack

- **Vite + React + TypeScript**
- **Three.js / React Three Fiber / drei** — 3D avatar rendering, lighting, environment
- **Tailwind CSS** — design system (see `tailwind.config.js` for the color/type tokens)
- **Framer Motion** — scroll reveals, section transitions, mobile nav
- **lucide-react** + **react-icons** — line icons and technology logos

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

The production build outputs to `dist/`, ready to deploy to Vercel, Netlify, or any static host.

## Project structure

```
src/
  components/       one folder per section, plus shared/ for cross-section pieces
  data/portfolio.ts  <-- single source of truth for all resume content
  assets/models/     intro.glb and ep.glb
  hooks/             reduced-motion, in-view, active-section, media query hooks
```

## Before you deploy

1. **Contact links** — `profile.links` in `src/data/portfolio.ts` is intentionally empty
   (email/GitHub/LinkedIn were not supplied). Fill these in and the Contact section will
   automatically render the corresponding buttons. Leave any of them blank and that button
   simply won't appear — nothing is fabricated.
2. **Icon check** — the Skills section uses real technology logos from `react-icons/si` and
   `react-icons/fa`. After `npm install`, if TypeScript reports a missing export for any one
   icon (rare, but simple-icons occasionally renames slugs), open
   `src/components/Skills/SkillIcons.tsx` and swap that single import for the current
   equivalent in `node_modules/react-icons/si/index.d.ts` — everything else is unaffected.
3. **GLB size** — both avatars are ~4.5MB. They're lazy-loaded (loaded only when their section's
   Canvas mounts) and the Experience avatar's whole 3D canvas is mounted/unmounted based on
   scroll visibility via `IntersectionObserver` to avoid running two WebGL contexts unless
   necessary. For faster first paint in production, consider compressing both files with
   [`gltf-transform`](https://gltf-transform.dev/) (`gltf-transform optimize intro.glb intro.glb`).

## Design notes

- Color system: near-black base (`#08090C`) with indigo/violet/blue accents used sparingly —
  see `tailwind.config.js` → `theme.extend.colors`.
- Typography: Manrope for display/headings, Inter for body text, JetBrains Mono for small
  technical labels (`{ }`, eyebrows, metrics).
- All content lives in `src/data/portfolio.ts` — nothing else in the codebase hardcodes resume
  facts, so updates only need to happen in one place.
- Respects `prefers-reduced-motion`: count-up animations, the pulsing data-flow lines, and
  scroll-reveal transitions all fall back to instant/static states.

## Content accuracy

Every fact on this site (role, dates, metrics, skills, education, achievement count) is taken
directly from the supplied brief. No certifications, employers, technologies, or metrics have
been invented. If you add real content later (e.g. a live project URL), add it to
`src/data/portfolio.ts` rather than a component file.
