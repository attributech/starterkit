const $ = jQuery;

export const init = () => {
  $(() => {
    let $galleryList = $('.gallery__item-list');
    //let $counterList = $('.gallery__counter');

    if ($galleryList.length) {
      $galleryList.each((index, gallery) => {
        let $gallery = $(gallery);
        $gallery.flickity({
          cellSelector: '.gallery__item',
          //pageDots: false,
          wrapAround: true,
          //dragThreshold: 30
        });

        $gallery.find('img').bind('load', event => {
          $gallery.flickity('resize');
        }).bind('click', function (event, pointer, cellElement, cellIndex) {
          $gallery.flickity('next');
        });

        /*const flkty = $gallery.data('flickity');
        $gallery.on( 'select.flickity', function() {
          const newCounterState = `${flkty.selectedIndex + 1}/${flkty.cells.length}`;
          $counterList
            .eq(index)
            .text(newCounterState);
        });*/
      });
    }
  });
};
