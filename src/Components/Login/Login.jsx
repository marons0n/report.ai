import React from "react";
import GmailAuth from "../GmailAuth/GmailAuth";
import "./Login.css";

const Login = ({ setIsSignedIn }) => {

  const handleLoginSuccess = (token) => {
    console.log(token);
    localStorage.setItem("accessToken", token);
    console.log(localStorage.getItem('accessToken'));
    setIsSignedIn(true);
  };

  return (
    <div className="login-container">
      {/* Top-left logo + brand */}
      <header>
        <img src="/logo.png" alt="report.ai" className="login-logo" />
        <span className="logo-text">report.ai</span>
      </header>

      {/* Centered content */}
      <div className="login-content">
        {/*
          EXACT two lines. 
          1) \"Report Hate Crimes with AI –\" 
          2) \"Quick, Safe, and Effective\"
        */}
        <h1 className="hero-heading">
          Report Hate Crimes with AI –<br />
          Quick, Safe, and Effective
        </h1>

        {/*
          Subheader with EXACT three lines, e.g:
            1) Empowering individuals...
            2) Our AI-driven...
            3) Administration...
        */}
        <p className="subheader">
          Empowering individuals to report hate crimes with ease. Our AI-driven<br />
          platform helps you draft a professional and effective email to university<br />
          administration, ensuring your voice is heard.
        </p>

        {/* Custom sign-in button */}
        <GmailAuth
          onLoginSuccess={handleLoginSuccess}
          render={(renderProps) => (
            <button
              className="login-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Get Started
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
