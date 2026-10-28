import React from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import {whatsappUrl} from "../config";

export default function WhatsAppFab() {
  return (
    <a
      className="fab"
      href={whatsappUrl("Hi Sahil, I'd like to discuss a website for my business.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
    >
      <span className="fab__ping" aria-hidden="true" />
      <WhatsAppIcon size={30} />
    </a>
  );
}
