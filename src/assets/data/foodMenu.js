// Nature Soul Resort — food menu.
// Source: the resort's own menu cards shared by the client (August 2026).
// Update prices here and the website menu page, the chat assistant and the
// guest WhatsApp message all follow automatically.

export const menuUpdated = "August 2026";

export const menuSections = [
  {
    id: "breakfast",
    title: "Morning Breakfast",
    time: "7:30 AM – 10:30 AM",
    groups: [
      {
        items: [
          { name: "Idli (2 pcs)", price: 100 },
          { name: "Vada (1 pc)", price: 50 },
          { name: "Puri (2 pcs)", price: 120 },
          { name: "Chole Bhature (extra bowl)", price: 90 },
          { name: "Bread Omelette", price: 100 },
          { name: "Omelette", price: 90 },
          { name: "Boiled Eggs (2 pcs)", price: 80 },
          { name: "Extra Sambar Bowl", price: 30 },
          { name: "Extra Chutney Bowl", price: 30 },
        ],
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    time: "1:00 PM – 3:00 PM",
    groups: [
      {
        items: [
          {
            name: "South Indian Thali",
            price: 350,
            unit: "per plate",
            note: "Rice, Sambar, Rasam, Palya, Papad, Curd, Pickle, Jamun, Roti/Phulka, Dal",
          },
          {
            name: "North Indian Meal",
            price: 400,
            unit: "per plate",
            note: "Jeera Rice, Aloo Jeera, Paneer Gravy, Phulka, Pickle, Boondi Raita, Jamun",
          },
        ],
      },
    ],
  },
  {
    id: "starters",
    title: "Starters & Snacks",
    time: "Available after 5:00 PM",
    groups: [
      {
        title: "Chicken Specials",
        items: [
          { name: "Chicken Kebab", price: 300 },
          { name: "Ginger Chicken", price: 350 },
          { name: "Garlic Chicken", price: 350 },
          { name: "Pepper Chicken", price: 350 },
          { name: "Lemon Chicken", price: 350 },
          { name: "Chilli Chicken", price: 350 },
          { name: "Chicken Samosa", price: 220 },
        ],
      },
      {
        title: "Egg & Veg Starters",
        items: [
          { name: "Egg Pakoda", price: 300 },
          { name: "Egg Manchurian", price: 300 },
          { name: "Paneer Manchurian", price: 300 },
          { name: "Paneer Pakoda", price: 250 },
          { name: "Gobi Manchurian", price: 250 },
          { name: "Veg Samosa", price: 200 },
        ],
      },
      {
        title: "Burgers, Sandwiches & Pizza",
        items: [
          { name: "Pizza", price: 250 },
          { name: "Chicken Burger", price: 250 },
          { name: "Veg Burger", price: 200 },
          { name: "Chicken Sandwich", price: 250 },
          { name: "Paneer Sandwich", price: 250 },
          { name: "Veg Sandwich", price: 200 },
        ],
      },
      {
        title: "Rice Dishes",
        items: [
          { name: "Chicken Fried Rice", price: 250 },
          { name: "Paneer Fried Rice", price: 250 },
          { name: "Egg Fried Rice", price: 250 },
          { name: "Veg Fried Rice", price: 250 },
          { name: "Jeera Rice", price: 200 },
          { name: "Ghee Rice", price: 200 },
        ],
      },
    ],
  },
  {
    id: "beverages",
    title: "Beverages & Refreshments",
    time: "Available after 5:00 PM",
    groups: [
      {
        title: "Mojitos",
        note: "₹150 each",
        items: [
          { name: "Blue Curacao Mojito", price: 150 },
          { name: "Grenadine Mojito", price: 150 },
          { name: "Mint Mojito", price: 150 },
          { name: "Orange Mojito", price: 150 },
        ],
      },
      {
        title: "Milkshakes",
        items: [
          { name: "Seasonal Milkshake", price: 200 },
          { name: "Apple Milkshake", price: 150 },
          { name: "Chocolate Milkshake", price: 150 },
          { name: "Vanilla Milkshake", price: 150 },
          { name: "Strawberry Milkshake", price: 150 },
          { name: "Banana Milkshake", price: 100 },
        ],
      },
      {
        title: "Coffee & Tea",
        items: [
          { name: "Cold Coffee", price: 200 },
          { name: "Sulaimani Tea", price: 50 },
          { name: "Coffee", price: 45 },
          { name: "Tea", price: 45 },
          { name: "Lemon Tea", price: 45 },
          { name: "Black Tea", price: 45 },
          { name: "Black Coffee", price: 45 },
        ],
      },
      {
        title: "Packaged Water",
        items: [
          { name: "1 Litre Water Bottle", price: 40 },
          { name: "Half Litre Water Bottle", price: 20 },
        ],
      },
    ],
  },
];

// Short version used in the guest WhatsApp message (a full menu would exceed
// WhatsApp's template length limit, so the message links to the menu page).
export const mealTimings = [
  { name: "Breakfast", time: "7:30 AM – 10:30 AM" },
  { name: "Lunch", time: "1:00 PM – 3:00 PM" },
  { name: "Starters, snacks & beverages", time: "After 5:00 PM" },
];

export const menuHighlights = [
  "South Indian Thali — ₹350 per plate",
  "North Indian Meal — ₹400 per plate",
  "Chicken and veg starters, pizza, burgers, fried rice",
  "Mojitos, milkshakes, tea and coffee",
];

export const foodMenu = { mealTimings, menuHighlights, menuSections };
