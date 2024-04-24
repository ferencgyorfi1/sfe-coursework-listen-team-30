import React, { useState } from 'react';
import './App.css';
import { register, login } from './utils/firebase';
import UserDetails from './UserDetails'; // New component for editing details
import BookAppointment from './BookAppointment'; // New component for booking appointments

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track logged-in user
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
      const loggedInUser = await login(email, password);
      setUser(loggedInUser); // Set logged-in user state
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      {user ? (
        <>
          <h2>Welcome, {user.email}!</h2>
          <UserDetails />
          <BookAppointment />
        </>
      ) : (
        <header className="App-header">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
          </form>
        </header>
      )}
    </div>
  );
}

export default App;
