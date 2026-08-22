import { useEffect, useMemo, useState } from "react";
import { adminApi, isDemoMode, today } from "../services/adminApi";
import { formatPrice } from "../services/api";
import { whatsappLink, buildFullMessage } from "../utils/guestMessages";
import CalendarPanel from "../components/admin/CalendarPanel";
import RatesPanel from "../components/admin/RatesPanel";
import WhatsAppPanel from "../components/admin/WhatsAppPanel";
import ChannelsPanel from "../components/admin/ChannelsPanel";
import logo from "../LOGO.png";
import "../style/dashboard.css";

const KEY_STORAGE = "nsr_admin_key";
const SEEN_STORAGE = "nsr_seen_booking_ids";

const TABS = [
  ["bookings", "Bookings"],
  ["calendar", "Calendar"],
  ["rates", "Rates & Photos"],
  ["whatsapp", "Guest WhatsApp"],
  ["channels", "Channels"],
];

export default function Dashboard() {
  const [adminKey, setAdminKey] = useState(localStorage.getItem(KEY_STORAGE) || "");
  const [keyInput, setKeyInput] = useState("");
  const [tab, setTab] = useState("bookings");

  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [newIds, setNewIds] = useState([]);

  const load = (key) => {
    setStatus("loading");
    setError("");

    adminApi
      .bookings(key)
      .then((data) => {
        setBookings(data);
        setStatus("done");

        // Anything not seen in this browser before counts as a new booking
        let seen = [];
        try {
          seen = JSON.parse(localStorage.getItem(SEEN_STORAGE)) || [];
        } catch {
          seen = [];
        }
        const fresh = data.filter((b) => !seen.includes(b.id)).map((b) => b.id);
        if (fresh.length) setNewIds(fresh);
        localStorage.setItem(SEEN_STORAGE, JSON.stringify(data.map((b) => b.id)));
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
    if (isDemoMode || adminKey) load(adminKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  // Live-ish notifications: check for new bookings every 30 seconds
  useEffect(() => {
    if (!isDemoMode && !adminKey) return;
    const timer = setInterval(() => load(adminKey), 30000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const stats = useMemo(() => {
    const now = today();
    return {
      total: bookings.length,
      staying: bookings.filter((b) => b.checkIn <= now && b.checkOut > now).length,
      upcoming: bookings.filter((b) => b.checkIn > now).length,
      revenue: bookings.reduce((sum, b) => sum + Number(b.price || 0), 0),
    };
  }, [bookings]);

  const visible = useMemo(() => {
    const now = today();
    const q = search.trim().toLowerCase();

    return bookings
      .filter((b) => {
        if (filter === "upcoming") return b.checkIn > now;
        if (filter === "staying") return b.checkIn <= now && b.checkOut > now;
        if (filter === "past") return b.checkOut <= now;
        return true;
      })
      .filter((b) =>
        !q
          ? true
          : [b.customerName, b.phone, b.whatsapp, b.email, b.roomName, String(b.id)]
              .join(" ")
              .toLowerCase()
              .includes(q)
      );
  }, [bookings, search, filter]);

  /* ---------- locked ---------- */
  if (!isDemoMode && !adminKey) {
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
          <h1>Resort Dashboard</h1>
          <p>Enter the admin key to continue.</p>

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

  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-brand">
          <img src={logo} alt="Nature Soul Resort" />
          <div>
            <h1>Resort Dashboard</h1>
            <span>Nature Soul Resort · Nandi Hills</span>
          </div>
        </div>

        <div className="dash-header-actions">
          {newIds.length > 0 && (
            <span className="dash-bell" onClick={() => setNewIds([])}>
              🔔 {newIds.length} new booking{newIds.length > 1 ? "s" : ""}
            </span>
          )}
          <button className="dash-btn ghost" onClick={() => load(adminKey)}>
            Refresh
          </button>
          {!isDemoMode && (
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

      {isDemoMode && (
        <p className="dash-note">
          <strong>Demo mode.</strong> Sample bookings, running in this browser so the workflow
          can be shown before the booking server is live. Every action here is real once the
          server is deployed.
          <button className="dash-btn ghost" onClick={() => { adminApi.resetDemo(); load(adminKey); }}>
            Reset demo data
          </button>
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

      <nav className="dash-tabs">
        {TABS.map(([value, label]) => (
          <button
            key={value}
            className={`dash-tab ${tab === value ? "active" : ""}`}
            onClick={() => setTab(value)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "bookings" && (
        <div className="panel">
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
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((b) => (
                    <tr key={b.id} className={newIds.includes(b.id) ? "row-new" : ""}>
                      <td>
                        {b.id}
                        {newIds.includes(b.id) && <span className="new-tag">NEW</span>}
                      </td>

                      <td>
                        <strong>{b.customerName}</strong>
                        <div className="dash-sub">{b.email}</div>
                      </td>

                      <td>
                        <a href={`tel:+91${b.phone}`}>{b.phone}</a>
                        {b.whatsapp && b.whatsapp !== b.phone && (
                          <div className="dash-sub">WA: {b.whatsapp}</div>
                        )}
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
                      <td>
                        <a
                          className="dash-wa"
                          href={whatsappLink(b.whatsapp || b.phone, buildFullMessage(b))}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "calendar" && <CalendarPanel adminKey={adminKey} />}
      {tab === "rates" && <RatesPanel adminKey={adminKey} />}
      {tab === "whatsapp" && <WhatsAppPanel bookings={bookings} />}
      {tab === "channels" && <ChannelsPanel />}

      <p className="dash-footer">
        Guest ID numbers are personal data — keep this dashboard and the admin key private.
      </p>
    </div>
  );
}
