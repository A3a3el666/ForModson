"use strict";

let sumTime;
let time;
let count;
let numberOfTrueAnswers = 0;
let numOfSelectedAnswers = 0;
let checkCorrect = 0;
let nextQuestion;
let progressWidth = 0;

const LS = localStorage;

const quiz = document.getElementById('quiz');
const footer = document.getElementById('footer');
const quizControls = document.getElementById('quizControls');
const topMenu = document.getElementById('topMenu');
const timer = document.getElementById('timer');
const toggleBox = document.getElementById('toggle');
const toggle = document.getElementById('toggle-input');
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

    if(time < 1 && JSON.parse(LS.getItem('CurrentState')) != (DATA.length + 1)){
        if(DATA.length === nextQuestion){
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            renderResults(count);
            progress();
            questions.classList.remove('disabled');
        } else {
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            time = 10;
            renderQuestions(nextQuestion);
            progress();
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
});

quizControls.addEventListener('click',(event) =>{
    if(event.target.classList.contains('controlButton-next')){
        if(checkCorrect/numberOfTrueAnswers === 1){
            count++;
            LS.setItem('Count',JSON.stringify(count));
            checkCorrect = 0;
        }

        if(DATA.length === nextQuestion){
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            renderResults(count);
            progress(); 
            questions.classList.remove('disabled');
        } else {
            sumTime += (10 - time);
            LS.setItem('SumTime', JSON.stringify(sumTime));
            time = 10;
            renderQuestions(nextQuestion);
            progress(); 
            questions.classList.remove('disabled');
        }

        controlButtonNext.disabled = true;
    }

    if(event.target.classList.contains('controlButton-restart')){
        toggleBox.classList.remove('nonVisible');
        timer.classList.remove('nonVisible');
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
        progress();
    }
});

topMenu.addEventListener('change', (event) => {

    if(event.target.classList.contains('toggle-input')){
        if(event.target.checked){
            document.body.style.backgroundImage = 'url(assets/quizBGdark.jpg)';
            footer.classList.add('darkTheme');
            quiz.classList.add('darkTheme');
            timer.classList.add('btnDarkTheme');
            controlButtonNext.classList.add('btnDarkTheme');
            controlButtonRestart.classList.add('btnDarkTheme');
        }else{
            document.body.style.backgroundImage = 'url(assets/quizBGdefault.jpg)';
            footer.classList.remove('darkTheme');
            quiz.classList.remove('darkTheme');
            timer.classList.remove('btnDarkTheme');
            controlButtonNext.classList.remove('btnDarkTheme');
            controlButtonRestart.classList.remove('btnDarkTheme');
        }
    }

});

const toggleTheme = () => {
    const isChecked = toggle.checked;
    localStorage.setItem('theme',isChecked ? 'dark-theme' : '');
  };

const themeSave = (theme) => {
    if(theme === 'dark-theme'){
        document.body.style.backgroundImage = 'url(assets/quizBGdark.jpg)';
        footer.classList.add('darkTheme');
        quiz.classList.add('darkTheme');
        timer.classList.add('btnDarkTheme');
        controlButtonNext.classList.add('btnDarkTheme');
        controlButtonRestart.classList.add('btnDarkTheme');
    }
};

const renderResults = (count) => {
    toggleBox.classList.add('nonVisible');
    timer.classList.add('nonVisible');
    numOfQuestion.classList.add('nonVisible');
    questions.classList.add('nonVisible');
    controlButtonNext.classList.add('nonVisible');
    controlButtonRestart.classList.add('visible');
    results.classList.add('visible');

    let finishTime = JSON.parse(LS.getItem('SumTime'));
    count = JSON.parse(LS.getItem('Count'));

    let seconds = finishTime % 60;
    let minutes = Math.floor(finishTime / 60);

    if(finishTime >= 60){
        results.innerHTML = `<p class="result">Вы решили ${count} из ${DATA.length} вопросов за ${minutes} минуту и ${seconds} секунд.</p>`
    }else {
        results.innerHTML = `<p class="result">Вы решили ${count} из ${DATA.length} вопросов за ${seconds} секунд.</p>`
    }

    LS.setItem('CurrentState',JSON.stringify(DATA.length+1));
};

 function progress () {
    let line = document.getElementById('progress-line');
    let currentProgress = JSON.parse(LS.getItem('CurrentState'));
    progressWidth = currentProgress > DATA.length ? 100 : 
    Math.round((currentProgress / DATA.length) * 100);
    line.style.width = progressWidth + '%';
}

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
themeSave(LS.getItem('theme'));
toggle.checked = LS.getItem('theme');
toggle.addEventListener('input', toggleTheme); 
toggleTheme();
progress();

setInterval(updateTimer,1000);





  
  