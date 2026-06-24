import React, { useState, useEffect } from 'react';
import './AccessibilityPanel.css';

const AccessibilityPanel = ({ onClose }) => {
  const [textSize, setTextSize] = useState(16);
  const [contrast, setContrast] = useState(100);
  const [visionMode, setVisionMode] = useState('normal');
  const [displayMode, setDisplayMode] = useState('light');
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isLineSpacing, setIsLineSpacing] = useState(false);
  const [isLetterSpacing, setIsLetterSpacing] = useState(false);

  // Apply settings immediately when they change
  useEffect(() => {
    // Apply text size
    document.documentElement.style.fontSize = `${textSize}px`;
    
    // Apply contrast (only to the main content, not the panel)
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.filter = `contrast(${contrast}%)`;
    }
    
    // Apply color vision mode
    if (visionMode === 'normal') {
      document.body.style.filter = '';
      document.body.removeAttribute('data-vision');
    } else {
      document.body.style.filter = `url(#${visionMode})`;
      document.body.setAttribute('data-vision', visionMode);
    }
    
    // Apply display mode and other features
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dyslexic-font', 'increased-line-spacing', 'increased-letter-spacing');
    
    if (displayMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1a1a1a';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.style.color = '#ffffff';
        mainContent.style.backgroundColor = '#1a1a1a';
      } else {
        document.body.style.color = '#ffffff';
      }
    } else {
      document.body.style.backgroundColor = '#ffffff';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.style.color = '#2c3e50';
        mainContent.style.backgroundColor = '#ffffff';
      } else {
        document.body.style.color = '#2c3e50';
      }
    }

    if (isDyslexicFont) {
      document.body.style.fontFamily = 'Arial, Helvetica, sans-serif';
      document.body.style.letterSpacing = '0.05em';
      document.body.style.wordSpacing = '0.1em';
      document.body.style.lineHeight = '1.5';
    } else {
      document.body.style.fontFamily = '';
      document.body.style.letterSpacing = '';
      document.body.style.wordSpacing = '';
      document.body.style.lineHeight = '';
    }

    // Apply line spacing to main content
    if (mainContent) {
      if (isLineSpacing) {
        mainContent.style.lineHeight = '2';
        // Also apply to all text elements within main
        const textElements = mainContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        textElements.forEach(element => {
          element.style.lineHeight = '2';
        });
      } else {
        mainContent.style.lineHeight = '';
        // Reset line height for all text elements
        const textElements = mainContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        textElements.forEach(element => {
          element.style.lineHeight = '';
        });
      }
    }

    // Apply letter spacing if enabled
    if (isLetterSpacing) {
      if (mainContent) {
        mainContent.style.letterSpacing = '0.15em';
        const textElements = mainContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        textElements.forEach(element => {
          element.style.letterSpacing = '0.15em';
        });
      }
    } else {
      if (mainContent) {
        mainContent.style.letterSpacing = '';
        const textElements = mainContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        textElements.forEach(element => {
          element.style.letterSpacing = '';
        });
      }
    }

  }, [textSize, contrast, visionMode, displayMode, isDyslexicFont, isLineSpacing, isLetterSpacing]);

  const resetSettings = () => {
    setTextSize(16);
    setContrast(100);
    setVisionMode('normal');
    setDisplayMode('light');
    setIsDyslexicFont(false);
    setIsLineSpacing(false);
    setIsLetterSpacing(false);
    
    // Reset all styles
    document.body.style.fontFamily = '';
    document.body.style.letterSpacing = '';
    document.body.style.wordSpacing = '';
    document.body.style.lineHeight = '';
    document.body.style.filter = '';
    document.body.style.backgroundColor = '#ffffff';
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.color = '#2c3e50';
    }
    document.documentElement.style.fontSize = '16px';
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dyslexic-font', 'increased-line-spacing', 'increased-letter-spacing');
  };

  return (
    <div className={`accessibility-panel ${displayMode === 'dark' ? 'dark-panel' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Accessibility Settings</h2>
      
      <div className="settings-container">
        <div className="settings-group">
          <label>Text Size</label>
          <input
            type="range"
            min="12"
            max="24"
            value={textSize}
            onChange={(e) => setTextSize(Number(e.target.value))}
          />
          <span>{textSize}px</span>
        </div>

        <div className="settings-group">
          <label>Contrast</label>
          <input
            type="range"
            min="50"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
          />
          <span>{contrast}%</span>
        </div>

        <div className="settings-group">
          <label>Color Vision</label>
          <div className="button-group">
            <button
              className={visionMode === 'normal' ? 'active' : ''}
              onClick={() => setVisionMode('normal')}
            >
              Normal
            </button>
            <button
              className={visionMode === 'protanopia' ? 'active' : ''}
              onClick={() => setVisionMode('protanopia')}
            >
              Protanopia
            </button>
            <button
              className={visionMode === 'deuteranopia' ? 'active' : ''}
              onClick={() => setVisionMode('deuteranopia')}
            >
              Deuteranopia
            </button>
            <button
              className={visionMode === 'tritanopia' ? 'active' : ''}
              onClick={() => setVisionMode('tritanopia')}
            >
              Tritanopia
            </button>
          </div>
        </div>

        <div className="settings-group">
          <label>Display Mode</label>
          <div className="button-group">
            <button
              className={displayMode === 'light' ? 'active' : ''}
              onClick={() => setDisplayMode('light')}
            >
              Light
            </button>
            <button
              className={displayMode === 'dark' ? 'active' : ''}
              onClick={() => setDisplayMode('dark')}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="settings-group">
          <label>Reading Assistance</label>
          <div className="button-group">
            <button
              className={isDyslexicFont ? 'active' : ''}
              onClick={() => setIsDyslexicFont(!isDyslexicFont)}
            >
              Dyslexic Font
            </button>
            <button
              className={isLineSpacing ? 'active' : ''}
              onClick={() => setIsLineSpacing(!isLineSpacing)}
            >
              Line Spacing
            </button>
            <button
              className={isLetterSpacing ? 'active' : ''}
              onClick={() => setIsLetterSpacing(!isLetterSpacing)}
            >
              Letter Spacing
            </button>
          </div>
        </div>
      </div>

      <button className="reset-button" onClick={resetSettings}>
        Reset All Settings
      </button>
    </div>
  );
};

export default AccessibilityPanel; 
