import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import loginImage from '../../assets/login.jpeg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint = role === 'admin'
      ? 'http://localhost:5000/api/admin/login'
      : 'http://localhost:5000/api/user/login';

    try {
      const res = await axios.post(endpoint, { username, password });
      console.log(res.data); // You can store the token or redirect here
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
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
              <label htmlFor="role">Select Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
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
