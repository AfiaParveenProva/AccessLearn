const flashcards = [
    { question: "What is JavaScript?", answer: "A programming language for the web." },
    { question: "What is an array?", answer: "A collection of elements stored in a variable." },
    { question: "What is a function?", answer: "A reusable block of code." }
];

let currentIndex = 0;
const flashcard = document.getElementById("flashcard");

function displayCard(index) {
    flashcard.textContent = flashcards[index].question;
    flashcard.classList.remove("flipped");
}

function flipCard() {
    if (flashcard.classList.contains("flipped")) {
        flashcard.textContent = flashcards[currentIndex].question;
    } else {
        flashcard.textContent = flashcards[currentIndex].answer;
    }
    flashcard.classList.toggle("flipped");
}

function nextCard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard(currentIndex);
}

function prevCard() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard(currentIndex);
}

// Initialize first card
displayCard(currentIndex);
