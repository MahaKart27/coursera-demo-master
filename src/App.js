// App.js
import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import axios from 'axios';

const Login = ({ onLogin, onSignupClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    onLogin(username, password);
  };

  return (
    <div className="container"> {/* Apply container styling */}
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%" }} // Make username box wider
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%" }} // Make password box wider
      />
      <button className="blue-button" onClick={handleLogin}>Login</button> {/* Apply blue button styling */}
      <p>Don't have an account? <button className="link-button" onClick={onSignupClick}>Sign up now</button></p>
    </div>
  );
};

const Signup = ({ onSignup, onLoginClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Perform signup logic here
    onSignup(username, password);
  };

  return (
    <div className="container"> {/* Apply container styling */}
      <h2>Sign up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%" }} // Make username box wider
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%" }} // Make password box wider
      />
      <button className="blue-button" onClick={handleSignup}>Sign up</button> {/* Apply blue button styling */}
      <p>Already have an account? <button className="link-button" onClick={onLoginClick}>Login</button></p>
    </div>
  );
};

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (username, password) => {
    // Implement login logic
    axios.post('http://localhost:5000/login', { username, password })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSignup = (username, password) => {
    // Implement signup logic
    axios.post('http://localhost:5000/signup', { username, password })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
    setShowSignup(false);
  };

  const handleLoginClick = () => {
    setShowSignup(false);
  };

  return (
    <div className="page-container"> {/* Apply page container styling */}
      <h1>ONLINE EDUCATION PLATFORM</h1> {/* Add the heading */}
      {!showSignup ? (
        <Login onLogin={handleLogin} onSignupClick={handleSignupClick} />
      ) : (
        <Signup onSignup={handleSignup} onLoginClick={handleLoginClick} />
      )}
    </div>
  );
};

export default App;
