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
const SCORE_TO_WIN = 10; 

// --- DOM Elements ---
const cosmoEmoji = document.getElementById('cosmo-emoji'); 
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');
const choiceButtonsDiv = document.getElementById('choice-buttons'); 

// --- Helper Functions ---

/** Gets a random selection of three color names, including the target. */
function getRandomChoices(correctColor) {
    let choices = new Set([correctColor]);
    while (choices.size < 3) {
        const randomColor = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
        choices.add(randomColor);
    }
    const choicesArray = Array.from(choices);
    choicesArray.sort(() => Math.random() - 0.5); 
    return choicesArray;
}

/** Generates and sets up the buttons for the current round. */
function generateButtons(choices) {
    choiceButtonsDiv.innerHTML = ''; 
    choices.forEach(colorName => {
        const button = document.createElement('button');
        button.classList.add('color-button', colorName);
        button.textContent = colorName.toUpperCase(); 
        button.setAttribute('data-color', colorName);
        button.style.backgroundColor = COLORS[colorName];
        button.addEventListener('click', handleGuess);
        choiceButtonsDiv.appendChild(button);
    });
}

/** Handles the user clicking a button. */
function handleGuess(event) {
    document.querySelectorAll('.color-button').forEach(btn => btn.disabled = true);
    
    const chosenColor = event.target.getAttribute('data-color');
    
    if (chosenColor === targetColorName) {
        score++;
        messageElement.textContent = "🥳 Fantastic! You caught the " + targetColorName.toUpperCase() + " Comet!";
        scoreElement.textContent = "Score: " + score;
        
        if (score >= SCORE_TO_WIN) {
            handleWin();
            return;
        }

        setTimeout(newRound, 1200); 

    } else {
        messageElement.textContent = "Oops! Try again. Cosmo wants the " + targetColorName.toUpperCase() + " one.";
        
        setTimeout(() => {
            document.querySelectorAll('.color-button').forEach(btn => btn.disabled = false);
        }, 800);
    }
}

/** Handles the winning condition for Game 1 and links to Game 2. (FINAL LINK) */
function handleWin() {
    messageElement.textContent = "🎉 MISSION COMPLETE! Unlock Game 2: Astro-Shape Sorter!";
    
    choiceButtonsDiv.innerHTML = '';
    const nextGameButton = document.createElement('button');
    nextGameButton.textContent = "Continue to Game 2 >>";
    nextGameButton.style.cssText = "padding: 15px 30px; font-size: 2em; background-color: #28a745; color: white; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 5px 0 0 #1e7e34;";
    
    // CRITICAL LINK: Directs the player to your Game 2 repository's page
    nextGameButton.onclick = () => window.open('https://ealimon.github.io/Astro-Shape-Sorter/', '_self'); 
    
    choiceButtonsDiv.appendChild(nextGameButton);
}

/** Sets up a new round of the game. */
function newRound() {
    targetColorName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    
    // Colors the emoji itself
    cosmoEmoji.style.color = COLORS[targetColorName]; 
    
    messageElement.textContent = "Find the " + targetColorName.toUpperCase() + "!";
    const choices = getRandomChoices(targetColorName);
    generateButtons(choices);
}


// --- Start the Game! ---
setTimeout(newRound, 500);
