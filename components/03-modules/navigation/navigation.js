export const init = () => {
  const nav = document.querySelector('.navigation');
  if (nav) {
    const toggle = nav.querySelector('.navigation__toggle')
    toggle.addEventListener('click', () => {
      nav.classList.toggle('navigation--open');
      document.body.classList.toggle('navigation--open');
    }, false);
  }
};
