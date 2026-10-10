/** Plan tiers group real platform capabilities. Prices are quoted per restaurant after a demo. */
export type Plan = { name: string; tagline: string; bestFor: string; highlight?: boolean; includesFrom?: string; features: string[] };

export const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Go online with your own ordering website.",
    bestFor: "Single-location restaurants and cafés",
    features: [
      "Branded restaurant website",
      "Online menu with variants & add-ons",
      "Delivery, pickup and dine-in ordering",
      "Guest checkout",
      "Live order tracking for guests",
      "Admin dashboard, orders & kitchen view",
      "Menu management",
      "Email order notifications",
    ],
  },
  {
    name: "Growth",
    tagline: "Bring guests back and fill more tables.",
    bestFor: "Busy restaurants growing direct sales",
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
    ],
  },
  {
    name: "Business",
    tagline: "Run several branches from one place.",
    bestFor: "Multi-branch brands, buffets and groups",
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
