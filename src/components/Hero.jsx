import React from "react";
import {ArrowRight, CalendarCheck, Calculator, Star} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import {whatsappUrl} from "../config";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="badge">
            <span className="badge__dot" aria-hidden="true" />
            Taking new projects this month
          </p>

          <h1 className="hero__title">
            Turn Google searches into{" "}
            <span className="gradient-text">paying customers.</span>
          </h1>

          <p className="hero__lead">
            Modern websites, online booking and mobile apps for clinics, CA firms,
            coaching centres, travel agencies and local businesses — fast on every
            phone, easy to find on Google, and connected to your WhatsApp.
          </p>

          <div className="hero__actions">
            <a
              className="btn btn--primary btn--lg"
              href="#pricing"
            >
              <Calculator size={20} aria-hidden="true" />
              Check your price
            </a>
            <a
              className="btn btn--glass btn--lg"
              href={whatsappUrl("Hi Sahil, I'd like a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              Chat on WhatsApp
            </a>
          </div>

          <ul className="hero__stats">
            <li>
              <strong>7 days</strong>
              <span>to go live*</span>
            </li>
            <li>
              <strong>100%</strong>
              <span>mobile-friendly</span>
            </li>
            <li>
              <strong>24 hr</strong>
              <span>quote reply</span>
            </li>
          </ul>
          <p className="hero__footnote">*for a standard business website</p>
        </div>

        {/* Product-style mock of a client site with live notifications */}
        <div className="hero__visual" aria-hidden="true">
          <div className="browser">
            <div className="browser__bar">
              <span />
              <span />
              <span />
              <div className="browser__url">yourclinic.in</div>
            </div>
            <div className="browser__body">
              <div className="site-mock__nav">
                <b>CityCare Clinic</b>
                <i />
                <i />
                <i />
              </div>
              <div className="site-mock__hero">
                <div>
                  <span className="site-mock__h" />
                  <span className="site-mock__h site-mock__h--short" />
                  <span className="site-mock__p" />
                  <span className="site-mock__btn">
                    Book appointment <ArrowRight size={12} />
                  </span>
                </div>
                <div className="site-mock__img" />
              </div>
              <div className="site-mock__cards">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="float-card float-card--a">
            <span className="float-card__icon float-card__icon--green">
              <WhatsAppIcon size={16} />
            </span>
            <div>
              <b>New enquiry</b>
              <small>“Do you have slots today?”</small>
            </div>
          </div>

          <div className="float-card float-card--b">
            <span className="float-card__icon float-card__icon--violet">
              <CalendarCheck size={16} />
            </span>
            <div>
              <b>Appointment booked</b>
              <small>Today · 5:30 PM</small>
            </div>
          </div>

          <div className="float-card float-card--c">
            <span className="float-card__icon float-card__icon--orange">
              <Star size={16} fill="currentColor" />
            </span>
            <div>
              <b>New Google review</b>
              <small>“Booking online was so easy!”</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
