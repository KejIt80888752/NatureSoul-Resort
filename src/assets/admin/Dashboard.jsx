export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>120</h3>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <h3>15</h3>
          <p>Total Rooms</p>
        </div>

        <div className="stat-card">
          <h3>8</h3>
          <p>Available Today</p>
        </div>
      </div>
    </div>
  );
}