import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  CalendarCheck,
  ChefHat,
  CreditCard,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Palette,
  Percent,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Star,
  Ticket,
  UserRound,
  Users,
  UtensilsCrossed,
  Soup,
} from "lucide-react";

/**
 * Everything here maps to functionality that exists in the Restaurant Platform codebase.
 * Keep it that way: do not add a capability here until it ships in the product.
 */
export type Feature = { icon: LucideIcon; title: string; benefit: string; details: string[] };

export const featureGroups: { id: string; label: string; intro: string; features: Feature[] }[] = [
  {
    id: "guests",
    label: "For your guests",
    intro: "A fast, branded website where diners order, book and follow their food — on any phone, no app to install.",
    features: [
      {
        icon: Palette,
        title: "Your own branded website",
        benefit: "Look like a premium restaurant brand from day one, not a listing on someone else's marketplace.",
        details: ["Your colours, fonts and photography", "Home, menu, about, gallery, locations and contact pages", "Search-friendly pages and structured data"],
      },
      {
        icon: ShoppingBag,
        title: "Online ordering",
        benefit: "Take delivery, pickup and dine-in orders directly, with prices always calculated on the server.",
        details: ["Variants, add-ons, dietary tags and spice levels", "Sold-out and availability handling", "Guest checkout — no forced sign-up"],
      },
      {
        icon: Radio,
        title: "Live order tracking",
        benefit: "Fewer “where is my order?” calls: guests watch every status change the moment it happens.",
        details: ["Real-time status timeline", "Current orders and order history", "One-tap reorder"],
      },
      {
        icon: CalendarCheck,
        title: "Table reservations",
        benefit: "Fill tables without phone tag. Guests pick a branch, date, party size and an available time slot.",
        details: ["Slot availability per branch", "Confirmation code on booking", "Request-received and confirmed emails"],
      },
      {
        icon: Bell,
        title: "Email & push notifications",
        benefit: "Keep guests informed automatically, from confirmation to “out for delivery” to “rate your order”.",
        details: ["Confirmation and thank-you emails", "Web push for status changes", "Switch each channel on or off per restaurant"],
      },
      {
        icon: UserRound,
        title: "Customer accounts",
        benefit: "Returning guests check out faster and you build a real customer base you own.",
        details: ["Email & password or Google sign-in", "Email verification", "Saved delivery addresses"],
      },
    ],
  },
  {
    id: "operations",
    label: "For your team",
    intro: "One admin dashboard for the counter, the kitchen and the office — permission-based for every role.",
    features: [
      {
        icon: LayoutDashboard,
        title: "Service dashboard",
        benefit: "See the whole pass at a glance: what's pending, preparing, ready and out for delivery.",
        details: ["Live status counts", "Latest orders and upcoming bookings", "Sound alerts for new orders"],
      },
      {
        icon: ChefHat,
        title: "Kitchen view",
        benefit: "Clear, self-refreshing tickets so the kitchen moves orders forward in one tap.",
        details: ["Active tickets with items and options", "Order type and elapsed time", "Status updates notify the guest automatically"],
      },
      {
        icon: UtensilsCrossed,
        title: "Menu management",
        benefit: "Update dishes, prices and photos yourself — changes appear on your website straight away.",
        details: ["Categories, items, variants and add-on groups", "Availability and dietary information", "Upload dish photos from your phone or computer"],
      },
      {
        icon: Soup,
        title: "Buffet packages",
        benefit: "Sell per-head buffet packages alongside — or instead of — your à la carte menu.",
        details: ["Per-person pricing", "Dine-in only, enforced at checkout", "À la carte can be switched off entirely"],
      },
      {
        icon: Users,
        title: "Staff & roles",
        benefit: "Give owners, admins, managers and kitchen staff exactly the access they need.",
        details: ["Role-based permissions", "Add, edit, disable or remove staff", "Safeguards for the owner account"],
      },
      {
        icon: Star,
        title: "Reviews & reputation",
        benefit: "Collect reviews from real orders and bookings, moderate them and reply publicly.",
        details: ["Approve, reject and feature reviews", "Public replies", "Rating summary on your website"],
      },
    ],
  },
  {
    id: "business",
    label: "For your business",
    intro: "The commercial controls that turn a website into a revenue channel.",
    features: [
      {
        icon: CreditCard,
        title: "Flexible payments",
        benefit: "Accept the way your guests prefer to pay, with the right methods offered for each order type.",
        details: ["Cash on delivery, cash or card at the counter", "Bank transfer", "Online card payments (Stripe) and JazzCash mobile wallet"],
      },
      {
        icon: MessageCircle,
        title: "WhatsApp checkout",
        benefit: "For guests who'd rather order on WhatsApp: the cart is sent to your number as a ready-to-read message, and the order still lands in your dashboard.",
        details: ["Order summary sent to your WhatsApp", "Marked as a WhatsApp order in the admin", "Cash on delivery or at the counter"],
      },
      {
        icon: Ticket,
        title: "Coupons & promotions",
        benefit: "Run targeted promotions without losing control of margins.",
        details: ["Minimum order, dates and order-type rules", "Usage limits per customer", "Codes restricted to specific customers"],
      },
      {
        icon: MapPin,
        title: "Branches & delivery zones",
        benefit: "Serve several locations with the right fees, and route each delivery to the nearest branch.",
        details: ["Multiple branches with their own hours", "Delivery zones with fees", "Map-based address picker"],
      },
      {
        icon: Percent,
        title: "Tax & service fees",
        benefit: "Charge correctly every time, with separate rules for delivery, pickup and dine-in.",
        details: ["Configurable sales tax", "Per-order-type service fees", "Receipt settings"],
      },
      {
        icon: BarChart3,
        title: "Sales reports",
        benefit: "Know what you sold, how guests paid and how the trend is moving — without spreadsheets.",
        details: ["Sales, orders and average order value", "Daily trend and payment breakdown", "Export to CSV, Excel and PDF"],
      },
      {
        icon: ShieldCheck,
        title: "Secure by design",
        benefit: "Each restaurant's data is isolated at the database level, and sensitive logic never runs in the browser.",
        details: ["Database row-level security", "Server-side pricing and validation", "Role-gated admin actions"],
      },
    ],
  },
];

export const allFeatures = featureGroups.flatMap((g) => g.features);

/**
 * Real screenshots of the product, captured from Blue Hour Coffee — the platform's featured demo restaurant (a demo
 * tenant with sample data, not a client). Re-capture them from the platform when its UI changes.
 */
const bh = "/screens/blue-hour";
export const screens = {
  storefrontHome: { src: `${bh}/home.webp`, alt: "Blue Hour Coffee website home page with Order ahead and See the menu buttons, opening hours and branch", w: 1440, h: 900 },
  storefrontSections: { src: `${bh}/home-sections.webp`, alt: "Blue Hour Coffee home page sections below the hero", w: 1440, h: 900 },
  storefrontMenu: { src: `${bh}/menu.webp`, alt: "Blue Hour online menu with search, category tabs and coffee dishes with photos, dietary tags, prep time and prices", w: 1440, h: 900 },
  storefrontItem: { src: `${bh}/item.webp`, alt: "Dish page for an Espresso with size choice, kitchen note, quantity stepper and add to cart", w: 1440, h: 900 },
  storefrontCart: { src: `${bh}/cart.webp`, alt: "Cart with three dishes, quantities and totals before checkout", w: 1440, h: 900 },
  storefrontCheckout: { src: `${bh}/checkout.webp`, alt: "Checkout with delivery, pickup and dine-in choice, guest details and an order summary with tax and delivery fee", w: 1440, h: 900 },
  storefrontReservations: { src: `${bh}/reservation.webp`, alt: "Table reservation page with branch, date, party size and available time slots", w: 1440, h: 900 },
  adminDashboard: { src: `${bh}/admin-dashboard.webp`, alt: "Admin service dashboard with live order counts, latest orders and upcoming reservations", w: 1440, h: 900 },
  adminOrders: { src: `${bh}/admin-orders.webp`, alt: "Admin orders list with status tabs, search and filters by type, payment and date", w: 1440, h: 900 },
  adminKitchen: { src: `${bh}/admin-kitchen.webp`, alt: "Kitchen view with New, Preparing and Ready lanes and an order ticket with items, options and a timer", w: 1440, h: 900 },
  adminMenu: { src: `${bh}/admin-menu.webp`, alt: "Admin menu management listing categories and dishes with availability switches", w: 1440, h: 900 },
  adminItem: { src: `${bh}/admin-item.webp`, alt: "Editing a dish in the admin: details, price and a photo uploaded from the device", w: 1440, h: 900 },
  adminZones: { src: `${bh}/admin-zones.webp`, alt: "Delivery zones with coverage areas, delivery fee and delivery time per branch", w: 1440, h: 900 },
  adminSettings: { src: `${bh}/admin-settings.webp`, alt: "Admin settings with feature switches, tax, service fees and payment methods", w: 1440, h: 900 },
  adminReports: { src: `${bh}/admin-reports.webp`, alt: "Sales reports with totals, average order value, sales trend chart and CSV, Excel and PDF export", w: 1440, h: 900 },
  mobileHome: { src: `${bh}/m-home.webp`, alt: "Blue Hour website on a phone with the hero photo and bottom navigation", w: 780, h: 1688 },
  mobileMenu: { src: `${bh}/m-menu.webp`, alt: "Blue Hour menu on a phone with dish cards, prices and add buttons", w: 780, h: 1688 },
  mobileItem: { src: `${bh}/m-item.webp`, alt: "Dish page on a phone showing the branch it is served from, the price and sizes", w: 780, h: 1688 },
} as const;

export type Screen = (typeof screens)[keyof typeof screens];

export const orderJourney = [
  { step: "Browse", text: "Guest opens your branded site and picks dishes, sizes and add-ons." },
  { step: "Order", text: "Delivery, pickup or dine-in — paid online, by card or in cash." },
  { step: "Cook", text: "The order lands on the dashboard and kitchen view with a sound alert." },
  { step: "Track", text: "Every status change reaches the guest live, by push and by email." },
  { step: "Review", text: "After completion the guest is invited to rate the order." },
];
