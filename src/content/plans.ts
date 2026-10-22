/**
 * Plan tiers group real platform capabilities. Prices are early-bird launch prices: `price` is what a restaurant pays
 * now, `listPrice` is the regular price shown struck through. Change the currency or period here and every price on
 * the site follows.
 *
 * `planFeatureGroups` is the single source of truth for which plan includes what: the pricing cards and the comparison
 * table both read from it, so they cannot contradict each other. Only list capabilities that exist in the platform
 * (see `product.ts`). Not yet in the platform, so deliberately not listed: a loyalty / rewards programme (intended for
 * Premium) and consolidated cross-branch reporting.
 */
export const PRICE_CURRENCY = "$";
export const PRICE_PERIOD = "per month";

export type PlanId = "starter" | "growth" | "premium";

export type Plan = {
  id: PlanId;
  /** shown on the site and sent as `?plan=` to the demo form */
  name: string;
  /** earlier names still accepted in `?plan=` links */
  aliases?: string[];
  headline: string;
  description: string;
  bestFor: string;
  /** what one subscription covers, in plain words */
  scope: string;
  /** where new orders reach the restaurant */
  orders: string;
  price: number;
  listPrice: number;
  cta: string;
  highlight?: boolean;
  includesFrom?: string;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    headline: "Your restaurant, ready for online orders.",
    description: "Launch your own branded ordering website and receive direct orders on WhatsApp — no back office to learn.",
    bestFor: "Independent restaurants, cafés and small food businesses starting online",
    scope: "1 branch",
    orders: "Straight to your WhatsApp",
    price: 25,
    listPrice: 40,
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    headline: "Take control of your orders and grow direct sales.",
    description: "Run every order from a dedicated admin panel and kitchen view, and give guests accounts, bookings and live tracking.",
    bestFor: "Busy restaurants streamlining daily operations",
    scope: "1 branch",
    orders: "Admin dashboard & kitchen view",
    price: 40,
    listPrice: 60,
    cta: "Start with Growth",
    highlight: true,
    includesFrom: "Starter",
  },
  {
    id: "premium",
    name: "Premium",
    aliases: ["Business"],
    headline: "Everything you need to scale your restaurant business.",
    description: "Sales reports, promotions, online payments, staff roles and multiple branches — to grow revenue and run a bigger operation.",
    bestFor: "Established restaurants, multi-location brands and food-service groups",
    scope: "Multiple branches",
    orders: "Every branch, one admin",
    price: 60,
    listPrice: 80,
    cta: "Choose Premium",
    includesFrom: "Growth",
  },
];

export type PlanFeature = {
  label: string;
  /** the first plan that includes it; every later plan includes it too */
  from: PlanId;
  /** shown on the pricing card; every feature is shown in the comparison table */
  card?: boolean;
};

export const planFeatureGroups: { id: string; label: string; features: PlanFeature[] }[] = [
  {
    id: "website",
    label: "Website and online ordering",
    features: [
      { label: "Branded restaurant website", from: "starter", card: true },
      { label: "Your colours, fonts and photography", from: "starter" },
      { label: "Mobile-friendly menu with categories, descriptions and dish photos", from: "starter", card: true },
      { label: "Variants, add-ons and dietary tags", from: "starter", card: true },
      { label: "Delivery, pickup and dine-in ordering", from: "starter", card: true },
      { label: "Guest checkout — no sign-up needed", from: "starter", card: true },
      { label: "WhatsApp checkout — orders sent to your WhatsApp", from: "starter", card: true },
      { label: "Your own branded mobile app, on request", from: "premium", card: true },
    ],
  },
  {
    id: "operations",
    label: "Restaurant operations",
    features: [
      { label: "Restaurant admin panel", from: "growth", card: true },
      { label: "Order dashboard — accept, reject and update orders", from: "growth", card: true },
      { label: "Kitchen view with live order tickets", from: "growth", card: true },
      { label: "Email order notifications", from: "growth", card: true },
      { label: "Edit your menu, prices and photos yourself", from: "growth" },
      { label: "Map-based delivery address", from: "growth", card: true },
      { label: "Tax and service-fee rules", from: "growth" },
      { label: "Buffet packages with per-head pricing", from: "premium" },
      { label: "Guided onboarding and menu setup", from: "premium" },
    ],
  },
  {
    id: "engagement",
    label: "Customer engagement",
    features: [
      { label: "Live order tracking for guests", from: "growth", card: true },
      { label: "Customer accounts and Google sign-in", from: "growth", card: true },
      { label: "Table reservations with time slots", from: "growth", card: true },
      { label: "Web push notifications", from: "growth" },
      { label: "Reviews with moderation and replies", from: "growth", card: true },
    ],
  },
  {
    id: "marketing",
    label: "Marketing and loyalty",
    features: [
      { label: "Coupons, discount codes and targeted promotions", from: "premium", card: true },
      { label: "Customer insights and order history", from: "premium", card: true },
    ],
  },
  {
    id: "payments",
    label: "Payments and reporting",
    features: [
      { label: "Cash on delivery or payment at the counter", from: "starter" },
      { label: "Online mobile-wallet payments", from: "premium", card: true },
      { label: "Sales reports by date range", from: "premium", card: true },
      { label: "Report export to CSV, Excel and PDF", from: "premium" },
    ],
  },
  {
    id: "team",
    label: "Team and multi-branch",
    features: [
      { label: "Staff accounts with roles and permissions", from: "premium", card: true },
      { label: "Multiple branches with their own hours", from: "premium", card: true },
      { label: "Multiple delivery zones with their own fees", from: "premium" },
      { label: "Nearest-branch routing for deliveries", from: "premium", card: true },
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

export function planRank(id: PlanId): number {
  return plans.findIndex((p) => p.id === id);
}

/** Whether a plan includes a feature: each plan includes everything in the plans before it. */
export function planIncludes(plan: Plan, feature: PlanFeature): boolean {
  return planRank(plan.id) >= planRank(feature.from);
}

/** The card features a plan adds on top of the plan before it. */
export function planCardFeatures(plan: Plan): PlanFeature[] {
  return planFeatureGroups.flatMap((g) => g.features).filter((f) => f.card && f.from === plan.id);
}

/** Resolves a `?plan=` value (current name or an earlier alias, any case) to its plan. */
export function findPlan(value: string | null): Plan | undefined {
  const v = value?.trim().toLowerCase();
  if (!v) return undefined;
  return plans.find((p) => [p.id, p.name, ...(p.aliases ?? [])].some((n) => n.toLowerCase() === v));
}
