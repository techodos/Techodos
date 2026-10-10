import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { DemoButton } from "../ui/Cta";
import { LogoMark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__about">
            <Link to="/" className="brand" aria-label="TechOdos home">
              <LogoMark />
              <span>TechOdos</span>
            </Link>
            <p>We design, build and run SaaS products and custom web software. Our flagship is the TechOdos Restaurant Platform.</p>
            <DemoButton size="sm" />
          </div>
          <nav aria-labelledby="f-product">
            <h2 id="f-product">Product</h2>
            <ul>
              <li><Link to="/products/restaurant-platform">Restaurant Platform</Link></li>
              <li><Link to="/products/restaurant-platform#features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/book-demo">Book a free demo</Link></li>
            </ul>
          </nav>
          <nav aria-labelledby="f-company">
            <h2 id="f-company">Company</h2>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link to="/contact">Contact page</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} TechOdos. All rights reserved.</span>
          <span>Software &amp; SaaS Solutions</span>
        </div>
      </div>
    </footer>
  );
}
