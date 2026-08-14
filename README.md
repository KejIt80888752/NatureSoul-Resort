# Nature Soul Resort

Resort website (React + Vite) and its booking API.

**Live site:** https://kejit80888752.github.io/NatureSoul-Resort/

```
src/              React website  → deployed to GitHub Pages (gh-pages branch)
booking-backend/  Express + PostgreSQL booking API → see booking-backend/README.md
```

## Website

```bash
npm install
npm run dev          # static mode: rooms come from src/assets/data/roomsData.js
npm run dev:api      # talks to a booking API on http://localhost:5055
npm run build        # production build into dist/
```

### Two modes

Without `VITE_API_URL` the site runs standalone: the room list is bundled with
the site, and a booking is confirmed in the browser (saved to localStorage) so
the site can be demoed without any server.

With `VITE_API_URL` set at build time, the same pages read live availability
from the API and every booking is stored in the database.

```bash
VITE_API_URL=https://your-api.onrender.com npm run build
```

Optional: `VITE_RECAPTCHA_SITE_KEY` — when set, the booking form shows a
reCAPTCHA and the API verifies it (needs `RECAPTCHA_SECRET` on the server, and
the site key must be registered for the site's domain).

## Deploying the website

```bash
npm run build
cp dist/index.html dist/404.html
# publish the contents of dist/ to the gh-pages branch
```

Routing uses `HashRouter` (`/#/rooms`), so deep links work on GitHub Pages
without any server configuration.

## Chat assistant

The floating assistant answers from `src/assets/data/resortInfo.js` and
`src/assets/utils/chatBrain.js` — no API key, no external service. Room names
and prices come from the same data the site renders, so they never drift.
Anything not in those files is handed over to the resort team instead of being
guessed.

## Admin

`/#/admin/bookings` lists real bookings. It asks once for the admin key
(`ADMIN_KEY` from the API environment) and keeps it in the browser.
