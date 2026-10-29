import React, {useEffect, useRef, useState} from "react";
import {
  CalendarCheck,
  Coffee,
  CreditCard,
  Globe,
  Images,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  Megaphone,
  Newspaper,
  Package,
  PenTool,
  Presentation,
  Search,
  Server,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Shirt,
  Image as ImageIcon
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {MIN_ORDER, minLabel, priceOf} from "../config";
import {Reveal} from "../hooks/useReveal";

const inr = n => `₹${n.toLocaleString("en-IN")}`;

/* `price` points at an item in PRICING (config.js) so labels stay in sync
   with the calculator. `monthly` adds "/month". */
const categories = [
  {
    id: "build",
    label: "Build",
    blurb: "Websites, apps & software",
    tone: "violet",
    items: [
      {Icon: Globe, title: "Business website", text: "A fast, beautiful site that shows your services, timings, location and reviews — and sends enquiries to WhatsApp.", tags: ["Mobile-first", "Google-ready"], price: "website"},
      {Icon: CalendarCheck, title: "Online booking & payments", text: "Customers book appointments, slots or rides 24×7 and pay by UPI or card.", tags: ["Booking calendar", "Razorpay / UPI"], price: "booking"},
      {Icon: ShoppingBag, title: "Online store", text: "Sell products online with a catalogue, cart, UPI payments and order alerts.", tags: ["Cart & checkout", "Order alerts"], price: "store"},
      {Icon: Smartphone, title: "Mobile apps", text: "Android & iPhone apps with OTP login, notifications and payments.", tags: ["React Native", "Play Store"], price: "app"},
      {Icon: LayoutDashboard, title: "Custom software", text: "Dashboards to manage customers, staff, stock and reports — built around how you work.", tags: ["Role-based login", "Reports"], price: "software"},
      {Icon: Sparkles, title: "Website redesign", text: "Turn an old, slow website into a modern one — without losing your content or Google ranking.", tags: ["Faster", "Modern look"]}
    ]
  },
  {
    id: "grow",
    label: "Grow",
    blurb: "Get found & get customers",
    tone: "orange",
    items: [
      {Icon: Search, title: "SEO", text: "Show up when people nearby search for what you offer — on-page SEO, speed and local keywords.", tags: ["Local SEO", "Monthly reports"], price: "seo"},
      {Icon: MapPin, title: "Google Business Profile", text: "Set up or fix your Google Maps listing with photos, services, timings and a review link.", tags: ["Google Maps", "Reviews"], price: "gbp"},
      {Icon: Megaphone, title: "Google & Facebook ads", text: "Targeted ads that bring calls and WhatsApp enquiries from your area. Ad budget paid directly to Google / Meta.", tags: ["Local targeting", "Leads"], price: "ads", monthly: true},
      {Icon: Images, title: "Social media posts", text: "Eye-catching Instagram & Facebook posts — offers, festivals and updates — designed every month.", tags: ["12 posts / month", "Festival creatives"], price: "social", monthly: true}
    ]
  },
  {
    id: "brand",
    label: "Brand",
    blurb: "Look professional everywhere",
    tone: "pink",
    items: [
      {Icon: PenTool, title: "Logo & branding", text: "A memorable logo with brand colours and fonts, plus visiting card and letterhead designs.", tags: ["Logo", "Brand kit"], price: "logo"},
      {Icon: ImageIcon, title: "Banner & poster design", text: "Designs for flex banners, posters, brochures, menu cards and social media — ready to print or post. Need them printed too? See the Print tab.", tags: ["Print-ready files", "Digital"], price: "banners"}
    ]
  },
  {
    id: "print",
    label: "Print",
    blurb: "Merchandise & printing",
    tone: "blue",
    items: [
      {Icon: Shirt, title: "T-shirts & hoodies", text: "Staff uniforms, event t-shirts and hoodies with your logo — designed by me, printed by my trusted print partner.", tags: ["Staff uniforms", "Events", "Bulk orders"], minimum: minLabel("item")},
      {Icon: Coffee, title: "Mugs, caps & gifts", text: "Coffee mugs, caps, diaries, pens and keychains with your logo — for staff, clients and festive gifting.", tags: ["Coffee mugs", "Caps", "Corporate gifts"], minimum: minLabel("item")},
      {Icon: Presentation, title: "Flex & banners", text: "Shop boards, flex banners, standees and event backdrops — designed and printed in the size you need.", tags: ["Shop boards", "Standees", "Any size"], minimum: `${minLabel("none")} · priced by size`},
      {Icon: Newspaper, title: "Pamphlets & brochures", text: "Pamphlets, flyers, brochures and menu cards for your promotions — designed and printed in bulk.", tags: ["Flyers", "Brochures", "Menu cards"], minimum: minLabel("pamphlets")},
      {Icon: CreditCard, title: "Cards & stationery", text: "Visiting cards, letterheads, bill books, stickers and ID cards — everything with your brand on it.", tags: ["Visiting cards", "Bill books", "ID cards"], minimum: `Visiting cards min. ${MIN_ORDER.cards} · ID cards min. ${MIN_ORDER.item}`}
    ]
  },
  {
    id: "care",
    label: "Setup & care",
    blurb: "Everything set up & running",
    tone: "teal",
    items: [
      {Icon: WhatsAppIcon, title: "WhatsApp Business setup", text: "Business profile, catalogue, quick replies and auto-greeting — connected to your website.", tags: ["Catalogue", "Auto-reply"], price: "whatsapp"},
      {Icon: Server, title: "Domain, hosting & email", text: "Your own .in / .com domain, fast hosting and a professional email like info@yourbusiness.in.", tags: ["Your name", "SSL included"], price: "domain"},
      {Icon: LifeBuoy, title: "Maintenance plans", text: "Updates, backups, fixes and content changes every month, so your site keeps working.", tags: ["Backups", "Quick changes"], price: "maintenance", monthly: true}
    ]
  }
];

export default function Services() {
  const [active, setActive] = useState(categories[0].id);
  const tabRefs = useRef({});
  const current = categories.find(c => c.id === active);

  // On phones the tab row scrolls sideways — keep the chosen tab in view.
  // Scrolls only the tab row, never the page.
  useEffect(() => {
    const tab = tabRefs.current[active];
    const row = tab?.parentElement;
    if (!tab || !row) return;
    const offset = tab.getBoundingClientRect().left - row.getBoundingClientRect().left;
    const left = row.scrollLeft + offset - (row.clientWidth - tab.offsetWidth) / 2;
    row.scrollTo({left: Math.max(0, left), behavior: "smooth"});
  }, [active]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = e => {
    const i = categories.findIndex(c => c.id === active);
    let next = null;
    if (e.key === "ArrowRight") next = categories[(i + 1) % categories.length];
    if (e.key === "ArrowLeft") next = categories[(i - 1 + categories.length) % categories.length];
    if (!next) return;
    e.preventDefault();
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="section-title">
            Everything your business needs to <em>grow online</em>
          </h2>
          <p className="section-lead">
            One person for your website, app, Google, ads and branding — no need
            to manage five different vendors.
          </p>
        </Reveal>

        <div className="tabs" role="tablist" aria-label="Service categories" onKeyDown={onKeyDown}>
          {categories.map(cat => (
            <button
              key={cat.id}
              ref={el => (tabRefs.current[cat.id] = el)}
              type="button"
              role="tab"
              id={`tab-${cat.id}`}
              aria-selected={active === cat.id}
              aria-controls={`panel-${cat.id}`}
              tabIndex={active === cat.id ? 0 : -1}
              className={`tab tab--${cat.tone} ${active === cat.id ? "is-active" : ""}`}
              onClick={() => setActive(cat.id)}
            >
              <span className="tab__label">{cat.label}</span>
              <span className="tab__blurb">{cat.blurb}</span>
              <span className="tab__count">{cat.items.length}</span>
            </button>
          ))}
        </div>

        <div
          key={current.id}
          className="service-grid"
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
        >
          {current.items.map(({Icon, title, text, tags, price, monthly, minimum}, i) => {
            const amount = price ? priceOf(price) : null;
            return (
              <article
                key={title}
                className={`service-card service-card--${current.tone}`}
                style={{animationDelay: `${i * 60}ms`}}
              >
                <div className="service-card__top">
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <span className="service-card__price">
                    {amount ? (
                      <>
                        from <b>{inr(amount)}</b>
                        {monthly ? "/mo" : ""}
                      </>
                    ) : (
                      "Custom quote"
                    )}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                {minimum && (
                  <p className="service-card__min">
                    <Package size={15} aria-hidden="true" /> {minimum}
                  </p>
                )}
                <ul className="tags">
                  {tags.map(tag => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <Reveal className="services-cta">
          <p>Need more than one? Combine a website with Google, ads and social media in one package.</p>
          <a href="#pricing" className="link">
            Build your package in the calculator →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
