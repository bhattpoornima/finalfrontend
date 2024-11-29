import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // Redirect to home
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftLinks}>
        {/* Main Links */}
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/events" style={styles.link}>Events</Link>
      </div>
      <div style={styles.rightLinks}>
        {!isLoggedIn ? (
          <>
            {/* Login and Register Links */}
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Sign In</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  leftLinks: {
    display: 'flex',
  },
  rightLinks: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: '15px',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Navbar;

