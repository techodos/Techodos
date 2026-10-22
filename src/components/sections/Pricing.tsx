import { ArrowRight, Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { PRICE_PERIOD, formatPrice, planCardFeatures, planFeatureGroups, planIncludes, plans, savingPercent } from "../../content/plans";
import { Reveal } from "../ui/Reveal";

export function PricingPlans({ compareHref = "/pricing#compare" }: { compareHref?: string }) {
  return (
    <>
      <Reveal className="earlybird">
        <span className="earlybird__tag">Early-bird pricing</span>
        <p>Launch prices for the first restaurants on the platform — up to {Math.max(...plans.map(savingPercent))}% off the regular price.</p>
      </Reveal>
      <div className="plans">
        {plans.map((plan, i) => (
          <Reveal
            key={plan.id}
            delay={i * 0.08}
            className={`plan plan--${plan.id} ${plan.highlight ? "plan--highlight" : ""}`}
            as="article"
          >
            {plan.highlight && <span className="plan__badge">Most popular</span>}
            <div className="plan__head">
              <h3>{plan.name}</h3>
              <p className="plan__headline">{plan.headline}</p>
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
            <p className="plan__desc">{plan.description}</p>
            <dl className="plan__facts">
              <div>
                <dt>Orders</dt>
                <dd>{plan.orders}</dd>
              </div>
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
              {planCardFeatures(plan).map((f) => (
                <li key={f.label}>
                  <Check aria-hidden="true" />
                  {f.label}
                </li>
              ))}
            </ul>
            <Link
              to={`/book-demo?plan=${encodeURIComponent(plan.name)}`}
              className={`btn ${plan.highlight ? "btn--primary" : "btn--ghost"} btn--block`}
            >
              {plan.cta}
            </Link>
          </Reveal>
        ))}
      </div>
      <p className="pricing-note">
        Every plan starts with a free demo of the platform running a real demo restaurant. Prices are per restaurant, {PRICE_PERIOD}.{" "}
        <a href={compareHref} className="pricing-note__link">
          Compare every feature
          <ArrowRight aria-hidden="true" />
        </a>
      </p>
    </>
  );
}

/** Feature-by-plan table, grouped. Reads the same feature list as the cards, so the two always agree. */
export function PlanComparison() {
  const cols = plans.length + 1;
  return (
    <div className="compare" role="region" aria-label="Compare plans" tabIndex={0}>
      <table>
        <caption className="sr-only">Which features each plan includes</caption>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            {plans.map((plan) => (
              <th scope="col" key={plan.id} className={plan.highlight ? "is-highlight" : undefined}>
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
            <th scope="row">New orders arrive</th>
            {plans.map((plan) => (
              <td key={plan.id} className={`compare__text ${plan.highlight ? "is-highlight" : ""}`}>
                {plan.orders}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row">Branches</th>
            {plans.map((plan) => (
              <td key={plan.id} className={`compare__text ${plan.highlight ? "is-highlight" : ""}`}>
                {plan.scope}
              </td>
            ))}
          </tr>
        </tbody>
        {planFeatureGroups.map((group) => (
          <tbody key={group.id}>
            <tr className="compare__group">
              <th scope="colgroup" colSpan={cols}>
                <span>{group.label}</span>
              </th>
            </tr>
            {group.features.map((feature) => (
              <tr key={feature.label}>
                <th scope="row">{feature.label}</th>
                {plans.map((plan) => (
                  <td key={plan.id} className={plan.highlight ? "is-highlight" : undefined}>
                    {planIncludes(plan, feature) ? (
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
        ))}
      </table>
    </div>
  );
}
