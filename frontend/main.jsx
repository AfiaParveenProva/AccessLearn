import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Your existing App.jsx

// 1. Initialize React
const root = ReactDOM.createRoot(document.getElementById('root'));

// 2. Render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);