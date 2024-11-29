import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api';  // Ensure these functions are correctly imported

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Updated to use useNavigate for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password, name: isLogin ? undefined : name }; // Include name only when registering
    const authFunction = isLogin ? loginUser : registerUser;

    try {
      const result = await authFunction(userData);
      if (result.token) {
        localStorage.setItem('token', result.token);
        alert(isLogin ? 'Login successful!' : 'Registration successful!');
        navigate('/'); // Redirect after successful authentication
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AuthForm;


