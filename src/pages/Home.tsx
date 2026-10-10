import { ArrowRight, BarChart3, CalendarCheck, ChefHat, CreditCard, Radio, Soup, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_URL, site } from "../config/site";
import { screens } from "../content/product";
import { pages } from "../content/seo";
import { Faq, faqJsonLd, platformFaq } from "../components/sections/Faq";
import { Hero } from "../components/sections/Hero";
import { Journey } from "../components/sections/Journey";
import { PricingPlans } from "../components/sections/Pricing";
import { ServiceCards } from "../components/sections/ServiceCards";
import { CtaBand, DemoButton } from "../components/ui/Cta";
import { Reveal } from "../components/ui/Reveal";
import { SectionHead } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";

const homeFaq = platformFaq.slice(0, 2).concat(platformFaq.slice(4, 6), [
  {
    q: "Do you build custom software as well?",
    a: "Yes. Alongside our own products we build SaaS platforms, web applications, admin dashboards, automations and APIs for other businesses.",
  },
]);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: SITE_URL,
    email: site.email,
    logo: `${SITE_URL}/favicon.svg`,
    description: pages.home.description,
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: SITE_URL },
  faqJsonLd(homeFaq),
];

const flow = [
  { n: "01", title: "TechOdos", text: "A software company that designs, builds and runs its own SaaS products.", to: "/about" },
  { n: "02", title: "What we build", text: "SaaS platforms, web apps, admin dashboards, automation and APIs.", to: "/services" },
  { n: "03", title: "Restaurant Platform", text: "Our flagship product: ordering, reservations and restaurant operations.", to: "/products/restaurant-platform" },
  { n: "04", title: "Book a free demo", text: "See it running with a walkthrough tailored to your restaurant.", to: "/book-demo", cta: true },
];

export default function Home() {
  return (
    <>
      <Seo meta={pages.home} jsonLd={jsonLd} />
      <Hero />

      {/* TechOdos → what we build → product → demo */}
      <section className="section--tight" aria-label="How TechOdos fits together" style={{ paddingBottom: "clamp(56px, 7vw, 88px)" }}>
        <div className="container">
          <Reveal className="flow">
            {flow.map((f) => (
              <Link key={f.n} to={f.to} className={`flow__step ${f.cta ? "flow__step--cta" : ""}`}>
                <span className="flow__num">{f.n}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                {f.cta && (
                  <span className="text-link">
                    Book now <ArrowRight aria-hidden="true" />
                  </span>
                )}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="platform-title">
        <div className="container">
          <SectionHead
            id="platform-title"
            eyebrow="Our flagship product"
            title={
              <>
                One platform for the <span className="serif">whole</span> restaurant.
              </>
            }
            intro="The TechOdos Restaurant Platform connects what guests see with what your team runs — from the first tap on the menu to the end-of-month sales report."
          />

          <div className="bento">
            <Reveal className="card span-3">
              <div className="icon-badge">
                <Store aria-hidden="true" />
              </div>
              <h3>A branded website that takes orders</h3>
              <p>Your menu, photos and colours on your own site — delivery, pickup and dine-in, with guest checkout.</p>
              <div className="bento-shot">
                <img src={screens.storefrontMenu.src} alt={screens.storefrontMenu.alt} width={1440} height={900} loading="lazy" decoding="async" />
              </div>
            </Reveal>
            <Reveal className="card span-3" delay={0.08}>
              <div className="icon-badge">
                <ChefHat aria-hidden="true" />
              </div>
              <h3>A dashboard and kitchen view for service</h3>
              <p>Every new order arrives with a sound alert; the kitchen moves it forward in one tap and the guest sees it live.</p>
              <div className="bento-shot">
                <img src={screens.adminKitchen.src} alt={screens.adminKitchen.alt} width={1440} height={900} loading="lazy" decoding="async" />
              </div>
            </Reveal>
            <Reveal className="card">
              <div className="icon-badge">
                <CalendarCheck aria-hidden="true" />
              </div>
              <h3>Reservations</h3>
              <p>Guests choose a branch, date, party size and an open time slot, then get an email when you confirm.</p>
            </Reveal>
            <Reveal className="card" delay={0.06}>
              <div className="icon-badge">
                <Radio aria-hidden="true" />
              </div>
              <h3>Live order tracking</h3>
              <p>Status updates appear instantly on the guest's screen, with web push and email along the way.</p>
            </Reveal>
            <Reveal className="card" delay={0.12}>
              <div className="icon-badge">
                <CreditCard aria-hidden="true" />
              </div>
              <h3>Payments your way</h3>
              <p>Cash, card at the counter, bank transfer, Stripe card payments and JazzCash mobile wallet.</p>
            </Reveal>
            <Reveal className="card span-3">
              <div className="icon-badge">
                <BarChart3 aria-hidden="true" />
              </div>
              <h3>Reports you can act on</h3>
              <p>Sales, order counts, average order value and payment mix by date range — exported to CSV, Excel or PDF.</p>
              <div className="bento-shot">
                <img src={screens.adminReports.src} alt={screens.adminReports.alt} width={1440} height={900} loading="lazy" decoding="async" />
              </div>
            </Reveal>
            <Reveal className="card span-3" delay={0.08}>
              <div className="icon-badge">
                <Soup aria-hidden="true" />
              </div>
              <h3>Menu &amp; buffet management</h3>
              <p>Categories, variants, add-ons and dietary tags — plus per-head buffet packages for dine-in.</p>
              <div className="bento-shot">
                <img src={screens.adminMenu.src} alt={screens.adminMenu.alt} width={1440} height={900} loading="lazy" decoding="async" />
              </div>
            </Reveal>
          </div>

          <Reveal className="center mt-lg">
            <Link to="/products/restaurant-platform" className="text-link">
              See every feature <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="journey-title">
        <div className="container">
          <SectionHead
            id="journey-title"
            eyebrow="How an order flows"
            title="From first tap to five stars."
            intro="Each step is handled by the platform, so your team focuses on the food and the guest always knows what's happening."
          />
          <Journey />
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <SectionHead
            id="services-title"
            eyebrow="Services"
            title={
              <>
                We build software for <span className="serif">other</span> businesses, too.
              </>
            }
            intro="The same team and engineering standards behind our Restaurant Platform, applied to your product or internal tools."
          />
          <ServiceCards />
          <Reveal className="center mt-lg">
            <Link to="/services" className="text-link">
              Explore our services <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="pricing-title">
        <div className="container">
          <SectionHead
            center
            id="pricing-title"
            eyebrow="Pricing"
            title="Plans that grow with your restaurant."
            intro="Start with online ordering and add reservations, promotions, branches and online payments as you grow."
          />
          <PricingPlans />
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHead center id="faq-title" eyebrow="FAQ" title="Questions restaurants ask us." />
          <Faq items={homeFaq} />
          <Reveal className="center mt-lg">
            <DemoButton label="Ask us in a free demo" />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
