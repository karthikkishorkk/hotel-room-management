import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import BookingPage from './Pages/BookingPage/BookingPage';
import BookingDetailsPage from './Pages/BookingDetailsPage/BookingDetailsPage';
import AvailableRoomsPage from './Pages/AvailableRoomsPage/AvailableRoomsPage';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-details" element={<BookingDetailsPage />} />
        <Route path="/rooms" element={<AvailableRoomsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
