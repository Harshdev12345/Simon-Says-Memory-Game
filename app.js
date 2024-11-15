let gameseq = [];
let userseq = [];
let started = false;
let btns = ["yellow", "red", "purple", "green"];
let level = 0;
let h2 = document.querySelector("h2");
let highscore = 1;
let highscoreDisplay = document.getElementById("highscore-display");
let coverPage = document.getElementById("cover-page");
let startButton = document.getElementById("start-button");

// Start game when "Start Game" button is clicked
startButton.addEventListener("click", function () {
    if (!started) {
        coverPage.style.display = "none";  // Hide cover page
        started = true;
        level = 1;
        levelup();  // Start the first level
    }
});

document.addEventListener("keypress", function () {
    if (!started && level === 0) {  // Game over state, before restart
        coverPage.style.display = "flex";  // Use flex to center content
        coverPage.style.opacity = "1";  // Ensure full opacity
        h2.innerHTML = "Press 'Start Game' to Begin!";  // Reset the message
        highscoreDisplay.innerText = `High Score: ${highscore}`;  // Show high score
    }

    if (!started && level > 0) {  // If the game is over, reset and start again
        reset();  // Reset the game state
        coverPage.style.display = "flex";  // Use flex to center content
        coverPage.style.opacity = "1";  // Ensure full opacity
        h2.innerHTML = "Press 'Start Game' to Begin!";  // Reset message
        highscoreDisplay.innerText = `High Score: ${highscore}`;  // Display high score
    }
});


// Function to flash the button (visual effect for the game sequence)
function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },100);
}

// Function to flash the user's clicked button (visual effect for user interaction)
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },100);
}

// Function for advancing to the next level (adding new sequence)
function levelup() {
    userseq = [];
    h2.innerText = `Level ${level}`;
    let randomindex = Math.floor(Math.random() * 4);
    let randcolor = btns[randomindex];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);  // Flash the new sequence button
    level++;  // Increase level
}

// Function to check if the user's input matches the game sequence
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 250);  // Proceed to next level if the sequence is complete
        }
    } else {
        // Update high score if necessary
        if (level > highscore) {
            highscore = level;
            highscoreDisplay.innerText = `High Score: ${highscore}`; // Update high score display
        }
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to restart `;
        document.querySelector("body").style.backgroundColor = "red"; 
        console.log("Game over ") // Flash red for game over
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "lightblue";
            reset();   // Restore background
        }, 100);
        // Reset game state
         }
}

// Function to handle button clicks by the user
function btnpress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}

// Add event listeners to all the buttons
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

// Reset the game state
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    document.querySelector("body").style.backgroundColor = "lightblue";  // Set default background color
}
