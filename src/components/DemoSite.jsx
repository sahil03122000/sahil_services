import React from "react";
import {Check, Clock, MapPin, Phone, Star} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {TEMPLATES} from "../demo/templates";

const initials = name =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("") || "B";

/* A sample website for the visitor's business. Purely visual — nothing
   inside is a real link. Layout adapts to the frame via container queries. */
export default function DemoSite({details}) {
  const t = TEMPLATES[details.type];
  const city = details.city || "your city";
  const fill = text => text.replace("{city}", city);
  const phone = details.phone || "98XXX XXXXX";
  const HeroIcon = t.Icon;

  return (
    <div className="ds" style={{"--ds": details.color}}>
      <header className="ds-nav">
        <span className="ds-logo">
          <span className="ds-logo__mark">{initials(details.name)}</span>
          {details.name}
        </span>
        <nav className="ds-nav__links" aria-hidden="true">
          <span>Home</span>
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
        </nav>
        <span className="ds-btn ds-btn--sm">{t.cta}</span>
      </header>

      <section className="ds-hero">
        <div className="ds-hero__copy">
          <span className="ds-pill">
            <MapPin size={13} /> {city}
          </span>
          <h1>{t.headline}</h1>
          <p>{fill(t.sub)}</p>
          <div className="ds-hero__actions">
            <span className="ds-btn">{t.cta}</span>
            <span className="ds-btn ds-btn--ghost">
              <Phone size={15} /> Call now
            </span>
          </div>
          <ul className="ds-highlights">
            {t.highlights.map(h => (
              <li key={h}>
                <Check size={15} strokeWidth={3} /> {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="ds-hero__visual">
          <div className="ds-hero__art">
            <HeroIcon size={88} strokeWidth={1.4} />
          </div>
          <div className="ds-rating">
            <span className="ds-rating__stars">
              {[0, 1, 2, 3, 4].map(i => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </span>
            <small>Your Google reviews here</small>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2>{t.servicesTitle}</h2>
        <div className="ds-grid">
          {t.services.map(({Icon, title, text}) => (
            <div key={title} className="ds-card">
              <span className="ds-card__icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section ds-info">
        <div className="ds-info__item">
          <MapPin size={20} />
          <div>
            <b>Visit us</b>
            <small>Main Market, {city}</small>
          </div>
        </div>
        <div className="ds-info__item">
          <Clock size={20} />
          <div>
            <b>Timings</b>
            <small>{t.hours}</small>
          </div>
        </div>
        <div className="ds-info__item">
          <Phone size={20} />
          <div>
            <b>Call us</b>
            <small>{phone}</small>
          </div>
        </div>
      </section>

      <section className="ds-cta">
        <h2>Ready to visit {details.name}?</h2>
        <p>Message us on WhatsApp — we reply quickly.</p>
        <span className="ds-btn ds-btn--white">
          <WhatsAppIcon size={16} /> Chat on WhatsApp
        </span>
      </section>

      <footer className="ds-footer">
        © {new Date().getFullYear()} {details.name}, {city}
      </footer>
    </div>
  );
}
