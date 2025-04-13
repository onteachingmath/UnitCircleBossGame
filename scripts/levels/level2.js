// level2.js - Drag the dot to the correct coordinate pair (Exact Values with LaTeX rendering)

function runLevel2(player, callback) {
  console.log("✅ runLevel2() called");
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";
  gameArea.style.background = "black";
  gameArea.style.border = "4px solid #333";
  gameArea.style.borderRadius = "12px";
  gameArea.style.padding = "20px";
  gameArea.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";

  if (!player.usedCoords) {
    player.usedCoords = [];
  }

  const coordinateBank = [
    { angle: 0,     coords: ["1", "0"] },
    { angle: 30,    coords: ["\\frac{\\sqrt{3}}{2}", "\\frac{1}{2}"] },
    { angle: 45,    coords: ["\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{2}}{2}"] },
    { angle: 60,    coords: ["\\frac{1}{2}", "\\frac{\\sqrt{3}}{2}"] },
    { angle: 90,    coords: ["0", "1"] },
    { angle: 120,   coords: ["-\\frac{1}{2}", "\\frac{\\sqrt{3}}{2}"] },
    { angle: 135,   coords: ["-\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{2}}{2}"] },
    { angle: 150,   coords: ["-\\frac{\\sqrt{3}}{2}", "\\frac{1}{2}"] },
    { angle: 180,   coords: ["-1", "0"] },
    { angle: 210,   coords: ["-\\frac{\\sqrt{3}}{2}", "-\\frac{1}{2}"] },
    { angle: 225,   coords: ["-\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{2}}{2}"] },
    { angle: 240,   coords: ["-\\frac{1}{2}", "-\\frac{\\sqrt{3}}{2}"] },
    { angle: 270,   coords: ["0", "-1"] },
    { angle: 300,   coords: ["\\frac{1}{2}", "-\\frac{\\sqrt{3}}{2}"] },
    { angle: 315,   coords: ["\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{2}}{2}"] },
    { angle: 330,   coords: ["\\frac{\\sqrt{3}}{2}", "-\\frac{1}{2}"] },
  ];

  const remaining = coordinateBank.filter(obj => !player.usedCoords.includes(obj.angle));
  if (remaining.length === 0) {
    player.usedCoords = [];
    remaining.push(...coordinateBank);
  }

  const next = remaining[Math.floor(Math.random() * remaining.length)];
  player.usedCoords.push(next.angle);

  const prompt = document.createElement("h3");
  prompt.innerHTML = `🎯 Drag the dot to where \\((${next.coords[0]}, ${next.coords[1]})\\) belongs.`;

  prompt.style.textAlign = "center";
  prompt.style.fontFamily = "Verdana, sans-serif";
  prompt.style.color = "white";
  gameArea.appendChild(prompt);

  if (typeof MathJax !== "undefined") {
    MathJax.typesetPromise([prompt]);
  }

  const circle = createUnitCircle({ showTicks: true, showAngleLabels: true });
  circle.style.boxShadow = "inset 0 0 8px rgba(0, 0, 0, 0.2)";
  circle.style.background = "black";
  gameArea.appendChild(circle);

  const dot = document.createElement("div");
  dot.id = "draggable-dot";
  dot.style.width = "20px";
  dot.style.height = "20px";
  dot.style.background = "red";
  dot.style.border = "2px solid white";
  dot.style.borderRadius = "50%";
  dot.style.position = "absolute";
  dot.style.cursor = "grab";
  dot.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";
  dot.style.zIndex = "5"; // ✅ Make sure it appears on top

  const centerX = 150;
  const centerY = 150;
  dot.style.left = `${centerX - 10}px`;
  dot.style.top = `${centerY - 10}px`;

  circle.appendChild(dot);

  const scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score-display";
  scoreDisplay.style.textAlign = "center";
  scoreDisplay.style.marginTop = "10px";
  scoreDisplay.style.fontFamily = "monospace";
  scoreDisplay.style.fontSize = "16px";
  scoreDisplay.style.color = "white";

  scoreDisplay.textContent = `✅ Correct: ${player.correct} | ❌ Incorrect: ${player.incorrect}`;
  gameArea.appendChild(scoreDisplay);
// ✅ Re-render MathJax for all LaTeX
if (window.MathJax && window.MathJax.typesetPromise) {
  renderMath(gameArea);

}

  const feedbackBox = document.createElement("div");
  feedbackBox.id = "feedback-box";
  feedbackBox.style.position = "absolute";
  feedbackBox.style.top = "50%";
  feedbackBox.style.left = "50%";
  feedbackBox.style.transform = "translate(-50%, -50%)";
  feedbackBox.style.padding = "20px";
  feedbackBox.style.border = "3px solid black";
  feedbackBox.style.background = "#fff";
  feedbackBox.style.display = "none";
  feedbackBox.style.zIndex = "10";
  feedbackBox.style.textAlign = "center";
  feedbackBox.style.fontSize = "20px";
  feedbackBox.style.fontFamily = "Arial, sans-serif";
  feedbackBox.style.borderRadius = "10px";
  feedbackBox.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
  gameArea.appendChild(feedbackBox);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "✅ Submit Answer";
  submitBtn.style.display = "block";
  submitBtn.style.margin = "20px auto";
  submitBtn.style.padding = "10px 20px";
  submitBtn.style.fontSize = "16px";
  submitBtn.style.background = "#007bff";
  submitBtn.style.color = "white";
  submitBtn.style.border = "none";
  submitBtn.style.borderRadius = "8px";
  submitBtn.style.cursor = "pointer";
  submitBtn.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
  gameArea.appendChild(submitBtn);

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  dot.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const rect = circle.getBoundingClientRect();
      const x = e.clientX - rect.left - offsetX;
      const y = e.clientY - rect.top - offsetY;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  submitBtn.onclick = () => {
    const dotX = parseInt(dot.style.left) + 10;
    const dotY = parseInt(dot.style.top) + 10;
    const dx = dotX - centerX;
    const dy = centerY - dotY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    const diff = Math.min(
      Math.abs(angle - next.angle),
      360 - Math.abs(angle - next.angle)
    );

    const isCorrect = diff <= 10;

    if (isCorrect) {
      feedbackBox.textContent = "✅ Correct!";
      feedbackBox.style.borderColor = "green";
      feedbackBox.style.color = "black";

      player.correct++;
    } else {
      feedbackBox.textContent = `❌ Nope! That was ${Math.round(angle)}°.`;
      feedbackBox.style.borderColor = "red";
      feedbackBox.style.color = "black";

      player.incorrect++;
    }

    document.getElementById("score-display").textContent =
      `✅ Correct: ${player.correct} | ❌ Incorrect: ${player.incorrect}`;

    feedbackBox.style.display = "block";
    setTimeout(() => {
      feedbackBox.style.display = "none";

      if (player.correct >= 6) {
        alert("🎉 You completed Level 2!");
        callback("complete");
      } else if (player.incorrect >= 3) {
        gameArea.innerHTML = `
          <div class="fail-screen" style="text-align: center; margin-top: 50px; color: white;">
            <h2>💥 Too many mistakes!</h2>
            <p>Let’s regroup in Boot Camp 2 to sharpen your aim.</p>
            <button id="go-to-bootcamp2" class="answer-btn" style="margin-top: 20px;">Go to Boot Camp 2 🧠</button>
          </div>
        `;
      
        document.getElementById("go-to-bootcamp2").addEventListener("click", () => {
          window.runBootcamp2(player, () => {
            player.correct = 0;
            player.incorrect = 0;
            runLevel2(player, callback);
          });
        });
      } else {
        runLevel2(player, callback);
      }
      
    }, 1500);
  };
}

window.runLevel2 = runLevel2;
