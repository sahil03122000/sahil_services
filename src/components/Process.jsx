import React from "react";
import {Code2, MessageSquareText, Rocket, ScrollText} from "lucide-react";
import {Reveal} from "../hooks/useReveal";

const steps = [
  {
    Icon: MessageSquareText,
    title: "Tell me your idea",
    text: "Message on WhatsApp or fill the form. A 10-minute chat is enough."
  },
  {
    Icon: ScrollText,
    title: "Get a clear quote",
    text: "Fixed scope, timeline and price — usually within 24 hours."
  },
  {
    Icon: Code2,
    title: "Watch it come alive",
    text: "You get a live preview link and suggest changes as we go."
  },
  {
    Icon: Rocket,
    title: "Launch & grow",
    text: "Your site goes live on your domain. I stay available for support."
  }
];

export default function Process() {
  return (
    <section className="section section--dark" id="process" aria-labelledby="process-title">
      <div className="dark-glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow eyebrow--light">How it works</p>
          <h2 id="process-title" className="section-title">
            From first message to <em>live website</em>
          </h2>
        </Reveal>

        <ol className="steps">
          {steps.map(({Icon, title, text}, i) => (
            <Reveal as="li" key={title} className="step" delay={i * 100}>
              <span className="step__num">0{i + 1}</span>
              <span className="step__icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
