import React from "react";
import {ArrowRight, Check, ShieldCheck} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {PLANS, whatsappUrl} from "../config";
import {Reveal} from "../hooks/useReveal";

const inr = n => `₹${n.toLocaleString("en-IN")}`;

function packagePrice(plan) {
  return plan.offer
    ? `${inr(plan.offer.price)} for the first ${plan.offer.months} months, then ${inr(plan.price)}/month`
    : `${inr(plan.price)} one-time`;
}

const packageMessage = plan =>
  `Hi Sahil, I'm interested in the ${plan.name} package (${packagePrice(plan)}). My business: `;

const careMessage = plan =>
  `Hi Sahil, I'd like the ${plan.name} plan (${inr(plan.price)}/month) for my website. My business: `;

function Features({items}) {
  return (
    <ul className="plan__features">
      {items.map(feature => (
        <li key={feature}>
          <Check size={16} strokeWidth={3} aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
  );
}

export default function Plans() {
  return (
    <section className="section section--plans" id="plans" aria-labelledby="plans-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Plans &amp; packages</p>
          <h2 id="plans-title" className="section-title">
            Get your website, <em>your way</em>
          </h2>
          <p className="section-lead">
            Pay once and own it, or start small with a monthly plan. Domain,
            hosting and Google listing included either way.
          </p>
        </Reveal>

        <div className="plans plans--two">
          {PLANS.packages.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90} className={`plan ${plan.popular ? "plan--popular" : ""}`}>
              {plan.popular && <span className="plan__badge">Best value</span>}
              <p className="plan__tag">{plan.tag}</p>
              <h3 className="plan__name">{plan.name}</h3>
              <p className="plan__for">{plan.for}</p>

              <div className="plan__price">
                {plan.offer ? (
                  <>
                    <p>
                      <b>{inr(plan.offer.price)}</b>
                      <span>for {plan.offer.months} months</span>
                    </p>
                    <small>then {inr(plan.price)}/month · {plan.priceNote}</small>
                  </>
                ) : (
                  <>
                    <p>
                      <b>{inr(plan.price)}</b>
                      <span>one-time</span>
                    </p>
                    <small>{plan.priceNote}</small>
                  </>
                )}
              </div>

              <Features items={plan.features} />

              <a
                className={`btn ${plan.popular ? "btn--primary" : "btn--outline"} plan__cta`}
                href={whatsappUrl(packageMessage(plan))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} />
                Choose {plan.name}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="plans__subhead">
          <h3>After launch: care plans</h3>
          <p>
            Optional monthly support once your free 3 months end. No plan? Each
            change is {PLANS.perChange}.
          </p>
        </Reveal>

        <div className="plans plans--care">
          {PLANS.care.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90} className={`plan plan--care ${plan.popular ? "plan--popular" : ""}`}>
              {plan.popular && <span className="plan__badge">Most popular</span>}
              <div className="plan__care-head">
                <h3 className="plan__name">{plan.name}</h3>
                <p className="plan__care-price">
                  <b>{inr(plan.price)}</b>/month
                </p>
              </div>
              <Features items={plan.features} />
              <a
                className="btn btn--outline btn--sm plan__cta"
                href={whatsappUrl(careMessage(plan))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                Choose {plan.name}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="plans__terms">
          <ShieldCheck size={18} aria-hidden="true" />
          {PLANS.terms.join(" · ")} · Domain &amp; hosting renewal from year 2: {PLANS.renewal}
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
