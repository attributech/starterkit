const $ = window.jQuery;

export const aspectRatio = {
  init: (context, settings) => {
    imageRatio.processImages(context.querySelectorAll('img[data-aspectratio]'));
  }
};
