// src/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const fetchEvents = async () => {
  const response = await fetch(`${API_URL}/api/events`);
  return response.json();
};

export const fetchUserEvents = async (token) => {
  const response = await fetch(`${API_URL}/api/events/my-events`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

export const createEvent = async (eventData, token) => {
  const response = await fetch(`${API_URL}/api/events/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
};

export const registerForEvent = async (eventId, token, userId) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Send the body as JSON
      },
      body: JSON.stringify({ userId }), // Send userId in the body if needed
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Registration failed:', error.message);
    return { error: error.message };
  }
};


export const updateEvent = async (eventId, eventData, token) => {
  const response = await fetch(`${API_URL}/api/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  return response.json();
};

export const deleteEvent = async (eventId, token) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, but good to specify
      },
    });

    if (!response.ok) {
      // Handle non-2xx status codes
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json(); // Return the response if successful
  } catch (error) {
    // Catch any errors and log them
    console.error('Deletion failed:', error.message);
    return { error: error.message }; // Return error message for the UI
  }
};

