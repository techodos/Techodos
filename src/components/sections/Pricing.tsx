import { Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { PRICE_PERIOD, comparisonRows, formatPrice, plans, savingPercent } from "../../content/plans";
import { Reveal } from "../ui/Reveal";

export function PricingPlans() {
  return (
    <>
      <Reveal className="earlybird">
        <span className="earlybird__tag">Early-bird pricing</span>
        <p>Launch prices for the first restaurants on the platform — up to {Math.max(...plans.map(savingPercent))}% off the regular price.</p>
      </Reveal>
      <div className="plans">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08} className={`plan ${plan.highlight ? "plan--highlight" : ""}`} as="article">
            {plan.highlight && <span className="plan__badge">Most popular</span>}
            <div className="plan__head">
              <h3>{plan.name}</h3>
              <p className="plan__tagline">{plan.tagline}</p>
            </div>
            <div className="plan__pricing">
              <p className="plan__price">
                <span className="plan__amount">{formatPrice(plan.price)}</span>
                <span className="plan__period">{PRICE_PERIOD}</span>
              </p>
              <p className="plan__list">
                <s>
                  <span className="sr-only">Regular price </span>
                  {formatPrice(plan.listPrice)}
                </s>
                <span className="plan__save">Save {savingPercent(plan)}%</span>
              </p>
            </div>
            <dl className="plan__facts">
              <div>
                <dt>Covers</dt>
                <dd>{plan.scope}</dd>
              </div>
              <div>
                <dt>Best for</dt>
                <dd>{plan.bestFor}</dd>
              </div>
            </dl>
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
              Start with {plan.name}
            </Link>
          </Reveal>
        ))}
      </div>
      <p className="pricing-note">
        Every plan starts with a free demo of the platform running a real demo restaurant. Prices are per restaurant, {PRICE_PERIOD}.
      </p>
    </>
  );
}

/** Feature-by-plan table. A feature is included from its plan onwards (each plan includes the one before it). */
export function PlanComparison() {
  const rows = comparisonRows();
  return (
    <div className="compare" role="region" aria-label="Compare plans" tabIndex={0}>
      <table>
        <caption className="sr-only">Which features each plan includes</caption>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            {plans.map((plan) => (
              <th scope="col" key={plan.name} className={plan.highlight ? "is-highlight" : undefined}>
                <span className="compare__plan">{plan.name}</span>
                <span className="compare__price">
                  {formatPrice(plan.price)} <s>{formatPrice(plan.listPrice)}</s>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Branches</th>
            {plans.map((plan) => (
              <td key={plan.name} className={plan.highlight ? "is-highlight" : undefined}>
                {plan.scope}
              </td>
            ))}
          </tr>
          {rows.map((row) => (
            <tr key={row.feature}>
              <th scope="row">{row.feature}</th>
              {plans.map((plan, index) => (
                <td key={plan.name} className={plan.highlight ? "is-highlight" : undefined}>
                  {index >= row.from ? (
                    <>
                      <Check className="compare__yes" aria-hidden="true" />
                      <span className="sr-only">Included</span>
                    </>
                  ) : (
                    <>
                      <Minus className="compare__no" aria-hidden="true" />
                      <span className="sr-only">Not included</span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
