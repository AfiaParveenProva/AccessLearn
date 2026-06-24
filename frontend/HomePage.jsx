import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import ProgressImage from '../assets/progress.jpg';
import CoursesImage from '../assets/courses.jpg';
import ForumsImage from '../assets/forum.jpg';
import HeroImage from '../assets/hero.jpg';
import SupportImage from '../assets/help.jpg';
import Resources from '../assets/resources.jpg';
import './HomePage.css';

const HomePage = () => {
  const { currentUser, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [devMode, setDevMode] = useState(false); // State to track dev mode toggle
  const [showLoggedInView, setShowLoggedInView] = useState(false); // State to force show logged-in view

  const handleSignOut = async () => {
    try {
      await logout(); 
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Toggle between logged-in and logged-out views in dev mode
  const toggleDevView = () => {
    setShowLoggedInView(!showLoggedInView);
  };

  // Toggle dev mode on/off
  const toggleDevMode = () => {
    setDevMode(!devMode);
    if (!devMode) {
      setShowLoggedInView(false); // Reset view when turning off dev mode
    }
  };

  // Determine which view to show
  const shouldShowLoggedInView = devMode ? showLoggedInView : !!currentUser;

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="homepage" style={{ paddingTop: '80px' }}>
      {/* Developer Controls */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '10px',
        zIndex: 1000,
      }}>
        <button
          onClick={toggleDevMode}
          style={{
            padding: '10px',
            backgroundColor: devMode ? '#4CAF50' : '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {devMode ? 'Dev Mode ON' : 'Dev Mode OFF'}
        </button>

        {devMode && (
          <button
            onClick={toggleDevView}
            style={{
              padding: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {showLoggedInView ? 'Show Logged-Out View' : 'Show Logged-In View'}
          </button>
        )}
      </div>

      <div className="content">
        {!shouldShowLoggedInView ? (
          <>
            <div className="welcome-section">
              <div className="hero">
                <img src={HeroImage} alt="Learning Hero" className="hero-image" />
                <div className="hero-text">
                  <h1>Learning Platform</h1>
                  <p>
                    Consectetur commodo veniam minim nulla dolor id aliquip sint non. Anim pariatur amet dolor aliqua culpa voluptate ut occaecat. Amet magna tempor et dolor elit nostrud commodo anim veniam anim Lorem sint.
                  </p>
                  <button 
                    className="get-started-button" 
                    onClick={() => navigate('/register')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Get Started'}
                  </button>
                </div>
              </div>

              <div className="features-section">
                <h2>Features</h2>
                <div className="features-container">
                  <div className="feature-box fade-in">
                    <img src={ProgressImage} alt="Track Progress" className="feature-icon" />
                    <h3>Track Your Progress</h3>
                    <p>Monitor your learning journey with detailed progress reports.</p>
                  </div>
                  <div className="feature-box fade-in">
                    <img src={CoursesImage} alt="Explore Courses" className="feature-icon" />
                    <h3>Explore Courses</h3>
                    <p>Access interactive courses designed for all skill levels.</p>
                  </div>
                  <div className="feature-box fade-in">
                    <img src={ForumsImage} alt="Join Forums" className="feature-icon" />
                    <h3>Join Forums</h3>
                    <p>Engage in discussions, ask questions, and share knowledge.</p>
                  </div>

                  <button 
                    className="preview-courses-button" 
                    onClick={() => navigate('/previewCourses')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Preview Courses'}
                  </button>
                </div>
              </div>

              <div className="testimonials-section">
                <h2>What Our Learners Say</h2>
                <div className="features-container">
                  <div className="feature-box fade-in">
                    <p>"Veniam cupidatat reprehenderit irure incididunt occaecat do id quis!"</p>
                    <h4>- John D.</h4>
                  </div>
                  <div className="feature-box fade-in">
                    <p>"Lorem qui laborum ea ullamco dolore laborum cillum do dolore et dolore do!"</p>
                    <h4>- Jane D.</h4>
                  </div>
                </div>

                <div 
                  className="menu-box" 
                  onClick={() => navigate('/support')} 
                  style={{
                    width: '1000px',           
                    marginTop: '50px',        
                    marginLeft: 'auto',       
                    marginRight: 'auto',      
                    display: 'block',         
                  }}
                >
                  <div 
                    className="menu-box-background" 
                    style={{ backgroundImage: `url(${SupportImage})` }}
                  ></div>
                  <div className="menu-box-content">
                    <h3>Support</h3>
                    <p>Need help? Contact our friendly support team!</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="dashboard">
            <h2>Welcome back{currentUser?.email ? `, ${currentUser.email}` : devMode ? ', Developer' : ''}!</h2>
            
            <div className="menu-container">
              <div className="menu-box" onClick={() => navigate('/progress')}>
                <div className="menu-box-background" style={{ backgroundImage: `url(${ProgressImage})` }}></div>
                <div className="menu-box-content">
                  <h3>Progress</h3>
                  <p>Track your learning journey with detailed progress reports.</p>
                </div>
              </div>

              <div className="menu-box" onClick={() => navigate('/CourseList')}>
                <div className="menu-box-background" style={{ backgroundImage: `url(${CoursesImage})` }}></div>
                <div className="menu-box-content">
                  <h3>Courses</h3>
                  <p>Explore interactive courses designed for all skill levels.</p>
                </div>
              </div>

              <div className="menu-box" onClick={() => navigate('/books')}>
                <div className="menu-box-background" style={{ backgroundImage: `url(${Resources})` }}></div>
                <div className="menu-box-content">
                  <h3>Resources</h3>
                  <p>Books, videos, and flashcards.</p>
                </div>
              </div>

              <div className="menu-box" onClick={() => navigate('/forums')}>
                <div className="menu-box-background" style={{ backgroundImage: `url(${ForumsImage})` }}></div>
                <div className="menu-box-content">
                  <h3>Forums</h3>
                  <p>Join discussions, ask questions, and share knowledge.</p>
                </div>
              </div>

              <div className="menu-box" onClick={() => navigate('/support')}>
                <div className="menu-box-background" style={{ backgroundImage: `url(${SupportImage})` }}></div>
                <div className="menu-box-content">
                  <h3>Support</h3>
                  <p>Need help? Contact our friendly support team!</p>
                </div>
              </div>

              {!devMode && (
                <button 
                  className="submit-button" 
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing Out...' : 'Sign Out'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
