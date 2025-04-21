import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="footer-logo">Booking</div>
        <p>The most memorable moments start with the perfect place to unwind.</p>
      </div>

      <div className="footer-section">
        <h4>Quick Links</h4>
        <p>Rooms</p>
        <p>Booking</p>
        <p>Occupancy</p>
      </div>

      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: support@booking.com</p>
        <p>Phone: +91 80023 45678</p>
        <p>Location: 123 Beachside Avenue NYC</p>
      </div>
    </footer>
  );
};

export default Footer;
