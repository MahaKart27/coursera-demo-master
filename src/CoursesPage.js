import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CoursesPage() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    // const username = "exampleUser";  // This should be dynamically set based on the logged-in user.
    const username = sessionStorage.getItem('username') || 'Default User';
    
    const handleLogout = () => {
        sessionStorage.clear();  // This clears all session storage, including the username
        navigate('/');      // Redirect to login or any other public page
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/courses1')
            .then(response => response.json())
            .then(data => {
                // Ideally, check enrollments here and mark courses as enrolled if applicable
                setCourses(data.map(course => ({
                    ...course,
                    isEnrolled: false // This would be based on actual enrollment data
                })));
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleSearch = event => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(searchTerm));

    const handleCardClick = course => {
        setSelectedCourse(course);
    };

    // const closeModal = () => {
    //     setSelectedCourse(null);
    // };

    const enrollCourse = (courseId) => {
        fetch('http://localhost:5000/api/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, courseId: courseId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 409) {
                alert(data.message); // "Already enrolled"
                return;
            }
            alert(data.message); // "Enrollment successful"
            setSelectedCourse(null); // Close the modal
            // Update the course as enrolled in the state to disable the button
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
            {/* Rest of your admin page content */}
            <input
                type="text"
                placeholder="Search courses"
                value={searchTerm}
                onChange={handleSearch}
                style={{ padding: '10px', margin: '20px', width: '95%' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                {filteredCourses.map(course => (
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoursesPage;
