/**
 * @file App.js
 * @description Root component of the application.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import Home from './pages/Home';
import './styles/App.css';

/**
 * Module for React Components.
 * @module Components
 */

/**
 * Main Application Component.
 * Renders the RegistrationForm.
 *
 * @memberof module:Components
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;