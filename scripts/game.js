
// game.js - Core game engine logic
import { runBootcamp1, runBootcamp2 } from "./bootcamps.js";

let bootcampInProgress = false;

let player = {
  name: "",
  character: "",
  currentLevel: 1,
  correct: 0,
  incorrect: 0,
  highestUnlocked: 1
};
window.player = player;


function startLevel(levelNum) {
  player.currentLevel = levelNum;
  player.correct = 0;
  player.incorrect = 0;

  document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
  document.getElementById("game-screen").classList.remove("hidden");

  const levelTitle = document.getElementById("level-title");
  const playerInfo = document.getElementById("player-info");

  if (levelTitle && playerInfo) {
    levelTitle.textContent = `Level ${levelNum}`;
    playerInfo.textContent = `${player.name} the Daring (${player.character})`;
  }

  const levelFunction = window[`runLevel${levelNum}`];
  if (typeof levelFunction === "function") {
    levelFunction(player, handleLevelComplete);
  } else {
    console.warn("Level not implemented yet:", levelNum);
  }
}
function handleLevelComplete(result) {
  if (result === "correct" || result === "complete") {
    const nextLevel = player.currentLevel + 1;
    if (player.highestUnlocked < nextLevel && nextLevel <= 7) {
      player.highestUnlocked = nextLevel;
    }

    returnToMap(); // ✅ Only go to map on success
  }

  // ❌ Otherwise, do NOT return to map — let handleResult manage it
}



// ✅ Expose it globally, outside the function
window.startLevel = startLevel;
window.handleResult = handleResult;



function handleResult(result) {
  if (result === "correct") {
    player.correct++;
  } else if (result === "incorrect") {
    player.incorrect++;
  } else if (result === "complete") {
    // Level completed outside of Q&A structure
    player.correct = 0;
    player.incorrect = 0;
    returnToMap();
    return;
  }

  // ✅ If player passes the level (6 correct)
  if (player.correct >= 6) {
    player.correct = 0;
    player.incorrect = 0;
    player.currentLevel++; // Only increment on pass
    returnToMap(); // Or startLevel(player.currentLevel) to jump to next level
    return;
  }

  // ❌ If player fails the level (3 incorrect)
  if (player.incorrect >= 3) {
    alert("💥 Too many mistakes! Time for Boot Camp.");

    const bootcampFunction = window[`runBootcamp${player.currentLevel}`];

    if (typeof bootcampFunction === "function") {
      // ✅ Send to bootcamp, then retry current level
      bootcampFunction(player, () => {
        player.correct = 0;
        player.incorrect = 0;
        startLevel(player.currentLevel);
      });
    } else {
      console.warn(`No Bootcamp found for Level ${player.currentLevel}`);
      player.correct = 0;
      player.incorrect = 0;
      startLevel(player.currentLevel); // fallback
    }
  }
}



function showDevLauncher() {
  const gameScreen = document.getElementById("game-screen");
  const introScreen = document.getElementById("intro-screen");
  const gameArea = document.getElementById("game-area");

  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  gameArea.innerHTML = `
    <div class="level-header">
      <h2>🧪 Developer Launcher</h2>
      <p>Select a level or boot camp to jump straight in:</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 20px;">
       <button class="answer-btn" id="btn-bootcamp">🏕️ Boot Camp 1</button>
<button class="answer-btn" id="btn-bootcamp2">🧪 Boot Camp 2</button>
<button class="answer-btn" id="btn-bootcamp3">🛡️ Boot Camp 3</button>
<button class="answer-btn" id="btn-bootcamp4">⚙️ Boot Camp 4</button>
<button class="answer-btn" id="btn-bootcamp5">🧭 Boot Camp 5</button>
<button class="answer-btn" id="btn-bootcamp6">📊 Boot Camp 6</button>


        <button class="answer-btn" id="btn-lvl1">🧠 Level 1</button>
        <button class="answer-btn" id="btn-lvl2">🔢 Level 2</button>
        <button class="answer-btn" id="btn-lvl3">📐 Level 3</button>
        <button class="answer-btn" id="btn-lvl4">📈 Level 4</button>
        <button class="answer-btn" id="btn-lvl5">🧮 Level 5</button>
        <button class="answer-btn" id="btn-lvl6">🔁 Level 6</button>
        <button class="answer-btn" id="btn-lvl7">⚡ Level 7</button>
      </div>
    </div>
  `;

  // Boot Camp 1
document.getElementById("btn-bootcamp").addEventListener("click", () => {
  runBootcamp1(player, () => {
    console.log("✅ Bootcamp finished");
  });
});

// Boot Camp 2
document.getElementById("btn-bootcamp2").addEventListener("click", () => {
  runBootcamp2(player, (next) => {
    if (next === "level2") {
      startLevel(2);
    } else {
      console.log("✅ Bootcamp 2 finished, but no level specified.");
    }
  });
});

document.getElementById("btn-bootcamp3").addEventListener("click", () => {
  runBootcamp3(player, (next) => {
    if (next === "level3") startLevel(3);
  });
});

// Boot Camps 4–6 (safe check)
for (let i = 4; i <= 6; i++) {
  const btn = document.getElementById(`btn-bootcamp${i}`);
  if (btn) {
    btn.addEventListener("click", () => {
      const bootcampFunc = window[`runBootcamp${i}`];
      if (typeof bootcampFunc === "function") {
        bootcampFunc(player, () => {
          console.log(`✅ Bootcamp ${i} finished`);
        });
      } else {
        alert(`🚧 Boot Camp ${i} is still under construction!`);
      }
    });
  }
}



  for (let i = 1; i <= 7; i++) {
    const btn = document.getElementById(`btn-lvl${i}`);
    if (btn) {
      btn.addEventListener("click", () => startLevel(i));
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introScreen = document.getElementById("intro-screen");
  const gameScreen = document.getElementById("game-screen");

  startBtn.addEventListener("click", (e) => {
    e.preventDefault(); // 👈 Prevent form submission
  
    const nameInput = document.getElementById("player-name").value.trim();
    const characterChoice = document.querySelector("input[name='character']:checked")?.value;
  
    if (!nameInput) {
      alert("Please enter your name.");
      return;
    }
  
    if (!characterChoice) {
      alert("Please choose a character.");
      return;
    }
  
    player.name = nameInput;
    player.character = characterChoice;
  
    introScreen.classList.add("hidden");
    returnToMap(); // ✅ Show the map — NOT the game screen
  });
  
  function devLaunchLevel() {
    const levelNum = parseInt(document.getElementById("dev-level").value);
    if (!isNaN(levelNum)) {
      startLevel(levelNum, true); // use handleResult for bootcamp logic
    }
  }
  
  function devLaunchBootcamp() {
    const levelNum = parseInt(document.getElementById("dev-level").value);
    const bootcampFn = window[`runBootcamp${levelNum}`];
    if (typeof bootcampFn === "function") {
      bootcampFn(player, () => startLevel(levelNum, true));
    } else {
      alert("Bootcamp not found.");
    }
  }
  
  window.devLaunchLevel = devLaunchLevel;
  window.devLaunchBootcamp = devLaunchBootcamp;
  
  // Dev toggle shortcut
  document.addEventListener("keydown", (e) => {
    if (e.key === "`") {
      const devPanel = document.getElementById("dev-launcher");
      devPanel.style.display = devPanel.style.display === "none" ? "block" : "none";
    }
  });
``  
  
  
  
});
