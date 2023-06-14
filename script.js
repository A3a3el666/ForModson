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
                id:'12',
                value: 'Dunai',
                correct: false,
                
            },
        ]
    },
];



let count = 0;
let nOfTrueAnswers = 0;
let numOfSelectedAnswers = 0;

const quiz = document.getElementById('quiz');
const numOfQuestion = document.getElementById('numOfQuestion');
const questions = document.getElementById('questions');
const results = document.getElementById('results');
const controlButtonNext = document.getElementById('controlButton-next');
const controlButtonRestart = document.getElementById('controlButton-restart');

const renderQuestions = (index) => {
    renderNumOfQuestion(index+1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
    .map(({id,correct,value}) =>`<button class='answerClick' id = ${correct? "correctAnswer":"wrongAnswer"} name="${index} value=${id}">${value}</button>`)
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


const renderNumOfQuestion = (currentQuestion) => {
    numOfQuestion.innerHTML = `Вопрос ${currentQuestion}/${DATA.length}`   
};

quiz.addEventListener('click',(event) =>{


    if(event.target.classList.contains('answerClick')){
        
        numOfSelectedAnswers++;

        if(event.target.id === 'correctAnswer'){
            event.target.id = 'correct';
            if(nOfTrueAnswers === numOfSelectedAnswers){
                count++;
                questions.classList.add('disabled');
                controlButtonNext.disabled = false;
                numOfSelectedAnswers = 0;
            }
        } else if(event.target.id === 'wrongAnswer'){
            event.target.id = 'wrong';
            if(nOfTrueAnswers === numOfSelectedAnswers){
                questions.classList.add('disabled');
                controlButtonNext.disabled = false;
                numOfSelectedAnswers = 0;
            }
        }
    }

    if(event.target.classList.contains('controlButton-next')){
        let nextQuestion = Number(questions.dataset.currentStep)+1;
        
        if(DATA.length === nextQuestion){
            renderResults(count);
            questions.classList.remove('disabled');
        } else {
            renderQuestions(nextQuestion);
            questions.classList.remove('disabled');
        }
        
        controlButtonNext.disabled = true;
    }

    if(event.target.classList.contains('controlButton-restart')){
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
    results.innerHTML = `<p class="result">Вы решили ${count} из ${DATA.length} вопросов.</p>`
};

renderQuestions(0);