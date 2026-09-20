import { CONFIG, PLAYLIST } from './config.js';
import { icon, hydrateIcons } from './icons.js';
import { initCountdown } from './countdown.js';
import { initPlayer } from './player.js';

const $ = id => document.getElementById(id);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function fillContent() {
  document.querySelectorAll('[data-recipient]').forEach(el => { el.textContent = CONFIG.recipient; });
  document.title = `Para ${CONFIG.recipient}, com amor`;
  $('open-envelope').setAttribute('aria-label', `Abrir a carta para ${CONFIG.recipient}`);
  const fields = { 'hero-title': CONFIG.hero.title, 'hero-accent': CONFIG.hero.accent, 'hero-greeting': CONFIG.hero.greeting, 'hero-note': CONFIG.hero.note, 'closing-title-text': CONFIG.closing.title, 'closing-accent': CONFIG.closing.accent, signature: CONFIG.signature };
  Object.entries(fields).forEach(([id, text]) => { $(id).textContent = text; });
  for (const part of ['hero', 'closing']) {
    $(`${part}-paragraphs`).innerHTML = CONFIG[part].paragraphs.map((text, i) => `<p data-testid="${part}-paragraph-${i + 1}">${escape(text)}</p>`).join('');
  }
  $('reasons-grid').innerHTML = CONFIG.reasons.map((reason, i) => `<article class="reason-card reveal" style="--delay:${(i % 4) * 70}ms" data-testid="reason-card-${i + 1}"><div class="reason-top"><span class="reason-icon" aria-hidden="true">${icon(reason.icon)}</span><span class="reason-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></div><h3 data-testid="reason-title-${i + 1}">${escape(reason.title)}</h3><p data-testid="reason-text-${i + 1}">${escape(reason.text)}</p></article>`).join('');
  $('memories-grid').innerHTML = CONFIG.memories.map((memory, i) => `<article class="memory-card reveal" style="--delay:${i * 100}ms" data-testid="memory-card-${i + 1}"><span class="tape" aria-hidden="true"></span><div class="memory-card-top"><span class="memory-number" aria-hidden="true">${escape(memory.number)}</span><span class="memory-icon" aria-hidden="true">${icon(memory.icon)}</span></div><p class="eyebrow" data-testid="memory-label-${i + 1}">${escape(memory.label)}</p><h3 data-testid="memory-title-${i + 1}">${escape(memory.title)}</h3><p class="memory-text" data-testid="memory-text-${i + 1}">${escape(memory.text)}</p><p class="memory-note handwritten" data-testid="memory-note-${i + 1}">${escape(memory.note)}</p></article>`).join('');
  const date = CONFIG.anniversary;
  const dateText = new Date(date.year, date.month - 1, date.day).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  document.querySelector('[data-testid="anniversary-date"]').innerHTML = `${icon('heart')} ${dateText}`;
  hydrateIcons();
}

let revealObserver;
function revealPage() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  document.documentElement.classList.add('motion-ready');
  revealObserver ||= new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08 });
  elements.forEach(el => revealObserver.observe(el));
}

function heartBurst() {
  if (reducedMotion.matches) return;
  $('heart-burst').innerHTML = Array.from({ length: 9 }, (_, i) => `<span class="floating-heart" style="--x:${18 + i * 8}%;--drift:${i % 2 ? 35 : -35}px;--delay:${i * 95}ms">${icon('heart')}</span>`).join('');
  setTimeout(() => { $('heart-burst').replaceChildren(); }, 4000);
}

function initEnvelope(player) {
  let opening = false;
  const openButtons = [$('open-envelope'), document.querySelector('.open-letter')];
  function open() {
    if (opening) return;
    opening = true;
    openButtons.forEach(button => { button.disabled = true; });
    $('gift').classList.add('opening');
    setTimeout(() => {
      $('gift').hidden = true;
      $('letter-page').hidden = false;
      document.querySelector('.skip-link').hidden = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
      $('letter-title').focus({ preventScroll: true });
      revealPage();
      heartBurst();
      // Nenhum play() aqui: somente uma ação no player inicia a música.
    }, reducedMotion.matches ? 0 : 1250);
  }
  openButtons.forEach(button => button.addEventListener('click', open));
  $('close-letter').addEventListener('click', () => {
    player.pause();
    $('letter-page').hidden = true;
    document.querySelector('.skip-link').hidden = true;
    $('gift').hidden = false;
    $('gift').classList.remove('opening');
    opening = false;
    openButtons.forEach(button => { button.disabled = false; });
    history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'instant' });
    $('open-envelope').focus({ preventScroll: true });
  });
}

function initNavigation() {
  if (!('IntersectionObserver' in window)) return;
  const navLinks = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => {
      const active = link.hash === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }), { rootMargin: '-10% 0px -55% 0px' });
  document.querySelectorAll('#carta, #razoes, #memorias, #musicas').forEach(section => observer.observe(section));
}

fillContent();
initCountdown(CONFIG.anniversary);
const player = initPlayer(PLAYLIST);
initEnvelope(player);
initNavigation();