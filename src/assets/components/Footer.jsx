import { FaInstagram, FaWhatsapp, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
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
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/menu">Food Menu</Link></li>
            <li>
              <button
                className="terms-link"
                onClick={() => window.dispatchEvent(new Event("nsr:open-terms"))}
              >
                Terms &amp; Conditions
              </button>
            </li>
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
            <a href="mailto:naturesoulresort@gmail.com">naturesoulresort@gmail.com</a>
          </p>

          <p className="footer-phone">
            <a href="tel:+917349311300">+91 73493 11300</a>
          </p>
        </div>

      </div>
      <div className="footer-socials">
        <a
          href="https://www.instagram.com/naturessoulresort"
          target="_blank"
          rel="noreferrer"
          className="social-icon insta"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="social-icon fb"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>

        <a
          href="https://wa.me/917349311300"
          target="_blank"
          rel="noreferrer"
          className="social-icon whatsapp"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://maps.app.goo.gl/7HaBjV8xz1pjXhdEA"
          target="_blank"
          rel="noreferrer"
          className="social-icon map"
          aria-label="Location"
        >
          <FaMapMarkerAlt />
        </a>
      </div>

      <div className="footer-bottom">
        © 2026 Nature’s Soul Resort. All Rights Reserved.
      </div>
    </footer>
  );
}
