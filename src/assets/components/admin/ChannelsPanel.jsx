import { isDemoMode } from "../../services/adminApi";

// Honest status board. Nothing here pretends to be connected — the OTA rows are
// what a channel manager subscription switches on, and they are labelled as such.
const otaChannels = [
  { name: "Booking.com", note: "Connects through the channel manager" },
  { name: "Agoda", note: "Connects through the channel manager" },
  { name: "Goibibo", note: "Connects through the channel manager" },
  { name: "MakeMyTrip", note: "Connects through the channel manager" },
  { name: "Airbnb", note: "Connects through the channel manager" },
];

const ownChannels = [
  {
    name: "Resort website",
    status: isDemoMode ? "demo" : "live",
    note: isDemoMode
      ? "Running on sample data — goes live when the booking server is deployed"
      : "Live — bookings arrive straight into this dashboard, 0% commission",
  },
  {
    name: "Advance payment (Razorpay / Cashfree)",
    status: "pending",
    note: "Gateway account needed — then advance payment lands directly in the resort bank account",
  },
  {
    name: "WhatsApp automation",
    status: "pending",
    note: "Messages are written and ready; needs a WhatsApp Business API account to send automatically",
  },
  {
    name: "Booking confirmation email + PDF invoice",
    status: "pending",
    note: "Built — needs the resort email account to be added on the server",
  },
];

const StatusPill = ({ status }) => {
  const map = {
    live: ["live", "Live"],
    demo: ["demo", "Demo data"],
    pending: ["pending", "Not connected"],
    ota: ["pending", "Needs channel manager"],
  };
  const [cls, label] = map[status] || map.pending;
  return <span className={`pill ${cls}`}>{label}</span>;
};

export default function ChannelsPanel() {
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Channels &amp; integrations</h2>
          <p>What is working today, and what switches on next.</p>
        </div>
      </div>

      <div className="channel-warning">
        <strong>Important:</strong> OTA connections (Booking.com, Agoda, Goibibo, MakeMyTrip,
        Airbnb) are <u>not</u> active in this demo. Those platforms only open their systems to
        certified channel-manager companies, so they switch on after a channel manager
        subscription (AxisRooms / STAAH / eZee) is taken. This dashboard shows how the daily
        work will look — calendar, rates, notifications, guest messages — on the resort's own
        booking data.
      </div>

      <h4 className="channel-group">OTA channels</h4>
      <div className="channel-grid">
        {otaChannels.map((c) => (
          <div className="channel-card" key={c.name}>
            <div className="channel-top">
              <strong>{c.name}</strong>
              <StatusPill status="ota" />
            </div>
            <p>{c.note}</p>
          </div>
        ))}
      </div>

      <h4 className="channel-group">Direct channels (ours)</h4>
      <div className="channel-grid">
        {ownChannels.map((c) => (
          <div className="channel-card" key={c.name}>
            <div className="channel-top">
              <strong>{c.name}</strong>
              <StatusPill status={c.status} />
            </div>
            <p>{c.note}</p>
          </div>
        ))}
      </div>

      <div className="channel-note">
        A channel manager handles <strong>rates and availability</strong> only. Photos,
        descriptions and amenities still have to be updated inside each OTA's own extranet —
        no channel manager syncs property photos.
      </div>
    </div>
  );
}
