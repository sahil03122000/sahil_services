import React from "react";
import {
  CalendarCheck,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Smartphone,
  Sparkles
} from "lucide-react";
import {Reveal} from "../hooks/useReveal";

const services = [
  {
    Icon: Globe,
    title: "Business website",
    text: "A fast, beautiful website that shows your services, timings, location and reviews — and brings enquiries to your WhatsApp.",
    tags: ["Mobile-first", "Google-ready", "WhatsApp leads"],
    size: "wide",
    tone: "violet"
  },
  {
    Icon: CalendarCheck,
    title: "Online booking & payments",
    text: "Customers book appointments, slots or rides 24×7 and pay by UPI or card.",
    tags: ["Booking calendar", "Razorpay / UPI"],
    tone: "teal"
  },
  {
    Icon: Smartphone,
    title: "Mobile apps",
    text: "Android & iPhone apps with OTP login, notifications and payments.",
    tags: ["React Native", "Play Store"],
    tone: "orange"
  },
  {
    Icon: LayoutDashboard,
    title: "Custom software",
    text: "Dashboards to manage customers, staff, stock and reports — built for how you work.",
    tags: ["Role-based login", "Reports"],
    tone: "blue"
  },
  {
    Icon: Sparkles,
    title: "Redesign",
    text: "Turn an old, slow website into a modern one without losing your content or Google ranking.",
    tags: ["Faster", "Modern look"],
    tone: "pink"
  },
  {
    Icon: LifeBuoy,
    title: "Support & updates",
    text: "Change prices, photos or timings with one WhatsApp message — after launch too.",
    tags: ["Monthly plans", "Quick fixes"],
    size: "wide",
    tone: "green"
  }
];

export default function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="section-title">
            Everything your business needs to <em>grow online</em>
          </h2>
          <p className="section-lead">
            From a simple website to a full booking system — designed, built and
            launched for you.
          </p>
        </Reveal>

        <div className="bento">
          {services.map(({Icon, title, text, tags, size, tone}, i) => (
            <Reveal
              as="article"
              key={title}
              className={`bento__card bento__card--${tone} ${size === "wide" ? "bento__card--wide" : ""}`}
              delay={(i % 3) * 80}
            >
              <span className="bento__icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="tags">
                {tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
