// Home-only motion; no game state or saved-match changes.
function initHomeVideo() {
  const video = document.querySelector('#home-video');
  const toggle = document.querySelector('#home-video-toggle');
  if (!video || !toggle) return;
  let enabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { const saved = localStorage.getItem('govern-home-motion'); if (saved !== null) enabled = saved === 'on'; } catch {}
  video.muted = true;
  video.defaultMuted = true;
  const label = playing => {
    toggle.textContent = '背景動画：' + (playing ? 'ON' : 'OFF');
    toggle.setAttribute('aria-pressed', String(playing));
  };
  const fallback = () => { video.classList.remove('is-playing'); label(false); };
  const play = () => {
    if (!video.getAttribute('src')) video.src = 'assets/title-home-v1.mp4';
    video.play()?.catch(fallback);
  };
  video.addEventListener('playing', () => { video.classList.add('is-playing'); label(true); });
  video.addEventListener('error', fallback);
  video.addEventListener('pause', () => label(false));
  toggle.addEventListener('click', () => {
    enabled = video.paused;
    try { localStorage.setItem('govern-home-motion', enabled ? 'on' : 'off'); } catch {}
    if (enabled) play(); else { video.pause(); fallback(); }
  });
  if (enabled) play();
}
