import Question from "./Question.js";
import Quiz from "./Quiz.js";

// Revealing Module Pattern
const App = (() => {
    const quizEl = document.querySelector(".quiz");
    const questionEl = document.querySelector(".question__text");
    const trackerEl = document.querySelector(".question__tracker");
    const progressInnerEl = document.querySelector(".question__progress-inner");
    const taglineEl = document.querySelector(".question__tagline");
    const answerEl = document.querySelector(".answer");
    const nextBtnEl =document.querySelector(".next");
    const restartBtnEl = document.querySelector(".restart");

    const q1 = new Question(
        "Who is the first prime minister of Malaysia?",
        ['Tunku Abdul Razak', 'Tun Dr. Mahathir', 'Tunku Abdul Rahman', 'Parameswara'],
        2
    );

    const q2 = new Question(
        "When was Javascript created?",
        ['June 1995', 'May 1995', 'July 1885', 'Sep 1996'],
        1
    );

    const q3 = new Question(
        "What does CSS stand for?",
        ['Country Sheriff Service', 'Cascading Sexy Sheet', 'Cascading Super Sheets', 'Cascading Style Sheets'],
        3
    );

    const q4 = new Question(
        "The full form of HTML is...",
        ['Hypertext Markup Language', 'Hamilton Moree Language', 'Hold The Mic', 'Hail The Moon'],
        0
    );

    const q5 = new Question(
        "console.log( typeof [] ) would return what?",
        ['Array', 'String', 'Object', 'null'],
        2
    );

    const quiz = new Quiz([q1, q2, q3, q4, q5]);

    const listeners = () => {
        nextBtnEl.addEventListener("click", function(){
            const selectedInput = document.querySelector('input[name=answer]:checked');
            if(selectedInput){
                const dataIndex = Number(selectedInput.getAttribute('data-index'));
                quiz.guess(dataIndex);
                renderAll();
            }
        });

        restartBtnEl.addEventListener('click', function(){
            //1. reset quiz
            quiz.reset();
            //2. render all
            renderAll();
            //3. restore markup
            answerEl.style.display = 'flex';
            nextBtnEl.style.display = 'inline-block';
            renderTracker();
        });
    }

    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = () => {
        const question = quiz.getCurrentQuestion().question;
        setValue(questionEl, question);
    }

    const renderAnswers = () => {
        let markup = '';
        const options = quiz.getCurrentQuestion().option;

        options.forEach((value, index) => {
            markup += `
            <div class="answer__item">
                <input type="radio" class="answer__input" name="answer" id="answer${index}" data-index='${index}'   >
                <label for="answer${index}" class="answer__label">
                    <i></i>
                    <span>${value}</span>
                </label>
            </div>
            `;
        });

        setValue(answerEl, markup);
    }

    const renderTracker = () => {
        const currentIndex = quiz.currentIndex;
        const questionLength = quiz.questions.length;
        setValue(trackerEl, `${currentIndex + 1} of ${questionLength}`);
    }

    const getPercentage = (num1, num2) => {
        return Math.round(num1 / num2 * 100);
    }

    const launch = (width, maxWidth) => {
        const loadingProgress = setInterval(function(){
            if(width > maxWidth){
                clearInterval(loadingProgress);
            }else{
                width++;
                progressInnerEl.style.width = `${width}%`;
            }
        }, );
    }

    const renderProgress = () => {
        //1. width
        const width = getPercentage(quiz.currentIndex, quiz.questions.length);
        //2. launch(0, width)
        launch(0, width);
    }

    const renderEndedScreen = () => {
        setValue(questionEl, `Great Job!`);
        setValue(trackerEl, `Complete!`);
        setValue(taglineEl, `Your score is ${getPercentage(quiz.score, quiz.questions.length)}%`);
        nextBtnEl.style.display = 'none';
        answerEl.style.display = 'none';
        renderProgress();
    }

    const renderAll = () => {
        if(quiz.hasEnded()){
            //render endscreen
            renderEndedScreen();
        }else{
            //1. render question
            renderQuestion();
            //2. render answer option
            renderAnswers();
            //3. render tracker
            renderTracker();
            //4. render progress
            renderProgress();
        }
    }

    return {
        renderAll : renderAll,
        listeners : listeners
    }

})();

App.renderAll();
App.listeners();