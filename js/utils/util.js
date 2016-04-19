let $ = jQuery;

export function request(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp);
    }
  };

  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    let _this = this;
    let args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(_this, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(_this, args);
  };
};

// export function fastClick() {
//   FastClick.attach(document.body);
// }

// export function headroom() {
//   $header.headroom({
//     offset: 40,
//     useTouchmove: true,
//   });
// }

// export function anchorScrollAnimation(scrollElement = 'html,body', relativeToParent = false) {
//   $('a[href*=#]:not([href=#])').click(function () {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//       if (this.hash) {
//         let target = $(this.hash);
//         target = target.length ? target : $('[id="' + this.hash.slice(1) + '"]');
//         if (target.length) {
//           let position;
//           if(relativeToParent) {
//             position = target.position().top;
//           } else {
//             position = target.offset().top;
//           }
//           $(scrollElement).animate({
//             scrollTop: position, /*- $('.page-header').outerHeight()*/
//           }, 1000, 'swing', function () {
//             $(window).trigger('scroll');
//           });
//           return false;
//         }
//       }
//     }
//   });
// }


// export function anchorScrollAnimation(scrollElement = 'html,body', relativeToParent = false) {
//   $('a[href*=#]:not([href=#])').click(function () {
//     let samePathName = location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '');
//     let sameHostName = location.hostname == this.hostname;
//     if (samePathName && sameHostName && this.hash) {
//       let $target = $(this.hash);
//
//       $target = $target.length ? $target : $('[id="' + this.hash.slice(1) + '"]');
//       if ($target.length) {
//         let position;
//         if (relativeToParent) {
//           let $sibling = $target.prev();
//           position = $sibling.height() + Number($sibling.css('marginTop').replace("px", ""));
//         } else {
//           position = $target.offset().top - $('.page-header').outerHeight();
//         }
//
//         $(scrollElement).animate({
//           scrollTop: position
//         }, 1000, 'swing', function () {
//           $(window).trigger('scroll');
//         });
//
//         return false;
//       }
//     }
//   });
// }

// export function anchorScrollAnimation() {
//   $(function () {
//     $('a[href*="#"]:not([href="#"])').click(function() {
//       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//         var target = $(this.hash);
//         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//         if (target.length) {
//           $('html, body').animate({
//             scrollTop: target.offset().top
//           }, 1000);
//           return false;
//         }
//       }
//     });
//   });
// }



export function hashToStore(actions, scroll) {
  let hash = location.hash.substring(1);
  let data = hash.split('/');
  let prop = data[0];
  let val  = Number(data[1]);
  actions.flushStore();
  actions.setProp(prop, val);
  if (scroll) {
    let scrollPosition = $('.gallery').offset().top;
    scrollPosition -= $('.page-header').height();
    $("html, body").animate({ scrollTop: scrollPosition - 15 });
  }
}

export function handleHeaderImages() {
  // Front
  let $header = $('.header-images');
  let headerImages = drupalSettings.headerImages;
  console.log(headerImages);
  if (headerImages !== undefined && headerImages.length) {
    let image = headerImages[Math.floor(Math.random() * headerImages.length)];
    let $headerImage = $('<img>').attr('src', image);
    $header.html($headerImage);
  }
}
