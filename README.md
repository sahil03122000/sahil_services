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
  per-page price, add-on features, design/urgency multipliers, and the
  range shown to visitors

Section text lives in `src/components/` (one file per section).

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
