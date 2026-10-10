import { BarChart3, CalendarCheck, ChefHat, MessageCircleQuestion, Smartphone, UtensilsCrossed } from "lucide-react";
import { pages } from "../content/seo";
import { DemoForm } from "../components/demo/DemoForm";
import { EmailLink } from "../components/ui/Cta";
import { Seo } from "../components/ui/Seo";

const agenda = [
  { icon: Smartphone, title: "Your guests' experience", text: "The ordering website on phone and desktop, from menu to checkout and live tracking." },
  { icon: UtensilsCrossed, title: "Menu & buffet setup", text: "Categories, variants, add-ons, buffet packages and pricing rules." },
  { icon: ChefHat, title: "Service in action", text: "How orders reach the dashboard and kitchen view, and how guests are notified." },
  { icon: CalendarCheck, title: "Reservations", text: "Branches, time slots and booking confirmations." },
  { icon: BarChart3, title: "Reports & settings", text: "Sales reports, exports, payments, tax and service fees." },
  { icon: MessageCircleQuestion, title: "Your questions", text: "Setup, plans and pricing for your restaurant." },
];

export default function BookDemo() {
  return (
    <>
      <Seo meta={pages.demo} />
      <section className="page-hero" aria-labelledby="demo-title" style={{ paddingBottom: "clamp(72px, 10vw, 120px)" }}>
        <div className="hero__grid" aria-hidden="true" />
        <div className="container form-shell">
          <div className="form-shell__aside fade-up">
            <span className="eyebrow">Free demo</span>
            <h1 id="demo-title" style={{ fontSize: "clamp(2.3rem, 4.6vw, 3.6rem)", letterSpacing: "-0.045em" }}>
              See the platform <span className="serif grad-text">with your restaurant in mind.</span>
            </h1>
            <p className="lead">A free, no-obligation walkthrough of the TechOdos Restaurant Platform. Here's what we'll cover:</p>
            <ul className="side-list">
              {agenda.map((a) => (
                <li key={a.title}>
                  <a.icon aria-hidden="true" />
                  <span>
                    <strong>{a.title}</strong>
                    <span>{a.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: "0.9rem" }}>
              Prefer to write to us directly? <EmailLink />
            </p>
          </div>
          <div className="fade-up fade-up--late">
            <DemoForm />
          </div>
        </div>
      </section>
    </>
  );
}
