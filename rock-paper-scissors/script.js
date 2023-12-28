const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const choices = ["rock", "paper", "scissors"];
let scoreOfPlayer = 0;
let scoreOfComputer = 0;
let numRounds = 0;

function getComputerChoice() {
    const randomNum = Math.floor(Math.random() * 3);
    return choices[randomNum];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return "It's a tie! Try again.";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        scoreOfPlayer++;
        return `You Win! ${playerSelection} beats ${computerSelection}`;
    } else {
        scoreOfComputer++;
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
}

// Use a loop with readline.question inside the playRound function
function startGame() {
    rl.question('Rock, Paper, or Scissors?: ', function(playerSelection) {
        const computerSelection = getComputerChoice();
        console.log("Computer: " + computerSelection);
        const result = playRound(playerSelection, computerSelection);
        console.log(result);
        console.log("\n");

        // Only increment numRounds if it's not a tie
        if (!result.includes("It's a tie")) {
            numRounds++;
        }

        // Recursive call to startGame until numRounds reaches 5
        if (numRounds < 5) {
            startGame();
        } else {
            // Close the interface to exit the program
            rl.close();

            if (scoreOfPlayer > scoreOfComputer) {
                console.log("GAME RESULT: Player wins!");
            } else if (scoreOfPlayer < scoreOfComputer) {
                console.log("GAME RESULT: Computer wins!");
            } else {
                console.log("It's a tie!");
            }
        }
    });
}

// Call the startGame function
startGame();
