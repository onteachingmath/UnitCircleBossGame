// level5.js - Inverse tangent (arctan) value matching over the unit circle

function runLevel5(player, callback) {
  console.log("✅ runLevel5() called");
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";
  gameArea.style.background = "black";
  gameArea.style.color = "white";

  if (!player.correct) player.correct = 0;
  if (!player.incorrect) player.incorrect = 0;

  const questionBank = [
    { value: "-1", answers: ["135°", "315°"] },
    { value: "1", answers: ["45°", "225°"] },
    { value: "0", answers: ["0°", "180°"] },
    { value: "\\sqrt{3}", answers: ["60°", "240°"] },
    { value: "-\\sqrt{3}", answers: ["120°", "300°"] },
    { value: "\\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}", answers: ["30°", "210°"] },
    { value: "-\\frac{1}{\\sqrt{3}} = -\\frac{\\sqrt{3}}{3}", answers: ["150°", "330°"] }
  ];

  const current = questionBank[Math.floor(Math.random() * questionBank.length)];
  const requiresTwo = current.answers.length === 2;

  const prompt = document.createElement("h2");
  prompt.innerHTML = `What angle(s) have \\( \\tan(\\theta) = ${current.value} \\)?`;

  prompt.style.textAlign = "center";
  prompt.style.marginBottom = "20px";
  gameArea.appendChild(prompt);
  const scoreCard = document.createElement("p");
scoreCard.id = "score-card";
scoreCard.innerHTML = `✅ ${player.correct}    ❌ ${player.incorrect}`;
scoreCard.style.textAlign = "center";
scoreCard.style.color = "white";
scoreCard.style.fontWeight = "bold";
scoreCard.style.marginTop = "10px";
scoreCard.style.fontFamily = "Verdana";
gameArea.appendChild(scoreCard);

  if (window.MathJax) MathJax.typesetPromise([prompt]);

  const img = document.createElement("img");
  img.src = "images/UC1.jpg";
  img.alt = "Unit Circle";
  img.style.display = "block";
  img.style.margin = "0 auto";
  img.style.maxWidth = "70%";
  img.style.border = "4px solid white";
  gameArea.appendChild(img);

  const angles = [
    "0°", "30°", "45°", "60°", "90°", "120°", "135°", "150°",
    "180°", "210°", "225°", "240°", "270°", "300°", "315°", "330°"
  ];

  const choices = document.createElement("div");
  choices.style.display = "flex";
  choices.style.flexWrap = "wrap";
  choices.style.justifyContent = "center";
  choices.style.gap = "12px";
  gameArea.appendChild(choices);

  angles.forEach(angle => {
    const choice = document.createElement("div");
    choice.textContent = angle;
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
    choice.style.fontFamily = "Verdana";

    choice.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", angle);
    });

    choices.appendChild(choice);
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
  dropZone.style.flexWrap = "wrap";
  dropZone.style.fontSize = "20px";
  dropZone.style.fontWeight = "bold";
  dropZone.style.color = "black";
  dropZone.style.background = "#f9f9f9";
  dropZone.style.fontFamily = "Verdana";
  gameArea.appendChild(dropZone);

  const selected = new Set();
  dropZone.addEventListener("dragover", (e) => e.preventDefault());
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.getData("text/plain");
    if (!selected.has(dropped)) {
      selected.add(dropped);
      const el = document.createElement("div");
      el.textContent = dropped;
      el.style.margin = "4px";
      el.style.padding = "4px 10px";
      el.style.border = "2px solid #aaa";
      el.style.borderRadius = "6px";
      el.style.background = "#fff";
      el.style.fontSize = "18px";
      dropZone.appendChild(el);
    }

    if (selected.size === current.answers.length) {
      const selectedClean = Array.from(selected).map(a => a.replace(/°/g, ''));
      const correctClean = current.answers.map(a => a.replace(/°/g, ''));

      const allCorrect = correctClean.every(a => selectedClean.includes(a)) && selectedClean.length === correctClean.length;
      if (allCorrect) {
        dropZone.innerHTML = "✅ Correct!";
        dropZone.style.borderColor = "green";
        player.correct++;
      } else {
        dropZone.innerHTML = `❌ Nope! Correct: ${current.answers.join(" and ")}`;
        dropZone.style.borderColor = "red";
        player.incorrect++;
      }
      
      // 🔁 Update the score display
      document.getElementById("score-card").innerHTML = `✅ ${player.correct}    ❌ ${player.incorrect}`;
      
      

      setTimeout(() => {
        if (player.correct >= 6) {
          alert("🎉 Level 5 complete!");
          callback("complete");
        } else if (player.incorrect >= 3) {
          gameArea.innerHTML = `
            <div class="fail-screen" style="text-align: center; margin-top: 50px; color: black;">
              <h2>💥 Too many mistakes!</h2>
              <p>No worries — let’s sharpen up in Boot Camp 5.</p>
              <button id="go-to-bootcamp5" class="answer-btn" style="margin-top: 20px; padding: 12px 24px; font-size: 16px; font-weight: bold; background-color: limegreen; border: none; border-radius: 10px; cursor: pointer;">Go to Boot Camp 5 🧠</button>
            </div>
          `;

          document.getElementById("go-to-bootcamp5").addEventListener("click", () => {
            window.runBootcamp5(player, () => {
              player.correct = 0;
              player.incorrect = 0;
              runLevel5(player, callback);
            });
          });
        } else {
          runLevel5(player, callback);
        }
      }, 2000);
    }
  });
}

window.runLevel5 = runLevel5;