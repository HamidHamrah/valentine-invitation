const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const message = document.getElementById("message");

// --- STATE ---
let scale = 1;
let noClicks = 0;

// --- CUSTOM NO MESSAGES ---
const noMessages = [
  "Are you sure? 😢",
  "That kinda hurt 💔",
  "Wow… cold 🥶",
  "Think again 😏",
  "You’re making this hard 😭",
  "I won’t give up 💪❤️",
  "Okay now you’re just teasing 😤",
  "Just press yes already 😌"
];

// --- NO CLICK ---
noBtn.addEventListener("click", () => {
  noClicks++;

  // Grow YES
  scale += 0.25;
  yesBtn.style.transform = `scale(${scale})`;

  // Message update
  message.textContent = noMessages[Math.min(noClicks - 1, noMessages.length - 1)];

  // Mobile vibration
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }

  // Move NO button randomly
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
});

// --- CONFETTI ---
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let confetti = [];

function createConfetti() {
  for (let i = 0; i < 180; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 100,
      color: `hsl(${Math.random() * 360},100%,50%)`,
      tilt: Math.random() * 10
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.r;
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt);
    ctx.stroke();
    p.y += 3;
    if (p.y > canvas.height) p.y = -10;
  });
}

function startConfetti() {
  createConfetti();
  setInterval(drawConfetti, 20);
}

// --- YES CLICK ---
yesBtn.addEventListener("click", () => {
  question.textContent = "YAY!!! 💖 You’re my Valentine 😍";
  message.textContent = "Best decision you made today 😌";
  yesBtn.remove();
  noBtn.remove();
  startConfetti();
});
