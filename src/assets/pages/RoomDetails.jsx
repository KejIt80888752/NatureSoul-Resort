import { useParams, useNavigate } from "react-router-dom";
import roomsData from "../data/roomsData";
import { isRoomAvailable } from "../utils/bookingStore";
import "../style/roomDetails.css";
import Footer from "../components/Footer";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = roomsData.find(r => r.id === Number(id));
  if (!room) return <h2>Room not found</h2>;

  const available = isRoomAvailable(room.id);

  return (
    <div className="room-details-page">
      <div className="room-details-grid">

        <div className="room-details-info">
          <h1>{room.name}</h1>
          <p>{room.desc}</p>
          <p className="room-price">{room.price}</p>

          <ul className="room-features">
            <li>🌿 Nature View</li>
            <li>🛏 King Size Bed</li>
            <li>🚿 Attached Bathroom</li>
            <li>📶 Free Wi-Fi</li>
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
  );
}
{/* FOOTER */ }
<Footer />