let currentQuestion = 0;
let score = 0;
let timeLeft = 300; // 5 minutes

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");

let selectedAnswers = new Array(questions.length).fill(null);

// Load Question
function loadQuestion() {
    let q = questions[currentQuestion];
    questionElement.innerText = `Q${currentQuestion + 1}. ${q.question}`;
    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {
        optionsElement.innerHTML += `
            <label>
                <input type="radio" name="option" value="${index}"
                ${selectedAnswers[currentQuestion] == index ? "checked" : ""}>
                ${option}
            </label><br>
        `;
    });
}

// Save Answer
function saveAnswer() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        selectedAnswers[currentQuestion] = parseInt(selected.value);
    }
}

// Next Question
document.querySelector(".btn:nth-child(2)").onclick = function () {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
};

// Previous Question
document.querySelector(".btn:nth-child(1)").onclick = function () {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
};

// Submit Exam
document.querySelector(".submit-btn").onclick = function () {
    saveAnswer();
    calculateScore();
};

// Timer
let timer = setInterval(function () {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timer);
        calculateScore();
    }
}, 1000);

// Calculate Score
function calculateScore() {
    score = 0;
    questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correct) {
            score++;
        }
    });

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    window.location.href = "result.html";
}

loadQuestion();