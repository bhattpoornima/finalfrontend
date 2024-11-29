// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const eventData = await fetchEvents();
      setEvents(eventData);
    };
    loadEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <Link to={`/event/${event._id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
