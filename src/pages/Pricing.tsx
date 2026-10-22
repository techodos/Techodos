import { pages } from "../content/seo";
import { SITE_URL } from "../config/site";
import { PRICE_CURRENCY, PRICE_PERIOD, formatPrice, plans, savingPercent } from "../content/plans";
import { Faq, faqJsonLd, type QA } from "../components/sections/Faq";
import { PlanComparison, PricingPlans } from "../components/sections/Pricing";
import { CtaBand } from "../components/ui/Cta";
import { PageHero, SectionHead } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";

const [starter, growth, premium] = plans;

const pricingFaq: QA[] = [
  {
    q: "What does the early-bird price mean?",
    a: `It is our launch price for the first restaurants on the platform: ${formatPrice(starter.price)} instead of ${formatPrice(starter.listPrice)} for Starter, ${formatPrice(growth.price)} instead of ${formatPrice(growth.listPrice)} for Growth and ${formatPrice(premium.price)} instead of ${formatPrice(premium.listPrice)} for Premium, ${PRICE_PERIOD}.`,
  },
  {
    q: "Do you take a commission on each order?",
    a: "No. You pay a flat monthly plan. Orders, guests and their contact details stay with your restaurant — there is no per-order cut like a food marketplace takes.",
  },
  {
    q: "Can I start small and upgrade later?",
    a: "Yes. Every plan runs on the same platform, so moving from Starter to Growth or Premium switches on more features without migrating your menu, orders or customers.",
  },
  {
    q: "How do orders reach me on Starter?",
    a: "Guests order on your website and the order is sent to your restaurant's WhatsApp as a ready-to-read message. Starter has no admin panel or kitchen view — those come with Growth, together with email order notifications and live order tracking for guests.",
  },
  {
    q: "Is the demo really free?",
    a: "Yes. The demo is free and comes with no obligation to buy. We show you the website, the kitchen view and the admin with a real demo restaurant.",
  },
  {
    q: "Do you help set up our menu?",
    a: "Guided onboarding and menu setup are part of the Premium plan. On Starter and Growth we walk you through the setup in the demo, and it can be added — we'll discuss what you need.",
  },
];

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "TechOdos Restaurant Platform",
  url: `${SITE_URL}/pricing`,
  offers: plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price,
    priceCurrency: PRICE_CURRENCY === "$" ? "USD" : PRICE_CURRENCY,
    description: `${plan.headline} Early-bird price, ${savingPercent(plan)}% off ${formatPrice(plan.listPrice)}.`,
  })),
};

const jsonLd = [faqJsonLd(pricingFaq), offersJsonLd];

export default function Pricing() {
  return (
    <>
      <Seo meta={pages.pricing} jsonLd={jsonLd} />
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            The right tools for every stage of your restaurant&rsquo;s <span className="serif">growth</span>.
          </>
        }
        intro={`Start simply with your own ordering website and orders on WhatsApp, then add an admin panel, kitchen view, promotions, online payments and more branches as you grow. Flat early-bird prices from ${formatPrice(starter.price)} ${PRICE_PERIOD}, with no commission on orders.`}
      />
      <section className="section" style={{ paddingTop: 16 }} aria-label="Plans">
        <div className="container">
          <PricingPlans compareHref="#compare" />
        </div>
      </section>
      <section className="section section--alt" id="compare" aria-labelledby="compare-title">
        <div className="container">
          <SectionHead center id="compare-title" eyebrow="Compare" title="Compare every feature." intro="Each plan includes everything in the plan before it." />
          <PlanComparison />
        </div>
      </section>
      <section className="section" aria-labelledby="pfaq-title">
        <div className="container">
          <SectionHead center id="pfaq-title" eyebrow="Pricing FAQ" title="About plans and prices." />
          <Faq items={pricingFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
