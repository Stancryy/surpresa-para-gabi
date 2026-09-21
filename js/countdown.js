// Contagem TOTAL desde o início do namoro. Mantemos o nome do arquivo e os IDs
// para preservar a organização anterior, mas não há mais contagem regressiva.
// A data nasce no horário local. Dias = períodos completos de 24 horas decorridas.
export function initElapsedCounter(date) {
  const start = new Date(date.year, date.month - 1, date.day, date.hour, date.minute, 0).getTime();
  const units = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  function update() {
    // Datas futuras mostram zero; o contador começa sozinho ao atingir o início.
    // Recalcular pelo relógio evita atraso ao voltar de uma aba em segundo plano.
    const total = Math.floor(Math.max(0, Date.now() - start) / 1000);
    const values = [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
    units.forEach((unit, i) => {
      const text = String(values[i]).padStart(2, '0');
      if (unit.textContent !== text) unit.textContent = text;
    });
    // Mantém legíveis e contidos os dias mesmo após muitos anos de namoro.
    units[0].classList.toggle('time-number-long', values[0] >= 1000);
  }
  update();
  setInterval(update, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
}