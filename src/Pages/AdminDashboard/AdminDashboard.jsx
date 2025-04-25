import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
    maintenanceRooms: 0,
  });
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(''); // Added error state

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms/stats');
        setStats(res.data);
        setLoading(false); // Data fetched, set loading to false
      } catch (error) {
        setLoading(false); // Data fetch failed, set loading to false
        setError('Failed to fetch room stats');
        console.error('Failed to fetch room stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => navigate('/admin/manage-rooms')}>Manage Rooms</li>
          <li onClick={() => navigate('/admin/manage-staff')}>Manage Staff</li>
          <li onClick={() => navigate('/admin/room-availability')}>Room Availability</li>
          <li onClick={() => navigate('/room-calendar')}>Room Calendar</li>
          <li className="logout" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {loading ? (
          <div className="loading">Loading statistics...</div> // Loading state
        ) : error ? (
          <div className="error-message">{error}</div> // Error state
        ) : (
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
              <h3>Occupied Rooms</h3>
              <p>{stats.bookedRooms}</p>
            </div>
            <div className="tile red">
              <h3>Under Maintenance</h3>
              <p>{stats.maintenanceRooms}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
