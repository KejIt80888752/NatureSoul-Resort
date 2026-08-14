# Nature Soul Resort — Booking API

Express + Sequelize + PostgreSQL. Handles room availability, bookings,
confirmation email with PDF invoice, and the admin bookings feed.

The website works without this API (it falls back to the room list bundled in
the site). Once the API is live and `VITE_API_URL` is set, the site switches to
real availability and real bookings.

---

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | – | uptime check |
| GET | `/api/rooms` | – | all rooms + availability today |
| GET | `/api/rooms?checkIn=2026-09-01&checkOut=2026-09-03` | – | availability for those dates |
| POST | `/api/bookings` | – | create a booking |
| GET | `/api/bookings` | admin key | list bookings |
| GET | `/api/bookings/invoice/:id` | admin key | download invoice PDF |
| GET | `/api/admin/bookings` | admin key | list bookings (dashboard) |

Admin requests must send the header `x-admin-key: <ADMIN_KEY>`.

Booking rules enforced on the server (a guest cannot bypass them):
name, 10-digit phone, valid email, check-out after check-in, no past dates,
Aadhaar (12 digits) or PAN format, and **no double booking** — overlapping
dates for the same room are rejected with HTTP 409 inside a transaction.

---

## Run locally

No PostgreSQL installed? Use a local file database:

```bash
cd booking-backend
npm install
DB_DIALECT=sqlite ADMIN_KEY=local-test npm start
```

With PostgreSQL: copy `.env.example` to `.env`, fill it in, then `npm start`.

---

## Deploy (Render + Neon — about $7/month)

**1. Database — Neon (free tier)**
- neon.tech → new project → copy the connection string
- it looks like `postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require`

**2. API — Render**
- render.com → New → Web Service → connect the `NatureSoul-Resort` repo
- Root Directory: `booking-backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance type: Starter ($7/mo — the free plan sleeps and the first booking
  request would take ~50 seconds)

**3. Environment variables (Render dashboard → Environment)**

| Key | Value |
|---|---|
| `DATABASE_URL` | the Neon connection string |
| `ALLOWED_ORIGINS` | `https://kejit80888752.github.io` |
| `ADMIN_KEY` | a long random string you generate |
| `EMAIL_USER` | resort Gmail address (optional) |
| `EMAIL_PASS` | Gmail **App Password**, not the login password (optional) |
| `OWNER_EMAIL` | address that gets a copy of every booking (optional) |
| `RECAPTCHA_SECRET` | reCAPTCHA v2 secret (optional) |

Gmail App Password: Google Account → Security → 2-Step Verification →
App passwords. Paste it into Render yourself; it should never be committed.

**4. Point the website at the API**

In the site root:

```bash
VITE_API_URL=https://your-api.onrender.com npm run build
```

Then publish `dist/` to the `gh-pages` branch. The site now reads live
availability, and bookings are stored in the database.

**5. Check it**

```bash
curl https://your-api.onrender.com/health
curl https://your-api.onrender.com/api/rooms
```

---

## After a model change

Deploy once with `DB_SYNC=alter` set, then remove the variable. Normal boots
only create missing tables — they never drop data.

## Security notes

- `.env` is git-ignored. Never commit real credentials.
- The old repository history contains a committed `.env`; those Gmail and
  database credentials should be rotated before going live.
- Bookings store Aadhaar/PAN numbers. Admin endpoints are key-protected —
  keep `ADMIN_KEY` private and change it if it leaks.
