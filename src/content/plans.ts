/**
 * Plan tiers group real platform capabilities. Prices are early-bird launch prices: `price` is what a restaurant pays
 * now, `listPrice` is the regular price shown struck through. Change the currency or period here and every price on
 * the site follows.
 */
export const PRICE_CURRENCY = "$";
export const PRICE_PERIOD = "per month";

export type Plan = {
  name: string;
  tagline: string;
  bestFor: string;
  /** what one subscription covers, in plain words */
  scope: string;
  price: number;
  listPrice: number;
  highlight?: boolean;
  includesFrom?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Go online with your own ordering website.",
    bestFor: "Single-location restaurants and cafés",
    scope: "1 branch",
    price: 20,
    listPrice: 40,
    features: [
      "Branded restaurant website",
      "Online menu with variants & add-ons",
      "Delivery, pickup and dine-in ordering",
      "Guest checkout",
      "Live order tracking for guests",
      "Admin dashboard, orders & kitchen view",
      "Menu management with photo upload",
      "Email order notifications",
    ],
  },
  {
    name: "Growth",
    tagline: "Bring guests back and fill more tables.",
    bestFor: "Busy restaurants growing direct sales",
    scope: "1 branch",
    price: 40,
    listPrice: 60,
    highlight: true,
    includesFrom: "Starter",
    features: [
      "Table reservations with time slots",
      "Customer accounts & Google sign-in",
      "Web push notifications",
      "Coupons & targeted promotions",
      "Reviews with moderation & replies",
      "Sales reports with CSV, Excel & PDF export",
      "Tax and service-fee rules",
      "WhatsApp checkout",
    ],
  },
  {
    name: "Business",
    tagline: "Run several branches from one place.",
    bestFor: "Multi-branch brands, buffets and groups",
    scope: "Multiple branches",
    price: 60,
    listPrice: 80,
    includesFrom: "Growth",
    features: [
      "Multiple branches & delivery zones",
      "Map-based delivery address & nearest branch",
      "Online card & mobile wallet payments",
      "Buffet packages (per-head pricing)",
      "Staff roles & permissions",
      "Customer insights & order history",
      "Guided onboarding and menu setup",
    ],
  },
];

export function formatPrice(amount: number): string {
  return `${PRICE_CURRENCY}${amount}`;
}

/** Whole-number percentage saved against the list price. */
export function savingPercent(plan: Pick<Plan, "price" | "listPrice">): number {
  return Math.round((1 - plan.price / plan.listPrice) * 100);
}

/**
 * Every feature row for the comparison table, in plan order, with the first plan that includes it. A later plan
 * includes everything from the earlier ones (`includesFrom`), so a row is ticked from its plan onwards.
 */
export function comparisonRows(): { feature: string; from: number }[] {
  return plans.flatMap((plan, index) => plan.features.map((feature) => ({ feature, from: index })));
}
