# TechOdos website

Marketing site for TechOdos and the TechOdos Restaurant Platform. React 19 + Vite + React Router, with a lightweight
React Three Fiber scene in the home hero. Frontend only — no backend, database or auth.

## Commands

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # typecheck + client build + prerender every route into dist/
npm run preview    # serve dist/ like a static host (http://localhost:4173)
```

On Windows, stop `npm run preview` before `npm run build` (the running server locks files in `dist/`).

## Before going live

- Set the production domain: `VITE_SITE_URL=https://your-domain.com npm run build` (or edit the default in
  `src/config/site.ts`). Canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt` use it.
- Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, S3…). Each route is a real
  `route/index.html` file and unknown URLs get `404.html`. `vercel.json` enables clean URLs on Vercel.

## Structure

```
src/config/site.ts        name, email, site URL, mailto helper
src/content/              all copy and data: product features, plans, services, portfolio, per-page SEO
src/components/layout/    header, footer, layout, logo
src/components/ui/        Seo, Reveal, device frames, Tilt, section headers, CTA band/buttons
src/components/sections/  hero, product tour, pricing, FAQ, journey, service cards
src/components/three/     HeroBackdrop (WebGL detection, lazy load, pause off-screen) + HeroScene
src/components/demo/      demo request form + framework-free validation/email builder (demo-request.ts)
src/pages/                one file per route
scripts/prerender.mjs     static HTML per route, 404.html, sitemap.xml, robots.txt
public/screens/           real product screenshots (demo restaurant, sample data)
```

## Content rules

- Only list capabilities that exist in the Restaurant Platform (`src/content/product.ts`).
- No invented customers, testimonials, statistics, awards or prices. Plans show "Custom pricing".
- Portfolio restaurants are demos built on the platform and are labelled as such.

## Adding a backend later

The demo form currently opens the visitor's email client (`demoMailto` in `src/components/demo/demo-request.ts`).
To switch to an API, keep `validateDemoRequest` and replace the `window.location.href = demoMailto(...)` line in
`DemoForm.tsx` with a `fetch` to your endpoint; the success screen copy will need to change accordingly.
