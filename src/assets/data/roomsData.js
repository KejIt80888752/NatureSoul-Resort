// // src/assets/data/roomsData.js

// const roomsData = [
//   //   {
//   //     id: 1,
//   //     name: "Deluxe Room",
//   //     desc: "Comfortable room with modern amenities and garden view",
//   //     price: "₹4,500 / night",
//   //     capacity: 2,
//   //     img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//   //     features: ["King Size Bed", "Garden View", "Free Wi-Fi", "AC"]
//   //   },
//   //  {
//   //   id: 2,
//   //   name: "Luxury Cottage",
//   //   price: "₹6,500",
//   //   desc: "Private luxury cottage surrounded by nature",
//   //   capacity: 4,
//   //   img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
//   //   features: ["Nature View","King Size Bed","Attached Bathroom","Free Wi-Fi"]
//   // },

//   //   {
//   //     id: 3,
//   //     name: "Family Suite",
//   //     desc: "Spacious suite perfect for family stays",
//   //     price: "₹8,000 / night",
//   //     capacity: 6,
//   //     img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
//   //     features: ["2 Bedrooms", "Living Area", "Kids Friendly", "Free Wi-Fi"]
//   //   },
//   //   {
//   //     id: 4,
//   //     name: "1BHK",
//   //     desc: "Spacious suite perfect for family stays",
//   //     price: "₹6,000 / night",
//   //     capacity: 5,
//   //     img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
//   //     features: ["2 Bedrooms", "Living Area", "Kids Friendly", "Free Wi-Fi"]
//   //   }
//   {
//     id: 1,
//     name: "Basic Room 1",
//     type: "Basic",
//     units: 1,
//     maxOccupancy: 2,
//     beds: 1,
//     ac: "Non-AC",
//     amenities: ["WiFi", "TV"],
//     price: 2500,
//     img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//     desc: "Cozy basic room with essential facilities."
//   },
//   {
//     id: 2,
//     name: "Basic Room 2",
//     type: "Basic",
//     units: 1,
//     maxOccupancy: 2,
//     beds: 1,
//     ac: "Non-AC",
//     amenities: ["WiFi", "TV"],
//     price: 2500,
//     img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
//     desc: "Comfortable room for a budget-friendly stay."
//   },
//   {
//     id: 3,
//     name: "Basic Double Room 1",
//     type: "Basic Double",
//     units: 1,
//     maxOccupancy: 4,
//     beds: 2,
//     ac: "Non-AC",
//     amenities: ["WiFi", "TV"],
//     price: 2500,
//     img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
//     desc: "Spacious double room for small families or friends."
//   },
//   {
//     id: 4,
//     name: "Basic Double Room 2",
//     type: "Basic Double",
//     units: 1,
//     maxOccupancy: 4,
//     beds: 2,
//     ac: "Non-AC",
//     amenities: ["WiFi", "TV"],
//     price: 2500,
//     img: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
//     desc: "Comfortable double room with essential amenities."
//   },
//   {
//     id: 5,
//     name: "Forest 1BHK Villa 1",
//     type: "Villa",
//     units: 1,
//     maxOccupancy: 4,
//     beds: 2,
//     ac: "AC",
//     amenities: ["WiFi", "TV", "Mini Fridge"],
//     price: 6500,
//     img: "/images/forest_1bhk1.jpg",
//     desc: "1BHK villa surrounded by greenery for a peaceful stay."
//   },
//   {
//     id: 6,
//     name: "Forest 1BHK Villa 2",
//     type: "Villa",
//     units: 1,
//     maxOccupancy: 4,
//     beds: 2,
//     ac: "AC",
//     amenities: ["WiFi", "TV", "Mini Fridge"],
//     price: 6500,
//     img: "/images/forest_1bhk2.jpg",
//     desc: "Comfortable villa with modern facilities."
//   },
//   {
//     id: 7,
//     name: "Forest 1BHK Villa 3",
//     type: "Villa",
//     units: 1,
//     maxOccupancy: 4,
//     beds: 2,
//     ac: "AC",
//     amenities: ["WiFi", "TV", "Mini Fridge"],
//     price: 6500,
//     img: "/images/forest_1bhk3.jpg",
//     desc: "Cozy villa perfect for a relaxing getaway."
//   },
//   {
//     id: 8,
//     name: "2BHK Forest Villa",
//     type: "Villa",
//     units: 1,
//     maxOccupancy: 6,
//     beds: 3,
//     ac: "AC",
//     amenities: ["WiFi", "TV", "Kitchen", "Private Garden"],
//     price: 8000,
//     img: "/images/2bhk_forest.jpg",
//     desc: "Spacious 2BHK villa for larger families."
//   },
//   {
//     id: 9,
//     name: "Duplex Villa",
//     type: "Villa",
//     units: 1,
//     maxOccupancy: 8,
//     beds: 4,
//     ac: "AC",
//     amenities: ["WiFi", "TV", "Kitchen", "Private Pool", "Private Garden"],
//     price: 10000,
//     img: "/images/duplex_villa.jpg",
//     desc: "Luxury duplex villa with premium facilities."
//   }

// ];

// export default roomsData;

// src/assets/data/roomsData.js

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
    img: "/images/forest_1bhk1.jpg",
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
    img: "/images/forest_1bhk2.jpg",
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
    img: "/images/forest_1bhk3.jpg",
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
    img: "/images/2bhk_forest.jpg",
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
    img: "/images/duplex_villa.jpg",
    desc: "Luxury duplex villa with premium facilities."
  }
];

export default roomsData;
