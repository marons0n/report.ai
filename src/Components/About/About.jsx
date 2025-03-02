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
                    <h2>
                        Our Mission
                    </h2>
                    <p>
                        Report.ai addresses a critical issue facing universities nationwide: the underreporting and ineffective handling of hate crimes on college campuses. This innovative platform, originally conceived and developed by four junior students at Lehigh University for a 'Hack for Justice' hackathon, aims to revolutionize how hate crimes are reported and addressed in academic settings.
                    </p>

                    <h2>
                        The problem of hate crimes on college campuses is multifaceted:
                    </h2>
                    <ul>
                        <li>
                            Underreporting: A significant number of hate crimes go unreported, with studies suggesting that approximately 50% of violent and non-violent hate crimes are not reported to police
                        </li>
                        <li>
                            Limited awareness: Students and faculty often lack knowledge about what constitutes a hate crime and how to report it, further contributing to underreporting
                        </li>
                        <li>
                            Inadequate response: When hate crimes are reported, the response from institutions is sometimes insufficient or inconsistent, discouraging future reporting
                        </li>
                    </ul>

                    <h2>
                        Report.ai offers a solution to these challenges by:
                    </h2>
                    <ul>
                        <li>
                            Providing an AI-powered platform that makes reporting hate crimes more accessible and less intimidating for students and faculty.
                        </li>
                        <li>
                            Streamlining the reporting process, ensuring that all necessary information is collected efficiently and accurately.
                        </li>
                        <li>
                            Increasing awareness about hate crimes through educational components integrated into the platform.
                        </li>
                        <li>
                            Facilitating a more consistent and effective response to reported incidents by providing institutions with comprehensive, well-organized, documented data.
                        </li>
                    </ul>

                    <p>
                        By leveraging artificial intelligence and user-centered design, Report.ai aims to empower campus communities to combat hate crimes more effectively. The team's vision extends beyond Lehigh University, with plans to implement the solution across campuses nationwide, contributing to safer and more inclusive academic environments.
                    </p>
                    <p>
                        This project exemplifies how innovative technology, combined with a deep understanding of social issues, can address complex problems in higher education. We believe that by combining innovation with empathy, we can contribute to building a more just and equitable society, starting right here on our college campuses.
                    </p>
                    <p class="team-signature">-- The report.ai Team</p>
                </div>
                
            </div>
        </div>
    );
}

export default About;
