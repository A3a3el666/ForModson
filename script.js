"use strict";
const DATA = [
    {
        quastion:'How many planets are in the solar system?',
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
        quastion:'What is the freezing point of water?',
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
        quastion:'What is the capital of Canada?',
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
        quastion:'What is the longest river in the world?',
        answers:[
            {
                id:'9',
                value: 'Nile',
                correct: true,
                
            },
            {
                id:'10',
                value: 'Amazon',
                correct: false,
                
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

const quiz = document.getElementById('quiz');
const numOfQuastion = document.getElementById('numOfQuastion');
const quastions = document.getElementById('quastions');
const results = document.getElementById('results');
const controlButtonNext = document.getElementById('controlButton-next');
const controlButtonRestart = document.getElementById('contolButton-restart');

const renderQuastions = (index) => {
    renderuNumOfQuastion(index+1);

    quastions.dataset.currentStep = index;

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

    quastions.innerHTML = `
    <div class="quizQuastions-item">
        <div class="quizQuastions-item-quastion">${DATA[index].quastion}</div>
        <ul class="quizQuastions-item-answers">${renderAnswers()}</ul>
    </div>
    `;
};


const renderuNumOfQuastion = (currentQuastion) => {
    numOfQuastion.innerHTML = `Вопрос ${currentQuastion}/${DATA.length}`   
};

quiz.addEventListener('click',(event) =>{

    if(event.target.classList.contains('answerClick')){

        if(event.target.id === 'correctAnswer'){
            count++;
            event.target.id = 'correct';
            quastions.classList.add('disabled');
            controlButtonNext.disabled = false;
        } else if(event.target.id === 'wrongAnswer'){
            event.target.id = 'wrong';
            quastions.classList.add('disabled');
            controlButtonNext.disabled = false;
        }
    }

    if(event.target.classList.contains('controlButton-next')){
        let nextQuiation = Number(quastions.dataset.currentStep)+1;
        
        if(DATA.length === nextQuiation){
            renderResults(count);
            quastions.classList.remove('disabled');
        } else {
            renderQuastions(nextQuiation);
            quastions.classList.remove('disabled');
        }
        
        controlButtonNext.disabled = true;
    }

    if(event.target.classList.contains('contolButton-restart')){
        numOfQuastion.classList.remove('nonVisible');
        quastions.classList.remove('nonVisible');
        controlButtonNext.classList.remove('nonVisible');
        controlButtonRestart.classList.remove('visible');
        results.classList.remove('visible');
        count = 0;
        renderQuastions(0);
    }
});

const renderResults = (count) => {
    numOfQuastion.classList.add('nonVisible');
    quastions.classList.add('nonVisible');
    controlButtonNext.classList.add('nonVisible');
    controlButtonRestart.classList.add('visible');
    results.classList.add('visible');
    results.innerHTML = `Вы решили ${count} из ${DATA.length} вопросов.`
};

renderQuastions(0);