// src/assets/data/roomsData.js
// Rooms shown when the booking backend is not configured (see src/assets/services/api.js).

// One distinct photo per unit — no unit shares an image with another.
// Villas and cottages use the resort's own photographs.
import cottage1 from "../../galleryImages/_P9A1364.jpg";   // single cottage at dusk
import cottage2 from "../../galleryImages/_P9A1367.jpg";   // Refresh @ Nandi Cottage
import cottage3 from "../../galleryImages/_P9A1351.jpg";   // villa along the garden path
import villa2bhk from "../../galleryImages/_P9A1350.jpg";  // villa with the Nandi hill behind
import villaDuplex from "../../galleryImages/_P9A1349.jpg";// the two storey duplex

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
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
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
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200",
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
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
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
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
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
    img: cottage1,
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
    img: cottage2,
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
    img: cottage3,
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

// Rooms coming from the API carry availability and price, but the photos live
// in this bundle — this matches them up by name.
export const imageForRoom = (name) =>
  roomsData.find((r) => r.name === name)?.img || "";

export const descriptionForRoom = (name) =>
  roomsData.find((r) => r.name === name)?.desc || "";

export default roomsData;
