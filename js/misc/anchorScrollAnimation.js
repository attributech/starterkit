const $ = window.jQuery;

export function init() {
  $('a[href*="#"]:not([href="#"])').click(function () {
    const samePathName = location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '');
    const sameHostName = location.hostname == this.hostname;
    if (samePathName && sameHostName && this.hash) {
      let $target = $(this.hash);
      $target = $target.length ? $target : $('[id="' + this.hash.slice(1) + '"]');
      if ($target.length) {
        let position;
        position = $target.offset().top; //- $('.page-header').outerHeight()
        $('html,body').animate({
          scrollTop: position,
        }, 1000, 'swing', () => {
          $(window).trigger('scroll');
        });
        return false;
      }
    }
  });
}
