// --- Game Configuration ---
const COLORS = {
    red: '#FF4500',
    blue: '#1E90FF',
    green: '#3CB371',
    yellow: '#FFD700'
};
const COLOR_NAMES = Object.keys(COLORS);
let targetColorName = '';
let score = 0;
const SCORE_TO_WIN = 10; // Sets the goal to unlock the next game

// --- DOM Elements ---
const cosmoStar = document.getElementById('cosmo-star');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');
const choiceButtonsDiv = document.getElementById('choice-buttons');

// --- Helper Functions ---

/** Gets a random selection of three color names, including the target. */
function getRandomChoices(correctColor) {
    let choices = new Set([correctColor]);
    while (choices.size < 3) {
        // Ensure the random color is one of the defined names
        const randomColor = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
        choices.add(randomColor);
    }
    // Convert Set to Array and shuffle for button placement
    const choicesArray = Array.from(choices);
    choicesArray.sort(() => Math.random() - 0.5); 
    return choicesArray;
}

/** Generates and sets up the buttons for the current round. */
function generateButtons(choices) {
    choiceButtonsDiv.innerHTML = ''; // Clear old buttons
    choices.forEach(colorName => {
        const button = document.createElement('button');
        button.classList.add('color-button', colorName);
        
        // Use the color name as the button text for reading reinforcement
        button.textContent = colorName.toUpperCase(); 
        
        button.setAttribute('data-color', colorName);
        button.style.backgroundColor = COLORS[colorName];
        button.addEventListener('click', handleGuess);
        choiceButtonsDiv.appendChild(button);
    });
}

/** Handles the user clicking a button. */
function handleGuess(event) {
    // Disable all buttons immediately to prevent rapid clicking
    document.querySelectorAll('.color-button').forEach(btn => btn.disabled = true);
    
    const chosenColor = event.target.getAttribute('data-color');
    
    if (chosenColor === targetColorName) {
        // Correct Guess: Positive Reinforcement!
        score++;
        messageElement.textContent = "🥳 Fantastic! You caught the " + targetColorName.toUpperCase() + " Comet!";
        scoreElement.textContent = "Score: " + score;
        
        // Progression Check
        if (score >= SCORE_TO_WIN) {
            handleWin();
            return;
        }

        // Wait a moment and start the next round
        setTimeout(newRound, 1200); 

    } else {
        // Incorrect Guess: Gentle Correction
        messageElement.textContent = "Oops! Try again. Cosmo wants the " + targetColorName.toUpperCase() + " one.";
        
        // Re-enable buttons after a short delay so they can try again
        setTimeout(() => {
            document.querySelectorAll('.color-button').forEach(btn => btn.disabled = false);
        }, 800);
    }
}

/** Handles the winning condition for Game 1. */
function handleWin() {
    messageElement.textContent = "🎉 MISSION COMPLETE! Unlock Game 2: Astro-Shape Sorter!";
    
    // Create a button to transition to the next game in the series
    choiceButtonsDiv.innerHTML = '';
    const nextGameButton = document.createElement('button');
    nextGameButton.textContent = "Continue to Game 2 >>";
    nextGameButton.style.cssText = "padding: 15px 30px; font-size: 2em; background-color: #28a745; color: white; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 5px 0 0 #1e7e34;";
    
    // For a series of games, this link would point to 'game2.html' (which we'd create later)
    // nextGameButton.onclick = () => window.location.href = 'game2.html'; 
    choiceButtonsDiv.appendChild(nextGameButton);
}

/** Sets up a new round of the game. */
function newRound() {
    // 1. Pick a new random target color
    targetColorName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];

    // 2. Set the visual target (Cosmo)
    cosmoStar.style.color = COLORS[targetColorName];

    // 3. Update the instructions
    messageElement.textContent = "Find the " + targetColorName.toUpperCase() + "!";

    // 4. Generate the new set of choice buttons
    const choices = getRandomChoices(targetColorName);
    generateButtons(choices);
}


// --- Start the Game! ---
// A small delay for initial setup visibility
setTimeout(newRound, 500);
