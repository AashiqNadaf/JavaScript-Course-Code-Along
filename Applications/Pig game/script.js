'use strict';
let player0CurrentScore = document.querySelector('#current--0'),
  player0TotalScore = document.querySelector('#score--0'),
  player1CurrentScore = document.querySelector('#current--1'),
  player1TotalScore = document.querySelector('#score--1'),
  dice = document.querySelector('.dice'),
  btnNew = document.querySelector('.btn--new'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  player0 = document.querySelector('.player--0'),
  player1 = document.querySelector('.player--1');

let activePlayer = 0,
  dc = 0,
  currentScore = [0, 0],
  totalScore = [0, 0],
  diceList = [
    'dice-1.png',
    'dice-2.png',
    'dice-3.png',
    'dice-4.png',
    'dice-5.png',
    'dice-6.png',
  ];

const newGame = () => {
  currentScore = [0, 0];
  totalScore = [0, 0];
  player0CurrentScore.textContent = 0;
  player0TotalScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  player1TotalScore.textContent = 0;
  activePlayer = 0;
  if (!player0.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
};

const switchPlayer = checkOnHoldPressed => {
  // PRE SWITCHING LOGIC
  dice.setAttribute('src', diceList[0]);
  if (checkOnHoldPressed)
    totalScore[activePlayer] += currentScore[activePlayer];
  currentScore = [0, 0];
  player0CurrentScore.textContent = 0;
  player1CurrentScore.textContent = 0;

  if (activePlayer === 0) {
    player0TotalScore.textContent = totalScore[activePlayer]; // INCREMENT Total Score

    // PLAYER SWITCH LOGIC
    activePlayer = 1;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    if (player1.classList.contains('player--active'))
      player1.classList.remove('player--active');
    else player1.classList.add('player--active');
    player1TotalScore.textContent = totalScore[activePlayer];

    // PLAYER SWITCH LOGIC
    activePlayer = 0;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
};

const onDiceRoll = () => {
  dc = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  if (dc !== 1) {
    // DICE NOT EQUALS TO 1
    dice.setAttribute('src', diceList[dc - 1]);
    currentScore[activePlayer] += dc; // INCREMENT Current Score
    if (activePlayer == 0)
      player0CurrentScore.textContent = currentScore[activePlayer];
    else player1CurrentScore.textContent = currentScore[activePlayer];
  } else {
    // DICE EQUALS TO 1
    switchPlayer(false);
  }
};

// GAME START
newGame();

btnRoll.addEventListener('click', onDiceRoll);
btnNew.addEventListener('click', newGame);
btnHold.addEventListener('click', function () {
  switchPlayer(true);
});
