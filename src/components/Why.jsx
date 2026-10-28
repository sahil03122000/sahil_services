import React from "react";
import {BadgeCheck, Gauge, KeyRound, MapPin, Search, Smartphone} from "lucide-react";
import {Reveal} from "../hooks/useReveal";

const reasons = [
  {
    Icon: Smartphone,
    title: "Mobile-first",
    text: "Most customers open your site on a phone — so it's designed for phones first."
  },
  {
    Icon: Gauge,
    title: "Loads in a blink",
    text: "Fast even on slow mobile data, so visitors don't leave."
  },
  {
    Icon: Search,
    title: "Found on Google",
    text: "SEO basics and Google Business Profile, so nearby customers find you."
  },
  {
    Icon: KeyRound,
    title: "You own it",
    text: "Your domain, your content, your website — always in your name."
  },
  {
    Icon: BadgeCheck,
    title: "Professional quality",
    text: "Built by a full-time software engineer who ships large, live systems."
  },
  {
    Icon: MapPin,
    title: "Local & reachable",
    text: "Gurgaon, Rewari, Narnaul, Mahendergarh — I can meet you in person."
  }
];

export default function Why() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Why work with me</p>
          <h2 id="why-title" className="section-title">
            Agency quality, <em>without the agency price</em>
          </h2>
          <p className="section-lead">
            You talk directly to the person building your website — no sales
            team, no middlemen.
          </p>
        </Reveal>

        <div className="why-grid">
          {reasons.map(({Icon, title, text}, i) => (
            <Reveal key={title} className="why-card" delay={(i % 3) * 80}>
              <span className="why-card__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
