import React from "react";
import {Quote} from "lucide-react";
import {CLIENT_REVIEWS} from "../config";
import {Reveal} from "../hooks/useReveal";

/* Real client reviews from src/config.js. Hidden while the list is empty. */
export default function ClientReviews() {
  if (!CLIENT_REVIEWS.length) return null;

  return (
    <section className="section" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Client reviews</p>
          <h2 id="reviews-title" className="section-title">
            What clients <em>say</em>
          </h2>
        </Reveal>
        <div className="client-reviews">
          {CLIENT_REVIEWS.map((review, i) => (
            <Reveal as="figure" key={review.name} className="client-review" delay={i * 100}>
              <Quote size={28} aria-hidden="true" />
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <b>{review.name}</b>
                <small>{review.business}</small>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
