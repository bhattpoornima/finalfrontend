import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const SignInPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      // Register the user via the API
      const response = await registerUser(userData);

      // Check if registration was successful
      if (response.success) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to login page
      } else {
        // Show any error message from the backend
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // If there's a validation error or server error, display the error message
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((error) => error.msg)
          .join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Server error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign In</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSignIn} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default SignInPage;
