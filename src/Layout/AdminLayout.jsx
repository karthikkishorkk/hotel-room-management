
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  
  const [showManageRooms, setShowManageRooms] = useState(false); // Toggle for Manage Rooms
  const [showManageStaff, setShowManageStaff] = useState(false); // Toggle for Manage Staff
  const [showRoomAvailability, setShowRoomAvailability] = useState(false); // Toggle for Room Availability

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

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
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
        <li onClick={()=>{navigate("/admin")}} >Dashboard</li>
          <li onClick={()=>{navigate("/admin/manage-rooms")}} >Manage Rooms</li>
          <li onClick={()=>{navigate("/admin/manage-users")}}>Manage Staff</li>
          {/* <li onClick={()=>{navigate("available-rooms")}}>Room Availability</li> */}
          <li className="logout" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
