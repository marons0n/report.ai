import React from 'react';
import Header from '../Header/Header';
import './About.css';
import matticon from './mattaronson.PNG';
import danicon from './dannovick.png';
import evanicon from './evansmith.jpg';
import joshicon from './joshberdon.png';

function About({ setIsSignedIn }) {
    return (
        <div className="about-container">
            <Header setIsSignedIn={setIsSignedIn} />
            <div className="about-content">
                <h1 className="hero-heading">Meet The Team</h1>

                <div className="team-container">
                    <div className="team-member">
                        <img src={matticon} alt="Team Member 1" />
                        <p><b>Matt Aronson</b><br />Backend Integration</p>
                    </div>
                    <div className="team-member">
                        <img src={danicon} alt="Team Member 2" />
                        <p><b>Dan Novick</b><br />AI Specialist</p>
                    </div>
                    <div className="team-member">
                        <img src={joshicon} alt="Team Member 3" />
                        <p><b>Josh Berdon</b><br />Database Manager</p>
                    </div>
                    <div className="team-member">
                        <img src={evanicon} alt="Team Member 4" />
                        <p><b>Evan Smith</b><br />UI/UX Specialist</p>
                    </div>
                </div>

                <div className="about-text">
                    <p>
                        Report.ai began as an ambitious project for a hackathon, conceived and developed by a team of four junior students at Lehigh University. While our initial goal was to create an innovative solution for the competition - titled 'Hack for Change', we quickly realized that our idea had the potential to address a critical issue facing universities across the nation.
                    </p>
                    <p>
                        While the initial spark for report.ai came from a competitive coding event, we quickly realized its potential to address a critical issue facing universities nationwide. Our platform aims to empower students and faculty to report hate crimes efficiently and effectively, leveraging the power of artificial intelligence to ensure that every voice is heard and every incident is addressed with the seriousness it deserves. Our goal extends beyond the hackathon—we aspire to implement this solution at Lehigh University and eventually expand its reach to campuses across the country, creating safer and more inclusive environments for all.
                    </p>
                    <p>
                        Through report.ai, we're not just showcasing our technical skills; we're demonstrating our commitment to making a tangible difference in the fight against hate and discrimination. We believe that by combining innovation with empathy, we can contribute to building a more just and equitable society, starting right here on our college campuses.
                    </p>
                    <p class="team-signature">-- The report.ai Team</p>
                </div>
                
            </div>
        </div>
    );
}

export default About;
