// src/assets/data/roomsData.js
// Rooms shown when the booking backend is not configured (see src/assets/services/api.js).

import villa1 from "../../galleryImages/_P9A1364.jpg";
import villa2 from "../../galleryImages/_P9A1366.jpg";
import villa3 from "../../galleryImages/_P9A1367.jpg";
import villa2bhk from "../../galleryImages/_P9A1350.jpg";
import villaDuplex from "../../galleryImages/_P9A1349.jpg";

const roomsData = [
  {
    id: 1,
    name: "Basic Room 1",
    type: "Basic",
    units: 1,
    maxOccupancy: 2, // for availability tracking
    beds: 1,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    price: 2500,
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    desc: "Cozy basic room with essential facilities."
  },
  {
    id: 2,
    name: "Basic Room 2",
    type: "Basic",
    units: 1,
    maxOccupancy: 2,
    beds: 1,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    price: 2500,
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
    desc: "Comfortable room for a budget-friendly stay."
  },
  {
    id: 3,
    name: "Basic Double Room 1",
    type: "Basic Double",
    units: 1,
    maxOccupancy: 4,
    beds: 2,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    price: 2500,
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
    desc: "Spacious double room for small families or friends."
  },
  {
    id: 4,
    name: "Basic Double Room 2",
    type: "Basic Double",
    units: 1,
    maxOccupancy: 4,
    beds: 2,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    price: 2500,
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
    desc: "Comfortable double room with essential amenities."
  },
  {
    id: 5,
    name: "Forest 1BHK Villa 1",
    type: "Villa",
    units: 1,
    maxOccupancy: 4,
    beds: 2,
    ac: "AC",
    amenities: ["WiFi", "TV", "Mini Fridge"],
    price: 6500,
    img: villa1,
    desc: "1BHK villa surrounded by greenery for a peaceful stay."
  },
  {
    id: 6,
    name: "Forest 1BHK Villa 2",
    type: "Villa",
    units: 1,
    maxOccupancy: 4,
    beds: 2,
    ac: "AC",
    amenities: ["WiFi", "TV", "Mini Fridge"],
    price: 6500,
    img: villa2,
    desc: "Comfortable villa with modern facilities."
  },
  {
    id: 7,
    name: "Forest 1BHK Villa 3",
    type: "Villa",
    units: 1,
    maxOccupancy: 4,
    beds: 2,
    ac: "AC",
    amenities: ["WiFi", "TV", "Mini Fridge"],
    price: 6500,
    img: villa3,
    desc: "Cozy villa perfect for a relaxing getaway."
  },
  {
    id: 8,
    name: "2BHK Forest Villa",
    type: "Villa",
    units: 1,
    maxOccupancy: 6,
    beds: 3,
    ac: "AC",
    amenities: ["WiFi", "TV", "Kitchen", "Private Garden"],
    price: 8000,
    img: villa2bhk,
    desc: "Spacious 2BHK villa for larger families."
  },
  {
    id: 9,
    name: "Duplex Villa",
    type: "Villa",
    units: 1,
    maxOccupancy: 8,
    beds: 4,
    ac: "AC",
    amenities: ["WiFi", "TV", "Kitchen", "Private Pool", "Private Garden"],
    price: 10000,
    img: villaDuplex,
    desc: "Luxury duplex villa with premium facilities."
  }
];

export default roomsData;
