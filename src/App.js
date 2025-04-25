import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import BookingPage from './Pages/BookingPage/BookingPage';
import BookingDetailsPage from './Pages/BookingDetailsPage/BookingDetailsPage';
import AvailableRoomsPage from './Pages/AvailableRoomsPage/AvailableRoomsPage';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import RoomCalendarPage from './Pages/RoomCalendarPage/RoomCalendarPage';
import ManageRoomsPage from './Pages/ManageRoomsPage/ManageRoomsPage';
import AddRoomPage from './Pages/AddRoomPage/AddRoomPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-details" element={<BookingDetailsPage />} />
        <Route path="/available-rooms" element={<AvailableRoomsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/room-calendar" element={<RoomCalendarPage />} />
        <Route path="/admin/manage-rooms" element={<ManageRoomsPage />} />
        <Route path="/admin/manage-rooms/add" element={<AddRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
