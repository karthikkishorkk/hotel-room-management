import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import loginImage from '../../assets/login.jpeg';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Try Admin Login First
      const adminRes = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password
      });

      // If successful admin login:
      localStorage.setItem('token', adminRes.data.token);
      localStorage.setItem('role', 'admin');
      alert('Login successful as Admin!');
      navigate('/admin-dashboard'); // Redirect to admin page
    } catch (adminErr) {
      console.log("Admin login failed, trying staff login...");

      try {
        // Try Staff Login
        const userRes = await axios.post('http://localhost:5000/api/user/login', {
          username,
          password
        });

        localStorage.setItem('token', userRes.data.token);
        localStorage.setItem('role', 'staff');
        alert('Login successful as Staff!');
        navigate('/booking-details'); // Redirect to booking details page
      } catch (userErr) {
        // Both failed
        console.error('Login failed');
        alert('Login unsuccessful. Please check your credentials.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={loginImage} alt="Login Visual" />
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
