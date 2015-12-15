/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, Modernizr, window, document, undefined) {

  Drupal.behaviors.fitVids = {
    attach: function (context) {
      $(function () {
        $("body").fitVids({ customSelector: "iframe[src^='https://maps.google.com/maps']"});
      });
    }
  };

  $(function () {

    var $header = $('.page-header');
    var $navigation = $('.menu--main');
    var $navigationToggle = $('.navigation-toggle');

    $navigationToggle.click(function() {
      $header.toggleClass('navigation-open');
    });

    FastClick.attach(document.body);

    $header.headroom({
      offset: 40,
      useTouchmove: true
    });

  });
})(jQuery, Drupal, Modernizr, this, this.document);
