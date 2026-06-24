import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Courses = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [surveyVisible, setSurveyVisible] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const lastSavedProgressRef = useRef(0);

  // Define the courses along with downloadable PDFs or worksheets
  const courses = {
    1: {
      title: "React Basics",
      videoUrl: "https://www.youtube.com/embed/DLX62G4lc44",
      downloads: [
        { name: "React Basics PDF", url: "#" },
        { name: "React Worksheet", url: "#" },
      ],
      practiceLinks: [
        { name: "React Practice on W3Schools", url: "https://www.w3schools.com/react/" },
        { name: "React CodePen Examples", url: "https://codepen.io/topic/react" },
        { name: "Frontend Mentor: Real-Life Coding Challenges", url: "https://www.frontendmentor.io/" }
      ],
    },
    2: {
      title: "JavaScript Fundamentals",
      videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
      downloads: [
        { name: "JS Fundamentals PDF", url: "#" },
        { name: "JavaScript Worksheet", url: "#" },
      ],
      practiceLinks: [
        { name: "Practice JavaScript on W3Schools", url: "https://www.w3schools.com/js/" },
        { name: "JavaScript Code Playground", url: "https://jsfiddle.net/" },
        { name: "Frontend Practice: Recreate Real Websites", url: "https://www.frontendpractice.com/" }
      ],
    },
    3: {
      title: "HTML & CSS",
      videoUrl: "https://www.youtube.com/embed/mU6anWqZJcc",
      downloads: [
        { name: "HTML & CSS PDF", url: "#" },
        { name: "HTML & CSS Worksheet", url: "#" },
      ],
      practiceLinks: [
        { name: "Practice HTML & CSS on W3Schools", url: "https://www.w3schools.com/html/" },
        { name: "HTML & CSS Code Playground", url: "https://codepen.io/" },
        { name: "Interactive HTML & CSS Tutorials on Codecademy", url: "https://www.codecademy.com/learn/paths/build-websites-with-html-css" }
      ],
    },
  };

  const course = courses[courseId];

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = JSON.parse(localStorage.getItem("videoProgress")) || {};
    setVideoProgress(savedProgress[courseId] || 0);
    lastSavedProgressRef.current = savedProgress[courseId] || 0;
  }, [courseId]);

  useEffect(() => {
    // YouTube API setup
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    const initializeYouTubePlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: onPlayerStateChange,
            
          },
        });
      } else {
        setTimeout(initializeYouTubePlayer, 500);
      }
    };

    
    
    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
        trackProgress();
      } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    const trackProgress = () => {
      if (intervalRef.current) return;
      
      intervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          try {
            const currentTime = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration();
            const progress = (currentTime / duration) * 100;
            const roundedProgress = Math.round(progress * 100) / 100;
            
            setVideoProgress(roundedProgress);
            saveProgress(roundedProgress);
          } catch (error) {
            console.error("Error tracking video progress:", error);
          }
        }
      }, 3000);
    };

    if (window.YT && window.YT.Player) {
      initializeYouTubePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [courseId]);

  useEffect(() => {
    if (videoProgress >= 98) {
      setSurveyVisible(true);
    } else {
      setSurveyVisible(false);
    }
  }, [videoProgress]);

  const saveProgress = (progress) => {
    const savedProgress = JSON.parse(localStorage.getItem("videoProgress")) || {};
    savedProgress[courseId] = progress;
    localStorage.setItem("videoProgress", JSON.stringify(savedProgress));
  };

  const getMotivationalMessage = (progress) => {
    if (progress < 20) {
      return "🚀 You're just getting started! Keep going! 💪";
    } else if (progress < 50) {
      return "🎯 Great progress! You're halfway there! 🙌";
    } else if (progress < 80) {
      return "🔥 You're almost there! Keep pushing! 🏁";
    } else if (progress === 100) {
      return "🎉 Awesome! You've completed the video. Time to take the quiz! 🧠";
    } else {
      return "💡 Keep it up! You're learning more with every second! ✨";
    }
  };

  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div>
      <header className="top-nav">
        <div className="logo"><h1>Education</h1></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/CourseList">Courses</Link>
          <Link to="/progress">My Progress</Link>
          <Link to="/faq">Help</Link>
        </div>
        <div className="user-menu">
          <Link to="/account" className="account-link">
            <FaUserCircle />
            <span>My Account</span>
          </Link>
        </div>
      </header>

      <div className="course-page" style={{ marginTop: "60px" }}>
        <h1>{course.title}</h1>
        
        <div className="video-container">
          <iframe
            ref={iframeRef}
            width="800"
            height="450"
            src={`${course.videoUrl}?enablejsapi=1`}
            title={course.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="course-resources">
          <div className="downloadable-resources">
            <h3>Downloadable Resources</h3>
            <ul>
              {course.downloads.map((file, index) => (
                <li key={index}>
                  <a href={file.url} onClick={(e) => {
                    e.preventDefault();
                    alert("This is a demo. In a real app, this would download the file.");
                  }}>{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="practice-resources">
            <h3>Practice Resources</h3>
            <ul>
              {course.practiceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="course-actions">
          <button onClick={() => navigate("/CourseList")}>Go Back to Courses</button>
          <button onClick={() => navigate(`/QuizList/${courseId}`)}>
            Start Quiz
          </button>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div style={{ width: `${videoProgress}%` }}></div>
          </div>
          <p>{videoProgress.toFixed(2)}% watched</p>
          <div className="motivational-message">
            {getMotivationalMessage(videoProgress)}
          </div>
          
          {surveyVisible && (
            <button
              className="survey-button"
              onClick={() => navigate(`/survey/${courseId}`)}
            >
              Take Survey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;