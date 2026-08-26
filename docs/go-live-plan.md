# Nature Soul Resort — go-live plan

Status legend: ✅ done · 🔄 in progress · ⏸ blocked (waiting on someone) · ⬜ not started

---

## Already done ✅

| Item | Status |
|---|---|
| Resort website live | ✅ https://kejit80888752.github.io/NatureSoul-Resort/ |
| Staff dashboard live (separate link) | ✅ https://kejit80888752.github.io/NatureSoul-Dashboard/ |
| Booking API — availability, bookings, double-booking prevention, validation | ✅ code complete, tested |
| Availability calendar with staff blocking | ✅ |
| Rate and photo editing from dashboard | ✅ |
| Booking notifications in dashboard | ✅ |
| Guest WhatsApp message content | ✅ written, templates ready to submit |
| Confirmation email + PDF invoice | ✅ code complete, needs email account |
| Website chat assistant | ✅ |
| Terms & Conditions acceptance | ✅ (client to review the policy wording) |
| OTA onboarding data sheet | ✅ `docs/ota-onboarding-data.csv` |
| Vendor demo checklist | ✅ `docs/channel-manager-checklist.md` |
| WhatsApp templates for Meta | ✅ `docs/whatsapp-templates.md` |

---

## Week 1 — vendor selection ⏸

| # | Task | Owner | Blocked on |
|---|---|---|---|
| 1.1 | Book demo calls with AxisRooms and STAAH | KEJ IT | — |
| 1.2 | Run the demo checklist on both calls, fill the scoring sheet | KEJ IT | demo scheduled |
| 1.3 | Get written quotes (monthly + setup + lock-in) | KEJ IT | — |
| 1.4 | Client approves vendor and budget | Client | quotes |
| 1.5 | Take the subscription | Client | 1.4 |

## Week 1 (parallel) — our own booking system ⏸

| # | Task | Owner | Blocked on |
|---|---|---|---|
| 2.1 | Create Neon PostgreSQL database (free tier) | KEJ IT | — |
| 2.2 | Deploy booking API on Render (~Rs. 600/month) | KEJ IT | hosting purchase |
| 2.3 | Set env vars: DATABASE_URL, ALLOWED_ORIGINS, ADMIN_KEY | KEJ IT | 2.2 |
| 2.4 | Rebuild website + dashboard with the live API URL | KEJ IT | 2.3 |
| 2.5 | Add resort email account for confirmations | Client | resort Gmail + app password |
| 2.6 | Razorpay/Cashfree account for advance payment | Client | bank + GST details |
| 2.7 | Connect payment gateway to the booking flow | KEJ IT | 2.6 |

## Week 2 — OTA connectivity ⏸

| # | Task | Owner | Blocked on |
|---|---|---|---|
| 3.1 | Collect extranet logins for all 5 OTAs | Client | — |
| 3.2 | Raise connectivity request on each OTA (3–7 working days each) | KEJ IT | 1.5, 3.1 |
| 3.3 | Map all 9 units in the channel manager | KEJ IT | 3.2 |
| 3.4 | Load rates and restrictions | KEJ IT | 3.3 |
| 3.5 | Update photos and descriptions in each OTA extranet (manual) | KEJ IT | 3.1 |
| 3.6 | Test: block a unit → verify it disappears on all 5 OTAs | KEJ IT | 3.4 |

## Week 3 — WhatsApp & payments ⏸

| # | Task | Owner | Blocked on |
|---|---|---|---|
| 4.1 | Choose WhatsApp provider (AiSensy / Interakt / Wati) | Client | — |
| 4.2 | Verify the business number, set up Facebook Business Manager | KEJ IT + Client | 4.1 |
| 4.3 | Submit the 2 templates for Meta approval | KEJ IT | 4.2, real food menu |
| 4.4 | Connect booking API → WhatsApp provider so messages send automatically | KEJ IT | 4.3 approved |
| 4.5 | Test end-to-end: booking → confirmation message with correct details | KEJ IT | 4.4 |

## Week 3–4 — go live ⬜

| # | Task | Owner |
|---|---|---|
| 5.1 | Full test: book on each OTA, confirm inventory drops everywhere | KEJ IT |
| 5.2 | Staff training on the dashboard (calendar, blocking, rates) | KEJ IT |
| 5.3 | Handover: logins, admin key, documentation | KEJ IT |
| 5.4 | Two weeks of monitoring | KEJ IT |

---

## What we need from the client to unblock

| # | Item | Blocks |
|---|---|---|
| 1 | Vendor and monthly budget approval | Week 1, everything OTA |
| 2 | Extranet logins for Booking.com, Agoda, Goibibo, MakeMyTrip, Airbnb | Week 2 |
| 3 | Resort Gmail + app password (for confirmation emails) | 2.5 |
| 4 | Bank account + GST details (for payment gateway) | 2.6, 2.7 |
| 5 | Real food menu and meal timings | 4.3 |
| 6 | Cancellation / refund / advance payment policy | Terms & Conditions, 4.3 |
| 7 | Correct phone number and email — the site currently shows two different sets | Website, WhatsApp templates |
| 8 | Instagram and Facebook page links | Website footer |

---

## Known risks

| Risk | Impact | Mitigation |
|---|---|---|
| OTA connectivity approval delays | Go-live slips 1–2 weeks | Raise all 5 requests on the same day |
| WhatsApp number already active on the normal app | Cannot move to API | Confirm the number early; use a fresh SIM if needed |
| Template rejected by Meta | 1–2 day delay | Written as UTILITY, no promotional wording |
| Old credentials committed in the earlier repository history | Security | Rotate the Gmail app password and DB credentials before go-live |
