import React from "react";
import {TEMPLATES} from "../demo/templates";
import {fitFont, initials, shade} from "../demo/utils";

const FONT = "Plus Jakarta Sans, Arial, sans-serif";

/* Logo mark for the mockups: the uploaded logo on a disc, or the business
   initials when no logo was given. */
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
        <text x={cx} y={cy} dy="0.35em" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize={r * 0.85} fill={onDark ? color : "#fff"}>
          {initials(name)}
        </text>
      )}
    </g>
  );
}

const Name = ({x, y, text, maxWidth, maxSize, fill, anchor = "middle"}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={FONT} fontWeight="800" fontSize={fitFont(text, maxWidth, maxSize)} fill={fill}>
    {text}
  </text>
);

const Shadow = ({cx = 100, cy = 188, rx = 64}) => <ellipse cx={cx} cy={cy} rx={rx} ry="7" fill="rgba(0,0,0,0.1)" />;

/* ---------- Mockups (each draws into a 200×200 box unless noted) ---------- */

function Tshirt({d}) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="T-shirt mockup">
      <path d="M60 22 L82 12 Q100 26 118 12 L140 22 L182 50 L164 82 L148 72 L148 190 L52 190 L52 72 L36 82 L18 50 Z" fill={d.color} />
      <path d="M82 12 Q100 30 118 12" fill="none" stroke={shade(d.color, -0.3)} strokeWidth="4" />
      <Mark cx={100} cy={82} r={20} logo={d.logo} name={d.name} color={d.color} />
      <Name x={100} y={124} text={d.name} maxWidth={84} maxSize={12} fill="#fff" />
      <text x="100" y="140" textAnchor="middle" fontFamily="Arial" fontSize="7" fill="rgba(255,255,255,0.8)" letterSpacing="2">STAFF</text>
    </svg>
  );
}

function Hoodie({d}) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Hoodie mockup">
      <path d="M60 46 L40 54 L16 124 L38 132 L52 94 L52 192 L148 192 L148 94 L162 132 L184 124 L160 54 L140 46 Z" fill="#1f2937" />
      <path d="M68 50 Q100 0 132 50 Q100 66 68 50 Z" fill="#111827" />
      <path d="M92 58 L90 84 M108 58 L110 84" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 154 L132 154 L140 182 L60 182 Z" fill="#111827" />
      <Mark cx={100} cy={104} r={16} logo={d.logo} name={d.name} color={d.color} />
      <Name x={100} y={138} text={d.name} maxWidth={80} maxSize={11} fill={shade(d.color, 0.35)} />
    </svg>
  );
}

function Scrubs({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Hospital scrubs mockup">
      <path d="M60 22 L84 14 L100 46 L116 14 L140 22 L178 48 L162 78 L148 70 L148 190 L52 190 L52 70 L38 78 L22 48 Z" fill={c} />
      <path d="M84 14 L100 46 L116 14" fill="none" stroke={shade(c, -0.35)} strokeWidth="4" strokeLinejoin="round" />
      <rect x="112" y="96" width="26" height="24" rx="3" fill="none" stroke={shade(c, -0.25)} strokeWidth="2" />
      <path d="M100 46 L100 190" stroke={shade(c, -0.12)} strokeWidth="1.5" />
      <Mark cx={76} cy={94} r={12} logo={d.logo} name={d.name} color={c} />
      <Name x={76} y={118} text={d.name} maxWidth={40} maxSize={7} fill="#fff" />
    </svg>
  );
}

function LabCoat({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Doctor coat mockup">
      <path d="M62 20 L84 12 L100 42 L116 12 L138 20 L176 52 L166 150 L150 146 L150 196 L50 196 L50 146 L34 150 L24 52 Z" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" />
      <path d="M84 12 L100 42 L92 92 L70 40 Z M116 12 L100 42 L108 92 L130 40 Z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
      <path d="M100 42 L100 196" stroke="#d1d5db" strokeWidth="1.5" />
      {[110, 132, 154].map(y => <circle key={y} cx="106" cy={y} r="2.5" fill="#9ca3af" />)}
      <rect x="114" y="150" width="26" height="22" rx="3" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
      <Mark cx={74} cy={104} r={11} logo={d.logo} name={d.name} color={c} onDark={false} />
      <Name x={74} y={126} text={d.name} maxWidth={40} maxSize={7} fill={shade(c, -0.2)} />
    </svg>
  );
}

function Cap({d}) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Cap mockup">
      <Shadow cx={104} cy={168} rx={80} />
      <path d="M36 128 Q36 52 104 48 Q172 52 172 128 Z" fill={d.color} />
      <path d="M104 48 L104 128 M70 56 Q76 92 72 128 M138 56 Q132 92 136 128" stroke={shade(d.color, -0.2)} strokeWidth="1.5" fill="none" />
      <circle cx="104" cy="50" r="5" fill={shade(d.color, -0.3)} />
      <path d="M28 126 Q104 156 196 122 Q188 146 108 152 Q52 150 28 126 Z" fill={shade(d.color, -0.25)} />
      <Mark cx={104} cy={96} r={18} logo={d.logo} name={d.name} color={d.color} />
    </svg>
  );
}

function Mug({d}) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Coffee mug mockup">
      <Shadow cx={92} cy={184} rx={62} />
      <path d="M150 78 Q186 78 186 112 Q186 146 150 146" fill="none" stroke="#e5e7eb" strokeWidth="14" />
      <rect x="34" y="42" width="116" height="138" rx="12" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="34" y="42" width="116" height="22" rx="10" fill={d.color} />
      <rect x="34" y="54" width="116" height="10" fill={d.color} />
      <Mark cx={92} cy={104} r={22} logo={d.logo} name={d.name} color={d.color} onDark={false} />
      <Name x={92} y={146} text={d.name} maxWidth={100} maxSize={12} fill={shade(d.color, -0.3)} />
      <rect x="44" y="48" width="10" height="124" rx="5" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

function Shaker({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Gym shaker mockup">
      <Shadow cx={100} cy={190} rx={46} />
      <rect x="86" y="8" width="28" height="12" rx="4" fill={shade(c, -0.35)} />
      <path d="M66 22 L134 22 L138 46 L62 46 Z" fill={shade(c, -0.35)} />
      <path d="M64 46 L136 46 L128 186 Q128 190 124 190 L76 190 Q72 190 72 186 Z" fill="rgba(255,255,255,0.85)" stroke="#d1d5db" strokeWidth="2" />
      <path d="M68 100 L132 100 L128 186 Q128 190 124 190 L76 190 Q72 190 72 186 Z" fill={c} opacity="0.9" />
      {[60, 72, 84].map(y => <line key={y} x1="70" y1={y} x2="80" y2={y} stroke="#9ca3af" strokeWidth="1.5" />)}
      <Mark cx={100} cy={132} r={18} logo={d.logo} name={d.name} color={c} />
      <Name x={100} y={170} text={d.name} maxWidth={52} maxSize={10} fill="#fff" />
    </svg>
  );
}

function Bottle({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Water bottle mockup">
      <Shadow cx={100} cy={192} rx={36} />
      <rect x="84" y="6" width="32" height="22" rx="6" fill="#374151" />
      <path d="M86 28 L114 28 L120 46 L80 46 Z" fill="#9ca3af" />
      <rect x="72" y="46" width="56" height="146" rx="18" fill={c} />
      <rect x="80" y="54" width="8" height="128" rx="4" fill="rgba(255,255,255,0.3)" />
      <Mark cx={100} cy={110} r={17} logo={d.logo} name={d.name} color={c} />
      <Name x={100} y={146} text={d.name} maxWidth={48} maxSize={9} fill="#fff" />
    </svg>
  );
}

function Apron({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Apron mockup">
      <path d="M78 34 Q100 6 122 34" fill="none" stroke={shade(c, -0.3)} strokeWidth="5" />
      <path d="M74 34 L126 34 L130 84 L168 92 L160 194 L40 194 L32 92 L70 84 Z" fill={c} />
      <path d="M70 84 L30 96 M130 84 L170 96" stroke={shade(c, -0.3)} strokeWidth="4" strokeLinecap="round" />
      <rect x="72" y="150" width="56" height="30" rx="4" fill="none" stroke={shade(c, -0.2)} strokeWidth="2" />
      <Mark cx={100} cy={66} r={16} logo={d.logo} name={d.name} color={c} />
      <Name x={100} y={120} text={d.name} maxWidth={96} maxSize={12} fill="#fff" />
    </svg>
  );
}

function Tote({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Tote bag mockup">
      <Shadow cx={100} cy={192} rx={70} />
      <path d="M72 66 Q72 20 100 20 Q128 20 128 66" fill="none" stroke={shade(c, -0.3)} strokeWidth="6" />
      <path d="M40 62 L160 62 L168 190 L32 190 Z" fill="#f5efe6" stroke="#e5ddd0" strokeWidth="2" />
      <Mark cx={100} cy={118} r={26} logo={d.logo} name={d.name} color={c} onDark={false} />
      <Name x={100} y={168} text={d.name} maxWidth={110} maxSize={13} fill={shade(c, -0.25)} />
    </svg>
  );
}

function IdCard({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="ID card mockup">
      <path d="M78 0 L96 52 M122 0 L104 52" stroke={c} strokeWidth="9" />
      <rect x="94" y="46" width="12" height="12" rx="2" fill="#9ca3af" />
      <rect x="52" y="56" width="96" height="140" rx="10" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <path d="M52 66 Q52 56 62 56 L138 56 Q148 56 148 66 L148 92 L52 92 Z" fill={c} />
      <Mark cx={100} cy={92} r={14} logo={d.logo} name={d.name} color={c} />
      <circle cx="100" cy="132" r="15" fill="#e5e7eb" />
      <circle cx="100" cy="127" r="6" fill="#9ca3af" />
      <path d="M90 142 Q100 132 110 142" fill="#9ca3af" />
      <text x="100" y="162" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="8" fill="#111827">Employee Name</text>
      <Name x={100} y={178} text={d.name} maxWidth={84} maxSize={8} fill={shade(c, -0.2)} />
    </svg>
  );
}

function Diary({d}) {
  const c = d.color;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Diary mockup">
      <rect x="50" y="22" width="112" height="160" rx="8" fill="rgba(0,0,0,0.1)" />
      <rect x="42" y="16" width="112" height="160" rx="8" fill={shade(c, -0.35)} />
      <rect x="42" y="16" width="14" height="160" rx="6" fill={shade(c, -0.5)} />
      <rect x="136" y="16" width="8" height="160" fill={shade(c, 0.3)} />
      <Mark cx={98} cy={82} r={22} logo={d.logo} name={d.name} color={c} />
      <Name x={98} y={128} text={d.name} maxWidth={76} maxSize={11} fill={shade(c, 0.6)} />
      <text x="98" y="146" textAnchor="middle" fontFamily="Arial" fontSize="7" letterSpacing="2" fill={shade(c, 0.4)}>{new Date().getFullYear() + 1}</text>
    </svg>
  );
}

function Pamphlet({d}) {
  const c = d.color;
  const t = TEMPLATES[d.type];
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Pamphlet mockup">
      <rect x="54" y="10" width="100" height="184" rx="4" fill="rgba(0,0,0,0.08)" />
      <rect x="48" y="6" width="100" height="184" rx="4" fill="#fff" stroke="#e5e7eb" />
      <rect x="48" y="6" width="100" height="64" rx="4" fill={c} />
      <Mark cx={98} cy={30} r={12} logo={d.logo} name={d.name} color={c} />
      <Name x={98} y={58} text={d.name} maxWidth={86} maxSize={10} fill="#fff" />
      <foreignObject x="56" y="76" width="84" height="40">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{font: `800 8px/1.2 ${FONT}`, color: "#111827", textAlign: "center"}}>
          {t.headline}
        </div>
      </foreignObject>
      {[122, 132, 142].map(y => <rect key={y} x="60" y={y} width="76" height="4" rx="2" fill="#e5e7eb" />)}
      <rect x="66" y="156" width="64" height="16" rx="8" fill={c} />
      <text x="98" y="167" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="6.5" fill="#fff">{d.phone || "98XXX XXXXX"}</text>
    </svg>
  );
}

function VisitingCard({d}) {
  return (
    <svg viewBox="0 0 340 200" role="img" aria-label="Visiting card mockup">
      <rect x="14" y="20" width="320" height="176" rx="14" fill="rgba(0,0,0,0.08)" />
      <rect x="6" y="10" width="320" height="176" rx="14" fill="#ffffff" stroke="#eef0f4" />
      <path d="M6 24 Q6 10 20 10 L120 10 L80 186 L20 186 Q6 186 6 172 Z" fill={d.color} />
      <path d="M120 10 L134 10 L94 186 L80 186 Z" fill={shade(d.color, 0.5)} />
      <Mark cx={52} cy={98} r={28} logo={d.logo} name={d.name} color={d.color} />
      <Name x={150} y={70} text={d.name} maxWidth={165} maxSize={18} fill="#111827" anchor="start" />
      <text x="150" y="90" fontFamily="Arial" fontSize="10" fill="#6b7280">{TEMPLATES[d.type].label}</text>
      <rect x="150" y="104" width="40" height="3" rx="2" fill={d.color} />
      <text x="150" y="132" fontFamily="Arial" fontSize="11" fill="#374151">📞 {d.phone || "98XXX XXXXX"}</text>
      <text x="150" y="152" fontFamily="Arial" fontSize="11" fill="#374151">📍 {d.city || "Your city"}</text>
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
      <Name x={170} y={92} text={d.name} maxWidth={400} maxSize={44} fill="#fff" anchor="start" />
      <text x="172" y="122" fontFamily="Arial" fontSize="16" fill="rgba(255,255,255,0.85)">{t.headline}</text>
      <rect x="170" y="140" width="250" height="32" rx="16" fill="#fff" />
      <text x="295" y="161" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="13" fill={shade(d.color, -0.3)}>
        {(d.phone || "98XXX XXXXX") + " · " + (d.city || "Your city")}
      </text>
    </svg>
  );
}

/* ---------- Catalogue ---------- */

// `keywords` power the search box — English plus common Hinglish words.
export const CATALOG = [
  {id: "tshirt", label: "T-shirt", Comp: Tshirt, keywords: "tshirt t-shirt tee polo uniform staff kapda"},
  {id: "hoodie", label: "Hoodie", Comp: Hoodie, keywords: "hoodie hudi hoody sweatshirt jacket winter"},
  {id: "scrubs", label: "Hospital scrubs", Comp: Scrubs, keywords: "hospital dress scrubs nurse uniform clinic medical"},
  {id: "labcoat", label: "Doctor coat", Comp: LabCoat, keywords: "doctor coat lab apron hospital dress white clinic"},
  {id: "cap", label: "Cap", Comp: Cap, keywords: "cap topi hat"},
  {id: "mug", label: "Coffee mug", Comp: Mug, keywords: "mug cup coffee tea chai"},
  {id: "shaker", label: "Gym shaker", Comp: Shaker, keywords: "shaker gym protein bottle sipper"},
  {id: "bottle", label: "Water bottle", Comp: Bottle, keywords: "bottle water sipper flask"},
  {id: "apron", label: "Apron", Comp: Apron, keywords: "apron chef kitchen restaurant salon cook"},
  {id: "tote", label: "Tote bag", Comp: Tote, keywords: "bag tote jhola carry shopping thaila"},
  {id: "idcard", label: "ID card & lanyard", Comp: IdCard, keywords: "id card lanyard badge identity staff"},
  {id: "diary", label: "Diary", Comp: Diary, keywords: "diary notebook planner copy"},
  {id: "pamphlet", label: "Pamphlet", Comp: Pamphlet, keywords: "pamphlet flyer leaflet brochure parcha poster"},
  {id: "card", label: "Visiting card", Comp: VisitingCard, keywords: "visiting card business card", wide: true},
  {id: "banner", label: "Shop flex banner", Comp: FlexBanner, keywords: "flex banner board hoarding signboard", wide: true}
];

// Pre-selected items for each business type.
export const SUGGESTED = {
  clinic: ["scrubs", "labcoat", "idcard", "card", "banner"],
  ca: ["card", "diary", "idcard", "mug", "banner"],
  coaching: ["tshirt", "hoodie", "idcard", "diary", "pamphlet"],
  taxi: ["tshirt", "cap", "card", "pamphlet", "banner"],
  shop: ["tshirt", "tote", "card", "pamphlet", "banner"],
  gym: ["tshirt", "hoodie", "shaker", "bottle", "banner"],
  salon: ["apron", "tshirt", "card", "pamphlet", "banner"],
  restaurant: ["apron", "cap", "mug", "pamphlet", "banner"]
};

export default function MerchDemo({details, selected}) {
  const items = CATALOG.filter(item => selected.includes(item.id));
  return (
    <div className="merch" style={{"--ds": details.color}}>
      <div className="merch__head">
        <p className="merch__kicker">Branded merchandise</p>
        <h2>{details.name} — your brand on everything</h2>
        <p>Your logo and colours on the items you picked.</p>
      </div>
      {items.length ? (
        <div className="merch__grid">
          {items.map(({id, label, Comp, wide}) => (
            <figure key={id} className={`merch__item ${wide ? "merch__item--wide" : ""}`}>
              <div className="merch__stage">
                <Comp d={details} />
              </div>
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="merch__empty">Pick at least one item above to see it with your brand.</p>
      )}
    </div>
  );
}
