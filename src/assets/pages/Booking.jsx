import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/booking.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { API_URL, hasApi, RECAPTCHA_SITE_KEY, formatPrice } from "../services/api";
import { bookRoom } from "../utils/bookingStore";

export default function Booking() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const selectedRoom = location.state?.room;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    checkInTime: "",
    checkOutTime: "",
    identityType: "",
    identityNumber: "",
  });

  if (!selectedRoom) {
    return (
      <div className="booking-empty">
        <h2>No room selected</h2>
        <button onClick={() => navigate("/rooms")}>Go to Rooms</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      roomImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const aadhaarRegex = /^[0-9]{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!form.identityType || !form.identityNumber) {
      alert("Please provide identity proof details");
      return;
    }

    if (form.identityType === "aadhaar" && !aadhaarRegex.test(form.identityNumber)) {
      alert("Aadhaar must be 12 digits");
      return;
    }

    if (form.identityType === "pan" && !panRegex.test(form.identityNumber)) {
      alert("Invalid PAN format (Example: ABCDE1234F)");
      return;
    }

    if (
      !form.name ||
      !form.phone ||
      !form.checkIn ||
      !form.checkOut ||
      !form.checkInTime ||
      !form.checkOutTime
    ) {
      alert("Please fill all fields including time");
      return;
    }

    if (!nameRegex.test(form.name)) {
      alert("Name should contain only letters");
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    const checkInDateTime = new Date(`${form.checkIn}T${form.checkInTime}`);
    const checkOutDateTime = new Date(`${form.checkOut}T${form.checkOutTime}`);

    if (checkInDateTime >= checkOutDateTime) {
      alert("Check-out date & time must be after check-in");
      return;
    }

    if (RECAPTCHA_SITE_KEY && !captchaValue) {
      alert("Please complete the CAPTCHA");
      return;
    }

    // No backend configured → confirm the booking locally so the site
    // stays usable as a static demo.
    if (!hasApi) {
      bookRoom({
        demo: true,
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        price: selectedRoom.price,
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        checkInTime: form.checkInTime,
        checkOutTime: form.checkOutTime,
        identityType: form.identityType,
        identityNumber: form.identityNumber,
      });
      setShowSuccess(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("roomId", selectedRoom.id);
      formData.append("roomName", selectedRoom.name);
      formData.append("price", selectedRoom.price);
      formData.append("customerName", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("checkIn", form.checkIn);
      formData.append("checkOut", form.checkOut);
      formData.append("checkInTime", form.checkInTime);
      formData.append("checkOutTime", form.checkOutTime);
      formData.append("identityType", form.identityType);
      formData.append("identityNumber", form.identityNumber);
      formData.append("extraGuests", form.extraGuests || 0);
      formData.append("children", form.children || 0);
      formData.append("captchaToken", captchaValue);

      if (form.roomImage) {
        formData.append("roomImage", form.roomImage);
      }

      const response = await axios.post(
        `${API_URL}/api/bookings`,
        formData
      );

      if (response.status === 201) {
        setShowSuccess(true);

        if (response.data.emailSent === false) {
          alert("Booking confirmed, but email could not be sent.");
        }
      } else {
        alert("Booking failed. Please try again.");
      }

    } catch (error) {
      console.error(error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="hero-content">
          <h1>Book {selectedRoom.name}</h1>
          <p>{formatPrice(selectedRoom.price)}</p>
        </div>
      </div>

      <div className="booking-container">
        <div className="booking-card">
          <div className="room-summary">
            <img src={selectedRoom.img} alt={selectedRoom.name} />
            <div>
              <h3>{selectedRoom.name}</h3>
              <p>{formatPrice(selectedRoom.price)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                required
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Enter 10 digit number"
                value={form.phone}
                required
                onChange={handleChange}
                maxLength="10"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                required
                onChange={handleChange}
              />
            </div>

            {/* Check-in / Check-out */}
            <div className="form-group">
              <label htmlFor="checkIn">
                Check-in Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkInTime">
                Check-in Time <span className="required">*</span>
              </label>
              <input
                type="time"
                id="checkInTime"
                name="checkInTime"
                value={form.checkInTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOut">
                Check-out Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOutTime">
                Check-out Time <span className="required">*</span>
              </label>
              <input
                type="time"
                id="checkOutTime"
                name="checkOutTime"
                value={form.checkOutTime}
                onChange={handleChange}
              />
            </div>

            {/* Image */}
            <div className="form-group">
              <label htmlFor="roomImage">
                Image <span className="optional">(optional)</span>
              </label>
              <input
                type="file"
                id="roomImage"
                name="roomImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Identity Proof */}
            <div className="form-group">
              <label htmlFor="identityType">
                Identity Proof <span className="required">*</span>
              </label>
              <select
                id="identityType"
                name="identityType"
                value={form.identityType}
                required
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Identity Type *
                </option>
                <option value="aadhaar">Aadhaar</option>
                <option value="pan">PAN</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="identityNumber">
                Identity Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="identityNumber"
                name="identityNumber"
                placeholder="Enter Aadhaar or PAN number"
                value={form.identityNumber}
                required
                onChange={handleChange}
              />
            </div>

            {/* CAPTCHA — only rendered when a site key is configured for this domain */}
            {RECAPTCHA_SITE_KEY && (
              <div className="form-group">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(value) => setCaptchaValue(value)}
                />
              </div>
            )}

            <button type="submit" className="confirm-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="checkmark">✔</div>
            <h2>Booking Confirmed!</h2>
            <p>
              Your stay at <strong>{selectedRoom.name}</strong> is reserved.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/rooms");
              }}
            >
              Back to Rooms
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
