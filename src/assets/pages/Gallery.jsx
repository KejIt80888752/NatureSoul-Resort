import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../style/gallery.css";

// Seven clearly different photographs. Near-identical frames (_P9A1352, _P9A1185, _P9A1349) are left
// out on purpose — the same shot twice looked like a mistake in the gallery.
import cottages from "../../galleryImages/_P9A1366.jpg";
import nandiCottage from "../../galleryImages/_P9A1367.jpg";
import hillView from "../../galleryImages/_P9A1350.jpg";
import gardenPath from "../../galleryImages/_P9A1351.jpg";
import cottageDusk from "../../galleryImages/_P9A1364.jpg";
import buddhaGarden from "../../galleryImages/_P9A1183.jpg";
import eveningLights from "../../galleryImages/_P9A1184.jpg";


export default function Gallery() {
  const navigate = useNavigate();

  // Titles describe what is actually in each photograph.
  const images = [
    { title: "Nandi Cottages", img: cottages },
    { title: "Refresh @ Nandi Cottage", img: nandiCottage },
    { title: "Nandi Hills View", img: hillView },
    { title: "Garden Pathway", img: gardenPath },
    { title: "Cottage at Dusk", img: cottageDusk },
    { title: "Buddha Garden", img: buddhaGarden },
    { title: "Evening Lighting", img: eveningLights },
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