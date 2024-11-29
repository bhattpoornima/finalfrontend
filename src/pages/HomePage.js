// src/pages/HomePage.js
import React from 'react';
import EventList from '../components/EventList';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Event Management App</h1>
      <EventList />
    </div>
  );
};

export default HomePage;
