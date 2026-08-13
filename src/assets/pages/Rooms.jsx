import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [searchParams] = useSearchParams();
  const guests = searchParams.get("guests");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        console.log("ROOM API DATA:", res.data);   // 👈 ADD THIS
        setRooms(res.data);
      } catch (err) {
        console.error("ROOM API ERROR:", err);     // 👈 ADD THIS
      }
    };
    fetchRooms();
  }, []);



  if (!rooms.length) return <p>Loading rooms...</p>;

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
                <p><strong>Amenities:</strong> {room.amenities.length > 0 ? room.amenities.join(", ") : "None"}</p>
                <span className="price">₹{room.price}</span>

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
