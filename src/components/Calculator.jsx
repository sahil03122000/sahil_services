import React, {useEffect, useMemo, useRef, useState} from "react";
import {ArrowRight, Check, Clock, Minus, Plus, Repeat} from "lucide-react";
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

/* A checkbox row used for both one-time and monthly add-ons. */
function Option({item, checked, onToggle, suffix = ""}) {
  return (
    <label className={`feature ${checked ? "is-active" : ""}`}>
      <input type="checkbox" checked={checked} onChange={() => onToggle(item.id)} />
      <span className="feature__box" aria-hidden="true">
        <Check size={14} strokeWidth={3} />
      </span>
      <span className="feature__label">
        {item.label}
        {item.note && <small>{item.note}</small>}
      </span>
      <span className="feature__price">
        +{inr(item.price)}
        {suffix}
      </span>
    </label>
  );
}

const toggleIn = setter => id =>
  setter(current => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

export default function Calculator({onGetQuote}) {
  const [projectId, setProjectId] = useState(PRICING.projects[0].id);
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState(() => new Set(["seo", "gbp"]));
  const [monthly, setMonthly] = useState(() => new Set());
  const [designId, setDesignId] = useState(PRICING.design[0].id);
  const [speedId, setSpeedId] = useState(PRICING.speed[0].id);

  const project = PRICING.projects.find(p => p.id === projectId);
  const design = PRICING.design.find(d => d.id === designId);
  const speed = PRICING.speed.find(s => s.id === speedId);
  const availableFeatures = PRICING.features.filter(f => !(project.noSite && f.siteOnly));

  const result = useMemo(() => {
    const extraPages = project.pages ? Math.max(0, pages - project.includedPages) : 0;
    const chosen = availableFeatures.filter(f => features.has(f.id));
    const chosenMonthly = PRICING.monthly.filter(m => monthly.has(m.id));
    const subtotal =
      project.base +
      extraPages * PRICING.perExtraPage +
      chosen.reduce((sum, f) => sum + f.price, 0);
    const total = subtotal * design.multiplier * speed.multiplier;
    return {
      extraPages,
      chosen,
      chosenMonthly,
      low: roundTo500(total * PRICING.rangeLow),
      high: roundTo500(total * PRICING.rangeHigh),
      perMonth: chosenMonthly.reduce((sum, m) => sum + m.price, 0)
    };
    // availableFeatures is derived from project
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, pages, features, monthly, design, speed]);

  const low = useCountUp(result.low);
  const high = useCountUp(result.high);
  const perMonth = useCountUp(result.perMonth);
  const nothingChosen = result.high === 0 && result.perMonth === 0;

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

  const oneTimeText = result.high > 0 ? `${inr(result.low)} – ${inr(result.high)}` : "—";
  const summaryLines = [
    `Project: ${project.label}`,
    ...(project.pages ? [`Pages: ${pages}`] : []),
    `One-time add-ons: ${result.chosen.length ? result.chosen.map(f => f.label).join(", ") : "None"}`,
    ...(result.chosenMonthly.length
      ? [`Monthly services: ${result.chosenMonthly.map(m => m.label).join(", ")}`]
      : []),
    `Design: ${design.label}`,
    `Timeline: ${speed.label}`,
    ...(result.high > 0 || result.perMonth > 0
      ? [
          "Estimate: " +
            [
              result.high > 0 && `${oneTimeText} one-time`,
              result.perMonth > 0 && `${inr(result.perMonth)}/month`
            ]
              .filter(Boolean)
              .join(" + ")
        ]
      : [])
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

  // Step numbers shift when the pages step is hidden.
  let step = 0;
  const nextStep = () => ++step;

  return (
    <section className="section section--calc" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Price calculator</p>
          <h2 id="pricing-title" className="section-title">
            Know your cost in <em>30 seconds</em>
          </h2>
          <p className="section-lead">
            Website, app, SEO, ads or branding — pick what you need and see an
            instant estimate. No sign-up, no obligation.
          </p>
        </Reveal>

        <div className="calc">
          <div className="calc__form" ref={formRef}>
            <fieldset className="calc__group">
              <legend>
                <span className="calc__step">{nextStep()}</span> What do you need?
              </legend>
              <div className="choice-grid">
                {PRICING.projects.map(p => (
                  <label
                    key={p.id}
                    className={`choice ${projectId === p.id ? "is-active" : ""} ${p.noSite ? "choice--alt" : ""}`}
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
                    <span className="choice__price">
                      {p.base ? `from ${inr(p.base)}` : "pick services below"}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {project.pages && (
              <fieldset className="calc__group">
                <legend>
                  <span className="calc__step">{nextStep()}</span> How many pages?
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

            <fieldset className="calc__group">
              <legend>
                <span className="calc__step">{nextStep()}</span>
                {project.noSite ? "Choose services" : "Add features & services"}
                <span className="calc__tag">one-time</span>
              </legend>
              <div className="feature-list">
                {availableFeatures.map(f => (
                  <Option
                    key={f.id}
                    item={f}
                    checked={features.has(f.id)}
                    onToggle={toggleIn(setFeatures)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="calc__group">
              <legend>
                <span className="calc__step">{nextStep()}</span> Grow every month
                <span className="calc__tag calc__tag--alt">monthly · optional</span>
              </legend>
              <div className="feature-list">
                {PRICING.monthly.map(m => (
                  <Option
                    key={m.id}
                    item={m}
                    checked={monthly.has(m.id)}
                    onToggle={toggleIn(setMonthly)}
                    suffix="/mo"
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="calc__group">
              <legend>
                <span className="calc__step">{nextStep()}</span> Design &amp; timeline
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
              {nothingChosen
                ? "Pick at least one service to see a price"
                : `${oneTimeText} one-time${result.perMonth ? `, plus ${inr(result.perMonth)} per month` : ""}`}
            </p>

            {nothingChosen ? (
              <p className="estimate__empty" aria-hidden="true">
                Pick at least one service to see your price.
              </p>
            ) : (
              <div aria-hidden="true">
                {result.high > 0 && (
                  <p className="estimate__price">
                    <b>{inr(low)}</b> <span>–</span> <b>{inr(high)}</b>
                    <small>one-time</small>
                  </p>
                )}
                {result.perMonth > 0 && (
                  <p className={`estimate__monthly ${result.high > 0 ? "" : "estimate__monthly--big"}`}>
                    <Repeat size={16} />
                    {result.high > 0 ? "+ " : ""}
                    <b>{inr(perMonth)}</b>/month
                  </p>
                )}
              </div>
            )}

            <p className="estimate__time">
              <Clock size={16} aria-hidden="true" />
              {speedId === "urgent"
                ? `Priority delivery — faster than ${project.days}`
                : project.noSite
                  ? `Work ${project.days}`
                  : `Ready in about ${project.days}`}
            </p>

            <ul className="estimate__lines">
              {project.base > 0 && (
                <li>
                  <span>{project.label}</span>
                  <span>{inr(project.base)}</span>
                </li>
              )}
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
              {design.multiplier !== 1 && result.high > 0 && (
                <li>
                  <span>{design.label}</span>
                  <span>+{Math.round((design.multiplier - 1) * 100)}%</span>
                </li>
              )}
              {speed.multiplier !== 1 && result.high > 0 && (
                <li>
                  <span>{speed.label}</span>
                  <span>+{Math.round((speed.multiplier - 1) * 100)}%</span>
                </li>
              )}
              {result.chosenMonthly.map(m => (
                <li key={m.id} className="estimate__line--monthly">
                  <span>{m.label}</span>
                  <span>{inr(m.price)}/mo</span>
                </li>
              ))}
            </ul>

            {!project.noSite && (
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
            )}

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
              free call. Monthly services are optional.
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
            {nothingChosen
              ? "Pick a service"
              : result.high > 0
                ? `${inr(low)} – ${inr(high)}`
                : `${inr(perMonth)}/mo`}
          </b>
          {result.high > 0 && result.perMonth > 0 && (
            <em>+ {inr(perMonth)}/month</em>
          )}
        </span>
        <span className="estimate-bar__cta">
          View <ArrowRight size={16} aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
