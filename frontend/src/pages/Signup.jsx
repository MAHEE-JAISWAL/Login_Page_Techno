import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../auth.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    email: '',
    section: '',
    department: '',
    mobile: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert mobile to a number
      const formDataWithNumber = {
        ...formData,
        mobile: Number(formData.mobile.replace(/[^0-9]/g, '')), // Remove non-numeric characters
      };

      const response = await axios.post(`${config.apiBaseUrl}/signup`, formDataWithNumber);
      console.log(response.data);
      setMessage('Signup successful');
      // Clear form fields
      setFormData({
        name: '',
        usn: '',
        email: '',
        section: '',
        department: '',
        mobile: '',
        password: '',
      });
      // Handle successful signup (e.g., redirect to login)
    } catch (error) {
      console.error('Error signing up:', error.response.data);
      setMessage('Error signing up');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === 'password' ? 'password' : 'text'}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Signup</button>
        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
      {message && <div className="message-popup">{message}</div>}
    </div>
  );
}

export default Signup;