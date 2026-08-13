import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../style/contact.css";

export default function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you shortly.");
  };

  return (
    <>
      <div className="contact-page">

        {/* HERO SECTION */}
        <div className="contact-hero">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you</p>
        </div>

        {/* CONTACT INFO */}
        <div className="contact-info-section">
          <div className="info-card">
            <h3>📍 Location</h3>
            <p>23 Sultanpet Road,
Near Govt Middle School,
Nandi Hills, Nandi,
Karnataka – 562103</p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 9986023980</p>
          </div>

          <div className="info-card">
            <h3>📧Email</h3>
            <p>info@naturesoulresort.com</p>
          </div>
        </div>

        {/* CONTACT FORM + MAP */}
        <div className="contact-main">

          {/* FORM */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="tel" required />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" required></textarea>
              </div>

              <button type="submit" className="contact-btn">
                Send Message
              </button>
            </form>
          </div>

          {/* MAP */}
<div className="contact-map">
  <iframe
    title="Resort Location"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d497282.79888883606!2d77.5087166!3d13.1610207!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb1e5a95b9ff2e5%3A0xa79e12a274cb9d95!2sNature%20Soul%20Resort!5e0!3m2!1sen!2sin!4v1771939455491!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

        </div>

        {/* BOOKING CTA */}
        <div className="contact-cta">
          <h2>Ready to Escape the City?</h2>
          <button
            onClick={() => navigate("/rooms")}
          >
            Book Your Stay
          </button>
        </div>

      </div>

      <Footer />
    </>
  );
}
