import React, {useState} from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Calculator from "./components/Calculator";
import Work from "./components/Work";
import Process from "./components/Process";
import Why from "./components/Why";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";

export default function App() {
  // Filled by the cost calculator so the quote form starts with the estimate.
  const [prefill, setPrefill] = useState(null);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <Calculator onGetQuote={setPrefill} />
        <Work />
        <Process />
        <Why />
        <Faq />
        <Contact prefill={prefill} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
