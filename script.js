// Element selectors
const easyBtn = document.getElementById('easy_level');
const mediumBtn = document.getElementById('medium_level');
const hardBtn = document.getElementById('hard_level');
const playBtn = document.querySelector('#play_section button');
const checkBtn = document.getElementById('check_button');
const inputField = document.getElementById('input_button');
const timeDisplay = document.getElementById('time_section');

// Game state variables
let difficulty = null;
let timeLeft = 0;
let attemptsLeft = 0;
let timerInterval = null;
let secretNumber = null;
let gameActive = false;

[easyBtn, mediumBtn, hardBtn].forEach(button => {
  button.addEventListener('click', () => {
    difficulty = button.id;

    document.querySelectorAll('.difficulty_button').forEach(btn => {
      btn.style.backgroundColor = '';
    });
    button.style.backgroundColor = '#bf0426';
  });
});

playBtn.addEventListener('click', () => {
  if (!difficulty) {
    alert('Please select a difficulty level!');
    return;
  }

  switch (difficulty) {
    case 'easy_level':
      timeLeft = 30;
      attemptsLeft = 10;
      break;
    case 'medium_level':
      timeLeft = 20;
      attemptsLeft = 5;
      break;
    case 'hard_level':
      timeLeft = 10;
      attemptsLeft = 3;
      break;
  }

  gameActive = true;
  secretNumber = Math.floor(Math.random() * 100) + 1;
  inputField.value = '';
  timeDisplay.textContent = formatTime(timeLeft);

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
});

checkBtn.addEventListener('click', () => {
  if (!gameActive) return;

  const guess = parseInt(inputField.value);

  if (isNaN(guess)) {
    alert("Please enter a valid number.");
    return;
  }

  attemptsLeft--;

  if (guess === secretNumber) {
    endGame(true);
  } else {
    if (guess < secretNumber) {
      alert("Too low!");
    } else {
      alert("Too high!");
    }

    inputField.value = ''; 

    if (attemptsLeft <= 0) {
      endGame(false);
    }
  }
});

function formatTime(seconds) {
  return `00:${seconds < 10 ? '0' + seconds : seconds}`;
}

function endGame(won) {
  clearInterval(timerInterval);
  gameActive = false;

  if (won) {
    alert(`Correct! The number was ${secretNumber}. You win!`);
  } else {
    alert(` Game over! The number was ${secretNumber}. You lost.`);
  }

  document.querySelectorAll('.difficulty_button').forEach(btn => {
    btn.style.backgroundColor = '';
  });

  difficulty = null;
}
