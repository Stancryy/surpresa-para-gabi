import { icon } from './icons.js';

export function initPlayer(tracks) {
  const $ = id => document.getElementById(id);
  const audio = $('audio');
  const player = document.querySelector('.music-player');
  const playButton = $('play-pause');
  const progress = $('progress');
  const volume = $('volume');
  const status = $('player-status');
  let index = 0;
  let requestedPlay = false;
  let generation = 0;
  let lastVolume = .65;
  let isBuffering = false;
  let preloader = document.createElement('audio');
  preloader.preload = 'auto';
  preloader.muted = true;
  preloader.setAttribute('aria-hidden', 'true');

  const time = seconds => {
    const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
  };
  const setStatus = message => { status.textContent = message; };
  const setPersistentStatus = message => { status.dataset.transient = 'false'; status.textContent = message; };
  const clearTransientStatus = () => { if (status.dataset.transient !== 'false') status.textContent = ''; };
  const validDuration = () => Number.isFinite(audio.duration) && audio.duration > 0;
  const trackUrl = file => new URL(`../assets/audio/${encodeURIComponent(file)}`, import.meta.url).href;

  function setBuffering(on, message = '') {
    isBuffering = !!on;
    if (on) {
      if (message) { delete status.dataset.transient; setStatus(message); }
    } else {
      clearTransientStatus();
    }
    renderPlayback();
  }

  function renderPlayback() {
    const playing = !audio.error && (requestedPlay || (!audio.paused && !audio.ended));
    const showSpinner = playing && isBuffering;
    playButton.innerHTML = icon(showSpinner ? 'spinner icon-spin' : playing ? 'pause' : 'play');
    playButton.setAttribute('aria-label', showSpinner ? 'Carregando música' : playing ? 'Pausar música' : 'Reproduzir música');
    player.classList.toggle('is-playing', playing);
    player.classList.toggle('is-buffering', showSpinner);
    document.querySelectorAll('.playlist-track').forEach((button, i) => {
      const selected = i === index;
      button.classList.toggle('selected', selected);
      if (selected) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current');
      button.querySelector('.track-index').innerHTML = selected && playing ? icon('music') : String(i + 1).padStart(2, '0');
    });
  }

  function renderTime() {
    const current = audio.currentTime || 0;
    const duration = validDuration() ? audio.duration : 0;
    const percent = duration ? (current / duration) * 100 : 0;
    progress.value = percent;
    progress.style.setProperty('--progress', `${percent}%`);
    progress.disabled = !duration;
    progress.setAttribute('aria-valuetext', `${time(current)} de ${time(duration)}`);
    $('current-time').textContent = time(current);
    $('duration').textContent = time(duration);
  }

  function preloadNextTrack() {
    if (tracks.length < 2) return;
    const nextIndex = (index + 1) % tracks.length;
    try { preloader.src = trackUrl(tracks[nextIndex].file); preloader.load(); } catch { /* Pré-carga opcional. */ }
  }

  function pause() {
    generation++;
    requestedPlay = false;
    isBuffering = false;
    audio.pause();
    renderPlayback();
  }

  async function play() {
    if (!tracks.length) return;
    const attempt = ++generation;
    requestedPlay = true;
    if (!status.textContent) setBuffering(true, 'Preparando a música…');
    renderPlayback();
    try {
      if (audio.error || audio.networkState === HTMLMediaElement.NETWORK_EMPTY) audio.load();
      await audio.play();
      if (attempt !== generation) return;
      requestedPlay = false;
      renderPlayback();
    } catch (error) {
      if (attempt !== generation || error.name === 'AbortError') return;
      requestedPlay = false;
      generation++;
      renderPlayback();
      setPersistentStatus(error.name === 'NotAllowedError'
        ? 'O navegador pediu uma confirmação. Toque em reproduzir para ouvir.'
        : 'Não foi possível reproduzir esta faixa. O arquivo pode estar ausente ou em um formato incompatível. Tente outra música.');
    }
  }

  function selectTrack(nextIndex, shouldPlay = false) {
    if (!tracks.length) return;
    const isSame = nextIndex === index;
    if (!isSame) pause();
    index = (nextIndex + tracks.length) % tracks.length;
    const track = tracks[index];
    audio.src = trackUrl(track.file);
    $('track-title').textContent = track.title;
    $('track-artist').textContent = track.artist;
    setBuffering(shouldPlay, shouldPlay ? 'Carregando a próxima faixa…' : '');
    audio.load();
    renderTime();
    renderPlayback();
    if (shouldPlay) play();
  }

  function renderVolume() {
    const muted = audio.muted || audio.volume === 0;
    const value = muted ? 0 : Math.round(audio.volume * 100);
    volume.value = value;
    volume.style.setProperty('--progress', `${value}%`);
    $('volume-value').textContent = `${value}%`;
    volume.setAttribute('aria-valuetext', `${value}%`);
    $('mute').innerHTML = icon(muted ? 'mute' : 'volume');
    $('mute').setAttribute('aria-label', muted ? 'Ativar som' : 'Silenciar música');
    $('mute').setAttribute('aria-pressed', String(muted));
  }

  $('track-count').textContent = `${tracks.length} ${tracks.length === 1 ? 'faixa' : 'faixas'}`;
  if (!tracks.length) {
    $('track-title').textContent = 'Nosso próximo play';
    $('track-artist').textContent = 'Um espaço para as nossas músicas';
    setPersistentStatus('Nossa trilha ainda está sendo escolhida. Em breve, mais um jeito de sentir a gente.');
    return { pause: () => audio.pause() };
  }

  tracks.forEach((track, i) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'playlist-track';
    button.dataset.testid = `playlist-track-${i + 1}`;
    button.setAttribute('aria-label', `Reproduzir ${track.title}, ${track.artist}`);
    button.innerHTML = `<span class="track-index" aria-hidden="true"></span><span class="playlist-track-text"><strong data-testid="playlist-title-${i + 1}"></strong><small data-testid="playlist-artist-${i + 1}"></small></span><span class="track-end-icon" aria-hidden="true">${icon('heart')}</span>`;
    button.querySelector('strong').textContent = track.title;
    button.querySelector('small').textContent = track.artist;
    button.addEventListener('click', () => selectTrack(i, true));
    item.append(button);
    $('playlist').append(item);
  });
  [playButton, $('previous-track'), $('next-track'), $('mute'), volume].forEach(control => { control.disabled = false; });
  try { audio.volume = .65; } catch { /* Alguns dispositivos permitem apenas o volume físico. */ }
  renderVolume();
  selectTrack(0);

  playButton.addEventListener('click', () => requestedPlay || !audio.paused ? pause() : play());
  $('previous-track').addEventListener('click', () => selectTrack(index - 1, requestedPlay || !audio.paused));
  $('next-track').addEventListener('click', () => selectTrack(index + 1, requestedPlay || !audio.paused));
  progress.addEventListener('input', () => {
    if (!validDuration()) return;
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    renderTime();
  });
  volume.addEventListener('input', () => {
    const value = Number(volume.value) / 100;
    try { audio.volume = value; audio.muted = value === 0; } catch { setStatus('Use os botões de volume do seu aparelho para ajustar o som.'); }
    if (value > 0) lastVolume = value;
    if (Math.abs(audio.volume - value) > .02) setStatus('Neste aparelho, ajuste o volume pelos botões físicos.');
    renderVolume();
  });
  $('mute').addEventListener('click', () => {
    if (audio.muted || audio.volume === 0) {
      audio.muted = false;
      if (audio.volume === 0) { try { audio.volume = lastVolume; } catch { /* Volume físico. */ } }
    } else { lastVolume = audio.volume; audio.muted = true; }
    renderVolume();
  });
  audio.addEventListener('play', renderPlayback);
  audio.addEventListener('pause', () => { requestedPlay = false; setBuffering(false); renderPlayback(); });
  audio.addEventListener('playing', () => { setBuffering(false); renderPlayback(); preloadNextTrack(); });
  audio.addEventListener('waiting', () => setBuffering(true, 'Carregando mais um pedacinho…'));
  audio.addEventListener('stalled', () => setBuffering(true, 'A conexão está lenta, mas já volta…'));
  audio.addEventListener('loadstart', () => { if (requestedPlay) setBuffering(true, 'Baixando a música…'); });
  audio.addEventListener('canplay', () => { if (!requestedPlay) setBuffering(false); });
  audio.addEventListener('volumechange', renderVolume);
  ['timeupdate', 'loadedmetadata', 'durationchange', 'emptied'].forEach(event => audio.addEventListener(event, renderTime));
  audio.addEventListener('ended', () => selectTrack(index + 1, true));
  audio.addEventListener('error', () => {
    requestedPlay = false;
    progress.disabled = true;
    setBuffering(false);
    renderPlayback();
    setPersistentStatus('Esta música não está disponível agora. Confira o arquivo ou escolha outra faixa; a nossa carta continua aqui.');
  });
  return { pause };
}
