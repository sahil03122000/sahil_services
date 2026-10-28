import React, {useCallback, useRef, useState} from "react";
import {Check, Eye, Lock} from "lucide-react";
import DemoWindow from "./DemoWindow";
import {COLORS, TEMPLATES} from "../demo/templates";
import {Reveal} from "../hooks/useReveal";

const typeIds = Object.keys(TEMPLATES);

export default function DemoBuilder() {
  const [details, setDetails] = useState({
    name: "",
    type: typeIds[0],
    city: "",
    phone: "",
    color: COLORS[0].value
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const submitRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    submitRef.current?.focus();
  }, []);

  const update = e => {
    const {name, value} = e.target;
    setDetails(d => ({...d, [name]: value}));
    if (error) setError("");
  };

  const show = e => {
    e.preventDefault();
    if (!details.name.trim()) {
      setError("Please enter your business name.");
      return;
    }
    setDetails(d => ({...d, name: d.name.trim(), city: d.city.trim(), phone: d.phone.trim()}));
    setOpen(true);
  };

  const Preview = TEMPLATES[details.type].Icon;

  return (
    <section className="section section--tint" id="demo" aria-labelledby="demo-title">
      <div className="container demo-builder">
        <Reveal className="demo-builder__intro">
          <p className="eyebrow">Free demo</p>
          <h2 id="demo-title" className="section-title">
            See <em>your website</em> before you pay
          </h2>
          <p className="section-lead">
            Enter your business details and instantly see a sample website made
            for your business — on desktop and mobile.
          </p>
          <ul className="demo-builder__points">
            <li><Check size={16} strokeWidth={3} /> Free, takes 10 seconds</li>
            <li><Check size={16} strokeWidth={3} /> 8 business types, 8 colours</li>
            <li><Lock size={16} /> Your details stay on your device — nothing is sent</li>
          </ul>
        </Reveal>

        <Reveal className="demo-form-card" delay={100}>
          <form className="demo-form" onSubmit={show} noValidate>
            <label className="field">
              <span>Business name *</span>
              <input
                name="name"
                value={details.name}
                onChange={update}
                placeholder="e.g. CityCare Clinic"
                autoComplete="organization"
                maxLength={40}
              />
            </label>

            <label className="field">
              <span>Type of business</span>
              <select name="type" value={details.type} onChange={update}>
                {typeIds.map(id => (
                  <option key={id} value={id}>
                    {TEMPLATES[id].label}
                  </option>
                ))}
              </select>
            </label>

            <div className="demo-form__row">
              <label className="field">
                <span>City</span>
                <input name="city" value={details.city} onChange={update} placeholder="e.g. Rewari" maxLength={30} />
              </label>
              <label className="field">
                <span>Phone (shown on demo)</span>
                <input
                  name="phone"
                  value={details.phone}
                  onChange={update}
                  placeholder="optional"
                  inputMode="tel"
                  maxLength={15}
                />
              </label>
            </div>

            <fieldset className="swatches">
              <legend>Brand colour</legend>
              <div className="swatches__list">
                {COLORS.map(c => (
                  <label key={c.id} className="swatch" title={c.label}>
                    <input
                      type="radio"
                      name="color"
                      value={c.value}
                      checked={details.color === c.value}
                      onChange={update}
                    />
                    <span style={{background: c.value}}>
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <em className="visually-hidden">{c.label}</em>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="quote__error" role="alert">{error}</p>

            <button ref={submitRef} type="submit" className="btn btn--primary btn--lg demo-form__submit">
              <Eye size={20} aria-hidden="true" /> Show my free demo
            </button>

            <div className="demo-form__peek" aria-hidden="true" style={{"--ds": details.color}}>
              <span className="demo-form__peek-icon">
                <Preview size={18} />
              </span>
              <span>
                <b>{details.name.trim() || "Your Business"}</b>
                <small>{TEMPLATES[details.type].headline}</small>
              </span>
            </div>
          </form>
        </Reveal>
      </div>

      {open && <DemoWindow details={details} onClose={close} />}
    </section>
  );
}
