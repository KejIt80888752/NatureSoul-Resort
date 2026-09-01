import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import roomsData, { imageForRoom, descriptionForRoom } from "../data/roomsData";
import { isRoomAvailable } from "../utils/bookingStore";
import { API_URL, hasApi, formatPrice } from "../services/api";
import "../style/roomDetails.css";
import Footer from "../components/Footer";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const localRoom = roomsData.find((r) => r.id === Number(id));
  const [room, setRoom] = useState(localRoom);
  const [available, setAvailable] = useState(
    localRoom ? isRoomAvailable(localRoom.id) : false
  );

  useEffect(() => {
    if (!hasApi) return;
    let active = true;

    axios
      .get(`${API_URL}/api/rooms`)
      .then((res) => {
        if (!active) return;
        const live = res.data.find((r) => Number(r.id) === Number(id));
        if (!live) return;

        setRoom({
          ...live,
          img: live.photoUrl
            ? `${API_URL}${live.photoUrl}`
            : live.img || imageForRoom(live.name),
          desc: live.desc || descriptionForRoom(live.name),
        });
        setAvailable(live.available !== false);
      })
      .catch((err) => console.error("ROOM DETAILS API ERROR:", err));

    return () => {
      active = false;
    };
  }, [id]);

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
                onClick={() => navigate("/booking", { state: { room } })}
              >
                Book This Room
              </button>
            ) : (
              <button className="room-btn disabled" disabled>
                Currently Booked
              </button>
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
