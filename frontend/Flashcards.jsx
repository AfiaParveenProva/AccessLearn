import React, { useState } from "react";
import "./BookSelection.css"; // Import CSS

const flashcards = [
    { question: "What is JavaScript?", answer: "A programming language for the web." },
    { question: "What is an array?", answer: "A collection of elements stored in a variable." },
    { question: "What is a function?", answer: "A reusable block of code." }
];

const Flashcards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const displayCard = () => {
        return isFlipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question;
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
        setCurrentIndex((currentIndex + 1) % flashcards.length);
        setIsFlipped(false);
    };

    const prevCard = () => {
        setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
        setIsFlipped(false);
    };

    return (
        <div style={styles.container}>
            <h1>Interactive Flashcards</h1>
            <div style={styles.flashcard} onClick={flipCard}>
                {displayCard()}
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={prevCard}>Previous</button>
                <button style={styles.button} onClick={nextCard}>Next</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        fontFamily: 'OpenDyslexic',
        
    
    },
    flashcard: {
        width: "300px",
        height: "200px",
        margin: "20px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007BFF",
        color: "white",
        fontSize: "18px",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
    button: {
        padding: "10px 15px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "#28a745",
        color: "white",
    },
};

export default Flashcards;
