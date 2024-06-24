import React, { useState } from 'react';
import axios from 'axios';
import './registerForm.scss';

const API_URL = 'https://localhost:5000/user';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await axios.post(`${API_URL}/api/register`, { username, password });
      setSuccess(true);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form className='registerForm' onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className='formField'>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='formField'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className='errorMessage'>{error}</div>}
      {success && <div className='successMessage'>Registration successful!</div>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
