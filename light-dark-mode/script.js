const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.querySelector('#nav');
const switchModeText = document.querySelector('#toggle-icon > .toggle-text')
const switchModeIcon = document.querySelector('#toggle-icon > i');
const images = document.querySelectorAll('img');
const textBox = document.querySelector('#text-box');

function switchColorMode(colorMode) {
  const darkBg = 'rgb(0 0 0 / 50%)';
  const lightBg = 'rgb(255 255 255 / 50%)';

  const isDark = colorMode === 'dark';
  const oppositeColorMode = isDark ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', colorMode);
  localStorage.setItem('theme', colorMode);
  images.forEach((img) => {
    img.src = img.src.replace(`_${oppositeColorMode}`, `_${colorMode}`);
  });

  nav.style.backgroundColor = isDark ? darkBg : lightBg;
  textBox.style.backgroundColor = isDark ? lightBg : darkBg;
  switchModeText.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  isDark
    ? switchModeIcon.classList.replace('fa-sun', 'fa-moon')
    : switchModeIcon.classList.replace('fa-moon', 'fa-sun');
}

// switch theme dynamically
function switchTheme(event) {
  event.target.checked ? switchColorMode('dark') : switchColorMode('light');
}

// event listeners
toggleSwitch.addEventListener('change', switchTheme);


// check localStorage for the theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  switchColorMode('dark');
}