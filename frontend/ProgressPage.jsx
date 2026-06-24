import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { 
  FaHome, FaChartBar, FaChartLine, FaBook, FaQuestionCircle, 
  FaEnvelope, FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn,
  FaUserCircle 
} from "react-icons/fa";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, LabelList, Cell } from "recharts";
import confetti from "canvas-confetti";
import { CSVLink } from "react-csv";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ProgressPage.css";
import "./CoursesFooter.css";

// Mock data generator functions
const generateMockQuizData = () => {
  const courses = [
    { id: 1, title: "React Quiz" },
    { id: 2, title: "JavaScript Quiz" },
    { id: 3, title: "HTML & CSS Quiz" }
  ];
  
  const mockData = [];
  const now = new Date();
  
  // Generate data for the past 2 weeks
  for (let i = 0; i < 14; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    courses.forEach(course => {
      // Random number of attempts per day (0-3)
      const attempts = Math.floor(Math.random() * 4);
      
      for (let j = 0; j < attempts; j++) {
        const score = Math.floor(Math.random() * 20) + 60; // 60-80% scores
        const questions = 10;
        
        mockData.push({
          courseId: course.id,
          score: Math.round((score/100) * questions),
          totalQuestions: questions,
          percentage: score,
          startTime: new Date(date.setHours(10 + j, 30 + j*10)).toISOString(),
          endTime: new Date(date.setHours(10 + j, 45 + j*10)).toISOString()
        });
      }
    });
  }
  
  return mockData;
};

// ProgressCard component
const ProgressCard = ({ title, progress }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", margin: "10px" }}>
      <h3>{title}</h3>
      <div style={{ width: "100%", background: "#e0e0e0", borderRadius: "8px", marginTop: "10px" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "10px",
            background: "#4caf50",
            borderRadius: "8px",
          }}
        />
      </div>
      <p style={{ marginTop: "10px" }}>{progress}% completed</p>
    </div>
  );
};

// ProgressCards component
const ProgressCards = ({ modules }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {modules.map((module, index) => (
        <ProgressCard key={index} title={module.title} progress={module.progress} />
      ))}
    </div>
  );
};

// Footer Component
const Footer = ({ currentYear }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Education Platform</h4>
          <p className="footer-description">
            Enhance your digital literacy skills with our comprehensive learning platform and interactive quizzes.
          </p>
        </div>
       
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/progress"><FaChartBar /> Progress Tracker</Link></li>
            <li><Link to="/progress"><FaChartLine /> Progress</Link></li>
            <li><Link to="/CourseList"><FaBook /> Courses</Link></li>
          </ul>
        </div>
      
        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><Link to="/faq"><FaQuestionCircle /> FAQ</Link></li>
            <li><Link to="/contact"><FaEnvelope /> Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    
      <div className="footer-bottom">
        <p>&copy; {currentYear} Education Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Export Button Component
const ExportButton = ({ quizProgress }) => {
  const headers = [
    { label: "Course ID", key: "courseId" },
    { label: "Score", key: "score" },
    { label: "Total Questions", key: "totalQuestions" },
    { label: "Percentage", key: "percentage" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
  ];

  return (
    <CSVLink
      data={quizProgress}
      headers={headers}
      filename="quiz_progress.csv"
      className="export-button"
    >
      Export Progress
    </CSVLink>
  );
};

// ActivityChart Component
// Remove activeTab from props destructuring since it's not used
const ActivityChart = ({ quizProgress }) => {  // Remove activeTab
  // ... rest of component
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("daily");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Get course name helper function
  const getCourseName = (courseId) => {
    const courses = {
      "1": "React Quiz",
      "2": "JavaScript Quiz",
      "3": "HTML & CSS Quiz",
      "all": "All Courses",
    };
    return courses[courseId] || "Unknown Course";
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    
    return (
      <div className="custom-tooltip">
        <h4>{label}</h4>
        {payload.map((entry, index) => {
          const data = entry.payload;
          return (
            <div key={index} className="tooltip-content">
              {data.count > 0 ? (
                <>
                  <span className="tooltip-label" style={{ color: entry.color }}>
                    {entry.name === "value" ? "Score:" : entry.name}
                  </span>
                  <span className="tooltip-value">{entry.value.toFixed(1)}%</span>
                  {data.value === 0 && (
                    <div className="tooltip-warning">⚠️ Needs improvement</div>
                  )}
                </>
              ) : (
                <div className="tooltip-warning">⚠️ No attempts made</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Process chart data
  const processChartData = (rawData) => {
    return rawData.map((item) => ({
      ...item,
      value: item.value || 0,
    }));
  };

  // Get bar color based on value
  const getBarColor = (value) => {
    if (value === 0) return "#FF4444";
    if (value < 50) return "#FFA726";
    if (value >= 75) return "#4CAF50";
    return "#2196F3";
  };

  // Trigger celebration
  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4CAF50", "#FFA726", "#FFBB28", "#00C49F"],
    });
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3600000);
  };

  // Generate daily data
  const generateDailyData = () => {
    const selectedDateObj = new Date(selectedDate);
    const hourlyData = [];

    const filteredQuizzes = quizProgress.filter((quiz) => {
      const quizDate = new Date(quiz.startTime);
      const isSameDate = quizDate.toDateString() === selectedDateObj.toDateString();
      const isSameCourse = selectedCourse === "all" || quiz.courseId.toString() === selectedCourse;
      return isSameDate && isSameCourse;
    });

    filteredQuizzes.forEach((quiz) => {
      const quizHour = new Date(quiz.startTime).getHours();
      const quizMinute = new Date(quiz.startTime).getMinutes();
      const timeLabel = `${quizHour}:${quizMinute.toString().padStart(2, "0")}`;

      hourlyData.push({
        name: timeLabel,
        value: quiz.percentage,
        count: 1,
      });
    });

    return hourlyData;
  };

  // Generate weekly data
  const generateWeeklyData = () => {
    const selectedDateObj = new Date(selectedDate);
    const startOfWeek = new Date(selectedDateObj);
    startOfWeek.setDate(selectedDateObj.getDate() - selectedDateObj.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weeklyData = days.map((day) => ({
      name: day,
      value: 0,
      count: 0,
    }));

    const filteredQuizzes = quizProgress.filter((quiz) => {
      const quizDate = new Date(quiz.startTime);
      const isInWeek = quizDate >= startOfWeek && quizDate <= endOfWeek;
      const isSameCourse = selectedCourse === "all" || quiz.courseId.toString() === selectedCourse;
      return isInWeek && isSameCourse;
    });

    filteredQuizzes.forEach((quiz) => {
      const quizDay = new Date(quiz.startTime).getDay();
      weeklyData[quizDay].count++;
      weeklyData[quizDay].value =
        (weeklyData[quizDay].value * (weeklyData[quizDay].count - 1) + quiz.percentage) /
        weeklyData[quizDay].count;
    });

    return weeklyData;
  };

  // Generate chart data and check for target achievement
  useEffect(() => {
    const generateChartData = () => {
      if (timeFrame === "daily") {
        return generateDailyData();
      }
      return generateWeeklyData();
    };

    const data = generateChartData();
    setChartData(data);

    if (timeFrame === "weekly") {
      const targetAchieved = data.some((day) => day.value >= 75);
      if (targetAchieved) {
        triggerCelebration();
      } else {
        setShowCelebration(false);
      }
    } else {
      setShowCelebration(false);
    }
  }, [timeFrame, selectedDate, selectedCourse, quizProgress, ]);

  return (
    <div className="activity-chart-container">
      <div className="chart-header">
        <h3>{getCourseName(selectedCourse)} Progress</h3>
        <div className="chart-controls">
          <div className="control-group">
            <label>View:</label>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="select-control"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="control-group">
            <label>Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="select-control"
            >
              <option value="all">All Courses</option>
              <option value="1">React Quiz</option>
              <option value="2">JavaScript Quiz</option>
              <option value="3">HTML & CSS Quiz</option>
            </select>
          </div>

          <div className="control-group">
            <label>Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-control"
            />
          </div>
        </div>
      </div>
      {showCelebration && (
        <div className="celebration-banner">
          🎉 Congratulations! You've hit your weekly target! Keep up the great work! 🚀
        </div>
      )}
      {chartData.length === 0 ? (
        <div className="no-data-message">
          <p>📊 No data available for the selected time frame</p>
          <button className="start-quiz-btn" onClick={() => navigate("/QuizList")}>
            Start a Quiz
          </button>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={processChartData(chartData)}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            {timeFrame === "weekly" && (
              <ReferenceLine
                y={75}
                stroke="#4CAF50"
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{
                  value: "🎯 Target: 75%",
                  position: "insideTopRight",
                  fill: "#4CAF50",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              />
            )}
            <Bar
              dataKey="value"
              barSize={chartData.length === 1 ? 70 : 20}
              radius={[5, 5, 0, 0]}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              minPointSize={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

// QuizAttemptsPieChart Component
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const QuizAttemptsPieChart = ({ quizProgress, getCourseNameById }) => {
  const getPieChartData = () => {
    const groupedData = quizProgress.reduce((acc, quiz) => {
      const courseName = getCourseNameById(quiz.courseId);
      if (!acc[courseName]) {
        acc[courseName] = { name: courseName, value: 0 };
      }
      acc[courseName].value += 1;
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  const pieChartData = getPieChartData();

  return (
    <div className="pie-chart-container">
      <h3>Quiz Attempts</h3>
      <p style={{ fontSize: "14px", color: "#7f8c8d", marginTop: "-10px" }}>
        Total attempts across all quizzes
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}`}
            isAnimationActive={true}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        {pieChartData.map((entry, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "10px",
                borderRadius: "4px",
              }}
            ></div>
            <span style={{ fontSize: "16px", color: "#333" }}>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// CourseProgressComponent (simplified for frontend)
const CourseProgressComponent = ({ quizProgress }) => {
  const courses = [
    { id: 1, title: "React Quiz" },
    { id: 2, title: "JavaScript Quiz" },
    { id: 3, title: "HTML & CSS Quiz" }
  ];

  const calculateCourseProgress = () => {
    return courses.map(course => {
      const courseQuizzes = quizProgress.filter(q => q.courseId === course.id);
      const totalPercentage = courseQuizzes.reduce((sum, q) => sum + q.percentage, 0);
      const averagePercentage = courseQuizzes.length > 0 ? totalPercentage / courseQuizzes.length : 0;
      
      return {
        title: course.title,
        progress: Math.round(averagePercentage),
        confidence: "medium" // Default confidence level
      };
    });
  };

  const courseProgress = calculateCourseProgress();

  return (
    <div className="course-progress-grid">
      {courseProgress.map((course, index) => (
        <div key={index} className="course-progress-card">
          <h3>{course.title}</h3>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p>{course.progress}% completed</p>
          <div className="confidence-selector">
            <button 
              className={course.confidence === "low" ? "active" : ""}
              onClick={() => {/* Update confidence level */}}
            >
              Low
            </button>
            <button 
              className={course.confidence === "medium" ? "active" : ""}
              onClick={() => {/* Update confidence level */}}
            >
              Medium
            </button>
            <button 
              className={course.confidence === "high" ? "active" : ""}
              onClick={() => {/* Update confidence level */}}
            >
              High
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main ProgressPage Component
const ProgressPage = () => {
  const [quizProgress, setQuizProgress] = useState([]);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [activeTab, setActiveTab] = useState("results");
  const currentYear = new Date().getFullYear();
  
  const [moduleProgress, setModuleProgress] = useState([]);
  
  const quizzes = [
    { id: 1, title: "React Quiz" },
    { id: 2, title: "JavaScript Quiz" },
    { id: 3, title: "HTML & CSS Quiz" }
  ];

  // Function to get course name by courseId
  const getCourseNameById = (courseId) => {
    const quiz = quizzes.find((quiz) => quiz.id === courseId);
    return quiz ? quiz.title : "Unknown Course";
  };

  useEffect(() => {
    // Load mock data instead of API call
    const mockData = generateMockQuizData();
    setQuizProgress(mockData);
    
    // Calculate overall percentage
    if (mockData.length > 0) {
      const totalPercentage = mockData.reduce((sum, quiz) => sum + quiz.percentage, 0);
      setOverallPercentage(Math.round(totalPercentage / mockData.length));
    }
    
    // Calculate module progress
    const moduleData = quizzes.map((quiz) => {
      const moduleQuizzes = mockData.filter((q) => q.courseId === quiz.id);
      const totalPercentage = moduleQuizzes.reduce((sum, q) => sum + q.percentage, 0);
      const averagePercentage = moduleQuizzes.length > 0 ? totalPercentage / moduleQuizzes.length : 0;

      return {
        title: quiz.title,
        progress: Math.round(averagePercentage),
      };
    });

    setModuleProgress(moduleData);
  }, []);

  // Group results by course/category
  const groupedResults = quizProgress.reduce((acc, result) => {
    const { courseId, percentage } = result;
    if (!acc[courseId]) {
      acc[courseId] = { attempts: 0, totalScore: 0 };
    }
    acc[courseId].attempts += 1;
    acc[courseId].totalScore += percentage;
    return acc;
  }, {});

  // Determine insights
  let mostAttempted = null, bestSubject = null, weakestSubject = null;
  let maxAttempts = 0, highestAvg = 0, lowestAvg = 100;

  Object.entries(groupedResults).forEach(([courseId, stats]) => {
    const avgScore = stats.totalScore / stats.attempts;

    if (stats.attempts > maxAttempts) {
      mostAttempted = courseId;
      maxAttempts = stats.attempts;
    }
    if (avgScore > highestAvg) {
      bestSubject = courseId;
      highestAvg = avgScore;
    }
    if (avgScore < lowestAvg) {
      weakestSubject = courseId;
      lowestAvg = avgScore;
    }
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "results":
        return (
          <div className="quiz-results">
            <h2 style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "15px",
              textAlign: "center",
              letterSpacing: "0.5px",
            }}>
              Your Quiz Performance
            </h2>
            <p style={{
              fontSize: "18px",
              color: "#7f8c8d",
              lineHeight: "1.8",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}>
              Review the results of your completed quizzes, including scores, percentages, and timestamps. 
              Track your performance and identify areas for improvement.
            </p>
          
            {quizProgress.length === 0 ? (
              <p>No quizzes completed yet. Start a quiz to track your progress!</p>
            ) : (
              quizProgress.slice(0, 5).map((quiz, index) => (
                <div key={index} className="quiz-card">
                  <h3>Course: {getCourseNameById(quiz.courseId)}</h3>
                  <p>Score: {quiz.score} / {quiz.totalQuestions}</p>
                  <p>Percentage: {quiz.percentage}%</p>
                  <p>Start Time: {new Date(quiz.startTime).toLocaleString()}</p>
                  <p>End Time: {new Date(quiz.endTime).toLocaleString()}</p>
                </div>
              ))
            )}
            <ExportButton quizProgress={quizProgress} />
          </div>
        );
      case "statistics":
        return (
          <div className="learning-statistics">
            <h2 style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "15px",
              textAlign: "center",
              letterSpacing: "0.5px",
            }}>Your Learning Insights</h2>
            <p style={{
              fontSize: "18px",
              color: "#7f8c8d",
              lineHeight: "1.8",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}>
              Analyze your progress over time with daily and weekly insights. 
              Filter by course and date to see how you're improving and stay on track with your learning goals.
            </p>
        
            <ActivityChart quizProgress={quizProgress} activeTab={activeTab} />
            <div className="progress-summary" style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              marginTop: "20px",
              lineHeight: "1.8",
            }}>
              {mostAttempted && (
                <p style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "17px",
                  color: "#333",
                  margin: "15px 0",
                  padding: "12px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                }}>
                  <span style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    display: "inline-block",
                    width: "45px",
                    height: "45px",
                    textAlign: "center",
                    lineHeight: "45px",
                    borderRadius: "50%",
                    backgroundColor: "#e3f2fd",
                    color: "#2196f3",
                  }}>
                    📚
                  </span>
                  You've attempted: <strong style={{ marginLeft: "5px", color: "#000" }}>{getCourseNameById(Number(mostAttempted))}</strong> the most—great job!
                </p>
              )}
              {bestSubject && (
                <p style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "17px",
                  color: "#333",
                  margin: "15px 0",
                  padding: "12px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                }}>
                  <span style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    display: "inline-block",
                    width: "45px",
                    height: "45px",
                    textAlign: "center",
                    lineHeight: "45px",
                    borderRadius: "50%",
                    backgroundColor: "#fff3e0",
                    color: "#ff9800",
                  }}>
                    🏆
                  </span>
                  Your strongest area is: <strong style={{ marginLeft: "5px", color: "#000" }}>{getCourseNameById(Number(bestSubject))}</strong> (Avg Score: {highestAvg.toFixed(2)}%). Keep it up!
                </p>
              )}
              {weakestSubject && (
                <p style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "17px",
                  color: "#333",
                  margin: "15px 0",
                  padding: "12px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                }}>
                  <span style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    display: "inline-block",
                    width: "45px",
                    height: "45px",
                    textAlign: "center",
                    lineHeight: "45px",
                    borderRadius: "50%",
                    backgroundColor: "#ffebee",
                    color: "#f44336",
                  }}>
                    📉
                  </span>
                  Consider focusing more on: <strong style={{ marginLeft: "5px", color: "#000" }}>{getCourseNameById(Number(weakestSubject))}</strong> (Avg Score: {lowestAvg.toFixed(2)}%) to improve.
                </p>
              )}
            </div>
          </div>
        );
      case "overall":
        return (
          <div className="overall-progress-container">
            <h2 style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "15px",
              textAlign: "center",
              letterSpacing: "0.5px",
            }}>🌟 Keep It Up! Your Overall Progress So Far</h2>
            <p style={{
              fontSize: "18px",
              color: "#7f8c8d",
              lineHeight: "1.8",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}>
              See your overall performance across all quizzes. Track your average score and celebrate your achievements 
              as you work toward your learning goals.
            </p>
            <div className="circular-progress-wrapper">
              <CircularProgressbar
                value={overallPercentage}
                text={`${overallPercentage}%`}
                styles={buildStyles({
                  textColor: "#333",
                  pathColor: overallPercentage >= 75 ? "#4caf50" : overallPercentage >= 50 ? "#ffa726" : "#f44336",
                  trailColor: "#d6d6d6",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
            <div className="progress-summary">
              <h4>Your Overall Progress: {overallPercentage}%</h4>
              {overallPercentage >= 75 && (
                <p>🎉 Awesome job! You're making fantastic progress! Keep up the great work! 🚀✨</p>
              )}
              {overallPercentage >= 50 && overallPercentage < 75 && (
                <p>🌟 You're doing great! Keep pushing yourself, and you'll reach your goals in no time! 💪</p>
              )}
              {overallPercentage < 50 && (
                <p>💡 Don't worry, you've got this! Learning is a journey, and every challenge is an opportunity to grow! 📈</p>
              )}
            </div>
            <QuizAttemptsPieChart quizProgress={quizProgress} getCourseNameById={getCourseNameById} />
          </div>
        );
      case "courseProgress":
        return (
          <div className="course-progress-container">
            <h2 style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "15px",
              textAlign: "center",
              letterSpacing: "0.5px",
            }}>Course Completion Overview</h2>
            <p style={{
              fontSize: "18px",
              color: "#7f8c8d",
              lineHeight: "1.8",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}>
              Monitor your progress across all courses. Adjust your confidence targets (low, medium, high) 
              to challenge yourself and boost your motivation.
            </p>
            <CourseProgressComponent quizProgress={quizProgress} />
          </div>
        );
      case "moduleProgress":
        return (
          <div className="module-progress-container">
            <h2 style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "15px",
              textAlign: "center",
              letterSpacing: "0.5px",
            }}>📚 Module Completion Overview</h2>
            <p style={{
              fontSize: "18px",
              color: "#7f8c8d",
              lineHeight: "1.8",
              marginBottom: "30px",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}>
              Dive deeper into your progress at the module level. See how your quiz performance contributes 
              to your overall module completion.
            </p>
            <ProgressCards modules={moduleProgress} />
          </div>
        );
      default:
        return <div>Select a tab to view your progress</div>;
    }
  };

  return (
    <div>
      <header className="top-nav">
        <div className="logo">
          <h1>Education</h1>
        </div>
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

      <div className="progress-page" style={{ marginTop: "60px" }}>
        <div className="progress-tabs">
          <button
            onClick={() => setActiveTab("results")}
            className={activeTab === "results" ? "active" : ""}
          >
            My Quiz Results
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            className={activeTab === "statistics" ? "active" : ""}
          >
            Learning Insights
          </button>
          <button
            onClick={() => setActiveTab("overall")}
            className={activeTab === "overall" ? "active" : ""}
          >
            My Overall Progress
          </button>
          <button
            onClick={() => setActiveTab("courseProgress")}
            className={activeTab === "courseProgress" ? "active" : ""}
          >
            Course Completion Status
          </button>
          <button
            onClick={() => setActiveTab("moduleProgress")}
            className={activeTab === "moduleProgress" ? "active" : ""}
          >
            Module Completion
          </button>
        </div>
        {renderTabContent()}
      </div>

      <Footer currentYear={currentYear} />
    </div>
  );
};

export default ProgressPage;