import React from "react";
import {TEMPLATES} from "../demo/templates";
import {fitFont, initials, shade} from "../demo/utils";

/* Logo mark for the mockups: the uploaded logo on a white disc, or the
   business initials when no logo was given. */
function Mark({cx, cy, r, logo, name, color, onDark = true}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={onDark ? "#fff" : color} />
      {logo ? (
        <image
          href={logo}
          x={cx - r * 0.72}
          y={cy - r * 0.72}
          width={r * 1.44}
          height={r * 1.44}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : (
        <text
          x={cx}
          y={cy}
          dy="0.35em"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
          fontWeight="800"
          fontSize={r * 0.85}
          fill={onDark ? color : "#fff"}
        >
          {initials(name)}
        </text>
      )}
    </g>
  );
}

const Name = ({x, y, text, maxWidth, maxSize, fill, weight = 800}) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontFamily="Plus Jakarta Sans, Arial, sans-serif"
    fontWeight={weight}
    fontSize={fitFont(text, maxWidth, maxSize)}
    fill={fill}
  >
    {text}
  </text>
);

function Tshirt({d}) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Staff t-shirt mockup">
      <path
        d="M60 22 L82 12 Q100 26 118 12 L140 22 L182 50 L164 82 L148 72 L148 190 L52 190 L52 72 L36 82 L18 50 Z"
        fill={d.color}
      />
      <path d="M82 12 Q100 30 118 12" fill="none" stroke={shade(d.color, -0.3)} strokeWidth="4" />
      <path d="M52 72 L52 190 L148 190 L148 72" fill="none" stroke={shade(d.color, -0.15)} strokeWidth="1.5" />
      <Mark cx={100} cy={82} r={20} logo={d.logo} name={d.name} color={d.color} />
      <Name x={100} y={124} text={d.name} maxWidth={84} maxSize={12} fill="#fff" />
      <text x="100" y="140" textAnchor="middle" fontFamily="Arial" fontSize="7" fill="rgba(255,255,255,0.8)" letterSpacing="2">
        STAFF
      </text>
    </svg>
  );
}

function Hoodie({d}) {
  const base = "#1f2937";
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Hoodie mockup">
      <path
        d="M60 46 L40 54 L16 124 L38 132 L52 94 L52 192 L148 192 L148 94 L162 132 L184 124 L160 54 L140 46 Z"
        fill={base}
      />
      <path d="M68 50 Q100 0 132 50 Q100 66 68 50 Z" fill="#111827" />
      <path d="M92 58 L90 84 M108 58 L110 84" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 154 L132 154 L140 182 L60 182 Z" fill="#111827" />
      <Mark cx={100} cy={104} r={16} logo={d.logo} name={d.name} color={d.color} />
      <Name x={100} y={138} text={d.name} maxWidth={80} maxSize={11} fill={shade(d.color, 0.35)} />
    </svg>
  );
}

function Mug({d}) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Coffee mug mockup">
      <ellipse cx="92" cy="182" rx="62" ry="8" fill="rgba(0,0,0,0.12)" />
      <path d="M150 78 Q186 78 186 112 Q186 146 150 146" fill="none" stroke="#e5e7eb" strokeWidth="14" />
      <rect x="34" y="42" width="116" height="138" rx="12" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="34" y="42" width="116" height="22" rx="10" fill={d.color} />
      <rect x="34" y="54" width="116" height="10" fill={d.color} />
      <rect x="34" y="166" width="116" height="14" rx="6" fill={shade(d.color, 0.75)} />
      <Mark cx={92} cy={104} r={22} logo={d.logo} name={d.name} color={d.color} onDark={false} />
      <Name x={92} y={146} text={d.name} maxWidth={100} maxSize={12} fill={shade(d.color, -0.3)} />
      <rect x="44" y="48" width="12" height="122" rx="6" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

function Cap({d}) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Cap mockup">
      <ellipse cx="104" cy="168" rx="80" ry="10" fill="rgba(0,0,0,0.1)" />
      <path d="M36 128 Q36 52 104 48 Q172 52 172 128 Z" fill={d.color} />
      <path d="M104 48 L104 128 M70 56 Q76 92 72 128 M138 56 Q132 92 136 128" stroke={shade(d.color, -0.2)} strokeWidth="1.5" fill="none" />
      <circle cx="104" cy="50" r="5" fill={shade(d.color, -0.3)} />
      <path d="M28 126 Q104 156 196 122 Q188 146 108 152 Q52 150 28 126 Z" fill={shade(d.color, -0.25)} />
      <Mark cx={104} cy={96} r={18} logo={d.logo} name={d.name} color={d.color} />
    </svg>
  );
}

function VisitingCard({d}) {
  const phone = d.phone || "98XXX XXXXX";
  const city = d.city || "Your city";
  return (
    <svg viewBox="0 0 340 200" role="img" aria-label="Visiting card mockup">
      <rect x="14" y="20" width="320" height="176" rx="14" fill="rgba(0,0,0,0.08)" />
      <rect x="6" y="10" width="320" height="176" rx="14" fill="#ffffff" stroke="#eef0f4" />
      <path d="M6 24 Q6 10 20 10 L120 10 L80 186 L20 186 Q6 186 6 172 Z" fill={d.color} />
      <path d="M120 10 L134 10 L94 186 L80 186 Z" fill={shade(d.color, 0.5)} />
      <Mark cx={52} cy={98} r={28} logo={d.logo} name={d.name} color={d.color} />
      <text x="150" y="70" fontFamily="Plus Jakarta Sans, Arial" fontWeight="800" fontSize={fitFont(d.name, 165, 18)} fill="#111827">
        {d.name}
      </text>
      <text x="150" y="90" fontFamily="Arial" fontSize="10" fill="#6b7280">
        {TEMPLATES[d.type].label}
      </text>
      <rect x="150" y="104" width="40" height="3" rx="2" fill={d.color} />
      <text x="150" y="132" fontFamily="Arial" fontSize="11" fill="#374151">📞 {phone}</text>
      <text x="150" y="152" fontFamily="Arial" fontSize="11" fill="#374151">📍 {city}</text>
    </svg>
  );
}

function FlexBanner({d}) {
  const t = TEMPLATES[d.type];
  const id = `flex-${d.color.slice(1)}`;
  return (
    <svg viewBox="0 0 600 200" role="img" aria-label="Shop flex banner mockup">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={d.color} />
          <stop offset="1" stopColor={shade(d.color, -0.45)} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x="4" y="4" width="592" height="192" rx="10" />
        </clipPath>
      </defs>
      <rect x="4" y="4" width="592" height="192" rx="10" fill={`url(#${id})`} />
      <g clipPath={`url(#${id}-clip)`}>
        <circle cx="560" cy="20" r="90" fill="rgba(255,255,255,0.08)" />
        <circle cx="40" cy="200" r="70" fill="rgba(255,255,255,0.06)" />
      </g>
      <Mark cx={92} cy={100} r={52} logo={d.logo} name={d.name} color={d.color} />
      <text x="170" y="92" fontFamily="Plus Jakarta Sans, Arial" fontWeight="800" fontSize={fitFont(d.name, 400, 44)} fill="#fff">
        {d.name}
      </text>
      <text x="172" y="122" fontFamily="Arial" fontSize="16" fill="rgba(255,255,255,0.85)">
        {t.headline}
      </text>
      <rect x="170" y="140" width="250" height="32" rx="16" fill="#fff" />
      <text x="295" y="161" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="13" fill={shade(d.color, -0.3)}>
        {(d.phone || "98XXX XXXXX") + " · " + (d.city || "Your city")}
      </text>
    </svg>
  );
}

const ITEMS = [
  {id: "tshirt", label: "Staff t-shirt", Comp: Tshirt},
  {id: "hoodie", label: "Hoodie", Comp: Hoodie},
  {id: "mug", label: "Coffee mug", Comp: Mug},
  {id: "cap", label: "Cap", Comp: Cap},
  {id: "card", label: "Visiting card", Comp: VisitingCard, wide: true},
  {id: "banner", label: "Shop flex banner", Comp: FlexBanner, wide: true}
];

export default function MerchDemo({details}) {
  return (
    <div className="merch" style={{"--ds": details.color}}>
      <div className="merch__head">
        <p className="merch__kicker">Branded merchandise</p>
        <h2>{details.name} — your brand on everything</h2>
        <p>T-shirts, hoodies, mugs, caps, cards and banners with your logo and colours.</p>
      </div>
      <div className="merch__grid">
        {ITEMS.map(({id, label, Comp, wide}) => (
          <figure key={id} className={`merch__item ${wide ? "merch__item--wide" : ""}`}>
            <div className="merch__stage">
              <Comp d={details} />
            </div>
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
