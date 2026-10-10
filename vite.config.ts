import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

/** Makes `vite preview` behave like a static host: /about -> /about/index.html, unknown -> 404.html. */
function staticHostPreview(): Plugin {
  return {
    name: "static-host-preview",
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "/").split("?")[0];
        if (path.extname(url)) return next();
        const clean = url.replace(/\/+$/, "") || "/";
        const file = clean === "/" ? path.join(dist, "index.html") : path.join(dist, clean, "index.html");
        if (fs.existsSync(file)) {
          req.url = clean === "/" ? "/index.html" : `${clean}/index.html`;
          return next();
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fs.readFileSync(path.join(dist, "404.html")));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), staticHostPreview()],
});
