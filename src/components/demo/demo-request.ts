/**
 * Demo request model, validation and the email it becomes. Kept framework-free so the same
 * functions can later back an API call instead of a mailto: link.
 */
import { demoSubject, mailto } from "../../config/site";

export type DemoRequest = {
  name: string;
  email: string;
  business: string;
  phone: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  message: string;
  plan?: string;
  timezone?: string;
};

export type DemoErrors = Partial<Record<keyof DemoRequest, string>>;

export const emptyDemoRequest: DemoRequest = { name: "", email: "", business: "", phone: "", date: "", time: "", message: "" };

export const MESSAGE_MAX = 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;

/** Today's date in the visitor's own time zone, as yyyy-mm-dd. */
export function todayKey(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function validateDemoRequest(r: DemoRequest, today = todayKey()): DemoErrors {
  const e: DemoErrors = {};
  if (r.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(r.email.trim())) e.email = "Please enter a valid email address.";
  if (r.business.trim().length < 2) e.business = "Please enter your restaurant or business name.";
  const digits = r.phone.replace(/\D/g, "");
  if (!PHONE_RE.test(r.phone.trim()) || digits.length < 7) e.phone = "Please enter a phone or WhatsApp number, ideally with country code.";
  if (!r.date) e.date = "Please choose a preferred date.";
  else if (r.date < today) e.date = "Please choose today or a future date.";
  if (!r.time) e.time = "Please choose a preferred time.";
  if (r.message.length > MESSAGE_MAX) e.message = `Please keep the message under ${MESSAGE_MAX} characters.`;
  return e;
}

function formatDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  if (!y || !m || !d) return key;
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export function demoEmailBody(r: DemoRequest) {
  const lines = [
    "Hello TechOdos,",
    "",
    "I'd like to request a free demo of the Restaurant Management Platform.",
    "",
    `Name: ${r.name.trim()}`,
    `Email: ${r.email.trim()}`,
    `Restaurant / business: ${r.business.trim()}`,
    `Phone / WhatsApp: ${r.phone.trim()}`,
    `Preferred date: ${formatDate(r.date)}`,
    `Preferred time: ${r.time}${r.timezone ? ` (${r.timezone})` : ""}`,
  ];
  if (r.plan) lines.push(`Interested in: ${r.plan} plan`);
  lines.push("", "Message:", r.message.trim() || "—", "", "I understand this is a request and the time will be confirmed by email.");
  return lines.join("\n");
}

export function demoMailto(r: DemoRequest) {
  return mailto(demoSubject, demoEmailBody(r));
}
