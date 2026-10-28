import React from "react";
import {Calculator} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {whatsappUrl} from "../config";
import {Reveal} from "../hooks/useReveal";

export default function CtaBanner() {
  return (
    <section className="cta-wrap" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta">
          <span className="cta__ring cta__ring--1" aria-hidden="true" />
          <span className="cta__ring cta__ring--2" aria-hidden="true" />
          <div className="cta__copy">
            <h2 id="cta-title">Ready to get more customers?</h2>
            <p>
              Tell me about your business — I'll suggest what will actually help
              and send a free quote within 24 hours.
            </p>
          </div>
          <div className="cta__actions">
            <a
              className="btn btn--light btn--lg"
              href={whatsappUrl("Hi Sahil, I'd like to grow my business online.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} /> Chat on WhatsApp
            </a>
            <a className="btn btn--glass btn--lg" href="#pricing">
              <Calculator size={20} aria-hidden="true" /> Check your price
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
