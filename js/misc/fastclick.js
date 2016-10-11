const $ = window.jQuery;

export function init() {
  $(() => {
    FastClick.attach(document.body);
  });
}
