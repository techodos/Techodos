/**
 * Sample data for the "place a demo order" widget on the home page. Dishes, prices, prep times and the 16% sales tax are
 * copied from Blue Hour Coffee, the platform's featured demo restaurant (a demo, not a client); nothing here is sent
 * anywhere — the widget runs in the browser only.
 */
export type DemoDish = { id: string; name: string; note: string; price: number; prepMinutes: number; image: string };

export const demoRestaurant = {
  name: "Blue Hour Coffee",
  branch: "MM Alam Road",
  orderType: "Pickup",
  taxRate: 0.16,
  currency: "Rs",
};

export const demoDishes: DemoDish[] = [
  { id: "spanish-latte", name: "Spanish Latte", note: "Espresso, milk & condensed milk", price: 820, prepMinutes: 4, image: "/demo/spanish-latte.webp" },
  { id: "flat-white", name: "Flat White", note: "Double ristretto, thin microfoam", price: 690, prepMinutes: 4, image: "/demo/flat-white.webp" },
  { id: "matcha-latte", name: "Matcha Latte", note: "Ceremonial matcha, steamed milk", price: 890, prepMinutes: 4, image: "/demo/matcha-latte.webp" },
  { id: "cold-brew", name: "18-Hour Cold Brew", note: "Steeped overnight, over ice", price: 720, prepMinutes: 2, image: "/demo/cold-brew.webp" },
  { id: "cinnamon-roll", name: "Cardamom Cinnamon Bun", note: "Baked this morning", price: 590, prepMinutes: 2, image: "/demo/cinnamon-roll.webp" },
  { id: "tiramisu", name: "Espresso Tiramisu", note: "Mascarpone, cocoa", price: 950, prepMinutes: 2, image: "/demo/tiramisu.webp" },
];

/** The order lifecycle, in the platform's own order (pickup has no "out for delivery"). */
export const demoSteps = [
  { status: "pending", guest: "Order placed", detail: "Sent to the café", kitchenAction: "Confirm" },
  { status: "confirmed", guest: "Confirmed", detail: "The café accepted your order", kitchenAction: "Start preparing" },
  { status: "preparing", guest: "Preparing", detail: "Your drinks are being made", kitchenAction: "Mark ready" },
  { status: "ready", guest: "Ready for pickup", detail: "Collect at the counter", kitchenAction: "Hand over" },
  { status: "completed", guest: "Collected", detail: "Enjoy — rate your order", kitchenAction: null },
] as const;

export type DemoStatus = (typeof demoSteps)[number]["status"];

/** Sample figures for the mini dashboard; the demo order is added on top when it is completed. */
export const demoToday = { orders: 37, sales: 41860 };

export function formatRs(amount: number): string {
  return `${demoRestaurant.currency} ${Math.round(amount).toLocaleString("en-US")}`;
}

/** Looks like the platform's order numbers (e.g. QKXG-6EHHY); no 0/O/1/I to stay readable. */
export function demoOrderNumber(random: () => number = Math.random): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) => Array.from({ length: n }, () => chars[Math.floor(random() * chars.length)]).join("");
  return `${pick(4)}-${pick(5)}`;
}
