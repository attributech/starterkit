const $ = jQuery;

export const init = () => {
  const $menu = $('.region-navigation').first('.menu');
  $menu.on('click', (event) => {
    const $target = $(event.target);
    const $item = $target.closest('.menu__item');
    const $menu_parent = $target.closest('.menu');
    
    if ($item.hasClass('menu__item--has-sub-items')
        && (!$menu_parent.hasClass('menu--level--0') || document.documentElement.clientWidth < 960)) {
      event.preventDefault();
      $item.toggleClass('menu__item--open');
    }
  });
};
