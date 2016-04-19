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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _responsiveMenu = __webpack_require__(1);

	var _responsiveMenu2 = _interopRequireDefault(_responsiveMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('HAI from main.js'); /******************************************\
	                                  * @file
	                                  * A JavaScript file for the theme.
	                                 \******************************************/

	// import anchorScrollAnimation from './utils/anchorScrollAnimation';
	// import buggyFill             from './utils/buggyFill';
	// import fastclick             from './utils/fastclick';
	// import headroom              from './utils/headroom';
	// import magnificMessages      from './utils/magnificMessages';

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var $header = jQuery('.page-header');
	  var $html = jQuery('html');
	  var $navigationToggle = jQuery('.navigation__toggle');
	  $navigationToggle.click(function () {
	    $html.toggleClass('navigation--open');
	  });
	}();

/***/ }
/******/ ]);