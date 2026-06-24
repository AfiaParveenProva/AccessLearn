import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaHome, 
  FaChartBar, 
  FaChartLine, 
  FaBook, 
  FaQuestionCircle, 
  FaEnvelope, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaUserCircle
} from "react-icons/fa";
import "./CourseList.css";


const CourseList = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Define the courses with basic information
  const courses = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn the fundamentals of React, including components, state, and props.",
      image: "https://via.placeholder.com/300x200?text=React+Basics"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      description: "Master the basics of JavaScript, including variables, functions, and loops.",
      image: "https://via.placeholder.com/300x200?text=JavaScript"
    },
    {
      id: 3,
      title: "HTML & CSS",
      description: "Understand the building blocks of web development with HTML and CSS.",
      image: "https://via.placeholder.com/300x200?text=HTML+CSS"
    },
  ];

  return (
    <div className="course-list-page">
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="logo">
          <h1>Education</h1>
        </div>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/CourseList">Courses</Link>
          <Link to="/progress">My Progress</Link>
          <Link to="/support">Help</Link>
        </div>
        
        <div className="user-menu">
          <Link to="/account" className="account-link">
            <FaUserCircle />
            <span>My Account</span>
          </Link>
        </div>
      </header>
      
      <main className="course-list-container">
        <h1 className="course-list-title">Available Courses</h1>
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image-container">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="course-image"
                />
              </div>
              <div className="course-content">
                <h2 className="course-title">{course.title}</h2>
                <p className="course-description">{course.description}</p>
                <button
                  className="view-course-button"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer currentYear={currentYear} />
    </div>
  );
};

// Extracted Footer component for better organization
const Footer = ({ currentYear }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Education Platform</h4>
          <p className="footer-description">
            Enhance your digital literacy skills with our comprehensive learning platform and interactive quizzes.
          </p>
        </div>
      
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/progresstracker"><FaChartBar /> Progress Tracker</Link></li>
            <li><Link to="/progress"><FaChartLine /> Progress</Link></li>
            <li><Link to="/CourseList"><FaBook /> Courses</Link></li>
          </ul>
        </div>
      
        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><Link to="/faq"><FaQuestionCircle /> FAQ</Link></li>
            <li><Link to="/contact"><FaEnvelope /> Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    
      <div className="footer-bottom">
        <p>&copy; {currentYear} Education Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default CourseList;