# Sahil Gupta — Websites & Apps (services site)

Client-facing website for freelance web and app work. Kept separate from the
developer portfolio (https://sahilgupta03.github.io/sahil_portfolio/), which is
for jobs and recruiters.

Plain HTML, CSS and JavaScript — no build step, so it loads fast on slow
mobile data and deploys to GitHub Pages as-is.

## Files

```
index.html   all page content (services, work, FAQ, contact form)
styles.css   design and layout
script.js    WhatsApp / call / email links and the quote form
assets/      project screenshots and icons
```

## Settings

Edit the `CONFIG` block at the top of `script.js`:

- `phone` — WhatsApp and call number, country code first, digits only
- `email` — where email links and the fallback form point
- `web3formsKey` — free key from https://web3forms.com. With a key, the quote
  form emails enquiries straight to your inbox; without one, "Send enquiry"
  opens the visitor's email app.

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Push to a GitHub repository and enable **Settings → Pages → Deploy from a
branch → main / (root)**.
