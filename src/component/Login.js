import React, { useState } from 'react';  
import './Login.css';  

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with', { email, password });
  };

  const toggleAccountQuestion = () => {
    setHasAccount(prevState => !prevState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>  
        <h2>{hasAccount ? 'Login' : 'Create Account'}</h2>  
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{hasAccount ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {hasAccount ? 'Don\'t have an account?' : 'Already have an account?'}
        <span
          onClick={toggleAccountQuestion}
          style={{ cursor: 'pointer', color: 'blue' }}>
          {hasAccount ? ' Create one' : ' Login here'}
        </span>
      </p>
    </div>
  );
};

export default Login;