// load dep. via leniadam.libraries.yml

export function init() {
  // needs to wait for document ready as else $.magnificPopup not ready
  jQuery(() => {
    var $messages = jQuery('.messages');
    if ($messages.length) {
      jQuery.magnificPopup.open({
        items: {
          src: $messages,
          type: 'inline',
        },
      }, 0);
      // var $messagesPopup = jQuery.magnificPopup.instance;
      /*setTimeout(function () {
        $messagesPopup.close();
      }, 10000);*/
    }
  });
}
