import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RoomCalendarPage.css'; // Custom styles for the calendar

const RoomCalendarPage = () => {
  const { roomId } = useParams(); // Get roomId from URL
  const [availability, setAvailability] = useState({}); // Store availability data
  const [bookings, setBookings] = useState([]); // Store booking details
  const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected date for click events
  const [bookingDetails, setBookingDetails] = useState(null); // Store booking details for modal or display

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/${roomId}/availability`, {
          params: { month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() }, // Fetch data for the current month
        });
        const { availability, bookings } = res.data;

        setAvailability(availability); // Set availability for dates
        setBookings(bookings); // Set booking details for clicked dates
      } catch (err) {
        console.error('Failed to fetch room availability:', err);
      }
    };

    fetchAvailability();
  }, [roomId, selectedDate]); // Re-fetch data when roomId or selectedDate changes

  // Handle clicking on a date
  const handleDateClick = (date) => {
    const isoDate = date.toISOString().split('T')[0]; // Convert clicked date to YYYY-MM-DD format
    if (availability[isoDate] === 'booked') {
      // Find booking details for this clicked date
      const details = bookings.filter(booking => {
        const bookingStart = new Date(booking.startDate).toISOString().split("T")[0];
        const bookingEnd = new Date(booking.endDate).toISOString().split("T")[0];
        return bookingStart === isoDate || bookingEnd === isoDate;
      });

      // Set the booking details to display
      setBookingDetails(details);
    }
  };

  // Generate the days of the month
  const generateCalendar = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); // Add empty cells before the 1st day
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
    }
    return days;
  };

  // Handle the navigation to the previous month
  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate); // Update the selectedDate to the previous month
  };

  // Handle the navigation to the next month
  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate); // Update the selectedDate to the next month
  };

  // Render each day of the month with availability status
  const renderDay = (date) => {
    const dateStr = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD'
    const status = availability[dateStr];

    let className = '';
    if (status === 'available') className = 'available'; 
    else if (status === 'booked') className = 'booked';
    else if (status === 'under_maintenance') className = 'under_maintenance';
    
    return (
      <div
        key={dateStr}
        className={`calendar-day ${className}`}
        onClick={() => handleDateClick(date)}
      >
        {date.getDate()} {/* Show the day number */}
      </div>
    );
  };

  const calendarDays = generateCalendar();

  return (
    <div className="room-calendar-container">
      <h2 className="room-calendar-title">Room Availability Calendar</h2>

      <div className="calendar-nav">
        {/* Buttons for navigating between months */}
        <button onClick={handlePrevMonth}>Previous Month</button>
        <span>
          {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>

      {/* Render the calendar */}
      <div className="calendar">
        <div className="calendar-grid">
          {calendarDays.map((date, index) => {
            if (date === null) {
              return <div key={index} className="empty-cell"></div>; // Empty cell for days before the 1st of the month
            }
            return renderDay(date);
          })}
        </div>
      </div>

      {/* Display booking details if available */}
      {bookingDetails && (
        <div className="booking-details">
          <h3>Booking Details</h3>
          {bookingDetails.map((booking, index) => (
            <div key={index}>
              <p><strong>Guest Name:</strong> {booking.guestName}</p>
              <p><strong>Booking Start:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>Booking End:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomCalendarPage;
