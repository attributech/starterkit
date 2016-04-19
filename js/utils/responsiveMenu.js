export default (() => {
  var $header = jQuery('.page-header');
  var $html = jQuery('html');
  var $navigationToggle = jQuery('.navigation__toggle');
  $navigationToggle.click(function () {
    $html.toggleClass('navigation--open');
  });
})();
