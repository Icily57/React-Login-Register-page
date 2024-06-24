import React, { useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../Hooks/useLocalStorage';
import './loginForm.scss';

const API_URL = 'https://localhost:5000/user';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useLocalStorage<string | null>('authToken', null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        setToken(response.data.token); // Assuming the token is in response.data.token
        alert('Login successful');
      } else {
        setError('Wrong username or password');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <div className="formField">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="formField">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="errorMessage">{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
