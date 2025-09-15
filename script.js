// --- Game State ---
let humanScore = 0;
let computerScore = 0;
let lastResult = "Game start! Make your move.";
const WIN_TARGET = 5;

const choices = ["rock", "paper", "scissor"];
const outcomeMap = {
  rock:    { rock: "draw", scissor: "win",  paper: "lose" },
  scissor: { rock: "lose", scissor: "draw", paper: "win"  },
  paper:   { rock: "win",  scissor: "lose", paper: "draw" }
};

// --- DOM refs ---
const resultRef = document.getElementById("result");
const userChoiceRef = document.getElementById("user_choice");
const compChoiceRef = document.getElementById("computer_choice");
const compScoreRef = document.getElementById("computer_score");
const userScoreRef = document.getElementById("user_score");
const resetBtn = document.getElementById("reset_btn");
const choiceButtons = Array.from(document.querySelectorAll(".choice"));

// --- Helpers ---
function getComputerChoice() {
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx];
}

function setBanner(state, text) {
  // state: 'win' | 'lose' | 'draw' | 'neutral'
  const styles = {
    win:   { bg: "var(--win-bg)",  fg: "var(--win-fg)"  },
    lose:  { bg: "var(--lose-bg)", fg: "var(--lose-fg)" },
    draw:  { bg: "var(--draw-bg)", fg: "var(--draw-fg)" },
    neutral: { bg: "#0d131a", fg: "var(--text)" }
  };
  const s = styles[state] || styles.neutral;
  resultRef.style.backgroundColor = s.bg;
  resultRef.style.color = s.fg;
  resultRef.style.border = state === "neutral" ? "1px solid #1f2833" : "none";
  resultRef.textContent = text;
}

function updateScoreboard() {
  compScoreRef.textContent = computerScore;
  userScoreRef.textContent = humanScore;
}

function disableChoices(disabled = true) {
  choiceButtons.forEach(btn => btn.disabled = disabled);
}

function checkGameOver() {
  if (humanScore >= WIN_TARGET || computerScore >= WIN_TARGET) {
    const youWon = humanScore > computerScore;
    const final = `Final Score → You: ${humanScore}, Computer: ${computerScore}`;
    setBanner(youWon ? "win" : "lose", (youWon ? "🎉 You win the game! " : "💻 Computer wins the game! ") + final);
    disableChoices(true);
    return true;
  }
  return false;
}

// --- Core round handler (fusion of both versions) ---
function playRound(humanChoice) {
  if (humanScore >= WIN_TARGET || computerScore >= WIN_TARGET) return;

  const computerChoice = getComputerChoice();

  // Update picks
  userChoiceRef.innerHTML = `You chose <span>${humanChoice.toUpperCase()}</span>`;
  compChoiceRef.innerHTML = `Computer chose <span>${computerChoice.toUpperCase()}</span>`;

  // Decide outcome
  const outcome = outcomeMap[humanChoice][computerChoice];

  if (outcome === "win") {
    humanScore++;
    lastResult = `✅ You win this round! ${humanChoice} beats ${computerChoice}.`;
    setBanner("win", "YOU WIN");
  } else if (outcome === "lose") {
    computerScore++;
    lastResult = `❌ You lose this round! ${computerChoice} beats ${humanChoice}.`;
    setBanner("lose", "YOU LOSE");
  } else {
    lastResult = `It's a tie! You both chose ${humanChoice}.`;
    setBanner("draw", "DRAW");
  }

  updateScoreboard();
  checkGameOver();
}

// --- UI wiring ---
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".choice");
  if (!btn) return;
  const choice = btn.dataset.choice; // "rock" | "paper" | "scissor"
  playRound(choice);
});

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  lastResult = "Game start! Make your move.";
  updateScoreboard();
  userChoiceRef.textContent = "";
  compChoiceRef.textContent = "";
  setBanner("neutral", lastResult);
  disableChoices(false);
}

// initial
setBanner("neutral", lastResult);
updateScoreboard();
disableChoices(false);
