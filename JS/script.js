'use strict';
var player1 = window.prompt("Enter the name of Player 1 : ");
alert("your name is : " + player1);
var player2 = window.prompt("Enter the name of Player 2 : ");
alert("your name is : " + player2);

//change name

document.querySelector('#name--0').textContent = player1;
document.querySelector('#name--1').textContent = player2;

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//Starting Conditions
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;


// Function
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
    if (playing) {

        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6 + 1);

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./Images/dice-${dice}.png`;

        // 3. Check for rolled 1:  
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch to next player
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to score of active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check if score is >= 100
        if (scores[activePlayer] >= 100) {
            playing = false;

            // Finish the Game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

            //Remove dice
            diceEl.classList.add('hidden');
        }

        //Switch the Player
        switchPlayer();
    }
});

btnNew.addEventListener('click', function () {
    // Set all variable to initial
    playing = true;
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;

    //set player one as acctive;
    if (!player0El.classList.contains('player--active')) {
        player0El.classList.add('player--active');
        player1El.classList.remove('player--active');
    }

    // Set all Score to  0 
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    // Hidden the dice Image
    diceEl.classList.add('hidden');
});