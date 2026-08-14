import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL, hasApi, formatPrice } from "../services/api";
import { getBookings } from "../utils/bookingStore";
import logo from "../LOGO.png";
import "../style/dashboard.css";

const KEY_STORAGE = "nsr_admin_key";

const waLink = (number) => {
  const digits = String(number || "").replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
};

const today = () => new Date().toISOString().split("T")[0];

export default function Dashboard() {
  const [adminKey, setAdminKey] = useState(localStorage.getItem(KEY_STORAGE) || "");
  const [keyInput, setKeyInput] = useState("");
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const load = (key) => {
    if (!hasApi) {
      setBookings(
        getBookings().map((b, i) => ({
          id: b.id || i + 1,
          ...b,
          status: "demo",
          createdAt: b.bookedAt,
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
            : err.response?.data?.message || "Could not reach the booking server."
        );
      });
  };

  useEffect(() => {
    if (!hasApi || adminKey) load(adminKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const stats = useMemo(() => {
    const now = today();
    const upcoming = bookings.filter((b) => b.checkIn >= now);
    const staying = bookings.filter((b) => b.checkIn <= now && b.checkOut > now);
    const revenue = bookings.reduce((sum, b) => sum + Number(b.price || 0), 0);
    return { total: bookings.length, upcoming: upcoming.length, staying: staying.length, revenue };
  }, [bookings]);

  const visible = useMemo(() => {
    const now = today();
    const q = search.trim().toLowerCase();

    return bookings
      .filter((b) => {
        if (filter === "upcoming") return b.checkIn >= now;
        if (filter === "staying") return b.checkIn <= now && b.checkOut > now;
        if (filter === "past") return b.checkOut < now;
        return true;
      })
      .filter((b) => {
        if (!q) return true;
        return [b.customerName, b.phone, b.whatsapp, b.email, b.roomName, String(b.id)]
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
  }, [bookings, search, filter]);

  /* ---------- locked ---------- */
  if (hasApi && !adminKey) {
    return (
      <div className="dash-login">
        <form
          className="dash-login-card"
          onSubmit={(e) => {
            e.preventDefault();
            if (!keyInput.trim()) return;
            localStorage.setItem(KEY_STORAGE, keyInput.trim());
            setAdminKey(keyInput.trim());
          }}
        >
          <img src={logo} alt="Nature Soul Resort" />
          <h1>Admin Dashboard</h1>
          <p>Enter the admin key to view bookings.</p>

          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key"
            autoFocus
          />
          <button type="submit">Open Dashboard</button>
        </form>
      </div>
    );
  }

  /* ---------- dashboard ---------- */
  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-brand">
          <img src={logo} alt="Nature Soul Resort" />
          <div>
            <h1>Bookings Dashboard</h1>
            <span>Nature Soul Resort</span>
          </div>
        </div>

        <div className="dash-header-actions">
          <button className="dash-btn ghost" onClick={() => load(adminKey)}>
            Refresh
          </button>
          {hasApi && (
            <button
              className="dash-btn ghost"
              onClick={() => {
                localStorage.removeItem(KEY_STORAGE);
                setAdminKey("");
                setBookings([]);
              }}
            >
              Lock
            </button>
          )}
        </div>
      </header>

      {!hasApi && (
        <p className="dash-note">
          Booking server not connected yet — showing demo bookings saved in this browser.
          Once the API is live, real guest bookings appear here.
        </p>
      )}

      {status === "error" && (
        <div className="dash-note error">
          {error}
          <button
            className="dash-btn"
            onClick={() => {
              localStorage.removeItem(KEY_STORAGE);
              setAdminKey("");
            }}
          >
            Change key
          </button>
        </div>
      )}

      <section className="dash-stats">
        <div className="dash-stat">
          <span>{stats.total}</span>
          <p>Total bookings</p>
        </div>
        <div className="dash-stat">
          <span>{stats.staying}</span>
          <p>Staying now</p>
        </div>
        <div className="dash-stat">
          <span>{stats.upcoming}</span>
          <p>Upcoming</p>
        </div>
        <div className="dash-stat">
          <span>{formatPrice(stats.revenue)}</span>
          <p>Booked value</p>
        </div>
      </section>

      <section className="dash-toolbar">
        <input
          type="search"
          placeholder="Search name, phone, email, room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="dash-filters">
          {[
            ["all", "All"],
            ["staying", "Staying now"],
            ["upcoming", "Upcoming"],
            ["past", "Past"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={`dash-chip ${filter === value ? "active" : ""}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {status === "loading" && <p className="dash-note">Loading bookings...</p>}

      {status === "done" && visible.length === 0 && (
        <p className="dash-note">No bookings to show.</p>
      )}

      {visible.length > 0 && (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Guest</th>
                <th>Contact</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>ID proof</th>
                <th>Amount</th>
                <th>Booked on</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>

                  <td>
                    <strong>{b.customerName}</strong>
                    <div className="dash-sub">{b.email}</div>
                  </td>

                  <td>
                    <a href={`tel:+91${b.phone}`}>{b.phone}</a>
                    <div className="dash-contact-links">
                      {waLink(b.whatsapp || b.phone) && (
                        <a
                          href={waLink(b.whatsapp || b.phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="dash-wa"
                        >
                          WhatsApp
                        </a>
                      )}
                      {b.whatsapp && b.whatsapp !== b.phone && (
                        <span className="dash-sub">({b.whatsapp})</span>
                      )}
                    </div>
                  </td>

                  <td>{b.roomName}</td>
                  <td>
                    {b.checkIn}
                    <div className="dash-sub">{b.checkInTime}</div>
                  </td>
                  <td>
                    {b.checkOut}
                    <div className="dash-sub">{b.checkOutTime}</div>
                  </td>
                  <td>
                    {Number(b.extraGuests || 0) + 1}
                    {Number(b.children || 0) > 0 && (
                      <div className="dash-sub">+{b.children} kids</div>
                    )}
                  </td>
                  <td>
                    {b.identityType?.toUpperCase()}
                    <div className="dash-sub">{b.identityNumber}</div>
                  </td>
                  <td>{formatPrice(b.price)}</td>
                  <td className="dash-sub">
                    {b.createdAt ? String(b.createdAt).split("T")[0] : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="dash-footer">
        Guest ID numbers are personal data — keep this dashboard and the admin key private.
      </p>
    </div>
  );
}
