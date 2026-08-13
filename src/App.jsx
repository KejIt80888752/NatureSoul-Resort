import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";  
import Home from "./assets/pages/Home";
import Rooms from "./assets/pages/Rooms";
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import Booking from "./assets/pages/Booking";
import Gallery from "./assets/pages/gallery";
import RoomDetails from "./assets/pages/RoomDetails";
import AdminLayout from "./assets/admin/AdminLayout";
import Dashboard from "./assets/admin/Dashboard";
import Bookings from "./assets/admin/Bookings";
import TopBar from "./assets/components/TopBar";


const token = localStorage.getItem("token");


function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
     <TopBar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/admin-login" element={<AdminLayout />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/gallery" element={<Gallery />} />



        
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;


