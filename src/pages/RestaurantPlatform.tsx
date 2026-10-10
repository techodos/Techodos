import { Check, Smartphone } from "lucide-react";
import { SITE_URL, site } from "../config/site";
import { featureGroups, screens } from "../content/product";
import { pages } from "../content/seo";
import { Faq, faqJsonLd, platformFaq } from "../components/sections/Faq";
import { Journey } from "../components/sections/Journey";
import { PricingPlans } from "../components/sections/Pricing";
import { ProductTour } from "../components/sections/ProductTour";
import { CtaBand, DemoButton } from "../components/ui/Cta";
import { BrowserFrame, PhoneFrame } from "../components/ui/Frames";
import { Reveal } from "../components/ui/Reveal";
import { PageHero, SectionHead } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";
import { Tilt } from "../components/ui/Tilt";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    url: `${SITE_URL}${pages.restaurant.path}`,
    description: pages.restaurant.description,
    image: `${SITE_URL}${screens.storefrontHome.src}`,
    publisher: { "@type": "Organization", name: site.name, email: site.email },
    featureList: featureGroups.flatMap((g) => g.features.map((f) => f.title)).join(", "),
  },
  faqJsonLd(platformFaq),
];

export default function RestaurantPlatform() {
  return (
    <>
      <Seo meta={pages.restaurant} jsonLd={jsonLd} />
      <PageHero
        eyebrow="TechOdos Restaurant Platform"
        title={
          <>
            Ordering, bookings and service — <span className="serif grad-text">in one place.</span>
          </>
        }
        intro="A branded ordering and reservation website for your guests, and a complete admin dashboard for your team. Built for restaurants, cafés, buffets and multi-branch brands."
      >
        <DemoButton />
        <a href="#features" className="btn btn--ghost">
          See all features
        </a>
      </PageHero>

      <section aria-label="Product preview" style={{ paddingBottom: "clamp(56px, 8vw, 96px)" }}>
        <div className="container">
          <Reveal y={30}>
            <Tilt rest="rotateX(6deg) rotateY(0deg)" max={5}>
              <BrowserFrame screen={screens.storefrontMenu} url="your-restaurant.com/menu" priority />
            </Tilt>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="tour-title">
        <div className="container">
          <SectionHead
            id="tour-title"
            eyebrow="Product tour"
            title="Take a look around."
            intro="Click through the screens your guests and your team use every day."
          />
          <ProductTour />
        </div>
      </section>

      <section className="section" id="features" aria-labelledby="features-title" style={{ scrollMarginTop: 80 }}>
        <div className="container">
          <SectionHead
            id="features-title"
            eyebrow="Features"
            title={
              <>
                Everything a modern restaurant <span className="serif">needs</span> online.
              </>
            }
            intro="Each capability below is part of the platform today."
          />
          {featureGroups.map((group) => (
            <div key={group.id} className="feature-group" aria-labelledby={`fg-${group.id}`} role="group">
              <Reveal className="group-head">
                <span className="eyebrow">{group.label}</span>
                <h3 id={`fg-${group.id}`}>{group.intro}</h3>
              </Reveal>
              <div className="grid grid--3">
                {group.features.map((f, i) => (
                  <Reveal as="article" key={f.title} delay={(i % 3) * 0.06} className="card">
                    <div className="icon-badge">
                      <f.icon aria-hidden="true" />
                    </div>
                    <h4 style={{ fontSize: "1.15rem", marginBottom: 8, letterSpacing: "-0.02em" }}>{f.title}</h4>
                    <p>{f.benefit}</p>
                    <ul className="checklist">
                      {f.details.map((d) => (
                        <li key={d}>
                          <Check aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="mobile-title">
        <div className="container split">
          <Reveal className="split__copy">
            <span className="eyebrow">Phone-first</span>
            <h2 id="mobile-title">
              Most guests order from a phone. <span className="serif">We designed for that.</span>
            </h2>
            <p className="lead">
              Thumb-friendly navigation, a bottom tab bar, fast pages and a checkout without forced sign-up. No app store, no download —
              just your link.
            </p>
            <ul className="side-list">
              <li>
                <Smartphone aria-hidden="true" />
                <span>
                  <strong>Works in any modern browser</strong>
                  <span>On iPhone, Android, tablets and desktop.</span>
                </span>
              </li>
              <li>
                <Check aria-hidden="true" />
                <span>
                  <strong>Web push on supported devices</strong>
                  <span>Order updates even after the tab is closed.</span>
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal className="split__media" delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 3vw, 28px)", maxWidth: 520, marginInline: "auto" }}>
              <Tilt rest="rotateY(10deg) rotateX(4deg)">
                <PhoneFrame screen={screens.mobileHome} />
              </Tilt>
              <Tilt rest="rotateY(-10deg) rotateX(4deg)" className="phone-offset">
                <PhoneFrame screen={screens.mobileMenu} />
              </Tilt>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="journey-title">
        <div className="container">
          <SectionHead id="journey-title" eyebrow="Order lifecycle" title="Every order, handled end to end." />
          <Journey />
        </div>
      </section>

      <section className="section section--alt" id="pricing" aria-labelledby="pricing-title">
        <div className="container">
          <SectionHead center id="pricing-title" eyebrow="Pricing" title="Choose a starting point." intro="Every plan is quoted for your restaurant after a free demo." />
          <PricingPlans />
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHead center id="faq-title" eyebrow="FAQ" title="Good questions, straight answers." />
          <Faq items={platformFaq} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
