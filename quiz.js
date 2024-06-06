// Import Firebase and necessary functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoo1UZt6daTqU1BRmTJoxJN601KNhvf4c",
    authDomain: "abacus-1cd92.firebaseapp.com",
    projectId: "abacus-1cd92",
    storageBucket: "abacus-1cd92.appspot.com",
    messagingSenderId: "52069573106",
    appId: "1:52069573106:web:224d42e32e098446a34b6b",
    measurementId: "G-NCZPLYG1NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);






const quizData = [
    {"question": "<p>2</p><p>-4</p><p>-1</p><p>8</p>","options": [5,8,3],"answer": "5"},
    {"question": "<p>5</<p><p>-5</p><p>8</p><p>-2</p>","options": [4,9,6],"answer": "6"},
    {"question": "<p>7</p><p>4</p><p>-4</p><p>-2</p>","options": [5,4,8],"answer": "5"},
    {"question": "<p>3</p><p>1</p><p>1</p><p>-2</p>","options": [3,6,2],"answer": "3"},
    {"question": "<p>7</p><p>-5</p><p>5</p><p>-5</p>","options": [2,8,3],"answer": "2"}
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const optionA = document.getElementById("a_text");
const optionB = document.getElementById("b_text");
const optionC = document.getElementById("c_text");

const timeEl = document.getElementById("time");
const countdownOverlay = document.getElementById("countdown-overlay");
const countdownEl = document.getElementById("countdown");

// buttons
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let time = 0;
let timer;
let countdown;

// new
let userAnswers = Array(quizData.length).fill(null);

function startCountdown() {
    let countdownTime = 3;
    countdownEl.innerText = countdownTime;
    countdownOverlay.style.display = 'flex';
    
    countdown = setInterval(() => {
        countdownTime--;
        countdownEl.innerText = countdownTime;
        
        if (countdownTime <= 0) {
            clearInterval(countdown);
            countdownOverlay.style.display = 'none';
            startTimer();
            loadQuiz();
        }
    }, 1000);
}

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = formatQuestion(currentQuiz + 1, currentQuizData.question);
    optionA.innerText = currentQuizData.options[0];
    optionB.innerText = currentQuizData.options[1];
    optionC.innerText = currentQuizData.options[2];
    
    if (userAnswers[currentQuiz] !== null) {
        answerEls[userAnswers[currentQuiz]].checked = true;
    }

    previousBtn.style.display = currentQuiz > 0 ? 'inline-block' : 'none';
    nextBtn.style.display = currentQuiz < quizData.length - 1 ? 'inline-block' : 'none';
    submitBtn.style.display = currentQuiz === quizData.length - 1 ? 'inline-block' : 'none';
}

function formatQuestion(number, question) {
    return `<p id="dont">Question ${number} / ${quizData.length}</p>${question}`;
}

function getSelected() {
    let answerIndex = null;
    answerEls.forEach((answerEl, index) => {
        if (answerEl.checked) {
            answerIndex = index;
        }
    });
    return answerIndex;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        timeEl.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }, 1000);
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

nextBtn.addEventListener("click", () => {
    const answerIndex = getSelected();
    if (answerIndex !== null) {
        userAnswers[currentQuiz] = answerIndex;
        currentQuiz++;
        loadQuiz();
    }
});

previousBtn.addEventListener("click", () => {
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    }
});

submitBtn.addEventListener("click", () => {
    const answerIndex = getSelected();
    if (answerIndex !== null) {
        userAnswers[currentQuiz] = answerIndex;
    }

    let score = 0;
    let resultHTML = '';

    for (let i = 0; i < quizData.length; i++) {
        const isCorrect = quizData[i].options[userAnswers[i]] === parseInt(quizData[i].answer);
        if (isCorrect) {
            score++;
        }

        resultHTML += `
            <div style="background-color: black; color: white; padding: 20px;">
                <h3>Question ${i + 1}</h3>
                <p>${quizData[i].question}</p>
                ${quizData[i].options.map((option, index) => `
                    <button style="background-color: ${
                        userAnswers[i] === index ? (isCorrect ? 'green' : 'red') : 'white'
                    };">
                        ${option}
                    </button>
                `).join('')}
                <p>Correct answer: ${quizData[i].answer}</p>
                <hr>
            </div>
        `;
    }

    clearInterval(timer);
    quiz.innerHTML = `
        <div id="score-section">
            <h2 id="result">You answered correctly ${score}/${quizData.length} questions.<br><br> In ${timeEl.innerText}</h2>
            <button id="view-answers-btn" style="padding: 10px 20px; margin-top: 20px;">View Answers</button>
        </div>
        <div id="result-section">
            ${resultHTML}
            <button id="back-btn" style="padding: 10px 20px; margin-top: 20px;">Back</button>
        </div>
    `;

    document.getElementById("result-section").style.display = "none";

    document.getElementById("view-answers-btn").addEventListener("click", () => {
        document.getElementById("score-section").style.display = "none";
        document.getElementById("result-section").style.display = "block";
    });

    document.getElementById("back-btn").addEventListener("click", () => {
        document.getElementById("result-section").style.display = "none";
        document.getElementById("score-section").style.display = "block";
    });

    // Save the score to Firestore
    const userName = localStorage.getItem('userName');
    if (userName) {
        const db = firebase.firestore(app);
        db.collection('Level1').add({
            name: userName,
            score: score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('Score saved successfully!');
        }).catch((error) => {
            console.error('Error saving score: ', error);
        });
    }
});


// Start the countdown on page load
window.onload = startCountdown;
