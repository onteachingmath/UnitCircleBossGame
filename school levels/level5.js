// level5.js - Drag two dots to correct angles where tan(θ) = value

function runLevel5(player, callback) {
    console.log("✅ runLevel5() called");
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = "";
  
    if (!player.usedTangents) player.usedTangents = [];
  
    const tangentBank = [
      { angle1: 45, angle2: 225, value: "1" },
      { angle1: 30, angle2: 210, value: "\\frac{\\sqrt{3}}{3}" },
      { angle1: 60, angle2: 240, value: "\\sqrt{3}" },
      { angle1: 0, angle2: 180, value: "0" },
      { angle1: 135, angle2: 315, value: "-1" },
      { angle1: 120, angle2: 300, value: "-\\sqrt{3}" },
      { angle1: 150, angle2: 330, value: "-\\frac{\\sqrt{3}}{3}" }
    ];
  
    const remaining = tangentBank.filter(q => !player.usedTangents.includes(q.value));
    if (remaining.length === 0) {
      player.usedTangents = [];
      remaining.push(...tangentBank);
    }
  
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    player.usedTangents.push(next.value);
  
    const prompt = document.createElement("h3");
    prompt.innerHTML = `Drag both dots to angles where $\\tan(\\theta) = ${next.value}$`;
    prompt.style.textAlign = "center";
    prompt.style.marginBottom = "20px";
    gameArea.appendChild(prompt);
  
    const scoreCard = document.createElement("p");
    scoreCard.textContent = `✅ ${player.correct}    ❌ ${player.incorrect}`;
    scoreCard.style.textAlign = "center";
    scoreCard.style.fontWeight = "bold";
    scoreCard.style.marginBottom = "15px";
    gameArea.appendChild(scoreCard);
  
    const circle = createUnitCircle({ showTicks: true, showAngleLabels: true, showCoordinates: true });
    gameArea.appendChild(circle);
  
    const createDot = (id, color) => {
      const dot = document.createElement("div");
      dot.id = id;
      dot.style.width = "20px";
      dot.style.height = "20px";
      dot.style.background = color;
      dot.style.borderRadius = "50%";
      dot.style.position = "absolute";
      dot.style.cursor = "grab";
      dot.style.left = `140px`;
      dot.style.top = `140px`;
      circle.appendChild(dot);
      return dot;
    };
  
    const dot1 = createDot("dot1", "red");
    const dot2 = createDot("dot2", "blue");
  
    let activeDot = null;
    let offsetX = 0;
    let offsetY = 0;
  
    const startDrag = (dot, e) => {
      activeDot = dot;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    };
  
    [dot1, dot2].forEach(dot => {
      dot.addEventListener("mousedown", (e) => startDrag(dot, e));
    });
  
    document.addEventListener("mousemove", (e) => {
      if (activeDot) {
        const rect = circle.getBoundingClientRect();
        const x = e.clientX - rect.left - offsetX;
        const y = e.clientY - rect.top - offsetY;
        activeDot.style.left = `${x}px`;
        activeDot.style.top = `${y}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      activeDot = null;
    });
  
    const centerX = 150;
    const centerY = 150;
  
    const getAngle = (dot) => {
      const dotX = parseInt(dot.style.left) + 10;
      const dotY = parseInt(dot.style.top) + 10;
      const dx = dotX - centerX;
      const dy = centerY - dotY;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      return angle;
    };
  
    const isCloseTo = (angle, target) => Math.abs(angle - target) <= 10;
  
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Answer";
    submitBtn.style.display = "block";
    submitBtn.style.margin = "20px auto";
    gameArea.appendChild(submitBtn);
  
    submitBtn.onclick = () => {
      const a1 = getAngle(dot1);
      const a2 = getAngle(dot2);
      const [target1, target2] = [next.angle1, next.angle2];
  
      const matchA1 = isCloseTo(a1, target1) || isCloseTo(a1, target2);
      const matchA2 = isCloseTo(a2, target1) || isCloseTo(a2, target2);
  
      // Ensure both match different targets
      const matches = [a1, a2];
const anglesMatched = new Set();
if (isCloseTo(matches[0], target1) || isCloseTo(matches[1], target1)) anglesMatched.add(target1);
if (isCloseTo(matches[0], target2) || isCloseTo(matches[1], target2)) anglesMatched.add(target2);

const isCorrect = anglesMatched.size === 2;

  
      const feedback = document.createElement("div");
      feedback.style.textAlign = "center";
      feedback.style.fontSize = "20px";
      feedback.style.fontWeight = "bold";
      feedback.style.marginTop = "15px";
  
      if (isCorrect) {
        feedback.innerHTML = "✅ Correct!";
        feedback.style.color = "green";
        player.correct++;
      } else {
        feedback.innerHTML = `❌ Nope! Correct answers: $${next.angle1}^\\circ$ and $${next.angle2}^\\circ$`;
        feedback.style.color = "red";
        player.incorrect++;
      }
  
      gameArea.appendChild(feedback);
      if (typeof MathJax !== "undefined") MathJax.typesetPromise([feedback]);
  
      setTimeout(() => {
        if (player.correct >= 6) {
          alert("🎉 Level 5 complete!");
          callback("complete");
        } else if (player.incorrect >= 3) {
          alert("💥 Boot Camp Time!");
          callback("fail");
        } else {
          runLevel5(player, callback);
        }
      }, 1800);
    };
  
    if (typeof MathJax !== "undefined") {
      MathJax.typesetPromise()
        .then(() => console.log("✅ MathJax rendered Level 5"))
        .catch(err => console.error("❌ MathJax render failed:", err));
    }
  }
  
  window.runLevel5 = runLevel5;