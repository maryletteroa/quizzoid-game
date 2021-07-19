const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score")
const quizBodyElement = document.getElementById("quiz-body")
let qNumber = 0;
let score = 0;
let quizData; 

const url = "https://opentdb.com/api.php?amount=10&type=multiple"


function getQuestions(url, callback) {
    let obj;
    fetch(url)
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => callback(obj))
}

getQuestions(url, getData);

function getData(obj) {
    quizData = obj.results;
    startGame();
}

function startGame() {
    getCurrQuestion(quizData[qNumber]);
}

function getCurrQuestion(question) {
    questionElement.innerHTML = question.question;
    choices = question.incorrect_answers;
    correct_answer = question.correct_answer;
    choices.push(correct_answer);
    choices.sort( () => .5 - Math.random() );
    choices.forEach(choice => {
        choicesElement.innerHTML += ` <input type="button" value="${choice}" id="${choice}">`
    });
    let buttonElements = document.getElementsByTagName("input")
    for (let i=0; i < buttonElements.length; i++) {
        button = buttonElements[i];
        button.addEventListener("click", checkAnswer)
    }
};


function checkAnswer (e) {
    user_answer = e.target.value
    // console.log(user_answer, correct_answer);
    if (user_answer === correct_answer) {
        score ++;
        scoreElement.innerText = `Score: ${score}` 
    }
    if (qNumber < quizData.length-1) {
        nextQuestion();
    } else {
        quizBodyElement.style.display = "none";
        scoreElement.innerHTML = `<h1>Finished</h1>
                Score: ${score}`;
    }
}


function nextQuestion() {
    choicesElement.innerHTML = "";
    qNumber ++;
    getCurrQuestion(quizData[qNumber]);
}


