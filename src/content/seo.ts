import { PRICE_PERIOD, formatPrice, plans } from "./plans";

const priceList = plans.map((p) => `${p.name} ${formatPrice(p.price)}`).join(", ");
const fromPrice = formatPrice(Math.min(...plans.map((p) => p.price)));

/** One entry per route. Used by <Seo> in the browser and by the prerender script at build time. */
export type PageMeta = { path: string; title: string; description: string };

export const pages = {
  home: {
    path: "/",
    title: "TechOdos | Software & SaaS Solutions",
    description:
      `Online ordering your restaurant owns: a branded ordering website, reservations, live order tracking, kitchen view and admin dashboard. Plans from ${fromPrice} ${PRICE_PERIOD}, no commission. Try a demo order at Blue Hour Coffee.`,
  },
  products: {
    path: "/products",
    title: "Products | TechOdos",
    description:
      "Software products built by TechOdos, led by the TechOdos Restaurant Platform: online ordering, reservations, payments and restaurant operations in one system.",
  },
  restaurant: {
    path: "/products/restaurant-platform",
    title: "Restaurant Management Platform | TechOdos",
    description:
      "A branded ordering and booking website plus a full admin dashboard for restaurants: menu and buffet management, delivery, pickup and dine-in orders, reservations, payments, reviews and sales reports.",
  },
  pricing: {
    path: "/pricing",
    title: "Pricing | TechOdos Restaurant Platform",
    description:
      `${priceList} ${PRICE_PERIOD} — early-bird prices for the TechOdos Restaurant Platform, with no commission on orders. Compare every feature by plan.`,
  },
  services: {
    path: "/services",
    title: "Software Development Services | TechOdos",
    description:
      "SaaS development, web applications, custom software, business automation, admin dashboards and API/backend development from TechOdos.",
  },
  portfolio: {
    path: "/portfolio",
    title: "Portfolio | TechOdos",
    description:
      "Work by TechOdos: the Restaurant Platform and the demo restaurants built on it — featuring Blue Hour Coffee, plus a Levantine grill, a buffet, a burger brand and a pizzeria.",
  },
  about: {
    path: "/about",
    title: "About TechOdos | Product-Minded Software Team",
    description:
      "TechOdos is a software company that designs, builds and runs its own SaaS products and builds custom software for businesses worldwide.",
  },
  contact: {
    path: "/contact",
    title: "Contact | TechOdos",
    description: "Talk to TechOdos about the Restaurant Platform or a custom software project. Email thetechodos@gmail.com.",
  },
  demo: {
    path: "/book-demo",
    title: "Book a Free Demo | TechOdos Restaurant Platform",
    description:
      "Book a free, no-obligation walkthrough of the TechOdos Restaurant Platform: ordering website, reservations, kitchen view and admin dashboard.",
  },
  notFound: {
    path: "/404",
    title: "Page not found | TechOdos",
    description: "The page you were looking for does not exist.",
  },
} satisfies Record<string, PageMeta>;

export const prerenderRoutes = Object.values(pages)
  .map((p) => p.path)
  .filter((p) => p !== "/404");
