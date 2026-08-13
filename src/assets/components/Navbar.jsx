import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../LOGO.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="navbar">
      <NavLink to="/" className="logo-wrap">
        <img src={logo} alt="Nature Soul Resort" className="logo" />
      </NavLink>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>


      {/* Nav links */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/rooms" className="nav-link" onClick={() => setMenuOpen(false)}>
          Rooms
        </NavLink>

        <NavLink to="/gallery" className="nav-link" onClick={() => setMenuOpen(false)}>
          Gallery
        </NavLink>

        <NavLink to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
          About
        </NavLink>

        <NavLink to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>

        {/* <NavLink to="/booking" className="book-btn" onClick={() => setMenuOpen(false)}>
      Book Now
    </NavLink> */}
      </nav>
    </header>


  );
}
