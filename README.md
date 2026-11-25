# J. Aslin Jebi & M. Bervin Adams — Wedding Invitation

A 3D animated digital wedding invitation built with React, Vite, Tailwind CSS v4, Framer Motion and React Three Fiber.

**Monday, 7th December 2026 · 10:00 AM – 11:00 AM · St. Peter & Paul Church, Saral**

## Run it

```bash
npm install
npm run dev       # local development server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint
```

Upload the `dist/` folder to any static host (Netlify, Vercel, Firebase Hosting, …).

### Clean URLs

Each section has its own address: `/couple`, `/invitation`, `/countdown`, `/details`, `/gallery` and `/blessing`, with `/` for the top. These replace hash links like `/#details`.

- Clicking a link scrolls smoothly and updates the address bar without reloading the page. Back and Forward also work.
- When a guest opens a shared link such as `/details`, they still see the envelope first. After opening it, the page goes straight to that section.
- Old hash links such as `/#details` are rewritten to `/details`. Unknown paths fall back to `/`.

The host must serve `index.html` for every path. This is already set up for:

- `npm run dev` and `npm run preview` (Vite does this by default)
- **Netlify**, through `public/_redirects`
- **Vercel**, through `vercel.json`

Other hosts:

- **Firebase:** add `"rewrites": [{ "source": "**", "destination": "/index.html" }]` to `firebase.json`.
- **Apache:** use `FallbackResource /index.html`.
- **GitHub Pages:** it has no rewrites, so copy `dist/index.html` to `dist/404.html` after building.

The routing code is in `src/utils/router.js` and `src/hooks/useSectionRouting.js`. Links use `src/components/SectionLink.jsx`.

## What visitors see

1. **3D envelope.** An ivory envelope sealed with a heart-shaped wax seal ("A ♥ B"). Petals and glowing particles drift behind it. Clicking **Open Invitation** (or the seal) breaks the seal, opens the flap in 3D and slides the card out.
2. **Hero.** The illustrated couple from the printed invitation in an arched floral frame, with the names written in ink.
3. **Bride & Groom.** Portrait cards with floral rings.
4. **Invitation message**, word for word.
5. **Live countdown** to 7 Dec 2026, 10:00 AM IST. It is correct in any visitor's timezone. From the start time it shows a wedding-day message, and afterwards a thank-you.
6. **Wedding details.** Date, time and venue, plus **Get Directions** and **Add to Calendar** (.ics download).
7. **3D gallery.** Tilting cards and a lightbox that supports keyboard and swipe.
8. **Blessing.** The closing message and a navy "We warmly welcome you and your family!" ribbon.

Reduced-motion preferences are respected: petals, particles, parallax and floating effects are switched off.

## Customising

Every name, date, link and image is set in **`src/config/wedding.js`**.

| What | Where | Notes |
| --- | --- | --- |
| Google Maps link | `mapsUrl` | Already set to the link in the invitation's "Scan for location" QR code. |
| Background music | `musicSrc` | **Empty by default**, so the music button stays hidden. See below. |
| Bride / groom photos | `portraits.bridePhoto`, `portraits.groomPhoto` | `null` uses the illustrated portraits cropped from the invitation. |
| Gallery photos | `gallery` | Four entries are **placeholders** ("Photo coming soon"). |
| Illustration crops | `reference.crops` | Pixel rectangles on the 1024×1536 invitation image. |

### Add real photos

1. Copy the photos into `public/images/`, for example `public/images/photo-1.jpg`. Keep each one under about 300 KB and about 1600 px on the long side.
2. In `src/config/wedding.js`, replace a placeholder entry:

   ```js
   { id: 'photo-1', type: 'image', src: '/images/photo-1.jpg', alt: 'The couple at the beach' },
   ```

3. For portrait photos, set `portraits.bridePhoto: '/images/bride.jpg'` (square crops look best).

### Add background music

Only use music you have the rights to.

1. Put the file in `public/audio/`, for example `public/audio/wedding.mp3`.
2. Set `export const musicSrc = '/audio/wedding.mp3'`.

The music starts when the guest clicks **Open Invitation**, because browsers only allow audio after a user action. A floating button lets guests play, pause and mute it.

## Project structure

```
src/
  App.jsx                 page composition and the envelope → site transition
  main.jsx, index.css     entry point and Tailwind v4 theme (colours, fonts, utilities)
  config/wedding.js       all wedding content and asset settings
  hooks/                  useCountdown, useMediaQuery, useReducedMotionPref, useScrollLock
  utils/                  calendar (.ics) export, seeded random for decorations
  components/
    Envelope.jsx  Navbar.jsx  Hero.jsx  CoupleSection.jsx  InvitationMessage.jsx
    Countdown.jsx  WeddingDetails.jsx  Gallery.jsx  Footer.jsx  MusicPlayer.jsx
    gallery/              GalleryMedia, Lightbox
    decor/                florals, hearts, wax seal, petals, Three.js particles, reveal helpers
  assets/images/          invitation-reference.jpeg (the printed invitation)
  assets/audio/           (optional) audio you import from code
public/images/            drop-in photos referenced by URL
```

Three.js is loaded lazily, only for the opening particle effect, so the rest of the site stays light.
