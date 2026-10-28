import React, {useState} from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Calculator from "./components/Calculator";
import DemoBuilder from "./components/DemoBuilder";
import Work from "./components/Work";
import About from "./components/About";
import Process from "./components/Process";
import Why from "./components/Why";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import CtaBanner from "./components/CtaBanner";
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
        <DemoBuilder />
        <Calculator onGetQuote={setPrefill} />
        <Work />
        <About />
        <Process />
        <Why />
        <Faq />
        <CtaBanner />
        <Contact prefill={prefill} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
