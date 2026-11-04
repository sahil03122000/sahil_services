import React from "react";

const items = [
  "Shops & showrooms",
  "Schools",
  "Clinics",
  "Hospitals",
  "Coaching centres",
  "CA firms",
  "Lawyers",
  "Restaurants & cafes",
  "Sweet shops & bakeries",
  "Kirana & general stores",
  "Clothing & boutiques",
  "Mobile & electronics",
  "Jewellers",
  "Hardware & building material",
  "Gyms",
  "Salons & parlours",
  "Taxi & travels",
  "Hotels & PGs",
  "Banquet halls",
  "Event planners",
  "Real estate",
  "Car & bike dealers",
  "Pharmacies",
  "Factories & manufacturers",
  "NGOs & samaj",
  "Startups",
  "And every local business"
];

export default function Marquee() {
  // The list is rendered twice so the CSS loop is seamless.
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-label="Businesses I build for">
      <p className="marquee__label">Built for all</p>
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
