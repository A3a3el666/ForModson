"use strict";
const DATA = [
    {
        question:'How many planets are in the solar system?',
        numOfTrueAnswers: 1,
        answers:[
            {
                id:'0',
                value: '8',
                correct: true,
                
            },
            {
                id:'1',
                value: '9',
                correct: false,
                
            },
            {
                id:'2',
                value: '10',
                correct: false,
                
            },
        ]
    },
    {
        question:'What is the freezing point of water?',
        numOfTrueAnswers: 1,
        answers:[
            {
                id:'3',
                value: '-2',
                correct: false,
                
            },
            {
                id:'4',
                value: '0',
                correct: true,
                
            },
            {
                id:'5',
                value: '4',
                correct: false,
                
            },
        ]
    },
    {
        question:'What is the capital of Canada?',
        numOfTrueAnswers: 1,
        answers:[
            {
                id:'6',
                value: 'Tokio',
                correct: false,
                
            },
            {
                id:'7',
                value: 'Minsk',
                correct: false,
                
            },
            {
                id:'8',
                value: 'Ottawa',
                correct: true,
                
            },
        ]
    },
    {
        question:'What is the longest rivers in the world?',
        numOfTrueAnswers: 2,
        answers:[
            {
                id:'9',
                value: 'Nile',
                correct: true,
                
            },
            {
                id:'10',
                value: 'Amazon',
                correct: true,
                
            },
            {
                id:'11',
                value: 'Volga',
                correct: false,
                
            },
            {
                id:'11',
                value: 'Dunai',
                correct: false,
                
            },
        ]
    },
];



let count = 0;
let nOfTrueAnswers = 0;
let numOfChoosenAnswers = 0;

const quiz = document.getElementById('quiz');
const numOfQuestion = document.getElementById('numOfQuestion');
const questions = document.getElementById('questions');
const results = document.getElementById('results');
const controlButtonNext = document.getElementById('controlButton-next');
const controlButtonRestart = document.getElementById('contolButton-restart');

const renderQuestions = (index) => {
    renderuNumOfQuestion(index+1);

    questions.dataset.currentStep = index;

    const giveId = (answerIndex) => {
        let corectless = answerIndex;
        if(corectless){
            return 'correctAnswer';
        } else {
            return 'wrongAnswer';
        }
    };

    const renderAnswers = () => DATA[index].answers
    .map((answer) =>`<button class='answerClick' id= ${giveId(answer.correct)} name="${index} value=${answer.id}">${answer.value}</button>`)
    .join('');

    questions.innerHTML = `
    <div class="quizQuestions-item">
        <div class="quizQuestions-item-question">${DATA[index].question}</div>
        <div class = "quizQuestion-item-numOfAnswers">Количество правильных ответов в вопросе: ${DATA[index].numOfTrueAnswers}</div>
        <ul class="quizQuestions-item-answers">${renderAnswers()}</ul>
    </div>
    `;
    nOfTrueAnswers = DATA[index].numOfTrueAnswers;
};


const renderuNumOfQuestion = (currentQuestion) => {
    numOfQuestion.innerHTML = `Вопрос ${currentQuestion}/${DATA.length}`   
};

quiz.addEventListener('click',(event) =>{


    if(event.target.classList.contains('answerClick')){
        
        numOfChoosenAnswers++;

        if(event.target.id === 'correctAnswer'){
            event.target.id = 'correct';
            if(nOfTrueAnswers === numOfChoosenAnswers){
                count++;
                questions.classList.add('disabled');
                controlButtonNext.disabled = false;
                numOfChoosenAnswers = 0;
            }
        } else if(event.target.id === 'wrongAnswer'){
            event.target.id = 'wrong';
            if(nOfTrueAnswers === numOfChoosenAnswers){
                questions.classList.add('disabled');
                controlButtonNext.disabled = false;
                numOfChoosenAnswers = 0;
            }
        }
    }

    if(event.target.classList.contains('controlButton-next')){
        let nextQuiation = Number(questions.dataset.currentStep)+1;
        
        if(DATA.length === nextQuiation){
            renderResults(count);
            questions.classList.remove('disabled');
        } else {
            renderQuestions(nextQuiation);
            questions.classList.remove('disabled');
        }
        
        controlButtonNext.disabled = true;
    }

    if(event.target.classList.contains('contolButton-restart')){
        numOfQuestion.classList.remove('nonVisible');
        questions.classList.remove('nonVisible');
        controlButtonNext.classList.remove('nonVisible');
        controlButtonRestart.classList.remove('visible');
        results.classList.remove('visible');
        count = 0;
        renderQuestions(0);
    }
});

const renderResults = (count) => {
    numOfQuestion.classList.add('nonVisible');
    questions.classList.add('nonVisible');
    controlButtonNext.classList.add('nonVisible');
    controlButtonRestart.classList.add('visible');
    results.classList.add('visible');
    results.innerHTML = `Вы решили ${count} из ${DATA.length} вопросов.`
};

renderQuestions(0);