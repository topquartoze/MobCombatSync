(() => {
  const legend = document.getElementById('map-legend');
  const title = document.getElementById('map-legend-title');
  const button = document.getElementById('legend-toggle');
  if (!legend || !title || !button) return;
  let held = false, pinned = false;
  function render() {
    const visible = held || pinned;
    legend.classList.toggle('menu-disable', !visible);
    title.classList.toggle('menu-disable', !visible);
    button.setAttribute('aria-expanded', String(visible));
    button.textContent = (window.gtaMenuTranslate || (x => x))(visible ? 'Hide legend (L)' : 'Show legend (L)');
  }
  document.addEventListener('keydown', event => {
    if (event.key.toLowerCase() === 'l') { held = true; render(); }
  });
  document.addEventListener('keyup', event => {
    if (event.key.toLowerCase() === 'l') { held = false; render(); }
  });
  window.addEventListener('blur', () => { held = false; render(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { held = false; render(); } });
  render();
  button.addEventListener('click', () => { pinned = !pinned; render(); });
})();
