const Room = require("../models/Room");

// Same nine units the website shows. Runs on every boot but only fills in what
// is missing — existing rooms and bookings are never touched.
const rooms = [
  {
    name: "Basic Room 1",
    type: "Basic",
    price: 2500,
    maxOccupancy: 2,
    beds: 1,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    desc: "Cozy basic room with essential facilities.",
  },
  {
    name: "Basic Room 2",
    type: "Basic",
    price: 2500,
    maxOccupancy: 2,
    beds: 1,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    desc: "Comfortable room for a budget-friendly stay.",
  },
  {
    name: "Basic Double Room 1",
    type: "Basic Double",
    price: 2500,
    maxOccupancy: 4,
    beds: 2,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    desc: "Spacious double room for small families or friends.",
  },
  {
    name: "Basic Double Room 2",
    type: "Basic Double",
    price: 2500,
    maxOccupancy: 4,
    beds: 2,
    ac: "Non-AC",
    amenities: ["WiFi", "TV"],
    desc: "Comfortable double room with essential amenities.",
  },
  {
    name: "Forest 1BHK Villa 1",
    type: "Villa",
    price: 6500,
    maxOccupancy: 4,
    beds: 2,
    ac: "AC",
    amenities: ["WiFi", "TV", "Mini Fridge"],
    desc: "1BHK villa surrounded by greenery for a peaceful stay.",
  },
  {
    name: "Forest 1BHK Villa 2",
    type: "Villa",
    price: 6500,
    maxOccupancy: 4,
    beds: 2,
    ac: "AC",
    amenities: ["WiFi", "TV", "Mini Fridge"],
    desc: "Comfortable villa with modern facilities.",
  },
  {
    name: "Forest 1BHK Villa 3",
    type: "Villa",
    price: 6500,
    maxOccupancy: 4,
    beds: 2,
    ac: "AC",
    amenities: ["WiFi", "TV", "Mini Fridge"],
    desc: "Cozy villa perfect for a relaxing getaway.",
  },
  {
    name: "2BHK Forest Villa",
    type: "Villa",
    price: 8000,
    maxOccupancy: 6,
    beds: 3,
    ac: "AC",
    amenities: ["WiFi", "TV", "Kitchen", "Private Garden"],
    desc: "Spacious 2BHK villa for larger families.",
  },
  {
    name: "Duplex Villa",
    type: "Villa",
    price: 10000,
    maxOccupancy: 8,
    beds: 4,
    ac: "AC",
    amenities: ["WiFi", "TV", "Kitchen", "Private Pool", "Private Garden"],
    desc: "Luxury duplex villa with premium facilities.",
  },
];

const seedRooms = async () => {
  for (const room of rooms) {
    await Room.findOrCreate({ where: { name: room.name }, defaults: room });
  }
  console.log(`Rooms ready (${rooms.length} units)`);
};

module.exports = seedRooms;
