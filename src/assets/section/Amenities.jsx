export default function Amenities() {
  const amenities = [
    {
      title: "Nature Walk",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    } ,
    
    {
      title: "Swimming Pool",
      img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b3",
    },
    {
      title: "Camp Fire",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      title: "Fine Dining",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    },
    {
      title: "Free Parking",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    },
    {
      title: "Free WiFi",
      img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
  ];

  return (
    <section className="amenities-section">
      <h2 className="section-title">Resort Amenities</h2>

      <div className="amenities-grid">
        {amenities.map((item, index) => (
          <div className="amenity-card" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


