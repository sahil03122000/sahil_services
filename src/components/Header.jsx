import React, {useEffect, useState} from "react";
import {Menu, X} from "lucide-react";

const links = [
  {href: "#services", label: "Services"},
  {href: "#pricing", label: "Price calculator"},
  {href: "#work", label: "Work"},
  {href: "#about", label: "About"},
  {href: "#process", label: "Process"},
  {href: "#faq", label: "FAQ"}
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return undefined;
    const onKey = e => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__inner">
        <a href="#top" className="brand" onClick={close} aria-label="Sahil Gupta, home">
          <span className="brand__mark" aria-hidden="true">
            SG
          </span>
          <span className="brand__text">
            <span className="brand__name">Sahil Gupta</span>
            <span className="brand__tag">Websites · Apps · Marketing</span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          {links.map(link => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="#contact" className="btn btn--primary btn--sm header__cta">
            Get free quote
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="mobile-menu" hidden={!open} aria-label="Mobile">
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn--primary" onClick={close}>
          Get free quote
        </a>
      </nav>
    </header>
  );
}
