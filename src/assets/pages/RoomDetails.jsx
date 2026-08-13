import { useParams, useNavigate } from "react-router-dom";
import roomsData from "../data/roomsData";
import { isRoomAvailable } from "../utils/bookingStore";
import { formatPrice } from "../services/api";
import "../style/roomDetails.css";
import Footer from "../components/Footer";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = roomsData.find(r => r.id === Number(id));

  if (!room) {
    return (
      <div className="room-details-page">
        <h2>Room not found</h2>
        <button className="room-btn" onClick={() => navigate("/rooms")}>
          Back to Rooms
        </button>
      </div>
    );
  }

  const available = isRoomAvailable(room.id);

  return (
    <>
      <div className="room-details-page">
        <div className="room-details-grid">

          <div className="room-details-info">
            <h1>{room.name}</h1>
            <p>{room.desc}</p>
            <p className="room-price">{formatPrice(room.price)} / night</p>

            <ul className="room-features">
              <li>🌿 Nature View</li>
              <li>🛏 {room.beds} Bed{room.beds > 1 ? "s" : ""} · {room.ac}</li>
              <li>👨‍👩‍👧 Up to {room.maxOccupancy} guests</li>
              <li>📶 {room.amenities?.join(" · ")}</li>
            </ul>

            {available ? (
              <button
                className="room-btn"
                onClick={() =>
                  navigate("/booking", { state: { room } })
                }
              >
                Book This Room
              </button>
            ) : (
              <button className="room-btn disabled">Not Available</button>
            )}
          </div>

          <div className="room-details-image">
            <img src={room.img} alt={room.name} />
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
