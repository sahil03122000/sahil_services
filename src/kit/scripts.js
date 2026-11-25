/* Sales scripts for the kit, in simple Hinglish. Each business type has its
   own pain point, pitch and recommended plan; {placeholders} are filled from
   the lead. Edit freely — nothing here needs Claude or any paid service. */

export const TYPES = {
  clinic: {
    label: "Clinic / Hospital / Doctor",
    search: ["clinic", "doctor", "dental clinic", "hospital"],
    pain: "Mareez ab \"doctor near me\" Google karte hain aur wahi jaate hain jahan timing, reviews aur appointment ka option dikhta hai",
    pitch: "website par aapki timing, specialist, location aur WhatsApp par appointment — sab ek jagah",
    plan: "Complete Website ₹9,999 (baad mein online booking add ho sakti hai)"
  },
  ca: {
    label: "CA / Tax consultant / Lawyer",
    search: ["CA", "tax consultant", "GST consultant", "advocate"],
    pain: "Naye clients GST, ITR ke liye pehle online check karte hain ki firm professional hai ya nahi",
    pitch: "ek professional website jisme aapki services, experience aur enquiry form ho — bharosa turant banta hai",
    plan: "Complete Website ₹9,999"
  },
  coaching: {
    label: "Coaching / School / Academy",
    search: ["coaching centre", "school", "academy", "computer institute"],
    pain: "Parents admission se pehle coaching online compare karte hain — results, fees, timing",
    pitch: "website par courses, results, faculty aur admission enquiry — seedha WhatsApp par",
    plan: "Complete Website ₹9,999 + Growth Care (admission season mein Google posts)"
  },
  taxi: {
    label: "Taxi / Travels / Tour",
    search: ["taxi service", "tour and travels", "car rental"],
    pain: "Bahar se aane wale log \"taxi near me\" search karke jo pehla number milta hai usi ko call karte hain",
    pitch: "website aur Google Maps par aapka number sabse upar, saath mein routes aur rates",
    plan: "Complete Website ₹9,999 (booking ke liye ₹20,000 wala option)"
  },
  shop: {
    label: "Shop / Showroom / Store",
    search: ["clothing store", "mobile shop", "furniture showroom", "jewellers", "hardware store"],
    pain: "Customer dukaan aane se pehle phone par dekhte hain ki kya milta hai aur dukaan kahan hai",
    pitch: "products ki photos, offers aur location ke saath ek website, aur WhatsApp par order",
    plan: "Starter ₹999 (3 mahine) — ya Complete Website ₹9,999"
  },
  gym: {
    label: "Gym / Yoga / Fitness",
    search: ["gym", "fitness centre", "yoga classes"],
    pain: "Naye members gym join karne se pehle Google par photos, fees aur reviews dekhte hain",
    pitch: "website par trainers, photos, plans aur free trial ka WhatsApp button",
    plan: "Starter ₹999 — ya Complete Website ₹9,999"
  },
  salon: {
    label: "Salon / Parlour / Spa",
    search: ["beauty parlour", "salon", "bridal makeup"],
    pain: "Log \"parlour near me\" search karke photos aur reviews dekh kar appointment lete hain",
    pitch: "website par services, rate list, bridal photos aur WhatsApp par booking",
    plan: "Starter ₹999 + Google Business Profile"
  },
  restaurant: {
    label: "Restaurant / Cafe / Sweets",
    search: ["restaurant", "cafe", "sweet shop", "bakery", "dhaba"],
    pain: "Log khana order karne se pehle Google par menu, photos aur reviews dekhte hain",
    pitch: "menu, photos, timing aur party orders ke liye WhatsApp — sab ek website par",
    plan: "Starter ₹999 + Google Business Profile"
  }
};

export const STATUSES = ["New", "Called", "Meeting fixed", "Demo sent", "Won", "Not interested"];

export const CITIES = ["Ateli", "Narnaul", "Mahendergarh", "Rewari", "Gurgaon"];

const fill = (text, lead) =>
  text
    .replaceAll("{owner}", lead.owner?.trim() || "Sir/Madam")
    .replaceAll("{business}", lead.business.trim())
    .replaceAll("{city}", lead.city?.trim() || "aapke shehar")
    .replaceAll("{type}", TYPES[lead.type].label.split(" /")[0].toLowerCase());

/* All the scripts for one lead, as {title, text} blocks per tab. */
export function scriptsFor(lead, link) {
  const t = TYPES[lead.type];
  const blocks = {
    call: [
      {
        title: "1. Shuruaat (10 second)",
        text: "Namaste, kya main {owner} ji se baat kar raha hoon? Main Sahil bol raha hoon, {city} se. Bas 1 minute lunga — abhi baat ho sakti hai?"
      },
      {
        title: "2. Wajah batao (20 second)",
        text: `Maine Google par {city} mein {type} search kiya. ${t.pain}. {business} wahan theek se nahi dikh raha.`
      },
      {
        title: "3. Sawaal poochho — phir chup ho kar suno",
        text: "Abhi aapke paas naye customer zyadatar kaise aate hain? Kya aapne kabhi website ya Google listing ke baare mein socha hai?"
      },
      {
        title: "4. Meeting maango (do time ka option do)",
        text: `Main local businesses ke liye ${t.pitch} banata hoon. Maine {business} ke naam se ek free demo bhi bana kar rakha hai — kya main kal 10 minute ke liye aa kar dikha doon? Subah 11 baje ya shaam 5 baje, kaunsa theek rahega?`
      }
    ],
    whatsapp: [
      {
        title: "Pehla message (demo link ke saath)",
        text: `Namaste {owner} ji, main Sahil — {city} se. Maine {business} ke liye ek free demo website banayi hai, ek baar dekhiye 👇\n${link}\n\n${t.pitch.charAt(0).toUpperCase() + t.pitch.slice(1)}. Shuruaat sirf ₹999 se. Pasand aaye to batayiye, 10 minute mein milkar sab samjha dunga. 🙏`
      },
      {
        title: "Follow-up (2 din baad, reply na aaye to)",
        text: "Namaste {owner} ji, {business} ki demo website dekhi aapne? Koi badlaav chahiye to bataiye — naam, colour, photos sab aapke hisaab se ho jayega. Kal 5 baje 5 minute call kar loon?"
      },
      {
        title: "Meeting ke baad",
        text: "Namaste {owner} ji, aaj milne ke liye dhanyavaad! Jaisa baat hui — " + t.plan + ". Shuru karne ke liye bas logo aur 5–6 photos WhatsApp kar dijiye, main 7–10 din mein website live kar dunga."
      }
    ],
    objections: [
      {title: "\"Price kitna hai?\"", text: "₹999 se shuru hota hai, pehle 3 mahine website + domain + Google Maps. Poora package ₹9,999 ek baar. Aapke liye kaunsa theek rahega, milkar 10 minute mein bata deta hoon."},
      {title: "\"Website ki zaroorat nahi\"", text: "Bilkul samajh sakta hoon. Sirf Google Maps listing se bhi kaafi customer aate hain — wahi ek baar dikha deta hoon, pasand na aaye to koi baat nahi."},
      {title: "\"Pehle bhi banwayi thi, kaam nahi aayi\"", text: "Kya dikkat aayi thi? Mere saath domain aapke naam par hota hai, 3 mahine free support hai, aur main {city} mein hi hoon — kabhi bhi mil sakte hain."},
      {title: "\"Soch ke batata hoon\"", text: "Zaroor. Demo ka link WhatsApp par bhej deta hoon, ghar walon ko bhi dikha dijiye. Parso 11 baje call karoon?"},
      {title: "\"Mehnga hai\"", text: "Isiliye ₹999 wala Starter plan hai — ek baar ka bada kharcha nahi, mahine ka ₹499. Ek naya customer bhi aaya to paisa wasool."}
    ],
    close: [
      {title: "Recommended plan", text: t.plan},
      {title: "Closing line", text: "Aapko kaunsa theek laga — ek baar ka ₹9,999 package ya ₹999 se mahine wala? … Theek hai, aaj advance de dijiye, kal tak kaam shuru."},
      {title: "Haan bolein to", text: "Wahi UPI se advance lo (Starter: ₹999 · Package: ₹5,000). Logo, 5–6 photos, timing, services aur address WhatsApp par mangwao. Quotation/Invoice template se bill bhejo."}
    ]
  };
  return Object.fromEntries(
    Object.entries(blocks).map(([tab, items]) => [tab, items.map(b => ({title: b.title, text: fill(b.text, lead)}))])
  );
}

/* wa.me needs the number with country code, digits only. */
export function waNumber(phone = "") {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  return digits;
}
