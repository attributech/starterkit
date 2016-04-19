// load dep. via STARTERKIT.libraries.yml
export default (($) => {
  // needs to wait for document ready as else $.magnificPopup not ready
  $(() => {
    var $messages = $('.messages');
    if ($messages.length) {
      $.magnificPopup.open({
        items: {
          src: $messages,
          type: 'inline',
        },
      }, 0);
      var $messagesPopup = $.magnificPopup.instance;
      /*setTimeout(function () {
        $messagesPopup.close();
      }, 10000);*/
    }
  });
})(window.jQuery);
