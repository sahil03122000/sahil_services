/* =========================================================================
   Site settings — edit these.
   ========================================================================= */

export const CONTACT = {
  name: "Sahil Gupta",
  // WhatsApp / phone number with country code, digits only.
  phone: "917027098656",
  email: "sahil84330@gmail.com",
  // Enquiries from the quote form are emailed to `email` above.
  // With no key they go through FormSubmit (formsubmit.co): the FIRST enquiry
  // sends an activation email to `email` — open it and click "Activate Form"
  // once. Optional: paste a free key from https://web3forms.com here to use
  // Web3Forms instead. Either way the key/email is safe to publish.
  web3formsKey: "",
  // Your photo for the About section: put the file in public/assets/ and
  // write its name here, e.g. "sahil.jpg". Leave empty to show initials.
  photo: "",
  portfolio: "https://sahilgupta03.github.io/sahil_portfolio/",
  linkedin: "https://www.linkedin.com/in/sahil-gupta-169759190"
};

export const whatsappUrl = (message = "") =>
  `https://wa.me/${CONTACT.phone}` +
  (message ? `?text=${encodeURIComponent(message)}` : "");

export const prettyPhone = () => {
  const local = CONTACT.phone.replace(/^91/, "");
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
};

/* =========================================================================
   Cost calculator prices (₹). These are starting estimates shown to
   visitors — change them to match what you actually charge.
   ========================================================================= */

export const PRICING = {
  projects: [
    {
      id: "website",
      label: "Business website",
      hint: "Show your services, timings, location & reviews",
      base: 8000,
      includedPages: 5,
      pages: true,
      days: "7–10 days"
    },
    {
      id: "booking",
      label: "Website + online booking",
      hint: "Customers book appointments, slots or rides online",
      base: 20000,
      includedPages: 5,
      pages: true,
      days: "2–3 weeks"
    },
    {
      id: "store",
      label: "Online store",
      hint: "Sell products with cart, UPI & card payments",
      base: 25000,
      includedPages: 5,
      pages: true,
      days: "3–4 weeks"
    },
    {
      id: "app",
      label: "Mobile app",
      hint: "Android & iPhone app for your customers",
      base: 50000,
      pages: false,
      days: "5–8 weeks"
    },
    {
      id: "software",
      label: "Custom software / dashboard",
      hint: "Manage customers, staff, stock or reports",
      base: 35000,
      pages: false,
      days: "4–6 weeks"
    },
    {
      id: "none",
      label: "Only branding / marketing",
      hint: "No website — just logo, banners, posts, SEO or ads",
      base: 0,
      pages: false,
      noSite: true,
      days: "starts in 2–3 days"
    }
  ],
  perExtraPage: 1000,
  maxPages: 20,
  // One-time add-ons. `siteOnly` ones are hidden for "Only branding / marketing".
  features: [
    {id: "payments", label: "Online payments (UPI / cards)", price: 5000, siteOnly: true},
    {id: "admin", label: "Admin panel to edit content yourself", price: 6000, siteOnly: true},
    {id: "seo", label: "SEO setup (rank on Google)", price: 3000},
    {id: "gbp", label: "Google Business Profile setup", price: 1500},
    {id: "whatsapp", label: "WhatsApp Business setup", price: 1000},
    {id: "bilingual", label: "Hindi + English (two languages)", price: 4000, siteOnly: true},
    {id: "blog", label: "Blog / news & updates section", price: 3000, siteOnly: true},
    {id: "logo", label: "Logo & brand kit", price: 2500},
    {id: "banners", label: "Banner / poster designs (set of 3)", price: 1500},
    {id: "domain", label: "Domain, hosting & business email (1st year)", price: 3000}
  ],
  // Monthly services, shown separately from the one-time price.
  monthly: [
    {id: "seoMonthly", label: "SEO — monthly ranking work", price: 3000},
    {id: "social", label: "Social media posts (12 per month)", price: 4000},
    {
      id: "ads",
      label: "Google / Facebook ads management",
      price: 5000,
      note: "Ad budget is paid directly to Google / Meta"
    },
    {id: "maintenance", label: "Maintenance & updates", price: 1000}
  ],
  // Always included at no extra cost.
  included: [
    "Mobile-friendly design",
    "WhatsApp & call buttons",
    "Enquiry form",
    "SSL (https) security"
  ],
  design: [
    {id: "clean", label: "Clean & simple", multiplier: 1},
    {id: "premium", label: "Premium custom design", multiplier: 1.3}
  ],
  speed: [
    {id: "standard", label: "Standard timeline", multiplier: 1},
    {id: "urgent", label: "Urgent (faster delivery)", multiplier: 1.25}
  ],
  // Shown as a range: estimate × low … estimate × high.
  rangeLow: 0.9,
  rangeHigh: 1.15
};

/* Minimum order quantities for printing — shown on the Print services, the
   merchandise demo and the FAQ. Confirm these with your print partner. */
export const MIN_ORDER = {
  item: 15, // t-shirts, hoodies, mugs, caps, bottles, ID cards… (per item)
  cards: 500, // visiting cards
  pamphlets: 1000 // pamphlets, flyers, brochures
};

export const minLabel = kind =>
  kind === "none"
    ? "No minimum"
    : kind === "cards"
      ? `Min. ${MIN_ORDER.cards} cards`
      : kind === "pamphlets"
        ? `Min. ${MIN_ORDER.pamphlets.toLocaleString("en-IN")} pcs`
        : `Min. ${MIN_ORDER.item} pcs per item`;

// Lowest price for a calculator item, used for "from ₹…" labels.
export const priceOf = id => {
  const all = [...PRICING.projects.map(p => ({id: p.id, price: p.base})), ...PRICING.features, ...PRICING.monthly];
  return all.find(item => item.id === id)?.price;
};
