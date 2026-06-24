import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressTracker from "./ProgressTracker";

// Sample questions moved outside component and renamed to all caps
const COURSE_QUESTIONS = {
    "1": [
        {
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Madrid"],
            answerIndex: 1
        },
        {
            question: "Which language is primarily used for web development?",
            options: ["Java", "C++", "JavaScript", "Python"],
            answerIndex: 2
        },
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ],
            answerIndex: 0
        }
    ],
    "2": [
        {
            question: "What is React?",
            options: [
                "A programming language",
                "A JavaScript library for building user interfaces",
                "A database management system",
                "A design pattern"
            ],
            answerIndex: 1
        },
        {
            question: "Which hook is used for side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            answerIndex: 1
        }
    ]
};

const QuizPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [finalScore, setFinalScore] = useState(0);
    const [finalPercentage, setFinalPercentage] = useState(0);
    
    // Use a ref to track correct answers
    const correctAnswersRef = useRef(0);

    useEffect(() => {
        // Initialize with sample questions if no localStorage data exists
        if (!localStorage.getItem("quizQuestions")) {
            localStorage.setItem("quizQuestions", JSON.stringify(COURSE_QUESTIONS));
        }

        // Load questions for the course
        const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || {};
        const courseQuestions = storedQuestions[courseId] || [];
        
        setQuestions(courseQuestions);
        setStartTime(new Date());
        correctAnswersRef.current = 0;
    }, [courseId]);

    useEffect(() => {
        if (completed || questions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 1) {
                    handleTimeout();
                    return 30;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, completed, questions]);

    const handleTimeout = () => {
        setSelectedOption(null);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setTimeLeft(30);
        } else {
            finishQuiz();
        }
    };

    const handleAnswer = (optionIndex) => {
        setSelectedOption(optionIndex);

        // Check if answer is correct and update the ref immediately
        if (optionIndex === questions[currentQuestion].answerIndex) {
            correctAnswersRef.current += 1;
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
                setTimeLeft(30);
            } else {
                finishQuiz();
            }
        }, 500);
    };

    const finishQuiz = () => {
        const quizEndTime = new Date();
        setEndTime(quizEndTime);

        // Use the ref value which is always up-to-date
        const actualScore = correctAnswersRef.current;
        const calculatedPercentage = ((actualScore / questions.length) * 100).toFixed(2);
        
        // Store final values for display
        setFinalScore(actualScore);
        setFinalPercentage(Number(calculatedPercentage));
        
        saveQuizProgress(courseId, actualScore, startTime, quizEndTime, calculatedPercentage);
        setCompleted(true);
    };

    const saveQuizProgress = (courseId, finalScore, startTime, endTime, percentage) => {
        const sessionId = localStorage.getItem("sessionId") || "anonymous-session";

        const quizResult = {
            sessionId,
            courseId: Number(courseId),
            score: Number(finalScore),
            totalQuestions: questions.length,
            startTime: startTime?.toLocaleTimeString(),
            endTime: endTime?.toLocaleTimeString(),
            percentage: Number(percentage),
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const savedProgress = JSON.parse(localStorage.getItem("userQuizResults")) || [];
        savedProgress.push(quizResult);
        localStorage.setItem("userQuizResults", JSON.stringify(savedProgress));
    };

    // Initialize session if not exists
    useEffect(() => {
        if (!localStorage.getItem("sessionId")) {
            localStorage.setItem("sessionId", `session-${Date.now()}`);
        }
    }, []);

    if (questions.length === 0) return <div>Loading questions...</div>;

    return (
        <div className="quiz-container">
            <div className="quiz-card">
                <h1 className="quiz-title">Quiz for Course {courseId}</h1>
                {!completed ? (
                    <>
                        <div className="timer">Time Left: {timeLeft} seconds</div>
                        <h2 className="question-text">{questions[currentQuestion].question}</h2>
                        <div className="options-container">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className={`quiz-option 
                                        ${selectedOption === index ? 'selected' : ''} 
                                        ${selectedOption !== null && index === questions[currentQuestion].answerIndex ? 'correct' : ''}
                                        ${selectedOption !== null && selectedOption === index && index !== questions[currentQuestion].answerIndex ? 'incorrect' : ''}
                                    `}
                                    disabled={selectedOption !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="question-counter">
                            {currentQuestion + 1} of {questions.length} Questions
                        </div>
                        {currentQuestion < questions.length - 1 ? (
                            <button className="next-button" onClick={() => {
                                setCurrentQuestion(prev => prev + 1);
                                setSelectedOption(null);
                                setTimeLeft(30);
                            }}>
                                Next Question
                            </button>
                        ) : (
                            <button className="next-button" onClick={finishQuiz}>
                                Finish Quiz
                            </button>
                        )}
                    </>
                ) : (
                    <div className="quiz-completed-container">
                        <div className="quiz-completed">
                            <h2>Quiz Completed!</h2>
                            <p>Your Score: {finalScore} out of {questions.length}</p>
                            <p>Percentage: {finalPercentage}%</p>
                            <p>Start Time: {startTime && new Date(startTime).toLocaleString('en-US', { 
                                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', 
                                hour: '2-digit', minute: '2-digit', second: '2-digit' 
                            })}</p>
                            <p>End Time: {endTime && new Date(endTime).toLocaleString('en-US', { 
                                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', 
                                hour: '2-digit', minute: '2-digit', second: '2-digit' 
                            })}</p>

                            <ProgressTracker 
                                percentage={finalPercentage} 
                                sessionId={localStorage.getItem("sessionId") || "anonymous-session"} 
                                courseId={courseId}
                            />
                            <button onClick={() => navigate("/progress")}>View Progress</button>
                            <button onClick={() => navigate("/")}>Go Home</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;