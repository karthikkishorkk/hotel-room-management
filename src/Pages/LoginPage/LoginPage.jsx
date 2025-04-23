import React from 'react';
import './LoginPage.css';
import loginImage from '../../assets/login.jpeg';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-left">
        <img src={loginImage} alt="Login Visual" />
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username or Email</label>
              <input type="text" id="username" placeholder="Enter your username or email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
