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

    var $header = $('.header');
    var $navigation = $('.menu--main');
    var $navigationToggle = $('.navigation-toggle');

    $navigationToggle.click(function() {
      $header.toggleClass('navigation-open');
    });

    $header.headroom({
      offset : 0,
      useTouchmove: true
    });

    FastClick.attach(document.body);

    /* POPUPS */

    $.extend(true, $.magnificPopup.defaults, {
      closeOnContentClick : false,
      closeOnBgClick :false,
      mainClass: 'mfp-fade',
      removalDelay: 300,
      fixedContentPos: true
    });

    var $buyLinks = $('article.node--type-book .field-name-field-links');
    if($buyLinks.length) {
      $buyLinksLabel = $buyLinks.find('.field-label');
      $buyLinksContent = $buyLinks.find('.field-items');
      $buyLinksLabel.magnificPopup({
        items: {
          src: $buyLinksContent,
          type: 'inline'
        }
      });
    }

    var $messages = $('.messages');
    if($messages.length) {
      $.magnificPopup.open({
        items: {
          src: $messages,
          type: 'inline'
        }
      }, 0);
      var $messagesPopup = $.magnificPopup.instance;
      setTimeout(function () {
        $messagesPopup.close();
      }, 10000);
    }

    /* BACKGROUND VIDEO */

    var $backgroundVideos = $('article.node--type-teaser-page video');

    if($backgroundVideos.length) {
      var backgroundVideo = $backgroundVideos[0];
      var $backgroundVideo = $(backgroundVideo);
      var $playButton = $('<div class="video-button video-button--play">' + Drupal.t('Play') + '</div>');

      backgroundVideoInitialize();
    }

    function handleBackgroundVideoButtonClick() {
      if($playButton.hasClass('video-button--play')) {
        backgroundVideoPlay();
      }
      else {
        backgroundVideoMute();
      }
    }

    function backgroundVideoInitialize() {
      $playButton.insertAfter($backgroundVideo);

      if (!Modernizr.videoautoplay && Modernizr.touchevents) {
        backgroundVideo.controls = true;
        $backgroundVideo.bind('play', handleBackgroundVideoButtonClick);
      }
      else {
        $playButton.bind('click', handleBackgroundVideoButtonClick);
      }

      var i = null;
      $backgroundVideo.mousemove(function() {
        clearTimeout(i);
        $playButton.removeClass('mouse-inactive');
        i = setTimeout(function () {
          $playButton.addClass('mouse-inactive');
        }, 1000);
      }).trigger('mousemove');
    }

    function backgroundVideoMute() {
      $backgroundVideo.addClass('video-muted');
      $backgroundVideo.removeClass('video-playing');
      $backgroundVideo.unbind('ended');

      $playButton.addClass('video-button--play');
      $playButton.removeClass('video-button--pause');

      if (!Modernizr.videoautoplay && Modernizr.touchevents) {
        backgroundVideo.pause();
      }
      else {
        backgroundVideo.muted = true;
        backgroundVideo.loop = true;
        backgroundVideo.play();
      }
    }

    function backgroundVideoPlay() {
      if($backgroundVideo.hasClass('video-muted')) {
        $backgroundVideo.removeClass('video-muted');
        $backgroundVideo.addClass('video-playing');

        $playButton.removeClass('video-button--play');
        $playButton.addClass('video-button--pause');

        backgroundVideo.currentTime = 0;
        backgroundVideo.muted = false;
        backgroundVideo.loop = false;
      }
    }

  });
})(jQuery, Drupal, Modernizr, this, this.document);
