/**
 * Animação 2D discreta, sem bibliotecas nem rolagem artificial.
 * Apenas elementos decorativos aria-hidden recebem deslocamento.
 * Textos, cartões e controles permanecem na posição normal de leitura.
 */
export function initScrollEffects() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const page = document.getElementById('letter-page');
  const decorations = [...page.querySelectorAll('[data-scroll-decoration]')];
  let frame = 0;

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    decorations.forEach(element => element.style.removeProperty('--scroll-offset'));
  }

  function update() {
    frame = 0;
    // Limpa também no frame pendente se a preferência mudar entre dois eventos.
    if (preference.matches) { reset(); return; }
    if (page.hidden || document.hidden) return;
    const height = window.innerHeight;
    const distance = window.innerWidth <= 760 ? 4 : 8;
    // Lemos todas as posições antes de escrever estilos para evitar reflows.
    const offsets = decorations.map(element => {
      const bounds = element.parentElement.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > height) return null;
      const position = (height / 2 - (bounds.top + bounds.height / 2)) / (height / 2);
      return Math.max(-1, Math.min(1, position)) * distance;
    });
    decorations.forEach((element, i) => {
      if (offsets[i] !== null) element.style.setProperty('--scroll-offset', `${offsets[i].toFixed(2)}px`);
    });
  }

  function refresh() {
    // Proteção adicional caso o navegador entregue o evento change com atraso.
    if (preference.matches) { reset(); return; }
    if (page.hidden || document.hidden || frame) return;
    frame = requestAnimationFrame(update);
  }

  function onPreferenceChange() {
    reset();
    if (!preference.matches) refresh();
  }

  // Um frame apenas quando necessário; nenhum loop contínuo ou preventDefault.
  window.addEventListener('scroll', refresh, { passive: true });
  window.addEventListener('resize', refresh, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? reset() : refresh());
  if (preference.addEventListener) preference.addEventListener('change', onPreferenceChange);
  else preference.addListener(onPreferenceChange);
  return { refresh, reset };
}