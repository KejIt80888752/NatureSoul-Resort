import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { menuSections } from "../data/foodMenu";
import { resortInfo } from "../data/resortInfo";
import { formatPrice } from "../services/api";
import "../style/menu.css";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <>
      <div className="menu-page">
        <div className="menu-hero">
          <h1>Food Menu</h1>
          <p>Where nature meets comfort — freshly prepared through the day</p>
        </div>

        <div className="menu-grid">
          {menuSections.map((section) => (
            <section className="menu-card" key={section.id}>
              <header className="menu-card-head">
                <h2>{section.title}</h2>
                <span className="menu-time">🕐 {section.time}</span>
              </header>

              {section.groups.map((group, gi) => (
                <div className="menu-group" key={gi}>
                  {group.title && (
                    <h3>
                      {group.title}
                      {group.note && <span className="menu-group-note">{group.note}</span>}
                    </h3>
                  )}

                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <div className="menu-item-line">
                          <span className="menu-item-name">{item.name}</span>
                          <span className="menu-dots" />
                          <span className="menu-item-price">
                            {formatPrice(item.price)}
                            {item.unit && <small> /{item.unit.replace("per ", "")}</small>}
                          </span>
                        </div>
                        {item.note && <p className="menu-item-note">{item.note}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="menu-cta">
          <h2>Planning your meals?</h2>
          <p>
            Tell us your meal preference in advance and our kitchen will keep it ready
            for your arrival.
          </p>
          <div className="menu-cta-buttons">
            <a
              className="menu-btn"
              href={resortInfo.contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp us
            </a>
            <button className="menu-btn outline" onClick={() => navigate("/rooms")}>
              Book Your Stay
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
