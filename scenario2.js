const questions = [
    {
        question: "Which keyword declares a constant variable?",
        options: ["var", "let", "const", "static"],
        answer: 2
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        answer: 1
    },
    {
        question: "Which operator checks strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: 2
    },
    {
        question: "Which function prints a message in the console?",
        options: ["print()", "console.log()", "write()", "display()"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizArea = document.getElementById("quiz-area");
const resultArea = document.getElementById("result-area");

// Display one question at a time
function showQuestion() {

    selectedAnswer = null;

    let q = questions[currentQuestion];

    quizArea.innerHTML = `
        <div class="progress">
            Question ${currentQuestion + 1} of ${questions.length}
        </div>

        <div class="question">
            ${q.question}
        </div>

        <div id="options">
            ${q.options.map((option, index) => `
                <label class="option">
                    <input type="radio"
                    name="answer"
                    value="${index}">
                    ${option}
                </label>
            `).join("")}
        </div>

        <button id="next-btn" disabled>
            ${currentQuestion === questions.length - 1
                ? "Finish"
                : "Next"}
        </button>
    `;

    // Enable Next after selecting an option
    document.querySelectorAll(
        'input[name="answer"]'
    ).forEach(radio => {

        radio.addEventListener("change", function() {

            selectedAnswer = Number(this.value);

            document.getElementById("next-btn").disabled = false;

        });
    });

    document.getElementById("next-btn")
        .addEventListener("click", nextQuestion);
}

// Check answer and move to next question
function nextQuestion() {

    if (selectedAnswer === null) {
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        showQuestion();

    } else {

        showResult();

    }
}

// Display final result
function showResult() {

    let percentage = (score / questions.length) * 100;

    let message;

    if (percentage === 100) {
        message = "Excellent work!";
    }
    else if (percentage >= 50) {
        message = "Good job!";
    }
    else {
        message = "Keep practising!";
    }

    quizArea.innerHTML = "";

    resultArea.innerHTML = `
        <div class="result">

            <div class="score">
                ${score} / ${questions.length}
            </div>

            <p class="message">
                You scored ${percentage}%. ${message}
            </p>

            <button id="restart-btn">
                Restart Quiz
            </button>

        </div>
    `;

    document.getElementById("restart-btn")
        .addEventListener("click", restartQuiz);
}

// Restart quiz
function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    resultArea.innerHTML = "";

    showQuestion();
}

// Start quiz
showQuestion();