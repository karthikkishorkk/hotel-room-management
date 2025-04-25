import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AvailableRoomsPage.css';

const AvailableRoomsPage = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState('');
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  // Fetch room types from backend (you could also hardcode them)
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms/types');
        setRoomTypes(res.data.data);
      } catch (err) {
        console.error('Failed to fetch room types:', err);
        // Fallback to static list
        setRoomTypes([
          'Standard', 'Classic', 'Duplex Room', 'Double Room',
          'Queens Suite', 'Presidential Suite', 'Penthouse'
        ]);
      }
    };

    fetchRoomTypes();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rooms/available`, {
        params: { checkIn, checkOut, roomType },
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
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">All Room Types</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Check Availability</button>
      </div>

      <div className="room-results">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="room-card">
              <h3>Room {room.roomNumber} - {room.roomType}</h3>
              <p>Status: {room.status}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Amenities: {room.amenities.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No rooms available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableRoomsPage;
