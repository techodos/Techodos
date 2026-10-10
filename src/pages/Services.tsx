import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { mailto } from "../config/site";
import { screens } from "../content/product";
import { process } from "../content/services";
import { pages } from "../content/seo";
import { ServiceCards } from "../components/sections/ServiceCards";
import { CtaBand } from "../components/ui/Cta";
import { BrowserFrame } from "../components/ui/Frames";
import { Reveal } from "../components/ui/Reveal";
import { PageHero, SectionHead } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";
import { Tilt } from "../components/ui/Tilt";

const projectMail = mailto(
  "Project enquiry — TechOdos",
  "Hi TechOdos,\n\nI'd like to talk about a project.\n\nWhat we want to build:\n\nTimeline:\n\nBudget range (optional):\n\nThanks,",
);

export default function Services() {
  return (
    <>
      <Seo meta={pages.services} />
      <PageHero
        eyebrow="Services"
        title={
          <>
            We design and build software <span className="serif">that ships.</span>
          </>
        }
        intro="From a new SaaS product to the dashboard your operations team lives in, we take ideas from scope to production — with the engineering care we put into our own products."
      >
        <a href={projectMail} className="btn btn--primary">
          <Mail aria-hidden="true" />
          Discuss a project
        </a>
        <Link to="/portfolio" className="btn btn--ghost">
          See our work
        </Link>
      </PageHero>

      <section className="section" style={{ paddingTop: 16 }} aria-label="What we do">
        <div className="container">
          <ServiceCards detailed />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="process-title">
        <div className="container">
          <SectionHead id="process-title" eyebrow="How we work" title="A clear process, no surprises." intro="Short iterations and working software you can see early." />
          <Reveal className="flow">
            {process.map((p, i) => (
              <div key={p.title} className="flow__step">
                <span className="flow__num">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="proof-title">
        <div className="container split">
          <Reveal className="split__copy">
            <span className="eyebrow">Proof, not promises</span>
            <h2 id="proof-title">Our own SaaS is the best example of how we build.</h2>
            <p className="lead">
              The TechOdos Restaurant Platform is multi-tenant SaaS with real-time order tracking, payment gateway integrations, email and push
              notifications, role-based admin screens and exportable reports — the same skills we bring to your project.
            </p>
            <div className="page-hero__actions">
              <Link to="/products/restaurant-platform" className="btn btn--ghost">
                Explore the platform
              </Link>
              <Link to="/portfolio" className="text-link" style={{ alignSelf: "center" }}>
                Case study <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal className="split__media" delay={0.1}>
            <Tilt>
              <BrowserFrame screen={screens.adminSettings} url="your-restaurant.com/admin/settings" />
            </Tilt>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Running a restaurant? <span className="serif">Start here.</span>
          </>
        }
        text="If you're here for our Restaurant Platform, the fastest way to see it is a free demo. For any other project, email us and tell us what you're building."
      />
    </>
  );
}
