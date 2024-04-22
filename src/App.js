import React, { useState } from 'react';
import './App.css';
import { register, login } from './utils/firebase';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      // Registration successful, handle accordingly (e.g., redirect user)
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Login successful, handle accordingly (e.g., redirect user)
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleLoginMode = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </label>
          <br />
          {error && <p className="error">{error}</p>}
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p>
          {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
          <button onClick={toggleLoginMode}>
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
