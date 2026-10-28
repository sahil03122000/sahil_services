import React from "react";
import {CONTACT} from "../config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="brand brand--footer" aria-label="Back to top">
          <span className="brand__mark" aria-hidden="true">SG</span>
          <span className="brand__text">
            <span className="brand__name">Sahil Gupta</span>
            <span className="brand__tag">Websites · Apps · Booking</span>
          </span>
        </a>
        <nav className="footer__links" aria-label="Footer">
          <a href="#services">Services</a>
          <a href="#pricing">Price calculator</a>
          <a href="#work">Work</a>
          <a href={CONTACT.portfolio} target="_blank" rel="noopener noreferrer">Developer portfolio</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} Sahil Gupta. Gurgaon, Haryana.</p>
      </div>
    </footer>
  );
}
