import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import profileIcon from './profile.png'; // Red profile icon

function Header({ setIsSignedIn }) {

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        setIsSignedIn(false);
    };

    return (
        <div className="home-header">
            <Link to="/" className="logo-section">
                <img src="/logo.png" alt="report.ai" className="home-logo" />
                <span className="logo-text">report.ai</span>
            </Link>

            <div className="nav-menu">
                <Link to="/" className="report">Report</Link>
                <Link to="/info" className="info">Info</Link>
                <Link to="/about-us" className="about">About Us</Link>

                <button onClick={handleLogout} className="profile-button">
                    <img src={profileIcon} alt="profile" />
                </button>
            </div>
            
        </div>
    );
}

export default Header;
