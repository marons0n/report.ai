import React from 'react';
import './EmailModal.css';

function EmailModal({ subject, message, onClose, onSend }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Email Draft</h2>
        <p><strong>Subject:</strong> {subject}</p>
        <textarea className="email-body" value={message} readOnly />
        <div className="modal-buttons">
          <button className="send-button" onClick={onSend}>Send Email</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EmailModal;
