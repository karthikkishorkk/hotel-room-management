import React, { useState } from 'react';
import './AddRoomPage.css';

const AddRoomPage = () => {
  const [roomData, setRoomData] = useState({
    roomNumber: '',
    roomType: '',
    status: 'available',
    capacity: 1,
    amenities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...roomData,
      amenities: roomData.amenities.split(',').map(a => a.trim()),
    };

    try {
      const res = await fetch('http://localhost:5000/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Room created successfully!');
        setRoomData({
          roomNumber: '',
          roomType: '',
          status: 'available',
          capacity: 1,
          amenities: '',
        });
      } else {
        alert(data.message || 'Error creating room');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="add-room-page">
      <h2>Add New Room</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Room Number
          <input
            type="text"
            name="roomNumber"
            value={roomData.roomNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Room Type
          <select
            name="roomType"
            value={roomData.roomType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Room Type --</option>
            <option value="Standard">Standard</option>
            <option value="Classic">Classic</option>
            <option value="Duplex Room">Duplex Room</option>
            <option value="Double Room">Double Room</option>
            <option value="Queens Suite">Queens Suite</option>
            <option value="Presidential Suite">Presidential Suite</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </label>

        <label>
          Status
          <select
            name="status"
            value={roomData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="under_maintenance">Under Maintenance</option>
          </select>
        </label>

        <label>
          Capacity
          <input
            type="number"
            name="capacity"
            value={roomData.capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Amenities (comma-separated)
          <input
            type="text"
            name="amenities"
            value={roomData.amenities}
            onChange={handleChange}
            placeholder="WiFi, AC, TV"
          />
        </label>

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomPage;
