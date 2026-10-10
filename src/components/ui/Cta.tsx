import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Reveal } from "./Reveal";

/** The primary call to action, used everywhere the site asks for a demo. */
export function DemoButton({ label = "Book a free demo", className = "", size }: { label?: string; className?: string; size?: "sm" }) {
  return (
    <Link to="/book-demo" className={`btn btn--primary ${size === "sm" ? "btn--sm" : ""} ${className}`}>
      {label}
      <ArrowRight className="arrow" aria-hidden="true" />
    </Link>
  );
}

export function EmailLink({ className = "inline-link" }: { className?: string }) {
  return (
    <a href={`mailto:${site.email}`} className={className}>
      {site.email}
    </a>
  );
}

export function CtaBand({
  title = (
    <>
      See it running for <span className="serif">your</span> restaurant.
    </>
  ),
  text = "Book a free, no-obligation demo. We'll walk you through the ordering website, the kitchen view and the admin dashboard, and answer every question about setup and pricing.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  return (
    <section className="section section--tight" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta-band">
          <div className="cta-band__orb" aria-hidden="true" />
          <div>
            <h2 id="cta-title">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-band__actions">
            <DemoButton />
            <a href={`mailto:${site.email}`} className="btn btn--ghost">
              <Mail aria-hidden="true" />
              Email us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
