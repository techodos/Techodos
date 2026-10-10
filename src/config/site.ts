/**
 * Site-wide constants. Change SITE_URL (or set VITE_SITE_URL at build time) once the
 * production domain is final: canonical URLs, Open Graph URLs and the sitemap use it.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://techodos.com";

export const site = {
  name: "TechOdos",
  email: "thetechodos@gmail.com",
  tagline: "Software & SaaS Solutions",
  productName: "TechOdos Restaurant Platform",
  ogImage: "/og-image.png",
} as const;

export const demoSubject = "Free Demo Request — Restaurant Management Platform";

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which most mail clients show literally.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${query ? `?${query}` : ""}`;
};
