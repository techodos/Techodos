import { useEffect } from "react";
import { SITE_URL, site } from "../../config/site";
import type { PageMeta } from "../../content/seo";

/**
 * Keeps <head> in sync on client-side navigation. The first paint of every route already has
 * the same tags baked in by scripts/prerender.mjs, so crawlers that skip JavaScript see them too.
 */
export function Seo({ meta, jsonLd }: { meta: PageMeta; jsonLd?: object | object[] }) {
  useEffect(() => {
    const url = SITE_URL + (meta.path === "/" ? "/" : meta.path);
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", SITE_URL + site.ogImage);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    if (meta.path === "/404") {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      setMeta("name", "robots", "noindex");
    } else {
      setLink("canonical", url);
      document.head.querySelector('meta[name="robots"]')?.remove();
    }

    const existing = document.getElementById("page-jsonld");
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [meta, jsonLd]);

  return null;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
