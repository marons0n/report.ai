import React, { useState, useEffect, useRef } from 'react';
import { createChatSession } from '../../utils';
import Header from '../Header/Header';
import './Home.css';
import SendEmail from '../SendEmail/SendEmail';
import EmailModal from '../EmailModal/EmailModal'; // Import the modal

function Home({ setIsSignedIn }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);

  // State for storing email details
  const [emailSubject, setEmailSubject] = useState(null);
  const [emailContent, setEmailContent] = useState(null);

  // Track whether to show the email modal
  const [showEmailModal, setShowEmailModal] = useState(false);

  // On mount, create a new chat session
  useEffect(() => {
    const session = createChatSession();
    setChatSession(session);
  }, []);

  // Helper to remove triple-backtick code blocks
  const removeCodeBlocks = (str) => {
    return str.replace(/```[\s\S]*?```/g, '');
  };

  // Sending message to AI
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !chatSession) return;

    // Add user's message to the list
    setMessages((prev) => [...prev, { role: 'user', content: inputText }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage(inputText);
      let response = await result.response.text();

      // Clean if wrapped with ```json
      const cleaned = response.replace(/^```json\s*|```\s*$/g, '');

      try {
        const parsed = JSON.parse(cleaned);

        // Only display text
        if (parsed.text) {
          const aiText = removeCodeBlocks(parsed.text);
          setMessages((prev) => [...prev, { role: 'assistant', content: aiText }]);
        } else {
          // fallback to raw (minus code blocks)
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: removeCodeBlocks(response) },
          ]);
        }

        // If subject & message => open email modal
        if (parsed.subject && parsed.message) {
          setEmailSubject(parsed.subject);
          setEmailContent(parsed.message);
          setShowEmailModal(true);
        }
      } catch (parseErr) {
        // If parse fails, fallback
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: removeCodeBlocks(response) },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setInputText('');
    }
  };

  // Auto-scroll to bottom on new messages
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="home-wrapper">
      {/* Header with logo and navigation */}
      <Header setIsSignedIn={setIsSignedIn} />

      {/* If no messages, show input at center */}
      {messages.length === 0 ? (
        <div className="initial-section">
          <h1 className="prompt-title">Describe what happened...</h1>
          <form className="center-form" onSubmit={handleSubmit}>
            <input
              className="center-input"
              placeholder="Type here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="center-button" type="submit" disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      ) : (
        // Chat layout after the first message
        <div className="chat-area">
          <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-bubble ${msg.role === "assistant" ? "assistant" : "user"}`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
          </div>
          


          {/* Chat input bar */}
          <form className="send-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="send-button" disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>

            {/* Gmail button (reopens email modal) */}
            {!showEmailModal && emailSubject && emailContent && (
              <button
                className="gmail-pill-btn"
                onClick={() => setShowEmailModal(true)}
              >
                <img
                  src="/gmail-icon.png"
                  alt="Review Email"
                  className="gmail-icon"
                />
                <span className="gmail-text">Review Email</span>
              </button>
            )}
          </form>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          subject={emailSubject}
          message={emailContent}
          onClose={() => setShowEmailModal(false)}
          onSend={() => {
            console.log('Email Sent!');
            setShowEmailModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Home;
