import React, {useEffect, useMemo, useState} from "react";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  MapPin,
  Phone,
  Plus,
  Search,
  Trash2,
  Upload
} from "lucide-react";
import WhatsAppIcon from "../components/WhatsAppIcon";
import {COLORS} from "../demo/templates";
import {demoLink} from "../demo/link";
import {CITIES, STATUSES, TYPES, scriptsFor, waNumber} from "./scripts";

const STORE_KEY = "sahil-kit-leads";
const typeIds = Object.keys(TYPES);
const TABS = [
  {id: "call", label: "Call script"},
  {id: "whatsapp", label: "WhatsApp"},
  {id: "objections", label: "Objections"},
  {id: "close", label: "Closing"}
];

// Leads live only in this browser. Storage can be blocked, so never throw.
function loadLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch {
    return [];
  }
}
function saveLeads(leads) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(leads));
  } catch {
    /* private mode or storage full — the list still works for this visit */
  }
}

const emptyLead = {business: "", owner: "", type: typeIds[0], city: CITIES[0], phone: "", notes: ""};

const CSV_FIELDS = ["business", "owner", "type", "city", "phone", "status", "followUp", "color", "notes"];
const csvCell = v => `"${String(v ?? "").replace(/"/g, '""')}"`;

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim()));
}

function CopyButton({text, label = "Copy"}) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      window.prompt("Copy this:", text);
    }
  };
  return (
    <button type="button" className="kit-btn kit-btn--ghost" onClick={copy}>
      {done ? <Check size={15} /> : <Copy size={15} />} {done ? "Copied" : label}
    </button>
  );
}

function LeadFinder() {
  const [city, setCity] = useState(CITIES[0]);
  const [type, setType] = useState(typeIds[0]);
  return (
    <section className="kit-card">
      <h2><Search size={18} /> 1. Leads dhundo</h2>
      <p className="kit-muted">
        City aur business chuno, phir search kholo. Jinke naam ke neeche <b>“Website”</b> ka button
        nahi hai aur phone number hai — wahi aapke lead hain. Unhe neeche “Add lead” mein daalo.
      </p>
      <div className="kit-row">
        <label className="kit-field">
          <span>City</span>
          <input list="kit-cities" value={city} onChange={e => setCity(e.target.value)} />
          <datalist id="kit-cities">{CITIES.map(c => <option key={c} value={c} />)}</datalist>
        </label>
        <label className="kit-field">
          <span>Business type</span>
          <select value={type} onChange={e => setType(e.target.value)}>
            {typeIds.map(id => <option key={id} value={id}>{TYPES[id].label}</option>)}
          </select>
        </label>
      </div>
      <div className="kit-chips">
        {TYPES[type].search.map(term => (
          <a
            key={term}
            className="kit-chip"
            href={`https://www.google.com/maps/search/${encodeURIComponent(`${term} ${city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={14} /> {term} {city} <ExternalLink size={12} />
          </a>
        ))}
      </div>
    </section>
  );
}

function AddLead({onAdd}) {
  const [lead, setLead] = useState(emptyLead);
  const [error, setError] = useState("");
  const update = e => setLead(l => ({...l, [e.target.name]: e.target.value}));
  const submit = e => {
    e.preventDefault();
    if (!lead.business.trim()) return setError("Business ka naam daalo.");
    setError("");
    onAdd(lead);
    setLead(l => ({...emptyLead, type: l.type, city: l.city}));
  };
  return (
    <form className="kit-card" onSubmit={submit}>
      <h2><Plus size={18} /> 2. Add lead</h2>
      <div className="kit-row">
        <label className="kit-field"><span>Business name *</span><input name="business" value={lead.business} onChange={update} placeholder="e.g. Sharma Sweets" /></label>
        <label className="kit-field"><span>Owner name</span><input name="owner" value={lead.owner} onChange={update} placeholder="e.g. Ramesh" /></label>
      </div>
      <div className="kit-row">
        <label className="kit-field">
          <span>Type</span>
          <select name="type" value={lead.type} onChange={update}>
            {typeIds.map(id => <option key={id} value={id}>{TYPES[id].label}</option>)}
          </select>
        </label>
        <label className="kit-field"><span>City</span><input name="city" list="kit-cities" value={lead.city} onChange={update} /></label>
        <label className="kit-field"><span>Phone</span><input name="phone" value={lead.phone} onChange={update} inputMode="tel" placeholder="98XXXXXXXX" /></label>
      </div>
      <label className="kit-field"><span>Notes</span><input name="notes" value={lead.notes} onChange={update} placeholder="e.g. Google par 3.9 rating, website nahi" /></label>
      {error && <p className="kit-error">{error}</p>}
      <button type="submit" className="kit-btn kit-btn--primary"><Plus size={16} /> Add lead</button>
    </form>
  );
}

function LeadPanel({lead, onChange}) {
  const [tab, setTab] = useState("whatsapp");
  const color = COLORS.find(c => c.id === lead.color) || COLORS[0];
  const link = demoLink({name: lead.business, type: lead.type, city: lead.city, phone: lead.phone, color: color.id});
  const scripts = useMemo(() => scriptsFor(lead, link), [lead, link]);
  const firstMessage = scripts.whatsapp[0].text;
  const wa = waNumber(lead.phone);

  return (
    <section className="kit-card kit-panel">
      <div className="kit-panel__head">
        <div>
          <h2>{lead.business}</h2>
          <p className="kit-muted">{[lead.owner, TYPES[lead.type].label, lead.city, lead.phone].filter(Boolean).join(" · ")}</p>
        </div>
        <div className="kit-actions">
          {wa && (
            <a className="kit-btn kit-btn--wa" href={`https://wa.me/${wa}?text=${encodeURIComponent(firstMessage)}`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={16} /> Send demo
            </a>
          )}
          {lead.phone && <a className="kit-btn kit-btn--ghost" href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}><Phone size={15} /> Call</a>}
        </div>
      </div>

      <div className="kit-demo">
        <div className="kit-demo__top">
          <b>Demo website link</b>
          <div className="kit-swatches" role="radiogroup" aria-label="Demo colour">
            {COLORS.map(c => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={c.id === color.id}
                aria-label={c.label}
                className={c.id === color.id ? "is-on" : ""}
                style={{background: c.value}}
                onClick={() => onChange({color: c.id})}
              />
            ))}
          </div>
        </div>
        <code className="kit-link">{link}</code>
        <div className="kit-actions">
          <CopyButton text={link} label="Copy link" />
          <a className="kit-btn kit-btn--ghost" href={link} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Open demo</a>
        </div>
        <p className="kit-muted kit-small">Naam, type, city, phone ya colour badlo — link apne aap naya ban jaata hai. Purana link bhi chalta rahega.</p>
      </div>

      <div className="kit-row">
        <label className="kit-field">
          <span>Status</span>
          <select value={lead.status} onChange={e => onChange({status: e.target.value})}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="kit-field">
          <span>Follow-up date</span>
          <input type="date" value={lead.followUp || ""} onChange={e => onChange({followUp: e.target.value})} />
        </label>
      </div>
      <details className="kit-edit">
        <summary>Edit details</summary>
        <div className="kit-row">
          <label className="kit-field"><span>Business</span><input value={lead.business} onChange={e => onChange({business: e.target.value})} /></label>
          <label className="kit-field"><span>Owner</span><input value={lead.owner} onChange={e => onChange({owner: e.target.value})} /></label>
        </div>
        <div className="kit-row">
          <label className="kit-field">
            <span>Type</span>
            <select value={lead.type} onChange={e => onChange({type: e.target.value})}>
              {typeIds.map(id => <option key={id} value={id}>{TYPES[id].label}</option>)}
            </select>
          </label>
          <label className="kit-field"><span>City</span><input list="kit-cities" value={lead.city} onChange={e => onChange({city: e.target.value})} /></label>
          <label className="kit-field"><span>Phone</span><input value={lead.phone} onChange={e => onChange({phone: e.target.value})} /></label>
        </div>
      </details>
      <label className="kit-field">
        <span>Notes (kya baat hui)</span>
        <textarea rows={2} value={lead.notes} onChange={e => onChange({notes: e.target.value})} />
      </label>

      <div className="kit-tabs" role="tablist">
        {TABS.map(t => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={tab === t.id ? "is-on" : ""} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="kit-scripts">
        {scripts[tab].map(block => (
          <article key={block.title} className="kit-script">
            <div className="kit-script__head">
              <h3>{block.title}</h3>
              <CopyButton text={block.text} />
            </div>
            <p>{block.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Kit() {
  const [leads, setLeads] = useState(loadLeads);
  const [selectedId, setSelectedId] = useState(() => loadLeads()[0]?.id);
  const [filter, setFilter] = useState("All");

  useEffect(() => saveLeads(leads), [leads]);

  const add = lead => {
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    setLeads(ls => [{...lead, id, status: "New", followUp: "", color: COLORS[0].id, created: new Date().toISOString().slice(0, 10)}, ...ls]);
    setSelectedId(id);
  };
  // On phones the lead panel sits below the list, so bring it into view.
  const select = id => {
    setSelectedId(id);
    if (window.innerWidth < 980) {
      requestAnimationFrame(() => document.querySelector(".kit-panel")?.scrollIntoView({behavior: "smooth"}));
    }
  };
  const change = id => patch => setLeads(ls => ls.map(l => (l.id === id ? {...l, ...patch} : l)));
  const remove = id => {
    if (!window.confirm("Is lead ko delete karna hai?")) return;
    setLeads(ls => ls.filter(l => l.id !== id));
    if (selectedId === id) setSelectedId(undefined);
  };

  const exportCsv = () => {
    const lines = [CSV_FIELDS.join(","), ...leads.map(l => CSV_FIELDS.map(f => csvCell(l[f])).join(","))];
    const blob = new Blob(["﻿" + lines.join("\n")], {type: "text/csv;charset=utf-8"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importCsv = e => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    file.text().then(text => {
      const [header, ...rows] = parseCsv(text.replace(/^﻿/, ""));
      if (!header?.includes("business")) return window.alert("Yeh leads ki CSV file nahi lagti.");
      const imported = rows
        .map(r => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] || "").trim()])))
        .filter(l => l.business)
        .map((l, i) => ({
          ...emptyLead,
          ...l,
          type: TYPES[l.type] ? l.type : "shop",
          status: STATUSES.includes(l.status) ? l.status : "New",
          id: `${Date.now().toString(36)}${i}`
        }));
      setLeads(ls => [...imported, ...ls]);
      window.alert(`${imported.length} leads import ho gaye.`);
    });
  };

  const today = new Date().toISOString().slice(0, 10);
  const dueToday = leads.filter(l => l.followUp && l.followUp <= today && !["Won", "Not interested"].includes(l.status));
  const shown = filter === "All" ? leads : filter === "Follow-up due" ? dueToday : leads.filter(l => l.status === filter);
  const selected = leads.find(l => l.id === selectedId);
  const counts = Object.fromEntries(STATUSES.map(s => [s, leads.filter(l => l.status === s).length]));

  return (
    <div className="kit">
      <header className="kit-header">
        <div>
          <h1>Sales Kit</h1>
          <p className="kit-muted">Leads · scripts · demo links — sab ek jagah. Data sirf is browser mein save hota hai.</p>
        </div>
        <div className="kit-actions">
          <button type="button" className="kit-btn kit-btn--ghost" onClick={exportCsv} disabled={!leads.length}><Download size={15} /> Backup (CSV)</button>
          <label className="kit-btn kit-btn--ghost">
            <Upload size={15} /> Import CSV
            <input type="file" accept=".csv,text/csv" onChange={importCsv} hidden />
          </label>
        </div>
      </header>

      <div className="kit-stats">
        <span>Total <b>{leads.length}</b></span>
        <span>Meeting <b>{counts["Meeting fixed"]}</b></span>
        <span>Demo sent <b>{counts["Demo sent"]}</b></span>
        <span className="is-won">Won <b>{counts.Won}</b></span>
        <span className={dueToday.length ? "is-due" : ""}>Follow-up aaj <b>{dueToday.length}</b></span>
      </div>

      <div className="kit-grid">
        <div className="kit-col">
          <LeadFinder />
          <AddLead onAdd={add} />
          <section className="kit-card">
            <h2>3. Mere leads</h2>
            <div className="kit-filter">
              {["All", "Follow-up due", ...STATUSES].map(f => (
                <button key={f} type="button" className={filter === f ? "is-on" : ""} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            {!shown.length && <p className="kit-muted">Abhi koi lead nahi. Upar se lead add karo.</p>}
            <ul className="kit-leads">
              {shown.map(l => (
                <li key={l.id} className={l.id === selectedId ? "is-on" : ""}>
                  <button type="button" className="kit-lead" onClick={() => select(l.id)}>
                    <b>{l.business}</b>
                    <small>{TYPES[l.type]?.label.split(" /")[0]} · {l.city}{l.followUp ? ` · follow-up ${l.followUp}` : ""}</small>
                  </button>
                  <span className={`kit-status kit-status--${l.status.replace(/\s/g, "").toLowerCase()}`}>{l.status}</span>
                  <button type="button" className="kit-icon" aria-label={`Delete ${l.business}`} onClick={() => remove(l.id)}><Trash2 size={15} /></button>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="kit-col">
          {selected ? (
            <LeadPanel lead={selected} onChange={change(selected.id)} />
          ) : (
            <section className="kit-card kit-empty">
              <h2>Lead chuno</h2>
              <p className="kit-muted">Kisi lead par click karo — uska demo link, WhatsApp message aur call script yahan dikhega.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
