# WhatsApp templates — ready for Meta submission

These are the messages every guest receives after booking. Submit them exactly as
written in the WhatsApp Business API provider's dashboard (AiSensy / Interakt /
Wati / Gupshup). Meta approval usually takes a few hours to 2 working days.

## Cost note — why 2 templates, not 5

Meta charges **per template message sent**, not per booking. The client asked for
five pieces of information (welcome, booking details, resort contact, location,
food menu). Sending five separate messages costs five times as much and reads
like spam on the guest's phone.

The same five pieces of information are delivered below in **two messages**:

| Template | Sent when | Contains |
|---|---|---|
| `booking_confirmation` | Immediately after booking | Welcome + full booking details + resort contact |
| `pre_arrival_info` | Immediately after, or 1 day before check-in | Location + map link + food menu + meal preference request |

If the client insists on five separate messages, split them at the `———` marks —
the wording stays valid.

---

## Template 1 — `booking_confirmation`

- **Category:** UTILITY
- **Language:** English
- **Header:** Text — `Booking Confirmed`
- **Buttons:** Call button → `+91 99860 23980` (optional)

**Body:**

```
Hello {{1}},

Thank you for booking with Nature Soul Resort. Your stay is confirmed and we are looking forward to hosting you.

Booking ID: {{2}}
Room: {{3}}
Check-in: {{4}}
Check-out: {{5}}
Guests: {{6}}
Tariff: Rs. {{7}} per night

Please carry the same ID proof used while booking.

Need anything before your stay? Call us on +91 99860 23980 or reply to this message.
```

**Variables:**

| Variable | Value | Example |
|---|---|---|
| {{1}} | Guest name | Ramesh Kumar |
| {{2}} | Booking ID | 1042 |
| {{3}} | Room name | Forest 1BHK Villa 1 |
| {{4}} | Check-in date and time | 24 Aug 2026, 12:00 PM |
| {{5}} | Check-out date and time | 26 Aug 2026, 10:00 AM |
| {{6}} | Number of guests | 2 adults, 1 child |
| {{7}} | Tariff per night | 6,500 |

**Sample for the approval form** (Meta asks for example values — paste these):
Ramesh Kumar / 1042 / Forest 1BHK Villa 1 / 24 Aug 2026, 12:00 PM /
26 Aug 2026, 10:00 AM / 2 adults, 1 child / 6,500

---

## Template 2 — `pre_arrival_info`

- **Category:** UTILITY
- **Language:** English
- **Header:** Text — `Your stay details`
- **Buttons:** URL button → Google Maps link (recommended, keeps the body shorter)

**Body:**

```
Hello {{1}}, here are the details for your stay at Nature Soul Resort.

*How to reach us*
23 Sultanpet Road, Near Govt Middle School, Nandi Hills, Nandi, Karnataka - 562103
Map: https://maps.app.goo.gl/7HaBjV8xz1pjXhdEA
Free parking is available inside the property.

*Food menu*
Breakfast (8:00 AM - 10:00 AM): Idli / Dosa, Pongal, Bread & Eggs, Tea / Coffee
Lunch (1:00 PM - 3:00 PM): South Indian meals, Chicken / Mutton curry, Rice, Rasam, Curd
Evening snacks (5:00 PM - 6:30 PM): Bajji / Bonda, Tea / Coffee
Dinner (8:00 PM - 10:00 PM): Chapati / Parotta, Veg & Non-veg curry, Fried Rice / Noodles

Please reply with your meal preference (veg / non-veg) and the number of guests, so our kitchen can prepare in advance.
```

**Variables:**

| Variable | Value | Example |
|---|---|---|
| {{1}} | Guest name | Ramesh Kumar |

> **Menu must be replaced.** The menu above is a placeholder written for the
> demo. Get the resort's real menu and timings before submitting — once a
> template is approved, changing the text means re-submitting it.

---

## Submission rules that cause rejection

1. Variables cannot contain line breaks, tabs, or more than four consecutive spaces.
2. A message cannot start or end with a variable.
3. Category must be UTILITY (it follows a transaction). Marking it MARKETING
   costs more and can be blocked by user preferences.
4. Do not use words like "free", "offer", "discount" in a UTILITY template.
5. The business number must be verified and cannot be an existing personal
   WhatsApp account — if the resort's current number is on normal WhatsApp, it
   must first be deleted from the app before it can be moved to the API.

## Provider comparison (India)

| Provider | Approx. monthly | Notes |
|---|---|---|
| AiSensy | Rs. 999 onwards | Popular with small hotels, simple dashboard |
| Interakt | Rs. 999 onwards | Good UI, shared team inbox |
| Wati | Rs. 1,999 onwards | Strong automation and team features |
| Gupshup | Pay as you go | Cheaper at volume, more technical |

Meta charges its own per-message fee on top of the provider's monthly plan.

## What we need before submitting

1. The resort's **real food menu** and meal timings
2. The WhatsApp business number to be used (and it must not be active on the normal WhatsApp app)
3. Facebook Business Manager access for the resort (or we create one)
4. Provider account chosen and paid
