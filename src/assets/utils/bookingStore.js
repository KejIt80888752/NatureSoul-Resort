import axios from "axios";

const BOOKINGS_KEY = "resort_bookings";

// Get all bookings
export function getBookings() {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
}

// Save booking
export function bookRoom(booking) {
  // const bookings = getBookings();

  // bookings.push({
  //   ...booking,
  //   bookedAt: new Date().toISOString(),
  // });

  // localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  axios
    .post("http://localhost:5000/api/bookings", {
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      price: selectedRoom.price,
      customerName: form.name,
      phone: form.phone,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      checkInTime: form.checkInTime,
      checkOutTime: form.checkOutTime,
      identityType: form.identityType,
      identityNumber: form.identityNumber,
    })
    .then(() => setShowSuccess(true))
    .catch(() => alert("Booking failed"));

}

// Check room availability
export function isRoomAvailable(roomId) {
  const bookings = getBookings();

  return !bookings.some(
    (b) => Number(b.id) === Number(roomId)
  );
}

// Admin → Mark room available
export function clearRoom(roomId) {
  const bookings = getBookings();

  const updated = bookings.filter(
    (b) => Number(b.id) !== Number(roomId)
  );

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
}
