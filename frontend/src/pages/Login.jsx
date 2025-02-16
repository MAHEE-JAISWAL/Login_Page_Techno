import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../auth.css';

function Login() {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, { usn, password });
      console.log(response.data);
      setMessage('Login successful');
      // Clear form fields
      setUsn('');
      setPassword('');
      // Handle successful login (e.g., save token, redirect)
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      setMessage('Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="usn">USN</label>
          <input
            type="text"
            id="usn"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="auth-link">
          Not registered yet? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      {message && <div className="message-popup">{message}</div>}
    </div>
  );
}

export default Login;