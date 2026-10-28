import React from "react";
import {BadgeCheck, GraduationCap, MapPin, MessageCircleHeart} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {CONTACT, whatsappUrl} from "../config";
import {Reveal} from "../hooks/useReveal";

const facts = [
  {Icon: BadgeCheck, title: "3+ years as a software engineer", text: "I build large, live systems used by thousands of people every day."},
  {Icon: GraduationCap, title: "B.Tech, Computer Science", text: "Studied in Ateli and Mahendergarh — I know local businesses here."},
  {Icon: MapPin, title: "Based in Gurgaon", text: "Happy to meet in Gurgaon, Rewari, Narnaul, Mahendergarh and Ateli."},
  {Icon: MessageCircleHeart, title: "You talk to me directly", text: "No sales team or middlemen — the person you talk to builds your project."}
];

const photoSrc = CONTACT.photo ? `${import.meta.env.BASE_URL}assets/${CONTACT.photo}` : null;

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about__visual">
          <div className="about__frame">
            {photoSrc ? (
              <img src={photoSrc} alt={`${CONTACT.name}, web & app developer`} width="480" height="560" />
            ) : (
              <div className="about__avatar" role="img" aria-label={CONTACT.name}>
                <span>SG</span>
              </div>
            )}
          </div>
          <div className="about__badge">
            <span className="about__badge-dot" aria-hidden="true" />
            Replies within 24 hours
          </div>
        </Reveal>

        <Reveal className="about__copy" delay={100}>
          <p className="eyebrow">About me</p>
          <h2 id="about-title" className="section-title">
            Hi, I'm Sahil — <em>your tech partner</em>
          </h2>
          <p className="about__lead">
            I'm a professional software engineer who also helps local businesses
            get online. Whether it's your first website, a booking system, an
            app, or getting found on Google — I'll handle it end to end and
            explain everything in simple words, in Hindi or English.
          </p>

          <ul className="about__facts">
            {facts.map(({Icon, title, text}) => (
              <li key={title}>
                <span className="about__fact-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span>
                  <b>{title}</b>
                  <small>{text}</small>
                </span>
              </li>
            ))}
          </ul>

          <a
            className="btn btn--whatsapp"
            href={whatsappUrl("Hi Sahil, I'd like to talk about my business.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> Talk to me on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
