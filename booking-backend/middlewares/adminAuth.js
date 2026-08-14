// Booking records hold guest phone numbers and Aadhaar/PAN details, so these
// endpoints are never public. Set ADMIN_KEY in the environment and send it as
// the "x-admin-key" header (or ?key= for a quick browser check).
module.exports = function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_KEY;

  if (!expected) {
    console.warn("ADMIN_KEY is not set — admin endpoints are locked");
    return res.status(503).json({ message: "Admin access is not configured" });
  }

  const provided = req.headers["x-admin-key"] || req.query.key;

  if (provided !== expected) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
