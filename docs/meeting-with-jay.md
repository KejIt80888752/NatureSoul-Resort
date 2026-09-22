# Meeting with Jay — setup runbook

Every step below needs the resort's own login, OTP, or payment, so it is done
together in the meeting: **Jay types passwords, OTPs and card details himself;
KEJ IT drives the rest.** Nothing secret is sent over WhatsApp or email.

Bring: laptop, Jay's phone (for OTPs on naturesoulresort@gmail.com), the resort's
payment card.

---

## 1. Domain — 10 min · ~₹900/year

`naturesoulresort.com` is **not available** — it was registered by someone else on
18 March 2026 and currently redirects to an adventure agency in Rishikesh.

Recommended: **`naturessoulresort.com`** — available, and it matches the Instagram
handle (@naturessoulresort) and the "NATURE'S SOUL RESORT" name on the menu cards.
Also take `naturessoulresort.in` (cheap) so nobody else can use the brand.

- Buy at GoDaddy / Hostinger / Namecheap, registered to the resort, using
  naturesoulresort@gmail.com
- Turn on auto-renew so it never lapses
- KEJ IT then points it at the website (DNS records — 5 min, live within hours)

Ask Jay whether they want to try to recover `naturesoulresort.com` from the
current owner — it can be approached, but there is no guarantee.

## 2. Database — Neon, free · 5 min

1. neon.tech → Sign up with **naturesoulresort@gmail.com**
2. Project `naturesoul`, region **Singapore**
3. Copy the connection string → **do not send it anywhere**, it goes straight into
   Render in the next step

## 3. Booking server — Render, ~₹600/month · 10 min

1. render.com → Sign up with **naturesoulresort@gmail.com**
2. Add the payment card (Jay)
3. New → **Blueprint** → repository `KejIt80888752/NatureSoul-Resort`
   (Render needs GitHub access to the KejIt80888752 account — KEJ IT authorises this)
4. Paste the Neon connection string into `DATABASE_URL` → Apply
5. When it is live, open Environment → `ADMIN_KEY` → reveal → **this is the
   dashboard password.** Jay keeps it.
6. KEJ IT runs `./scripts/deploy-sites.sh <render URL>` → website bookings go into
   the dashboard, photo uploads stay permanently

After this step the two issues raised earlier (bookings not in the software,
photos not staying) are fixed.

## 4. Booking confirmation email — 5 min

On naturesoulresort@gmail.com: Google Account → Security → 2-Step Verification
→ App passwords → create "Nature Soul Booking". Jay pastes the 16-character code
into Render → `EMAIL_PASS`. Guests then receive a confirmation mail + PDF invoice.

## 5. Google Business Profile — 10 min

1. business.google.com with naturesoulresort@gmail.com
2. Search "Nature's Soul Resort Nandi" — if a listing exists, **claim** it;
   otherwise create one
3. Category: **Resort hotel**. Add phone, website (the new domain), photos, check-in
   12:00 PM / check-out 11:00 AM
4. Verification: Google sends a code by postcard/phone/video (1–14 days)

This is what makes the resort appear for "resorts near Nandi Hills" and
"stay near Bhoga Nandeeshwara Temple".

## 6. OTA extranet access — collect in the meeting

Confirmed OTAs: **Booking.com, MakeMyTrip, Goibibo, Airbnb**.
MakeMyTrip and Goibibo share one extranet (InGo-MMT).

For each: add KEJ IT as a user from inside the extranet if possible (safer than
sharing the owner's password). Otherwise Jay logs in on the laptop.

## 7. Channel manager

Book demo calls with **AxisRooms** and **STAAH** this week. Run
`docs/channel-manager-checklist.md`. Airbnb is connected **only** if the vendor
proves a native two-way API — otherwise Airbnb is left out (client's instruction).

---

## Questions to settle with Jay

1. **Agoda** — not in today's list, but Agoda currently shows the property as
   "Sold Out". Keep it and fix it, or close the Agoda listing?
2. **₹999 extra guest** — per person **per night**, or per person for the whole stay?
3. **Room photos** — confirm which interior photo belongs to which room
4. **Unit names** — yes, please send the official name of each villa/room
   (e.g. "Villa 01 — Forest 1BHK") with its photos; OTAs need them to match exactly
5. **Photos still missing** — swimming pool, camp fire, dining, parking
6. **Which phone number** goes on Google and the OTAs — 73493 11300 or 99860 23980
7. **Documents** — GST (can follow later), electricity bill, owner PAN & ID

---

## Still pending from the resort, not needed tonight

- Razorpay / Cashfree (bank, GST, PAN) — website works without it; bookings come
  as requests on WhatsApp and are confirmed by the team
- GST number — OTA listings can be started, but payouts need it
