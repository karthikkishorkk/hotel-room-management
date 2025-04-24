import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear auth token or session
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-buttons">
        <button onClick={() => navigate('/admin/manage-rooms')}>Manage Rooms</button>
        <button onClick={() => navigate('/admin/manage-staff')}>Manage Staff</button>
        <button onClick={() => navigate('/admin/room-availability')}>Room Availability</button>
        <button onClick={() => navigate('/room-calendar')}>Room Calendar</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
