import './Eventdetails.css';

// src/components/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvents, registerForEvent } from '../api';

const EventDetails = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadEventDetails = async () => {
      const events = await fetchEvents(); // Fetch all events
      const selectedEvent = events.find((ev) => ev._id === eventId); // Find the event by ID
      setEvent(selectedEvent);
    };
    loadEventDetails();
  }, [eventId]);

  const handleRegister = async () => {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    if (!token) {
      setMessage('Please log in to register for the event.');
      return;
    }

    try {
      const response = await registerForEvent(eventId, token);
      if (response.success) {
        setMessage('Successfully registered for the event!');
      } else {
        setMessage(response.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred during registration.');
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EventDetails;
