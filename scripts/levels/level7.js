// Level 7: Final Boss Game - Core Setup

function runLevel7(player, handleResult) {
  const gameArea = document.getElementById("game-area");

  const questionBank = [
  // SINE (Boss Level)
  { questionLatex: '\\sin(30^\\circ)', choices: ['\\frac{1}{2}', '\\sqrt{3}', '\\frac{\\sqrt{3}}{2}', '1'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\sin(45^\\circ)', choices: ['\\frac{\\sqrt{2}}{2}', '\\frac{1}{2}', '1', '0'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\sin(60^\\circ)', choices: ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}', '1', '0'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\sin(120^\\circ)', choices: ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}', '0', '1'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\sin(135^\\circ)', choices: ['\\frac{\\sqrt{2}}{2}', '1', '\\frac{1}{2}', '0'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\sin(150^\\circ)', choices: ['\\frac{1}{2}', '1', '\\frac{\\sqrt{3}}{2}', '0'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\sin(210^\\circ)', choices: ['-\\frac{1}{2}', '\\frac{1}{2}', '-\\sqrt{3}', '0'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\sin(225^\\circ)', choices: ['-\\frac{\\sqrt{2}}{2}', '\\frac{1}{2}', '-1', '0'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\sin(240^\\circ)', choices: ['-\\frac{\\sqrt{3}}{2}', '-\\frac{1}{2}', '0', '-1'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\sin(270^\\circ)', choices: ['-1', '0', '-\\frac{1}{2}', '\\frac{1}{2}'], correctIndex: 0, topic: 'special-angles' },

  // COSINE (Boss Level)
  { questionLatex: '\\cos(30^\\circ)', choices: ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}', '0', '1'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\cos(45^\\circ)', choices: ['\\frac{\\sqrt{2}}{2}', '\\frac{1}{2}', '1', '0'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\cos(60^\\circ)', choices: ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '0', '1'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\cos(90^\\circ)', choices: ['0', '1', '-1', '\\frac{1}{2}'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\cos(120^\\circ)', choices: ['-\\frac{1}{2}', '-\\frac{\\sqrt{3}}{2}', '0', '1'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\cos(135^\\circ)', choices: ['-\\frac{\\sqrt{2}}{2}', '-\\frac{1}{2}', '0', '1'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\cos(150^\\circ)', choices: ['-\\frac{\\sqrt{3}}{2}', '-\\frac{1}{2}', '0', '1'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\cos(180^\\circ)', choices: ['-1', '0', '-\\frac{1}{2}', '1'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\cos(225^\\circ)', choices: ['-\\frac{\\sqrt{2}}{2}', '-1', '0', '\\frac{1}{2}'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\cos(240^\\circ)', choices: ['-\\frac{1}{2}', '-\\frac{\\sqrt{3}}{2}', '0', '-1'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\cos(270^\\circ)', choices: ['0', '1', '-1', '\\frac{1}{2}'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\cos(315^\\circ)', choices: ['\\frac{\\sqrt{2}}{2}', '1', '\\frac{1}{2}', '0'], correctIndex: 0, topic: 'reference-angles' },

  // TANGENT (Boss Level)
  { questionLatex: '\\tan(30^\\circ)', choices: ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{\\sqrt{3}}', '1', '0'], correctIndex: 1, topic: 'special-angles' },
  { questionLatex: '\\tan(45^\\circ)', choices: ['1', '\\sqrt{3}', '\\frac{\\sqrt{3}}{2}', '0'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\tan(60^\\circ)', choices: ['\\sqrt{3}', '1', '\\frac{\\sqrt{3}}{2}', '2'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\tan(90^\\circ)', choices: ['\\text{undefined}', '1', '\\sqrt{3}', '0'], correctIndex: 0, topic: 'special-angles' },
  { questionLatex: '\\tan(120^\\circ)', choices: ['-\\sqrt{3}', '-1', '-\\frac{\\sqrt{3}}{2}', '0'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\tan(135^\\circ)', choices: ['-1', '-\\sqrt{3}', '-\\frac{\\sqrt{3}}{2}', '0'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\tan(240^\\circ)', choices: ['\\sqrt{3}', '1', '\\frac{\\sqrt{3}}{2}', '-1'], correctIndex: 0, topic: 'reference-angles' },
  { questionLatex: '\\tan(300^\\circ)', choices: ['-\\sqrt{3}', '-1', '-\\frac{\\sqrt{3}}{2}', '0'], correctIndex: 0, topic: 'reference-angles' },

  // INVERSE TRIG (NEW, 10 Questions)
  { questionLatex: '\\arcsin\\left(\\frac{1}{2}\\right)', choices: ['30^\\circ', '150^\\circ', '330^\\circ', '60^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arcsin\\left(-\\frac{1}{2}\\right)', choices: ['330^\\circ', '30^\\circ', '210^\\circ', '60^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arcsin\\left(\\frac{\\sqrt{2}}{2}\\right)', choices: ['45^\\circ', '135^\\circ', '225^\\circ', '60^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arcsin\\left(-\\frac{\\sqrt{2}}{2}\\right)', choices: ['315^\\circ', '45^\\circ', '225^\\circ', '300^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arccos\\left(\\frac{1}{2}\\right)', choices: ['60^\\circ', '120^\\circ', '30^\\circ', '300^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arccos\\left(-\\frac{1}{2}\\right)', choices: ['120^\\circ', '60^\\circ', '240^\\circ', '45^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arccos(0)', choices: ['90^\\circ', '180^\\circ', '0^\\circ', '60^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arctan(1)', choices: ['45^\\circ', '135^\\circ', '30^\\circ', '60^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arctan\\left(\\sqrt{3}\\right)', choices: ['60^\\circ', '30^\\circ', '45^\\circ', '120^\\circ'], correctIndex: 0, topic: 'inverse-trig' },
  { questionLatex: '\\arctan(-1)', choices: ['315^\\circ', '45^\\circ', '225^\\circ', '120^\\circ']
    , correctIndex: 0, topic: 'inverse-trig' }
];
  let selectedQuestions = [];
  let currentQuestionIndex = 0;
  let correctCount = 0;
  let incorrectTopics = [];
  let timeLeft = 30;
  let timerInterval;
  let failedAttempts = 0;

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function startTimer(durationInSeconds = 30) {
    const startTime = performance.now();
    const endTime = startTime + durationInSeconds * 1000;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      const now = performance.now();
      const remaining = Math.ceil((endTime - now) / 1000);

      if (remaining >= 0) {
        const timerEl = document.getElementById("timer");
        if (timerEl) timerEl.textContent = `⏱️ ${remaining}s`;
      }

      if (remaining <= 0) {
        clearInterval(timerInterval);
        showGetReady("⏱️ Time's up!");
      }
    }, 100);
  }

  function waitForTimerAndStart() {
    const timerEl = document.getElementById("timer");
    if (timerEl) {
      startTimer();
    } else {
      setTimeout(waitForTimerAndStart, 50);
    }
  }

  function showGetReady(message) {
    gameArea.innerHTML = `<div class='level-header'><p>${message}</p><p>⚔️ Prepare for your next challenge...</p></div>`;
    setTimeout(() => {
      handleAnswer(null);
    }, 3000);
  }

  function renderQuestion() {
    const q = selectedQuestions[currentQuestionIndex];

    const originalChoices = [...q.choices];
    const shuffledChoices = shuffleArray(originalChoices);
    const newCorrectIndex = shuffledChoices.indexOf(q.choices[q.correctIndex]);
    q.choices = shuffledChoices;
    q.correctIndex = newCorrectIndex;

    gameArea.innerHTML = `
      <div class="level-header">
        <h2>Final Boss Level 7: Timed Unit Circle Challenge</h2>
        <div id="timer">⏱️ 30s</div>
        <p>Question ${currentQuestionIndex + 1} of 10:</p>
        <div class="question">\( ${q.questionLatex} \)</div>
        <div class="answers" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px;">
          ${q.choices.map((c, i) => `<button class="answer-btn" data-index="${i}" style="min-width: 140px; padding: 12px 16px; font-size: 1.1em;">\( ${c} \)</button>`).join("")}
        </div>
      </div>
    `;

    if (window.MathJax && MathJax.typesetPromise && MathJax.typesetClear) {
      MathJax.typesetClear([gameArea]);
      MathJax.typesetPromise([gameArea]).catch(err => console.error("MathJax typeset failed:", err));
    }

    waitForTimerAndStart();

    document.querySelectorAll(".answer-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        clearInterval(timerInterval);
        document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);
        handleAnswer(parseInt(btn.dataset.index));
      });
    });
  }

  function handleAnswer(selectedIndex) {
    if (currentQuestionIndex >= selectedQuestions.length) return;

    const q = selectedQuestions[currentQuestionIndex];
    if (selectedIndex === q.correctIndex) {
      correctCount++;
    } else {
      incorrectTopics.push(q.topic);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
      renderQuestion();
    } else {
      showFinalResults();
    }
  }

  function suggestBootcamp() {
    const freq = incorrectTopics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0].replace(/-/g, ' ') : "general review";
  }

  function showFinalResults() {
    const passed = correctCount >= 8;
    if (!passed) failedAttempts++;
    const recommendation = failedAttempts >= 2 ? suggestBootcamp() : null;

    let resultHTML = `
      <div class="level-header">
        <h2>🎯 Final Boss Level 7 Results</h2>
        <h3>Your Score: ${correctCount} / 10</h3>
    `;

    if (passed) {
      resultHTML += `<p>🏆 You are victorious, math warrior!</p>`;
      generateVictoryPDF();
    } else {
      resultHTML += `<p>⚠️ You must train further.</p>`;
      if (recommendation) {
        resultHTML += `<p>💡 Recommended Boot Camp: <strong>${recommendation}</strong></p>`;
      }
      resultHTML += `<button id="retry-btn" class="answer-btn" style="margin-top: 20px; font-size: 1.2em;">🔁 Try Again</button>`;
    }

    resultHTML += `</div>`;
    gameArea.innerHTML = resultHTML;

    if (!passed) {
      document.getElementById("retry-btn").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        selectedQuestions = shuffleArray(questionBank).slice(0, 10);
        currentQuestionIndex = 0;
        correctCount = 0;
        incorrectTopics = [];
        renderQuestion();
      });
    }

    handleResult(passed ? "correct" : "incorrect");
  }

  function generateVictoryPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const date = new Date().toLocaleString();
    const topicSummary = incorrectTopics.length === 0 
      ? "None! All topics mastered." 
      : [...new Set(incorrectTopics)].join(", ");
    const name = player.name || "Unknown Hero";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Final Boss Level 7 Victory Scroll", 20, 20);

    doc.setFontSize(14);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Date: ${date}`, 20, 38);
    doc.text(`Final Score: ${correctCount} / 10`, 20, 46);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Topics to Review (if any):", 20, 58);
    doc.text(topicSummary, 20, 66);

    doc.setFont("courier", "bold");
    doc.setFontSize(16);
    doc.text("You conquered the Unit Circle Boss Challenge!", 20, 85);
    doc.setFont("courier", "italic");
    doc.text("Well done, math warrior!", 20, 95);

    doc.save("Level7_Victory_Report.pdf");
  }

  selectedQuestions = shuffleArray(questionBank).slice(0, 10);
  renderQuestion();
}
