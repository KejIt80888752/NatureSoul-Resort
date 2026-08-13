export const genBookingId = () => {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).substring(2,6).toUpperCase();
  return `NSR-${t}-${r}`;
};
