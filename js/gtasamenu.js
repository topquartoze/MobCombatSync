(() => {
  const sound = new Audio('./sounds/button.wav');
  let activated = false;
  const activate = () => { activated = true; };
  document.addEventListener('pointerdown', activate);
  document.addEventListener('keydown', activate);
  function play() {
    if (!activated) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
  document.querySelectorAll('.menu-option a:not([aria-disabled="true"])').forEach(link => {
    link.addEventListener('mouseenter', play);
    link.addEventListener('focus', play);
  });
  document.querySelectorAll('a[aria-disabled="true"]').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
  });
  const quit = document.getElementById('quit-confirm');
  if (quit) quit.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('.menu-subtitle').textContent = 'Menu closed. You can close this tab or return to the main menu.';
    document.querySelector('.menu-container').innerHTML = '<li class="menu-option"><a href="./index.html">main menu</a></li>';
  });
})();
