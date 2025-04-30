import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRoomPage.css';

const AddRoomPage = () => {
  const navigate = useNavigate(); // Step 2

  const [roomData, setRoomData] = useState({
    roomNumber: '',
    roomType: '',
    status: 'available',
    capacity: 1,
    amenities: [],  // Store selected amenities as an array
  });

  // Predefined amenities options
  const amenitiesOptions = [
    'WiFi', 'AC', 'TV', 'Minibar', 'Balcony', 'Pool', 'Gym', 'Parking', 'Breakfast'
  ];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    // Update amenities array when a checkbox is toggled
    if (name === 'amenities') {
      if (checked) {
        setRoomData({
          ...roomData,
          amenities: [...roomData.amenities, value], // Add selected amenity
        });
      } else {
        setRoomData({
          ...roomData,
          amenities: roomData.amenities.filter((amenity) => amenity !== value), // Remove unselected amenity
        });
      }
    } else {
      setRoomData({ ...roomData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...roomData,
    };

    try {
      const res = await fetch('http://localhost:5000/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Room Created Successfully!');
        setRoomData({
          roomNumber: '',
          roomType: '',
          status: 'available',
          capacity: 1,
          amenities: [],  // Reset after submission
        });

        navigate('/admin/manage-rooms'); // Step 3: Redirect
      } else {
        if (data.message) {
          alert(data.message);
        } else {
          alert('Error creating room');
        }
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

        <label>Amenities</label>
        <div className="amenities-checkboxes">
          {amenitiesOptions.map((amenity, index) => (
            <label key={index} className="amenity-option">
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                checked={roomData.amenities.includes(amenity)} // Check if amenity is selected
                onChange={handleChange}
              />
              {amenity}
            </label>
          ))}
        </div>

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomPage;
