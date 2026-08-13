import useTypewriter from "../hook/useTypewriter";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

export default function Hero() {
    const navigate = useNavigate();
    const heroText = useTypewriter("Reconnect With Nature", 90);
  return (
    <section style={hero}>
      <div style={overlay}>
<h1 className="hero-title">
  {heroText}
  <span className="cursor">|</span>
</h1>
        <p style={subtitle}>
          A peaceful luxury resort experience surrounded by nature
        </p>
        <div style={actions}>
            <div className="hero-buttons">
          {/* BOOKING BUTTON */}
          <button
            className="btn-primary"
            onClick={() => navigate("/Contact")}
          >
            Contact Us
          </button>

          {/* ROOMS BUTTON */}
          <button
            className="btn-outline"
            onClick={() => navigate("/rooms")}
          >
            Book Your Rooms
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}

const hero = {
  height: "90vh",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

const overlay = {
  height: "100%",
  background: "rgba(2,6,23,0.6)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "0 20px",
};

const title = {
  fontSize: "52px",
  marginBottom: "16px",
};

const subtitle = {
  fontSize: "20px",
  maxWidth: "600px",
};

const actions = {
  marginTop: 30,
  display: "flex",
  gap: 16,
};

const primary = {
  padding: "14px 28px",
  fontSize: 16,
  background: "#22c55e",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600,
};

const secondary = {
  padding: "14px 28px",
  fontSize: 16,
  background: "transparent",
  border: "2px solid #22c55e",
  borderRadius: 6,
  cursor: "pointer",
  color: "#22c55e",
  fontWeight: 600,
};
