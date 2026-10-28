import React from "react";
import {ArrowRight, Check, Clock, MapPin, Phone, Quote, Star} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {TEMPLATES} from "../demo/templates";
import {PEOPLE, REVIEWS, WIDGETS} from "../demo/extras";
import {initials} from "../demo/utils";

const LogoMark = ({details}) =>
  details.logo ? (
    <span className="ds-logo__mark ds-logo__mark--img">
      <img src={details.logo} alt="" />
    </span>
  ) : (
    <span className="ds-logo__mark">{initials(details.name)}</span>
  );

/* The hero's "live" card — a booking form or a price list, per business type. */
function HeroWidget({widget, fill}) {
  return (
    <div className="ds-widget">
      <p className="ds-widget__title">
        <span className="ds-live" /> {widget.title}
      </p>
      {widget.kind === "form" ? (
        <>
          {widget.fields.map(f => (
            <div key={f.label} className="ds-field">
              <small>{f.label}</small>
              <span>{fill(f.value)}</span>
            </div>
          ))}
          <small className="ds-widget__label">{widget.chips.label}</small>
          <div className="ds-chips">
            {widget.chips.items.map((c, i) => (
              <span key={c} className={i === widget.chips.active ? "is-on" : ""}>
                {c}
              </span>
            ))}
          </div>
        </>
      ) : (
        <ul className="ds-prices">
          {widget.items.map(item => (
            <li key={item.name}>
              <span>
                {item.name}
                {item.tag && <em>{item.tag}</em>}
              </span>
              <span>
                {item.old && <s>{item.old}</s>}
                <b>{item.price}</b>
              </span>
            </li>
          ))}
        </ul>
      )}
      <span className="ds-btn ds-btn--block">
        {widget.button} <ArrowRight size={16} />
      </span>
    </div>
  );
}

/* A sample website for the visitor's business. Purely visual — nothing
   inside is a real link. Layout adapts to the frame via container queries. */
export default function DemoSite({details}) {
  const t = TEMPLATES[details.type];
  const widget = WIDGETS[details.type];
  const city = details.city || "your city";
  const fill = text => text.replace("{city}", city);
  const phone = details.phone || "98XXX XXXXX";
  const HeroIcon = t.Icon;

  return (
    <div className="ds" style={{"--ds": details.color}}>
      <div className="ds-topbar">
        <span>
          <span className="ds-open" />{" "}
          {t.hours.startsWith("Open")
            ? t.hours.split("·")[0].trim()
            : `Open today · ${t.hours.split("·")[1]?.trim() || t.hours}`}
        </span>
        <span className="ds-topbar__phone">
          <Phone size={13} /> {phone}
        </span>
      </div>

      <header className="ds-nav">
        <span className="ds-logo">
          <LogoMark details={details} />
          <span className="ds-logo__name">{details.name}</span>
        </span>
        <nav className="ds-nav__links" aria-hidden="true">
          <span>Home</span>
          <span>Services</span>
          <span>Gallery</span>
          <span>Reviews</span>
          <span>Contact</span>
        </nav>
        <span className="ds-btn ds-btn--sm">{t.cta}</span>
      </header>

      <section className="ds-hero">
        <div className="ds-hero__glow" />
        <div className="ds-hero__copy">
          <span className="ds-pill">
            <MapPin size={13} /> #1 choice in {city}
          </span>
          <h1>
            {t.headline.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="ds-accent">{t.headline.split(" ").slice(-2).join(" ")}</span>
          </h1>
          <p>{fill(t.sub)}</p>
          <div className="ds-hero__actions">
            <span className="ds-btn">{t.cta}</span>
            <span className="ds-btn ds-btn--ghost">
              <Phone size={15} /> Call now
            </span>
          </div>
          <div className="ds-proof">
            <span className="ds-avatars">
              {["R", "P", "A", "S"].map(l => (
                <i key={l}>{l}</i>
              ))}
            </span>
            <span>
              <span className="ds-stars">
                {[0, 1, 2, 3, 4].map(i => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </span>
              <small>Loved by 5,000+ {PEOPLE[details.type]}</small>
            </span>
          </div>
        </div>

        <div className="ds-hero__visual">
          <div className="ds-hero__art">
            <HeroIcon size={120} strokeWidth={1.2} />
          </div>
          <HeroWidget widget={widget} fill={fill} />
        </div>
      </section>

      <section className="ds-stats">
        <div>
          <b>10+</b>
          <small>Years of trust</small>
        </div>
        <div>
          <b>5,000+</b>
          <small>Happy {PEOPLE[details.type]}</small>
        </div>
        <div>
          <b>4.9★</b>
          <small>Google rating</small>
        </div>
        <div>
          <b>24×7</b>
          <small>WhatsApp support</small>
        </div>
      </section>

      <section className="ds-section">
        <p className="ds-kicker">What we offer</p>
        <h2>{t.servicesTitle}</h2>
        <div className="ds-grid">
          {t.services.map(({Icon, title, text}) => (
            <div key={title} className="ds-card">
              <span className="ds-card__icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="ds-card__more">
                Know more <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section ds-steps-wrap">
        <p className="ds-kicker">Simple & quick</p>
        <h2>How it works</h2>
        <ol className="ds-steps">
          <li>
            <i>1</i>
            <b>Choose</b>
            <small>Pick the service you need</small>
          </li>
          <li>
            <i>2</i>
            <b>{t.cta}</b>
            <small>Online or on WhatsApp in seconds</small>
          </li>
          <li>
            <i>3</i>
            <b>Get confirmed</b>
            <small>Instant confirmation on your phone</small>
          </li>
        </ol>
      </section>

      <section className="ds-section">
        <p className="ds-kicker">Gallery</p>
        <h2>Take a look inside</h2>
        <div className="ds-gallery">
          {t.services.map(({Icon, title}, i) => (
            <div key={title} className={`ds-gallery__tile ds-gallery__tile--${i}`}>
              <Icon size={36} strokeWidth={1.5} />
              <small>{title}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section ds-reviews-wrap">
        <p className="ds-kicker">Reviews</p>
        <h2>What people say</h2>
        <div className="ds-reviews">
          {REVIEWS.map(r => (
            <figure key={r.name} className="ds-review">
              <Quote size={22} className="ds-review__q" />
              <span className="ds-stars">
                {[0, 1, 2, 3, 4].map(i => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </span>
              <blockquote>{fill(r.text)}</blockquote>
              <figcaption>
                <i>{r.name[0]}</i> {r.name}
              </figcaption>
            </figure>
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
        <p>Message us on WhatsApp — we reply in minutes.</p>
        <div className="ds-cta__actions">
          <span className="ds-btn ds-btn--white">
            <WhatsAppIcon size={16} /> Chat on WhatsApp
          </span>
          <span className="ds-btn ds-btn--outline">
            <Check size={16} /> {t.cta}
          </span>
        </div>
      </section>

      <footer className="ds-footer">
        <span className="ds-logo">
          <LogoMark details={details} />
          <span className="ds-logo__name">{details.name}</span>
        </span>
        <small>
          © {new Date().getFullYear()} {details.name}, {city}
        </small>
      </footer>

      <span className="ds-wa" aria-hidden="true">
        <WhatsAppIcon size={26} />
      </span>
    </div>
  );
}
