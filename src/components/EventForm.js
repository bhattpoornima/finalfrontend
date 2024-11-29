import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, updateEvent, deleteEvent } from '../api'; // Assuming deleteEvent is added to api.js

const EventForm = ({ isEdit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      // Fetch event data for editing
      // You can fetch the event here and populate the fields for editing
      // Example:
      // fetchEventById(id) and set the form state accordingly
      // (Implement this if you are fetching data for the edit case)
      const fetchEventById = async (id) => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${API_URL}/api/events/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data) {
            setName(data.name);
            setDate(data.date);
            setStartTime(data.startTime);
            setEndTime(data.endTime);
            setLocation(data.location);
            setDescription(data.description);
          }
        } catch (error) {
          console.error('Error fetching event data', error);
        }
      };
      
      useEffect(() => {
        if (isEdit && id) {
          fetchEventById(id);
        }
      }, [isEdit, id]);
      
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { name, date, startTime, endTime, location, description };
    const token = localStorage.getItem('token');

    if (isEdit) {
      await updateEvent(id, eventData, token); // Update event
    } else {
      await createEvent(eventData, token); // Create event
    }

    navigate('/');
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await deleteEvent(id, token); // Call delete function
    navigate('/'); // Redirect after delete
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{isEdit ? 'Update Event' : 'Create Event'}</button>
      
      {/* Add Delete Button for Edit Mode */}
      {isEdit && (
        <button type="button" onClick={handleDelete}>
          Delete Event
        </button>
      )}
    </form>
  );
};

export default EventForm;
