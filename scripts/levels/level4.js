// level4.js - Drag and drop LaTeX angle answers for inverse trig prompts

function runLevel4(player, callback) {
  console.log("✅ runLevel4() called");
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";

  if (!player.usedInverseTrig) player.usedInverseTrig = [];

  const inverseBank = [
    { func: "\\sin^{-1}", value: "0", angle: "0^{\\circ}", alt: null },
    { func: "\\sin^{-1}", value: "\\frac{1}{2}", angle: "30^{\\circ}", alt: "150^{\\circ}" },
    { func: "\\sin^{-1}", value: "\\frac{\\sqrt{2}}{2}", angle: "45^{\\circ}", alt: "135^{\\circ}" },
    { func: "\\sin^{-1}", value: "\\frac{\\sqrt{3}}{2}", angle: "60^{\\circ}", alt: "120^{\\circ}" },
    { func: "\\sin^{-1}", value: "1", angle: "90^{\\circ}", alt: null },

    { func: "\\cos^{-1}", value: "1", angle: "0^{\\circ}", alt: null },
    { func: "\\cos^{-1}", value: "\\frac{\\sqrt{3}}{2}", angle: "30^{\\circ}", alt: "330^{\\circ}" },
    { func: "\\cos^{-1}", value: "\\frac{\\sqrt{2}}{2}", angle: "45^{\\circ}", alt: "315^{\\circ}" },
    { func: "\\cos^{-1}", value: "\\frac{1}{2}", angle: "60^{\\circ}", alt: "300^{\\circ}" },
    { func: "\\cos^{-1}", value: "0", angle: "90^{\\circ}", alt: null },
    { func: "\\cos^{-1}", value: "-\\frac{1}{2}", angle: "120^{\\circ}", alt: "240^{\\circ}" },
    { func: "\\cos^{-1}", value: "-\\frac{\\sqrt{2}}{2}", angle: "135^{\\circ}", alt: "225^{\\circ}" },
    { func: "\\cos^{-1}", value: "-\\frac{\\sqrt{3}}{2}", angle: "150^{\\circ}", alt: "210^{\\circ}" },
    { func: "\\cos^{-1}", value: "-1", angle: "180^{\\circ}", alt: null }
  ];

  const remaining = inverseBank.filter(q => !player.usedInverseTrig.includes(`${q.func}-${q.value}`));
  if (remaining.length === 0) {
    player.usedInverseTrig = [];
    remaining.push(...inverseBank);
  }

  const next = remaining[Math.floor(Math.random() * remaining.length)];
  player.usedInverseTrig.push(`${next.func}-${next.value}`);

  const prompt = document.createElement("h3");
  const requiresTwo = !!next.alt;
  prompt.innerHTML = `What is \\(${next.func}\\left(${next.value}\\right)\\)?${requiresTwo ? " (Choose both answers)" : ""}`;

  prompt.style.textAlign = "center";
  prompt.style.marginBottom = "20px";
  gameArea.appendChild(prompt);

  const scoreCard = document.createElement("p");
  scoreCard.textContent = `✅ ${player.correct}    ❌ ${player.incorrect}`;
  scoreCard.style.textAlign = "center";
  scoreCard.style.fontWeight = "bold";
  scoreCard.style.marginBottom = "15px";
  gameArea.appendChild(scoreCard);

  const angleChoices = [
    "0^{\\circ}", "30^{\\circ}", "45^{\\circ}", "60^{\\circ}", "90^{\\circ}",
    "120^{\\circ}", "135^{\\circ}", "150^{\\circ}", "180^{\\circ}",
    "210^{\\circ}", "225^{\\circ}", "240^{\\circ}", "300^{\\circ}", "315^{\\circ}", "330^{\\circ}"
  ];

  const choicesContainer = document.createElement("div");
  choicesContainer.style.display = "flex";
  choicesContainer.style.flexWrap = "wrap";
  choicesContainer.style.justifyContent = "center";
  choicesContainer.style.gap = "12px";
  gameArea.appendChild(choicesContainer);

  angleChoices.forEach(val => {
    const choice = document.createElement("div");
    choice.innerHTML = `\\(${val}\\)`;

    choice.className = "drop-choice";
    choice.draggable = true;
    choice.style.padding = "10px 16px";
    choice.style.border = "2px solid #444";
    choice.style.borderRadius = "8px";
    choice.style.background = "white";
    choice.style.cursor = "grab";
    choice.style.fontSize = "18px";
    choice.style.userSelect = "none";
    choice.style.color = "black";


    choice.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", val);
    });

    choicesContainer.appendChild(choice);
  });

  const dropZone = document.createElement("div");
  dropZone.textContent = requiresTwo ? "Drop both correct answers here" : "Drop the correct answer here";
  dropZone.style.marginTop = "30px";
  dropZone.style.minHeight = "60px";
  dropZone.style.border = "3px dashed #777";
  dropZone.style.borderRadius = "12px";
  dropZone.style.display = "flex";
  dropZone.style.alignItems = "center";
  dropZone.style.justifyContent = "center";
  dropZone.style.fontSize = "20px";
  dropZone.style.fontWeight = "bold";
  dropZone.style.color = "black";

  dropZone.style.background = "#f9f9f9";
  dropZone.style.flexWrap = "wrap";
  gameArea.appendChild(dropZone);

  const selectedAnswers = new Set();

  dropZone.addEventListener("dragover", (e) => e.preventDefault());
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.getData("text/plain");
    if (!selectedAnswers.has(dropped)) {
      selectedAnswers.add(dropped);
      const el = document.createElement("div");
      el.innerHTML = `\\(${dropped}\\)`;

      el.style.margin = "4px";
      el.style.padding = "4px 10px";
      el.style.border = "2px solid #aaa";
      el.style.borderRadius = "6px";
      el.style.background = "#fff";
      el.style.fontSize = "18px";
      dropZone.appendChild(el);
      renderMath(el);

    }

    const answerCount = selectedAnswers.size;
    const expectedCount = requiresTwo ? 2 : 1;

    if (answerCount === expectedCount) {
      const answers = Array.from(selectedAnswers).map(a => a.replace(/\\/g, '').replace(/\s+/g, ''));
      const correct = [next.angle, next.alt].filter(Boolean).map(a => a.replace(/\\/g, '').replace(/\s+/g, ''));
      const bothCorrect = correct.every(c => answers.includes(c)) && answers.length === correct.length;

      if (bothCorrect) {
        dropZone.innerHTML = "✅ Correct!";
        dropZone.style.borderColor = "green";
        player.correct++;
      } else {
        dropZone.innerHTML = `❌ Nope! Correct answer${correct.length > 1 ? 's' : ''}: \\(${next.angle}\\)` + (next.alt ? ` and \\(${next.alt}\\)` : "");

        dropZone.style.borderColor = "red";
        player.incorrect++;
      }

      renderMath(dropZone);

      setTimeout(() => {
        if (player.correct >= 6) {
          callback("complete");
        } else if (player.incorrect >= 3) {
          const gameArea = document.getElementById("game-area");
          gameArea.innerHTML = `
            <div class="fail-screen" style="text-align: center; margin-top: 50px;">
              <h2>💥 Too many mistakes!</h2>
              <p>Let’s brush up your skills in Boot Camp 4.</p>
              <button id="go-to-bootcamp4" class="answer-btn" style="margin-top: 20px;">Go to Boot Camp 4 🧠</button>
            </div>
          `;
      
          document.getElementById("go-to-bootcamp4").addEventListener("click", () => {
            window.runBootcamp4(player, () => {
              player.correct = 0;
              player.incorrect = 0;
              runLevel4(player, callback);
            });
          });
        } else {
          runLevel4(player, callback);
        }
      }, 2000);
      
      
    }
  });

  renderMath(gameArea);

}

window.runLevel4 = runLevel4;
