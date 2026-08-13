export default function Amenities() {
  return (
    <section className="amenities">
      <h2>Resort Amenities</h2>
      <p className="amenities-sub">
        Everything you need for a relaxing and memorable stay
      </p>

      <div className="amenities-grid">
        <div className="amenity-card">
          <span>🏊‍♂️</span>
          <h4>Swimming Pool</h4>
          <p>Relax and unwind in our clean pool</p>
        </div>

        <div className="amenity-card">
          <span>🔥</span>
          <h4>Camp Fire</h4>
          <p>Enjoy peaceful nights with fire & music</p>
        </div>

        <div className="amenity-card">
          <span>🍽️</span>
          <h4>Restaurant</h4>
          <p>Delicious local & multi-cuisine food</p>
        </div>

        <div className="amenity-card">
          <span>🌄</span>
          <h4>Nature View</h4>
          <p>Wake up to mountains & greenery</p>
        </div>

        <div className="amenity-card">
          <span>🛜</span>
          <h4>Free Wi-Fi</h4>
          <p>Stay connected anytime</p>
        </div>

        <div className="amenity-card">
          <span>🚗</span>
          <h4>Parking</h4>
          <p>Spacious & safe parking area</p>
        </div>
      </div>
    </section>
  );
}
