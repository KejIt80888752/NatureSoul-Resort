import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import roomsData from "../data/roomsData";
import Footer from "../components/Footer";
import QuickBooking from "../section/QuickBooking";
import Testimonials from "../section/Testimonials";
import WhyChooseUs from "../section/WhyChooseUs";
import Amenities from "../section/Amenities";




export default function Home() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-container">

          {/* LEFT CONTENT */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Reconnect With Nature</h1>
            <p>
              A peaceful luxury resort experience surrounded
              by the beauty of Nandi Hills.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => navigate("/rooms")}
              >
                Explore Rooms
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </motion.div>

          {/* RIGHT SMALL CALENDAR */}
          <motion.div
            className="hero-calendar"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h4>Select Your Stay</h4>

            <Calendar
              value={date}
              minDate={new Date()}
              onChange={setDate}
            />

            <button
  className="calendar-btn"
  onClick={() => {
    if (!date) {
      alert("Please select date");
      return;
    }

    const formatted = date.toISOString().split("T")[0];

    navigate(`/rooms?date=${formatted}`);
  }}
>
  Check Availability
</button>
          </motion.div>

        </div>
      </section>

      {/* ================= QUICK BOOKING BAR ================= */}
        <QuickBooking />


      {/* ================= ROOMS PREVIEW ================= */}
      <section className="home-rooms">
        <h2>Featured Rooms</h2>

        <div className="room-grid">
          {roomsData.slice(0, 3).map((room) => (
            <motion.div
              key={room.id}
              className="room-card"
              whileHover={{ y: -10 }}
              onClick={() =>
                navigate("/booking", { state: { room } })
              }
            >
              <img src={room.img} alt={room.name} />
              <h4>{room.name}</h4>
              <p>{room.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
<WhyChooseUs />
      {/* ================= AMENITIES ================= */}
      <Amenities />

   

      <Testimonials />

      
      <Footer />
    </>
  );
}