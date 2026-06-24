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
import "./QuizList.css"; // You'll need to create this CSS file

const QuizList = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Define the quizzes with basic information
  const quizzes = [
    {
      id: 1,
      title: "React Quiz",
      description: "Test your knowledge of React fundamentals, components, and state management.",
      questions: 10,
      timeLimit: "30 minutes"
    },
    {
      id: 2,
      title: "JavaScript Quiz",
      description: "Challenge yourself with questions about JavaScript syntax, functions, and advanced concepts.",
      questions: 12,
      timeLimit: "35 minutes"
    },
    {
      id: 3,
      title: "HTML & CSS Quiz",
      description: "Evaluate your understanding of HTML structure, CSS styling, and responsive design.",
      questions: 8,
      timeLimit: "25 minutes"
    },
  ];

  return (
    <div>
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="logo">
          <h1>Education</h1>
        </div>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/CourseList">Courses</Link>
          <Link to="/progress">My Progress</Link>
          <Link to="/faq">Help</Link>
        </div>
        
        <div className="user-menu">
          <Link to="/account" className="account-link">
            <FaUserCircle />
            <span>My Account</span>
          </Link>
        </div>
      </header>

      <div className="quiz-list-container" style={{ marginTop: "60px" }}>
        <h1 className="quiz-list-title">Available Quizzes</h1>
        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <h2 className="quiz-title">{quiz.title}</h2>
              <p className="quiz-description">{quiz.description}</p>
              <div className="quiz-details">
                <span className="quiz-questions">{quiz.questions} Questions</span>
                <span className="quiz-time">{quiz.timeLimit}</span>
              </div>
              <button
                className="start-quiz-button"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default QuizList;