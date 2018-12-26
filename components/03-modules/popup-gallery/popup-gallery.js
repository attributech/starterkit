/**
 * @file
 * Photoswipe initialization
 */

let $ = jQuery;
let $photoSwipeImages;
const pswpElement = document.querySelectorAll('.pswp')[0];
window.lazySizes = window.lazySizes || {};

const defaultOptions = {
  index: 0,
  history: false,
  showHideOpacity: true,
  bgOpacity: 1,
  shareEl: false,
  zoomEl: false,
  fullscreenEl: false,
  captionEl: true,
  counterEl: false,
  closeEl: true,
  preloaderEl: true,
  barsSize: {top: 0, bottom: 0},
};

export function init() {
  $(() => {
    $photoSwipeImages = $('.image-gallery__item');
    $photoSwipeImages.bind('click', initPSWPImages);
  });
}

export function initPSWPImages(event) {

  event.preventDefault();
  let $image = $(event.currentTarget);
  let items = [];

  // generate items array
  let $images = $image.siblings().addBack();
  $images.each((index, element) => {
    let $element = $(element);

    let data = $element.data('photoswipe');
    data.forEach((value) => {
      const $copy = $element.clone();

      const srcset = $copy.find('img')
          .attr('srcset');

      $copy.find('img')
          .attr('data-srcset', srcset)
          .removeAttr('srcset')
          .attr('data-sizes', 'auto')
          .removeAttr('sizes')
          .addClass('lazyload')
          .addClass('lazypreload');

      const html = $copy.html();

      items.push({
        html: html
      });

    });

    $(document).on('lazybeforesizes', function(e){
      // e.preventDefault();
      e.detail.width = $(e.target).closest('.image-gallery__item').innerWidth() || e.detail.width;
    });
  });

  let options = defaultOptions;
  options.index = $image.index();
  let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

  // gallery.listen('gettingData', () => {
  //   lazySizes.autoSizer.checkElems();
  // });

  // gallery.listen('afterChange', lazySizes.autoSizer.checkElems);

  gallery.init();
}

