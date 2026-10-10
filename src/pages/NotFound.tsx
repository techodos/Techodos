import { Link } from "react-router-dom";
import { pages } from "../content/seo";
import { DemoButton } from "../components/ui/Cta";
import { Seo } from "../components/ui/Seo";

export default function NotFound() {
  return (
    <section className="not-found">
      <Seo meta={pages.notFound} />
      <div className="container" style={{ display: "grid", gap: 20, justifyItems: "center" }}>
        <span className="eyebrow">404</span>
        <h1>
          Page <span className="serif">not found.</span>
        </h1>
        <p className="lead">The page you were looking for doesn't exist or has moved.</p>
        <div className="page-hero__actions" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn--ghost">
            Back to home
          </Link>
          <DemoButton />
        </div>
      </div>
    </section>
  );
}
