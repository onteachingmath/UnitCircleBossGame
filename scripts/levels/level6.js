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
    let correct = 0;
let incorrect = 0;


    gameArea.innerHTML = `
      <div class="level-header">
        <h2>Level 6: Match the Exact Trig Values (Degrees)</h2>
        <p class="instructions">Click a trig expression, then click its matching value. One match at a time. Correct expressions disappear, answers stay!</p>
        <div id="score-card">
  ✅ Correct: <span id="correct-count">${correct}</span> / 6<br>
  ❌ Incorrect: <span id="incorrect-count">${incorrect}</span> / 3
</div>

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
          background: black;
          border: 2px solidrgb(2, 2, 2);
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
  background: #fdf6e3;
  color: black;
  border: 2px solid #d2b48c;
  border-radius: 10px;
  font-weight: bold;
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
  margin: 40px auto 20px auto;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: bold;
  background-color: #10b981;
  color: black;
  border: 2px solid white;
  border-radius: 12px;
  box-shadow: 0 0 10px white;
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
        correct++;
        document.getElementById("correct-count").textContent = correct;
    
        if (correct === 6) {
          showVictoryMessage();
          handleResult("correct");
          return;
        }
      } else {
        incorrect++;
        document.getElementById("incorrect-count").textContent = incorrect;
    
        selectedExpression.classList.add("incorrect");
        selectedAnswer.classList.add("incorrect");
    
        setTimeout(() => {
          selectedExpression.classList.remove("incorrect");
          selectedAnswer.classList.remove("incorrect");
        }, 1000);
    
        if (incorrect >= 3) {
          gameArea.innerHTML = `
            <div class="fail-screen" style="text-align: center; margin-top: 50px; color: black;">
              <h2>💥 Too many mistakes!</h2>
              <p>Let’s sharpen your skills in Boot Camp 6.</p>
              <button id="go-to-bootcamp6" class="answer-btn" style="margin-top: 20px;">Go to Boot Camp 6 🧠</button>
            </div>
          `;
        
          document.getElementById("go-to-bootcamp6").addEventListener("click", () => {
            window.runBootcamp6(player, () => {
              player.correct = 0;
              player.incorrect = 0;
              runLevel6(player, handleResult);
            });
          });
        
          return;
        }
        
      }
    
      if (selectedExpression) selectedExpression.classList.remove("selected");
if (selectedAnswer) selectedAnswer.classList.remove("selected");
selectedExpression = null;
selectedAnswer = null;

    });
    
    
  }

  currentQuestions = getRandomSubset(fullQuestionBank, 6);
  renderLevel(currentQuestions);
}