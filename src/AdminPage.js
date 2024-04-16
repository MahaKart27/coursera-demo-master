import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/enrollments')
            .then(response => response.json())
            .then(data => {
                if (filterStatus === 'all') {
                    setEnrollments(data);
                } else {
                    const filteredEnrollments = data.filter(enrollment => enrollment.status === filterStatus);
                    setEnrollments(filteredEnrollments);
                }
            })
            .catch(error => console.error('Error fetching enrollments:', error));
    }, [filterStatus]);

    const handleUserClick = (username) => {
        const userDetails = enrollments.find(enrollment => enrollment.username === username);
        setSelectedUser(userDetails);
    };

    const handleCloseDetails = () => {
        setSelectedUser(null);
    };

    const handleApprove = (username, course_id) => {
        const userEmail = prompt('Enter user email:');
        if (userEmail) {
            updateEnrollmentStatus(username, course_id, 'approved', userEmail);
        }
    };

    const handleDeny = (username, course_id) => {
        const userEmail = prompt('Enter user email:');
        if (userEmail) {
            updateEnrollmentStatus(username, course_id, 'denied', userEmail);
        }
    };

    const updateEnrollmentStatus = (username, course_id, status, userEmail) => {
        fetch(`http://localhost:5000/api/enrollments/${username}/${course_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status, userEmail: userEmail }),
        })
        .then(response => response.json())
        .then(data => {
            const updatedEnrollments = enrollments.map(enrollment => {
                if (enrollment.username === username && enrollment.course_id === course_id) {
                    return { ...enrollment, status: status };
                }
                return enrollment;
            });
            setEnrollments(updatedEnrollments);
        })
        .catch(error => console.error('Error updating enrollment status:', error));
    };

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

    return (
        <div>
            <h1>Admin - Course Enrollments</h1>
            <button onClick={handleLogout}>Logout</button>
            <div style={{ padding: '20px' }}>
                <label>
                    Filter by Status:
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All</option>
                        <option value="approved">Approved</option>
                        <option value="denied">Denied</option>
                    </select>
                </label>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User</th>
                            <th style={styles.th}>Course</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment, index) => (
                            <tr key={index}>
                                <td style={styles.td} onClick={() => handleUserClick(enrollment.username)}>
                                    {enrollment.username}
                                </td>
                                <td style={styles.td}>{enrollment.course_name}</td>
                                <td style={styles.td}>{enrollment.status}</td>
                                <td>
                                    {enrollment.status !== 'approved' && (
                                        <button onClick={() => handleApprove(enrollment.username, enrollment.course_id)}>Approve</button>
                                    )}
                                    {enrollment.status !== 'denied' && (
                                        <button onClick={() => handleDeny(enrollment.username, enrollment.course_id)}>Deny</button>
                                    )}
                                </td>
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
                        <p><strong>Status:</strong> {selectedUser.status}</p>
                        <p><strong>Payment Status:</strong> {selectedUser.payment_status}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
