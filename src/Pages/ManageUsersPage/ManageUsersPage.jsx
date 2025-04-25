import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsersPage.css';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/delete.svg'; // Path to delete.svg
import editIcon from '../../assets/edit.svg'; // Path to edit.svg

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Navigate to the Edit User page with the user ID
    navigate(`/admin/manage-users/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from state
        alert('User deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    }
  };

  const handleAddUser = () => {
    navigate('/admin/manage-users/add'); // Navigate to the Add User page
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      
      {/* Add User Button */}
      <button className="add-user-btn" onClick={handleAddUser}>Add User</button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <img
                  src={editIcon}
                  alt="Edit"
                  className="action-icon"
                  onClick={() => handleEdit(user._id)}
                />
                <img
                  src={deleteIcon}
                  alt="Delete"
                  className="action-icon"
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersPage;
