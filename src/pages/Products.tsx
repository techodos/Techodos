import { ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { screens } from "../content/product";
import { pages } from "../content/seo";
import { CtaBand, DemoButton } from "../components/ui/Cta";
import { BrowserFrame } from "../components/ui/Frames";
import { Reveal } from "../components/ui/Reveal";
import { PageHero } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";
import { Tilt } from "../components/ui/Tilt";

const highlights = ["Online ordering", "Reservations", "Live order tracking", "Kitchen view", "Payments", "Sales reports", "Buffet packages", "Multi-branch"];

export default function Products() {
  return (
    <>
      <Seo meta={pages.products} />
      <PageHero
        eyebrow="Products"
        title={
          <>
            Products we build, <span className="serif">own</span> and improve.
          </>
        }
        intro="TechOdos builds its own software products, not only client projects. That means we think long-term about reliability, security and the people who use our software every day."
      />

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="p-restaurant">
        <div className="container">
          <Reveal className="product-feature">
            <div className="product-feature__copy">
              <span className="badge badge--live">
                <span className="live-dot" /> Available now
              </span>
              <h2 id="p-restaurant">TechOdos Restaurant Platform</h2>
              <p>
                A complete online system for restaurants: a branded ordering and reservation website for guests, plus an admin dashboard for
                orders, the kitchen, the menu, payments, staff and reports.
              </p>
              <ul className="tags" aria-label="Key capabilities">
                {highlights.map((h) => (
                  <li key={h} className="tag">
                    {h}
                  </li>
                ))}
              </ul>
              <div className="page-hero__actions">
                <DemoButton />
                <Link to="/products/restaurant-platform" className="btn btn--ghost">
                  Product details
                </Link>
              </div>
            </div>
            <Tilt>
              <BrowserFrame screen={screens.adminReports} url="your-restaurant.com/admin/reports" priority />
            </Tilt>
          </Reveal>

          <Reveal className="card mt-lg" delay={0.05}>
            <div className="icon-badge">
              <Lightbulb aria-hidden="true" />
            </div>
            <h3>Have a product idea of your own?</h3>
            <p>
              We bring the same product thinking to client work — from multi-tenant SaaS to internal dashboards. Tell us what you want to build.
            </p>
            <Link to="/services" className="text-link">
              Our services <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
