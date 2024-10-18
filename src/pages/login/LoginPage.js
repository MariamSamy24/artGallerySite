import React, {useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import './LoginPage.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${apiUrl}/api/login`, { email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ name: response.data.name }));
        setUser({ name: response.data.name });
        toast.success("Login successful!");
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error?.response?.data?.message ?? "there is an error");
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
             placeholder="Enter your email" required  className="form-input" />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password}  placeholder="Enter your password" required
          onChange={(e) => setPassword(e.target.value)}  className="form-input" />
      </div>

      <button type="submit" disabled={loading} className="login-button">
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="login-link">
          If you don't have an account? <a href="/register">Register here</a>
        </p>
    </form>
    </div>
  );
}

export default LoginPage;