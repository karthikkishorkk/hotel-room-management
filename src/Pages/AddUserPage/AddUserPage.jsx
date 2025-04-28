// src/Pages/AddUserPage/AddUserPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddUserPage.css';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, email, password };
      await axios.post('http://localhost:5000/api/user/signup', newUser);
      alert('User added successfully!');
      navigate('/admin/manage-users'); // Redirect to the users page after adding a new user
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user');
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add User</button>
      </form>
    </div>
  );
};

export default AddUserPage;
