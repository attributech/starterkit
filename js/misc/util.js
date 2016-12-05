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
