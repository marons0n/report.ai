import React from 'react';
import Header from '../Header/Header';

function Info({ setIsSignedIn }) {
    return (
        <div className="chat-container">
            <Header setIsSignedIn={setIsSignedIn}/>
            <div className="content">
                <h1>Information</h1>
                <p>This is the information page content.</p>
            </div>
        </div>
    );
}

export default Info;
