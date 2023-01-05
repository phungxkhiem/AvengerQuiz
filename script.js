const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startingMinutes = 5;
const quizResults = document.getElementById('Quiz-Results');
var numberOfQuestionsAnswered = 0;
var numbersOfQuestionsRight = 0;

var time = 5 * 60, // timer code
  start = Date.now(),
  mins = document.getElementById('minutes'),
  secs = document.getElementById('seconds'),
  timer;



function countdown() {
  var timeleft = Math.max(0, time - (Date.now() - start) / 1000),
    m = Math.floor(timeleft / 60),
    s = Math.floor(timeleft % 60);

  mins.firstChild.nodeValue = m;
  secs.firstChild.nodeValue = s;

  if (timeleft == 0) clearInterval(timer);
}

timer = setInterval(countdown, 200);

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  numberOfQuestionsAnswered = 0;
  numbersOfQuestionsRight = 0;
  quizResults.innerText = '';
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}