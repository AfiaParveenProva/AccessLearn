import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BlankProfile from '../../assets/BlankProfile.webp';
import HomeIcon from '../../assets/icons/home.png';
import LoginIcon from '../../assets/icons/login.png';
import RegisterIcon from '../../assets/icons/register.png';
import LogoutIcon from '../../assets/icons/logout.png';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Left-aligned icons */}
      <div className="nav-links">
        <Link to="/" className="nav-icon">
          <img src={HomeIcon} alt="Home" />
        </Link>
        
        {!currentUser ? (
          <>
            <Link to="/login" className="nav-icon">
              <img src={LoginIcon} alt="Login" />
            </Link>
            <Link to="/register" className="nav-icon">
              <img src={RegisterIcon} alt="Register" />
            </Link>
          </>
        ) : (
          <button onClick={logout} className="nav-icon">
            <img src={LogoutIcon} alt="Logout" />
          </button>
        )}
      </div>

      {/* Profile Button */}
      {currentUser && (
        <div className="profile-section">
          <Link to="/profilePage" className="profile-button">
            <img
              src={currentUser?.photoURL || BlankProfile}
              alt={currentUser ? "Profile" : "Login"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = BlankProfile;
              }}
            />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
