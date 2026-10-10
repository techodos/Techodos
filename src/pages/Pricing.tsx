import { pages } from "../content/seo";
import { Faq, faqJsonLd, type QA } from "../components/sections/Faq";
import { PricingPlans } from "../components/sections/Pricing";
import { CtaBand } from "../components/ui/Cta";
import { PageHero, SectionHead } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";

const pricingFaq: QA[] = [
  {
    q: "Why don't you list prices?",
    a: "Restaurants differ a lot — one café versus a buffet with several branches. We'd rather understand your setup in a short demo and quote a fair price than force you into a one-size package.",
  },
  {
    q: "Can I start small and upgrade later?",
    a: "Yes. Plans are built on the same platform, so moving from Starter to Growth or Business switches on more features without migrating anything.",
  },
  {
    q: "Is the demo really free?",
    a: "Yes. The demo is free and comes with no obligation to buy.",
  },
  {
    q: "Do you help set up our menu?",
    a: "Yes. Guided onboarding and menu setup are part of the Business plan and can be added to other plans — we'll discuss what you need during the demo.",
  },
];

export default function Pricing() {
  return (
    <>
      <Seo meta={pages.pricing} jsonLd={faqJsonLd(pricingFaq)} />
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple plans, <span className="serif">tailored</span> pricing.
          </>
        }
        intro="Pick the plan that matches how your restaurant works today. We'll confirm the price for your setup after a free demo."
      />
      <section className="section" style={{ paddingTop: 16 }} aria-label="Plans">
        <div className="container">
          <PricingPlans />
        </div>
      </section>
      <section className="section section--alt" aria-labelledby="pfaq-title">
        <div className="container">
          <SectionHead center id="pfaq-title" eyebrow="Pricing FAQ" title="About plans and quotes." />
          <Faq items={pricingFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
