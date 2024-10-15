import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import { Navigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');   
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false); 

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(apiUrl +'/api/register', { name, email, password });
      debugger
      if (response.status === 201) {
        alert(response.data.message); 
        setRedirectToLogin(true);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error?.response?.data?.message ?? "there is an error");
      console.error('Error registering:', error);
    }
    finally {
      setLoading(false);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      </div>
      <div className="form-group">
         <label>Email:</label>
          <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </div>
      <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      </div>

         <button type="submit" disabled={loading} className="register-button">
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;