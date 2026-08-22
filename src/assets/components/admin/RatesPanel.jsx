import { useEffect, useState } from "react";
import { adminApi } from "../../services/adminApi";
import { imageForRoom } from "../../data/roomsData";
import { formatPrice } from "../../services/api";

export default function RatesPanel({ adminKey }) {
  const [rooms, setRooms] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    adminApi
      .rooms(adminKey)
      .then(setRooms)
      .catch((err) => setError(err.response?.data?.message || err.message));
  };

  useEffect(load, [adminKey]);

  const draftFor = (room) => ({
    price: room.price,
    img: room.img || "",
    ...(drafts[room.id] || {}),
  });

  const setDraft = (roomId, field, value) =>
    setDrafts((d) => ({ ...d, [roomId]: { ...(d[roomId] || {}), [field]: value } }));

  const save = async (room) => {
    const draft = draftFor(room);
    setSaving(room.id);
    setError("");

    try {
      await adminApi.updateRoom(adminKey, room.id, {
        price: Number(draft.price),
        img: draft.img,
      });
      setSaved(room.id);
      setTimeout(() => setSaved(null), 2500);
      setDrafts((d) => {
        const next = { ...d };
        delete next[room.id];
        return next;
      });
      load();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Rates &amp; photos</h2>
          <p>
            Change the tariff or the photo of any unit. Saving updates the website
            instantly — no code change, no developer needed.
          </p>
        </div>
      </div>

      {error && <p className="dash-note error">{error}</p>}

      <div className="rate-grid">
        {rooms.map((room) => {
          const draft = draftFor(room);
          const dirty = Boolean(drafts[room.id]);
          const preview = draft.img || imageForRoom(room.name);

          return (
            <div className="rate-card" key={room.id}>
              <div className="rate-photo">
                {preview ? (
                  <img src={preview} alt={room.name} />
                ) : (
                  <div className="rate-photo-empty">No photo</div>
                )}
              </div>

              <div className="rate-body">
                <h3>{room.name}</h3>
                <span className="dash-sub">
                  {room.type} · up to {room.maxOccupancy} guests · {room.ac}
                </span>

                <label>
                  Tariff per night
                  <div className="rate-input">
                    <span>₹</span>
                    <input
                      type="number"
                      min="1"
                      value={draft.price}
                      onChange={(e) => setDraft(room.id, "price", e.target.value)}
                    />
                  </div>
                </label>

                <label>
                  Photo URL
                  <input
                    type="url"
                    placeholder="https://..."
                    value={draft.img}
                    onChange={(e) => setDraft(room.id, "img", e.target.value)}
                  />
                </label>

                <div className="rate-actions">
                  <button
                    className="dash-btn"
                    disabled={!dirty || saving === room.id}
                    onClick={() => save(room)}
                  >
                    {saving === room.id ? "Saving..." : "Save"}
                  </button>

                  {saved === room.id && <span className="rate-saved">Updated ✓</span>}
                  {!dirty && saved !== room.id && (
                    <span className="dash-sub">Live: {formatPrice(room.price)}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
