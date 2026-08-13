export default function RoomsManage() {
  return (
    <div>
      <h2>Manage Rooms</h2>

      <button className="add-btn">+ Add Room</button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Deluxe</td>
            <td>₹4500</td>
            <td>Available</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}