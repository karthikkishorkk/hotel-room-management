import React, { useState } from 'react';
import axios from 'axios';
import './AvailableRoomsPage.css';

const AvailableRoomsPage = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rooms/available`, {
        params: { checkIn, checkOut },
      });
      setRooms(res.data.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  return (
    <div className="available-rooms-page">
      <h2>Search Available Rooms</h2>
      <div className="date-inputs">
        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
        <button onClick={handleSearch}>Check Availability</button>
      </div>

      <div className="room-results">
        {rooms.map(room => (
          <div key={room._id} className="room-card">
            <h3>Room {room.roomNumber} - {room.roomType}</h3>
            <p>Status: {room.status}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Amenities: {room.amenities.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomsPage;
