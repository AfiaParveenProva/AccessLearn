import React, { useState } from 'react';

import './PreviewCourses.css';

// Import subject images
import MathImage from '../assets/math.jpg';
import ScienceImage from '../assets/science.jpg';
import EnglishImage from '../assets/english.jpg';
import ComputerScienceImage from '../assets/computer-science.jpg';

const PreviewCourses = () => {
 
  const [activeSubject, setActiveSubject] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');

  // Subject images mapping
  const subjectImages = {
    'math': MathImage,
    'science': ScienceImage,
    'english': EnglishImage,
    'computer science': ComputerScienceImage
  };

  // Sample course data
  const courses = [
    { id: 1, subject: 'math', level: 'intro', title: 'Introduction to Math' },
    { id: 2, subject: 'math', level: 'intermediate', title: 'Intermediate Math' },
    { id: 3, subject: 'math', level: 'advanced', title: 'Advanced Math' },
    { id: 4, subject: 'science', level: 'intro', title: 'Introduction to Science' },
    { id: 5, subject: 'science', level: 'intermediate', title: 'Intermediate Science' },
    { id: 6, subject: 'science', level: 'advanced', title: 'Advanced Science' },
    { id: 7, subject: 'english', level: 'intro', title: 'Introduction to English Language' },
    { id: 8, subject: 'english', level: 'intermediate', title: 'Intermediate English Language' },
    { id: 9, subject: 'english', level: 'advanced', title: 'Advanced English Language' },
    { id: 10, subject: 'computer science', level: 'intro', title: 'Introduction to Computing' },
    { id: 11, subject: 'computer science', level: 'intermediate', title: 'Intermediate Computing' },
    { id: 12, subject: 'computer science', level: 'advanced', title: 'Advanced Computing' }
  ];

  // Filter logic
  const filteredCourses = courses.filter(course => {
    const matchesSubject = activeSubject === 'all' || course.subject === activeSubject;
    const matchesLevel = activeLevel === 'all' || course.level === activeLevel;
    return matchesSubject && matchesLevel;
  });

  return (
    <div className="preview-courses-page">
      <h1>Browse Our Courses</h1>

      {/* Subject Filters */}
      <div className="filter-buttons">
        <button className={activeSubject === 'all' ? 'active' : ''} onClick={() => setActiveSubject('all')}>All Subjects</button>
        <button className={activeSubject === 'math' ? 'active' : ''} onClick={() => setActiveSubject('math')}>Math</button>
        <button className={activeSubject === 'science' ? 'active' : ''} onClick={() => setActiveSubject('science')}>Science</button>
        <button className={activeSubject === 'english' ? 'active' : ''} onClick={() => setActiveSubject('english')}>English</button>
        <button className={activeSubject === 'computer science' ? 'active' : ''} onClick={() => setActiveSubject('computer science')}>Computer Science</button>
      </div>

      {/* Level Filters */}
      <div className="filter-buttons level-filters">
        <button className={activeLevel === 'all' ? 'active' : ''} onClick={() => setActiveLevel('all')}>All Levels</button>
        <button className={activeLevel === 'intro' ? 'active' : ''} onClick={() => setActiveLevel('intro')}>Intro</button>
        <button className={activeLevel === 'intermediate' ? 'active' : ''} onClick={() => setActiveLevel('intermediate')}>Intermediate</button>
        <button className={activeLevel === 'advanced' ? 'active' : ''} onClick={() => setActiveLevel('advanced')}>Advanced</button>
      </div>

      {/* Courses grid */}
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div 
              className="course-image"
              style={{ backgroundImage: `url(${subjectImages[course.subject]})` }}
            >
              <div className="image-overlay"></div>
            </div>
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>{course.title}</p>
              <div className="course-meta">
                <span className={`subject-tag ${course.subject.replace(' ', '-')}`}>
                  {course.subject}
                </span>
                <span className={`level-tag ${course.level}`}>
                  {course.level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewCourses;
