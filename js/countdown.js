// Contagem local: não usa UTC, fuso do servidor nem uma data textual ambígua.
export function initCountdown(date) {
  const target = new Date(date.year, date.month - 1, date.day, date.hour, date.minute, 0).getTime();
  const countdown = document.getElementById('countdown');
  const celebration = document.getElementById('celebration');
  const units = ['days', 'hours', 'minutes', 'seconds'];
  let interval;
  function update() {
    const remaining = Math.max(0, target - Date.now());
    if (!remaining) {
      countdown.hidden = true;
      celebration.hidden = false;
      clearInterval(interval);
      return;
    }
    const total = Math.floor(remaining / 1000);
    const values = [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
    units.forEach((unit, i) => { document.getElementById(unit).textContent = String(values[i]).padStart(2, '0'); });
  }
  update();
  if (target > Date.now()) interval = setInterval(update, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
}