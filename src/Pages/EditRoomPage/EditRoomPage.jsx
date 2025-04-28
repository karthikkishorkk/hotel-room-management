import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditRoomPage.css';

const roomTypes = [
  'Standard', 'Classic', 'Duplex Room', 'Double Room', 'Queens Suite', 'Presidential Suite', 'Penthouse'
];

const EditRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    status: '',
    capacity: '',
    amenities: '',
    maintenanceStartDate: '',
    maintenanceEndDate: ''
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        const { roomNumber, roomType, status, capacity, amenities, maintenanceStartDate, maintenanceEndDate } = res.data;
        setFormData({
          roomNumber,
          roomType,
          status,
          capacity,
          amenities: amenities.join(', '),
          maintenanceStartDate: maintenanceStartDate || '',
          maintenanceEndDate: maintenanceEndDate || ''
        });
      } catch (err) {
        console.error('Error fetching room', err);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the updated room data
    const updatedRoom = {
      ...formData,
      amenities: formData.amenities.split(',').map(a => a.trim())
    };

    // If the room status is 'under_maintenance', ensure the maintenance dates are included
    if (updatedRoom.status === 'under_maintenance') {
      updatedRoom.maintenanceStartDate = formData.maintenanceStartDate;
      updatedRoom.maintenanceEndDate = formData.maintenanceEndDate;
    }

    try {
      await axios.put(`http://localhost:5000/api/rooms/${id}`, updatedRoom);
      navigate('/admin/manage-rooms');
    } catch (err) {
      console.error('Error updating room', err);
    }
  };

  return (
    <div className="edit-room-container">
      <h2>Edit Room</h2>
      <form className="edit-room-form" onSubmit={handleSubmit}>
        <label>Room Number</label>
        <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />

        <label>Room Type</label>
        <select name="roomType" value={formData.roomType} onChange={handleChange} required>
          <option value="">Select</option>
          {roomTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="under_maintenance">Under Maintenance</option>
        </select>

        <label>Capacity</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />

        <label>Amenities (comma separated)</label>
        <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} />

        {/* Show maintenance date fields only if status is under maintenance */}
        {formData.status === 'under_maintenance' && (
          <>
            <label>Maintenance Start Date</label>
            <input
              type="date"
              name="maintenanceStartDate"
              value={formData.maintenanceStartDate}
              onChange={handleChange}
              required
            />

            <label>Maintenance End Date</label>
            <input
              type="date"
              name="maintenanceEndDate"
              value={formData.maintenanceEndDate}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">Update Room</button>
      </form>
    </div>
  );
};

export default EditRoomPage;
