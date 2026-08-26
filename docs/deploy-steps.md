# Going live — step by step

Two accounts have to be created by the resort/KEJ IT (they need a login and a
card, so they cannot be created for you). Everything else is automated.

Total time: about 20 minutes.

---

## Step 1 — Database (Neon, free)

1. Go to https://neon.tech and sign up (GitHub login works).
2. Create a project — name it `naturesoul`, region **Singapore** (closest to India).
3. On the project dashboard, copy the **connection string**. It looks like:
   `postgresql://user:password@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
4. Keep it in a safe place. **This is a password — do not paste it into chat, email or WhatsApp.**

Free tier gives 0.5 GB, which is enough for years of bookings for 9 units.

---

## Step 2 — API server (Render, ~Rs. 600/month)

1. Go to https://render.com and sign up with the **KejIt80888752** GitHub account.
2. Click **New → Blueprint**.
3. Select the repository `KejIt80888752/NatureSoul-Resort`.
4. Render reads `render.yaml` and shows the service `naturesoul-booking-api`.
   It will ask for the values it cannot guess:
   - **DATABASE_URL** → paste the Neon connection string from Step 1
   - EMAIL_USER / EMAIL_PASS / OWNER_EMAIL → leave blank for now (Step 4)
5. Click **Apply**. First deploy takes 3–5 minutes.
6. When it goes live, copy the service URL — something like
   `https://naturesoul-booking-api.onrender.com`

**Plan:** the blueprint uses `starter` (~Rs. 600/month, always on). To test for
free first, change `plan: starter` to `plan: free` in `render.yaml` — but note a
free service sleeps after 15 minutes and the next booking request then takes
about 50 seconds.

### Get the admin key

Render generates it automatically. Dashboard → the service → **Environment** →
`ADMIN_KEY` → click the eye icon to reveal it. This is the password for the staff
dashboard. Give it only to the resort owner/manager.

---

## Step 3 — Point the websites at the API

Send KEJ IT the **API URL only** (it is public, not a secret — the admin key and
the database string are the secrets, and they never leave the Render dashboard).

Then, from the project folder:

```bash
./scripts/deploy-sites.sh https://naturesoul-booking-api.onrender.com
```

That rebuilds and republishes both sites. After about a minute:

- Website https://kejit80888752.github.io/NatureSoul-Resort/ shows live availability
- Dashboard https://kejit80888752.github.io/NatureSoul-Dashboard/ asks for the admin key
  and then shows real bookings

### Check it worked

```bash
curl https://naturesoul-booking-api.onrender.com/health
curl https://naturesoul-booking-api.onrender.com/api/rooms
```

The first should return `{"status":"ok",...}`, the second the 9 rooms.

---

## Step 4 — Booking confirmation email (optional, free)

1. On the resort's Gmail account, turn on **2-Step Verification**
   (Google Account → Security).
2. Then Security → **App passwords** → create one named "Nature Soul Booking".
   Google shows a 16-character password.
3. In Render → Environment, add:
   - `EMAIL_USER` = the resort Gmail address
   - `EMAIL_PASS` = the 16-character app password
   - `OWNER_EMAIL` = the address that should receive a copy of every booking
4. Save. Render restarts the service; the log should show `SMTP ready`.

**Never use the actual Gmail login password**, and do not send the app password
over chat — type it directly into Render.

---

## Step 5 — Advance payment (when the gateway account is ready)

Needs the resort's bank account and GST details on Razorpay or Cashfree.
Once the account is approved and the API keys exist, tell KEJ IT — the payment
step is added to the booking flow and the advance lands directly in the resort's
bank account.

---

## Rolling back

Every deploy is a normal Git push, so any earlier version can be restored.
Render also keeps a deploy history with a one-click rollback.

## After going live

- The dashboard admin key should be changed if any staff member leaves.
- Neon and Render both keep automatic backups; a monthly export from the
  dashboard is still worth doing.
- The old repository history contains a committed `.env` — rotate that Gmail app
  password and any old database credentials before go-live.
