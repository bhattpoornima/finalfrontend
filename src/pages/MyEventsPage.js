import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyEventsPage = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's events from the backend
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMyEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching your events.');
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) return <div>Loading your events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Registered Events</h2>
      {myEvents.length === 0 ? (
        <p>You are not registered for any events yet.</p>
      ) : (
        <ul>
          {myEvents.map(event => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p> {/* Format the date */}
              <p>{event.location}</p>
              <button onClick={() => navigate(`/events/${event._id}`)}>View Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEventsPage;

