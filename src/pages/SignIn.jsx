import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './../assets/Full Black.png';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    setLoading(true); // Show loading spinner

    console.log(email, password)

    try {
      // Send login request to the backend
      const response = await axios.post('https://yustol-global-backend.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token); // Save the token
      navigate('/home'); // Navigate to home page
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred'); // Display error
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn} className="signin-form">
        {/* Logo Section */}
        <div className="signin-logo">
          <img src={logo} alt="Yustola Global Logo" />
        </div>

        <h2>Sign In</h2>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
