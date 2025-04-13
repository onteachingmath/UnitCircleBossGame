// bootcamps.js

export function runBootcamp1(player, callback) {

  const gameArea = document.getElementById("game-area");

  let section = 0;
  let score = 0;

  function showIntro() {
    gameArea.innerHTML = `
      <div class="level-header" style="animation: slideIn 0.5s ease-in;">
        <h2>🧠 Boot Camp 1: Unit Circle Foundations</h2>
<p>🎯 Objective: Understand how angles are built on the unit circle.</p>
<p>You’ll learn:</p>
<ul>
  <li>📍 Where angles start and end</li>
  <li>🔁 Why counterclockwise is king</li>
  <li>📐 What a degree means visually</li>
  <li>🔢 How the angle pattern grows: <code>0, 30, 45, 60...</code></li>
</ul>

        <button id="bootcamp2-start-btn" class="answer-btn">Start Boot Camp</button>
      </div>
    `;
  
    setTimeout(() => {
      const startBtn = document.getElementById("bootcamp2-start-btn");
      if (startBtn) {
        startBtn.addEventListener("click", () => {
          section = 1;
          runNextSection();
        });
      }
    }, 0);
  }
  

  function runNextSection() {
    switch (section) {
      case 1:
        showWhatIsDegree();
        break;
      case 2:
        showInitialAndTerminal();
        break;
      case 3:
        showDirectionOfRotation();
        break;
      case 4:
        showAnglePattern();
        break;
        case 5:
          runMiniQuiz(player, () => {
            callback("level1");  // 👈 Explicitly return to level 1
          });
          break;
        
      default:
        callback();
        break;
    }
  }

  function showWhatIsDegree() {
    gameArea.innerHTML = `
      <div class="level-header">
        <h2>📐 What Is a Degree?</h2>
        <p>A degree measures how far you've rotated from the starting ray on the right (0°).</p>
        <p>One full turn is <strong>360°</strong>, and we count by going <strong>counterclockwise</strong>.</p>
        <svg id="degree-demo" viewBox="0 0 200 200" width="300" height="300">
          <circle cx="100" cy="100" r="90" stroke="#ccc" fill="none" stroke-width="2"/>
          <!-- Initial Side -->
          <line x1="100" y1="100" x2="190" y2="100" stroke="green" stroke-width="3"/>
          <!-- Terminal Side -->
          <line id="angle-line" x1="100" y1="100" x2="100" y2="10" stroke="#0074D9" stroke-width="3"/>
          <!-- Arc -->
          <path id="angle-arc" fill="none" stroke="#FF851B" stroke-width="2"/>
          <!-- Angle label -->
          <text id="angle-label" x="110" y="80" font-size="14" font-family="Verdana" fill="#ffd700">0°</text>
        </svg>
        <button id="continue-degrees" class="answer-btn">Got it! ➡️</button>
      </div>
    `;
  
    let angle = 0;
    const radius = 90;
    const cx = 100;
    const cy = 100;
    const line = document.getElementById("angle-line");
    const arc = document.getElementById("angle-arc");
    const label = document.getElementById("angle-label");
  
    const interval = setInterval(() => {
      angle = (angle + 2) % 360; // Increase angle, simulating counterclockwise
  
      const rad = angle * Math.PI / 180;
      const x2 = cx + radius * Math.cos(rad);
      const y2 = cy - radius * Math.sin(rad); // Flip Y for CCW
  
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
  
      // Arc path from 0° to current angle (counterclockwise)
      const startX = cx + radius;
      const startY = cy;
      const endX = x2;
      const endY = y2;
      const largeArc = angle > 180 ? 1 : 0;
  
      arc.setAttribute("d", `
        M ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArc} 0 ${endX} ${endY}
      `);
  
      // Label halfway along the arc
      const midAngle = angle / 2;
      const midRad = midAngle * Math.PI / 180;
      const labelX = cx + (radius - 30) * Math.cos(midRad);
      const labelY = cy - (radius - 30) * Math.sin(midRad); // Flip Y here too
      label.setAttribute("x", labelX);
      label.setAttribute("y", labelY);
      label.textContent = `${angle}°`;
  
    }, 75);
  
    document.getElementById("continue-degrees").addEventListener("click", () => {
      clearInterval(interval);
      section = 2;
      runNextSection();
    });
  }
  
  
  

  function showInitialAndTerminal() {
    gameArea.innerHTML = `
      <div class="level-header">
        <h2>📍 Drag the Terminal Side</h2>
        <p>The <strong>initial side</strong> always starts at the right (0°).</p>
        <p>Drag the red dot <strong>counterclockwise</strong> along the circle to create an angle.</p>
        <p style="font-size: 0.9em; color: #555;">🔁 After dragging the dot to your terminal side, <strong>click the dot again</strong> to lock it in.</p>
        <svg id="drag-circle" width="400" height="400" style="background:#fff; border:2px solid #ccc; margin-top: 10px;">
          <circle cx="200" cy="200" r="150" stroke="#333" fill="none" stroke-width="2"/>
          <line x1="200" y1="200" x2="350" y2="200" stroke="green" stroke-width="3"/> <!-- Initial side -->
        </svg>
        <p id="drag-feedback" style="margin-top: 10px;">Create 3 terminal sides by dragging the red dot.</p>
        <button id="continue1" class="answer-btn" disabled>Continue</button>
      </div>
    `;
  
    const svg = document.getElementById("drag-circle");
    const cx = 200, cy = 200, r = 150;
    let angleDrops = 0;
    let lastAngle = 0;
  
    // Create the draggable dot
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", cx + r);
    dot.setAttribute("cy", cy);
    dot.setAttribute("r", 10);
    dot.setAttribute("fill", "red");
    dot.setAttribute("cursor", "grab");
    dot.setAttribute("id", "draggable-dot");
    svg.appendChild(dot);
  
    let isDragging = false;
  
    dot.addEventListener("mousedown", () => { isDragging = true; });
  
    svg.addEventListener("mouseup", () => { isDragging = false; });
  
    svg.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
  
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - cx;
      const dy = y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > r + 30 || distance < r - 30) return;
  
      const newAngle = (Math.atan2(-dy, dx) * 180 / Math.PI + 360) % 360;
  
      // Only allow counterclockwise movement
      if ((newAngle - lastAngle + 360) % 360 < 0.5) return;
  
      lastAngle = newAngle;
  
      const renderRad = Math.atan2(dy, dx); // Visual placement only
      const newX = cx + r * Math.cos(renderRad);
      const newY = cy + r * Math.sin(renderRad);
      dot.setAttribute("cx", newX);
      dot.setAttribute("cy", newY);
    });
  
    dot.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
  
      const x = parseFloat(dot.getAttribute("cx"));
      const y = parseFloat(dot.getAttribute("cy"));
      const dx = x - cx;
      const dy = y - cy;
  
      const angleRad = Math.atan2(-dy, dx); // Flip for CCW
      const angleDeg = Math.round((angleRad * 180 / Math.PI + 360) % 360);
  
      const terminalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      terminalLine.setAttribute("x1", cx);
      terminalLine.setAttribute("y1", cy);
      terminalLine.setAttribute("x2", x);
      terminalLine.setAttribute("y2", y);
      terminalLine.setAttribute("stroke", "red");
      terminalLine.setAttribute("stroke-width", "2");
      svg.appendChild(terminalLine);
  
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", x + 10);
      label.setAttribute("y", y);
      label.setAttribute("font-size", "12");
      label.setAttribute("font-family", "Verdana");
      label.textContent = `${angleDeg}°`;
      svg.appendChild(label);
  
      angleDrops++;
      document.getElementById("drag-feedback").textContent = `✅ You created ${angleDrops} terminal side(s).`;
  
      // Reset dot
      dot.setAttribute("cx", cx + r);
      dot.setAttribute("cy", cy);
      lastAngle = 0;
  
      if (angleDrops >= 3) {
        document.getElementById("continue1").disabled = false;
      }
    });
  
    document.getElementById("continue1").addEventListener("click", () => {
      section = 3;
      runNextSection();
    });
  }
  
  
  

  function showDirectionOfRotation() {
    gameArea.innerHTML = `
      <div class="level-header">
        <h2>🔁 Direction of Rotation</h2>
        <p>Angles rotate <strong>counterclockwise</strong> unless stated otherwise.</p>
        <p>Click the direction that represents positive angle rotation:</p>
        <button id="cw" class="answer-btn">Clockwise</button>
        <button id="ccw" class="answer-btn">Counterclockwise</button>
      </div>
    `;
    document.getElementById("cw").addEventListener("click", () => {
      alert("❌ That's negative rotation.");
    });
    document.getElementById("ccw").addEventListener("click", () => {
      section = 4;
      runNextSection();
    });
  }

  // showAnglePattern, runMiniQuiz, showBootcampResult, shuffleArray remain unchanged...
  // (Not repeated here for brevity)
  function showAnglePattern() {
    gameArea.innerHTML = `
      <div class="level-header">
        <h2>📈 Angle Pattern Around the Circle</h2>
        <p>These are the most important angles on the unit circle. You’ll see them again and again!</p>
        <svg id="pattern-circle" width="400" height="400" style="background:#fff; border:2px solid #ccc; margin-top: 10px;">
          <circle cx="200" cy="200" r="150" stroke="#333" fill="none" stroke-width="2"/>
          <line x1="200" y1="200" x2="350" y2="200" stroke="green" stroke-width="3" /> <!-- Initial side -->
        </svg>
        <p id="angle-pattern-label" style="margin-top: 10px;">🕒 Watch the angles unfold...</p>
        <button id="continue-angle-pattern" class="answer-btn" disabled>Continue</button>
      </div>
    `;
  
    const angles = [
      0, 30, 45, 60, 90,
      120, 135, 150, 180,
      210, 225, 240, 270,
      300, 315, 330, 360
    ];
  
    const svg = document.getElementById("pattern-circle");
    const label = document.getElementById("angle-pattern-label");
  
    let index = 0;
    const cx = 200, cy = 200, r = 150;
  
    const interval = setInterval(() => {
      const angle = angles[index];
      const radians = (360 - angle) * Math.PI / 180; // rotate counterclockwise
      const x = cx + r * Math.cos(radians);
      const y = cy + r * Math.sin(radians);
  
      const labelX = cx + (r - 30) * Math.cos(radians);
      const labelY = cy + (r - 30) * Math.sin(radians);
  
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", "5");
      dot.setAttribute("fill", "red");
      svg.appendChild(dot);
  
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", labelX);
      text.setAttribute("y", labelY);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");
      text.setAttribute("font-size", "12");
      text.setAttribute("font-family", "Verdana");
      text.textContent = `${angle}°`;
      svg.appendChild(text);
  
      label.textContent = `Angle ${index + 1}: ${angle}°`;
      index++;
  
      if (index >= angles.length) {
        clearInterval(interval);
        label.textContent = "✅ These angles form the backbone of the unit circle!";
        document.getElementById("continue-angle-pattern").disabled = false;
      }
    }, 600);
  
    document.getElementById("continue-angle-pattern").addEventListener("click", () => {
      section = 5;
      runNextSection();
    });
  }
  
  
  
  

  
  showIntro();
}

function runMiniQuiz(player, onSuccess) {
  const gameArea = document.getElementById("game-area");

  gameArea.innerHTML = `
    <div class="level-header">
      <h2>🎯 Boot Camp Mini-Quiz</h2>
      <p>Answer all 3 questions correctly to continue your quest!</p>
      <div id="quiz-container"></div>
      <p id="quiz-feedback"></p>
      <button id="restart-quiz" class="answer-btn" style="display: none;">🔁 Try Again</button>
    </div>
  `;

  const questions = [
    {
      question: "🧭 Which direction represents positive angle rotation?",
      choices: ["Clockwise", "Counterclockwise", "Left to right", "Northbound"],
      answer: "Counterclockwise"
    },
    {
      question: "📍 Where does every angle begin on the unit circle?",
      choices: ["Top (90°)", "Left side (180°)", "Right side (0°)", "Bottom (270°)"],
      answer: "Right side (0°)"
    },
    {
      question: "🔢 If you're at 135°, what comes next in the pattern?",
      choices: ["150°", "180°", "210°", "225°"],
      answer: "150°"
    }
  ];

  const container = document.getElementById("quiz-container");
  const feedback = document.getElementById("quiz-feedback");
  const restartBtn = document.getElementById("restart-quiz");

  let score = 0;
  let current = 0;

  function showQuestion() {
    if (current >= questions.length) {
      if (score === questions.length) {
        feedback.innerHTML = `
  ✅ <strong>Great job!</strong> Boot Camp Complete!<br>
  <button id="return-to-level" class="answer-btn" style="margin-top: 15px;">Return to Level 1 🧠</button>
`;
setTimeout(() => {
  const btn = document.getElementById("return-to-level");
  if (btn) {
    btn.addEventListener("click", () => {
      if (typeof window.startLevel === "function") {
        window.startLevel(1);
      }
    });
  }
}, 0);

        setTimeout(() => {
          if (typeof onSuccess === "function") {
            onSuccess(); // 👈 Go back to current level or finish Boot Camp
          } else {
            startLevel(player.currentLevel); // fallback just in case
          }
        }, 2000);
      } else {
        feedback.innerHTML = `❌ You got <strong>${score}/3</strong> correct. Try again!`;
        restartBtn.style.display = "inline-block";
      }
      return;
    }

    const q = questions[current];
    container.innerHTML = `
      <div style="margin: 20px 0;">
        <h3>${q.question}</h3>
        ${q.choices.map(choice => `
          <button class="answer-btn choice-btn">${choice}</button>
        `).join("")}
      </div>
    `;

    document.querySelectorAll(".choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.textContent === q.answer) {
          score++;
        }
        current++;
        showQuestion();
      });
    });
  }

  restartBtn.addEventListener("click", () => {
    score = 0;
    current = 0;
    feedback.textContent = "";
    restartBtn.style.display = "none";
    showQuestion();
  });

  showQuestion();
}

// Bootcamp 2 - Full Script with All Features and Working Navigation

const gameArea = document.getElementById("game-area");

let section = 0;
let player;
let callback;

export function runBootcamp2(playerRef, callbackRef) {
  player = playerRef;
  callback = callbackRef;
  section = 0;
  runNextSection();
}


function runNextSection() {
  switch (section) {
    case 0:
      showIntro();
      break;
    case 1:
      showTriangleBuilder();
      break;
    case 2:
      showTriangleWithRatios();
      break;
    case 3:
      showSnapToCoordinates();
      break;
      case 4: showQuadrantalAngles(); break;
      case 5: showQuadrantSignsDragDrop(); break;
      case 6: showReferenceAngleExplorer(); break;
    case 7:
      showBootcamp2Quiz(); // quiz goes last
      break;
    default:
      callback("level2");
      break;
  }
}


function showIntro() {
  gameArea.innerHTML = `
    <div class="level-header" style="animation: slideIn 0.5s ease-in;">
      <h2>🧠 Boot Camp 2: Triangle Review & Reference Angles</h2>
      <p>🎯 Objective: Understand how 30°, 45°, and 60° triangles relate to the unit circle.</p>
      <p>You’ll also learn:</p>
      <ul style="text-align: left; max-width: 500px; margin: auto;">
        <li>📐 How x and y represent adjacent and opposite sides</li>
        <li>↩️ How reference angles repeat in other quadrants</li>
        <li>➕➖ Sign rules for each quadrant</li>
      </ul>
      <button id="bootcamp2-start-btn" class="answer-btn">Start Boot Camp</button>
    </div>
  `;

  document.getElementById("bootcamp2-start-btn").addEventListener("click", () => {
    section = 1;
    runNextSection();
  });
}

function showTriangleBuilder() {
  gameArea.innerHTML = `
    <div class="level-header">
      <h2>📐 Boot Camp 2: Triangle Builder</h2>
      <p>We create right triangles on the Unit Circle. The terminal side is always the hypotenuse. The opposite and adjacent sides can be seen in the diagram. Simply click an angle to see how the triangle forms in the unit circle. Which side is x? Which side is y?</p>
      <div style="margin-bottom: 10px;">
        <button class="answer-btn" data-angle="30">30°</button>
        <button class="answer-btn" data-angle="45">45°</button>
        <button class="answer-btn" data-angle="60">60°</button>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        <svg id="triangle-svg" viewBox="0 0 400 400" width="400" height="400" style="background: #fff; border: 2px solid #ccc;">
          <circle cx="200" cy="200" r="150" stroke="#aaa" fill="none" stroke-width="2" />
          <line x1="200" y1="200" x2="350" y2="200" stroke="green" stroke-width="2" /> <!-- x-axis -->
          <line id="triangle-line1" stroke="#0074D9" stroke-width="3"/>
          <line id="triangle-line2" stroke="#0074D9" stroke-width="3"/>
          <line id="triangle-line3" stroke="#0074D9" stroke-width="3"/>
          <text id="angle-label" x="205" y="190" font-size="14" fill="#000"></text>
          <text id="label-x" font-size="12" fill="#000"></text>
          <text id="label-y" font-size="12" fill="#000"></text>
          <text id="label-hyp" font-size="12" fill="#000"></text>
        </svg>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button id="continue-btn" class="answer-btn" disabled>Continue ➡️</button>
      </div>
    </div>
  `;

  const triangleData = {
    30: { x: Math.sqrt(3) / 2, y: 0.5 },
    45: { x: Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 },
    60: { x: 0.5, y: Math.sqrt(3) / 2 }
  };

  const svg = document.getElementById("triangle-svg");
  const cx = 200, cy = 200, r = 150;

  function drawTriangle(angle) {
    const { x, y } = triangleData[angle];
    const x1 = cx + r * x;
    const y1 = cy - r * y;

    const line1 = document.getElementById("triangle-line1");
    const line2 = document.getElementById("triangle-line2");
    const line3 = document.getElementById("triangle-line3");

    line1.setAttribute("x1", cx);
    line1.setAttribute("y1", cy);
    line1.setAttribute("x2", x1);
    line1.setAttribute("y2", y1);

    line2.setAttribute("x1", cx);
    line2.setAttribute("y1", cy);
    line2.setAttribute("x2", x1);
    line2.setAttribute("y2", cy);

    line3.setAttribute("x1", x1);
    line3.setAttribute("y1", cy);
    line3.setAttribute("x2", x1);
    line3.setAttribute("y2", y1);

    const label = document.getElementById("angle-label");
    label.textContent = `${angle}°`;

    if (angle === "30") {
      label.setAttribute("x", cx + 35);
      label.setAttribute("y", cy - 5);
    }
    if (angle === "45") {
      label.setAttribute("x", cx + 25);
      label.setAttribute("y", cy - 5);
    }
    if (angle === "60") {
      label.setAttribute("x", cx + 20);
      label.setAttribute("y", cy - 5);
    }

    document.getElementById("label-x").setAttribute("x", (cx + x1) / 2);
    document.getElementById("label-x").setAttribute("y", cy + 15);
    document.getElementById("label-x").textContent = "x (adjacent)";

    document.getElementById("label-y").setAttribute("x", x1 + 5);
    document.getElementById("label-y").setAttribute("y", (cy + y1) / 2);
    document.getElementById("label-y").textContent = "y (opposite)";

    document.getElementById("label-hyp").setAttribute("x", (cx + x1) / 2 - 15);
    document.getElementById("label-hyp").setAttribute("y", (cy + y1) / 2 - 15);
    document.getElementById("label-hyp").textContent = "r = 1";

    document.getElementById("continue-btn").disabled = false;
  }

  document.querySelectorAll("[data-angle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const angle = btn.getAttribute("data-angle");
      drawTriangle(angle);
    });
  });

  document.getElementById("continue-btn").addEventListener("click", () => {
    section = 2;
    runNextSection();
  });
}

function showTriangleWithRatios() {
  gameArea.innerHTML = `
    <div class="level-header">
      <h2>📐 Triangle Side Ratios</h2>
      <p>Knowing the ratio of sides of the special right triangles will unlock the Unit Circle for you. Click an angle to see the side lengths that define its coordinates on the unit circle.</p>
      <div style="margin-bottom: 10px;">
        <button class="answer-btn" data-angle="30">30°</button>
        <button class="answer-btn" data-angle="45">45°</button>
        <button class="answer-btn" data-angle="60">60°</button>
      </div>
      <div style="display: flex; justify-content: center;">
        <svg id="ratio-triangle" viewBox="0 0 400 400" width="400" height="400" style="background: #fff; border: 2px solid #ccc;">
          <circle cx="200" cy="200" r="150" stroke="#ccc" fill="none" stroke-width="2" />
          <line x1="200" y1="200" x2="350" y2="200" stroke="green" stroke-width="2" />
          <line id="line-hyp" stroke="#FF4136" stroke-width="3"/>
          <line id="line-x" stroke="#0074D9" stroke-width="3"/>
          <line id="line-y" stroke="#2ECC40" stroke-width="3"/>

          <text id="label-x" font-size="14" fill="#0074D9"></text>
          <text id="label-y" font-size="14" fill="#2ECC40"></text>
          <text id="label-hyp" font-size="14" fill="#FF4136"></text>
          <text id="angle-label" font-size="16" fill="#000" x="240" y="190"></text>
        </svg>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button id="continue-to-snap" class="answer-btn" disabled>Continue ➡️</button>
      </div>
    </div>
  `;

  const triangleData = {
    30: { x: "√3/2", y: "1/2" },
    45: { x: "√2/2", y: "√2/2" },
    60: { x: "1/2", y: "√3/2" }
  };

  const r = 150;
  const cx = 200;
  const cy = 200;

  function drawLabeledTriangle(angle) {
    const { x, y } = triangleData[angle];

    let xFrac = eval(x.replace("√3", Math.sqrt(3)).replace("√2", Math.sqrt(2)));
    let yFrac = eval(y.replace("√3", Math.sqrt(3)).replace("√2", Math.sqrt(2)));

    const x1 = cx + r * xFrac;
    const y1 = cy - r * yFrac;

    document.getElementById("line-hyp").setAttribute("x1", cx);
    document.getElementById("line-hyp").setAttribute("y1", cy);
    document.getElementById("line-hyp").setAttribute("x2", x1);
    document.getElementById("line-hyp").setAttribute("y2", y1);

    document.getElementById("line-x").setAttribute("x1", cx);
    document.getElementById("line-x").setAttribute("y1", cy);
    document.getElementById("line-x").setAttribute("x2", x1);
    document.getElementById("line-x").setAttribute("y2", cy);

    document.getElementById("line-y").setAttribute("x1", x1);
    document.getElementById("line-y").setAttribute("y1", cy);
    document.getElementById("line-y").setAttribute("x2", x1);
    document.getElementById("line-y").setAttribute("y2", y1);

    document.getElementById("label-x").textContent = `x = ${x}`;
    document.getElementById("label-x").setAttribute("x", (cx + x1) / 2);
    document.getElementById("label-x").setAttribute("y", cy + 20);

    document.getElementById("label-y").textContent = `y = ${y}`;
    document.getElementById("label-y").setAttribute("x", x1 + 5);
    document.getElementById("label-y").setAttribute("y", (cy + y1) / 2);

    document.getElementById("label-hyp").setAttribute("x", (cx + x1) / 2 - 18);
    document.getElementById("label-hyp").setAttribute("y", (cy + y1) / 2 - 15);
    document.getElementById("label-hyp").textContent = "r = 1";

    document.getElementById("angle-label").textContent = `${angle}°`;
    document.getElementById("continue-to-snap").disabled = false;
  }

  document.querySelectorAll("[data-angle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const angle = btn.getAttribute("data-angle");
      drawLabeledTriangle(angle);
    });
  });

  document.getElementById("continue-to-snap").addEventListener("click", () => {
    section = 3;
    runNextSection();
  });
}

function showSnapToCoordinates() {
  gameArea.innerHTML = `
    <div class="level-header">
      <h2>🎯 Coordinates from Triangles</h2>
      <p>Click a triangle to snap its side lengths to coordinates on the unit circle!</p>
      <div style="margin-bottom: 10px;">
        <button class="answer-btn angle-btn" data-angle="30">30°</button>
        <button class="answer-btn angle-btn" data-angle="45">45°</button>
        <button class="answer-btn angle-btn" data-angle="60">60°</button>
      </div>
      <div style="display: flex; justify-content: center;">
        <svg id="snap-svg" viewBox="0 0 400 400" width="400" height="400" style="background: #fff; border: 2px solid #ccc;">
          <circle cx="200" cy="200" r="150" stroke="#ccc" fill="none" stroke-width="2" />
          <line x1="200" y1="200" x2="350" y2="200" stroke="green" stroke-width="2" />
          <line id="line-hyp" stroke="#FF4136" stroke-width="3"/>
          <line id="line-x" stroke="#0074D9" stroke-width="3"/>
          <line id="line-y" stroke="#2ECC40" stroke-width="3"/>
          <circle id="dot" r="6" fill="#000" />
          <text id="label-x" font-size="14" fill="#0074D9"></text>
          <text id="label-y" font-size="14" fill="#2ECC40"></text>
          <text id="label-coords" font-size="16" fill="#000" x="140" y="380"></text>
        </svg>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button id="finish-bootcamp" class="answer-btn" disabled>Triangles and Coordinates ✅</button>
      </div>
    </div>
  `;

  const triangleData = {
    30: { x: "√3/2", y: "1/2" },
    45: { x: "√2/2", y: "√2/2" },
    60: { x: "1/2", y: "√3/2" }
  };

  const cx = 200;
  const cy = 200;
  const r = 150;

  function snapTriangle(angle) {
    const data = triangleData[angle];
    if (!data) return;

    const xVal = eval(data.x.replace("√3", Math.sqrt(3)).replace("√2", Math.sqrt(2)));
    const yVal = eval(data.y.replace("√3", Math.sqrt(3)).replace("√2", Math.sqrt(2)));

    const x1 = cx + r * xVal;
    const y1 = cy - r * yVal;

    document.getElementById("line-hyp").setAttribute("x1", cx);
    document.getElementById("line-hyp").setAttribute("y1", cy);
    document.getElementById("line-hyp").setAttribute("x2", x1);
    document.getElementById("line-hyp").setAttribute("y2", y1);

    document.getElementById("line-x").setAttribute("x1", cx);
    document.getElementById("line-x").setAttribute("y1", cy);
    document.getElementById("line-x").setAttribute("x2", x1);
    document.getElementById("line-x").setAttribute("y2", cy);

    document.getElementById("line-y").setAttribute("x1", x1);
    document.getElementById("line-y").setAttribute("y1", cy);
    document.getElementById("line-y").setAttribute("x2", x1);
    document.getElementById("line-y").setAttribute("y2", y1);

    const dot = document.getElementById("dot");
    dot.setAttribute("cx", x1);
    dot.setAttribute("cy", y1);

    const labelX = document.getElementById("label-x");
    labelX.textContent = `x = ${data.x}`;
    labelX.setAttribute("x", (cx + x1) / 2);
    labelX.setAttribute("y", cy + 20);

    const labelY = document.getElementById("label-y");
    labelY.textContent = `y = ${data.y}`;
    labelY.setAttribute("x", x1 + 5);
    labelY.setAttribute("y", (cy + y1) / 2);

    const coords = document.getElementById("label-coords");
    coords.textContent = `(${data.x}, ${data.y})`;
    coords.setAttribute("x", x1 + 1);
    coords.setAttribute("y", y1 - 10);

    document.getElementById("finish-bootcamp").disabled = false;
  }

  document.querySelectorAll(".angle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const angle = btn.getAttribute("data-angle");
      snapTriangle(angle);
    });
  });

  document.getElementById("finish-bootcamp").addEventListener("click", () => {
    section = 4;
    runNextSection();
  });
}

function showQuadrantalAngles() {
  gameArea.innerHTML = `
    <div class="level-header">
      <h2>🎯 Quadrantal Angles</h2>
      <p>The unit circle is centered at <strong>(0, 0)</strong> and has a radius of <strong>1</strong>. Watch how the four main points are positioned and labeled:</p>
      <div style="display: flex; justify-content: center;">
        <svg id="quad-svg" viewBox="0 0 400 400" width="400" height="400" style="border: 2px solid #ccc; background: #fff;">
          <line x1="200" y1="0" x2="200" y2="400" stroke="#ccc" stroke-width="2"/>
          <line x1="0" y1="200" x2="400" y2="200" stroke="#ccc" stroke-width="2"/>
          <circle cx="200" cy="200" r="150" stroke="#000" stroke-width="2" fill="none" />
          <circle id="dot0" r="5" fill="black" cx="350" cy="200" visibility="hidden"/>
          <circle id="dot90" r="5" fill="black" cx="200" cy="50" visibility="hidden"/>
          <circle id="dot180" r="5" fill="black" cx="50" cy="200" visibility="hidden"/>
          <circle id="dot270" r="5" fill="black" cx="200" cy="350" visibility="hidden"/>
          <text id="label0" x="355" y="190" font-size="14" fill="black" visibility="hidden">(1, 0)</text>
          <text id="angle0" x="320" y="185" font-size="12" fill="#0074D9" visibility="hidden">0°</text>
          <text id="label90" x="210" y="40" font-size="14" fill="black" visibility="hidden">(0, 1)</text>
          <text id="angle90" x="210" y="80" font-size="12" fill="#0074D9" visibility="hidden">90°</text>
          <text id="label180" x="10" y="190" font-size="14" fill="black" visibility="hidden">(-1, 0)</text>
          <text id="angle180" x="70" y="185" font-size="12" fill="#0074D9" visibility="hidden">180°</text>
          <text id="label270" x="210" y="370" font-size="14" fill="black" visibility="hidden">(0, -1)</text>
          <text id="angle270" x="210" y="320" font-size="12" fill="#0074D9" visibility="hidden">270°</text>
        </svg>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button id="continue-quad" class="answer-btn" disabled>Continue ➡️</button>
      </div>
    </div>
  `;

  const points = [
    { dot: "dot0", label: "label0", angle: "angle0", delay: 500 },
    { dot: "dot90", label: "label90", angle: "angle90", delay: 1000 },
    { dot: "dot180", label: "label180", angle: "angle180", delay: 1500 },
    { dot: "dot270", label: "label270", angle: "angle270", delay: 2000 }
  ];

  points.forEach((pt, i) => {
    setTimeout(() => {
      document.getElementById(pt.dot).setAttribute("visibility", "visible");
      document.getElementById(pt.label).setAttribute("visibility", "visible");
      document.getElementById(pt.angle).setAttribute("visibility", "visible");

      if (i === points.length - 1) {
        document.getElementById("continue-quad").disabled = false;
      }
    }, pt.delay);
  });

  document.getElementById("continue-quad").addEventListener("click", () => {
    section = 5;
    runNextSection();
  });
}

function showQuadrantSignsDragDrop() {
  gameArea.innerHTML = `
    <div class="level-header">
      <h2>🧭 Coordinate Signs by Quadrant</h2>
      <p>Did you notice the numbers on the Unit Circle are patterned, but the signs change? Drag each sign pair to the correct quadrant on the unit circle:</p>
      <div style="display: flex; justify-content: center;">
        <svg viewBox="0 0 400 400" width="400" height="400" style="border: 2px solid #ccc; background: #fff;">
          <line x1="200" y1="0" x2="200" y2="400" stroke="#ccc" stroke-width="2"/>
          <line x1="0" y1="200" x2="400" y2="200" stroke="#ccc" stroke-width="2"/>
          <rect id="q1" x="200" y="0" width="200" height="200" fill="rgba(0,0,0,0.05)" stroke="#0074D9"/>
          <rect id="q2" x="0" y="0" width="200" height="200" fill="rgba(0,0,0,0.05)" stroke="#0074D9"/>
          <rect id="q3" x="0" y="200" width="200" height="200" fill="rgba(0,0,0,0.05)" stroke="#0074D9"/>
          <rect id="q4" x="200" y="200" width="200" height="200" fill="rgba(0,0,0,0.05)" stroke="#0074D9"/>
          <text x="290" y="30" font-size="14">Quadrant I</text>
          <text x="60" y="30" font-size="14">Quadrant II</text>
          <text x="60" y="370" font-size="14">Quadrant III</text>
          <text x="290" y="370" font-size="14">Quadrant IV</text>
        </svg>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 20px; gap: 10px;">
       <div draggable="true" class="drag-sign parchment-sign" data-value="q1">(+,+)</div>
<div draggable="true" class="drag-sign parchment-sign" data-value="q2">(−,+)</div>
<div draggable="true" class="drag-sign parchment-sign" data-value="q3">(−,−)</div>
<div draggable="true" class="drag-sign parchment-sign" data-value="q4">(+,−)</div>

      </div>
      <div style="text-align: center; margin-top: 30px;">
        <button id="continue-signs" class="answer-btn" disabled>Continue ➡️</button>
      </div>
    </div>
  `;

  let correctCount = 0;
  const zones = ["q1", "q2", "q3", "q4"];

  zones.forEach(zone => {
    const el = document.getElementById(zone);

    el.addEventListener("dragover", e => e.preventDefault());

    el.addEventListener("drop", e => {
      e.preventDefault();
      const droppedValue = e.dataTransfer.getData("text/plain");
      const dragEl = document.querySelector(`[data-value="${droppedValue}"]`);
      if (!dragEl) return;

      if (zone === droppedValue) {
        const svg = document.querySelector("svg");
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let labelX = 0, labelY = 0;
        switch (zone) {
          case "q1": labelX = 300; labelY = 100; break;
          case "q2": labelX = 100; labelY = 100; break;
          case "q3": labelX = 100; labelY = 300; break;
          case "q4": labelX = 300; labelY = 300; break;
        }
        label.setAttribute("x", labelX);
        label.setAttribute("y", labelY);
        label.setAttribute("font-size", "16");
        label.setAttribute("fill", "#2ECC40");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("alignment-baseline", "middle");
        label.textContent = dragEl.textContent;
        svg.appendChild(label);
        dragEl.remove();
        correctCount++;
        if (correctCount === 4) {
          document.getElementById("continue-signs").disabled = false;
        }
      } else {
        dragEl.style.backgroundColor = "#FF4136";
        setTimeout(() => {
          dragEl.style.backgroundColor = "#eee";
        }, 500);
      }
    });
  });

  document.querySelectorAll(".drag-sign").forEach(el => {
    el.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", el.dataset.value);
    });
  });

  document.getElementById("continue-signs").addEventListener("click", () => {
    section = 6;
    runNextSection();
  });
}

function showReferenceAngleExplorer() {
  gameArea.innerHTML = `
    <div class="level-header">
      <h2>🧭 Interactive Reference Angle Explorer</h2>
      <p>Click a point on the unit circle to reveal the triangle and reference angle!</p>
      <div style="display: flex; justify-content: center;">
        <svg id="ref-svg" viewBox="0 0 400 400" width="400" height="400" style="background: #fff; border: 2px solid #ccc;">
          <circle cx="200" cy="200" r="150" stroke="#000" fill="none" stroke-width="2"/>
          <line x1="0" y1="200" x2="400" y2="200" stroke="#ccc" stroke-width="2"/>
          <line x1="200" y1="0" x2="200" y2="400" stroke="#ccc" stroke-width="2"/>
          <path id="angle-arc" d="" fill="none" stroke="#FF4136" stroke-width="3"/>
          <line id="ref-terminal" stroke="#FF4136" stroke-width="3" />
          <line id="ref-line-horiz" stroke="#0074D9" stroke-width="2" />
          <line id="ref-line-vert" stroke="#2ECC40" stroke-width="2" />
          <text id="ref-label" font-size="14" fill="#0074D9"></text>
          <text id="coord-label" font-size="14" fill="#000"></text>
        </svg>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button id="finish-ref" class="answer-btn" disabled>Finish Boot Camp ✅</button>
      </div>
    </div>
  `;

  const cx = 200, cy = 200, r = 150;
  const svg = document.getElementById("ref-svg");

  const points = [
    { angle: 30, coords: ["√3/2", "1/2"] },
    { angle: 45, coords: ["√2/2", "√2/2"] },
    { angle: 60, coords: ["1/2", "√3/2"] },
    { angle: 120, coords: ["-1/2", "√3/2"] },
    { angle: 135, coords: ["-√2/2", "√2/2"] },
    { angle: 150, coords: ["-√3/2", "1/2"] },
    { angle: 210, coords: ["-√3/2", "-1/2"] },
    { angle: 225, coords: ["-√2/2", "-√2/2"] },
    { angle: 240, coords: ["-1/2", "-√3/2"] },
    { angle: 300, coords: ["1/2", "-√3/2"] },
    { angle: 315, coords: ["√2/2", "-√2/2"] },
    { angle: 330, coords: ["√3/2", "-1/2"] }
  ];

  points.forEach(pt => {
    const rad = (pt.angle * Math.PI) / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy - r * Math.sin(rad);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", 5);
    dot.setAttribute("fill", "#FF4136");
    dot.setAttribute("cursor", "pointer");
    dot.addEventListener("click", () => {
      drawReferenceTriangle(pt.angle, pt.coords);
      document.getElementById("finish-ref").disabled = false;
    });
    svg.appendChild(dot);
  });

  document.getElementById("finish-ref").addEventListener("click", () => {
    section = 7;
    runNextSection();
  });
  
}

function drawReferenceTriangle(angle, coords) {
  const cx = 200, cy = 200, r = 150;
  const rad = (angle * Math.PI) / 180;
  const x = cx + r * Math.cos(rad);
  const y = cy - r * Math.sin(rad);

  document.getElementById("ref-terminal").setAttribute("x1", cx);
  document.getElementById("ref-terminal").setAttribute("y1", cy);
  document.getElementById("ref-terminal").setAttribute("x2", x);
  document.getElementById("ref-terminal").setAttribute("y2", y);

  document.getElementById("ref-line-horiz").setAttribute("x1", cx);
  document.getElementById("ref-line-horiz").setAttribute("y1", cy);
  document.getElementById("ref-line-horiz").setAttribute("x2", x);
  document.getElementById("ref-line-horiz").setAttribute("y2", cy);

  document.getElementById("ref-line-vert").setAttribute("x1", x);
  document.getElementById("ref-line-vert").setAttribute("y1", cy);
  document.getElementById("ref-line-vert").setAttribute("x2", x);
  document.getElementById("ref-line-vert").setAttribute("y2", y);

  const arc = document.getElementById("angle-arc");
  const startX = cx + r;
  const startY = cy;
  const endX = x;
  const endY = y;
  const largeArcFlag = angle > 180 ? 1 : 0;
  arc.setAttribute("d", `M ${startX} ${startY} A ${r} ${r} 0 ${largeArcFlag} 0 ${endX} ${endY}`);

  const ref = angle <= 90 ? angle : angle < 180 ? 180 - angle : angle < 270 ? angle - 180 : 360 - angle;
  const refLabel = document.getElementById("ref-label");
  refLabel.textContent = `${ref}°`;
  refLabel.setAttribute("x", cx + 25);
  refLabel.setAttribute("y", cy + 15);

  const coordLabel = document.getElementById("coord-label");
  coordLabel.textContent = `(${coords[0]}, ${coords[1]})`;
  coordLabel.setAttribute("x", x + 10);
  coordLabel.setAttribute("y", y);
}
function showBootcamp2Quiz() {
  const gameArea = document.getElementById("game-area");

  const questions = [
    {
      question: "What is the reference angle for 150°?",
      choices: ["30°", "45°", "60°", "75°"],
      correctAnswer: "30°"
    },
    {
      question: "In which quadrant is the angle 210° located?",
      choices: ["I", "II", "III", "IV"],
      correctAnswer: "III"
    },
    {
      question: "What are the signs of x and y for the angle 315°?",
      choices: ["(+,+)", "(-,+)", "(+,-)", "(-,-)"],
      correctAnswer: "(+,-)"
    },
    {
      question: "What is the reference angle for 225°?",
      choices: ["30°", "45°", "60°", "75°"],
      correctAnswer: "45°"
    },
    {
      question: "What are the coordinates for 240°?",
      choices: ["(-1/2, -√3/2)", "(-√3/2, -1/2)", "(√3/2, -1/2)", "(-1/2, √3/2)"],
      correctAnswer: "(-1/2, -√3/2)"
    }
  ];

  let current = 0;
  let score = 0;

  function renderQuestion() {
    const q = questions[current];
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2 style="color: white;">🧠 Bootcamp 2 Quiz</h2>
        <p style="font-size: 20px; text-align: center; color: white;">${q.question}</p>
        <div class="quiz-choices" style="display: flex; flex-direction: column; gap: 10px;">
          ${q.choices.map(c => `
            <button class="quiz-btn" style="background: #000; color: #fff; padding: 10px 20px; font-size: 16px; border-radius: 8px;">
              ${c}
            </button>
          `).join("")}
        </div>
        <p style="margin-top: 15px; color: white;">Question ${current + 1} of ${questions.length}</p>
      </div>
    `;
  
    document.querySelectorAll(".quiz-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.textContent.trim() === q.correctAnswer) score++;
        current++;
        if (current < questions.length) {
          renderQuestion();
        } else {
          showResult();
        }
      });
    });
  }
  

  function showResult() {
    const passed = score >= 4;
    gameArea.innerHTML = `
      <div class="slide-in" style="text-align: center;">
        <h2 style="color: ${passed ? '#2ECC40' : '#FF4136'};">
          ${passed ? "✅ Bootcamp Complete!" : "❌ Try Again"}
        </h2>
        <p style="color: black;">You got ${score} / ${questions.length} correct.</p>
        <button id="retry-btn" class="answer-btn">${passed ? "Return to the Quest" : "Retry Quiz"}</button>
      </div>
    `;

    document.getElementById("retry-btn").addEventListener("click", () => {
      if (passed) {
        if (typeof window.startLevel === "function") {
          window.startLevel(2); // or whatever level Bootcamp 2 returns to
        }
      } else {
        current = 0;
        score = 0;
        renderQuestion();
      }
    });
  }

  renderQuestion();
}


// -- All functions like showTriangleBuilder, showTriangleWithRatios,
export function runBootcamp3(player, callback) {
  const gameArea = document.getElementById("game-area");
  let section = 0;
  let quizAttempts = 0;

  function runNextSection() {
    switch (section) {
      case 0:
        showIntro();
        break;
      case 1:
        showCosineSlide();
        break;
      case 2:
        showSineSlide();
        break;
      case 3:
        showCombinedPicker();
        break;
        case 4:
          showBootcamp3Quiz(callback); // ✅ run the universal quiz, return to level3 if passed
          break;
        
      default:
        callback("level3");
        break;
    }
  }

  function showIntro() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>📘 Boot Camp 3: Sine and Cosine on the Circle</h2>
<p>🎯 Your mission: Understand how every point (x, y) on the Unit Circle tells a story.</p>
<p><strong>x = cos(θ)</strong> → the left-right position of the point<br/>
<strong>y = sin(θ)</strong> → the up-down position of the point</p>
<p>Let’s see it in action…</p>

        <button id="next-btn">Next</button>
      </div>
    `;
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }

  function showCosineSlide() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2 style="color: #0074D9;">🟦 Cosine = x (Adjacent Side)</h2>
        <p>Select an angle to see how the <strong>adjacent side</strong> of the triangle gives you the <span style="color: #0074D9;">cosine</span> of the angle.</p>
        <div style="margin-bottom: 10px;">
          <button class="angle-btn" data-angle="30">30°</button>
          <button class="angle-btn" data-angle="45">45°</button>
          <button class="angle-btn" data-angle="60">60°</button>
        </div>
        <div id="unit-circle" style="text-align: center; margin-top: 10px;"></div>
        <div id="triangle-info" style="margin-top: 10px; font-size: 16px;"></div>
        <button id="next-btn" style="margin-top: 20px;">Next</button>
      </div>
    `;
  
    const svgSize = 320;
    const center = svgSize / 2;
    const radius = 100;
  
    document.querySelectorAll(".angle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const angle = parseInt(btn.getAttribute("data-angle"));
        drawCosineTriangle(angle);
      });
    });
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  
    function drawCosineTriangle(angle) {
      const angleRad = (angle * Math.PI) / 180;
      const x = Math.cos(angleRad);
      const y = Math.sin(angleRad);
    
      const px = center + radius * x;
      const py = center - radius * y;
    
      const coordX = formatTrigValue(x, angle);
      const coordY = formatTrigValue(y, angle);
    
      const svg = `
        <svg width="${svgSize}" height="${svgSize}">
          <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#ccc" stroke-width="2"/>
          <!-- Hypotenuse -->
          <line x1="${center}" y1="${center}" x2="${px}" y2="${py}" stroke="red" stroke-width="2"/>
          <!-- Adjacent (cosine) -->
          <line x1="${center}" y1="${center}" x2="${px}" y2="${center}" stroke="#0074D9" stroke-width="4"/>
          <!-- Opposite (sine) -->
          <line x1="${px}" y1="${center}" x2="${px}" y2="${py}" stroke="green" stroke-width="2"/>
          <!-- Angle dot -->
          <circle cx="${px}" cy="${py}" r="4" fill="#FFDC00"/> <!-- bright yellow -->

    
          <!-- Coordinates on the circle -->
          <text x="${px + 5}" y="${py - 5}" font-size="14" fill="#fff">
            (<tspan fill="#0074D9">${coordX}</tspan>, ${coordY})
          </text>
        </svg>
      `;
    
      document.getElementById("unit-circle").innerHTML = svg;
      document.getElementById("triangle-info").innerHTML = `
        <p><strong>Angle:</strong> ${angle}°</p>
        <p><strong>cos(${angle}°) =</strong> <span style="color:#0074D9;"><strong>${coordX}</strong></span> → adjacent side (x-value)</p>
      `;
    }
    
  
    function formatTrigValue(val, angle) {
      if (angle === 30) return val === Math.cos(Math.PI / 6) ? "√3/2" : "1/2";
      if (angle === 45) return "√2/2";
      if (angle === 60) return val === Math.cos(Math.PI / 3) ? "1/2" : "√3/2";
      return val.toFixed(2);
    }
  }
  
  
  

  function showSineSlide() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2 style="color: #2ECC40;">🟩 Sine = y (Opposite Side)</h2>
        <p>Select an angle to build the triangle and see how the <strong>opposite side</strong> of the triangle gives you the <span style="color: #2ECC40;">sine</span> of the angle.</p>
        <div style="margin-bottom: 10px;">
          <button class="angle-btn" data-angle="30">30°</button>
          <button class="angle-btn" data-angle="45">45°</button>
          <button class="angle-btn" data-angle="60">60°</button>
        </div>
        <div id="unit-circle" style="text-align: center; margin-top: 10px;"></div>
        <div id="triangle-info" style="margin-top: 10px; font-size: 16px;"></div>
        <button id="next-btn" style="margin-top: 20px;">Next</button>
      </div>
    `;
  
    const svgSize = 320;
    const center = svgSize / 2;
    const radius = 100;
  
    document.querySelectorAll(".angle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const angle = parseInt(btn.getAttribute("data-angle"));
        drawSineTriangle(angle);
      });
    });
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  
    function drawSineTriangle(angle) {
      const angleRad = (angle * Math.PI) / 180;
      const x = Math.cos(angleRad);
      const y = Math.sin(angleRad);
  
      const px = center + radius * x;
      const py = center - radius * y;
  
      const coordX = formatTrigValue(x, angle);
      const coordY = formatTrigValue(y, angle);
  
      const svg = `
        <svg width="${svgSize}" height="${svgSize}">
          <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#ccc" stroke-width="2"/>
          <!-- Hypotenuse -->
          <line x1="${center}" y1="${center}" x2="${px}" y2="${py}" stroke="red" stroke-width="2"/>
          <!-- Adjacent (x) -->
          <line x1="${center}" y1="${center}" x2="${px}" y2="${center}" stroke="#0074D9" stroke-width="2"/>
          <!-- Opposite (sine) -->
          <line x1="${px}" y1="${center}" x2="${px}" y2="${py}" stroke="#2ECC40" stroke-width="4"/>
          <!-- Angle dot -->
          <circle cx="${px}" cy="${py}" r="4" fill="black"/>
  
          <!-- Coordinates on the circle -->
          <text x="${px + 10}" y="${py - 10}" font-size="14" fill="#fff">
            (${coordX}, <tspan fill="#2ECC40">${coordY}</tspan>)
          </text>
        </svg>
      `;
  
      document.getElementById("unit-circle").innerHTML = svg;
      document.getElementById("triangle-info").innerHTML = `
        <p><strong>Angle:</strong> ${angle}°</p>
        <p><strong>sin(${angle}°) =</strong> <span style="color:#2ECC40;"><strong>${coordY}</strong></span> → opposite side (y-value)</p>
      `;
    }
  
    function formatTrigValue(val, angle) {
      if (angle === 30) return val === Math.sin(Math.PI / 6) ? "1/2" : "√3/2";
      if (angle === 45) return "√2/2";
      if (angle === 60) return val === Math.sin(Math.PI / 3) ? "√3/2" : "1/2";
      return val.toFixed(2);
    }
  }
  
  function showCombinedPicker() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>🧭 Sine and Cosine Together</h2>
        <p>Select an angle from anywhere on the unit circle. You’ll see how <span style="color:#0074D9;">cos(θ) = x</span> and <span style="color:#2ECC40;">sin(θ) = y</span> appear in every quadrant.</p>
        <div style="margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 5px; justify-content: center;">
          ${[30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330].map(angle =>
            `<button class="angle-btn" data-angle="${angle}">${angle}°</button>`).join('')}
        </div>
        <div id="unit-circle" style="text-align: center; margin-top: 10px;"></div>
        <div id="triangle-info" style="margin-top: 10px; font-size: 16px;"></div>
        <button id="next-btn" style="margin-top: 20px;">Start Quiz</button>
      </div>
    `;
  
    const svgSize = 320;
    const center = svgSize / 2;
    const radius = 100;
  
    document.querySelectorAll(".angle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const angle = parseInt(btn.getAttribute("data-angle"));
        drawFullTriangle(angle);
      });
    });
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section = 4; // 👈 Directly set it to the quiz slide
      runNextSection();
    });
    
  
    function drawFullTriangle(angle) {
      const angleRad = (angle * Math.PI) / 180;
      const x = Math.cos(angleRad);
      const y = Math.sin(angleRad);
    
      const px = center + radius * x;
      const py = center - radius * y;
    
      const coordX = formatTrigValue(x, angle);
      const coordY = formatTrigValue(y, angle);
    
      // Arc path: always start at 0° (3 o'clock), draw to terminal side
      const arcRadius = 30;
const arcStartX = center + arcRadius;
const arcStartY = center;
const arcEndX = center + arcRadius * Math.cos(angleRad);
const arcEndY = center - arcRadius * Math.sin(angleRad);
const largeArcFlag = angle > 180 ? 1 : 0;
const sweepFlag = 0; // THIS is the key: counterclockwise = 0 → correct rotation

    
      // Smart label placement
      const textOffsetX = (x >= 0) ? 10 : -80;
      const textOffsetY = (y >= 0) ? -10 : 20;
    
      const svg = `
  <svg width="${svgSize}" height="${svgSize}" style="background: white; border-radius: 10px;">
    <!-- Unit Circle -->
    <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="black" stroke-width="2"/>

    
          <!-- Axes -->
          <line x1="0" y1="${center}" x2="${svgSize}" y2="${center}" stroke="#aaa" stroke-dasharray="4,4" />
          <line x1="${center}" y1="0" x2="${center}" y2="${svgSize}" stroke="#aaa" stroke-dasharray="4,4" />
    
          <!-- Angle arc from 0° to θ -->
          <path d="M ${arcStartX} ${arcStartY}
         A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}"
      stroke="red" stroke-width="2" fill="none" />

    
          <!-- Triangle -->
          <line x1="${center}" y1="${center}" x2="${px}" y2="${py}" stroke="red" stroke-width="2"/>
          <line x1="${center}" y1="${center}" x2="${px}" y2="${center}" stroke="#0074D9" stroke-width="4"/>
          <line x1="${px}" y1="${center}" x2="${px}" y2="${py}" stroke="#2ECC40" stroke-width="4"/>
    
          <!-- Point -->
          <circle cx="${px}" cy="${py}" r="4" fill="black"/>
    
          <!-- Coordinates -->
          <text x="${px + textOffsetX}" y="${py + textOffsetY}" font-size="14" fill="#000">
            (<tspan fill="#0074D9">${coordX}</tspan>, <tspan fill="#2ECC40">${coordY}</tspan>)
          </text>
        </svg>
      `;
    
      document.getElementById("unit-circle").innerHTML = svg;
      document.getElementById("triangle-info").innerHTML = `
        <p><strong>Angle:</strong> ${angle}°</p>
        <p><strong>cos(${angle}°)</strong> = <span style="color:#0074D9;">${coordX}</span> → adjacent side (x)</p>
        <p><strong>sin(${angle}°)</strong> = <span style="color:#2ECC40;">${coordY}</span> → opposite side (y)</p>
      `;
    }
    
    
  
    function formatTrigValue(val, angle) {
      const rounded = Math.round(val * 100) / 100;
      const knownValues = {
        30: { x: "√3/2", y: "1/2" },
        45: { x: "√2/2", y: "√2/2" },
        60: { x: "1/2", y: "√3/2" },
        120: { x: "-1/2", y: "√3/2" },
        135: { x: "-√2/2", y: "√2/2" },
        150: { x: "-√3/2", y: "1/2" },
        210: { x: "-√3/2", y: "-1/2" },
        225: { x: "-√2/2", y: "-√2/2" },
        240: { x: "-1/2", y: "-√3/2" },
        300: { x: "1/2", y: "-√3/2" },
        315: { x: "√2/2", y: "-√2/2" },
        330: { x: "√3/2", y: "-1/2" },
      };
  
      if (knownValues[angle]) return angle % 90 === 0 ? val.toFixed(2) : { x: knownValues[angle].x, y: knownValues[angle].y }[val === Math.cos((angle * Math.PI) / 180) ? 'x' : 'y'];
  
      return rounded.toFixed(2);
    }
  }
  

  
  function showBootcamp3Quiz(callback) {
    const questions = [
      {
        question: "What is the cosine of 60°?",
        choices: ["1/2", "√3/2", "0", "-1"],
        correctAnswer: "1/2"
      },
      {
        question: "Which side of the triangle represents the sine of an angle?",
        choices: ["Adjacent", "Opposite", "Hypotenuse", "Base"],
        correctAnswer: "Opposite"
      },
      {
        question: "What is the y-coordinate at 90°?",
        choices: ["1", "0", "-1", "√2/2"],
        correctAnswer: "1"
      },
      {
        question: "At 180°, what is the x-value (cosine)?",
        choices: ["0", "-1", "1", "√3/2"],
        correctAnswer: "-1"
      },
      {
        question: "What are the coordinates at 225°?",
        choices: [
          "(-1/2, -√3/2)",
          "(-√3/2, -1/2)",
          "(-√2/2, -√2/2)",
          "(√2/2, -√2/2)"
        ],
        correctAnswer: "(-√2/2, -√2/2)"
      }
    ];
  
    let currentQuestion = 0;
    let score = 0;
    let attempts = 0;
  
    function renderQuestion() {
      const q = questions[currentQuestion];
      gameArea.innerHTML = `
  <div class="quiz-container slide-in" style="max-width: 600px; margin: 40px auto; padding: 30px; background: #fdf6d3; border-radius: 12px; box-shadow: 0 0 15px #0005; text-align: center; color: #222;">
    <h2 style="font-size: 26px; color: #0074D9; text-shadow: 1px 1px #fff;">🧠 Boot Camp 3 Quiz</h2>
    <p style="font-size: 20px; margin-bottom: 20px; color: #222; font-weight: bold;">${q.question}</p>
    <div class="quiz-choices" style="display: flex; flex-direction: column; gap: 12px;">
      ${q.choices.map(choice => `
        <button class="quiz-btn" style="padding: 12px; font-size: 18px; border-radius: 8px; background: white; color: black; border: 1px solid #aaa; cursor: pointer;">
          ${choice}
        </button>
      `).join('')}
    </div>
    <div style="margin-top: 20px; font-size: 16px; color: #333;">
      Question ${currentQuestion + 1} of ${questions.length}
    </div>
  </div>
`;

  
      document.querySelectorAll(".quiz-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const selected = btn.textContent.trim();
          const correct = questions[currentQuestion].correctAnswer.trim();
          if (selected === correct) score++;
          currentQuestion++;
          if (currentQuestion < questions.length) {
            renderQuestion();
          } else {
            showResult();
          }
        });
      });
    }
  
    function showResult() {
      const passed = score >= 4;
      gameArea.innerHTML = `
        <div class="slide-in" style="text-align: center; padding: 40px;">
          <h2 style="font-size: 28px; color: ${passed ? '#2ECC40' : '#FF4136'};">
            ${passed ? "✅ Boot Camp Passed!" : "❌ Try Again"}
          </h2>
          <p style="font-size: 20px;">You got ${score} out of ${questions.length} correct.</p>
          <button id="quiz-next-btn" class="answer-btn" style="margin-top: 25px;">
            ${passed ? "Return to Level 3" : "Retry Quiz"}
          </button>
        </div>
      `;
  
      document.getElementById("quiz-next-btn").addEventListener("click", () => {
        if (passed) {
          callback("level3");
        } else {
          attempts++;
          if (attempts >= 3) {
            // Restart Bootcamp 3
            section = 0;
            runNextSection();
          } else {
            // Retry quiz
            currentQuestion = 0;
            score = 0;
            renderQuestion();
          }
        }
      });
    }
  
    renderQuestion();
  }
  
  
  

  runNextSection();
}


function runBootcamp4(callback) {
  const gameArea = document.getElementById("game-area");
  let section = 0;

  runNextSection();

  function runNextSection() {
    switch (section) {
      case 0:
        showIntro();
        break;
      case 1:
        showSinToArcsinVisual();
        break;
      case 2:
        showCoordinatePicker();
        break;
      case 3:
        showInverseExplorer();
        break;
      case 4:
        showBootcampQuiz(() => startLevel(4), 4);  // ✅ Sends them directly to level 4

        break;
      default:
        callback("level4"); // ✅ Return to level 4 after passing
        break;
    }
  }

  // Slide 0: Introduction
  function showIntro() {
    gameArea.innerHTML = `
      <div class="slide-in" style="background: #fff; color: #222; border: 2px solid #ccc; border-radius: 12px; padding: 30px;">
        <h2>📘 Boot Camp 4: Inverse Trig Functions</h2>
        <p><strong>Objective:</strong> Understand how we can reverse sine, cosine, and tangent.</p>
        <p><code>sin(30°) = 1/2</code> means we input an angle and get a ratio.</p>
        <p><code>sin⁻¹(1/2) = 30°</code> means we input a ratio and get an angle.</p>
        <p>We'll use this to unlock the next level!</p>
        <button id="next-btn" class="answer-btn" style="margin-top: 20px;">Next ➡️</button>
      </div>
    `;
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }
  

  // Slide 1: Sin → arcsin visual
  function showSinToArcsinVisual() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>🔁 From sin(θ) to sin⁻¹(value)</h2>
        <p>Below, you'll see the angle and its sine value. Then we reverse it to find the angle given the value.</p>
        
        <div style="display: flex; justify-content: center;">
          <svg viewBox="0 0 400 400" width="400" height="400" style="background: #fff; border: 2px solid #ccc; border-radius: 10px;">
            <!-- Unit Circle -->
            <circle cx="200" cy="200" r="120" fill="none" stroke="#000" stroke-width="2" />
  
            <!-- Initial Side (0°) -->
            <line x1="200" y1="200" x2="320" y2="200" stroke="green" stroke-width="3" />
  
            <!-- Terminal Side (30°) -->
            <line x1="200" y1="200" x2="303" y2="140" stroke="red" stroke-width="3" />
  
            <!-- Endpoint Dot -->
            <circle cx="303" cy="140" r="5" fill="black"/>
  
            <!-- θ Label -->
            <text x="230" y="198" font-size="16" fill="black">θ = 30°</text>
  
            <!-- Coordinates (pushed right) -->
            <text x="320" y="130" font-size="14" fill="black">(√3/2, 1/2)</text>
          </svg>
        </div>
  
        <!-- Sine & arcsine labels below the SVG -->
        <div style="margin-top: 20px; text-align: center;">
          <p style="font-size: 18px; color: green;"><strong>sin(30°) = 1/2</strong></p>
          <p style="font-size: 18px; color: blue;"><strong>sin⁻¹(1/2) = 30°</strong></p>
        </div>
  
        <div style="text-align: center; margin-top: 20px;">
          <button id="next-btn" class="answer-btn">Next ➡️</button>
        </div>
      </div>
    `;
  
    // Animate sin → ratio → sin⁻¹
    setTimeout(() => {
      document.getElementById("forward").style.transition = "opacity 0.6s ease";
      document.getElementById("forward").style.opacity = "1";
    }, 500);
  
    setTimeout(() => {
      document.getElementById("reverse").style.transition = "opacity 0.6s ease";
      document.getElementById("reverse").style.opacity = "1";
    }, 1400);
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }
  
  

  // Slide 2: Coordinate picker
  function showCoordinatePicker() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>🧭 Arcsin & Arccos on the Unit Circle</h2>
        <p>Click a point on the circle. We’ll show how <strong>sin⁻¹</strong> and <strong>cos⁻¹</strong> work based on coordinates.</p>
       <svg id="circle-svg" 
     width="420" 
     height="420" 
     viewBox="0 0 420 420" 
     style="margin: 20px auto; display: block; background: #fff; border: 2px solid #ccc; border-radius: 10px;">
  <circle cx="210" cy="210" r="160" stroke="black" fill="none" stroke-width="2"/>
  <line x1="0" y1="210" x2="420" y2="210" stroke="#ccc" />
  <line x1="210" y1="0" x2="210" y2="420" stroke="#ccc" />
</svg>

        <div id="coord-feedback" style="text-align: center; font-size: 18px; margin-top: 20px;"></div>
        <div style="text-align: center; margin-top: 40px;">
          <button id="next-btn" class="answer-btn">Next</button>
        </div>
      </div>
    `;
  
    const svg = document.getElementById("circle-svg");
    const cx = 210, cy = 210, r = 160;
  
    const points = [
      { angle: 30, x: "√3/2", y: "1/2" },
      { angle: 45, x: "√2/2", y: "√2/2" },
      { angle: 60, x: "1/2", y: "√3/2" },
      { angle: 120, x: "-1/2", y: "√3/2" },
      { angle: 135, x: "-√2/2", y: "√2/2" },
      { angle: 150, x: "-√3/2", y: "1/2" },
      { angle: 210, x: "-√3/2", y: "-1/2" },
      { angle: 225, x: "-√2/2", y: "-√2/2" },
      { angle: 240, x: "-1/2", y: "-√3/2" },
      { angle: 300, x: "1/2", y: "-√3/2" },
      { angle: 315, x: "√2/2", y: "-√2/2" },
      { angle: 330, x: "√3/2", y: "-1/2" },
    ];
  
    points.forEach(pt => {
      const rad = (pt.angle * Math.PI) / 180;
      const xPos = cx + r * Math.cos(rad);
      const yPos = cy - r * Math.sin(rad);
  
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", xPos);
      dot.setAttribute("cy", yPos);
      dot.setAttribute("r", 6);
      dot.setAttribute("fill", "#FF4136");
      dot.setAttribute("cursor", "pointer");
  
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", xPos + (xPos > cx ? 10 : -80));
      label.setAttribute("y", yPos + (yPos > cy ? 15 : -10));
      label.setAttribute("font-size", "14");
      label.setAttribute("fill", "#333");
      label.style.display = "none";
  
      svg.appendChild(dot);
      svg.appendChild(label);
  
      dot.addEventListener("click", () => {
        label.textContent = `(${pt.x}, ${pt.y})`;
        label.style.display = "block";
        document.getElementById("coord-feedback").innerHTML = `
          <strong>Selected Angle:</strong> <span style="color: #2ECC40;">${pt.angle}°</span><br>
          cos(<span style="color: #2ECC40;">${pt.angle}°</span>) = <span style="color: #0074D9;">${pt.x}</span> → cos⁻¹(<span style="color: #0074D9;">${pt.x}</span>) = <span style="color: #2ECC40;">${pt.angle}°</span><br>
          sin(<span style="color: #2ECC40;">${pt.angle}°</span>) = <span style="color: #0074D9;">${pt.y}</span> → sin⁻¹(<span style="color: #0074D9;">${pt.y}</span>) = <span style="color: #2ECC40;">${pt.angle}°</span>
        `;
      });
    });
  
    const quadrantalPoints = [
      { angle: 0, x: "1", y: "0" },
      { angle: 90, x: "0", y: "1" },
      { angle: 180, x: "-1", y: "0" },
      { angle: 270, x: "0", y: "-1" }
    ];
  
    quadrantalPoints.forEach(pt => {
      const rad = (pt.angle * Math.PI) / 180;
      const xPos = cx + r * Math.cos(rad);
      const yPos = cy - r * Math.sin(rad);
  
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", xPos);
      dot.setAttribute("cy", yPos);
      dot.setAttribute("r", 6);
      dot.setAttribute("fill", "#000");
      dot.setAttribute("cursor", "pointer");
  
      const offsetX = pt.angle === 180 ? -60 : pt.angle === 0 ? 10 : -20;
      const offsetY = pt.angle === 90 ? -10 : pt.angle === 270 ? 20 : 5;
  
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", xPos + offsetX);
      label.setAttribute("y", yPos + offsetY);
      label.setAttribute("font-size", "14");
      label.setAttribute("fill", "#000");
      label.textContent = `(${pt.x}, ${pt.y})`;
      label.style.display = "none";
  
      svg.appendChild(dot);
      svg.appendChild(label);
  
      dot.addEventListener("click", () => {
        label.style.display = "block";
        document.getElementById("coord-feedback").innerHTML = `
          <strong>Selected Angle:</strong> <span style="color: #2ECC40;">${pt.angle}°</span><br>
          cos(<span style="color: #2ECC40;">${pt.angle}°</span>) = <span style="color: #0074D9;">${pt.x}</span> → cos⁻¹(<span style="color: #0074D9;">${pt.x}</span>) = <span style="color: #2ECC40;">${pt.angle}°</span><br>
          sin(<span style="color: #2ECC40;">${pt.angle}°</span>) = <span style="color: #0074D9;">${pt.y}</span> → sin⁻¹(<span style="color: #0074D9;">${pt.y}</span>) = <span style="color: #2ECC40;">${pt.angle}°</span>
        `;
      });
    });
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }
  
  
  
  

  // Slide 3: Inverse Explorer
  function showInverseExplorer() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>🔍 Inverse Function Explorer</h2>
        <p>Choose a value, then choose <strong>sin⁻¹</strong> or <strong>cos⁻¹</strong> to see which angle you'd get!</p>
  
        <div style="margin: 20px 0; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          ${["1", "√3/2", "√2/2", "1/2", "0", "-1/2", "-√2/2", "-√3/2", "-1"].map(val => `
            <button class="value-btn" style="padding: 10px 16px; border-radius: 8px; font-size: 16px;">${val}</button>
          `).join('')}
        </div>
  
        <div style="text-align: center; margin-bottom: 20px;">
          <label style="margin-right: 10px;">
            <input type="radio" name="inverseType" value="sin" checked> sin⁻¹
          </label>
          <label>
            <input type="radio" name="inverseType" value="cos"> cos⁻¹
          </label>
        </div>
  
        <div id="inverse-result" style="text-align: center; font-size: 20px; min-height: 80px;"></div>
  
        <div style="display: flex; justify-content: center;">
          <svg id="unit-circle-visual" width="420" height="420" viewBox="0 0 420 420">
            <circle cx="210" cy="210" r="160" stroke="#fff" fill="none" stroke-width="3"/>
            <line x1="0" y1="210" x2="420" y2="210" stroke="#ccc"/>
            <line x1="210" y1="0" x2="210" y2="420" stroke="#ccc"/>
          </svg>
        </div>
  
        <div style="text-align: center; margin-top: 30px;">
          <button id="next-btn" class="answer-btn">Start Quiz</button>
        </div>
      </div>
    `;
  
    const angleMap = {
      "sin|1": "90°", "sin|√3/2": "60°", "sin|√2/2": "45°", "sin|1/2": "30°",
      "sin|0": "0°", "sin|-1/2": "330°", "sin|-√2/2": "315°", "sin|-√3/2": "300°", "sin|-1": "270°",
      "cos|1": "0°", "cos|√3/2": "30°", "cos|√2/2": "45°", "cos|1/2": "60°",
      "cos|0": "90°", "cos|-1/2": "120°", "cos|-√2/2": "135°", "cos|-√3/2": "150°", "cos|-1": "180°"
    };
  
    document.querySelectorAll(".value-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.textContent.trim();
        const selected = document.querySelector("input[name='inverseType']:checked").value;
        const key = `${selected}|${val}`;
        const angle = angleMap[key];
  
        // Reset all dots
        document.querySelectorAll("circle[id^='dot-']").forEach(dot => {
          dot.setAttribute("fill", "#000");
        });
  
        // Display result
        if (angle) {
          document.getElementById("inverse-result").innerHTML =
            `<strong>${selected}⁻¹(${val}) = <span style="color: #2ECC40;">${angle}</span></strong>`;
  
          const angleNum = parseInt(angle);
          const highlightDot = document.getElementById(`dot-${angleNum}`);
          if (highlightDot) {
            highlightDot.setAttribute("fill", "#FF4136");
          }
        } else {
          document.getElementById("inverse-result").innerHTML =
            `<span style="color: #FF4136;">That value is not valid for ${selected}⁻¹</span>`;
        }
      });
    });
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  
    // Draw unit circle dots, angles, and coords
    const svg = document.getElementById("unit-circle-visual");
    const cx = 210, cy = 210, r = 160;
  
    const unitPoints = [
      { angle: 0, x: "1", y: "0" },
      { angle: 30, x: "√3/2", y: "1/2" },
      { angle: 45, x: "√2/2", y: "√2/2" },
      { angle: 60, x: "1/2", y: "√3/2" },
      { angle: 90, x: "0", y: "1" },
      { angle: 120, x: "-1/2", y: "√3/2" },
      { angle: 135, x: "-√2/2", y: "√2/2" },
      { angle: 150, x: "-√3/2", y: "1/2" },
      { angle: 180, x: "-1", y: "0" },
      { angle: 210, x: "-√3/2", y: "-1/2" },
      { angle: 225, x: "-√2/2", y: "-√2/2" },
      { angle: 240, x: "-1/2", y: "-√3/2" },
      { angle: 270, x: "0", y: "-1" },
      { angle: 300, x: "1/2", y: "-√3/2" },
      { angle: 315, x: "√2/2", y: "-√2/2" },
      { angle: 330, x: "√3/2", y: "-1/2" }
    ];
  
    unitPoints.forEach(pt => {
      const rad = (pt.angle * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy - r * Math.sin(rad);
  
      // Circle dot
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", 4);
      dot.setAttribute("fill", "#000");
      dot.setAttribute("id", `dot-${pt.angle}`);
      svg.appendChild(dot);
  
      // Angle label (inside)
      const labelAngle = document.createElementNS("http://www.w3.org/2000/svg", "text");
      labelAngle.setAttribute("x", cx + (r - 30) * Math.cos(rad));
      labelAngle.setAttribute("y", cy - (r - 30) * Math.sin(rad));
      labelAngle.setAttribute("font-size", "12");
      labelAngle.setAttribute("fill", "#2ECC40");
      labelAngle.setAttribute("text-anchor", "middle");
      labelAngle.setAttribute("alignment-baseline", "middle");
      labelAngle.textContent = `${pt.angle}°`;
      svg.appendChild(labelAngle);
  
      // Coordinate label (outside)
      const labelCoord = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const offset = (pt.angle > 180) ? 40 : 25; // More padding for bottom-left quadrant
      labelCoord.setAttribute("x", cx + (r + offset) * Math.cos(rad));
      labelCoord.setAttribute("y", cy - (r + offset) * Math.sin(rad));
      labelCoord.setAttribute("font-size", "12");
      labelCoord.setAttribute("fill", "#0074D9");
      labelCoord.setAttribute("text-anchor", "middle");
      labelCoord.textContent = `(${pt.x}, ${pt.y})`;
      svg.appendChild(labelCoord);
    });
  }
  
  
  
}

export function runBootcamp5(player, callback) {
  const gameArea = document.getElementById("game-area");
  let section = 0;

  function runNextSection() {
    switch (section) {
      case 0:
        showTangentWelcome(); // ✅ Slide 0 – Bootcamp overview
        break;
      case 1:
        showTangentIntro();   // ✅ Slide 1 – Triangle diagram
        break;
      case 2:
        showTangentAsYX();    // ✅ Slide 2 – y = sin(θ), x = cos(θ)
        break;
      case 3:
        showTangentAsSinOverCos(); // ✅ Slide 3 – sin/cos identity
        break;
      case 4:
        showTangentExplorer();     // ✅ Slide 4 – Interactive explorer
        break;
      case 5:
        showBootcampQuiz5();       // ✅ Slide 5 – Quiz
        break;
      default:
        callback();                // 🎯 Return to Level 5
        break;
    }
  }
  

  function showTangentWelcome() {
  gameArea.innerHTML = `
    <div class="slide-in">
      <h2>📘 Boot Camp 5: Tangent</h2>
      <p>Welcome to Boot Camp 5! 🎯</p>
      <p>In this boot camp, you'll learn how <strong>tangent</strong> is connected to the unit circle, and why it's really just a ratio of <span style="color: green;">opposite</span> over <span style="color: blue;">adjacent</span>.</p>
      <p>You’ll also discover how <span style="color: orange;">tan(θ) = sin(θ)/cos(θ)</span> — a powerful identity that connects all three trig functions.</p>
      <p>Let’s break it down together. 💪</p>

      <button id="next-btn" class="answer-btn" style="margin-top: 30px;">Start Learning ➡️</button>
    </div>
  `;
  document.getElementById("next-btn").addEventListener("click", () => {
    section++;
    runNextSection();
  });
}

  
  // 🔹 Slide 1 – Intro to Tangent
  function showTangentIntro() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>📐 What Is Tangent?</h2>
        <p>Tangent compares how tall something is to how far it runs — it's <strong>rise over run</strong>.</p>
        <p>In a right triangle, that's the <span style="color: green;"><strong>opposite</strong></span> side over the <span style="color: blue;"><strong>adjacent</strong></span> side.</p>
  
        <div style="display: flex; justify-content: center; margin-top: 20px;">
          <svg viewBox="0 0 400 400" width="350" height="350" style="border: 1px solid #ccc;">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#000" stroke-width="2"/>
  
            <!-- Triangle sides -->
            <line x1="200" y1="200" x2="320" y2="200" stroke="blue" stroke-width="4"/> <!-- Adjacent -->
            <line x1="320" y1="200" x2="320" y2="118" stroke="green" stroke-width="4"/> <!-- Opposite (adjusted) -->
            <line x1="200" y1="200" x2="320" y2="118" stroke="#FF851B" stroke-width="3" stroke-dasharray="4"/> <!-- Hypotenuse -->
  
            <!-- Labels -->
            <text x="250" y="215" font-size="14" fill="blue">adjacent</text>
            <text x="325" y="160" font-size="14" fill="green">opposite</text>
          </svg>
        </div>
  
        <p style="margin-top: 20px;">
          So, <strong style="color: orange;">tan(θ) = <span style="color: green;">y</span> / <span style="color: blue;">x</span></strong>
        </p>
        <p style="margin-top: 10px;">
          Which is the same as <strong style="color: orange;">tan(θ) = <span style="color: green;">sin(θ)</span> / <span style="color: blue;">cos(θ)</span></strong>
        </p>
  
        <button id="next-btn" class="answer-btn" style="margin-top: 20px;">Next ➡️</button>
      </div>
    `;
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }
  
  
  
  

  // 🔹 Slide 2 – y/x
  function showTangentAsYX() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>🔍 From Triangle to Trig</h2>
        <p>On the unit circle:</p>
        <ul style="list-style-type: none; padding: 0; font-size: 18px;">
          <li><span style="color: green;"><strong>y</strong> = sin(θ)</span></li>
          <li><span style="color: blue;"><strong>x</strong> = cos(θ)</span></li>
        </ul>
        <div style="display: flex; justify-content: center; margin-top: 20px;">
          <svg viewBox="0 0 400 400" width="350" height="350" style="border: 1px solid #ccc;">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#000" stroke-width="2"/>
  
            <!-- Triangle sides -->
            <line x1="200" y1="200" x2="320" y2="200" stroke="blue" stroke-width="4"/> <!-- Adjacent -->
            <line x1="320" y1="200" x2="320" y2="118" stroke="green" stroke-width="4"/> <!-- Opposite -->
            <line x1="200" y1="200" x2="320" y2="118" stroke="#FF851B" stroke-width="3" stroke-dasharray="4"/> <!-- Hypotenuse -->
  
            <!-- sin/cos Labels (fade in) -->
            <text id="cos-label" x="250" y="215" font-size="14" fill="blue" opacity="0">cos(θ)</text>
            <text id="sin-label" x="325" y="160" font-size="14" fill="green" opacity="0">sin(θ)</text>
          </svg>
        </div>
  
        <p id="equation-text" style="margin-top: 30px; font-size: 20px; opacity: 0;">
          So, <strong style="color: orange;">tan(θ) = <span style="color: green;">sin(θ)</span> / <span style="color: blue;">cos(θ)</span></strong>
        </p>
  
        <button id="next-btn" class="answer-btn" style="margin-top: 20px;">Next ➡️</button>
      </div>
    `;
  
    // Animate the sin/cos labels and equation fade-in
    setTimeout(() => {
      document.getElementById("sin-label").setAttribute("opacity", "1");
      document.getElementById("cos-label").setAttribute("opacity", "1");
    }, 800);
  
    setTimeout(() => {
      document.getElementById("equation-text").style.transition = "opacity 0.5s ease";
      document.getElementById("equation-text").style.opacity = "1";
    }, 1600);
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }
  

  // 🔹 Slide 3 – sin / cos
  function showTangentAsSinOverCos() {
    gameArea.innerHTML = `
      <div class="slide-in" style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 40px; text-align: center;">
        
        <!-- Left Side: Unit Circle -->
        <div>
          <svg id="tan-circle" viewBox="0 0 400 400" width="300" height="300" style="background: #fff; border: 1px solid #ccc;">
            <!-- Circle -->
            <circle cx="200" cy="200" r="150" stroke="#000" fill="none" stroke-width="2"/>
            <!-- Axes -->
            <line x1="0" y1="200" x2="400" y2="200" stroke="#ccc" stroke-width="2"/>
            <line x1="200" y1="0" x2="200" y2="400" stroke="#ccc" stroke-width="2"/>
            <!-- Terminal Side for 120° -->
            <line x1="200" y1="200" x2="125" y2="70" stroke="red" stroke-width="3"/>
            <!-- Point on Circle -->
            <circle cx="125" cy="70" r="6" fill="red"/>
            <!-- Moved Label (now outside the circle) -->
            <text x="90" y="55" font-size="14" fill="#000">(−1/2, √3/2)</text>
          </svg>
          <p style="margin-top: 10px;">📍 Point at 120°</p>
        </div>
  
        <!-- Right Side: MathJax Breakdown -->
        <div style="max-width: 400px; font-size: 18px;">
          <p><strong>Let’s break down:</strong></p>
          <p>
            \\( \\cos(120^\\circ) = -\\frac{1}{2} \\quad \\sin(120^\\circ) = \\frac{\\sqrt{3}}{2} \\)
          </p>
          <p style="margin-top: 20px;">
            \\( \\tan(120^\\circ) = \\frac{\\sin(120^\\circ)}{\\cos(120^\\circ)} \\)
          </p>
          <p>
            \\( = \\frac{\\frac{\\sqrt{3}}{2}}{-\\frac{1}{2}} \\)
          </p>
          <p style="font-size: 24px; margin-top: 10px;">
            \\( \\tan(120^\\circ) = -\\sqrt{3} \\)
          </p>
          <p style="font-style: italic; font-size: 16px; color: #555;">Tangent compares vertical to horizontal: y over x.</p>
  
          <button id="next-btn" class="answer-btn" style="margin-top: 30px;">Next ➡️</button>
        </div>
      </div>
    `;
  
    if (window.MathJax) {
      MathJax.typesetPromise();
    }
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }
  
  
  
  

  // 🔹 Slide 4 – Interactive Tangent Explorer (Placeholder)
  function showTangentExplorer() {
    const angleData = [
      {
        angle: 0, coords: ["1", "0"], coordsText: "(1, 0)", tan: "0"
      },
      {
        angle: 30, coords: ["\\frac{\\sqrt{3}}{2}", "\\frac{1}{2}"], coordsText: "(√3/2, 1/2)", tan: "\\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}"
      },
      {
        angle: 45, coords: ["\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{2}}{2}"], coordsText: "(√2/2, √2/2)", tan: "1"
      },
      {
        angle: 60, coords: ["\\frac{1}{2}", "\\frac{\\sqrt{3}}{2}"], coordsText: "(1/2, √3/2)", tan: "\\frac{\\sqrt{3}}{1} = \\sqrt{3}"
      },
      {
        angle: 90, coords: ["0", "1"], coordsText: "(0, 1)", tan: "undefined"
      },
      {
        angle: 120, coords: ["-\\frac{1}{2}", "\\frac{\\sqrt{3}}{2}"], coordsText: "(-1/2, √3/2)", tan: "\\frac{\\sqrt{3}}{-1} = -\\sqrt{3}"
      },
      {
        angle: 135, coords: ["-\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{2}}{2}"], coordsText: "(-√2/2, √2/2)", tan: "-1"
      },
      {
        angle: 150, coords: ["-\\frac{\\sqrt{3}}{2}", "\\frac{1}{2}"], coordsText: "(-√3/2, 1/2)", tan: "\\frac{1}{-\\sqrt{3}} = -\\frac{\\sqrt{3}}{3}"
      },
      {
        angle: 180, coords: ["-1", "0"], coordsText: "(-1, 0)", tan: "0"
      },
      {
        angle: 210, coords: ["-\\frac{\\sqrt{3}}{2}", "-\\frac{1}{2}"], coordsText: "(-√3/2, -1/2)", tan: "\\frac{-1}{-\\sqrt{3}} = \\frac{\\sqrt{3}}{3}"
      },
      {
        angle: 225, coords: ["-\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{2}}{2}"], coordsText: "(-√2/2, -√2/2)", tan: "1"
      },
      {
        angle: 240, coords: ["-\\frac{1}{2}", "-\\frac{\\sqrt{3}}{2}"], coordsText: "(-1/2, -√3/2)", tan: "\\frac{-\\sqrt{3}}{-1} = \\sqrt{3}"
      },
      {
        angle: 270, coords: ["0", "-1"], coordsText: "(0, -1)", tan: "undefined"
      },
      {
        angle: 300, coords: ["\\frac{1}{2}", "-\\frac{\\sqrt{3}}{2}"], coordsText: "(1/2, -√3/2)", tan: "\\frac{-\\sqrt{3}}{1} = -\\sqrt{3}"
      },
      {
        angle: 315, coords: ["\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{2}}{2}"], coordsText: "(√2/2, -√2/2)", tan: "-1"
      },
      {
        angle: 330, coords: ["\\frac{\\sqrt{3}}{2}", "-\\frac{1}{2}"], coordsText: "(√3/2, -1/2)", tan: "\\frac{-1}{\\sqrt{3}} = -\\frac{\\sqrt{3}}{3}"
      },
      {
        angle: 360, coords: ["1", "0"], coordsText: "(1, 0)", tan: "0"
      }
    ];
  
    let current = 0;
  
    function render() {
      const cx = 220, cy = 220, r = 150;
      const { angle, coords, coordsText, tan } = angleData[current];
      const [xStr, yStr] = coords;
      const isUndefined = tan === "undefined";
  
      const rad = (angle * Math.PI) / 180;
      const dotX = cx + r * Math.cos(rad);
      const dotY = cy - r * Math.sin(rad);
  
      gameArea.innerHTML = `
        <div style="text-align: center;">

          <h2>📐 Tangent Triangle Visualizer</h2>
          <p>Select an angle to explore tangent visually and algebraically.</p>
  
          <div style="margin-bottom: 15px;">
            ${angleData.map((a, i) =>
              `<button class="answer-btn" style="margin: 3px;" data-index="${i}">${a.angle}°</button>`
            ).join("")}
          </div>
  
          <svg viewBox="0 0 480 480" width="400" height="400" style="border: 1px solid #ccc;">
            <circle cx="${cx}" cy="${cy}" r="${r}" stroke="white" fill="none" stroke-width="2"/>
            <line x1="0" y1="${cy}" x2="480" y2="${cy}" stroke="#ccc" stroke-width="1"/>
            <line x1="${cx}" y1="0" x2="${cx}" y2="480" stroke="#ccc" stroke-width="1"/>
            ${angleData.map((a, i) => {
              const rad = (a.angle * Math.PI) / 180;
              const x = cx + r * Math.cos(rad);
              const y = cy - r * Math.sin(rad);
              const angleX = cx + (r - 25) * Math.cos(rad);
              const angleY = cy - (r - 25) * Math.sin(rad);
              const coordX = cx + (r + 40) * Math.cos(rad);
              const coordY = cy - (r + 40) * Math.sin(rad);
              return `
                <circle cx="${x}" cy="${y}" r="4" fill="${i === current ? 'red' : '#999'}"/>
                <text x="${angleX}" y="${angleY}" font-size="12" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" fill="white">${a.angle}°</text>
<text x="${coordX}" y="${coordY}" font-size="12" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" fill="white">${a.coordsText}</text>


              `;
            }).join("")}
          </svg>
  
          <div style="margin-top: 25px; font-size: 18px;">
            <p>\\( \\sin(${angle}^\\circ) = ${yStr}, \\quad \\cos(${angle}^\\circ) = ${xStr} \\)</p>
            <p>\\( \\tan(${angle}^\\circ) = \\frac{\\sin(θ)}{\\cos(θ)} = ${isUndefined ? "\\text{undefined}" : tan} \\)</p>
          </div>
  
          <p style="font-style: italic; color: #555;">
            Tangent is undefined when cosine is zero (x = 0).
          </p>
  
          <button id="next-section" class="answer-btn" style="margin-top: 30px;">Take the Quiz 🧠</button>
        </div>
      `;
  
      if (window.MathJax) MathJax.typesetPromise();
  
      document.querySelectorAll(".answer-btn[data-index]").forEach(btn => {
        btn.addEventListener("click", () => {
          current = parseInt(btn.dataset.index);
          render();
        });
      });
  
      document.getElementById("next-section").addEventListener("click", () => {
        section++;
        runNextSection();
      });
    }
  
    render();
  }
  
  
  
  
  
  

  // 🔹 Slide 5 – Tangent Quiz Placeholder
  function showBootcampQuiz5() {
    showBootcampQuiz(() => startLevel(5), 5); // 🔁 uses universal quiz system
  }

  // 🔹 Start it all
  runNextSection();
}

export function runBootcamp6(player, callback) {
  const gameArea = document.getElementById("game-area");
  let section = 0;

  function runNextSection() {
    switch (section) {
      case 0:
        showBootcamp6Intro();
        break;
      case 1:
        showValueBankMatch();
        break;
      case 2:
        showInteractiveDragDropReview();
        break;
      case 3:
        showBootcampQuiz(() => startLevel(6), 6); // Universal quiz call
        break;
      default:
        callback(); // Send back to level 6
        break;
    }
  }

  function showBootcamp6Intro() {
    gameArea.innerHTML = `
      <div class="slide-in">
        <h2>🧠 Boot Camp 6: Value Matching</h2>
        <p>Welcome to your final Boot Camp before the boss battle!</p>
        <p>In this one, we’ll review the most important sine, cosine, and tangent values.</p>
        <p>You’ll practice matching exact values like <strong>tan(45°) = 1</strong> and <strong>sin(60°) = √3/2</strong>.</p>
        <p>Let’s make sure you’ve got these nailed before the showdown. 💪</p>
        <button id="next-btn" class="answer-btn" style="margin-top: 25px;">Start Reviewing ➡️</button>
      </div>
    `;
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }

  function showValueBankMatch() {
    gameArea.innerHTML = `
      <div class="slide-in" style="text-align: center;">
        <h2>📊 Trig Value Bank</h2>
        <p>Here are the most important sine, cosine, and tangent values to remember:</p>
  
        <div style="overflow-x: auto; margin-top: 20px;">
          <table style="margin: auto; border-collapse: collapse; font-size: 18px; border: 1px solid #aaa;">
            <thead>
              <tr style="background: #f0f0f0;">
                <th style="padding: 10px; border: 1px solid #aaa;">Angle</th>
                <th style="padding: 10px; border: 1px solid #aaa; color: green;">sin(θ)</th>
                <th style="padding: 10px; border: 1px solid #aaa; color: blue;">cos(θ)</th>
                <th style="padding: 10px; border: 1px solid #aaa; color: orange;">tan(θ)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border: 1px solid #aaa;">0°</td>
                <td style="color: green; border: 1px solid #aaa;">0</td>
                <td style="color: blue; border: 1px solid #aaa;">1</td>
                <td style="color: orange; border: 1px solid #aaa;">0</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #aaa;">30°</td>
                <td style="color: green; border: 1px solid #aaa;">1/2</td>
                <td style="color: blue; border: 1px solid #aaa;">√3/2</td>
                <td style="color: orange; border: 1px solid #aaa;">√3/3</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #aaa;">45°</td>
                <td style="color: green; border: 1px solid #aaa;">√2/2</td>
                <td style="color: blue; border: 1px solid #aaa;">√2/2</td>
                <td style="color: orange; border: 1px solid #aaa;">1</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #aaa;">60°</td>
                <td style="color: green; border: 1px solid #aaa;">√3/2</td>
                <td style="color: blue; border: 1px solid #aaa;">1/2</td>
                <td style="color: orange; border: 1px solid #aaa;">√3</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #aaa;">90°</td>
                <td style="color: green; border: 1px solid #aaa;">1</td>
                <td style="color: blue; border: 1px solid #aaa;">0</td>
                <td style="color: orange; border: 1px solid #aaa;">undefined</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <p style="margin-top: 20px;">Memorizing these will help you speed through the boss level! 🔥</p>
  
        <button id="next-btn" class="answer-btn" style="margin-top: 25px;">Practice Matching ➡️</button>
      </div>
    `;
  
    document.getElementById("next-btn").addEventListener("click", () => {
      section++;
      runNextSection();
    });
  }
  

  function showInteractiveDragDropReview() {
    const expressions = [
      { id: "sin30", label: "sin(30°)", answer: "1/2" },
      { id: "cos60", label: "cos(60°)", answer: "1/2" },
      { id: "tan45", label: "tan(45°)", answer: "1" },
      { id: "sin60", label: "sin(60°)", answer: "√3/2" },
      { id: "cos45", label: "cos(45°)", answer: "√2/2" }
    ];
  
    const values = [
      "1/2", "√2/2", "√3/2", "1", "0", "√3/3", "undefined"
    ];
  
    gameArea.innerHTML = `
      <div class="slide-in" style="text-align: center;">
        <h2>🎯 Match the Trig Values</h2>
        <p>Drag each value to the correct expression:</p>
  
        <div id="value-bank" style="margin: 20px auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">
          ${values.map(val => `
            <div class="draggable" draggable="true" data-value="${val}" style="padding: 8px 14px; border: 1px solid #ccc; background: #eee; color: black; border-radius: 8px; cursor: grab;">

              ${val}
            </div>
          `).join("")}
        </div>
  
        <div id="targets" style="display: flex; flex-direction: column; align-items: center; gap: 15px; margin-top: 30px;">
          ${expressions.map(exp => `
            <div class="drop-target" data-answer="${exp.answer}" style="padding: 10px 20px; border: 2px dashed #aaa; width: 250px; border-radius: 10px;" id="${exp.id}">
              ${exp.label} = <span class="drop-slot" style="font-weight: bold;">?</span>
            </div>
          `).join("")}
        </div>
  
        <button id="check-btn" class="answer-btn" style="margin-top: 30px;">Check Answers ✅</button>
      </div>
    `;
  
    // Handle drag and drop
    const draggables = document.querySelectorAll(".draggable");
    const targets = document.querySelectorAll(".drop-target");
  
    draggables.forEach(elem => {
      elem.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", elem.dataset.value);
      });
    });
  
    targets.forEach(target => {
      const dropSlot = target.querySelector(".drop-slot");
      target.addEventListener("dragover", e => e.preventDefault());
      target.addEventListener("drop", e => {
        e.preventDefault();
        const droppedValue = e.dataTransfer.getData("text/plain");
        dropSlot.textContent = droppedValue;
        dropSlot.dataset.value = droppedValue;
      });
    });
  
    document.getElementById("check-btn").addEventListener("click", () => {
      let correct = 0;
      targets.forEach(target => {
        const expected = target.dataset.answer;
        const actual = target.querySelector(".drop-slot").dataset.value;
        if (expected === actual) {
          target.style.borderColor = "#2ECC40"; // green
          correct++;
        } else {
          target.style.borderColor = "#FF4136"; // red
        }
      });
  
      if (correct === expressions.length) {
        setTimeout(() => {
          section++;
          runNextSection();
        }, 1000);
      }
    });
  }
  

  runNextSection(); // Boot it up
  window.runBootcamp6 = runBootcamp6; // Ensure it’s global
}



window.runBootcamp1 = runBootcamp1;
window.runBootcamp2 = runBootcamp2;
window.runBootcamp3 = runBootcamp3;
window.runBootcamp4 = runBootcamp4;
window.runBootcamp5 = runBootcamp5;
window.runBootcamp6 = runBootcamp6;
function showBootcampQuiz(callback, returnLevel) {
  let questions = [];

  if (returnLevel === 3) {
    questions = [
      {
        question: "What is the cosine of 60°?",
        choices: ["1/2", "√3/2", "0", "-1"],
        correctAnswer: "1/2"
      },
      {
        question: "Which side of the triangle represents the sine of an angle?",
        choices: ["Adjacent", "Opposite", "Hypotenuse", "Base"],
        correctAnswer: "Opposite"
      },
      {
        question: "What is the y-coordinate at 90°?",
        choices: ["1", "0", "-1", "√2/2"],
        correctAnswer: "1"
      },
      {
        question: "At 180°, what is the x-value (cosine)?",
        choices: ["0", "-1", "1", "√3/2"],
        correctAnswer: "-1"
      },
      {
        question: "What are the coordinates at 225°?",
        choices: [
          "(-1/2, -√3/2)",
          "(-√3/2, -1/2)",
          "(-√2/2, -√2/2)",
          "(√2/2, -√2/2)"
        ],
        correctAnswer: "(-√2/2, -√2/2)"
      }
    ];
  } else if (returnLevel === 4) {
    questions = [
      {
        question: "What is sin⁻¹(1/2)?",
        choices: ["30°", "45°", "60°", "90°"],
        correctAnswer: "30°"
      },
      {
        question: "What is cos⁻¹(-1)?",
        choices: ["90°", "180°", "270°", "0°"],
        correctAnswer: "180°"
      },
      {
        question: "What does sin⁻¹(x) return?",
        choices: ["A side length", "An angle", "A ratio", "A triangle"],
        correctAnswer: "An angle"
      },
      {
        question: "What is the input to sin⁻¹?",
        choices: ["An angle", "A coordinate", "A ratio", "A triangle"],
        correctAnswer: "A ratio"
      },
      {
        question: "Which of the following is true?",
        choices: [
          "cos⁻¹(1/2) = 30°",
          "cos⁻¹(1/2) = 60°",
          "cos⁻¹(1/2) = 90°",
          "cos⁻¹(1/2) = 120°"
        ],
        correctAnswer: "cos⁻¹(1/2) = 60°"
      }
    ];
  } else if (returnLevel === 5) {
    questions = [
      {
        question: "What is the definition of tangent in a right triangle?",
        choices: ["Opposite / Adjacent", "Adjacent / Hypotenuse", "Opposite / Hypotenuse", "1 / Sine"],
        correctAnswer: "Opposite / Adjacent"
      },
      {
        question: "On the unit circle, what is tan(45°)?",
        choices: ["0", "1", "√3", "Undefined"],
        correctAnswer: "1"
      },
      {
        question: "Why is tan(90°) undefined?",
        choices: ["Because sine is zero", "Because cosine is zero", "Because it equals π", "Because sine and cosine are equal"],
        correctAnswer: "Because cosine is zero"
      },
      {
        question: "In which quadrant is tangent positive?",
        choices: ["I and III", "II and IV", "Only I", "Only IV"],
        correctAnswer: "I and III"
      },
      {
        question: "If tan(θ) = sin(θ)/cos(θ), what happens when cos(θ) = 0?",
        choices: ["tan(θ) = 0", "tan(θ) = sin(θ)", "tan(θ) is undefined", "tan(θ) = 1"],
        correctAnswer: "tan(θ) is undefined"
      }
    ];
  } else if (returnLevel === 6) {
    questions = [
      {
        question: "What is sin(30°)?",
        choices: ["1", "1/2", "√2/2", "√3/2"],
        correctAnswer: "1/2"
      },
      {
        question: "What is cos(60°)?",
        choices: ["1/2", "√2/2", "√3/2", "0"],
        correctAnswer: "1/2"
      },
      {
        question: "What is tan(45°)?",
        choices: ["1", "0", "√3", "undefined"],
        correctAnswer: "1"
      },
      {
        question: "What is sin(90°)?",
        choices: ["1", "0", "undefined", "√3/2"],
        correctAnswer: "1"
      },
      {
        question: "What is tan(90°)?",
        choices: ["0", "1", "undefined", "√3"],
        correctAnswer: "undefined"
      }
    ];
  } else {
    // Fallback default questions
    questions = [
      {
        question: "What is cos(0°)?",
        choices: ["0", "1", "-1", "1/2"],
        correctAnswer: "1"
      },
      {
        question: "What is sin(90°)?",
        choices: ["0", "1", "1/2", "√3/2"],
        correctAnswer: "1"
      },
      {
        question: "Which of the following is a coordinate?",
        choices: ["30°", "1/2", "(1, 0)", "π"],
        correctAnswer: "(1, 0)"
      },
      {
        question: "Which value is NOT on the unit circle?",
        choices: ["√3/2", "-√2/2", "-1", "2"],
        correctAnswer: "2"
      },
      {
        question: "What is the reference angle of 210°?",
        choices: ["30°", "60°", "90°", "45°"],
        correctAnswer: "30°"
      }
    ];
  }

  let current = 0;
  let score = 0;
  let attempts = 0;

  function renderQuestion() {
    const q = questions[current];
    gameArea.innerHTML = `
    <div class="quiz-container slide-in" style="max-width: 600px; margin: auto; padding: 30px; background: #fff; border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.1); text-align: center; color: #111;">
      <h2 style="color: #111;">🧠 Quiz</h2>
      <p style="color: #111; font-size: 20px;">${q.question}</p>
      <div class="quiz-choices" style="display: flex; flex-direction: column; gap: 10px;">
        ${q.choices.map(c => `
          <button class="quiz-btn" style="padding: 12px; font-size: 18px; border-radius: 8px; background: #f0f0f0; border: 1px solid #aaa; color: #111; font-weight: bold;">
            ${c}
          </button>
        `).join("")}
      </div>
      <p style="margin-top: 20px; color: #555;">Question ${current + 1} of ${questions.length}</p>
    </div>
  `;
  

    document.querySelectorAll(".quiz-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.textContent.trim() === q.correctAnswer.trim()) score++;
        current++;
        if (current < questions.length) {
          renderQuestion();
        } else {
          showResult();
        }
      });
    });
  }

  function showResult() {
    const passed = score >= 4;
    gameArea.innerHTML = `
      <div class="slide-in" style="text-align: center; padding: 30px;">
        <h2 style="color: ${passed ? '#2ECC40' : '#FF4136'};">
          ${passed ? "✅ Boot Camp Complete!" : "❌ Try Again"}
        </h2>
        <p>You got ${score} / ${questions.length} correct.</p>
        <button id="quiz-next-btn">${passed ? "Return to Level" : "Retry Quiz"}</button>
      </div>
    `;

    document.getElementById("quiz-next-btn").addEventListener("click", () => {
      if (passed) {
        window.startLevel(returnLevel);
      } else {
        attempts++;
        if (attempts >= 2) {
          const restart = window[`runBootcamp${returnLevel}`];
          if (typeof restart === "function") {
            restart(player, () => window.startLevel(returnLevel));
          }
        } else {
          current = 0;
          score = 0;
          renderQuestion();
        }
      }
    });
  }

  renderQuestion();
}




