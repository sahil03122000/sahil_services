import React, {useEffect, useMemo, useRef, useState} from "react";
import {ArrowRight, Check, Clock, Minus, Plus} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {PRICING, whatsappUrl} from "../config";
import {Reveal} from "../hooks/useReveal";

const inr = n => `₹${Math.round(n).toLocaleString("en-IN")}`;
const roundTo500 = n => Math.round(n / 500) * 500;

/* Animates a number towards `value` whenever it changes. */
function useCountUp(value, duration = 450) {
  const [display, setDisplay] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      from.current = value;
      setDisplay(value);
      return undefined;
    }
    const start = performance.now();
    const initial = from.current;
    let frame;
    const tick = now => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = initial + (value - initial) * eased;
      setDisplay(next);
      from.current = next;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}

export default function Calculator({onGetQuote}) {
  const [projectId, setProjectId] = useState(PRICING.projects[0].id);
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState(() => new Set(["seo"]));
  const [designId, setDesignId] = useState(PRICING.design[0].id);
  const [speedId, setSpeedId] = useState(PRICING.speed[0].id);

  const project = PRICING.projects.find(p => p.id === projectId);
  const design = PRICING.design.find(d => d.id === designId);
  const speed = PRICING.speed.find(s => s.id === speedId);

  const toggleFeature = id =>
    setFeatures(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const result = useMemo(() => {
    const extraPages = project.pages ? Math.max(0, pages - project.includedPages) : 0;
    const chosen = PRICING.features.filter(f => features.has(f.id));
    const subtotal =
      project.base +
      extraPages * PRICING.perExtraPage +
      chosen.reduce((sum, f) => sum + f.price, 0);
    const total = subtotal * design.multiplier * speed.multiplier;
    return {
      extraPages,
      chosen,
      low: roundTo500(total * PRICING.rangeLow),
      high: roundTo500(total * PRICING.rangeHigh)
    };
  }, [project, pages, features, design, speed]);

  const low = useCountUp(result.low);
  const high = useCountUp(result.high);

  // Show the sticky price bar while the options are on screen but the
  // estimate card isn't (only matters when the layout is stacked).
  const formRef = useRef(null);
  const cardRef = useRef(null);
  const [formInView, setFormInView] = useState(false);
  const [cardInView, setCardInView] = useState(false);
  useEffect(() => {
    const form = formRef.current;
    const card = cardRef.current;
    if (!form || !card || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === form) setFormInView(entry.isIntersecting);
        else setCardInView(entry.isIntersecting);
      });
    });
    observer.observe(form);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);
  const showBar = formInView && !cardInView;

  useEffect(() => {
    document.body.classList.toggle("estimate-bar-open", showBar);
    return () => document.body.classList.remove("estimate-bar-open");
  }, [showBar]);

  const summaryLines = [
    `Project: ${project.label}`,
    ...(project.pages ? [`Pages: ${pages}`] : []),
    `Features: ${result.chosen.length ? result.chosen.map(f => f.label).join(", ") : "Basic"}`,
    `Design: ${design.label}`,
    `Timeline: ${speed.label}`,
    `Estimate: ${inr(result.low)} – ${inr(result.high)}`
  ];

  const whatsappMessage = [
    "Hi Sahil, I used the price calculator on your website.",
    "",
    ...summaryLines,
    "",
    "Can we discuss my project?"
  ].join("\n");

  const getQuote = () => {
    onGetQuote({type: project.label, summary: summaryLines.join("\n")});
    document.getElementById("contact")?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <section className="section section--calc" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Price calculator</p>
          <h2 id="pricing-title" className="section-title">
            Know your cost in <em>30 seconds</em>
          </h2>
          <p className="section-lead">
            Pick what you need and see an instant estimate. No sign-up, no
            obligation.
          </p>
        </Reveal>

        <div className="calc">
          <div className="calc__form" ref={formRef}>
            {/* 1. Project type */}
            <fieldset className="calc__group">
              <legend>
                <span className="calc__step">1</span> What do you need?
              </legend>
              <div className="choice-grid">
                {PRICING.projects.map(p => (
                  <label
                    key={p.id}
                    className={`choice ${projectId === p.id ? "is-active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="project"
                      value={p.id}
                      checked={projectId === p.id}
                      onChange={() => setProjectId(p.id)}
                    />
                    <span className="choice__title">{p.label}</span>
                    <span className="choice__hint">{p.hint}</span>
                    <span className="choice__price">from {inr(p.base)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 2. Pages */}
            {project.pages && (
              <fieldset className="calc__group">
                <legend>
                  <span className="calc__step">2</span> How many pages?
                </legend>
                <div className="pages">
                  <button
                    type="button"
                    className="pages__btn"
                    onClick={() => setPages(n => Math.max(1, n - 1))}
                    aria-label="Fewer pages"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    type="range"
                    min={1}
                    max={PRICING.maxPages}
                    value={pages}
                    onChange={e => setPages(Number(e.target.value))}
                    aria-label="Number of pages"
                    style={{"--fill": `${((pages - 1) / (PRICING.maxPages - 1)) * 100}%`}}
                  />
                  <button
                    type="button"
                    className="pages__btn"
                    onClick={() => setPages(n => Math.min(PRICING.maxPages, n + 1))}
                    aria-label="More pages"
                  >
                    <Plus size={18} />
                  </button>
                  <output className="pages__value">
                    {pages} <small>{pages === 1 ? "page" : "pages"}</small>
                  </output>
                </div>
                <p className="calc__note">
                  {project.includedPages} pages included (e.g. Home, About,
                  Services, Gallery, Contact). Extra pages{" "}
                  {inr(PRICING.perExtraPage)} each.
                </p>
              </fieldset>
            )}

            {/* 3. Features */}
            <fieldset className="calc__group">
              <legend>
                <span className="calc__step">{project.pages ? 3 : 2}</span> Add features
              </legend>
              <div className="feature-list">
                {PRICING.features.map(f => (
                  <label
                    key={f.id}
                    className={`feature ${features.has(f.id) ? "is-active" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={features.has(f.id)}
                      onChange={() => toggleFeature(f.id)}
                    />
                    <span className="feature__box" aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="feature__label">{f.label}</span>
                    <span className="feature__price">+{inr(f.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 4. Design & speed */}
            <fieldset className="calc__group">
              <legend>
                <span className="calc__step">{project.pages ? 4 : 3}</span> Design &amp; timeline
              </legend>
              <div className="segment-row">
                <div className="segment" role="radiogroup" aria-label="Design">
                  {PRICING.design.map(d => (
                    <button
                      key={d.id}
                      type="button"
                      role="radio"
                      aria-checked={designId === d.id}
                      className={designId === d.id ? "is-active" : ""}
                      onClick={() => setDesignId(d.id)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <div className="segment" role="radiogroup" aria-label="Timeline">
                  {PRICING.speed.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={speedId === s.id}
                      className={speedId === s.id ? "is-active" : ""}
                      onClick={() => setSpeedId(s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </fieldset>
          </div>

          {/* Live estimate */}
          <aside className="estimate" id="estimate" ref={cardRef}>
            <div className="estimate__glow" aria-hidden="true" />
            <p className="estimate__label">Your estimated cost</p>
            <p className="visually-hidden" aria-live="polite">
              {inr(result.low)} to {inr(result.high)}
            </p>
            <p className="estimate__price" aria-hidden="true">
              <b>{inr(low)}</b> <span>–</span> <b>{inr(high)}</b>
            </p>
            <p className="estimate__time">
              <Clock size={16} aria-hidden="true" />
              {speedId === "urgent"
                ? `Priority delivery — faster than ${project.days}`
                : `Ready in about ${project.days}`}
            </p>

            <ul className="estimate__lines">
              <li>
                <span>{project.label}</span>
                <span>{inr(project.base)}</span>
              </li>
              {result.extraPages > 0 && (
                <li>
                  <span>{result.extraPages} extra pages</span>
                  <span>{inr(result.extraPages * PRICING.perExtraPage)}</span>
                </li>
              )}
              {result.chosen.map(f => (
                <li key={f.id}>
                  <span>{f.label}</span>
                  <span>{inr(f.price)}</span>
                </li>
              ))}
              {design.multiplier !== 1 && (
                <li>
                  <span>{design.label}</span>
                  <span>+{Math.round((design.multiplier - 1) * 100)}%</span>
                </li>
              )}
              {speed.multiplier !== 1 && (
                <li>
                  <span>{speed.label}</span>
                  <span>+{Math.round((speed.multiplier - 1) * 100)}%</span>
                </li>
              )}
            </ul>

            <div className="estimate__included">
              <p>Always included</p>
              <ul>
                {PRICING.included.map(item => (
                  <li key={item}>
                    <Check size={14} strokeWidth={3} aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="estimate__actions">
              <a
                className="btn btn--whatsapp"
                href={whatsappUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} /> Send this on WhatsApp
              </a>
              <button type="button" className="btn btn--light" onClick={getQuote}>
                Get exact quote <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="estimate__disclaimer">
              This is an estimate. Your final price is confirmed after a quick
              free call. Optional support from {inr(PRICING.supportPerMonth)}/month.
            </p>
          </aside>
        </div>
      </div>

      {/* Phones & tablets: keeps the live price in view while choosing. */}
      <a
        href="#estimate"
        className={`estimate-bar ${showBar ? "is-visible" : ""}`}
        aria-hidden={!showBar}
        tabIndex={showBar ? 0 : -1}
      >
        <span>
          <small>Estimate</small>
          <b>
            {inr(low)} – {inr(high)}
          </b>
        </span>
        <span className="estimate-bar__cta">
          View <ArrowRight size={16} aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
