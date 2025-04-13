// level3.js - Drag and drop LaTeX values to match sin/cos prompts with optional negative sign

function runLevel3(player, callback) {
    console.log("✅ runLevel3() called");
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = "";

    if (!player.usedTrig) player.usedTrig = [];

    const trigBank = [
      { angle: 30, func: "sin", value: "\\frac{1}{2}" },
      { angle: 45, func: "sin", value: "\\frac{\\sqrt{2}}{2}" },
      { angle: 60, func: "sin", value: "\\frac{\\sqrt{3}}{2}" },
      { angle: 120, func: "sin", value: "\\frac{\\sqrt{3}}{2}" },
      { angle: 135, func: "sin", value: "\\frac{\\sqrt{2}}{2}" },
      { angle: 150, func: "sin", value: "\\frac{1}{2}" },
      { angle: 210, func: "sin", value: "-\\frac{1}{2}" },
      { angle: 225, func: "sin", value: "-\\frac{\\sqrt{2}}{2}" },
      { angle: 240, func: "sin", value: "-\\frac{\\sqrt{3}}{2}" },
      { angle: 300, func: "sin", value: "-\\frac{\\sqrt{3}}{2}" },
      { angle: 315, func: "sin", value: "-\\frac{\\sqrt{2}}{2}" },
      { angle: 330, func: "sin", value: "-\\frac{1}{2}" },
      { angle: 0, func: "sin", value: "0" },
      { angle: 90, func: "sin", value: "1" },
      { angle: 180, func: "sin", value: "0" },
      { angle: 270, func: "sin", value: "-1" },

      { angle: 60, func: "cos", value: "\\frac{1}{2}" },
      { angle: 45, func: "cos", value: "\\frac{\\sqrt{2}}{2}" },
      { angle: 30, func: "cos", value: "\\frac{\\sqrt{3}}{2}" },
      { angle: 300, func: "cos", value: "\\frac{1}{2}" },
      { angle: 315, func: "cos", value: "\\frac{\\sqrt{2}}{2}" },
      { angle: 330, func: "cos", value: "\\frac{\\sqrt{3}}{2}" },
      { angle: 210, func: "cos", value: "-\\frac{\\sqrt{3}}{2}" },
      { angle: 225, func: "cos", value: "-\\frac{\\sqrt{2}}{2}" },
      { angle: 240, func: "cos", value: "-\\frac{1}{2}" },
      { angle: 120, func: "cos", value: "-\\frac{1}{2}" },
      { angle: 135, func: "cos", value: "-\\frac{\\sqrt{2}}{2}" },
      { angle: 150, func: "cos", value: "-\\frac{\\sqrt{3}}{2}" },
      { angle: 0, func: "cos", value: "1" },
      { angle: 90, func: "cos", value: "0" },
      { angle: 180, func: "cos", value: "-1" },
      { angle: 270, func: "cos", value: "0" },
    ];

    const remaining = trigBank.filter(q => !player.usedTrig.includes(`${q.func}-${q.angle}`));
    if (remaining.length === 0) {
      player.usedTrig = [];
      remaining.push(...trigBank);
    }

    const next = remaining[Math.floor(Math.random() * remaining.length)];
    player.usedTrig.push(`${next.func}-${next.angle}`);

    const prompt = document.createElement("h3");
    prompt.innerHTML = `What is \\(${next.func}(${next.angle}^\\circ)\\)?`;

    prompt.style.textAlign = "center";
    prompt.style.marginBottom = "20px";
    
    gameArea.appendChild(prompt);

    renderMath(prompt);


    const scoreCard = document.createElement("p");
    scoreCard.textContent = `✅ ${player.correct}    ❌ ${player.incorrect}`;
    scoreCard.style.textAlign = "center";
    scoreCard.style.fontWeight = "bold";
    scoreCard.style.marginBottom = "15px";
    gameArea.appendChild(scoreCard);

    const values = [
      "0", "\\frac{1}{2}", "\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{3}}{2}", "1",
      "-1", "-\\frac{1}{2}", "-\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{3}}{2}"
    ];

    const answerContainer = document.createElement("div");
    answerContainer.style.display = "flex";
    answerContainer.style.flexWrap = "wrap";
    answerContainer.style.justifyContent = "center";
    answerContainer.style.gap = "12px";
    gameArea.appendChild(answerContainer);

    values.forEach(val => {
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

      answerContainer.appendChild(choice);

      renderMath(choice);

    });

    const dropZone = document.createElement("div");
    dropZone.textContent = "Drop your answer here";
    dropZone.style.marginTop = "30px";
    dropZone.style.height = "60px";
    dropZone.style.border = "3px dashed #777";
    dropZone.style.borderRadius = "12px";
    dropZone.style.display = "flex";
    dropZone.style.alignItems = "center";
    dropZone.style.justifyContent = "center";
    dropZone.style.fontSize = "20px";
    dropZone.style.fontWeight = "bold";
    dropZone.style.color = "black";

    dropZone.style.background = "#f9f9f9";
    gameArea.appendChild(dropZone);

    dropZone.addEventListener("dragover", (e) => e.preventDefault());
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      const dropped = e.dataTransfer.getData("text/plain");

      const clean = str => str.replace(/\\/g, '').replace(/\s+/g, '');

      if (clean(dropped) === clean(next.value)) {
        dropZone.innerHTML = "✅ Correct!";
        dropZone.style.borderColor = "green";
        player.correct++;
      } else {
        dropZone.innerHTML = `❌ Nope! Correct answer: \\(${next.value}\\)`;

        dropZone.style.borderColor = "red";
        player.incorrect++;
        renderMath(dropZone);

      }

      setTimeout(() => {
        if (player.correct >= 6) {
          alert("🎉 Level 3 complete!");
          callback("complete");
        } else if (player.incorrect >= 3) {
          gameArea.innerHTML = `
            <div class="fail-screen" style="text-align: center; margin-top: 50px; color: black;">
              <h2>💥 Too many mistakes!</h2>
              <p>No worries — let’s sharpen up in Boot Camp 3.</p>
              <button id="go-to-bootcamp3" class="answer-btn" style="margin-top: 20px;">Go to Boot Camp 3 🧠</button>
            </div>
          `;
      
          document.getElementById("go-to-bootcamp3").addEventListener("click", () => {
            window.runBootcamp3(player, () => {
              player.correct = 0;
              player.incorrect = 0;
              runLevel3(player, callback);
            });
          });
        } else {
          runLevel3(player, callback);
        }
      }, 1800);
      
    });
  }

  window.runLevel3 = runLevel3;