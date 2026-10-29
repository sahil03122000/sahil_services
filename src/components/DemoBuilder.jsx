import React, {useCallback, useEffect, useRef, useState} from "react";
import {Check, Eye, ImagePlus, Lock, X} from "lucide-react";
import DemoWindow from "./DemoWindow";
import {COLORS, TEMPLATES} from "../demo/templates";
import {Reveal} from "../hooks/useReveal";

const typeIds = Object.keys(TEMPLATES);

/* Image chooser used for the logo and the business photo. */
function ImagePick({label, hint, value, fallbackBg, cover, onFile, onRemove, accept}) {
  const input = useRef(null);
  return (
    <div className="logo-pick">
      <span className="logo-pick__label">{label}</span>
      <div className="logo-pick__row">
        <span className={`logo-pick__preview ${cover ? "logo-pick__preview--cover" : ""}`} style={{background: value ? "#fff" : fallbackBg}}>
          {value ? <img src={value} alt="" /> : <ImagePlus size={20} aria-hidden="true" />}
        </span>
        <button type="button" className="logo-pick__btn" onClick={() => input.current?.click()}>
          {value ? "Change" : "Upload"}
        </button>
        {value && (
          <button type="button" className="logo-pick__remove" onClick={onRemove} aria-label={`Remove ${label.toLowerCase()}`}>
            <X size={16} />
          </button>
        )}
        <input ref={input} type="file" accept={accept} onChange={onFile} hidden />
      </div>
      <small>{hint}</small>
    </div>
  );
}

export default function DemoBuilder() {
  const [details, setDetails] = useState({
    name: "",
    type: typeIds[0],
    city: "",
    phone: "",
    color: COLORS[0].value,
    logo: null,
    photo: null
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const submitRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    submitRef.current?.focus();
  }, []);

  // Images stay in the browser as temporary object URLs — never uploaded.
  const pickImage = field => e => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG or JPG).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("That image is too large — please use one under 8 MB.");
      return;
    }
    setError("");
    setDetails(d => ({...d, [field]: URL.createObjectURL(file)}));
  };
  const removeImage = field => () => setDetails(d => ({...d, [field]: null}));

  // Free an image once it is replaced, removed, or the section unmounts.
  useEffect(() => {
    const url = details.logo;
    return () => url && URL.revokeObjectURL(url);
  }, [details.logo]);
  useEffect(() => {
    const url = details.photo;
    return () => url && URL.revokeObjectURL(url);
  }, [details.photo]);

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
            See <em>your brand</em> before you pay
          </h2>
          <p className="section-lead">
            Enter your business details and instantly see your website — plus
            your logo on t-shirts, mugs, caps, visiting cards and banners.
          </p>
          <ul className="demo-builder__points">
            <li><Check size={16} strokeWidth={3} /> Free, takes 10 seconds</li>
            <li><Check size={16} strokeWidth={3} /> Website demo + 15 merchandise mockups</li>
            <li><Check size={16} strokeWidth={3} /> Add your logo, pick from 8 colours</li>
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

            <div className="demo-form__row">
              <ImagePick
                label="Your logo"
                hint="Optional · on website & merchandise"
                value={details.logo}
                fallbackBg={details.color}
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onFile={pickImage("logo")}
                onRemove={removeImage("logo")}
              />
              <ImagePick
                label="Business photo"
                hint="Optional · website background"
                value={details.photo}
                fallbackBg="#9ca3af"
                cover
                accept="image/png,image/jpeg,image/webp"
                onFile={pickImage("photo")}
                onRemove={removeImage("photo")}
              />
            </div>
            <p className="demo-form__privacy">
              <Lock size={13} aria-hidden="true" /> Your images stay on your device — nothing is uploaded.
            </p>

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
