const colors = ['red', 'green', 'blue', 'yellow'];
let gameSequence = [];
let userSequence = [];
let level = 1;
let isPlaying = false;

const startButton = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');
const colorButtons = document.querySelectorAll('.color-btn');
const levelDisplay = document.getElementById('level-display');

function flashColor(color) {
document.body.style.backgroundColor = color;
setTimeout(() => {
    document.body.style.backgroundColor = '#fff';
}, 500);
}

function nextColor() {
return colors[Math.floor(Math.random() * colors.length)];
}

function playSequence() {
isPlaying = true;
userSequence = [];
let i = 0;

disableButtons();

const intervalId = setInterval(() => {
    if (i < gameSequence.length) {
    flashColor(gameSequence[i]);
    i++;
    } else {
    clearInterval(intervalId);
    isPlaying = false;
    enableButtons();
    }
}, 1000);
}

function startGame() {
gameSequence = [];
level = 1;
updateLevelDisplay();
nextLevel();
}

function nextLevel() {
level++;
updateLevelDisplay();
gameSequence.push(nextColor());
playSequence();
}

function updateLevelDisplay() {
levelDisplay.textContent = `Level: ${level}`;
}

function checkUserInput(color) {
if (isPlaying) return;

userSequence.push(color);
const currentStep = userSequence.length - 1;

if (userSequence[currentStep] === gameSequence[currentStep]) {
    if (userSequence.length === gameSequence.length) {
    disableButtons();
    setTimeout(() => {
        nextLevel();
    }, 1000);
    }
} else {
    alert(`Game Over! You reached level ${level}.`);
    startGame();
}
}

function disableButtons() {
colorButtons.forEach(button => {
    button.disabled = true;
});
}

function enableButtons() {
colorButtons.forEach(button => {
    button.disabled = false;
});
}

colorButtons.forEach(button => {
button.addEventListener('click', () => {
    const selectedColor = button.getAttribute('data-color');
    flashColor(selectedColor);
    checkUserInput(selectedColor);
});
});

startButton.addEventListener('click', startGame);