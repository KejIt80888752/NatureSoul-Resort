import { useState } from "react";
import { messageTemplates, buildFullMessage, whatsappLink } from "../../utils/guestMessages";

export default function WhatsAppPanel({ bookings }) {
  const [selectedId, setSelectedId] = useState(bookings[0]?.id ?? null);
  const [copied, setCopied] = useState(false);

  const booking = bookings.find((b) => b.id === selectedId) || bookings[0];

  if (!booking) {
    return (
      <div className="panel">
        <h2>Guest WhatsApp</h2>
        <p className="dash-note">No bookings yet — messages appear here once a guest books.</p>
      </div>
    );
  }

  const fullText = buildFullMessage(booking);
  const link = whatsappLink(booking.whatsapp || booking.phone, fullText);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Guest WhatsApp</h2>
          <p>
            Every guest gets a welcome, their booking details, our contact, the map link
            and the food menu — so the kitchen knows what to prepare.
          </p>
        </div>
      </div>

      <div className="wa-note">
        <strong>How this works today:</strong> pick a guest and tap send — WhatsApp opens
        with the full text ready. Once a WhatsApp Business API account (AiSensy / Interakt /
        Wati / Gupshup) is connected, these exact templates are sent automatically the
        moment a booking arrives, with no staff action.
      </div>

      <div className="wa-layout">
        <div className="wa-guests">
          <h4>Guests</h4>
          {bookings.slice(0, 12).map((b) => (
            <button
              key={b.id}
              className={`wa-guest ${b.id === booking.id ? "active" : ""}`}
              onClick={() => setSelectedId(b.id)}
            >
              <strong>{b.customerName}</strong>
              <span className="dash-sub">
                {b.roomName} · {b.checkIn}
              </span>
            </button>
          ))}
        </div>

        <div className="wa-preview">
          <div className="wa-phone">
            <div className="wa-phone-head">
              <span className="wa-avatar">{booking.customerName?.[0] || "G"}</span>
              <div>
                <strong>{booking.customerName}</strong>
                <div className="wa-number">+91 {booking.whatsapp || booking.phone}</div>
              </div>
            </div>

            <div className="wa-thread">
              {messageTemplates.map((template) => (
                <div className="wa-bubble" key={template.id}>
                  <span className="wa-tag">{template.label}</span>
                  <pre>{template.build(booking)}</pre>
                </div>
              ))}
            </div>
          </div>

          <div className="wa-actions">
            {link && (
              <a className="dash-btn wa-send" href={link} target="_blank" rel="noreferrer">
                Send on WhatsApp
              </a>
            )}
            <button className="dash-btn ghost" onClick={copy}>
              {copied ? "Copied ✓" : "Copy all messages"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
