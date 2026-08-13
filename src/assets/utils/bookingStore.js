const BOOKINGS_KEY = "resort_bookings";

// Get all bookings
export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return [];
  }
}

// Save a booking locally (used when the site runs without a backend)
export function bookRoom(booking) {
  const bookings = getBookings();

  bookings.push({
    ...booking,
    bookedAt: new Date().toISOString(),
  });

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

  return bookings;
}

// Check room availability.
// Demo bookings (no backend) are kept for reference but never block a room,
// so a test booking does not make the room look sold out to the next visitor.
export function isRoomAvailable(roomId) {
  const bookings = getBookings();

  return !bookings.some(
    (b) => !b.demo && Number(b.roomId ?? b.id) === Number(roomId)
  );
}

// Admin → Mark room available
export function clearRoom(roomId) {
  const bookings = getBookings();

  const updated = bookings.filter(
    (b) => Number(b.roomId ?? b.id) !== Number(roomId)
  );

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
}
