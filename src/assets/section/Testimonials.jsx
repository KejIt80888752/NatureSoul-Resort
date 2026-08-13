import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Arun Kumar",
    text: "Amazing place! Peaceful environment and friendly staff.",
    rating: 5,
  },
  {
    name: "Divya S",
    text: "Perfect place for family trips. Loved the nature view.",
    rating: 4,
  },
  {
    name: "Ravi Teja",
    text: "Rooms were clean and food was excellent!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials">
      <h2>What Our Guests Say</h2>

      <div className="testimonial-card">
        <p className="review-text">“{reviews[index].text}”</p>

        <h4>{reviews[index].name}</h4>

        <div className="stars">
          {"⭐".repeat(reviews[index].rating)}
        </div>
      </div>
    </section>
  );
}
