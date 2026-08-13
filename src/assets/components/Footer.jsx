import { FaInstagram, FaWhatsapp, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../LOGO.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-col">
          <img src={logo} alt="Nature Soul Resort" className="logo" />
          <p>
            A peaceful escape in the hills, our resort offers stunning
            nature views, fresh air, and a perfect blend of relaxation
            and adventure.
          </p>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>About</li>
            <li>Contact Us</li>
            <li>Rooms</li>
            <li>Testimonials</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>
            23 Sultanpet Road,<br />
            Near Govt Middle School,<br />
            Nandi Hills, Nandi,<br />
            Karnataka – 562103
          </p>

          <p className="footer-email">
            naturesoulresort@gmail.com
          </p>

          <p className="footer-phone">
            +91 73493 11300
          </p>
        </div>

      </div>
      <div className="footer-socials">
        <a href="#" className="social-icon insta">
          <FaInstagram />
        </a>

        <a href="#" className="social-icon fb">
          <FaFacebookF />
        </a>

        <a href="https://wa.me/917349311300" target="_blank" className="social-icon whatsapp">
          <FaWhatsapp />
        </a>

        <a href="https://maps.app.goo.gl/7HaBjV8xz1pjXhdEA" className="social-icon map">
          <FaMapMarkerAlt />
        </a>
      </div>

      <div className="footer-bottom">
        © 2026 Nature’s Soul Resort. All Rights Reserved.
      </div>
    </footer>
  );
}
