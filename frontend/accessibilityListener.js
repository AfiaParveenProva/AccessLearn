export const setupAccessibilityListener = () => {
    // Load settings when page loads
    const applySavedSettings = () => {
      const savedSettings = localStorage.getItem('accessibilitySettings');
      if (savedSettings) {
        const {
          textSize,
          contrast,
          visionMode,
          displayMode,
          isDyslexicFont,
          isLineSpacing,
          isLetterSpacing
        } = JSON.parse(savedSettings);
  
        // Apply text size
        document.documentElement.style.fontSize = `${textSize || 16}px`;
        
        // Apply contrast
        document.body.style.filter = `contrast(${contrast || 100}%)`;
        
        // Apply color vision mode
        if (visionMode === 'normal') {
          document.body.style.filter = `contrast(${contrast || 100}%)`;
        } else if (visionMode) {
          document.body.style.filter = `contrast(${contrast || 100}%) url(#${visionMode})`;
        }
        
        // Apply display mode
        if (displayMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
  
        // Apply dyslexic font
        if (isDyslexicFont) {
          document.body.classList.add('dyslexic-font');
        } else {
          document.body.classList.remove('dyslexic-font');
        }
  
        // Apply spacing
        if (isLineSpacing) {
          document.body.classList.add('increased-line-spacing');
        } else {
          document.body.classList.remove('increased-line-spacing');
        }
  
        if (isLetterSpacing) {
          document.body.classList.add('increased-letter-spacing');
        } else {
          document.body.classList.remove('increased-letter-spacing');
        }
      }
    };
  
    // Listen for dark mode changes
    document.addEventListener('darkModeChanged', (e) => {
      if (e.detail) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  
    // Apply settings when page loads
    applySavedSettings();
  };