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
            }
        }
    }, 1);
}
function startQuiz() {
    changeCorrectAndScore()
    displayQuestion()
    choiceSelection()
    startProgressBar()
}

startQuiz();