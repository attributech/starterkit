export default (($) => {
  $(() => {
    const $header = $('.page-header');
    $header.headroom({
      offset: 40,
      useTouchmove: true,
    });
  });
})(jQuery);
