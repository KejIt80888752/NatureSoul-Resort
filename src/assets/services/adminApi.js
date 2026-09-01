// One interface for the staff dashboard.
//
// With VITE_API_URL set it talks to the real booking API.
// Without it, everything runs on sample data in this browser so the dashboard
// can be demonstrated before the server is live. Nothing else in the dashboard
// needs to know which mode it is in.

import axios from "axios";
import { API_URL, hasApi } from "./api";
import roomsData from "../data/roomsData";

const DEMO_BOOKINGS = "nsr_demo_bookings";
const DEMO_BLOCKS = "nsr_demo_blocks";
const DEMO_ROOMS = "nsr_demo_rooms";

export const isDemoMode = !hasApi;

/* ---------------- helpers ---------------- */

// Date maths on the calendar days themselves — done in UTC so a +5:30 timezone
// cannot shift the result to the previous day.
export const addDays = (date, days) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
};

// "Today" as the resort sees it, not as UTC sees it
export const today = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

/* ---------------- demo seed ---------------- */

// A few realistic bookings so the dashboard is not empty during a demo.
const seedDemoBookings = () => {
  const existing = read(DEMO_BOOKINGS, null);
  if (existing) return existing;

  const t = today();
  const seeded = [
    {
      id: 1001,
      roomId: 5,
      roomName: "Forest 1BHK Villa 1",
      customerName: "Ramesh Kumar",
      phone: "9876501234",
      whatsapp: "9876501234",
      email: "ramesh@example.com",
      checkIn: addDays(t, 2),
      checkOut: addDays(t, 4),
      checkInTime: "12:00",
      checkOutTime: "10:00",
      identityType: "pan",
      identityNumber: "ABCDE1234F",
      price: "6500",
      extraGuests: 1,
      children: 0,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    },
    {
      id: 1002,
      roomId: 9,
      roomName: "Duplex Villa",
      customerName: "Divya S",
      phone: "9001122334",
      whatsapp: "9009988776",
      email: "divya@example.com",
      checkIn: addDays(t, 1),
      checkOut: addDays(t, 3),
      checkInTime: "14:00",
      checkOutTime: "11:00",
      identityType: "aadhaar",
      identityNumber: "998877665544",
      price: "10000",
      extraGuests: 4,
      children: 2,
      status: "confirmed",
      createdAt: new Date(Date.now() - 3600_000).toISOString(),
    },
    {
      id: 1003,
      roomId: 1,
      roomName: "Basic Room 1",
      customerName: "Anitha Raj",
      phone: "9445566778",
      whatsapp: "9812345670",
      email: "anitha@example.com",
      checkIn: addDays(t, -3),
      checkOut: addDays(t, -1),
      checkInTime: "13:00",
      checkOutTime: "10:00",
      identityType: "aadhaar",
      identityNumber: "445566778899",
      price: "2500",
      extraGuests: 0,
      children: 0,
      status: "confirmed",
      createdAt: new Date(Date.now() - 86400_000 * 5).toISOString(),
    },
  ];

  write(DEMO_BOOKINGS, seeded);
  return seeded;
};

const demoRooms = () => {
  const overrides = read(DEMO_ROOMS, {});
  return roomsData.map((room) => ({ ...room, ...(overrides[room.id] || {}) }));
};

/* ---------------- API ---------------- */

const authHeader = (key) => ({ headers: { "x-admin-key": key } });

export const adminApi = {
  async bookings(key) {
    if (isDemoMode) return seedDemoBookings();
    const res = await axios.get(`${API_URL}/api/admin/bookings`, authHeader(key));
    return res.data;
  },

  async rooms(key) {
    if (isDemoMode) return demoRooms();
    const res = await axios.get(`${API_URL}/api/rooms`);
    return res.data;
  },

  async calendar(key, from, days) {
    if (isDemoMode) {
      const bookings = seedDemoBookings();
      const blocks = read(DEMO_BLOCKS, []);
      const dates = Array.from({ length: days }, (_, i) => addDays(from, i));

      return {
        from,
        dates,
        calendar: demoRooms().map((room) => ({
          roomId: room.id,
          name: room.name,
          price: room.price,
          days: dates.map((date) => {
            const booking = bookings.find(
              (b) => b.roomId === room.id && b.checkIn <= date && b.checkOut > date
            );
            if (booking) {
              return { date, status: "booked", guest: booking.customerName, bookingId: booking.id };
            }

            const block = blocks.find(
              (b) => b.roomId === room.id && b.from <= date && b.to > date
            );
            if (block) return { date, status: "blocked", reason: block.reason, blockId: block.id };

            return { date, status: "free" };
          }),
        })),
      };
    }

    const res = await axios.get(
      `${API_URL}/api/admin/calendar?from=${from}&days=${days}`,
      authHeader(key)
    );
    return res.data;
  },

  async block(key, { roomId, from, to, reason }) {
    if (isDemoMode) {
      const bookings = seedDemoBookings();
      const clash = bookings.some(
        (b) => b.roomId === roomId && b.checkIn < to && b.checkOut > from
      );
      if (clash) {
        const error = new Error("There is already a guest booking in those dates");
        error.handled = true;
        throw error;
      }

      const blocks = read(DEMO_BLOCKS, []);
      const block = { id: Date.now(), roomId, from, to, reason: reason || "Blocked" };
      write(DEMO_BLOCKS, [...blocks, block]);
      return block;
    }

    const res = await axios.post(
      `${API_URL}/api/admin/blocks`,
      { roomId, from, to, reason },
      authHeader(key)
    );
    return res.data;
  },

  async unblock(key, blockId) {
    if (isDemoMode) {
      write(
        DEMO_BLOCKS,
        read(DEMO_BLOCKS, []).filter((b) => b.id !== blockId)
      );
      return { success: true };
    }

    const res = await axios.delete(`${API_URL}/api/admin/blocks/${blockId}`, authHeader(key));
    return res.data;
  },

  // Upload a real photo file. In demo mode it is kept in this browser only —
  // the dashboard says so, because without the server there is nowhere to store it.
  async uploadRoomPhoto(key, roomId, file) {
    if (isDemoMode) {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const overrides = read(DEMO_ROOMS, {});
      overrides[roomId] = { ...(overrides[roomId] || {}), img: dataUrl };
      write(DEMO_ROOMS, overrides);
      return { success: true, demo: true };
    }

    const form = new FormData();
    form.append("photo", file);

    const res = await axios.post(
      `${API_URL}/api/admin/rooms/${roomId}/photo`,
      form,
      authHeader(key)
    );
    return res.data;
  },

  async updateRoom(key, roomId, updates) {
    if (isDemoMode) {
      const overrides = read(DEMO_ROOMS, {});
      overrides[roomId] = { ...(overrides[roomId] || {}), ...updates };
      write(DEMO_ROOMS, overrides);
      return { id: roomId, ...updates };
    }

    const res = await axios.put(`${API_URL}/api/admin/rooms/${roomId}`, updates, authHeader(key));
    return res.data;
  },

  resetDemo() {
    [DEMO_BOOKINGS, DEMO_BLOCKS, DEMO_ROOMS].forEach((k) => localStorage.removeItem(k));
  },
};
