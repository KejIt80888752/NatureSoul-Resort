// Single source of truth for everything the chat assistant is allowed to say.
// Edit this file to update the bot — no other file needs to change.

import roomsData from "./roomsData";

export const resortInfo = {
  name: "Nature Soul Resort",

  contact: {
    phone: "+91 99860 23980",
    phoneHref: "tel:+919986023980",
    whatsapp: "+91 73493 11300",
    whatsappHref: "https://wa.me/917349311300",
    email: "naturesoulresort@gmail.com",
    emailHref: "mailto:naturesoulresort@gmail.com",
  },

  address:
    "23 Sultanpet Road, Near Govt Middle School, Nandi Hills, Nandi, Karnataka – 562103",
  mapHref: "https://maps.app.goo.gl/7HaBjV8xz1pjXhdEA",

  amenities: [
    "Swimming Pool",
    "Nature Walk",
    "Camp Fire",
    "Fine Dining",
    "Free Parking",
    "Free WiFi",
  ],

  rooms: roomsData,
};

// Facts the website does not state — the bot must never invent an answer for
// these, it hands the guest over to the team instead.
export const askTheTeam = [
  "check-in / check-out timings",
  "cancellation & refund policy",
  "advance payment",
  "pets",
  "meal plans and menu pricing",
  "events, parties and group bookings",
];
