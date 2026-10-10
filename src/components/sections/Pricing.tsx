import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { plans } from "../../content/plans";
import { Reveal } from "../ui/Reveal";

export function PricingPlans() {
  return (
    <>
      <div className="plans">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08} className={`plan ${plan.highlight ? "plan--highlight" : ""}`} as="article">
            {plan.highlight && <span className="plan__badge">Most popular choice</span>}
            <h3>{plan.name}</h3>
            <p className="plan__tagline">{plan.tagline}</p>
            <p className="plan__price">Custom pricing</p>
            <p className="plan__best">Best for: {plan.bestFor}</p>
            <p className="plan__includes">{plan.includesFrom ? `Everything in ${plan.includesFrom}, plus:` : "Includes:"}</p>
            <ul className="checklist">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to={`/book-demo?plan=${encodeURIComponent(plan.name)}`}
              className={`btn ${plan.highlight ? "btn--primary" : "btn--ghost"} btn--block`}
            >
              Book a free demo
            </Link>
          </Reveal>
        ))}
      </div>
      <p className="pricing-note">
        Every restaurant is different, so we quote after a short demo — based on branches, the features you need and the setup help you want.
      </p>
    </>
  );
}
