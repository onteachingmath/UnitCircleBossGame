function runLevel6(player, handleResult) {
  const gameArea = document.getElementById("game-area");
  let score = 0;
  const fullQuestionBank = [
    { expression: '\\sin(30^\\circ)', answer: '\\frac{1}{2}' },
    { expression: '\\cos(60^\\circ)', answer: '\\frac{1}{2}' },
    { expression: '\\tan(45^\\circ)', answer: '1' },
    { expression: '\\cos(180^\\circ)', answer: '-1' },
    { expression: '\\sin(150^\\circ)', answer: '\\frac{1}{2}' },
    { expression: '\\cos(120^\\circ)', answer: '-\\frac{1}{2}' },
    { expression: '\\tan(135^\\circ)', answer: '-1' },
    { expression: '\\sin(225^\\circ)', answer: '-\\frac{\\sqrt{2}}{2}' },
    { expression: '\\cos(315^\\circ)', answer: '\\frac{\\sqrt{2}}{2}' },
    { expression: '\\tan(240^\\circ)', answer: '\\sqrt{3}' },
    { expression: '\\sin(270^\\circ)', answer: '-1' },
    { expression: '\\tan(90^\\circ)', answer: '\\text{undefined}' }
  ];

  let currentQuestions = [];

  function getRandomSubset(arr, size) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }

  function showVictoryMessage() {
  const celebration = document.createElement("div");
  celebration.innerHTML = `
    <div class="victory-overlay">
      <div class="victory-message">
        🎉 You conquered Level 6! 🎉<br>Well done, math warrior!
        <br><br>
        <button id="next-boss-btn">Ready for the Final Boss Challenge?</button>
      </div>
    </div>
  `;
  document.body.appendChild(celebration);

  document.getElementById("next-boss-btn").addEventListener("click", () => {
    const overlay = document.querySelector(".victory-overlay");
    overlay.style.transition = "opacity 0.5s ease";
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
      runLevel7(player, handleResult); // 🔥 this triggers the next level
    }, 600);
  });
}


  function renderLevel(questions) {
    const allAnswers = [...new Set(questions.map(q => q.answer))].sort(() => 0.5 - Math.random());

    gameArea.innerHTML = `
      <div class="level-header">
        <h2>Level 6: Match the Exact Trig Values (Degrees)</h2>
        <p class="instructions">Click a trig expression, then click its matching value. One match at a time. Correct expressions disappear, answers stay!</p>
        <div id="score-card">Score: <span id="score-count">${score}</span> / 6</div>
        <div id="match-grid">
          <div class="column expressions">
            ${questions.map((q, i) => `<div class="match-item expression" data-index="${i}" data-answer="${q.answer}">\\( ${q.expression} \\)</div>`).join('')}
          </div>
          <div class="column answers">
            ${allAnswers.map(a => `<div class="match-item answer" data-value="${a}">\\( ${a} \\)</div>`).join('')}
          </div>
        </div>
        <button id="submit-btn">Submit Match</button>
      </div>

      <style>
        .level-header {
          text-align: center;
          padding: 15px;
          margin-bottom: 20px;
          background: #f0f9ff;
          border: 2px solid #38bdf8;
          border-radius: 10px;
        }
        .instructions {
          font-weight: bold;
          margin-bottom: 10px;
        }
        #score-card {
          font-size: 18px;
          margin-bottom: 15px;
        }
        #match-grid {
          display: flex;
          justify-content: space-around;
          gap: 40px;
          padding: 20px;
        }
        .column {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .match-item {
          padding: 12px;
          background: #e0f2fe;
          border: 1px solid #60a5fa;
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s ease-in-out;
        }
        .match-item.selected {
          background-color: #d1fae5 !important;
          border-color: #059669;
        }
        .match-item.correct {
          background-color: #a7f3d0;
          border-color: #10b981;
        }
        #submit-btn {
          margin-top: 20px;
          padding: 10px 20px;
          font-weight: bold;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .victory-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .victory-message {
          color: white;
          font-size: 2rem;
          background: #10b981;
          padding: 30px 40px;
          border-radius: 20px;
          box-shadow: 0 0 20px #10b981;
          text-align: center;
          max-width: 80vw;
        }
      </style>
    `;

    MathJax.typesetPromise();

    let selectedExpression = null;
    let selectedAnswer = null;

    document.querySelectorAll('.expression').forEach(expr => {
      expr.addEventListener('click', () => {
        if (expr.classList.contains('selected')) {
          expr.classList.remove('selected');
          selectedExpression = null;
        } else {
          document.querySelectorAll('.expression').forEach(e => e.classList.remove('selected'));
          expr.classList.add('selected');
          selectedExpression = expr;
        }
      });
    });

    document.querySelectorAll('.answer').forEach(ans => {
      ans.addEventListener('click', () => {
        if (ans.classList.contains('selected')) {
          ans.classList.remove('selected');
          selectedAnswer = null;
        } else {
          document.querySelectorAll('.answer').forEach(a => a.classList.remove('selected'));
          ans.classList.add('selected');
          selectedAnswer = ans;
        }
      });
    });

    document.getElementById("submit-btn").addEventListener("click", () => {
      if (!selectedExpression || !selectedAnswer) return;

      const correctAnswer = selectedExpression.dataset.answer;
      const chosenAnswer = selectedAnswer.dataset.value;

      if (correctAnswer === chosenAnswer) {
        selectedExpression.remove();
        score++;
        document.getElementById("score-count").textContent = score;
        if (score === 6) {
          showVictoryMessage();
          handleResult("correct");
        }
      }

      selectedExpression.classList.remove("selected");
      selectedAnswer.classList.remove("selected");
      selectedExpression = null;
      selectedAnswer = null;
    });
  }

  currentQuestions = getRandomSubset(fullQuestionBank, 6);
  renderLevel(currentQuestions);
}