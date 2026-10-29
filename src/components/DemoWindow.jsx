import React, {useEffect, useRef, useState} from "react";
import {Check, Globe, Loader2, Monitor, Pencil, Shirt, Smartphone, X} from "lucide-react";
import DemoSite from "./DemoSite";
import MerchDemo, {CATALOG, SUGGESTED} from "./MerchDemo";
import MerchPicker from "./MerchPicker";
import WhatsAppIcon from "./WhatsAppIcon";
import {CONTACT, MIN_ORDER, priceOf, whatsappUrl} from "../config";
import {TEMPLATES} from "../demo/templates";
import {BUILD_STEPS} from "../demo/extras";

const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24) || "yourbusiness";

// Repeating diagonal "DEMO" watermark, drawn once as an SVG tile.
const watermark = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='220'><text x='0' y='140' transform='rotate(-24 170 110)' font-family='Arial, sans-serif' font-size='22' font-weight='700' fill='rgba(15,16,32,0.10)'>DEMO · ${CONTACT.name}</text></svg>`
)}")`;

const block = e => e.preventDefault();

/* Full-screen "window" that previews the visitor's sample website.
   Right-click, selection, copy, drag, save and print are blocked while it is
   open, and a watermark covers the preview. This deters casual copying; it
   cannot stop a determined developer. */
export default function DemoWindow({details, onClose}) {
  const [device, setDevice] = useState("desktop");
  const [view, setView] = useState("website"); // website | merch
  const isSite = view === "website";

  // Start each view / size from the top of the preview.
  useEffect(() => {
    overlayRef.current?.scrollTo({top: 0});
  }, [view, device]);
  const suggested = SUGGESTED[details.type];
  const [merch, setMerch] = useState(suggested);
  const merchLabels = CATALOG.filter(i => merch.includes(i.id)).map(i => i.label);
  // Short "building your website" sequence before the preview appears.
  const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [step, setStep] = useState(reduceMotion ? BUILD_STEPS.length : 0);
  const building = step < BUILD_STEPS.length;

  useEffect(() => {
    if (!building) return undefined;
    const timer = setTimeout(() => setStep(s => s + 1), 520);
    return () => clearTimeout(timer);
  }, [step, building]);
  const closeRef = useRef(null);
  const overlayRef = useRef(null);
  const t = TEMPLATES[details.type];

  useEffect(() => {
    closeRef.current?.focus();
    document.body.classList.add("demo-open");
    const onKey = e => {
      if (e.key === "Escape") onClose();
      const k = e.key.toLowerCase();
      const inField = /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
      const blocked = inField ? ["s", "u", "p"] : ["s", "u", "p", "c", "a"];
      if ((e.ctrlKey || e.metaKey) && blocked.includes(k)) e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("demo-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const where = `"${details.name}" (${t.label}${details.city ? `, ${details.city}` : ""})`;
  const message = isSite
    ? `Hi Sahil, I saw the demo website for ${where} on your site. I'd like to get my website made.`
    : `Hi Sahil, I saw the merchandise demo for ${where} on your site. I'd like a quote for printing${merchLabels.length ? `: ${merchLabels.join(", ")}` : ""}.`;

  return (
    <div ref={overlayRef} className="demo-overlay" role="dialog" aria-modal="true" aria-labelledby="demo-window-title">
      <div className="demo-window">
        <div className="demo-window__top">
          <div>
            <p id="demo-window-title" className="demo-window__title">
              Your brand demo
            </p>
            <p className="demo-window__sub">A sample design for {details.name}</p>
          </div>

          <div className="demo-views" role="tablist" aria-label="Demo type">
            <button
              type="button"
              role="tab"
              aria-selected={isSite}
              className={isSite ? "is-active" : ""}
              onClick={() => setView("website")}
            >
              <Globe size={16} /> Website
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isSite}
              className={!isSite ? "is-active" : ""}
              onClick={() => setView("merch")}
            >
              <Shirt size={16} /> Merchandise
            </button>
          </div>

          <div className="demo-device" role="radiogroup" aria-label="Preview size" hidden={!isSite}>
            <button
              type="button"
              role="radio"
              aria-checked={device === "desktop"}
              className={device === "desktop" ? "is-active" : ""}
              onClick={() => setDevice("desktop")}
            >
              <Monitor size={16} /> <span>Desktop</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={device === "mobile"}
              className={device === "mobile" ? "is-active" : ""}
              onClick={() => setDevice("mobile")}
            >
              <Smartphone size={16} /> <span>Mobile</span>
            </button>
          </div>

          <button ref={closeRef} type="button" className="demo-close" onClick={onClose} aria-label="Close demo">
            <X size={20} />
          </button>
        </div>

        <div className={`demo-stage ${isSite ? "" : "demo-stage--merch"}`}>
          {!isSite && <MerchPicker selected={merch} onChange={setMerch} suggested={suggested} />}
          <div className={`demo-frame demo-frame--${isSite ? device : "merch"}`}>
            <div className="demo-frame__bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{isSite ? `${slug(details.name)}.in` : `${details.name} · merchandise preview`}</span>
            </div>
            {building && (
              <div className="demo-build" role="status" aria-live="polite">
                <span className="demo-build__logo" style={{background: details.logo ? "#fff" : details.color}}>
                  {details.logo ? <img src={details.logo} alt="" /> : details.name.slice(0, 1).toUpperCase()}
                </span>
                <p className="demo-build__title">Building {details.name}…</p>
                <ul>
                  {BUILD_STEPS.map((label, i) => (
                    <li key={label} className={i < step ? "is-done" : i === step ? "is-now" : ""}>
                      {i < step ? <Check size={16} strokeWidth={3} /> : <Loader2 size={16} className="spin" />}
                      {label}
                    </li>
                  ))}
                </ul>
                <span className="demo-build__bar">
                  <span style={{width: `${(step / BUILD_STEPS.length) * 100}%`, background: details.color}} />
                </span>
              </div>
            )}
            <div key={view} className={`demo-frame__viewport ${building ? "is-hidden" : "is-ready"}`}>
              <div
                className="demo-frame__content"
                onContextMenu={block}
                onCopy={block}
                onCut={block}
                onDragStart={block}
              >
                {isSite ? <DemoSite details={details} /> : <MerchDemo details={details} selected={merch} />}
                <div className="demo-shield" style={{backgroundImage: watermark}} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="demo-window__bottom">
          <div className="demo-window__pitch">
            {isSite ? (
              <>
                <p className="demo-window__price">
                  Get this website from <b>₹{priceOf("website").toLocaleString("en-IN")}</b>
                  <span> · live in 7–10 days</span>
                </p>
                <p className="demo-window__note">
                  Sample text, numbers & reviews — your site gets your real details,
                  photos and a fully custom design.
                </p>
              </>
            ) : (
              <>
                <p className="demo-window__price">
                  Get these printed — <b>free quote</b>
                  <span> · min. {MIN_ORDER.item} pcs per item</span>
                </p>
                <p className="demo-window__note">
                  Minimum order: {MIN_ORDER.item} pcs per item · visiting cards {MIN_ORDER.cards} ·
                  pamphlets {MIN_ORDER.pamphlets.toLocaleString("en-IN")} · flex no minimum. Mockups are
                  previews — final colours and sizes are confirmed before printing.
                </p>
              </>
            )}
          </div>
          <div className="demo-window__actions">
            <button type="button" className="btn btn--light" onClick={onClose}>
              <Pencil size={16} /> Edit details
            </button>
            <a className="btn btn--whatsapp" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> {isSite ? "Get this website" : "Get a printing quote"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
