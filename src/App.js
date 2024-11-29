import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage'; // Import SignInPage
import EventForm from './components/EventForm';
import MyEventsPage from './pages/MyEventsPage'; // Import MyEventsPage
import EventDetails from './components/EventDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Updated route syntax */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignInPage />} />
        <Route path="/events/add" element={<EventForm isEdit={false} />} />
        <Route path="/events/:id/edit" element={<EventForm isEdit={true} />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
