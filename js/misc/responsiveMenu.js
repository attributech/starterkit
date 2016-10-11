// Toggles a class of .navigation--open on the HTML element for we get slide in menu

export function init() {
  const header = document.querySelector('.page-header');
  const html = document.querySelector('html');
  const navToggle = document.querySelector('.navigation__toggle');

  navToggle.addEventListener('click', () => {
    html.classList.toggle('navigation--open');
  });
}
