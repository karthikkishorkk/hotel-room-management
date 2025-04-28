import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsersPage.css'; // create and style it similar to ManageRoomsPage.css
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admin/manage-users/edit/${userId}`);
  };  

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/user/${userId}`);
        setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from state
        alert('User deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    }
  };

  const handleAddUser = () => {
    navigate('/admin/manage-users/add');
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      <button className="add-user-btn" onClick={handleAddUser}>Add User</button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            {/* Password field hidden here for safety reasons */}
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
