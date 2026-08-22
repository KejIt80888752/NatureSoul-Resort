// Entry point for the staff dashboard, which is deployed as its own site
// (NatureSoul-Dashboard) so nothing about it ships with the guest website.

import ReactDOM from "react-dom/client";
import Dashboard from "./assets/pages/Dashboard";
// Deliberately no index.css — the dashboard carries its own styles, so the
// website's hero images and page CSS are not shipped to staff.

ReactDOM.createRoot(document.getElementById("root")).render(<Dashboard />);
