// src/pages/HomePage.js
import './homepage.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';


const HomePage = () => {
  return (
    <Router>
      <div className="homepage-container">
        {/* Big welcome text */}
        <h1 className="welcome-text">Welcome to Event Master!</h1>
        
        {/* Routes for EventList and EventDetails */}
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default HomePage;
