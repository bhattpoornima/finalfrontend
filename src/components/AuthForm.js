import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();  // Updated to use useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password, name: isLogin ? undefined : name };
    const authFunction = isLogin ? loginUser : registerUser;
    const result = await authFunction(userData);
    if (result.token) {
      localStorage.setItem('token', result.token);
      navigate('/'); // Redirect after successful authentication
    } else {
      alert('Authentication failed');
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
    </form>
  );
};

export default AuthForm;

