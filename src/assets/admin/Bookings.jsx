import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, hasApi, formatPrice } from "../services/api";
import { getBookings } from "../utils/bookingStore";

const KEY_STORAGE = "nsr_admin_key";

export default function Bookings() {
  const [adminKey, setAdminKey] = useState(localStorage.getItem(KEY_STORAGE) || "");
  const [keyInput, setKeyInput] = useState("");
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const load = (key) => {
    if (!hasApi) {
      // No backend yet → show the demo bookings kept in this browser
      setBookings(
        getBookings().map((b, i) => ({
          id: b.id || i + 1,
          roomName: b.roomName,
          customerName: b.customerName,
          phone: b.phone,
          checkIn: b.checkIn,
          checkOut: b.checkOut,
          price: b.price,
          status: "demo",
        }))
      );
      setStatus("done");
      return;
    }

    setStatus("loading");
    setError("");

    axios
      .get(`${API_URL}/api/admin/bookings`, { headers: { "x-admin-key": key } })
      .then((res) => {
        setBookings(res.data);
        setStatus("done");
      })
      .catch((err) => {
        setStatus("error");
        setError(
          err.response?.status === 401
            ? "Wrong admin key."
            : err.response?.data?.message || "Could not load bookings."
        );
      });
  };

  useEffect(() => {
    if (!hasApi || adminKey) load(adminKey);
  }, [adminKey]);

  if (hasApi && !adminKey) {
    return (
      <div>
        <h2>Bookings</h2>
        <p>Enter the admin key to view guest bookings.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem(KEY_STORAGE, keyInput);
            setAdminKey(keyInput);
          }}
          style={{ display: "flex", gap: 10, maxWidth: 420 }}
        >
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key"
            style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #d1d5db" }}
          />
          <button type="submit" className="add-btn">Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Bookings {bookings.length > 0 && `(${bookings.length})`}</h2>

      {!hasApi && (
        <p style={{ color: "#b45309" }}>
          Backend not connected — showing demo bookings saved in this browser.
        </p>
      )}

      {status === "loading" && <p>Loading bookings...</p>}

      {status === "error" && (
        <div>
          <p style={{ color: "#b91c1c" }}>{error}</p>
          <button
            className="add-btn"
            onClick={() => {
              localStorage.removeItem(KEY_STORAGE);
              setAdminKey("");
            }}
          >
            Change key
          </button>
        </div>
      )}

      {status === "done" && bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest</th>
              <th>Phone</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.customerName}</td>
                <td>{b.phone}</td>
                <td>{b.roomName}</td>
                <td>{b.checkIn} {b.checkInTime}</td>
                <td>{b.checkOut} {b.checkOutTime}</td>
                <td>{formatPrice(b.price)}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
