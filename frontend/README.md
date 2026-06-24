# Accessibility Feature Components

This directory contains the accessibility feature components that provide various accessibility options for users. The feature includes a floating accessibility button that opens a panel with multiple accessibility settings.

## Components

### AccessibilityButton
A floating button component that opens the accessibility settings panel. Features:
- Fixed position in bottom-right corner
- High contrast black design
- Clear settings icon
- Responsive design
- Keyboard accessible

### AccessibilityPanel
A sliding panel that contains various accessibility settings. Features:

1. Text Size Adjustment (12px - 24px)
2. Contrast Control (50% - 200%)
3. Color Vision Modes:
   - Normal
   - Protanopia (Red-Blind)
   - Deuteranopia (Green-Blind)
   - Tritanopia (Blue-Blind)
4. Display Modes:
   - Light
   - Dark
5. Reading Assistance:
   - Dyslexic Font
   - Line Spacing
   - Letter Spacing
6. Reset All Settings button

## Usage

Import and use the components in your React application:

```jsx
import React, { useState } from 'react';
import AccessibilityButton from './components/accessibility/AccessibilityButton';
import AccessibilityPanel from './components/accessibility/AccessibilityPanel';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      {/* SVG Filters for Color Vision */}
      <svg className="svg-filters" aria-hidden="true">
        <defs>
          {/* Color vision filter matrices */}
        </defs>
      </svg>

      <AccessibilityButton onClick={() => setIsPanelOpen(true)} />
      
      {isPanelOpen && (
        <AccessibilityPanel 
          onClose={() => setIsPanelOpen(false)} 
        />
      )}

      {/* Your app content */}
    </>
  );
}
```

## Styling
The components come with their own CSS files that handle all styling, including:
- Responsive design
- Dark mode support
- Hover and focus states
- Mobile-friendly layouts

## Accessibility Features
- ARIA labels for buttons and controls
- Keyboard navigation support
- High contrast options
- Screen reader friendly
- Responsive to system preferences
- Color vision deficiency support 
