import React from "react";
import {ArrowUpRight, Check} from "lucide-react";
import {Reveal} from "../hooks/useReveal";

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;

const sites = [
  {
    name: "HMR & Associates",
    kind: "Advisory & CA firm",
    text: "A professional website for an advisory and compliance firm — delivered end to end, from the first discussion to going live.",
    image: asset("hmra.jpg"),
    url: "https://hmraca.in/",
    domain: "hmraca.in"
  },
  {
    name: "Mahawar Samaj, Ateli",
    kind: "Community website",
    text: "A community website with events and updates, built to be simple to use and fast on mobile.",
    image: asset("mahavar-samaj.jpg"),
    url: "https://mahavarsamajateli.in/",
    domain: "mahavarsamajateli.in"
  }
];

const zicloPoints = [
  "Customer, worker, manager & admin logins",
  "Multi-step booking with date, time & location",
  "Razorpay online payments",
  "OTP login & push notifications",
  "Live map of field staff"
];

export default function Work() {
  return (
    <section className="section section--tint" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Recent work</p>
          <h2 id="work-title" className="section-title">
            Projects <em>built for clients</em>
          </h2>
        </Reveal>

        <div className="work-grid">
          {sites.map((site, i) => (
            <Reveal as="article" className="work-card" key={site.name} delay={i * 100}>
              <a
                className="work-card__shot"
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
              >
                <span className="work-card__bar">
                  <i />
                  <i />
                  <i />
                  <em>{site.domain}</em>
                </span>
                <img src={site.image} alt="" loading="lazy" width="960" height="448" />
              </a>
              <div className="work-card__body">
                <p className="work-card__kind">{site.kind}</p>
                <h3>{site.name}</h3>
                <p>{site.text}</p>
                <a className="link" href={site.url} target="_blank" rel="noopener noreferrer">
                  Visit {site.domain} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}

          <Reveal as="article" className="work-card work-card--app">
            <div className="work-card__phone">
              <img
                src={asset("ziclo-1.png")}
                alt="Ziclo app start screen"
                loading="lazy"
                width="360"
                height="700"
              />
            </div>
            <div className="work-card__body">
              <p className="work-card__kind">Client project · Mobile app</p>
              <h3>Ziclo</h3>
              <p className="work-card__status">In development</p>
              <p>
                An Android &amp; iPhone app I am building for a client, for booking
                solar and AC services. The planned features include:
              </p>
              <ul className="checks">
                {zicloPoints.map(point => (
                  <li key={point}>
                    <Check size={16} strokeWidth={3} aria-hidden="true" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
