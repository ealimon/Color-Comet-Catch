// --- Game Configuration (Unchanged) ---
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

// --- DOM Elements (Unchanged) ---
const cosmoEmoji = document.getElementById('cosmo-emoji'); 
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');
const choiceButtonsDiv = document.getElementById('choice-buttons'); 

// --- Helper Functions (Unchanged) ---
// ... (getRandomChoices, generateButtons, and handleGuess functions remain the same) ...


/** Handles the winning condition for Game 1 and links to Game 2. (UPDATED) */
function handleWin() {
    messageElement.textContent = "🎉 MISSION COMPLETE! Unlock Game 2: Astro-Shape Sorter!";
    
    choiceButtonsDiv.innerHTML = '';
    const nextGameButton = document.createElement('button');
    nextGameButton.textContent = "Continue to Game 2 >>";
    nextGameButton.style.cssText = "padding: 15px 30px; font-size: 2em; background-color: #28a745; color: white; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 5px 0 0 #1e7e34;";
    
    // THIS IS THE CRITICAL CHANGE: Linking to the external URL
    nextGameButton.onclick = () => window.location.href = 'https://ealimon.github.io/Astro-Shape-Sorter/'; 
    
    choiceButtonsDiv.appendChild(nextGameButton);
}

/** Sets up a new round of the game. (Unchanged) */
function newRound() {
    targetColorName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    
    cosmoEmoji.style.color = COLORS[targetColorName]; 
    
    messageElement.textContent = "Find the " + targetColorName.toUpperCase() + "!";
    const choices = getRandomChoices(targetColorName);
    generateButtons(choices);
}


// --- Start the Game! (Unchanged) ---
setTimeout(newRound, 500);
