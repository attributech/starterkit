/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @file
	 * A JavaScript file for the theme.
	 *
	 * In order for this JavaScript to be loaded on pages, see the instructions in
	 * the README.txt next to this file.
	 */

	// JavaScript should be made compatible with libraries other than jQuery by
	// wrapping it with an "anonymous closure". See:
	// - https://drupal.org/node/1446420
	// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

	//(function ($, Drupal, Modernizr, window, document, undefined) {
	//
	//  Drupal.behaviors.fitVids = {
	//    attach: function (context) {
	//      $(function () {
	//        $("body").fitVids({ customSelector: "iframe[src^='https://maps.google.com/maps']"});
	//      });
	//    }
	//  };
	//
	//  $(function () {
	//
	//    var $header = $('.page-header');
	//    var $navigation = $('.menu--main');
	//    var $navigationToggle = $('.navigation-toggle');
	//
	//    $navigationToggle.click(function() {
	//      $header.toggleClass('navigation-open');
	//    });
	//
	//    FastClick.attach(document.body);
	//
	//    $header.headroom({
	//      offset: 40,
	//      useTouchmove: true
	//    });
	//
	//  });
	//})(jQuery, Drupal, Modernizr, this, this.document);

	console.log('hau');

/***/ }
/******/ ]);