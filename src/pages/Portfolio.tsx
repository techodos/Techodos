import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { demoBuilds, featuredBuild } from "../content/portfolio";
import { screens } from "../content/product";
import { pages } from "../content/seo";
import { CtaBand, DemoButton } from "../components/ui/Cta";
import { BrowserFrame, PhoneFrame } from "../components/ui/Frames";
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
        intro="Our flagship build is the TechOdos Restaurant Platform — designed, engineered and run by our team from the ground up. Here it is running Blue Hour Coffee, our featured demo restaurant."
      />

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="bh-title">
        <div className="container">
          <div className="showcase">
            <Reveal className="showcase__media">
              <BrowserFrame screen={screens.storefrontHome} url="your-restaurant.com" priority />
              <PhoneFrame screen={screens.mobileMenu} className="showcase__phone" priority />
            </Reveal>
            <Reveal className="showcase__copy" delay={0.08}>
              <span className="eyebrow">Featured demo restaurant</span>
              <h2 id="bh-title">{featuredBuild.name}</h2>
              <p className="lead">
                {featuredBuild.concept}: espresso bar, slow bar, bakery and all-day breakfast across seven menu categories, with order-ahead pickup,
                delivery zones and table bookings. Same platform, same admin your restaurant would get.
              </p>
              <ul className="tags" aria-label="What the Blue Hour demo shows">
                {featuredBuild.shows.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="showcase__actions">
                <Link to="/#try" className="btn btn--primary btn--sm">
                  Place a demo order <ArrowRight className="arrow" aria-hidden="true" />
                </Link>
                <Link to="/book-demo" className="btn btn--ghost btn--sm">
                  Book a free demo
                </Link>
              </div>
            </Reveal>
          </div>
          <ul className="showcase__strip" aria-label="Blue Hour admin screens">
            {[screens.adminDashboard, screens.adminKitchen, screens.adminOrders, screens.adminReports].map((shot, i) => (
              <Reveal as="li" key={shot.src} delay={i * 0.05}>
                <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" decoding="async" />
              </Reveal>
            ))}
          </ul>
          <p className="screen-caption">Real product screens from the Blue Hour demo, with sample data.</p>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="case-title">
        <div className="container">
          <Reveal>
            <Tilt rest="rotateX(5deg) rotateY(0deg)" max={4}>
              <BrowserFrame screen={screens.storefrontCheckout} url="your-restaurant.com/checkout" />
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

      <section className="section" aria-labelledby="demos-title">
        <div className="container">
          <SectionHead
            id="demos-title"
            eyebrow="Demo restaurants"
            title="More restaurants, very different rules."
            intro="We built these demo restaurants on the platform to show how it adapts to different concepts, brands and rules. They are product demonstrations, not client websites."
          />
          <div className="grid grid--4">
            {demoBuilds.filter((d) => !d.featured).map((d, i) => (
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
