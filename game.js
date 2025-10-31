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

// --- DOM Elements (UPDATED) ---
// We now target the new 'color-spot' instead of the old 'cosmo-star'
const colorSpot = document.getElementById('color-spot'); 
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');
const choiceButtonsDiv = document.getElementById('choice-buttons'); 

// --- Helper Functions ---
// (getRandomChoices, generateButtons, and handleGuess functions remain the same)
// ...

/** Handles the winning condition for Game 1 and links to Game 2. */
function handleWin() {
    messageElement.textContent = "🎉 MISSION COMPLETE! Unlock Game 2: Astro-Shape Sorter!";
    
    choiceButtonsDiv.innerHTML = '';
    const nextGameButton = document.createElement('button');
    nextGameButton.textContent = "Continue to Game 2 >>";
    nextGameButton.style.cssText = "padding: 15px 30px; font-size: 2em; background-color: #28a745; color: white; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 5px 0 0 #1e7e34;";
    
    // THIS IS THE LINK TO THE NEXT GAME FILE
    nextGameButton.onclick = () => window.location.href = 'game2.html'; 
    
    choiceButtonsDiv.appendChild(nextGameButton);
}

/** Sets up a new round of the game. (UPDATED) */
function newRound() {
    targetColorName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    
    // CHANGE IS HERE: Now coloring the background of the colorSpot DIV
    colorSpot.style.backgroundColor = COLORS[targetColorName]; 
    
    messageElement.textContent = "Find the " + targetColorName.toUpperCase() + "!";
    const choices = getRandomChoices(targetColorName);
    generateButtons(choices);
}


// --- Start the Game! ---
setTimeout(newRound, 500);
