import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">BookingDesk</div>

      <div className="navbar-actions">
        <button className="nav-btn" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="book-now-btn" onClick={() => navigate('/available-rooms')}>
          View Available Rooms
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
