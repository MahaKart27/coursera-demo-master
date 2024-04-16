import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function CoursesPage() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [approvedCourse, setApprovedCourse] = useState([]);
    const [display, setDisplay] = useState(false); // Changed default value to false

    const username = sessionStorage.getItem('username') || 'Default User';

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/courses1')
            .then(response => response.json())
            .then(data => {
                setCourses(data.map(course => ({
                    ...course,
                    isEnrolled: false
                })));
            })
            .catch(error => console.error('Error fetching courses:', error));

        fetch("http://localhost:5000/api/confirmed", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username })
        })
            .then(response => response.json())
            .then(response => {
                setApprovedCourse(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [username]);

    const handleSearch = event => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleCardClick = course => {
        setSelectedCourse(course);
    };

    const enrollCourse = (courseId) => {
        fetch('http://localhost:5000/api/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, id: courseId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 409) {
                    alert(data.message);
                    return;
                }
                alert(data.message);
                setSelectedCourse(null);
                setCourses(courses.map(course => course.id === courseId ? { ...course, isEnrolled: true } : course));
            })
            .catch(error => {
                console.error('Error enrolling in course:', error);
                alert('Failed to enroll in course');
            });
    };

    return (
        <div>
            <h1>Courses Page</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setDisplay(!display)}>{display ? "View Courses" : "View Approved Courses"}</button>

            {/* Rest of your admin page content */}
            <input
                type="text"
                placeholder="Search courses"
                value={searchTerm}
                onChange={handleSearch}
                style={{ padding: '10px', margin: '20px', width: '95%' }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                {display ? approvedCourse.map(course => (
                    <div key={course.id} onClick={() => handleCardClick(course)} style={{ width: '300px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <img src={course.image} alt={course.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                    </div>
                )) : courses.map(course => (
                    <div key={course.id} onClick={() => handleCardClick(course)} style={{ width: '300px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <img src={course.image} alt={course.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>

            {selectedCourse && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '500px', width: '100%' }}>
                        <h2>{selectedCourse.name}</h2>
                        <ul>
                            {selectedCourse.learningObjectives.map((obj, index) => (
                                <li key={index}>{obj}</li>
                            ))}
                        </ul>
                        <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                        <p><strong>Fees:</strong> {selectedCourse.fees}</p>
                        <p><strong>Schedule:</strong> {selectedCourse.schedule}</p>
                        <button onClick={() => enrollCourse(selectedCourse.id)} disabled={selectedCourse.isEnrolled}>Enroll</button>
                        <button onClick={() => setSelectedCourse(null)}>Close</button>
                        <Link onClick={() => sessionStorage.setItem('course', selectedCourse.name)} to="/payment">Pay</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoursesPage;
