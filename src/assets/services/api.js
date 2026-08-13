// Backend base URL.
// Local dev / server deployed  -> set VITE_API_URL (example: http://localhost:5000)
// Static hosting (GitHub Pages) -> leave it empty, the site runs in demo mode
//                                  with the room data bundled in src/assets/data/roomsData.js
export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export const hasApi = Boolean(API_URL);

// reCAPTCHA is only shown when a site key is configured for the current domain
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

export const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "";
  if (typeof price === "string" && price.trim().startsWith("₹")) return price;
  const number = Number(price);
  if (Number.isNaN(number)) return price;
  return `₹${number.toLocaleString("en-IN")}`;
};
