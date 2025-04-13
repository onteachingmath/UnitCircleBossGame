// scripts/map.js

function updateMapUI() {
  console.log("🔁 updateMapUI() is running");

  const levelMap = document.getElementById("level-map");
  levelMap.innerHTML = ""; // Clear previous buttons

  for (let i = 1; i <= 7; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Level ${i}`;
    btn.classList.add("level-button");

    if (i <= player.highestUnlocked) {
      btn.disabled = false;
      btn.classList.add("unlocked");
      btn.onclick = () => startLevel(i);
    } else {
      btn.disabled = true;
      btn.classList.add("locked");
    }

    levelMap.appendChild(btn);
  }
}

function returnToMap() {
  document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
  document.getElementById("map-screen").classList.remove("hidden");
  updateMapUI();
}

// ✅ Make available globally
window.returnToMap = returnToMap;
window.updateMapUI = updateMapUI;
