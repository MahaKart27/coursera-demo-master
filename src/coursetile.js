import React from 'react';

const CourseTile = ({ course }) => {
  const handleApplyCourse = () => {
    // Add logic for applying course
    alert(`Course ${course.title} applied!`);
  };

  return (
    <div className="course-tile">
      <h3>{course.title}</h3>
      <p>Date: {course.date}</p>
      <p>Duration: {course.duration}</p>
      <p>Category: {course.category}</p>
      <button onClick={handleApplyCourse}>Apply</button>
    </div>
  );
};

export default CourseTile;
