import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUserPage.css';

const EditUserPage = () => {
  const { id } = useParams(); // Get the user ID from URL
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        setUser(res.data); // Set the user data into state
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/user/${id}`, user);
      alert('User updated successfully');
      navigate('/admin/manage-users'); // Redirect to the user management page
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Failed to update user');
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserPage;
