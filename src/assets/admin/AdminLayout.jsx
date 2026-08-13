import { Link, Outlet, useNavigate } from "react-router-dom";
import "../style/admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-container">
      
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="logo">Resort CRM</h2>

        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/bookings">Bookings</Link>
          <Link to="/admin/rooms">Rooms</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <div className="admin-main">
        <header className="admin-topbar">
          <h3>Admin Panel</h3>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}