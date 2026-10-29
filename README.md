# Sahil Gupta — Websites & Apps (services site)

Client-facing website for freelance web and app work, with a live price
calculator. Kept separate from the developer portfolio
(https://sahilgupta03.github.io/sahil_portfolio/), which is for jobs and
recruiters.

Built with React + Vite. Icons from `lucide-react`.

## Edit the content

Almost everything you'll want to change is in **`src/config.js`**:

- `CONTACT` — WhatsApp/phone number, email, Web3Forms key, links
- `PRICING` — every price used by the calculator: project base prices,
  per-page price, one-time add-ons (SEO, logo, banners, WhatsApp setup…),
  monthly services (SEO, social media, ads, maintenance), design/urgency
  multipliers, and the range shown to visitors. The "from ₹…" labels in the
  Services section read from here too.

The free demo generator ("See your website before you pay") builds a sample
site from the visitor's business name, type, city, phone and colour. Its
eight business templates live in `src/demo/templates.js`. Nothing the
visitor types is sent anywhere. The preview window blocks right-click,
selection, copy, drag, save and print, and covers the preview with a
"DEMO" watermark — this stops casual copying but not a determined developer.

The demo hero uses a stock photo per business type from
`public/assets/demo/<type>.jpg`, or the visitor's own photo if they add one
(kept in the browser, never uploaded). The stock photos are from Unsplash
under the Unsplash License (free for commercial use, no attribution
required); Unsplash IDs: clinic `photo-1758691462878`, ca `photo-1499750310107`,
coaching `photo-1509062522246`, taxi `photo-1765446647632`, shop
`photo-1776000680544`, gym `photo-1689877020200`, salon `photo-1792523297859`,
restaurant `photo-1767114915989`. To change one, replace the file keeping its name.

Section text lives in `src/components/` (one file per section). The service
list and its four tabs (Build, Grow, Brand, Setup & care) are in
`src/components/Services.jsx`.

### Email enquiries (Web3Forms)

Get a free key at https://web3forms.com and paste it into
`CONTACT.web3formsKey`. With a key, the quote form emails enquiries straight
to your inbox; without one, "Send enquiry" opens the visitor's email app.
The key is safe to publish.

## Commands

```bash
npm install        # first time only
npm run dev        # local preview at http://localhost:5173/sahil_services/
npm run build      # production build into dist/
npm run deploy     # build + publish dist/ to the gh-pages branch
```

The site is served from `/sahil_services/` (set in `vite.config.js`). If you
rename the GitHub repository, update `base` there too.

## Structure

```
index.html            page shell, SEO tags, fonts
public/assets/        project screenshots and icons
src/config.js         contact details and calculator prices
src/App.jsx           section order
src/components/       Header, Hero, Marquee, Services, Calculator, Work,
                      Process, Why, Faq, Contact, Footer, WhatsAppFab
src/hooks/useReveal   scroll-in animations
src/styles.css        design tokens and all styles
```
