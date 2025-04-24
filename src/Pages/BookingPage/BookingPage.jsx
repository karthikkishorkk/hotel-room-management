import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';

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

  // Fetch rooms on load (useEffect)
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

  // Filter rooms based on the selected room type and availability
  const filteredRooms = rooms.filter(room => room.roomType === selectedRoomType);

  // Handle changes in form fields
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

  // Check room availability based on selected dates
  const handleRoomTypeChange = async (e) => {
    const roomType = e.target.value;
    setSelectedRoomType(roomType);
    setFormData((prev) => ({ ...prev, room: '' }));  // Reset selected room

    if (formData.checkIn && formData.checkOut) {
      // Fetch available rooms based on the selected room type and dates
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/available', {
          params: {
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            roomType: roomType,
          },
        });
        setRooms(response.data.data);  // Update the rooms state with available rooms
      } catch (error) {
        console.error('❌ Error fetching available rooms:', error);
      }
    }
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
        {/* Form Fields */}
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
            onChange={handleRoomTypeChange}
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
