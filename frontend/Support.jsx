// Support.jsx
import { useState } from 'react';
import '../index.css';

const Support = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can we help you today?', sender: 'support' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    
    // Simulate support reply after 1 second
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { text: 'Thanks for your message! Our team will get back to you soon.', sender: 'support' }
      ]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <h2>Live Support</h2>
        <div className="support-status">
          <span className="status-indicator"></span>
          <span>Online</span>
        </div>
      </div>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Support;