import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [course, setCourse] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();  // This clears all session storage, including the username
        navigate('/');      // Redirect to login or any other public page
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/enrollments')
            .then(response => response.json())
            .then(data => setEnrollments(data))
            .catch(error => console.error('Error fetching enrollments:', error));
    }, []);

    const handleUserClick = (username) => {
        // Assuming fetching user details might be another endpoint if more info is needed
        const userDetails = enrollments.find(enrollment => enrollment.username === username);
        setSelectedUser(userDetails);
    };

    const handleCloseDetails = () => {
        setSelectedUser(null);
    };

    // Inline styles
    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
            backgroundColor: '#f4f4f4'
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
            cursor: 'pointer',
            color: 'blue',
            textDecoration: 'underline'
        },
        modal: {
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
        },
        modalContent: {
            backgroundColor: '#fefefe',
            margin: '15% auto',
            padding: '20px',
            border: '1px solid #888',
            width: '50%',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
        },
        closeButton: {
            color: '#aaa',
            float: 'right',
            fontSize: '28px',
            fontWeight: 'bold',
            cursor: 'pointer'
        }
    };

    async function handleApprove(name, course) {
        try {
            console.log(name,course)
            const response = await fetch("http://localhost:5000/api/approve", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    course: course
                }) // body data type must match "Content-Type" header
            });
            if (response.ok) {
                console.log("DONE ");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleApprove1(name, course) {
        try {
            console.log(name,course)
            const response = await fetch("http://localhost:5000/api/approve1", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    course: course
                }) // body data type must match "Content-Type" header
            });
            if (response.ok) {
                console.log("DONE ");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Admin - Course Enrollments</h1>
            <button onClick={handleLogout}>Logout</button>
            <div style={{ padding: '20px' }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User</th>
                            <th style={styles.th}>Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment, index) => (
                            <tr key={index}>
                                <td style={styles.td} onClick={() => handleUserClick(enrollment.username)}>
                                    {enrollment.username}
                                </td>
                                <td style={styles.td}>{enrollment.course_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <span style={styles.closeButton} onClick={handleCloseDetails}>&times;</span>
                        <h2>User Details</h2>
                        <p><strong>Name:</strong> {selectedUser.username}</p>
                        <p><strong>Enrolled Course:</strong> {selectedUser.course_name}</p>
                        <button onClick={() => { handleApprove(selectedUser.username, selectedUser.course_name) }}>Enroll</button>
                        <button onClick={() => { handleApprove1(selectedUser.username, selectedUser.course_name)}}>Reject </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
