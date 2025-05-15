const settingsIcon = document.getElementById('settingsIcon');
const basketIcon = document.getElementById('basketIcon');
const settingsMenu = document.getElementById('settingsMenu');
const basketMenu = document.getElementById('basketMenu');

function toggleDisplayWithFade(el) {
  el.style.display = 'block';
  el.style.opacity = '0';
  el.style.animation = 'fadeIn 0.3s ease forwards';
}

settingsIcon.onclick = () => {
  if (settingsMenu.style.display === 'block') {
    settingsMenu.style.display = 'none';
  } else {
    toggleDisplayWithFade(settingsMenu);
    basketMenu.style.display = 'none';
  }
};

basketIcon.onclick = () => {
  if (basketMenu.style.display === 'block') {
    basketMenu.style.display = 'none';
  } else {
    toggleDisplayWithFade(basketMenu);
    settingsMenu.style.display = 'none';
  }
};
