import { ArrowRight, BarChart3, CalendarCheck, ChefHat, CreditCard, MessageCircle, Radio, Soup, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_URL, site } from "../config/site";
import { screens } from "../content/product";
import { pages } from "../content/seo";
import { Faq, faqJsonLd, platformFaq } from "../components/sections/Faq";
import { FeaturedBuild } from "../components/sections/FeaturedBuild";
import { Hero } from "../components/sections/Hero";
import { Journey } from "../components/sections/Journey";
import { LiveDemo } from "../components/sections/LiveDemo";
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

/** Ways guests order and pay, all real platform options — shown as a strip under the hero. */
const ways = ["Delivery", "Pickup", "Dine-in", "Table booking", "Cash on delivery", "Card at the counter", "Bank transfer", "Stripe card", "JazzCash", "WhatsApp checkout"];

/** Own website vs. a food marketplace listing. Kept qualitative: no figures about other companies. */
const direct = [
  { topic: "Fee per order", market: "A commission on every order", own: "A flat monthly plan — no per-order cut" },
  { topic: "Your guests", market: "The marketplace keeps the relationship", own: "Accounts, order history and contacts stay yours" },
  { topic: "Your brand", market: "Listed next to every competitor", own: "Your own site, colours, photos and menu" },
  { topic: "Your rules", market: "Their fees, their promotions", own: "Your coupons, delivery zones, tax and service fees" },
];

export default function Home() {
  return (
    <>
      <Seo meta={pages.home} jsonLd={jsonLd} />
      <Hero />

      <section className="ways" aria-label="Ways guests order and pay">
        <div className="container">
          <ul className="ways__list">
            {ways.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section featured-section" id="featured" aria-labelledby="featured-title">
        <div className="featured-section__bg" aria-hidden="true">
          <img src="/demo/blue-hour-hero.webp" alt="" width={1600} height={1067} loading="lazy" decoding="async" />
        </div>
        <div className="container">
          <div className="featured-intro">
            <SectionHead
              id="featured-title"
              eyebrow="Featured build · Blue Hour Coffee"
              title={
                <>
                  A specialty coffee house, <span className="serif">running</span> on our platform.
                </>
              }
              intro="Blue Hour is our featured demo restaurant: a Lahore coffee house with espresso, slow bar, bakery and all-day breakfast. Every screen below is the real product with sample data — the website guests use and the admin the team runs it from."
            />
            <Reveal className="featured-facts" delay={0.1}>
              <dl>
                <div>
                  <dt>7</dt>
                  <dd>menu categories</dd>
                </div>
                <div>
                  <dt>37</dt>
                  <dd>dishes with photos</dd>
                </div>
                <div>
                  <dt>3</dt>
                  <dd>order types</dd>
                </div>
              </dl>
              <p>A demo restaurant, not a client — built to show what your restaurant gets.</p>
            </Reveal>
          </div>
          <Reveal>
            <FeaturedBuild />
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" id="try" aria-labelledby="try-title">
        <div className="container">
          <SectionHead
            id="try-title"
            eyebrow="Try it yourself"
            title={
              <>
                Place an order, then <span className="serif">be</span> the kitchen.
              </>
            }
            intro="Order a coffee on Blue Hour's phone screen, then confirm it, make it and hand it over on the kitchen screen — and watch the guest's tracking page follow every step. Sample data, nothing is sent."
          />
          <Reveal>
            <LiveDemo />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="platform-title">
        <div className="container">
          <SectionHead
            id="platform-title"
            eyebrow="One platform"
            title={
              <>
                Everything from the menu to the <span className="serif">month-end</span> report.
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
              <h3>Menu, photos &amp; buffets</h3>
              <p>Categories, variants, add-ons and dietary tags, dish photos uploaded from your phone — plus per-head buffet packages.</p>
              <div className="bento-shot">
                <img src={screens.adminItem.src} alt={screens.adminItem.alt} width={1440} height={900} loading="lazy" decoding="async" />
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

      <section className="section section--alt" aria-labelledby="direct-title">
        <div className="container direct">
          <SectionHead
            id="direct-title"
            eyebrow="Why your own website"
            title={
              <>
                Stop renting your <span className="serif">customers</span>.
              </>
            }
            intro="Marketplaces are good at being found. Your own ordering website is how you keep the guests they send you — and every guest who already knows your name."
          />
          <Reveal className="direct__table" as="div">
            <div className="direct__row direct__row--head" aria-hidden="true">
              <span />
              <span>Food marketplace</span>
              <span>Your own website</span>
            </div>
            {direct.map((row) => (
              <div className="direct__row" key={row.topic}>
                <span className="direct__topic">{row.topic}</span>
                <span className="direct__market">
                  <span className="direct__label">Marketplace: </span>
                  {row.market}
                </span>
                <span className="direct__own">
                  <span className="direct__label">Your website: </span>
                  {row.own}
                </span>
              </div>
            ))}
            <p className="direct__note">
              <MessageCircle aria-hidden="true" /> Guests who prefer WhatsApp can send their cart straight to your number — and the order still lands in your dashboard.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="journey-title">
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

      <section className="section section--alt" id="pricing" aria-labelledby="pricing-title">
        <div className="container">
          <SectionHead
            center
            id="pricing-title"
            eyebrow="Pricing"
            title={
              <>
                Flat monthly plans. <span className="serif">No</span> commission.
              </>
            }
            intro="Start with online ordering and add reservations, promotions, branches and online payments as you grow."
          />
          <PricingPlans />
          <Reveal className="center mt-lg">
            <Link to="/pricing" className="text-link">
              Compare every feature by plan <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
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

      <section className="section section--alt" aria-labelledby="services-title">
        <div className="container">
          <SectionHead
            id="services-title"
            eyebrow="Also from TechOdos"
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

      <CtaBand />
    </>
  );
}
