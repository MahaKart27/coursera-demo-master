// WelcomePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function WelcomePage() {
    const location = useLocation();
    const { username } = location.state || { username: 'User' };  // Fallback username

    return <h1>Welcome {username}!</h1>;
}

export default WelcomePage;
