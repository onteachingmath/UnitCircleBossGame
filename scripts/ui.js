// ui.js - UI utility functions

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

function displayFeedback(message, isCorrect = true) {
  const feedback = document.getElementById("game-feedback");
  feedback.textContent = message;
  feedback.style.color = isCorrect ? "green" : "red";

  // Auto-clear after a few seconds
  setTimeout(() => {
    feedback.textContent = "";
    feedback.style.color = "";
  }, 2000);
}

function updateLevelHeader(level, playerName, character) {
  document.getElementById("level-title").textContent = `Level ${level}`;
  document.getElementById("player-info").textContent = `${playerName} the Daring (${character})`;
}

// Optional: Add UI helper for rendering question prompts, answer banks, etc.
function renderQuestion(promptText, answers) {
  // To be implemented for drag/drop or multiple choice
}
function showFailScreen(levelNumber) {
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = `
    <div class="level-header">
      <h2>💥 You didn’t pass Level ${levelNumber}</h2>
      <p>But don’t worry — you’ll sharpen your skills in Boot Camp ${levelNumber}!</p>
      <button id="go-to-bootcamp" class="answer-btn">Enter Boot Camp ${levelNumber}</button>
    </div>
  `;

  document.getElementById("go-to-bootcamp").addEventListener("click", () => {
    const bootcampFn = window[`runBootcamp${levelNumber}`];
    if (typeof bootcampFn === "function") {
      bootcampFn(player, () => {
        startLevel(levelNumber); // return to the level after bootcamp
      });
    } else {
      console.warn(`Bootcamp ${levelNumber} not found.`);
    }
  });
}
function renderMath(target = document.body) {
  if (window.MathJax && typeof MathJax.typesetPromise === "function") {
    MathJax.typesetPromise([target]).catch(err => {
      console.warn("⚠️ MathJax render failed:", err);
    });
  }
}

window.renderMath = renderMath;


window.showFailScreen = showFailScreen;
