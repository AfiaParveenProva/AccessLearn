import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressTracker = ({ percentage, sessionId, courseId, score, totalQuestions, startTime, endTime }) => {
  console.log("ProgressTracker - Percentage:", percentage); // Debugging log

  // Save quiz result to backend
  const saveQuizResult = async (sessionId, courseId, score, totalQuestions, startTime, endTime) => {
    if (score === undefined) {
      console.error("❌ Error: score is undefined. Falling back to 0.");
      score = 0; // Default to 0 if undefined
    }

    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    const quizResult = {
      sessionId,
      courseId,
      score: Number(score),
      totalQuestions: Number(totalQuestions),
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      percentage: Number(percentage),
    };

    console.log("📌 Saving Quiz Result:", quizResult);

    try {
      const response = await fetch("http://localhost:8080/quiz_results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizResult),
      });

      if (!response.ok) throw new Error("Failed to save quiz result");

      const data = await response.json();
      console.log("✅ Quiz result saved:", data);
    } catch (error) {
      console.error("❌ Error saving quiz result:", error);
    }
  };

  useEffect(() => {
    if (score !== undefined && sessionId && courseId && totalQuestions && startTime && endTime) {
      saveQuizResult(sessionId, courseId, score, totalQuestions, startTime, endTime);
    }
  }, [score, sessionId, courseId, totalQuestions, startTime, endTime]); // Runs when any of these values change

  return (
    <div style={{ width: "200px", margin: "20px auto", textAlign: "center" }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          pathColor: percentage >= 50 ? "green" : "red",
          textColor: "#000",
          trailColor: "#ddd",
          backgroundColor: "#fff",
        })}
      />
      <h3>Specific Quiz Score</h3>
    </div>
  );
};

export default ProgressTracker;
