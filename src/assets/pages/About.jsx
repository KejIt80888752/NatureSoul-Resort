import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../style/about.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <section className="about-page">

        {/* HERO */}
        <div className="about-hero">
          <div className="about-hero-overlay">
            <h1>About Nature Soul Resort</h1>
            <p>Reconnect with nature. Relax in comfort.</p>
          </div>
        </div>

        {/* STORY SECTION */}
        <div className="about-container">
          <div className="about-img">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              alt="Resort"
            />
          </div>

          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Nature Soul Resort was created with one simple idea — to offer
              guests a peaceful escape from busy city life. Surrounded by
              greenery and scenic beauty, our resort blends modern comfort
              with the charm of nature.
            </p>

            <p>
              Whether you're planning a family vacation, romantic getaway,
              or weekend retreat, we provide a refreshing and memorable stay.
            </p>

            <button
              className="about-btn"
              onClick={() => navigate("/rooms")}
            >
              Explore Rooms
            </button>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="about-features">
          <h2>Why Choose Us</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h4>🌿 Scenic Location</h4>
              <p>Peaceful hills and fresh air of Nandi.</p>
            </div>

            <div className="feature-card">
              <h4>🏡 Premium Comfort</h4>
              <p>Luxury rooms designed for relaxation.</p>
            </div>

            <div className="feature-card">
              <h4>👨‍👩‍👧 Family Friendly</h4>
              <p>Safe & enjoyable for couples and families.</p>
            </div>

            <div className="feature-card">
              <h4>⭐ Trusted Stay</h4>
              <p>Highly rated by satisfied guests.</p>
            </div>
          </div>
        </div>

        {/* VISION & MISSION */}
        <div className="about-vision">
          <div className="vision-card">
            <h3>Our Vision</h3>
            <p>
              To become a trusted nature retreat offering comfort,
              peace, and unforgettable memories.
            </p>
          </div>

          <div className="vision-card">
            <h3>Our Mission</h3>
            <p>
              Deliver quality hospitality while respecting nature
              and providing exceptional guest experiences.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="about-stats">
          <div className="stat">
            <h4>500+</h4>
            <p>Happy Guests</p>
          </div>

          <div className="stat">
            <h4>15+</h4>
            <p>Premium Rooms</p>
          </div>

          <div className="stat">
            <h4>4.8 ⭐</h4>
            <p>Guest Rating</p>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h2>Ready to Experience Nature?</h2>
          <button
            className="about-btn"
            onClick={() => navigate("/rooms")}
          >
            Book Your Stay
          </button>
        </div>

      </section>

      <Footer />
    </>
  );
}