// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e) {
  if(e.target.className === "play-again"){
    window.location.reload();
  }
})

// listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    // Check if won
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is true. You won!`)
    } else {
      // Wrong number
      guessesLeft--;
      if (guessesLeft === 0) {
        // Game over - lost
        gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
      } else {
        // Game continues - answer wrong
    
        guessInput.value = "";
        setMessage(`You are wrong. There left ${guessesLeft} guesses`, "red");
      }
    }
  } 
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = "green" : color = "red";
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get Random Num
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
