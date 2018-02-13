export const init = (context, settings) => {
  const nav = context.querySelector('.navigation');
  if (nav) {
    const navToggle = nav.querySelector('.navigation__toggle');
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('navigation--open');
      document.body.classList.toggle('navigation--open');
    }, false);
  }
};
