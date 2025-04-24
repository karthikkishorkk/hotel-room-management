import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';

// const roomTypes = [
//   { type: 'Standard', price: '$60' },
//   { type: 'Classic', price: '$70' },
//   { type: 'Duplex Room', price: '$80' },
//   { type: 'Double Room', price: '$90' },
//   { type: 'Queens Suite', price: '$110' },
//   { type: 'Presidential Suite', price: '$150' },
//   { type: 'Penthouse', price: '$200' },
// ];

const BookingPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    altPhone: '',
    guests: 2,
    children: 0,
    checkIn: '',
    checkOut: '',
    room: '',
    childrenAges: [],
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
        console.log(response.data, "Response");
      } catch (error) {
        console.error('❌ Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const uniqueRoomTypes = [...new Set(rooms.map(room => room.roomType))];

  const filteredRooms = rooms.filter(room => room.roomType === selectedRoomType);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'children') {
      const childrenCount = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        children: childrenCount,
        childrenAges: Array(childrenCount).fill(12),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAgeChange = (index, value) => {
    const updatedAges = [...formData.childrenAges];
    updatedAges[index] = parseInt(value);
    setFormData((prev) => ({ ...prev, childrenAges: updatedAges }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking Form Data:", formData);

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', formData);
      if (response.status === 201 || response.status === 200) {
        console.log('✅ Booking submitted successfully');

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          altPhone: '',
          guests: 2,
          children: 0,
          checkIn: '',
          checkOut: '',
          room: '',
          childrenAges: [],
        });
        setSelectedRoomType('');

        // Redirect to BookingDetailsPage
        navigate('/booking-details');
      }
    } catch (error) {
      console.error('❌ Error submitting booking:', error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Stay</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-row">
          <input
            type="text" name="firstName" placeholder="First Name" required
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text" name="lastName" placeholder="Last Name" required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="email" name="email" placeholder="Email" required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="tel" name="phone" placeholder="Phone Number" required
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="tel" name="altPhone" placeholder="Alternate Phone Number"
            value={formData.altPhone}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="number" name="guests"
            min="1" placeholder="No. of Guests"
            value={formData.guests}
            onChange={handleChange}
          />
          <input
            type="number" name="children"
            min="0" placeholder="Children (above 12)"
            value={formData.children}
            onChange={handleChange}
          />
        </div>

        {formData.children > 0 && (
          <div className="form-row">
            {formData.childrenAges.map((age, index) => (
              <select
                key={index}
                value={age}
                onChange={(e) => handleAgeChange(index, e.target.value)}
              >
                {Array.from({ length: 7 }, (_, i) => 12 + i).map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            ))}
          </div>
        )}

        <div className="form-row">
          <input
            type="date" name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
          <input
            type="date" name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </div>

        {/* Room Type Dropdown */}
        <div className="form-row">
          <select
            name="roomType"
            value={selectedRoomType}
            onChange={(e) => {
              setSelectedRoomType(e.target.value);
              setFormData((prev) => ({ ...prev, room: '' }));
            }}
            required
          >
            <option value="" disabled hidden>Select Room Type</option>
            {uniqueRoomTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Room Dropdown - based on selected type */}
        {selectedRoomType && (
          <div className="form-row">
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>Select a Room</option>
              {filteredRooms.map((room) => (
                <option key={room._id} value={room._id}>
                  Room #{room.roomNumber}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="submit-btn">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
