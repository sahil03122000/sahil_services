/* =========================================================================
   Site settings — edit these.
   ========================================================================= */

export const CONTACT = {
  name: "Sahil Gupta",
  // WhatsApp / phone number with country code, digits only.
  phone: "917027098656",
  email: "sahil84330@gmail.com",
  // Free key from https://web3forms.com. With a key, the quote form emails
  // enquiries straight to your inbox; without one, "Send enquiry" opens the
  // visitor's email app instead. The key is safe to publish.
  web3formsKey: "",
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
    }
  ],
  perExtraPage: 1000,
  maxPages: 20,
  features: [
    {id: "payments", label: "Online payments (UPI / cards)", price: 5000},
    {id: "admin", label: "Admin panel to edit content yourself", price: 6000},
    {id: "seo", label: "Google SEO + Business Profile setup", price: 3000},
    {id: "bilingual", label: "Hindi + English (two languages)", price: 4000},
    {id: "blog", label: "Blog / news & updates section", price: 3000},
    {id: "logo", label: "Logo design", price: 2000},
    {id: "domain", label: "Domain + hosting setup (1st year)", price: 2500}
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
  rangeHigh: 1.15,
  supportPerMonth: 1000
};
