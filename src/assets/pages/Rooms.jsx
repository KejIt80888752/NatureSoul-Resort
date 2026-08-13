import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import roomsData from "../data/roomsData";
import { API_URL, hasApi, formatPrice } from "../services/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const guests = searchParams.get("guests");

  useEffect(() => {
    let active = true;

    const fetchRooms = async () => {
      // No backend configured → show the rooms bundled with the site
      if (!hasApi) {
        setRooms(roomsData);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/rooms`);
        if (!active) return;
        setRooms(Array.isArray(res.data) && res.data.length ? res.data : roomsData);
      } catch (err) {
        console.error("ROOM API ERROR:", err);
        if (active) setRooms(roomsData); // backend down → still show the rooms
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRooms();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rooms-page">
        <p style={{ textAlign: "center" }}>Loading rooms...</p>
      </div>
    );
  }

  const filteredRooms = guests
    ? rooms.filter(room => room.maxOccupancy >= Number(guests))
    : rooms;
  return (
    <>
      <div className="rooms-page">
        <h1 className="rooms-title">Our Rooms</h1>

        {guests && (
          <p className="rooms-sub">
            Showing rooms for {guests} guest(s)
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
                <p><strong>Amenities:</strong> {room.amenities?.length > 0 ? room.amenities.join(", ") : "None"}</p>
                <span className="price">{formatPrice(room.price)}</span>

                {room.maxOccupancy > 0 ? (
                  <Link to={`/rooms/${room.id}`} className="room-btn">
                    View Details
                  </Link>
                ) : (
                  <button disabled className="room-btn disabled">
                    Room Not Available
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
