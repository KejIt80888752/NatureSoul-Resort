const axios = require("axios");

// Only enforced when RECAPTCHA_SECRET is configured. Without it the check is
// skipped, so local development and demo deployments keep working.
exports.verifyCaptcha = async (token, remoteip) => {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return { ok: true, skipped: true };

  if (!token) return { ok: false };

  try {
    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({ secret, response: token, remoteip: remoteip || "" })
    );
    return { ok: Boolean(data.success) };
  } catch (error) {
    console.error("CAPTCHA VERIFY ERROR:", error.message);
    return { ok: false };
  }
};
