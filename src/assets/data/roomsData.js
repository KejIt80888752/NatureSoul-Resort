// src/assets/data/roomsData.js
// Rooms shown when the booking backend is not configured (see src/assets/services/api.js).

// One distinct photo per unit — every picture is the resort's own.
// Interiors for the rooms, and the numbered villa boards (VILLA 01 / 02 / 03)
// for the villas so a guest can recognise the unit on arrival.
import roomTv from "../../roomImages/room-tv.jpg";
import bedroom1 from "../../roomImages/bedroom-1.jpg";
import bedroom2 from "../../roomImages/bedroom-2.jpg";
import roomHall from "../../roomImages/room-hall.jpg";
import villa01 from "../../roomImages/villa-01.jpg";
import villa02 from "../../roomImages/villa-02.jpg";
import villa03 from "../../roomImages/villa-03.jpg";
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
    img: roomTv,
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
    img: bedroom1,
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
    img: bedroom2,
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
    img: roomHall,
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
    img: villa01,
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
    img: villa02,
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
    img: villa03,
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
