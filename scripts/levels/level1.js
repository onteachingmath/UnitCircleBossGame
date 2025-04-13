// level1.js - Drag the dot to the correct angle (Degrees)

function runLevel1(player, callback) {
  console.log("✅ runLevel1() called");
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";
  gameArea.style.background = "black";
  gameArea.style.border = "4px solid #333";
  gameArea.style.borderRadius = "12px";
  gameArea.style.padding = "20px";
  gameArea.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";

  if (!player.usedAngles) {
    player.usedAngles = [];
  }

  const allAngles = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
  const remainingAngles = allAngles.filter(a => !player.usedAngles.includes(a));

  if (remainingAngles.length === 0) {
    player.usedAngles = [];
    remainingAngles.push(...allAngles);
  }

  const targetAngle = remainingAngles[Math.floor(Math.random() * remainingAngles.length)];
  player.usedAngles.push(targetAngle);

  const prompt = document.createElement("h3");
  prompt.textContent = `🎯 Drag the dot to ${targetAngle}°`;
  prompt.style.textAlign = "center";
  prompt.style.fontFamily = "Verdana, sans-serif";
  prompt.style.color = "white";
  gameArea.appendChild(prompt);

  const circle = createUnitCircle({ showTicks: true, showAngleLabels: false });
  circle.style.boxShadow = "inset 0 0 8px rgba(0, 0, 0, 0.2)";
  circle.style.background = "black";
  gameArea.appendChild(circle);

  const dot = document.createElement("div");
  dot.id = "draggable-dot";
  dot.style.width = "20px";
  dot.style.height = "20px";
  dot.style.background = "red";
  dot.style.border = "2px white";
  dot.style.borderRadius = "50%";
  dot.style.position = "absolute";
  dot.style.cursor = "grab";
  dot.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";

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

    const diff = Math.abs(angle - targetAngle);
    const isCorrect = diff <= 10;

    console.log("Target angle:", targetAngle);
    console.log("Dot position:", dotX, dotY);
    console.log("Calculated angle:", angle.toFixed(2));
    console.log("Angle difference:", diff.toFixed(2));
    console.log("Correct?", isCorrect);

    if (isCorrect) {
      feedbackBox.textContent = "✅ Correct!";
      feedbackBox.style.borderColor = "green";
      feedbackBox.style.color = "black";

      player.correct++;
    } else {
      feedbackBox.textContent = `❌ Oops! You landed at ${Math.round(angle)}°.`;
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
        alert("🎉 You completed Level 1!");
        callback("complete");
      } else if (player.incorrect >= 3) {
        alert("💥 Too many mistakes! Time for Boot Camp.");
        showFailScreen(1);

      } else {
        runLevel1(player, callback);
      }
    }, 1500);
  };
}

window.runLevel1 = runLevel1;