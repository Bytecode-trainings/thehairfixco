# The Hair Fix Co. — website

Plain static site. No build step — open `index.html` directly, or serve the folder with any static host.

```
thehairfixco/
├── index.html        # single page, all sections
├── css/styles.css
├── js/script.js       # theme toggle, mobile menu, copy button, booking form
├── images/            # hero/studio/consult photos + favicon
├── robots.txt
└── sitemap.xml
```

## Before this goes live

1. **Booking form backend** — the form posts to [Web3Forms](https://web3forms.com) (free, no server needed). Get a free access key there and paste it into the hidden `access_key` input near the top of the `<form id="bookingForm">` block in `index.html`, replacing `YOUR_WEB3FORMS_ACCESS_KEY`. Until that's set, the form shows a message telling visitors to use WhatsApp/call instead — it won't silently fail.
2. **Ad + analytics tags** — once you have a GA4 ID, Meta Pixel ID and Google Ads conversion ID, add them in `<head>` in `index.html`. Fire the Meta Pixel's `Lead` event and the Google Ads conversion event on the booking form's success branch in `js/script.js` (inside the `.then(function(data){ if(data && data.success){ ... } })` block).
3. **Before/after photos** — the "Transformations" section still has placeholder image slots. Swap in real client photos (with their written consent) and update the three `.transform-img` blocks.
4. **Domain** — `index.html`'s canonical/Open Graph tags and `robots.txt`/`sitemap.xml` are already set to `thehairfixco.in`. Update them if the final domain differs.

## What's already handled

- Mobile-first responsive layout, sticky booking bar on mobile (Call + WhatsApp), 44px+ tap targets
- Pre-filled WhatsApp message, click-to-call phone links
- Light/dark theme toggle
- Open Graph/Twitter card tags (for link previews on Meta ads/WhatsApp shares), `HealthAndBeautyBusiness` schema.org markup (for local SEO/Google Maps), `robots.txt`, `sitemap.xml`
