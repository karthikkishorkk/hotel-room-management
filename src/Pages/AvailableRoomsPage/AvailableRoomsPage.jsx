import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableRoomsPage.css';

const AvailableRoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms');
        const available = res.data.filter(room => room.status === 'available');
        setRooms(available);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };

    fetchAvailableRooms();
  }, []);

  return (
    <div className="available-rooms-page">
      <h2>Available Rooms</h2>
      <div className="room-list">
        {rooms.map(room => (
          <div key={room._id} className="room-card">
            <h3>Room {room.roomNumber}</h3>
            <p>Type: {room.roomType}</p>
            <p>Capacity: {room.capacity} people</p>
            <p>Amenities: {room.amenities.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomsPage;
