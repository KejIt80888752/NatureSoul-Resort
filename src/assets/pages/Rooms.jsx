import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import roomsData, { imageForRoom, descriptionForRoom } from "../data/roomsData";
import { API_URL, hasApi, formatPrice } from "../services/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const guests = searchParams.get("guests");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  useEffect(() => {
    let active = true;

    const fetchRooms = async () => {
      // No backend configured → show the rooms bundled with the site
      if (!hasApi) {
        setRooms(roomsData.map((room) => ({ ...room, available: true })));
        setLoading(false);
        return;
      }

      try {
        const params = checkIn && checkOut ? { checkIn, checkOut } : {};
        const res = await axios.get(`${API_URL}/api/rooms`, { params });
        if (!active) return;

        const list = Array.isArray(res.data) && res.data.length ? res.data : roomsData;

        setRooms(
          list.map((room) => ({
            ...room,
            available: room.available !== false,
            img: room.photoUrl
              ? `${API_URL}${room.photoUrl}`
              : room.img || imageForRoom(room.name),
            desc: room.desc || descriptionForRoom(room.name),
          }))
        );
      } catch (err) {
        console.error("ROOM API ERROR:", err);
        if (active) setRooms(roomsData.map((room) => ({ ...room, available: true })));
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRooms();
    return () => {
      active = false;
    };
  }, [checkIn, checkOut]);

  if (loading) {
    return (
      <div className="rooms-page">
        <p style={{ textAlign: "center" }}>Loading rooms...</p>
      </div>
    );
  }

  const filteredRooms = guests
    ? rooms.filter((room) => room.maxOccupancy >= Number(guests))
    : rooms;

  return (
    <>
      <div className="rooms-page">
        <h1 className="rooms-title">Our Rooms</h1>

        {guests && (
          <p className="rooms-sub">Showing rooms for {guests} guest(s)</p>
        )}

        {checkIn && checkOut && (
          <p className="rooms-sub">
            Availability for {checkIn} to {checkOut}
          </p>
        )}

        <div className="rooms-grid">
          {filteredRooms.length === 0 && (
            <h3 style={{ textAlign: "center" }}>No rooms available</h3>
          )}

          {filteredRooms.map((room) => (
            <div className="room-card" key={room.id}>
              <div className="room-img">
                <img src={room.img} alt={room.name} />
              </div>

              <div className="room-info">
                <h3>{room.name}</h3>
                <p><strong>Type:</strong> {room.type}</p>
                <p><strong>Units:</strong> {room.units}</p>
                <p><strong>Max Occupancy:</strong> {room.maxOccupancy}</p>
                <p><strong>Beds:</strong> {room.beds}</p>
                <p><strong>AC/Non-AC:</strong> {room.ac}</p>
                <p>
                  <strong>Amenities:</strong>{" "}
                  {room.amenities?.length > 0 ? room.amenities.join(", ") : "None"}
                </p>
                <span className="price">{formatPrice(room.price)}</span>

                {room.available ? (
                  <Link to={`/rooms/${room.id}`} className="room-btn">
                    View Details
                  </Link>
                ) : (
                  <button disabled className="room-btn disabled">
                    Booked
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
