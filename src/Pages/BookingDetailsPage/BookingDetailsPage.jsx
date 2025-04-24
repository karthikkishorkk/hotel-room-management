import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingDetailsPage.css';
import { useNavigate } from 'react-router-dom';

const BookingDetailsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings');
        setBookings(res.data.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  const handleNewBooking = () => {
    navigate('/booking');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Adjust key if your token is stored differently
    navigate('/login');
  };

  const filteredBookings = bookings.filter((booking) => {
    const fullName = `${booking.firstName} ${booking.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || booking.status === statusFilter)
    );
  });

  return (
    <div className="booking-details-container">
      <div className="booking-header">
        <h2>Bookings</h2>
        <div className="booking-header-buttons">
          <button className="new-booking-btn" onClick={handleNewBooking}>
            New Booking
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="booking-filters">
        <input
          type="text"
          placeholder="(Type Guest Name)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">- Any Status -</option>
          <option value="CheckedIn">CheckedIn</option>
          <option value="CheckedOut">CheckedOut</option>
          <option value="Booked">Booked</option>
          <option value="Canceled">Canceled</option>
        </select>

        <button className="search-btn">Search</button>
      </div>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Guest Last Name</th>
            <th>Guest First Name</th>
            <th>Room Type</th>
            <th>Check In Date</th>
            <th>Check Out Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking, index) => (
            <tr key={index}>
              <td className="last-name">{booking.lastName}</td>
              <td>{booking.firstName}</td>
              <td>{booking.room.roomType}</td>
              <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
              <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDetailsPage;
