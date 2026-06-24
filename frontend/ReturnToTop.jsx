import { useState, useEffect } from 'react';
import './ReturnToTop.css'; // We'll create this next

const ReturnToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`return-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      ↑
    </div>
  );
};

export default ReturnToTop;