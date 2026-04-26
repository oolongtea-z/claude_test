const display   = document.getElementById('display');
const startBtn  = document.getElementById('startBtn');
const pauseBtn  = document.getElementById('pauseBtn');
const resetBtn  = document.getElementById('resetBtn');
const lapBtn    = document.getElementById('lapBtn');
const lapList   = document.getElementById('lapList');

let intervalId  = null;
let elapsed     = 0;   // ms
let lapStart    = 0;
let lapCount    = 0;

function format(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

function tick() {
  elapsed += 10;
  display.textContent = format(elapsed);
}

startBtn.addEventListener('click', () => {
  intervalId = setInterval(tick, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled   = false;
});

pauseBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  pauseBtn.disabled = true;
  startBtn.disabled = false;
  startBtn.textContent = '再開';
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  elapsed   = 0;
  lapStart  = 0;
  lapCount  = 0;
  display.textContent = '00:00:00';
  startBtn.disabled   = false;
  startBtn.textContent = 'スタート';
  pauseBtn.disabled   = true;
  lapBtn.disabled     = true;
  lapList.innerHTML   = '';
});

lapBtn.addEventListener('click', () => {
  lapCount++;
  const lapTime = elapsed - lapStart;
  lapStart = elapsed;

  const li = document.createElement('li');
  li.innerHTML = `<span class="lap-num">Lap ${lapCount}</span><span>${format(lapTime)}</span>`;
  lapList.prepend(li);
});
