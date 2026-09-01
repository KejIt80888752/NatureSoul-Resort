// Terms shown to every first-time visitor.
//
// IMPORTANT: this is a general template. The resort owner should review it and
// replace anything that does not match the actual house policy — especially
// cancellation, refund and advance payment, which are left open on purpose
// because they were never stated anywhere on the site.
//
// Bump TERMS_VERSION whenever the text changes: every visitor is then asked to
// accept the new version once.

export const TERMS_VERSION = "1.1";
export const TERMS_UPDATED = "August 2026";

export const termsSections = [
  {
    title: "1. Booking & Confirmation",
    points: [
      "All bookings are subject to availability and are confirmed only after the resort acknowledges them.",
      "Room tariff shown on this website is per night for the selected room and may change without prior notice.",
      "The guest making the booking must be at least 18 years old and is responsible for all guests in the booking.",
    ],
  },
  {
    title: "2. Identity Proof",
    points: [
      "A valid government photo ID (Aadhaar or PAN) is mandatory at the time of booking and must be produced at check-in.",
      "Details entered must match the ID carried; the resort may refuse check-in if they do not match.",
    ],
  },
  {
    title: "3. Check-in & Check-out",
    points: [
      "Check-in and check-out timings for your stay are confirmed by the resort team at the time of booking.",
      "Early check-in and late check-out are subject to availability and may carry an additional charge.",
    ],
  },
  {
    title: "4. Payment, Cancellation & Refund",
    points: [
      "All bookings are non-refundable. Once a booking is confirmed, the amount paid is not refunded on cancellation or no-show.",
      "Date changes are subject to availability and are at the resort's discretion.",
      "Please contact the resort directly before cancelling or modifying a confirmed booking.",
    ],
  },
  {
    title: "5. Guest Conduct & Safety",
    points: [
      "Guests are expected to behave responsibly and respect other guests, staff and the property.",
      "Children must be supervised by an adult at all times, especially around the swimming pool and camp fire area.",
      "Use of the swimming pool, camp fire and other facilities is at the guest's own risk and subject to posted timings and rules.",
      "Any illegal activity, or behaviour that disturbs other guests, may result in the stay being terminated without refund.",
    ],
  },
  {
    title: "6. Damage & Belongings",
    points: [
      "Guests are responsible for any loss or damage caused to resort property during their stay and may be charged accordingly.",
      "The resort is not responsible for loss of cash, jewellery or other valuables left unattended on the premises.",
    ],
  },
  {
    title: "7. Your Information & Privacy",
    points: [
      "We collect your name, phone number, WhatsApp number, email and ID details only to process and manage your booking.",
      "Your details are not sold or shared with third parties for marketing.",
      "This website uses your browser's local storage only to remember that you accepted these terms — no tracking or advertising cookies.",
    ],
  },
  {
    title: "8. Website Content",
    points: [
      "Photographs and descriptions on this website are indicative of the resort and its surroundings.",
      "The resort may update rooms, tariff, amenities and these terms at any time; the version shown here is the current one.",
    ],
  },
];
