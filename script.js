'use strict';

//starting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// intial conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0; // scores displayed should be zero
  score1El.textContent = 0;
  currentScore0El.textContent = 0; // so that the previous current score which was displaying can be turned to 0
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating a random dice-roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // for dynamically calling the images
    // check or rolled
    if (dice !== 1) {
      // Add the dice to the current scorec
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active palyer scrore
    scores[activePlayer] += currentScore;
    //scores[1]= scores[1]+current score;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init); // here the javaScript will the function itself we don't need to call it with using () operator

//////////////////////////////////////////////////////////////////////
// btnNew.addEventListener('click', function () {
//   if (
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.contains('player--winner')
//   ) {
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.remove('player--winner');
//   } else if (activePlayer === 1) {
//     player1El.classList.remove('player--active');
//     player0El.classList.add('player--active');
//   }

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   diceEl.classList.add('hidden');
//   currentScore = 0;
//   currentScore0El.textContent = 0; // so that the previous current score which was displaying can be turned to 0
//   currentScore1El.textContent = 0;
//   scores = [0, 0];
//   activePlayer = 0;
//   playing = true;
// });
///////////////////////////////////////////////////////////////////////////////
