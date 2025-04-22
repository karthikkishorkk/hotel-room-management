import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">Booking</div>

      <div className="navbar-center">
        <ul className="navbar-links">
          <li>Home</li>
          <li>Rooms</li>
          <li>Booking</li>
          <li>Occupancy</li>
          <li onClick={() => navigate('/login')}>Login</li>
        </ul>
        <button className="book-now-btn" onClick={() => navigate('/booking')}>Book Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
