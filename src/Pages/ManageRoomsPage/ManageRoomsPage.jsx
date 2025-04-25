import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageRoomsPage.css';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/delete.svg'; // Path to delete.svg
import editIcon from '../../assets/edit.svg'; // Path to edit.svg

const ManageRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
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
    // Navigate to the Edit Room page with the room ID
    navigate(`/admin/manage-rooms/edit/${roomId}`);
  };

  const handleDelete = async (roomId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this room?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
        setRooms(rooms.filter(room => room._id !== roomId)); // Remove the deleted room from state
        alert('Room deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete room:', err);
      alert('Failed to delete room');
    }
  };

  const handleAddRoom = () => {
    navigate('/admin/manage-rooms/add'); // Navigate to the Add Room page
  };

  return (
    <div className="manage-rooms-container">
      <h2>Manage Rooms</h2>
      
      {/* Add Room Button */}
      <button className="add-room-btn" onClick={handleAddRoom}>Add Room</button>

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
          {rooms.map((room) => (
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoomsPage;
