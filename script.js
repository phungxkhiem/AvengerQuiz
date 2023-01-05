const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startingMinutes = 5;
const quizResults = document.getElementById('Quiz-Results');
var numberOfQuestionsAnswered = 0;
var numbersOfQuestionsRight = 0;

var time = 5 * 60,
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

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
  function showQuestion(question) { 
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
  }
  
  
  
  function selectAnswer(e) { 
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct === 'true' ){
      numbersOfQuestionsRight = numbersOfQuestionsRight + 1;
    }
    
    numberOfQuestionsAnswered = numberOfQuestionsAnswered + 1;
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
      quizResults.innerText = 'Questions: '+ numberOfQuestionsAnswered + ' Correct: '+ numbersOfQuestionsRight;
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }
  
  
  function resetState() {
  
  
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
  
  const questions = [ 
    {
      question: 'What was the first Marvel movie?',
      answers: [
        { text: 'Harry Potter', correct: false },
        { text: 'End Game', correct: false },
        { text: 'Thor', correct: false },
        { text: 'Iron Man', correct: true },
  
      ]
    },
    {
      question: 'What was the first Marvel movie to earn $1 billion?',
      answers: [
        { text: 'The Avengers', correct: true },
        { text: 'Avatar.', correct: false },
        { text: 'Doctor Strange.', correct: false },
        { text: 'Iron Man.', correct: false },
      ]
    },
    {
      question: 'What are the Name of Tony Starks Parents?',
      answers: [
        { text: 'Howard and Maria Stark', correct: true },
        { text: 'Jack and Jill Stark', correct: false },
        { text: 'Bruce and Wanda Stark', correct: false },
        { text: 'Roger and Nancy Stark', correct: false },
  
      ]
    },
    {
      question: 'In Avenger Endgame, who kills Thanos in the first half of the movie?',
      answers: [
        { text: 'Captain Marvel', correct: false },
        { text: 'Thor', correct: true },
        { text: 'Goku', correct: false },
        { text: 'He tripped', correct: false },
      ]
    }
  ]