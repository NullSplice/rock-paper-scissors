// Function to get a random choice for the computer
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Global score variables
let humanScore = 0;
let computerScore = 0;
let lastResult = "Game start!"; // stores last round message

// Function to get the human player's choice, showing score + last result
function getHumanChoice() {
  let message = `${lastResult}\n\nScore → You: ${humanScore}, Computer: ${computerScore}\n\nEnter rock, paper, or scissors:`;
  let choice = prompt(message).toLowerCase().trim();

  // Validate input
  while (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    choice = prompt("Invalid choice. Please enter rock, paper, or scissors:").toLowerCase().trim();
  }
  return choice;
}

// Function to play a single round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    lastResult = `It's a tie! You both chose ${humanChoice}.`;
    return;
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    lastResult = `✅ You win this round! ${humanChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    lastResult = `❌ You lose this round! ${computerChoice} beats ${humanChoice}.`;
  }
}

// Function to play the game until someone reaches 5 points
function playGame() {
  humanScore = 0;
  computerScore = 0;
  lastResult = "Game start!";

  while (humanScore < 5 && computerScore < 5) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    playRound(humanChoice, computerChoice);
    console.log(lastResult);
    console.log(`Score → You: ${humanScore}, Computer: ${computerScore}\n`);
  }

  // Final result in prompt
  if (humanScore === 5) {
    alert(`🎉 You win the game!\nFinal Score → You: ${humanScore}, Computer: ${computerScore}`);
  } else {
    alert(`💻 Computer wins the game!\nFinal Score → You: ${humanScore}, Computer: ${computerScore}`);
  }
}

// Run the game
playGame();
