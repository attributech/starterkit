// https://github.com/vctrfrnndz/jquery-accordion
const $ = jQuery;

export const init = (context) => {
  const $accordion = $('.accordion', context);
  const duration = 300;

  $accordion.on('click', (event) => {
    let $accordion = $(event.currentTarget).closest('.accordion');
    if ($accordion.hasClass('open')) {
      $accordion.addClass('accordion--open');
    } else {
      setTimeout(() => {
        if (!$accordion.hasClass('open')) {
          $accordion.removeClass('accordion--open');
        }
      }, duration);
    }
  });

  $accordion.accordion({
    controlElement: '.accordion__header',
    contentElement: '.accordion__content',
    transitionSpeed: duration
  });
};
