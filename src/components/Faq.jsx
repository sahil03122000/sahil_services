import React, {useState} from "react";
import {ChevronDown} from "lucide-react";
import {Reveal} from "../hooks/useReveal";

const faqs = [
  {
    q: "Is the calculator price final?",
    a: "It's a close estimate. After a quick free call I send a fixed quote, so you know the exact price before any work starts."
  },
  {
    q: "How long does it take?",
    a: "A standard business website is usually live in 7–10 days. Booking systems and apps take a few weeks — the calculator shows a typical timeline."
  },
  {
    q: "Do I need to buy a domain and hosting?",
    a: "I help you choose and set them up. They're registered in your name, so you always own your website."
  },
  {
    q: "Can I make changes later?",
    a: "Yes. Send a WhatsApp message for changes to prices, photos or timings, or add an admin panel to edit content yourself."
  },
  {
    q: "Will my website show on Google?",
    a: "Every site is set up with the SEO basics and can be linked to your Google Business Profile, so customers searching nearby can find you."
  },
  {
    q: "Do ad prices include the ad budget?",
    a: "No. The monthly fee covers planning, creating and managing your ads. The ad budget itself — as little or as much as you like — is paid directly to Google or Meta."
  },
  {
    q: "Can I take only SEO, a logo or banners — without a website?",
    a: "Yes. Choose \"Only branding / marketing\" in the price calculator and pick just the services you need."
  },
  {
    q: "Do you make t-shirts, mugs and visiting cards?",
    a: "Yes, for businesses. I design your branded merchandise — staff t-shirts, hoodies, caps, mugs, visiting cards, ID cards — and get it printed through my trusted print partner. Price and delivery time depend on the item and quantity, so you get a clear quote first."
  },
  {
    q: "How do payments work?",
    a: "Payment terms are agreed in your quote before work starts — clear and simple, with no hidden charges."
  }
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--tint" id="faq" aria-labelledby="faq-title">
      <div className="container faq-wrap">
        <Reveal className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="section-title">
            Questions, <em>answered</em>
          </h2>
          <p className="section-lead">
            Something else on your mind? Ask me on WhatsApp — I reply quickly.
          </p>
        </Reveal>

        <div className="faq">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="faq__answer"
                >
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
