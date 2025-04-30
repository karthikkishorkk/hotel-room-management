import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import loginImage from '../../assets/login.jpeg';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const role = localStorage.getItem("role")
    if(role==="admin"){
      navigate('/admin');
    }else if(role==="user"){
      navigate('/user/booking-details');
    }
  },[])

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
      localStorage.setItem('role', adminRes.data.role);
      // alert('Login successful as Admin!');
      navigate('/admin'); // Redirect to admin page
    } catch (adminErr) {
      console.log("Admin login failed, trying staff login...");

      try {
        // Try Staff Login
        const userRes = await axios.post('http://localhost:5000/api/user/login', {
          username,
          password
        });

        localStorage.setItem('token', userRes.data.token);
        localStorage.setItem('role', userRes.data.role);
        // alert('Login successful as Staff!');
        navigate('/user/booking-details'); // Redirect to booking details page
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
            <button className="login-button" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
