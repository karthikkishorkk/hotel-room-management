
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import ManageRoomsPage from '../ManageRoomsPage/ManageRoomsPage'; // Import ManageRoomsPage
import ManageStaffPage from '../ManageUsersPage/ManageUsersPage'; // Import ManageStaffPage
import RoomAvailabilityPage from '../AvailableRoomsPage/AvailableRoomsPage'; // Import RoomAvailabilityPage

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
    maintenanceRooms: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');
  const [showManageRooms, setShowManageRooms] = useState(false); // Toggle for Manage Rooms
  const [showManageStaff, setShowManageStaff] = useState(false); // Toggle for Manage Staff
  const [showRoomAvailability, setShowRoomAvailability] = useState(false); // Toggle for Room Availability

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const fetchStatsAndBookings = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/rooms/stats'),
          axios.get('http://localhost:5000/api/bookings'),
        ]);
        setStats(statsRes.data);
  
        const sortedBookings = bookingsRes.data.data.sort(
          (a, b) => new Date(b.checkIn) - new Date(a.checkIn)
        );
        setBookings(sortedBookings.slice(0, 5));
  
        setLoading(false); 
      } catch (error) {
        setLoading(false);
        setError('Failed to fetch dashboard data');
        console.error('Error:', error);
      }
    };
    fetchStatsAndBookings();
  }, []);

  // Functions to toggle views
  const handleManageRoomsClick = () => {
    setShowManageRooms(!showManageRooms);
    setShowManageStaff(false); // Hide Manage Staff when Manage Rooms is clicked
    setShowRoomAvailability(false); // Hide Room Availability when Manage Rooms is clicked
  };

  const handleManageStaffClick = () => {
    setShowManageStaff(!showManageStaff);
    setShowManageRooms(false); // Hide Manage Rooms when Manage Staff is clicked
    setShowRoomAvailability(false); // Hide Room Availability when Manage Staff is clicked
  };

  const handleRoomAvailabilityClick = () => {
    setShowRoomAvailability(!showRoomAvailability);
    setShowManageRooms(false); // Hide Manage Rooms when Room Availability is clicked
    setShowManageStaff(false); // Hide Manage Staff when Room Availability is clicked
  };

  return (
      <main className="dashboard-content">
        {/* Conditionally render ManageRoomsPage, ManageStaffPage, or RoomAvailabilityPage */}
        {showManageRooms ? (
          <ManageRoomsPage />
        ) : showManageStaff ? (
          <ManageStaffPage />
        ) : showRoomAvailability ? (
          <RoomAvailabilityPage /> // Render RoomAvailabilityPage when it's toggled
        ) : (
          <>
            {loading ? (
              <div className="loading">Loading dashboard...</div> 
            ) : error ? (
              <div className="error-message">{error}</div> 
            ) : (
              <>
                <div className="tiles-grid">
                  <div className="tile orange">
                    <h3>Total Rooms</h3>
                    <p>{stats.totalRooms}</p>
                  </div>
                  <div className="tile green">
                    <h3>Available Rooms</h3>
                    <p>{stats.availableRooms}</p>
                  </div>
                  <div className="tile blue">
                    <h3>Booked Rooms</h3>
                    <p>{stats.bookedRooms}</p>
                  </div>
                  <div className="tile red">
                    <h3>Under Maintenance</h3>
                    <p>{stats.maintenanceRooms}</p>
                  </div>
                </div>

                <h2 className="dashboard-bookings-title">Recent Bookings</h2>
                <table className="booking-table">
                  <thead>
                    <tr>
                      <th>Guest Last Name</th>
                      <th>Guest First Name</th>
                      <th>Room Type</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.lastName}</td>
                        <td>{booking.firstName}</td>
                        <td>{booking.room?.roomType || 'N/A'}</td>
                        <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                        <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                        <td>{booking.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </main>
  );
};

export default AdminDashboard;
