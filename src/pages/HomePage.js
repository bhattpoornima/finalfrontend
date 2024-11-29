// src/pages/HomePage.js
import './homepage.css';
import React from 'react';
import EventList from '../components/EventList';
import EventDetails from '../components/EventDetails';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Event Master</h1>
      <EventList />
      {/* Other content */}
    </div>
  );
};

export default HomePage;

