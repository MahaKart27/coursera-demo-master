import React, { useState } from 'react';
import './App.css';
import CourseTile from './coursetile';

const coursesData = [
  { id: 1, title: 'React Basics', date: '2024-04-01', duration: '2 weeks', category: 'Programming' },
  { id: 2, title: 'Python for Beginners', date: '2024-03-15', duration: '4 weeks', category: 'Programming' },
  { id: 3, title: 'Introduction to Web Design', date: '2024-03-20', duration: '3 weeks', category: 'Design' },
  { id: 4, title: 'Machine Learning Fundamentals', date: '2024-04-10', duration: '6 weeks', category: 'Data Science' },
  { id: 5, title: 'JavaScript Fundamentals', date: '2024-04-05', duration: '3 weeks', category: 'Programming' },
  { id: 6, title: 'UI/UX Design Principles', date: '2024-04-15', duration: '4 weeks', category: 'Design' },
  { id: 7, title: 'Data Visualization with Python', date: '2024-03-25', duration: '5 weeks', category: 'Data Science' },
  { id: 8, title: 'HTML5 and CSS3 Fundamentals', date: '2024-04-10', duration: '3 weeks', category: 'Web Development' },
  { id: 9, title: 'Advanced JavaScript', date: '2024-03-20', duration: '4 weeks', category: 'Programming' },
  { id: 10, title: 'UX Research Methods', date: '2024-04-05', duration: '3 weeks', category: 'Design' },
  { id: 11, title: 'Big Data Analytics', date: '2024-03-15', duration: '6 weeks', category: 'Data Science' },
  { id: 12, title: 'Introduction to Node.js', date: '2024-03-25', duration: '3 weeks', category: 'Web Development' },
  { id: 13, title: 'Machine Learning with TensorFlow', date: '2024-04-01', duration: '5 weeks', category: 'Data Science' },
  { id: 14, title: 'Responsive Web Design', date: '2024-04-15', duration: '4 weeks', category: 'Web Development' },
  { id: 15, title: 'Python Data Analysis', date: '2024-03-20', duration: '4 weeks', category: 'Data Science' },
  { id: 16, title: 'JavaScript Frameworks', date: '2024-03-10', duration: '6 weeks', category: 'Programming' },
  { id: 17, title: 'UX/UI Design for Mobile Apps', date: '2024-04-05', duration: '3 weeks', category: 'Design' },
  { id: 18, title: 'Introduction to SQL', date: '2024-03-25', duration: '4 weeks', category: 'Data Science' },
  { id: 19, title: 'Advanced CSS Techniques', date: '2024-04-10', duration: '3 weeks', category: 'Web Development' },
  { id: 20, title: 'Java Programming Basics', date: '2024-03-15', duration: '4 weeks', category: 'Programming' },
];

const App = () => {
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    sortType: '',
  });

  const applyFilters = () => {
    let sortedCourses = [...coursesData];
    if (filters.sortType === 'alphabetical') {
      sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortType === 'duration') {
      sortedCourses.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    } else if (filters.sortType === 'date') {
      sortedCourses.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    let filtered = [...sortedCourses];
    if (filters.category !== 'All Categories') {
      filtered = sortedCourses.filter(course => course.category === filters.category);
    }

    setFilteredCourses(filtered);
  };

  const handleSortChange = (event) => {
    const newSortType = event.target.value;
    setFilters(prevFilters => ({ ...prevFilters, sortType: newSortType }));
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setFilters(prevFilters => ({ ...prevFilters, category: newCategory }));
  };

  return (
    <div className="app">
      <h1>Online Education Platform</h1>
      <div className="filters">
        <select value={filters.sortType} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="duration">Duration</option>
          <option value="date">Date</option>
        </select>
        <select value={filters.category} onChange={handleCategoryChange}>
          <option value="All Categories">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
          <option value="Data Science">Data Science</option>
          <option value="Web Development">Web Development</option>
        </select>
        <button onClick={applyFilters}>Apply</button>
      </div>
      <div className="course-tile-container">
        {filteredCourses.map((course, index) => (
          <CourseTile key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default App;
