import React, {useState} from "react";
import {Check, Search, X} from "lucide-react";
import {CATALOG} from "./MerchDemo";

/* Search + multi-select for the merchandise preview. Lives outside the
   protected preview area so it stays clickable. */
export default function MerchPicker({selected, onChange, suggested}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matches = q
    ? CATALOG.filter(item => `${item.label} ${item.keywords}`.toLowerCase().includes(q))
    : CATALOG;

  const toggle = id =>
    onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);

  return (
    <div className="merch-picker">
      <div className="merch-picker__top">
        <label className="merch-picker__search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search: hoodie, hospital dress, shaker…"
            aria-label="Search merchandise"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </label>
        <div className="merch-picker__quick">
          <span className="merch-picker__count" aria-live="polite">
            {selected.length} selected
          </span>
          <button type="button" onClick={() => onChange(suggested)}>Suggested</button>
          <button type="button" onClick={() => onChange(CATALOG.map(i => i.id))}>All</button>
          <button type="button" onClick={() => onChange([])}>Clear</button>
        </div>
      </div>

      <div className="merch-picker__chips" role="group" aria-label="Choose merchandise">
        {matches.length ? (
          matches.map(item => {
            const on = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                className={`merch-chip ${on ? "is-on" : ""}`}
                onClick={() => toggle(item.id)}
              >
                <span className="merch-chip__box" aria-hidden="true">
                  {on && <Check size={12} strokeWidth={3.5} />}
                </span>
                {item.label}
              </button>
            );
          })
        ) : (
          <p className="merch-picker__none">
            No match for “{query}”. Need something else? Ask on WhatsApp.
          </p>
        )}
      </div>
    </div>
  );
}
