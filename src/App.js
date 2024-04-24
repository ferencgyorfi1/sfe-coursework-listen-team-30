import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import { register, login } from './utils/firebase';
import UserDetails from './UserDetails';
import BookAppointment from './BookAppointment';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      setConfirmationMessage('Registration successful!');
      // Clear form fields after successful registration
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
      setConfirmationMessage('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
      setConfirmationMessage('Login successful!');
      // Clear form fields after successful login
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
      setConfirmationMessage('');
    }
  };

  const toggleLoginMode = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setConfirmationMessage('');
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {confirmationMessage && <p className="confirmation">{confirmationMessage}</p>}
        {user ? (
          <>
            <h2>Welcome, {user.email}!</h2>
            <UserDetails />
            <BookAppointment />
          </>
        ) : (
          <>
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
          </>
        )}
      </header>
    </div>
  );
}

export default App;
