// The messages a guest receives after booking.
//
// Today these open in WhatsApp with the text pre-filled (one tap to send).
// Once a WhatsApp Business API provider (AiSensy / Interakt / Wati / Gupshup)
// is connected, the exact same text becomes an approved template that is sent
// automatically — the wording below is what gets submitted to Meta.

import { resortInfo } from "../data/resortInfo";
import { mealTimings, menuHighlights } from "../data/foodMenu";
import { formatPrice } from "../services/api";

const { contact, address, mapHref, name } = resortInfo;

const nights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1;
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(Math.round(ms / 86400000), 1);
};

export const messageTemplates = [
  {
    id: "welcome",
    label: "Welcome",
    build: (b) =>
      `Hello ${b.customerName}! 🌿\n\n` +
      `Thank you for booking with ${name}. Your stay is confirmed and we are looking forward to hosting you.`,
  },
  {
    id: "details",
    label: "Booking details",
    build: (b) =>
      `*Your booking details*\n\n` +
      `Booking ID: ${b.id}\n` +
      `Room: ${b.roomName}\n` +
      `Check-in: ${b.checkIn}${b.checkInTime ? `, ${b.checkInTime}` : ""}\n` +
      `Check-out: ${b.checkOut}${b.checkOutTime ? `, ${b.checkOutTime}` : ""}\n` +
      `Nights: ${nights(b.checkIn, b.checkOut)}\n` +
      `Guests: ${Number(b.extraGuests || 0) + 1}${
        Number(b.children || 0) ? ` + ${b.children} children` : ""
      }\n` +
      `Tariff: ${formatPrice(b.price)} per night\n\n` +
      `Please carry the same ID proof (${(b.identityType || "ID").toUpperCase()}) used while booking.`,
  },
  {
    id: "contact",
    label: "Resort contact",
    build: () =>
      `*Need anything before your stay?*\n\n` +
      `Call us: ${contact.phone}\n` +
      `WhatsApp: ${contact.whatsapp}\n` +
      `Email: ${contact.email}\n\n` +
      `Our team is happy to help with early check-in, meals or directions.`,
  },
  {
    id: "location",
    label: "Location & map",
    build: () =>
      `*How to reach ${name}*\n\n` +
      `${address}\n\n` +
      `Google Maps: ${mapHref}\n\n` +
      `Free parking is available inside the property.`,
  },
  {
    id: "menu",
    label: "Food menu",
    build: () => {
      const timings = mealTimings.map((m) => `${m.name}: ${m.time}`).join("\n");
      const highlights = menuHighlights.map((h) => `• ${h}`).join("\n");

      return (
        `*Food at the resort*\n\n${timings}\n\n${highlights}\n\n` +
        `Full menu: https://kejit80888752.github.io/NatureSoul-Resort/#/menu\n\n` +
        `Please reply with your meal preference (veg / non-veg) and the number of guests, so our kitchen can prepare in advance.`
      );
    },
  },
];

export const buildMessage = (templateId, booking) =>
  messageTemplates.find((t) => t.id === templateId)?.build(booking) || "";

export const buildFullMessage = (booking) =>
  messageTemplates.map((t) => t.build(booking)).join("\n\n———\n\n");

// A booking request going the other way: from the guest to the resort.
// Used while the booking server is not live, so a request actually reaches the
// team instead of only being stored in the guest's browser.
export const buildEnquiryMessage = (form, room) =>
  `*New booking request from the website*\n\n` +
  `Room: ${room?.name || "-"}\n` +
  `Tariff: ${formatPrice(room?.price)} per night\n\n` +
  `Name: ${form.name}\n` +
  `Phone: ${form.phone}\n` +
  (form.whatsapp && form.whatsapp !== form.phone ? `WhatsApp: ${form.whatsapp}\n` : "") +
  `Email: ${form.email}\n\n` +
  `Check-in: ${form.checkIn}${form.checkInTime ? `, ${form.checkInTime}` : ""}\n` +
  `Check-out: ${form.checkOut}${form.checkOutTime ? `, ${form.checkOutTime}` : ""}\n` +
  `ID proof: ${(form.identityType || "").toUpperCase()} ${form.identityNumber}\n\n` +
  `Please confirm availability for these dates.`;

export const whatsappLink = (number, text) => {
  const digits = String(number || "").replace(/\D/g, "");
  if (!digits) return null;
  const phone = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
