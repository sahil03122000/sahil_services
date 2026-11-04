import React from "react";
import {ArrowRight, Check, ShieldCheck} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {MONTHLY_PLANS, whatsappUrl} from "../config";
import {Reveal} from "../hooks/useReveal";

const inr = n => `₹${n.toLocaleString("en-IN")}`;

function planMessage(plan) {
  const price = plan.offer
    ? `${inr(plan.offer.price)} for the first ${plan.offer.months} months, then ${inr(plan.price)}/month`
    : `${inr(plan.price)}/month`;
  return `Hi Sahil, I'm interested in the ${plan.name} monthly plan (${price}). My business: `;
}

export default function Plans() {
  return (
    <section className="section section--plans" id="plans" aria-labelledby="plans-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Monthly plans</p>
          <h2 id="plans-title" className="section-title">
            Your website, <em>one small monthly fee</em>
          </h2>
          <p className="section-lead">
            No big payment upfront. Website, domain, hosting and Google — all
            looked after every month.
          </p>
        </Reveal>

        <div className="plans">
          {MONTHLY_PLANS.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90} className={`plan ${plan.popular ? "plan--popular" : ""}`}>
              {plan.popular && <span className="plan__badge">Most popular</span>}
              <h3 className="plan__name">{plan.name}</h3>
              <p className="plan__for">{plan.for}</p>

              <div className="plan__price">
                {plan.offer ? (
                  <>
                    <p>
                      <b>{inr(plan.offer.price)}</b>
                      <span>for {plan.offer.months} months</span>
                    </p>
                    <small>then {inr(plan.price)}/month</small>
                  </>
                ) : (
                  <>
                    <p>
                      <b>{inr(plan.price)}</b>
                      <span>/month</span>
                    </p>
                    <small>billed monthly</small>
                  </>
                )}
              </div>

              <ul className="plan__features">
                {plan.features.map(feature => (
                  <li key={feature}>
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                className={`btn ${plan.popular ? "btn--primary" : "btn--outline"} plan__cta`}
                href={whatsappUrl(planMessage(plan))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} />
                Choose {plan.name}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="plans__terms">
          <ShieldCheck size={18} aria-hidden="true" />
          {MONTHLY_PLANS.terms.join(" · ")}
        </Reveal>

        <Reveal className="plans__custom">
          <p>
            <b>Need online booking, a store, an app or software?</b>
            <span>Those are custom projects — check the price in the calculator.</span>
          </p>
          <a className="btn btn--light" href="#pricing">
            Custom price calculator
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
