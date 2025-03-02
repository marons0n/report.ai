import React from 'react';
import './EmailModal.css';
import SendEmail from '../SendEmail/SendEmail';
import { useState, useEffect } from 'react';

function EmailModal({ subject, message, setMessage, onClose, onSend }) {
  const [emailMessage, setEmailMessage] = useState(message);
  useEffect(() => {
    setMessage(emailMessage);
  }, [emailMessage, setMessage]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Email Draft</h2>
        <p><strong>Subject:</strong> {subject}</p>
        <textarea 
          className="email-body" 
          value={emailMessage} 
          onChange={(e) => setEmailMessage(e.target.value)}
          />
        <div className="modal-buttons">
          <div onClick={onSend}>
            <SendEmail 
              to={'dbn226@lehigh.edu'}
              subject={subject}
              message={message}
            />
          </div>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EmailModal;
