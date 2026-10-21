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
src/content/              all copy and data: product features, plans + prices, demo order, services, portfolio, per-page SEO
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
- No invented customers, testimonials, statistics or awards.
- Prices live in ONE place, `src/content/plans.ts`: early-bird `price` + regular `listPrice` (shown struck through),
  `PRICE_CURRENCY` and `PRICE_PERIOD`. The hero, pricing cards, comparison table, FAQ answers, SEO descriptions and
  the pricing page's Offer JSON-LD all read from it — change a price there, nowhere else.
- Portfolio restaurants are demos built on the platform and are labelled as such. Blue Hour Coffee is the featured one.

## Blue Hour screenshots and the demo order

- `public/screens/blue-hour/` are real captures of the platform running the Blue Hour Coffee demo tenant (desktop
  1440×900, phone 780×1688). Admin captures show sample customer names. Re-capture them when the platform UI changes.
- `public/demo/` holds Blue Hour dish photos and hero/about images, copied from the platform repo's
  `public/images/blue-hour/`.
- The home page's "Place an order, then be the kitchen" widget (`src/components/sections/LiveDemo.tsx`, data in
  `src/content/demo-order.ts`) runs only in the browser — it sends nothing. Dishes, prices and the 16% tax match the
  Blue Hour demo menu.

## Adding a backend later

The demo form currently opens the visitor's email client (`demoMailto` in `src/components/demo/demo-request.ts`).
To switch to an API, keep `validateDemoRequest` and replace the `window.location.href = demoMailto(...)` line in
`DemoForm.tsx` with a `fetch` to your endpoint; the success screen copy will need to change accordingly.
