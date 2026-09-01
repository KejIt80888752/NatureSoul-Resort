import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/Home";
import Rooms from "./assets/pages/Rooms";
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import Booking from "./assets/pages/Booking";
import Gallery from "./assets/pages/gallery";
import Menu from "./assets/pages/Menu";
import RoomDetails from "./assets/pages/RoomDetails";
import TopBar from "./assets/components/TopBar";
import ScrollToTop from "./assets/components/ScrollToTop";
import ChatBot from "./assets/components/ChatBot";
import TermsGate from "./assets/components/TermsGate";

// Guest website only. The staff dashboard is a separate site
// (see src/dashboard.jsx) so none of its code ships here.
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <TopBar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/menu" element={<Menu />} />

        {/* Unknown URL → home instead of a blank page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ChatBot />
      <TermsGate />
    </HashRouter>
  );
}

export default App;
