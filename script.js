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

let sumTime;
let time;
let count;
let numberOfTrueAnswers = 0;
let numOfSelectedAnswers = 0;
let checkCorrect = 0;
let nextQuestion;
let theme;

const LS = localStorage;

const quiz = document.getElementById('quiz');
const timer = document.getElementById('timer');
const themeSwitchButton = document.getElementById('themeSwitchButton');
const numOfQuestion = document.getElementById('numOfQuestion');
const questions = document.getElementById('questions');
const results = document.getElementById('results');
const controlButtonNext = document.getElementById('controlButton-next');
const controlButtonRestart = document.getElementById('controlButton-restart');


const updateTimer = () => {
    nextQuestion = Number(questions.dataset.currentStep)+1;

    if(JSON.parse(LS.getItem('CurrentState')) <= DATA.length){
        time = time < 10 ? "0" + time : time;
        timer.innerHTML = `${time}`;
        time--;
        LS.setItem('time',JSON.stringify(time));
    }

    if(time < 0 && JSON.parse(LS.getItem('CurrentState')) != (DATA.length + 1)){
        if(DATA.length === nextQuestion){
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            renderResults(count);
            questions.classList.remove('disabled');
        } else {
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            time = 10;
            renderQuestions(nextQuestion);
            questions.classList.remove('disabled');
        }
    }
};

const renderQuestions = (index) => {
    renderNumOfQuestion(index+1);

    LS.setItem('CurrentState',JSON.stringify(index));

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
    .map(({id,correct,value}) =>`<button class="answerClick" id = ${correct ? "correctAnswer":"wrongAnswer"} name="${index} value=${id}">${value}</button>`)
    .join('');

    questions.innerHTML = `
    <div class="quizQuestions-item">
        <div class="quizQuestions-item-question">${DATA[index].question}</div>
        <div class = "quizQuestion-item-numOfAnswers">Количество правильных ответов в вопросе: ${DATA[index].numOfTrueAnswers}</div>
        <ul class="quizQuestions-item-answers">${renderAnswers()}</ul>
    </div>
    `;
    numberOfTrueAnswers = DATA[index].numOfTrueAnswers;
};


const renderNumOfQuestion = (currentQuestion) => {
    numOfQuestion.innerHTML = `Вопрос ${currentQuestion}/${DATA.length}`   
};

quiz.addEventListener('click',(event) =>{


    if(event.target.classList.contains('answerClick')){
        numOfSelectedAnswers++;

        if(event.target.id === 'correctAnswer'){
            event.target.id = 'correct';
            checkCorrect++;
            if(numberOfTrueAnswers === numOfSelectedAnswers){
                questions.classList.add('disabled');
                controlButtonNext.disabled = false;
                numOfSelectedAnswers = 0;
            }
        } else if(event.target.id === 'wrongAnswer'){
            event.target.id = 'wrong';
            if(numberOfTrueAnswers === numOfSelectedAnswers){
                questions.classList.add('disabled');
                controlButtonNext.disabled = false;
                numOfSelectedAnswers = 0;
            }
        }
    }

    if(event.target.classList.contains('controlButton-next')){
        
        if(checkCorrect/numberOfTrueAnswers === 1){
            count++;
            checkCorrect = 0;
        }

        LS.setItem('Count',JSON.stringify(count));

        if(DATA.length === nextQuestion){
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            renderResults(count);
            questions.classList.remove('disabled');
        } else {
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            time = 10;
            renderQuestions(nextQuestion);
            questions.classList.remove('disabled');
        }

        controlButtonNext.disabled = true;
    }

    if(event.target.classList.contains('controlButton-restart')){
        timer.classList.remove('nonVisible');
        themeSwitchButton.classList.remove('nonVisible');
        numOfQuestion.classList.remove('nonVisible');
        questions.classList.remove('nonVisible');
        controlButtonNext.classList.remove('nonVisible');
        controlButtonRestart.classList.remove('visible');
        results.classList.remove('visible');
        count = 0;
        LS.setItem('Count', JSON.stringify(count));
        time = 10;
        sumTime = 0;
        renderQuestions(0);
    }
    if(event.target.classList.contains('themeSwitchButton')){
        if(theme === 1){
            document.body.style.background = 'rgb(135, 220, 220)';
            quiz.classList.remove('darkTheme');
            themeSwitchButton.classList.remove('btnDarkTheme');
            timer.classList.remove('btnDarkTheme');
            controlButtonNext.classList.remove('btnDarkTheme');
            controlButtonRestart.classList.remove('btnDarkTheme');

            theme = 0;
            LS.setItem('CurrentTheme',JSON.stringify(theme));
        }else{
            document.body.style.background = '#293659';
            quiz.classList.add('darkTheme');
            themeSwitchButton.classList.add('btnDarkTheme');
            timer.classList.add('btnDarkTheme');
            controlButtonNext.classList.add('btnDarkTheme');
            controlButtonRestart.classList.add('btnDarkTheme');

            theme = 1;
            LS.setItem('CurrentTheme',JSON.stringify(theme));
        }
    }
});

const themeSave = (theme) => {
    if(theme === 1){
        document.body.style.background = '#293659';
        quiz.classList.add('darkTheme');
        themeSwitchButton.classList.add('btnDarkTheme');
        timer.classList.add('btnDarkTheme');
        controlButtonNext.classList.add('btnDarkTheme');
        controlButtonRestart.classList.add('btnDarkTheme');
    }
};

const renderResults = (count) => {

    timer.classList.add('nonVisible');
    themeSwitchButton.classList.add('nonVisible');
    numOfQuestion.classList.add('nonVisible');
    questions.classList.add('nonVisible');
    controlButtonNext.classList.add('nonVisible');
    controlButtonRestart.classList.add('visible');
    results.classList.add('visible');

    let finishTime = JSON.parse(LS.getItem('SumTime'));
    count = JSON.parse(LS.getItem('Count'));

    results.innerHTML = `<p class="result">Вы решили ${count} из ${DATA.length} вопросов за ${finishTime = finishTime > 40 ? finishTime-DATA.length : finishTime} секунд.</p>`

    LS.setItem('CurrentState',JSON.stringify(DATA.length+1));
};

if(JSON.parse(LS.getItem('CurrentState')) === null){
    renderQuestions(0);
}else if(JSON.parse(LS.getItem('CurrentState')) > DATA.length){
    renderResults(count);
}else{
    renderQuestions(JSON.parse(LS.getItem('CurrentState')));
}

JSON.parse(LS.getItem('time')) === null ? time = 10 : time = JSON.parse(LS.getItem('time'));
JSON.parse(LS.getItem('CurrentState')) === null || JSON.parse(LS.getItem('CurrentState')) === 0 ? sumTime = 0 : sumTime = JSON.parse(LS.getItem('SumTime'));
JSON.parse(LS.getItem('Count')) === null || JSON.parse(LS.getItem('CurrentState')) === 0 ? count = 0 : count = JSON.parse(LS.getItem('Count'));
JSON.parse(LS.getItem('CurrentTheme') === null) ? theme = 0 : theme = JSON.parse(LS.getItem('CurrentTheme'));
themeSave(theme);


setInterval(updateTimer,1000);