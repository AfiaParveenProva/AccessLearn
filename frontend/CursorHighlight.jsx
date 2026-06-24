import React, { useState, useEffect } from 'react';

const CursorHighlight = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Update the cursor's position based on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      ></div>
    </>
  );
};

export default CursorHighlight;
