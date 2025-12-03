// Steps =>
// 1. Start the game when a key is pressed for the first time
// 2. Flash a random button + Level 1
// 3. User clicks a button => Check user and game sequence
// i. If match => Level up + Flash next button
// ii. If not match => Game Over + Restart the game

let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

// 1. Start the game when a key is pressed for the first time on the document

document.addEventListener("keypress", () => {
  if (started == false) {
    started = true;
  }

  levelUp();
});

// 2. Flash a random button + Level 1

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");

  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = []; // Reset user sequence for the new level
  level++;
  h2.innerText = `Level ${level}`;

  // Generate random button

  let randIndx = Math.floor(Math.random() * 4);
  let randColor = btns[randIndx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);

  gameFlash(randBtn);
}

// 3. User clicks a button => Check user and game sequence

function updateHighestScore() {
  level > highestScore ? (highestScore = level) : highestScore;
}

function checkAns(indx) {
  if (userSeq[indx] === gameSeq[indx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    updateHighestScore();

    h2.innerHTML = `Game Over! Your score was <b>${level}</b> </br> Your highest score is <b>${highestScore}</b> </br> Press any key to Restart`;

    document.querySelector("body").style.background = "#ff0000";

    setTimeout(() => {
      document.querySelector("body").style.background = "#ffffff";
    }, 150);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
