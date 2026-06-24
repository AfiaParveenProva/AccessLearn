import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Books.css';

const Books = () => {
  const navigate = useNavigate();

  return (
    <div className="books-container">
      <h1>Learning Resources</h1>
      
      <div className="books-buttons">
        <button 
          className="books-button"
          onClick={() => navigate('/book-selection')}
        >
          Book Selection
        </button>
        
        <button 
          className="books-button"
          onClick={() => navigate('/flashcards')}
        >
          Flashcards
        </button>
      </div>
    </div>
  );
};

export default Books;