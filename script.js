const LETTER_MAPPING = { 'a': 'ا', 'ou': 'و', 'i': 'ي' }

const LEVEL_LETTERS = { 1: ['a', 'ou', 'i'] }

function randInt(N) {
    // returns integer between O and N-1
    return Math.floor(Math.random() * N);
}

function runlevel(level) {
    letters = LEVEL_LETTERS[level]
    document.getElementById('game-area').hidden = false;
    document.getElementById('game-area').current_level = level

    button_area = document.getElementById('button-area');
    // clearing old children
    while (button_area.firstChild) {
        button_area.removeChild(button_area.firstChild);
    }
    // adding a button for each letter in the current level
    for (let i = 0; i < letters.length; i++) {
        button = document.createElement('button');
        button.innerHTML = letters[i];
        button_area.appendChild(button);
        button.addEventListener("click", checkAnswer);
    }

    generateNewQuestion();
}

function generateNewQuestion() {
    // sets up a new question
    level = document.getElementById('game-area').current_level;
    letters = LEVEL_LETTERS[level];
    var c = document.getElementById("myCanvas");
    var cArabic = c.getContext("2d");
    cArabic.clearRect(0, 0, c.width, c.height);
    cArabic.font = "200px Arial";

    randomAnswer = letters[randInt(letters.length)];
    randomLetter = LETTER_MAPPING[randomAnswer];
    cArabic.fillText(randomLetter, 150, 150);

    document.getElementById('game-area').answer = randomAnswer;
}

function checkAnswer(e) {
    var caller = e.target || e.srcElement;
    console.log(caller);
    if (document.getElementById('game-area').answer == caller.innerHTML) {
        console.log('correct');
        document.getElementById('progress-bar').innerHTML += '+';
    } else {
        console.log('incorrect');
        document.getElementById('progress-bar').innerHTML += '-';
    }
    generateNewQuestion();
}



function hide_game_area() {
    console.log("entering hide game area().");
    document.getElementById('game-area').hidden = true;
}