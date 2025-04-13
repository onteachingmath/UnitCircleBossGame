// unit_circle.js - Reusable unit circle with angle and coordinate labeling

function createUnitCircle({ showTicks = true, showAngleLabels = false, showCoordinates = false } = {}) {
  const circle = document.createElement("div");
  circle.classList.add("unit-circle");
  circle.style.width = "300px";
  circle.style.height = "300px";
  circle.style.border = "2px solid white";
  circle.style.borderRadius = "50%";
  circle.style.position = "relative";
  circle.style.margin = "20px auto";

  const centerX = 150;
  const centerY = 150;

  const angleCoordinates = {
    0: "(1, 0)",
    30: "(\\frac{\\sqrt{3}}{2}, \\frac{1}{2})",
    45: "(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2})",
    60: "(\\frac{1}{2}, \\frac{\\sqrt{3}}{2})",
    90: "(0, 1)",
    120: "(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2})",
    135: "(-\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2})",
    150: "(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2})",
    180: "(-1, 0)",
    210: "(-\\frac{\\sqrt{3}}{2}, -\\frac{1}{2})",
    225: "(-\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2})",
    240: "(-\\frac{1}{2}, -\\frac{\\sqrt{3}}{2})",
    270: "(0, -1)",
    300: "(\\frac{1}{2}, -\\frac{\\sqrt{3}}{2})",
    315: "(\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2})",
    330: "(\\frac{\\sqrt{3}}{2}, -\\frac{1}{2})"
  };
  

  if (showTicks) {
    const angles = Object.keys(angleCoordinates).map(Number);

    angles.forEach((angle) => {
      const rad = angle * Math.PI / 180;
      const tickRadius = 140;
      const labelRadius = 110;
      const coordRadius = 180;

      const x = centerX + tickRadius * Math.cos(rad);
      const y = centerY - tickRadius * Math.sin(rad);

      const tick = document.createElement("div");
      tick.classList.add("tick-mark");
      tick.style.width = "4px";
      tick.style.height = "4px";
      tick.style.background = "yellow";
      tick.style.position = "absolute";
      tick.style.left = `${x - 2}px`;
      tick.style.top = `${y - 2}px`;
      tick.style.borderRadius = "50%";
      circle.appendChild(tick);

      if (showAngleLabels) {
        const lx = centerX + labelRadius * Math.cos(rad);
        const ly = centerY - labelRadius * Math.sin(rad);

        const label = document.createElement("span");
        label.textContent = `${angle}°`;
        label.style.position = "absolute";
        label.style.fontSize = "14px";
        label.style.fontWeight = "";
        label.style.color = "white";
        label.style.transform = "translate(-50%, -50%)";
        label.style.left = `${lx}px`;
        label.style.top = `${ly}px`;
        circle.appendChild(label);
      }

      if (showCoordinates && angleCoordinates[angle]) {
        const circleRect = circle.getBoundingClientRect();  // Get real position

const cx = centerX + coordRadius * Math.cos(rad);
let cy = centerY - coordRadius * Math.sin(rad);

if (angle === 90) cy += 18;
if (angle === 270) cy -= 18;

const coord = document.createElement("span");
coord.innerHTML = `\\(${angleCoordinates[angle]}\\)`;
coord.style.position = "absolute";
coord.style.fontSize = "14px";
coord.style.color = "white";
coord.style.transform = "translate(-50%, -50%)";
coord.style.left = `${cx + 205}px`;
coord.style.top = `${cy + 290}px`;
coord.style.pointerEvents = "none";
coord.style.zIndex = "10";

document.body.appendChild(coord);  

// Appending to global DOM coordinates
if (typeof renderMath === "function") renderMath(coord);

      }
      

    });
  }

  return circle;
}

window.createUnitCircle = createUnitCircle;
