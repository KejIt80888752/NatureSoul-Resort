import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/Home";
import Rooms from "./assets/pages/Rooms";
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import Booking from "./assets/pages/Booking";
import Gallery from "./assets/pages/gallery";
import RoomDetails from "./assets/pages/RoomDetails";
import AdminLayout from "./assets/admin/AdminLayout";
import AdminLogin from "./assets/admin/login";
import Dashboard from "./assets/admin/Dashboard";
import Bookings from "./assets/admin/Bookings";
import RoomsManage from "./assets/admin/RoomsManage";
import TopBar from "./assets/components/TopBar";
import ScrollToTop from "./assets/components/ScrollToTop";
import ChatBot from "./assets/components/ChatBot";

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

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="rooms" element={<RoomsManage />} />
        </Route>

        {/* Unknown URL → home instead of a blank page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ChatBot />
    </HashRouter>
  );
}
export default App;
