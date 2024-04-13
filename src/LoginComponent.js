import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Inline style objects
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
        },
        form: {
            padding: '20px',
            background: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            maxWidth: '400px',
            width: '100%',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ddd',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#5cb85c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        buttonHover: { // Note: Inline styles can't include pseudo-classes like :hover
            backgroundColor: '#4cae4c',
        },
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:5000/verify_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (data.success) {
            // Redirect based on role
            sessionStorage.setItem('username', username);
            navigate(from); // Redirects the user to the route they tried to access before
            if (data.role === 'admin') {
                navigate('/admin', { state: { username } });
            } else if (data.role === 'student') {
                navigate('/courses', { state: { username } });
            }
        } else {
            navigate('/error');
        }
    };
    

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
}

export default LoginComponent;
