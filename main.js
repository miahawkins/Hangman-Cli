// Requires the nmp inquirer and the javascript files: word and letter
var Word = require("./word.js");
var Letter = require("./letter.js");
var inquirer = require("inquirer");

// Global variables
var wordBank = ["petunia", "rose", "tulip", "orchid", "daisy", "sunflower", "lily", "lilac", "dandelion", "iris", "daffodil", "carnation", "marigold", "peony"];
var guessesRemaining = 9;
var wins = 0;
var currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);

/////////////////////////////////////////////////////////////////////////

console.log("");
console.log("Welcome to the Flower Hangman!");
console.log("------------------------------------");

function game() {
	console.log(currentWord.renderWord());
    console.log("");

    // Prompt user to guess a letter
    var prompt = (
        inquirer.prompt([{
            type: "input",
            message: "Guess a letter.",
            name: "userGuessLetter"

        }]).then(function(userResponse) {
        	var userLetter = userResponse.userGuessLetter
            currentWord.checkLetter(userLetter);
            console.log(currentWord.renderWord());

            // If the user's guessed letter is already guessed
            if (currentWord.valid) {
            	console.log("You've already guessed this letter, guess again.");
            	game();
              // Otherwise, if the word is completed log You Win and reset
            } else {
            	if (currentWord.isWordCompleted()) {
                    console.log("------------------------------------------");
            		console.log("You Win! The word is " + currentWord.renderWord());
                    console.log("------------------------------------------");
                    console.log("Next Game: Pick a letter");
            		reset();
            		newGame();
            	  // Otherwise, if the user has no guesses left, then they lose
            	} else if (guessesRemaining === 0) {
                    console.log("------------------------------------------");
            		console.log("Sorry, but you are out of gueses. The answer was " + currentWord.renderWord());
            		console.log("------------------------------------------");
                    console.log("Next Game: Pick a letter");
                    reset();
            		newGame();
            	  // If the user has guesses left, then they keep going
            	} else {
            		console.log("You have " + guessesRemaining + " left!");
            		guessesRemaining--;
            		game();
            	}
            }

        })
    );
};
game();

var newPrompt = (
        inquirer.prompt([{
            type: "list",
            message: "Would you like to play again?",
            choices: ["Yes", "No"],
            name: "playAgain"

        }]).then(newGame());

function newGame() {
    if (guessesRemaining > 0) {
        game();
    } else {
        console.log("Sorry, you have no guesses left.");
        reset();
        newGame();
    }
};

function reset() {
    guessesRemaining = 9;
    currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);

};














