import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../style/gallery.css";

import Pool1 from "../../galleryImages/_P9A1183.jpg";
import Pool2 from "../../galleryImages/_P9A1184.jpg";
import Pool3 from "../../galleryImages/_P9A1185.jpg";
import Pool4 from "../../galleryImages/_P9A1349.jpg";
import Pool5 from "../../galleryImages/_P9A1350.jpg";
import Pool6 from "../../galleryImages/_P9A1351.jpg";
import Pool7 from "../../galleryImages/_P9A1352.jpg";
import Pool8 from "../../galleryImages/_P9A1364.jpg";
import Pool9 from "../../galleryImages/_P9A1366.jpg";


export default function Gallery() {
  const navigate = useNavigate();

  const images = [
    {
      title: "Luxury Pool View",
      img: Pool1,
    },
    {
      title: "Premium Bedroom",
      img: Pool2,
    },
    {
      title: "Nature Walk",
      img: Pool3,
    },
    {
      title: "Fine Dining",
      img: Pool4,
    },
    {
      title: "Camp Fire Night",
      img: Pool5,
    },
    {
      title: "Resort Exterior",
      img: Pool6,
    },
    {
      title: "Resort Exterior",
      img: Pool7,
    },
    {
      title: "Resort Exterior",
      img: Pool8,
    },
    {
      title: "Resort Exterior",
      img: Pool9,
    },
  ];

  return (
    <>
      <div className="gallery-page">

        {/* HERO */}
        <div className="gallery-hero">
          <h1>Resort Gallery</h1>
          <p>Experience Nature Through Our Lens</p>
        </div>

        {/* IMAGE GRID */}
        <div className="gallery-grid">
          {images.map((item, index) => (
            <div className="gallery-card" key={index}>
              <img src={item.img} alt={item.title} />
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* BOOKING CTA SECTION */}
        <div className="gallery-cta">
          <h2>Ready to Experience Nature?</h2>
          <button
            className="gallery-book-btn"
            onClick={() => navigate("/rooms")}
          >
            Book Your Stay
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}