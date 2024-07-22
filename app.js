let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;
let score = 0;
let highScore = 0; // Initialize high score

const beepSound = new Audio('beep.mp3');
const bgm = new Audio('bgm.mp3');
const startSound = new Audio('start.mp3');
const btnClick = new Audio('button.mp3');
const gameOverSound = new Audio('gameover.mp3');
const levelUpSound = new Audio('lvl_up.mp3');

const h2 = document.querySelector("h2");
const highScoreElement = document.querySelector("h3");
const allBtns = document.querySelectorAll(".btn");
const body = document.querySelector("body");
let container=document.querySelector('.container');

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started!");
        startSound.play();
        started = true;
        bgm.loop = true; // Set BGM to loop
        bgm.play(); // Start playing BGM
        levelUp();
    }
});
function playMusic()
{
        bgm.play();
    
}
function pauseMusic()
{
        bgm.pause();
    
}
//  ondblclick="PlayMusic()"
// function pauseMusic()
// {
    
// }
// const musicBtn = document.querySelector(".pause");
// musicBtn.addEventListener("click", function() {
//   if (musicPlaying) {
//     bgm.pause();
//     musicBtn.style.backgroundColor = "white";
//   } else {
//     bgm.play();
//     musicBtn.style.backgroundColor = "blue";
//   }
//   musicPlaying = !musicPlaying;
// });

// musicBtn.addEventListener("mousedown", function() {
//   bgm.play();
//   musicBtn.style.backgroundColor = "blue";
//   musicPlaying = true;
// });

// musicBtn.addEventListener("mouseup", function() {
//   if (!musicPlaying) {
//     bgm.pause();
//     musicBtn.style.backgroundColor = "white";
//   }
// });

function updateHighScore() {
    highScoreElement.innerText = `High Score: ${highScore}`; // Update high score text
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);

    btnFlash(randBtn);
    beepSound.play(); // Play button click sound
    levelUpSound.play(); // Play level up sound
    score = level;
    if (score > highScore) {
        highScore = score; // Update high score if current score is higher
    }
    updateHighScore();
}

function checkAns(idx) {
    console.log("curr level: ", level);
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOverSound.play(); // Play game over sound
        bgm.pause(); // Stop BGM
        gameOverAnimation();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    btnClick.play();
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function gameOverAnimation() {
    container.style.filter = "blur(5px)"; // Blur the screen
    h2.innerText = "Game Over!";
    h2.style.fontSize = "40px";
    h2.style.color = "red";

    let colors = ["yellow", "red", "blue", "green"];
    let i = 0;
    let interval = setInterval(function () {
        body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 250); // Change background color every 250ms

    setTimeout(function () {
        clearInterval(interval);
        container.style.filter = "none"; // Remove blur
        body.style.backgroundColor = "white";
        h2.innerText = "Press any key to start";
        h2.style.fontSize = "20px";
        h2.style.color = "black";
        reset();
    }, 4000); // Reset everything after 4 seconds
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0; // Reset level to 0
    score = 0; // Reset score to 0
    bgm.currentTime = 0; // Reset BGM to start
}
function refreshPage() 
{
    location.reload();
  }
// Initialize high score display
updateHighScore();