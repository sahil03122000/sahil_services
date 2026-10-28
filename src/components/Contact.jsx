import React, {useEffect, useState} from "react";
import {Check, Mail, Phone, Send} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {CONTACT, PRICING, prettyPhone, whatsappUrl} from "../config";
import {Reveal} from "../hooks/useReveal";

const empty = {name: "", reach: "", business: "", type: "", message: "", botcheck: false};
const types = [...PRICING.projects.map(p => p.label), "Branded merchandise (t-shirts, mugs, cards…)", "Not sure yet"];

export default function Contact({prefill}) {
  const [values, setValues] = useState(empty);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  // The calculator's "Get exact quote" fills in the project and estimate.
  useEffect(() => {
    if (!prefill) return;
    setStatus("idle");
    setValues(v => ({
      ...v,
      type: prefill.type,
      message: `${prefill.summary}\n\nAbout my business: `
    }));
  }, [prefill]);

  const update = e => {
    const {name, value, type, checked} = e.target;
    setValues(v => ({...v, [name]: type === "checkbox" ? checked : value}));
    if (error) setError("");
  };

  const validate = () => {
    if (!values.name.trim() || !values.reach.trim() || !values.message.trim()) {
      setError("Please fill in your name, phone or email, and a little about your project.");
      return false;
    }
    return true;
  };

  const summary = () =>
    [
      "Hi Sahil,",
      "",
      `Name: ${values.name.trim()}`,
      `Contact: ${values.reach.trim()}`,
      ...(values.business.trim() ? [`Business: ${values.business.trim()}`] : []),
      `Need: ${values.type || "Not sure yet"}`,
      "",
      values.message.trim()
    ].join("\n");

  const subject = `Website enquiry: ${values.business.trim() || values.name.trim()}`;

  /* Sends the enquiry to your inbox. Uses Web3Forms when a key is set,
     otherwise FormSubmit (no sign-up; the very first enquiry sends an
     activation email to CONTACT.email that must be confirmed once). */
  const sendEnquiry = async () => {
    const reach = values.reach.trim();
    const isEmail = reach.includes("@");
    const fields = {
      name: values.name.trim(),
      contact: reach,
      business: values.business.trim() || "-",
      need: values.type || "Not sure yet",
      message: values.message.trim()
    };
    const request = CONTACT.web3formsKey
      ? {
          url: "https://api.web3forms.com/submit",
          body: {
            access_key: CONTACT.web3formsKey,
            subject,
            from_name: "Website enquiry form",
            // Lets you hit "Reply" in your inbox when they left an email.
            ...(isEmail ? {email: reach} : {}),
            ...fields,
            botcheck: values.botcheck
          }
        }
      : {
          url: `https://formsubmit.co/ajax/${CONTACT.email}`,
          body: {
            _subject: subject,
            _template: "table",
            _captcha: "false",
            ...(isEmail ? {_replyto: reach} : {}),
            ...fields,
            _honey: values.botcheck ? "spam" : ""
          }
        };

    const res = await fetch(request.url, {
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify(request.body)
    });
    const data = await res.json().catch(() => ({}));
    // Web3Forms returns success as a boolean, FormSubmit as a string.
    if (!res.ok || String(data.success) !== "true") throw new Error(data.message);
  };

  const submit = async e => {
    e.preventDefault();
    if (status === "sending" || !validate()) return;

    setStatus("sending");
    try {
      await sendEnquiry();
      setValues(empty);
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(`Couldn't send right now. Please message me on WhatsApp or email ${CONTACT.email}.`);
    }
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    window.open(whatsappUrl(summary()), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section section--contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal className="contact__intro">
          <p className="eyebrow eyebrow--light">Free quote</p>
          <h2 id="contact-title" className="section-title">
            Let's build something <em>your customers love</em>
          </h2>
          <p className="contact__lead">
            Tell me about your business and I'll reply with ideas and a clear
            quote — usually within 24 hours.
          </p>

          <div className="channels">
            <a
              className="channel channel--wa"
              href={whatsappUrl("Hi Sahil, I'd like a quote for a website.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="channel__icon"><WhatsAppIcon size={20} /></span>
              <span>
                <b>WhatsApp</b>
                <small>Quickest reply</small>
              </span>
            </a>
            <a className="channel" href={`tel:+${CONTACT.phone}`}>
              <span className="channel__icon"><Phone size={20} /></span>
              <span>
                <b>Call</b>
                <small>{prettyPhone()}</small>
              </span>
            </a>
            <a className="channel" href={`mailto:${CONTACT.email}`}>
              <span className="channel__icon"><Mail size={20} /></span>
              <span>
                <b>Email</b>
                <small>{CONTACT.email}</small>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal className="quote" delay={100}>
          {status === "sent" ? (
            <div className="quote__success" role="status">
              <span className="quote__success-icon"><Check size={26} strokeWidth={3} /></span>
              <h3>Thanks — message received!</h3>
              <p>I'll get back to you with a quote, usually within 24 hours.</p>
              <button type="button" className="link" onClick={() => setStatus("idle")}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="quote__form" onSubmit={submit} noValidate>
              <div className="quote__row">
                <label className="field">
                  <span>Your name *</span>
                  <input name="name" autoComplete="name" value={values.name} onChange={update} />
                </label>
                <label className="field">
                  <span>Phone or email *</span>
                  <input name="reach" autoComplete="tel" value={values.reach} onChange={update} />
                </label>
              </div>
              <div className="quote__row">
                <label className="field">
                  <span>Business name</span>
                  <input name="business" autoComplete="organization" value={values.business} onChange={update} />
                </label>
                <label className="field">
                  <span>What do you need?</span>
                  <select name="type" value={values.type} onChange={update}>
                    <option value="">Choose one</option>
                    {types.map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="field">
                <span>Tell me about your project *</span>
                <textarea
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={update}
                  placeholder="What your business does, what you want on the website, any deadline…"
                />
              </label>
              <input
                type="checkbox"
                name="botcheck"
                className="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                checked={values.botcheck}
                onChange={update}
              />
              <p className="quote__error" role="alert">{error}</p>
              <div className="quote__actions">
                <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                  <Send size={18} aria-hidden="true" />
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
                <button type="button" className="btn btn--whatsapp" onClick={sendWhatsApp}>
                  <WhatsAppIcon size={18} /> Send on WhatsApp
                </button>
              </div>
              <p className="quote__note">Free, no obligation. Your details are only used to reply to you.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
