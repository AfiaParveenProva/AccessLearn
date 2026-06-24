import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Import images
import ProgressImage from '../assets/progress.jpg';
import CoursesImage from '../assets/courses.jpg';
import ForumsImage from '../assets/forum.jpg';
import HelpImage from '../assets/help.jpg';

const VerticalMenu = () => {
  return (
    <div className="vertical-menu">
      {/* Progress Box */}
      <Link to="/progress" className="menu-box-link">
        <div className="menu-box">
          <div
            className="menu-box-background"
            style={{ backgroundImage: `url(${ProgressImage})` }}
          ></div>
          <div className="menu-box-content">
            <h3>Progress</h3>
            <p>Track your learning journey with detailed progress reports.</p>
          </div>
        </div>
      </Link>

      {/* Courses Box */}
      <Link to="/courses" className="menu-box-link">
        <div className="menu-box">
          <div
            className="menu-box-background"
            style={{ backgroundImage: `url(${CoursesImage})` }}
          ></div>
          <div className="menu-box-content">
            <h3>Courses</h3>
            <p>Explore interactive courses designed for all skill levels.</p>
          </div>
        </div>
      </Link>

      {/* Forums Box */}
      <Link to="/forums" className="menu-box-link">
        <div className="menu-box">
          <div
            className="menu-box-background"
            style={{ backgroundImage: `url(${ForumsImage})` }}
          ></div>
          <div className="menu-box-content">
            <h3>Forums</h3>
            <p>Join discussions, ask questions, and collaborate with peers.</p>
          </div>
        </div>
      </Link>

      {/* Support */}
      <Link to="/support" className="menu-box-link">
        <div className="menu-box">
          <div
            className="menu-box-background"
            style={{ backgroundImage: `url(${HelpImage})` }}
          ></div>
          <div className="menu-box-content">
            <h3>Support</h3>
            <p>Need help? Contact our helpful support team!</p>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default VerticalMenu;
