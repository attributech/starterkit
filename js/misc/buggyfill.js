const $ = window.jQuery;

export function init() {
  $(() => {
    viewportUnitsBuggyfill.init({
      refreshDebounceWait: 50,
      force: true,
    });
  });
}
