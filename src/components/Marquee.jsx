import React from "react";

const items = [
  "Clinics",
  "Hospitals",
  "CA firms",
  "Coaching centres",
  "Schools",
  "Taxi & travels",
  "Gyms",
  "Salons",
  "Restaurants",
  "Shops & showrooms",
  "Real estate",
  "Banquet halls"
];

export default function Marquee() {
  // The list is rendered twice so the CSS loop is seamless.
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-label="Businesses I build for">
      <p className="marquee__label">Built for</p>
      <div className="marquee__track">
        <ul className="marquee__list">
          {row.map((item, i) => (
            <li key={i} aria-hidden={i >= items.length || undefined}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
