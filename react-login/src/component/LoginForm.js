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

      // Log the response for debugging
      console.log('Login response:', response.data);

      // Set the login message and user role based on the response
      setLoginMessage(response.data.message);
      setUserRole(response.data.user_type);

      // If login is successful, show the dashboard
      if (response.data.message === 'Login successful') {
        // Log the user role for debugging
        console.log('User role:', response.data.user_type);
        setShowDashboard(true);
      }
    } catch (error) {
      console.error('Login failed', error);
      // Log the error for debugging
      console.error('Error details:', error.response.data);
      // Set an error message if login fails
      setLoginMessage('Login failed. Please try again.');
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data');
      // Log the fetched data for debugging
      console.log('Fetched data:', response.data);
      // Set the fetched data to display
      setBackendData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleCreateData = async () => {
    // Implement the logic for creating data
    console.log('Create data operation');
  };

  const handleUpdateData = async () => {
    // Implement the logic for updating data
    console.log('Update data operation');
  };

  const handleDeleteData = async () => {
    // Implement the logic for deleting data
    console.log('Delete data operation');
  };

  const isAdmin = userRole === 'admin';

  console.log('isAdmin:', isAdmin);

  return (
    <div>
      {showDashboard ? (
        <div>
          <h2>Welcome to the Dashboard</h2>
          {isAdmin && (
            <div>
              <button onClick={handleFetchData}>Read Data</button>
              <button onClick={handleCreateData}>Create Data</button>
              <button onClick={handleUpdateData}>Update Data</button>
              <button onClick={handleDeleteData}>Delete Data</button>
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
