import { ArrowRight, CalendarCheck, Code2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { mailto, site } from "../config/site";
import { pages } from "../content/seo";
import { Reveal } from "../components/ui/Reveal";
import { PageHero } from "../components/ui/Section";
import { Seo } from "../components/ui/Seo";

export default function Contact() {
  return (
    <>
      <Seo
        meta={pages.contact}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: pages.contact.title,
          mainEntity: { "@type": "Organization", name: site.name, email: site.email },
        }}
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's <span className="serif">talk.</span>
          </>
        }
        intro="Questions about the Restaurant Platform, a project in mind, or just want to see what we've built? Email us — a real person reads every message."
      >
        <a href={`mailto:${site.email}`} className="contact-email">
          <Mail aria-hidden="true" />
          {site.email}
        </a>
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }} aria-label="Ways to get in touch">
        <div className="container grid grid--3">
          <Reveal as="article" className="card">
            <div className="icon-badge">
              <CalendarCheck aria-hidden="true" />
            </div>
            <h2 style={{ fontSize: "1.15rem", marginBottom: 8 }}>Book a free demo</h2>
            <p>See the Restaurant Platform with a walkthrough focused on your restaurant.</p>
            <Link to="/book-demo" className="text-link">
              Request a demo <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal as="article" className="card" delay={0.06}>
            <div className="icon-badge">
              <Code2 aria-hidden="true" />
            </div>
            <h2 style={{ fontSize: "1.15rem", marginBottom: 8 }}>Start a project</h2>
            <p>Tell us about the SaaS, web app or dashboard you want to build.</p>
            <a
              href={mailto("Project enquiry — TechOdos", "Hi TechOdos,\n\nI'd like to talk about a project.\n\nWhat we want to build:\n\nTimeline:\n\nThanks,")}
              className="text-link"
            >
              Email about a project <ArrowRight aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal as="article" className="card" delay={0.12}>
            <div className="icon-badge">
              <Mail aria-hidden="true" />
            </div>
            <h2 style={{ fontSize: "1.15rem", marginBottom: 8 }}>General questions</h2>
            <p>Partnerships, press or anything else — the same inbox reaches us.</p>
            <a href={mailto("Hello TechOdos")} className="text-link">
              Send an email <ArrowRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
