// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [backendData, setBackendData] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      // Handle response accordingly
      console.log(response.data);

      // Set the login message and user role based on the response
      setLoginMessage(response.data.message);
      setUserRole(response.data.user_type);

      // If login is successful, show the dashboard
      if (response.data.message === 'Login successful') {
        setShowDashboard(true);
      }
    } catch (error) {
      console.error('Login failed', error);
      // Set an error message if login fails
      setLoginMessage('Login failed. Please try again.');
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data');
      // Set the fetched data to display
      setBackendData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <div>
      {showDashboard ? (
        <div>
          <h2>Welcome to the Dashboard</h2>
          {isAdmin && (
            <div>
              <button onClick={handleFetchData}>Read Data</button>
            </div>
          )}
          {!isAdmin && (
            <button onClick={handleFetchData}>Read Data</button>
          )}
          <ul>
            {backendData.map((item) => (
              <li key={item.id}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {loginMessage && <p>{loginMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
