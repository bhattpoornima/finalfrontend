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

export const registerForEvent = async (eventId, token) => {
  const response = await fetch(`${API_URL}/api/events/${eventId}/register`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
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
  const response = await fetch(`${API_URL}/api/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};