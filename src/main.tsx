import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import "./index.css";
import "./sections.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// Production pages are prerendered (scripts/prerender.mjs) and hydrated. If a host served HTML prerendered
// for another route (e.g. an SPA fallback), or in `vite dev`, render from scratch instead.
const prerenderedFor = container.dataset.route;
const path = window.location.pathname.replace(/\/+$/, "") || "/";
if (container.firstElementChild && prerenderedFor === path) hydrateRoot(container, app);
else createRoot(container).render(app);
