export default (($) => {
  $(() => {
    viewportUnitsBuggyfill.init({
      refreshDebounceWait: 50,
      force: true,
    });
  });
})(jQuery);
