let score = localStorage.getItem("score");
let total = localStorage.getItem("total");
let studentName = localStorage.getItem("studentName");

score = parseInt(score);
total = parseInt(total);

let percentage = (score / total) * 100;
let grade;

if (percentage >= 80)
    grade = "A";
else if (percentage >= 60)
    grade = "B";
else if (percentage >= 40)
    grade = "C";
else
    grade = "Fail";

document.querySelector(".result-box").innerHTML = `
    <p><strong>Student Name:</strong> ${studentName}</p>
    <p>Total Questions: ${total}</p>
    <p>Correct Answers: ${score}</p>
    <p>Wrong Answers: ${total - score}</p>
    <p>Score: ${score} / ${total}</p>
    <p>Percentage: ${percentage.toFixed(2)}%</p>
    <h3>Grade: ${grade}</h3>
`;

function goHome() {
    window.location.href = "index.html";
}