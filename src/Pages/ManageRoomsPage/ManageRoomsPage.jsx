import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageRoomsPage.css';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import infoIcon from '../../assets/info.svg';

const ManageRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypeFilter, setRoomTypeFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms');
        setRooms(res.data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  const handleEdit = (roomId) => {
    navigate(`/admin/manage-rooms/edit/${roomId}`);
  };

  const handleDelete = async (roomId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this room?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
        setRooms(rooms.filter(room => room._id !== roomId));
        alert('Room deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete room:', err);
      alert('Failed to delete room');
    }
  };

  const handleAddRoom = () => {
    navigate('/admin/manage-rooms/add');
  };

  const handleViewCalendar = (roomId) => {
    navigate(`/admin/manage-rooms/${roomId}/calendar`);
  };

  const filteredRooms = roomTypeFilter === 'All'
    ? rooms
    : rooms.filter(room => room.roomType === roomTypeFilter);

  // Extract unique room types for dropdown
  const roomTypes = ['All', ...new Set(rooms.map(room => room.roomType))];

  return (
    <div className="manage-rooms-container">
      <h2>Manage Rooms</h2>

      <div className="room-controls">
        <button className="add-room-btn" onClick={handleAddRoom}>Add Room</button>
        
        <select
          className="room-type-filter"
          value={roomTypeFilter}
          onChange={(e) => setRoomTypeFilter(e.target.value)}
        >
          {roomTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <table className="room-table">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.status}</td>
              <td>
                <img
                  src={editIcon}
                  alt="Edit"
                  className="action-icon"
                  onClick={() => handleEdit(room._id)}
                />
                <img
                  src={deleteIcon}
                  alt="Delete"
                  className="action-icon"
                  onClick={() => handleDelete(room._id)}
                />
                <img
                  src={infoIcon}
                  alt="Info"
                  className="action-icon"
                  onClick={() => handleViewCalendar(room._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoomsPage;
