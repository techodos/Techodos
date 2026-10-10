import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { demoBuilds } from "../content/portfolio";
import { screens } from "../content/product";
import { pages } from "../content/seo";
import { CtaBand, DemoButton } from "../components/ui/Cta";
import { BrowserFrame } from "../components/ui/Frames";
import { Reveal } from "../components/ui/Reveal";
import { PageHero, SectionHead } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";
import { Tilt } from "../components/ui/Tilt";

const built = [
  "Multi-tenant architecture with database row-level security",
  "Branded storefront driven entirely by each restaurant's data",
  "Server-side pricing engine: tax, service fees, coupons, delivery",
  "Real-time order status over server-sent events",
  "Email and web push notifications with per-restaurant switches",
  "Stripe Checkout and JazzCash mobile wallet integrations",
  "Role-based admin: orders, kitchen, menu, staff, settings",
  "Sales reports with CSV, Excel and PDF export",
];

const stack = ["React", "Next.js", "TypeScript", "PostgreSQL", "Row-level security", "Server-sent events", "Stripe", "Web Push"];

export default function Portfolio() {
  return (
    <>
      <Seo meta={pages.portfolio} />
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Work we're <span className="serif">proud</span> to show.
          </>
        }
        intro="Our flagship build is the TechOdos Restaurant Platform — designed, engineered and run by our team from the ground up."
      />

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="case-title">
        <div className="container">
          <Reveal>
            <Tilt rest="rotateX(5deg) rotateY(0deg)" max={4}>
              <BrowserFrame screen={screens.storefrontReservations} url="your-restaurant.com/reservation" priority />
            </Tilt>
          </Reveal>

          <div className="split mt-lg" style={{ alignItems: "start" }}>
            <Reveal className="split__copy">
              <span className="eyebrow">Case study</span>
              <h2 id="case-title">TechOdos Restaurant Platform</h2>
              <p className="lead">
                <strong style={{ color: "var(--text)" }}>The challenge:</strong> restaurants often depend on marketplaces that own the customer
                relationship, or juggle separate tools for ordering, bookings and the kitchen.
              </p>
              <p className="lead">
                <strong style={{ color: "var(--text)" }}>Our answer:</strong> one platform where every restaurant gets its own branded website
                and a complete back office, sharing a secure, multi-tenant core.
              </p>
              <ul className="tags" aria-label="Technology">
                {stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="card" delay={0.08}>
              <h3>What we built</h3>
              <ul className="checklist">
                {built.map((b) => (
                  <li key={b}>
                    <Check aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <DemoButton size="sm" />
                <Link to="/products/restaurant-platform" className="btn btn--ghost btn--sm">
                  Product page
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="demos-title">
        <div className="container">
          <SectionHead
            id="demos-title"
            eyebrow="Demo restaurants"
            title="One platform, very different restaurants."
            intro="We built these demo restaurants on the platform to show how it adapts to different concepts, brands and rules. They are product demonstrations, not client websites."
          />
          <div className="grid grid--3">
            {demoBuilds.map((d, i) => (
              <Reveal as="article" key={d.name} delay={(i % 3) * 0.06} className="demo-card">
                <div className="demo-card__img">
                  <img src={d.image} alt={`${d.name} demo restaurant — ${d.concept}`} width={960} height={640} loading="lazy" decoding="async" />
                </div>
                <div className="demo-card__body">
                  <div>
                    <h3>{d.name}</h3>
                    <p className="demo-card__concept">{d.concept} · demo</p>
                  </div>
                  <ul className="tags" aria-label={`What the ${d.name} demo shows`}>
                    {d.shows.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
