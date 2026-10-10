// Turns the client build into one static HTML file per route, with real content and per-page
// <head> tags, plus 404.html, sitemap.xml and robots.txt. Runs after `vite build` + the SSR build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const server = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { render, headFor, pages, prerenderRoutes, SITE_URL } = server;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const byPath = Object.fromEntries(Object.values(pages).map((p) => [p.path, p]));

function page(url, meta) {
  return template
    .replace("<!--app-head-->", headFor(meta))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-route="${url}">${render(url)}</div>`);
}

for (const route of prerenderRoutes) {
  const html = page(route, byPath[route]);
  const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log("prerendered", route);
}

fs.writeFileSync(path.join(dist, "404.html"), page("/404", pages.notFound));
console.log("prerendered 404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderRoutes
  .map((r) => `  <url><loc>${SITE_URL}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod><priority>${r === "/" ? "1.0" : r.includes("restaurant") || r === "/book-demo" ? "0.9" : "0.7"}</priority></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("wrote sitemap.xml and robots.txt");
