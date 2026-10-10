import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { pages } from "../content/seo";
import { CtaBand, EmailLink } from "../components/ui/Cta";
import { Reveal } from "../components/ui/Reveal";
import { PageHero, SectionHead } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";

const values = [
  { title: "Product thinking", text: "We build our own SaaS, so we design for the long run: the people who use the software daily, and the next feature after this one." },
  { title: "Security by default", text: "Data isolation, server-side validation and role-based access are the starting point, not an add-on." },
  { title: "Honest communication", text: "Clear scope, realistic timelines and straight answers — including when something isn't the right fit." },
  { title: "Craft in the details", text: "Empty states, loading states, error states, phones and slow networks. Real software is used in all of them." },
];

export default function About() {
  return (
    <>
      <Seo meta={pages.about} />
      <PageHero
        eyebrow="About TechOdos"
        title={
          <>
            A software company that builds <span className="serif">its own</span> products.
          </>
        }
        intro="TechOdos designs, builds and runs SaaS products, and builds custom software for businesses that want the same quality for their own ideas."
      />

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="story-title">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal className="split__copy">
            <span className="eyebrow">Our story</span>
            <h2 id="story-title">Built from a real problem.</h2>
          </Reveal>
          <Reveal className="stack" delay={0.06}>
            <p className="lead">
              Too many restaurants serve great food but run online ordering, bookings and the kitchen on disconnected tools — or depend on
              marketplaces that keep the customer relationship for themselves.
            </p>
            <p className="lead">
              So we built the TechOdos Restaurant Platform: every restaurant gets its own branded website and a complete back office, running on
              one secure platform. Building and running our own product shapes how we work on every project — we care about what happens after
              launch, because we live with it ourselves.
            </p>
            <Link to="/products/restaurant-platform" className="text-link">
              Explore the platform <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="values-title">
        <div className="container">
          <SectionHead id="values-title" eyebrow="How we work" title="What you can expect from us." />
          <Reveal>
            <ul className="values">
              {values.map((v) => (
                <li key={v.title}>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="global-title">
        <div className="container split">
          <Reveal className="split__copy">
            <span className="eyebrow">Working together</span>
            <h2 id="global-title">Remote-first, wherever you are.</h2>
          </Reveal>
          <Reveal className="stack" delay={0.06}>
            <p className="lead">
              We work remotely with clear written updates and scheduled calls, so different time zones are never a blocker. The best way to start
              is a short conversation about what you need.
            </p>
            <p className="lead">
              Email us at <EmailLink />.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
