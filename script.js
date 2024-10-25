const gameBoard = document.getElementById('gameBoard');
const levelText = document.getElementById('levelText');
const timerText = document.getElementById('timerText');
const overlay = document.getElementById('overlay');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let level = 2; // Start with a 2x2 grid for level 1
let matchCount = 0;
let timeLeft;
let timerInterval;

const allCards = [
    '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓',
    '🍉', '🍉', '🍒', '🍒', '🍍', '🍍', '🍑', '🍑',
    '🥝', '🥝', '🍈', '🍈', '🍋', '🍋', '🍏', '🍏',
    '🍅', '🍅', '🥥', '🥥', '🍆', '🍆', '🥕', '🥕'
];

window.onload = function() {
    alert("Welcome to the Memory Card Game!\n\n" +
          "How to Play:\n" +
          "- Flip two cards to find a matching pair.\n" +
          "- If the cards match, they will remain flipped.\n" +
          "- If they don't match, they will flip back.\n\n" +
          "Game Levels:\n" +
          "Level 1: 2x2 grid\n" +
          "Level 2: 4x4 grid\n" +
          "Level 3: 6x6 grid\n\n" +
          "Complete each level within the time limit to advance.\n" +
          "Good luck!");
};

// Shuffle cards
function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

// Initialize the game for the current level
function initializeGame() {
    resetBoard();
    gameBoard.innerHTML = ''; // Clear previous cards
    levelText.textContent = `Level: ${(level / 2) - 1}`;
    matchCount = 0;
    setTimeLimit(level); // Set time limit based on level

    let numberOfPairs = (level * level) / 2;
    const selectedCards = allCards.slice(0, numberOfPairs * 2);
    shuffle(selectedCards);

    selectedCards.forEach(cardContent => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = cardContent;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    adjustBoardSize(level);
}

// Adjust grid size and color based on level
function adjustBoardSize(level) {
    if (level === 2) {
        gameBoard.className = 'game-board level-2x2';
    } else if (level === 4) {
        gameBoard.className = 'game-board level-4x4';
    } else if (level === 6) {
        gameBoard.className = 'game-board level-6x6';
    }
}

// Set timer for the current level
function setTimeLimit(level) {
    clearInterval(timerInterval);
    timeLeft = level * 15; // 15 seconds per level
    timerText.textContent = `Time Left: ${timeLeft}s`;
    
    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerText.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showFailurePopup();
        }
    }, 1000);
}

// Show failure popup
function showFailurePopup() {
    overlay.style.display = 'flex';
}

// Flip a card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

// Check if cards match
function checkForMatch() {
    let isMatch = firstCard.textContent === secondCard.textContent;

    if (isMatch) {
        disableCards();
        matchCount++;
        if (matchCount === level * level / 2) {
            clearInterval(timerInterval);
            setTimeout(nextLevel, 1000);
        }
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Move to the next level
function nextLevel() {
    if (level < 6) {
        level += 2;
    } else {
        alert("Congratulations! You've completed all levels!");
        level = 2;
    }
    initializeGame();
}

// Retry current level
function retryLevel() {
    overlay.style.display = 'none';
    initializeGame();
}

// Quit game and return to first page
function quitGame() {
    window.location.href = 'index.html'; 
     // Redirect to first page (reload the game)
}

// Start the game with level 1
initializeGame();
