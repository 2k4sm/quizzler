let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: '3',
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: '4',
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: '2',
    },
    {
        question: 'What does CSS stand for?',
        choice1: 'Creative Style Sheets',
        choice2: 'Colorful Style Sheets',
        choice3: 'Cascading Style Sheets',
        choice4: 'Computer Style Sheets',
        answer: '3',
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        choice1: 'class',
        choice2: 'font',
        choice3: 'styles',
        choice4: 'style',
        answer: '4',
    },
    {
        question: 'How do you insert a comment in a CSS file?',
        choice1: '// this is a comment',
        choice2: '/* this is a comment */',
        choice3: '// this is a comment //',
        choice4: '<!-- this is a comment -->',
        answer: '2',
    },
    {
        question: 'Which property is used to change the background color?',
        choice1: 'bgcolor',
        choice2: 'color',
        choice3: 'background-color',
        choice4: 'bg-color',
        answer: '3',
    },
    {
        question: 'How do you add a background color for all <h1> elements?',
        choice1: 'h1 {background-color:#FFFFFF;}',
        choice2: 'h1.all {background-color:#FFFFFF;}',
        choice3: 'all.h1 {background-color:#FFFFFF;}',
        choice4: 'h1 {bgcolor:#FFFFFF;}',
        answer: '1',
    },
    {
        question: 'Which CSS property controls the text size?',
        choice1: 'font-style',
        choice2: 'text-size',
        choice3: 'font-size',
        choice4: 'text-style',
        answer: '3',
    },
    {
        question: 'How do you display hyperlinks without an underline?',
        choice1: 'a {text-decoration:none;}',
        choice2: 'a {underline:none;}',
        choice3: 'a {text-decoration:no-underline;}',
        choice4: 'a {decoration:none;}',
        answer: '1',
    },
    {
        question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
        choice1: 'src',
        choice2: 'title',
        choice3: 'alt',
        choice4: 'longdesc',
        answer: '3',
    },
    {
        question: 'In HTML, which attribute is used to specify that an input field must be filled out?',
        choice1: 'validate',
        choice2: 'placeholder',
        choice3: 'formvalidate',
        choice4: 'required',
        answer: '4',
    },
    {
        question: 'Which HTML element is used to define the title of a document?',
        choice1: '<meta>',
        choice2: '<title>',
        choice3: '<head>',
        choice4: '<body>',
        answer: '2',
    }
];

let currentIndex = 0;
let correct = 0;

let question = document.querySelector('.curr-question');
let choice1 = document.getElementById('1');
let choice2 = document.getElementById('2');
let choice3 = document.getElementById('3');
let choice4 = document.getElementById('4');
let progressInterval;
function displayQuestion() {
    let q = questions[currentIndex];
    question.innerText = q.question;
    choice1.innerText = q.choice1;
    choice2.innerText = q.choice2;
    choice3.innerText = q.choice3;
    choice4.innerText = q.choice4;
    startProgressBar();
    console.log(correct);
}

function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}


function choiceSelection() {
    let choices = document.querySelectorAll('.choices');
    choices.forEach(choice => {
        clearInterval(progressInterval);
        let choiceChildren = choice.querySelector('p[id]')
        choice.addEventListener('click', function () {
            if (choiceChildren.id.toString().trim() === questions[currentIndex].answer.trim()) {
                correct++;
                changeCorrectAndScore();
                choiceChildren.classList.add('correct');
            } else {
                choiceChildren.classList.add('wrong');
            }

            setTimeout(() => {
                clearInterval(progressInterval);
                choiceChildren.classList.remove('correct', 'wrong');
                currentIndex++;
                if (currentIndex < questions.length) {
                    displayQuestion();
                } else {
                    window.location.href = "./score.html";
                }
            }, 500);
        });
    });
}

function changeCorrectAndScore() {
    let numerator = document.querySelector('.correct-ans')
    let denominator = document.querySelector('.total-qns')
    let score = document.querySelector('.score-info')

    numerator.innerText = correct;
    denominator.innerText = questions.length;
    score.innerText = correct * 10;
    localStorage.setItem('score', correct * 10);
}


let progressBar = document.querySelector('.time-bar');

function startProgressBar() {
    progressBar.style.width = '100%';
    let startTime = Date.now();

    progressInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let progress = 100 - (elapsedTime / 10000) * 100;
        progressBar.style.width = `${progress}%`;

        if (progress <= 0) {
            clearInterval(progressInterval);
            currentIndex++;
            if (currentIndex < questions.length) {
                displayQuestion();
            } else {
                window.location.href = "./score.html";
            }
        }
    }, 1);
}
function startQuiz() {
    shuffleQuestions(questions);
    changeCorrectAndScore()
    displayQuestion()
    choiceSelection()
    startProgressBar()
}

startQuiz();