import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/Home";
import Rooms from "./assets/pages/Rooms";
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import Booking from "./assets/pages/Booking";
import Gallery from "./assets/pages/gallery";
import RoomDetails from "./assets/pages/RoomDetails";
import Dashboard from "./assets/pages/Dashboard";
import TopBar from "./assets/components/TopBar";
import ScrollToTop from "./assets/components/ScrollToTop";
import ChatBot from "./assets/components/ChatBot";
import TermsGate from "./assets/components/TermsGate";

// The dashboard is a staff-only screen: no public header, chat bubble or
// terms popup on it.
function Shell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <TopBar />}
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Staff dashboard — not linked anywhere on the public site */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/admin-login" element={<Navigate to="/dashboard" replace />} />

        {/* Unknown URL → home instead of a blank page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdmin && <ChatBot />}
      {!isAdmin && <TermsGate />}
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Shell />
    </HashRouter>
  );
}

export default App;
