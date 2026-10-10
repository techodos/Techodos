/**
 * Demo restaurants built on the platform to prove it adapts to different concepts.
 * They are demonstrations, not client projects — the copy must keep saying so.
 */
export type DemoBuild = { name: string; concept: string; image: string; shows: string[] };

export const demoBuilds: DemoBuild[] = [
  {
    name: "Zaytoun",
    concept: "Levantine charcoal grill",
    image: "/portfolio/zaytoun.webp",
    shows: ["Multiple branches", "Delivery zones", "Reservations"],
  },
  {
    name: "Villa The Grand Buffet",
    concept: "Buffet restaurant",
    image: "/portfolio/villa-grand-buffet.webp",
    shows: ["Per-head buffet packages", "Dine-in only rules", "Reservations"],
  },
  {
    name: "Blue Hour Coffee",
    concept: "Specialty coffee house",
    image: "/portfolio/blue-hour.webp",
    shows: ["Café branding", "Drink variants & add-ons", "Reservations"],
  },
  {
    name: "Bun Intended",
    concept: "Burger brand",
    image: "/portfolio/bun-intended.webp",
    shows: ["Bold brand theme", "Add-ons & extras", "Promo codes"],
  },
  {
    name: "Bella Napoli",
    concept: "Italian pizzeria",
    image: "/portfolio/bella-napoli.webp",
    shows: ["Pizza sizes & variants", "Coupons", "Reviews"],
  },
];
