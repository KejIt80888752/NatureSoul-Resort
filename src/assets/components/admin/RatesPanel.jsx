import { useEffect, useRef, useState } from "react";
import { adminApi, isDemoMode } from "../../services/adminApi";
import { imageForRoom } from "../../data/roomsData";
import { API_URL, formatPrice } from "../../services/api";

// An uploaded photo (served by the API) wins over a pasted URL, which wins over
// the photo bundled with the website.
const photoFor = (room, draft) => {
  if (draft?.preview) return draft.preview;
  if (room.photoUrl) return `${API_URL}${room.photoUrl}`;
  if (draft?.img) return draft.img;
  if (room.img) return room.img;
  return imageForRoom(room.name);
};

export default function RatesPanel({ adminKey }) {
  const [rooms, setRooms] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");
  const fileInputs = useRef({});

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

  const clearDraft = (roomId) =>
    setDrafts((d) => {
      const next = { ...d };
      delete next[roomId];
      return next;
    });

  const flashSaved = (roomId) => {
    setSaved(roomId);
    setTimeout(() => setSaved(null), 2500);
  };

  const pickPhoto = async (room, file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError(`${file.name} is larger than 5 MB. Please use a smaller image.`);
      return;
    }

    setSaving(room.id);
    setError("");

    try {
      await adminApi.uploadRoomPhoto(adminKey, room.id, file);
      clearDraft(room.id);
      flashSaved(room.id);
      load();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(null);
    }
  };

  const save = async (room) => {
    const draft = draftFor(room);
    setSaving(room.id);
    setError("");

    try {
      await adminApi.updateRoom(adminKey, room.id, {
        price: Number(draft.price),
        img: draft.img,
      });
      clearDraft(room.id);
      flashSaved(room.id);
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
            Upload a photo or change the tariff for any unit. Saving updates the
            website immediately — no code change, no developer needed.
          </p>
        </div>
      </div>

      {isDemoMode && (
        <p className="dash-note">
          <strong>Demo mode — photo changes are not saved to the website yet.</strong>{" "}
          Without the booking server there is nowhere to store them, so they live only in
          this browser and disappear when the browser data is cleared. Once the server is
          live, an uploaded photo is stored in the database and stays permanently.
        </p>
      )}

      {error && <p className="dash-note error">{error}</p>}

      <div className="rate-grid">
        {rooms.map((room) => {
          const draft = draftFor(room);
          const dirty = Boolean(drafts[room.id]?.price !== undefined || drafts[room.id]?.img);
          const preview = photoFor(room, drafts[room.id]);

          return (
            <div className="rate-card" key={room.id}>
              <div className="rate-photo">
                {preview ? (
                  <img src={preview} alt={room.name} />
                ) : (
                  <div className="rate-photo-empty">No photo</div>
                )}

                <button
                  className="rate-photo-btn"
                  onClick={() => fileInputs.current[room.id]?.click()}
                  disabled={saving === room.id}
                >
                  {saving === room.id ? "Uploading..." : "Change photo"}
                </button>

                <input
                  ref={(el) => (fileInputs.current[room.id] = el)}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    pickPhoto(room, e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
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
                  Or paste a photo link
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
