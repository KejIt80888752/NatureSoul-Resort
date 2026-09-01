import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "../style/topbar.css";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span>
          <FaMapMarkerAlt className="icon" />
          <a
            href="https://maps.app.goo.gl/7HaBjV8xz1pjXhdEA"
            target="_blank"
            rel="noreferrer"
          >
            23Sultan pet road, near govt middle school, Nandi Hills, Nandi, Karnataka 562103
          </a>
        </span>

        <span>
          <FaPhoneAlt className="icon" />
          +91 998602 3980
        </span>
      </div>

      <div className="topbar-right">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/naturessoulresort" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://wa.me/919986023980" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}
