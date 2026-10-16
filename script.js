/* Sabiha Birthday Gift — countdown-gated mobile experience.
   Bangladesh time (UTC+06:00): unlocks at midnight starting 24 October 2026.
   To use another birthday year/time, edit BIRTHDAY_UNLOCK below. */
const BIRTHDAY_UNLOCK = "2026-10-24T00:00:00+06:00";
const screens = ["screen-countdown","screen-celebration","screen-cake","screen-gallery","screen-letter","screen-finale"];
const labels = ["GIFT LOCKED","HAPPY BIRTHDAY","MAKE A WISH","LITTLE MOMENTS","A NOTE FOR YOU","FINAL SURPRISE"];
let current = 0;
let unlocked = Date.now() >= new Date(BIRTHDAY_UNLOCK).getTime();
let celebrationStarted = false;
const $ = id => document.getElementById(id);
const params = new URLSearchParams(window.location.search);
const developerPreview = params.get("preview") === "1";
if (developerPreview) {
  $("developer-tools").hidden = false;
  $("preview-banner").hidden = false;
}
document.querySelectorAll(".dev-jump").forEach(btn => btn.addEventListener("click", () => {
  if (!developerPreview) return;
  // Preview bypasses the visitor gate locally in this tab only; it does not edit the target date.
  showScreen(btn.dataset.preview, true);
  if (btn.dataset.preview === "screen-celebration" || btn.dataset.preview === "screen-finale") launchConfetti(65);
}));
$("developer-exit").addEventListener("click", () => {
  const cleanUrl = window.location.pathname + window.location.hash;
  window.location.href = cleanUrl;
});
function showScreen(id, force=false) {
  const index = screens.indexOf(id);
  if (index < 0) return;
  // Hard UI gate: before the target time, every navigation request returns to countdown.
  if (!unlocked && !developerPreview && id !== "screen-countdown") {
    id = "screen-countdown";
    showToast("The gift is still locked. Wait for the countdown to finish. ♡");
  }
  const actualIndex = screens.indexOf(id);
  current = actualIndex;
  screens.forEach((screenId, i) => {
    const el = $(screenId);
    const active = i === actualIndex;
    el.hidden = !active;
    el.classList.toggle("active", active);
    if (active) el.setAttribute("aria-current","step");
    else el.removeAttribute("aria-current");
  });
  $("step-label").textContent = labels[actualIndex];
  $("progress-fill").style.width = `${((actualIndex + 1) / screens.length) * 100}%`;
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-next]").forEach(btn => btn.addEventListener("click", () => {
  if (!unlocked) { showScreen("screen-countdown"); return; }
  showScreen(btn.dataset.next);
  if (btn.dataset.next === "screen-cake") launchConfetti(70);
  if (btn.dataset.next === "screen-finale") launchConfetti(70);
}));
document.querySelectorAll("[data-back]").forEach(btn => btn.addEventListener("click", () => {
  if (!unlocked) { showScreen("screen-countdown"); return; }
  showScreen(btn.dataset.back);
}));
$("restart-btn").addEventListener("click", () => {
  if (!unlocked) showScreen("screen-countdown");
  else showScreen("screen-celebration");
});
$("wish-btn").addEventListener("click", () => {
  $("wish-note").textContent = "♡♡♡";
  launchConfetti(100);
});
$("envelope-btn").addEventListener("click", () => {
  $("letter-content").hidden = false;
  $("envelope-btn").innerHTML = "<span>💌</span><small>YOUR LETTER IS OPEN</small>";
  $("envelope-btn").setAttribute("aria-expanded","true");
  launchConfetti(28);
});
$("confetti-btn").addEventListener("click", () => launchConfetti(160));

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function updateCountdown() {
  const target = new Date(BIRTHDAY_UNLOCK).getTime();
  let diff = target - Date.now();
  if (diff <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => $(id).textContent = "00");
    if (!unlocked) {
      unlocked = true;
      if (!celebrationStarted) {
        celebrationStarted = true;
        showScreen("screen-celebration", true);
        launchConfetti(220);
      }
      $("lock-status").innerHTML = '<span class="lock-dot"></span> THE GIFT IS UNLOCKED';
    }
    return;
  }
  const days = Math.floor(diff / 86400000); diff %= 86400000;
  const hours = Math.floor(diff / 3600000); diff %= 3600000;
  const minutes = Math.floor(diff / 60000); const seconds = Math.floor((diff % 60000) / 1000);
  $("days").textContent = String(days).padStart(2,"0");
  $("hours").textContent = String(hours).padStart(2,"0");
  $("minutes").textContent = String(minutes).padStart(2,"0");
  $("seconds").textContent = String(seconds).padStart(2,"0");
}
function launchConfetti(amount=100) {
  const canvas = $("confetti-canvas"), ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1,2);
  canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr;
  canvas.style.width = innerWidth+"px"; canvas.style.height = innerHeight+"px";
  ctx.scale(dpr,dpr);
  const colors = ["#f43f91","#ffb6d5","#f7c96b","#bd80d5","#fff6fa"];
  const bits = Array.from({length:amount},()=>({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.2,w:4+Math.random()*5,h:6+Math.random()*8,vx:(Math.random()-.5)*3,vy:2+Math.random()*4,r:Math.random()*6,vr:(Math.random()-.5)*.15,c:colors[Math.floor(Math.random()*colors.length)]}));
  let frame=0;
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);bits.forEach(b=>{b.x+=b.vx;b.y+=b.vy;b.r+=b.vr;b.vy+=.018;ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.r);ctx.fillStyle=b.c;ctx.fillRect(-b.w/2,-b.h/2,b.w,b.h);ctx.restore()});frame++;if(frame<145&&bits.some(b=>b.y<innerHeight+20))requestAnimationFrame(draw);else ctx.clearRect(0,0,innerWidth,innerHeight)}
  requestAnimationFrame(draw);
}
showScreen(unlocked ? "screen-celebration" : "screen-countdown");
if (unlocked) { celebrationStarted = true; launchConfetti(150); }
updateCountdown();
setInterval(updateCountdown, 1000);
