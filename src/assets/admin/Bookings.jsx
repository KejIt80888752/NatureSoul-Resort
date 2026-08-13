const dummyBookings = [
  { id: 1, name: "Saran", room: "Deluxe", date: "2026-02-24" },
  { id: 2, name: "Kumar", room: "Family Suite", date: "2026-02-25" },
];

export default function Bookings() {
  return (
    <div>
      <h2>Bookings</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Room</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyBookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.room}</td>
              <td>{b.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}