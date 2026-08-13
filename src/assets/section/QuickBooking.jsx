import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 


export default function QuickBooking() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    checkInTime: "",
    checkOutTime: "",
    guests: "1",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !form.checkIn ||
    !form.checkOut ||
    !form.checkInTime ||
    !form.checkOutTime
  ) {
    alert("Please fill all booking details");
    return;
  }

  navigate(`/rooms?guests=${form.guests}`);
};

  return (
    <section className="quick-booking-section">
      <form className="quick-booking-form" onSubmit={handleSubmit}>

        {/* CHECK IN */}
        <div className="field">
          <label>Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={form.checkIn}
            onChange={handleChange}
          />
        </div>

        {/* CHECK OUT */}
        <div className="field">
          <label>Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={form.checkOut}
            onChange={handleChange}
          />
        </div>

        {/* CHECK IN TIME */}
        <div className="field">
          <label>Check-in Time</label>
          <input
            type="time"
            name="checkInTime"
            value={form.checkInTime}
            onChange={handleChange}
          />
        </div>

        {/* CHECK OUT TIME */}
        <div className="field">
          <label>Check-out Time</label>
          <input
            type="time"
            name="checkOutTime"
            value={form.checkOutTime}
            onChange={handleChange}
          />
        </div>

        {/* GUESTS */}
        <div className="field">
          <label>Guests</label>
          <select
            name="guests"
            value={form.guests}
            onChange={handleChange}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
        </div>

        <button type="submit" className="book-btn">
          Book Now
        </button>
      </form>
    </section>
  );
}