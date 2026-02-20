/**
 * @file App.js
 * @description Root component of the application.
 */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { getUsers, addUser } from './services/api';
import Toast from './components/Toast';
import './styles/App.css';

/**
 * Module for React Components.
 * @module Components
 */

/**
 * Main Application Component.
 * Acts as the root component and state manager for the application.
 * It handles the routing configuration and manages the shared state (list of users)
 * across different pages.
 *
 * @component
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  // Shared state: List of registered users
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load initial data from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("Error loading initial data", err);
        let errorMessage = "Failed to load users from API";
        if (err.response && err.response.status === 500) {
          errorMessage = "Server is down. Please try again later.";
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  /**
   * Handler to add a new user to the state and API.
   * This function is passed down to the RegistrationForm component.
   *
   * @param {Object} newUser - The user object created by the registration form.
   */
  const handleAddUser = async (newUser) => {
    const userWithTimestamp = { ...newUser, timestamp: new Date().toISOString() };

    try {
      const savedUser = await addUser(userWithTimestamp);
      setUsers([...users, { ...userWithTimestamp, ...savedUser }]);
      setError(null);
    } catch (err) {
      console.error("Error adding user", err);

      let errorMessage = "Failed to save user to API";
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Email already exists"; // Error e-mail already exist
        } else if (err.response.status === 500) {
          errorMessage = "Server is down. Please try again later."; // server is down
        }
      }
      // Throwing an error here will be caught by the RegistrationForm's try-catch and displayed as a Toast message.
      throw new Error(errorMessage);
    }
  };

  return (
    <div className="App">
      {/* Boutons de test pour les Toasts */}
      {/* <div style={{ position: 'fixed', top: 10, left: 10, zIndex: 10000, display: 'flex', gap: '5px' }}>
        <button onClick={() => setLoading(!loading)}>Toggle Loading</button>
        <button onClick={() => setError("Erreur critique du système !")}>Trigger Error</button>
        <button onClick={() => setError(null)}>Clear Error</button>
      </div> */}

      <div className="toast-container">
        <Toast
          message={error}
          type="error"
          onClose={() => setError(null)}
          data-testid="global-error-toast"
        />
        <Toast
          message={loading ? "Synchronizing with Matrix..." : null}
          type="loading"
          data-testid="app-loading-toast"
        />
      </div>

      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route path="/registration" element={<RegistrationForm onUserAdd={handleAddUser} existingUsers={users} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;