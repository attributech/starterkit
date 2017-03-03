/**
 * Created by alexjenter on 23.02.17.
 */

;(function() {
  if(!Array.from) {
    Array.from = function (iterable) {
      let array = [];
      for (let i = 0, len = iterable.length; i < len; i++) {
        array.push(iterable[i]);
      }
      return array;
    };
  }
})();