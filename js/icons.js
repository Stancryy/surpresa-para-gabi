// Ícones vetoriais leves, sem bibliotecas, imagens externas ou emojis.
const paths = {
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z"/>',
  coffee: '<path d="M18 8h1a3 3 0 1 1 0 6h-1M3 8h15v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM6 2v2m4-2v2m4-2v2"/>',
  sparkles: '<path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3ZM20 2v4m-2-2h4"/>',
  flower: '<path d="M12 12c-7-1-8-6-5-7 3-2 5 2 5 7Zm0 0c1-7 6-8 7-5 2 3-2 5-7 5Zm0 0c7 1 8 6 5 7-3 2-5-2-5-7Zm0 0c-1 7-6 8-7 5-2-3 2-5 7-5Z"/><circle cx="12" cy="12" r="2"/>',
  feather: '<path d="M20 4c-5-5-13 2-13 8v5h5c6 0 13-8 8-13ZM4 20 17 7M7 17v-5m0 5h5"/>',
  infinity: '<path d="M12 12c-3-7-10-6-10 0s7 7 10 0 10-6 10 0-7 7-10 0Z"/>',
  footprints: '<ellipse cx="7" cy="7" rx="3" ry="5" transform="rotate(-20 7 7)"/><path d="M5 15c0-3 5-3 5 0v2H5v-2Z"/><ellipse cx="17" cy="13" rx="3" ry="5" transform="rotate(20 17 13)"/><path d="M14 21c0-3 5-3 5 0v1h-5v-1Z"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  music: '<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
  play: '<path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
  previous: '<path d="M5 5v14m14-14L8 12l11 7V5Z"/>',
  next: '<path d="M19 5v14M5 5l11 7-11 7V5Z"/>',
  volume: '<path d="m11 5-6 4H2v6h3l6 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="m11 5-6 4H2v6h3l6 4V5Zm6 4 5 6m0-6-5 6"/>',
  envelope: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/>',
  replay: '<path d="M3 10a9 9 0 1 1 1 7M3 3v7h7"/>'
};
export function icon(name, className = '') {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.heart}</svg>`;
}
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
}