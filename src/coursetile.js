// coursetile.js
import React from 'react';

const CourseTile = ({ course }) => {
  return (
    <div className="course-tile">
      <h3>{course.title}</h3>
      <p>Date: {course.date}</p>
      <p>Duration: {course.duration}</p>
      <p>Category: {course.category}</p>
    </div>
  );
};

export default CourseTile;
