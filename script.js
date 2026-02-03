const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");

let scale = 1;
let noClicks = 0;

// --- YES GROW LOGIC ---
noBtn.addEventListener("click", () => {
  noClicks++;
  scale += 0.25;
  yesBtn.style.transform = `scale(${scale})`;
  noBtn.style.transform = `scale(${Math.max(1 - noClicks * 0.07, 0.4)})`;
});

// --- CONFETTI SETUP ---
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 150,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach((p) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.lineTo(p.x, p.y + p.tilt + p.r);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiPieces.forEach((p) => {
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.x += Math.sin(p.d);
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
  });
}

function startConfetti() {
  createConfetti();
  setInterval(drawConfetti, 20);
}

// --- YES CLICK ---
yesBtn.addEventListener("click", () => {
  question.textContent = "YAY!!! 💖 I knew you’d say yes 😍";
  yesBtn.remove();
  noBtn.remove();
  startConfetti();
});
