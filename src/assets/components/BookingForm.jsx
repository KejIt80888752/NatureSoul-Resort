import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import roomsData from "../data/roomsData";
import "../components/BookingForm";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const [roomName, setRoomName] = useState(roomNameFromDetails);


  const selectedRoom = roomsData.find(
    (r) => r.id === Number(roomId)
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  return (
    <div className="booking-page">
      <h1 className="booking-title">Book Your Stay</h1>
      <p className="booking-sub">
        Fill the details below and plan your stay with us
      </p>

      {selectedRoom && (
        <p style={{ marginBottom: 20, color: "#16a34a" }}>
          Selected Room: <strong>{selectedRoom.name}</strong>
        </p>
      )}

      <form
        className="booking-form"
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target;
          const newErrors = {};

          if (!form.name.value.trim()) {
            newErrors.name = "Name is required";
          }
          if (!form.phone.value.trim()) {
            newErrors.phone = "Phone number is required";
          }
          if (!form.checkin.value) {
            newErrors.checkin = "Check-in date required";
          }
          if (!form.checkout.value) {
            newErrors.checkout = "Check-out date required";
          }

          setErrors(newErrors);

          if (Object.keys(newErrors).length === 0) {
            setShowSuccess(true);
            form.reset();
          }
        }}
      >
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" type="text" />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input name="phone" type="tel" />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <div className="form-group">
          <label>Check In</label>
          <input name="checkin" type="date" />
          {errors.checkin && <small className="error">{errors.checkin}</small>}
        </div>

        <div className="form-group">
          <label>Check Out</label>
          <input name="checkout" type="date" />
          {errors.checkout && <small className="error">{errors.checkout}</small>}
        </div>

        <div className="form-group">
          <label>Room Type</label>
          <select defaultValue={selectedRoom?.name || ""}>
            <option value="">Select Room</option>
            {roomsData.map((room) => (
              <option key={room.id} value={room.name}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <button className="booking-btn">Confirm Booking</button>
      </form>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <h2>🎉 Booking Successful!</h2>
            <p>
              Your booking for{" "}
              <strong>{selectedRoom?.name || "room"}</strong> has
              been received.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="success-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
