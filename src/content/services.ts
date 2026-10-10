import type { LucideIcon } from "lucide-react";
import { Boxes, Cable, Cog, Gauge, Layers, MonitorSmartphone } from "lucide-react";

export type Service = { icon: LucideIcon; title: string; summary: string; points: string[] };

export const services: Service[] = [
  {
    icon: Layers,
    title: "SaaS Development",
    summary: "Multi-tenant products built to onboard many customers safely from one codebase.",
    points: ["Tenant isolation & role-based access", "Subscriptions-ready architecture", "Per-customer branding and settings"],
  },
  {
    icon: MonitorSmartphone,
    title: "Web Application Development",
    summary: "Fast, responsive web apps that feel native on phones and hold up on desktop.",
    points: ["React & Next.js", "Mobile-first UX", "SEO and performance from the start"],
  },
  {
    icon: Boxes,
    title: "Custom Software",
    summary: "Software shaped around how your business actually works, not the other way round.",
    points: ["Discovery & scoping workshops", "Clear milestones", "Maintainable, documented code"],
  },
  {
    icon: Cog,
    title: "Business Automation",
    summary: "Replace manual steps and spreadsheets with reliable, automatic workflows.",
    points: ["Email & push notifications", "Scheduled jobs and exports", "Third-party integrations"],
  },
  {
    icon: Gauge,
    title: "Admin Dashboards",
    summary: "Operational dashboards your team can run the day on — clear, fast and permission-aware.",
    points: ["Live data and reporting", "Charts and CSV/Excel/PDF export", "Role-based screens"],
  },
  {
    icon: Cable,
    title: "API & Backend Development",
    summary: "Secure backends and APIs with the business rules where they belong: on the server.",
    points: ["PostgreSQL & row-level security", "Payment gateway integrations", "Real-time updates"],
  },
];

export const process = [
  { title: "Discover", text: "We learn your workflow, goals and constraints, and agree on what success looks like." },
  { title: "Design", text: "Flows and interfaces are designed and reviewed with you before code is written." },
  { title: "Build", text: "Short, visible iterations with working software you can click through." },
  { title: "Launch & support", text: "Deployment, handover and ongoing improvements once real users arrive." },
];
