import { useEffect, useState } from "react";
import { adminApi, addDays, today } from "../../services/adminApi";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const label = (date) => {
  const d = new Date(`${date}T00:00:00`);
  return { day: d.getDate(), weekday: WEEKDAYS[d.getDay()] };
};

export default function CalendarPanel({ adminKey }) {
  const [from, setFrom] = useState(today());
  const [days] = useState(14);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null); // { roomId, name, date, cell }

  const load = () => {
    setError("");
    adminApi
      .calendar(adminKey, from, days)
      .then(setData)
      .catch((err) => setError(err.response?.data?.message || err.message));
  };

  useEffect(load, [from, adminKey]);

  const blockDay = async (roomId, date) => {
    try {
      await adminApi.block(adminKey, {
        roomId,
        from: date,
        to: addDays(date, 1),
        reason: "Blocked by staff",
      });
      setSelected(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const unblock = async (blockId) => {
    await adminApi.unblock(adminKey, blockId);
    setSelected(null);
    load();
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Availability calendar</h2>
          <p>
            Every unit, day by day. Click a free day to block it (maintenance, owner stay,
            phone booking) — blocked days disappear from the website immediately.
          </p>
        </div>

        <div className="cal-nav">
          <button className="dash-btn ghost" onClick={() => setFrom(addDays(from, -7))}>
            ‹ Previous
          </button>
          <button className="dash-btn ghost" onClick={() => setFrom(today())}>
            Today
          </button>
          <button className="dash-btn ghost" onClick={() => setFrom(addDays(from, 7))}>
            Next ›
          </button>
        </div>
      </div>

      <div className="cal-legend">
        <span><i className="dot free" /> Free</span>
        <span><i className="dot booked" /> Guest booking</span>
        <span><i className="dot blocked" /> Blocked by staff</span>
      </div>

      {error && <p className="dash-note error">{error}</p>}

      {data && (
        <div className="cal-wrap">
          <table className="cal-table">
            <thead>
              <tr>
                <th className="cal-room-col">Unit</th>
                {data.dates.map((date) => {
                  const { day, weekday } = label(date);
                  return (
                    <th key={date} className={weekday === "Sat" || weekday === "Sun" ? "weekend" : ""}>
                      <span className="cal-weekday">{weekday}</span>
                      <span className="cal-day">{day}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.calendar.map((room) => (
                <tr key={room.roomId}>
                  <td className="cal-room-col">
                    <strong>{room.name}</strong>
                  </td>

                  {room.days.map((cell) => (
                    <td
                      key={cell.date}
                      className={`cal-cell ${cell.status}`}
                      title={
                        cell.status === "booked"
                          ? `${cell.guest} · booking #${cell.bookingId}`
                          : cell.status === "blocked"
                          ? cell.reason
                          : "Free — click to block"
                      }
                      onClick={() =>
                        setSelected({ roomId: room.roomId, name: room.name, date: cell.date, cell })
                      }
                    >
                      {cell.status === "booked" ? "B" : cell.status === "blocked" ? "✕" : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="cal-popover">
          <div>
            <strong>{selected.name}</strong> · {selected.date}
            <div className="dash-sub">
              {selected.cell.status === "booked"
                ? `Booked by ${selected.cell.guest} (#${selected.cell.bookingId})`
                : selected.cell.status === "blocked"
                ? selected.cell.reason
                : "Currently free"}
            </div>
          </div>

          <div className="cal-popover-actions">
            {selected.cell.status === "free" && (
              <button
                className="dash-btn"
                onClick={() => blockDay(selected.roomId, selected.date)}
              >
                Block this day
              </button>
            )}
            {selected.cell.status === "blocked" && (
              <button className="dash-btn" onClick={() => unblock(selected.cell.blockId)}>
                Unblock
              </button>
            )}
            <button className="dash-btn ghost" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
