const $ = window.jQuery;

export function init() {
  $(() => {
    const $header = $('.page-header');
    $header.headroom({
      offset: 40,
      useTouchmove: true,
    });
  });
}