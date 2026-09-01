// Offline assistant for the resort site.
// Matches a guest question against a set of intents and answers only with facts
// from src/assets/data/resortInfo.js. Anything it does not know is handed over
// to the resort team instead of being guessed.

import { resortInfo, askTheTeam } from "../data/resortInfo";
import { mealTimings, menuHighlights } from "../data/foodMenu";
import { formatPrice } from "../services/api";

const { contact, address, mapHref, amenities, rooms } = resortInfo;

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/* ---------- helpers built from the real room data ---------- */

const roomGroups = () => {
  const groups = new Map();

  rooms.forEach((room) => {
    const key = `${room.type}|${room.price}|${room.maxOccupancy}|${room.ac}`;
    const group = groups.get(key);
    if (group) {
      group.count += 1;
    } else {
      groups.set(key, { ...room, count: 1 });
    }
  });

  return [...groups.values()].sort((a, b) => a.price - b.price);
};

const roomLines = () =>
  roomGroups()
    .map(
      (g) =>
        `• ${g.type}${g.count > 1 ? ` (${g.count} units)` : ""} — ${formatPrice(
          g.price
        )} / night · up to ${g.maxOccupancy} guests · ${g.ac}`
    )
    .join("\n");

const cheapest = () => roomGroups()[0];
const largest = () =>
  [...rooms].sort((a, b) => b.maxOccupancy - a.maxOccupancy)[0];

/* ---------- intents ---------- */

const GO_ROOMS = { label: "See all rooms", to: "/rooms" };
const GO_CONTACT = { label: "Contact page", to: "/contact" };
const GO_GALLERY = { label: "View gallery", to: "/gallery" };
const GO_MENU = { label: "See full menu", to: "/menu" };
const CALL = { label: `Call ${contact.phone}`, href: contact.phoneHref };
const WHATSAPP = { label: "WhatsApp us", href: contact.whatsappHref };

const intents = [
  {
    id: "greeting",
    keywords: [
      "hi", "hii", "hello", "hey", "vanakkam", "வணக்கம்", "namaste",
      "good morning", "good evening", "good afternoon",
    ],
    reply: () => ({
      text: `Hello! Welcome to ${resortInfo.name} 🌿\nI can help you with rooms, tariff, amenities, location and booking. What would you like to know?`,
      actions: [GO_ROOMS],
    }),
  },

  {
    id: "rooms",
    keywords: [
      "room", "rooms", "villa", "villas", "cottage", "suite", "stay", "accommodation",
      "1bhk", "2bhk", "duplex", "ruum", "ரூம்", "அறை", "விடுதி",
    ],
    reply: () => ({
      text: `We have ${rooms.length} units across these categories:\n\n${roomLines()}\n\nEvery room includes WiFi and TV; the villas are AC with a mini fridge or kitchen.`,
      actions: [GO_ROOMS, GO_GALLERY],
    }),
  },

  {
    id: "price",
    keywords: [
      "price", "prices", "rate", "rates", "tariff", "cost", "charge", "charges",
      "how much", "per night", "budget", "cheap", "cheapest", "rent",
      "vilai", "kaasu", "எவ்வளவு", "விலை", "ரேட்",
    ],
    reply: () => {
      const low = cheapest();
      return {
        text: `Our tariff (per night):\n\n${roomLines()}\n\nThe most budget-friendly option is the ${low.type} at ${formatPrice(
          low.price
        )}. Rates for long stays or groups — please check with our team.`,
        actions: [GO_ROOMS, WHATSAPP],
      };
    },
  },

  {
    id: "booking",
    keywords: [
      "book", "booking", "reserve", "reservation", "how to book", "enquiry",
      "available", "availability", "vacancy", "bukking", "புக்", "பதிவு",
    ],
    reply: () => ({
      text: `Booking is simple:\n1. Open the Rooms page\n2. Pick a room → "View Details"\n3. Click "Book This Room" and fill your dates, time and ID proof (Aadhaar or PAN)\n\nFor live availability on your dates, message us on WhatsApp — our team confirms fastest there.`,
      actions: [GO_ROOMS, WHATSAPP, CALL],
    }),
  },

  {
    id: "location",
    keywords: [
      "where", "location", "address", "reach", "direction", "directions", "map",
      "nandi", "bangalore", "bengaluru", "distance", "how far",
      "enga", "edam", "எங்கே", "இடம்", "முகவரி",
    ],
    reply: () => ({
      text: `We are at:\n${address}\n\nTap below for Google Maps directions.`,
      actions: [
        { label: "Open in Google Maps", href: mapHref },
        GO_CONTACT,
      ],
    }),
  },

  {
    id: "contact",
    keywords: [
      "contact", "phone", "number", "call", "mobile", "email", "mail", "whatsapp",
      "talk", "speak", "enquire", "தொடர்பு", "போன்", "நம்பர்",
    ],
    reply: () => ({
      text: `You can reach us any time:\n📞 ${contact.phone}\n💬 WhatsApp ${contact.whatsapp}\n✉️ ${contact.email}`,
      actions: [CALL, WHATSAPP, GO_CONTACT],
    }),
  },

  {
    id: "amenities",
    keywords: [
      "amenity", "amenities", "facility", "facilities", "activities", "activity",
      "wifi", "internet", "parking", "car", "campfire", "camp fire", "bonfire",
      "nature walk", "trek", "vasathi", "வசதி", "வசதிகள்",
    ],
    reply: () => ({
      text: `Resort amenities:\n${amenities
        .map((a) => `• ${a}`)
        .join("\n")}\n\nParking and WiFi are free for all guests.`,
      actions: [GO_GALLERY, GO_ROOMS],
    }),
  },

  {
    id: "pool",
    keywords: ["pool", "swimming", "swim", "நீச்சல்", "kulam"],
    reply: () => ({
      text: `Yes — we have a swimming pool on the property, and pool timings are displayed at the poolside. For pool rules or timings on your stay date, our team will confirm.`,
      actions: [GO_GALLERY, WHATSAPP],
    }),
  },

  {
    id: "food",
    keywords: [
      "food", "menu", "dining", "restaurant", "breakfast", "lunch", "dinner", "meal",
      "meals", "kitchen", "veg", "non veg", "thali", "snacks", "coffee", "tea",
      "juice", "mojito", "milkshake", "biryani", "chicken", "saapadu", "menu card",
      "சாப்பாடு", "உணவு", "மெனு",
    ],
    reply: () => ({
      text:
        `Yes — food is served through the day:\n\n` +
        mealTimings.map((m) => `• ${m.name}: ${m.time}`).join("\n") +
        `\n\n${menuHighlights.map((h) => `• ${h}`).join("\n")}\n\n` +
        `The 2BHK and Duplex villas also have their own kitchen. Tell us your meal preference in advance and the kitchen keeps it ready.`,
      actions: [GO_MENU, WHATSAPP],
    }),
  },

  {
    id: "capacity",
    keywords: [
      "guest", "guests", "people", "person", "family", "couple", "group",
      "how many", "capacity", "occupancy", "children", "kids", "extra bed",
      "நபர்", "குடும்பம்",
    ],
    reply: () => {
      const big = largest();
      return {
        text: `Room capacity:\n\n${roomLines()}\n\nThe largest option is the ${big.name} — up to ${big.maxOccupancy} guests. On the Rooms page you can filter by number of guests.`,
        actions: [GO_ROOMS],
      };
    },
  },

  {
    id: "ac",
    keywords: ["ac", "a c", "air condition", "non ac", "cooler", "ஏசி"],
    reply: () => ({
      text: `All our villas (1BHK, 2BHK and Duplex) are AC. The Basic and Basic Double rooms are Non-AC — they stay naturally cool in the Nandi Hills weather.`,
      actions: [GO_ROOMS],
    }),
  },

  {
    id: "id-proof",
    keywords: [
      "id", "id proof", "aadhaar", "aadhar", "pan", "document", "documents",
      "identity", "ஆதார்",
    ],
    reply: () => ({
      text: `A valid ID proof is required at booking — Aadhaar (12 digits) or PAN (e.g. ABCDE1234F). Please carry the same ID at check-in.`,
      actions: [GO_ROOMS],
    }),
  },

  {
    id: "gallery",
    keywords: ["photo", "photos", "picture", "pictures", "image", "gallery", "view", "படம்", "போட்டோ"],
    reply: () => ({
      text: `Here are real photos of the resort — villas, pool area, gardens and the night lighting.`,
      actions: [GO_GALLERY, GO_ROOMS],
    }),
  },

  {
    id: "about",
    keywords: ["about", "who are you", "resort", "tell me", "story", "review", "rating", "பற்றி"],
    reply: () => ({
      text: `${resortInfo.name} is a peaceful nature retreat in Nandi Hills — greenery, fresh air and modern comfort. Great for family vacations, couples and weekend getaways, with 500+ happy guests and a 4.8★ guest rating.`,
      actions: [GO_ROOMS, GO_GALLERY],
    }),
  },

  {
    id: "timing",
    keywords: [
      "check in", "checkin", "check out", "checkout", "timing", "timings", "time",
      "what time", "நேரம்",
    ],
    reply: () => ({
      text: `You choose your check-in and check-out date and time in the booking form. Standard resort timings for your stay date are confirmed by our team — please ask them directly.`,
      actions: [WHATSAPP, CALL],
    }),
  },

  {
    id: "policy",
    keywords: [
      "cancel", "cancellation", "refund", "advance", "payment", "pay", "upi",
      "card", "pet", "pets", "dog", "party", "event", "wedding", "corporate",
      "discount", "offer",
    ],
    reply: () => ({
      text: `That one is best answered by our team directly — policies like ${askTheTeam
        .slice(1, 4)
        .join(", ")} and offers are confirmed case by case.\n\nMessage us on WhatsApp and you'll get a quick reply.`,
      actions: [WHATSAPP, CALL, GO_CONTACT],
    }),
  },

  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thank u", "nandri", "நன்றி", "super", "ok thanks"],
    reply: () => ({
      text: `Happy to help! 🌿 Hope to host you at ${resortInfo.name} soon.`,
      actions: [GO_ROOMS],
    }),
  },

  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "poitu varen"],
    reply: () => ({
      text: `Thank you for visiting! Reach out any time on WhatsApp — have a great day.`,
      actions: [WHATSAPP],
    }),
  },
];

/* ---------- matching ---------- */

const scoreIntent = (intent, text) => {
  let score = 0;

  intent.keywords.forEach((keyword) => {
    const k = normalize(keyword);
    if (!k) return;

    if (k.includes(" ")) {
      // multi-word phrase → strong signal
      if (text.includes(k)) score += k.split(" ").length * 3;
      return;
    }

    // whole-word match only, so "ac" does not match "place"
    const pattern = new RegExp(`(^| )${k}( |$)`, "u");
    if (pattern.test(text)) score += k.length > 3 ? 3 : 2;
  });

  return score;
};

export const fallbackReply = () => ({
  text: `I don't have that detail with me. Our team will answer it right away on WhatsApp or by phone.\n\nMeanwhile I can help with: rooms, tariff, amenities, location, booking steps and ID requirements.`,
  actions: [WHATSAPP, CALL, GO_CONTACT],
});

export const welcomeMessage = () => ({
  text: `Hello 👋 I'm the ${resortInfo.name} assistant.\nAsk me about rooms, tariff, amenities, location or how to book.`,
  actions: [],
});

export const quickQuestions = [
  "Room prices?",
  "Food menu?",
  "How to book?",
  "Where are you located?",
];

export function getReply(question) {
  const text = normalize(question);
  if (!text) return fallbackReply();

  let best = null;
  let bestScore = 0;

  intents.forEach((intent) => {
    const score = scoreIntent(intent, text);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  });

  if (!best || bestScore === 0) return fallbackReply();
  return best.reply();
}
