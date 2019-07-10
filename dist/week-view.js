/*! week-view v1.0.1 by Monkey-D-Pixel */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WeekView"] = factory();
	else
		root["WeekView"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAMESPACE = exports.NAMESPACE = 'week-view';
var DRAG_THRESHOLD = exports.DRAG_THRESHOLD = 10;
var VELOCITY_THRESHOLD = exports.VELOCITY_THRESHOLD = 200;
var WIDTH_PER_THRESHOLD = exports.WIDTH_PER_THRESHOLD = 0.3;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CELL = exports.CONTAINER = undefined;

var _constants = __webpack_require__(0);

var CONTAINER = exports.CONTAINER = "<div class=\"".concat(_constants.NAMESPACE, "\">\n        <div class=\"").concat(_constants.NAMESPACE, "-header\">\n            <span class=\"").concat(_constants.NAMESPACE, "-prev\">\n                <svg height=\"28\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-chevron-left\"><polyline points=\"15 18 9 12 15 6\"></polyline></svg>\n            </span>\n            <span class=\"").concat(_constants.NAMESPACE, "-display\"></span>\n            <span class=\"").concat(_constants.NAMESPACE, "-next\">\n                <svg height=\"28\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-chevron-right\"><polyline points=\"9 18 15 12 9 6\"></polyline></svg>\n            </span>\n        </div>\n        <div class=\"").concat(_constants.NAMESPACE, "-body\"><ul></ul></div>\n    </div>");
var CELL = exports.CELL = "<div class=\"".concat(_constants.NAMESPACE, "-cell\">\n        <div class=\"").concat(_constants.NAMESPACE, "-day\">{0}</div>\n        <div class=\"").concat(_constants.NAMESPACE, "-date\">{1}</div>\n    </div>");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeDate = changeDate;
exports.fullDate = fullDate;
exports.formatStr = formatStr;

/**
 * change the date by delta
 * @param {Date} date
 * @param {Number} delta
 * @returns {Date}
 */
function changeDate(date, delta) {
  var d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}
/**
 * Date formatted in 'yyyy/MM/dd'
 * @param {Date} date
 * @returns {String|Object}
 */


function fullDate(date) {
  if (!Date.parse(date)) {
    // to make comparison behaves correctly
    return null;
  }

  var da = new Date(date);
  var y = da.getFullYear();
  var m = da.getMonth() + 1;
  var d = da.getDate();
  return "".concat(y, "/").concat(m < 10 ? '0' + m : m, "/").concat(d < 10 ? '0' + d : d);
}

function formatStr() {
  var str = arguments[0];

  for (var i = 1; i < arguments.length; i++) {
    str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
  }

  return str;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weekView = __webpack_require__(4);

var _weekView2 = _interopRequireDefault(_weekView);

__webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (false) {}

exports["default"] = _weekView2["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaults = __webpack_require__(5);

var _defaults2 = _interopRequireDefault(_defaults);

var _constants = __webpack_require__(0);

var _templates = __webpack_require__(1);

var _methods = __webpack_require__(6);

var _methods2 = _interopRequireDefault(_methods);

var _handlers = __webpack_require__(7);

var _handlers2 = _interopRequireDefault(_handlers);

var _events = __webpack_require__(8);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WeekView =
/*#__PURE__*/
function () {
  function WeekView(el, options) {
    _classCallCheck(this, WeekView);

    var elem;

    if (typeof el === 'string') {
      elem = document.querySelector(el);
    } else {
      elem = el;
    }

    if (!elem || !elem.tagName) {
      throw new TypeError('el must be a valid selector or a DOM element');
    }

    this.el = elem;
    this.options = Object.assign({}, _defaults2["default"], options);
    this.init();
  }

  _createClass(WeekView, [{
    key: "init",
    value: function init() {
      if (this.el[_constants.NAMESPACE]) {
        return;
      }

      this.el.innerHTML = _templates.CONTAINER;
      this.width = this.el.clientWidth;
      this.ul = this.el.querySelector(".".concat(_constants.NAMESPACE, "-body ul"));
      this.dates = [];
      this.handlers = {
        touchstart: function touchstart() {},
        touchmove: function touchmove() {},
        touchend: function touchend() {},
        prev: function prev() {},
        next: function next() {}
      };
      this.startX = null;
      this.touchData = {
        startX: null,
        xArr: [] // startDate has priority over minDate and maxDate

      };

      if (this.options.minDate > this.options.startDate) {
        this.options.minDate = new Date(this.options.startDate);
      }

      if (this.options.maxDate && this.options.maxDate < this.options.startDate) {
        this.options.maxDate = new Date(this.options.startDate);
      } // if (this.options.maxDate < this.options.minDate) {
      //     this.options.maxDate = null
      // }


      this.options.num = Math.min(this.options.num, 14);
      this.options.num = Math.max(1, this.options.num);
      this.el.querySelector(".".concat(_constants.NAMESPACE, "-header")).style.display = this.options.showHeader ? '' : 'none';
      this.setStart(this.options.startDate);

      this._bind();

      this.el[_constants.NAMESPACE] = this;
    }
  }]);

  return WeekView;
}();

Object.assign(WeekView.prototype, _events2["default"], _handlers2["default"], _methods2["default"]);
exports["default"] = WeekView;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  startDate: new Date(),
  num: 7,
  onSelect: function onSelect(date) {},
  onChangePeriod: function onChangePeriod(oldStart, currentStart) {},
  minDate: new Date(),
  maxDate: null,
  showHeader: true,
  headerText: function headerText(date) {
    return date.toLocaleDateString();
  },
  dateText: function dateText(date) {
    return date.getDate();
  },
  // add class to a cell whose date satisfies certain condition
  cellClass: {// 'week-end': function(date) {
    //     if ([6,0].includes(date.getDay())) {
    //         return true
    //     }
    // }
  },
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(0);

var _templates = __webpack_require__(1);

var _utilities = __webpack_require__(2);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports["default"] = {
  /**
   * set new options for the instance, auto refresh
   * @param {Object} options
   * @returns {WeekView}
   */
  setOptions: function setOptions(options) {
    if (options && _typeof(options) === 'object') {
      // TODO: support these
      var ignore = ['minDate', 'maxDate', 'startDate', 'num'];
      var incoming = Object.keys(options);
      ignore.forEach(function (i) {
        if (incoming.includes(i)) {
          console.warn(ignore.toString() + ' are not supported for new options');
          delete options[i];
        }
      });

      if (Object.keys(options).length) {
        Object.assign(this.options, options);
        this.el.querySelector(".".concat(_constants.NAMESPACE, "-header")).style.display = this.options.showHeader ? '' : 'none';
        return this.refresh();
      }
    }

    return this;
  },

  /**
   * re-render current period, e.g. new options set
   * @returns {WeekView}
   */
  refresh: function refresh() {
    var _this = this;

    this.width = this.el.clientWidth;
    var period = this.generatePeriod(this.dates[0], this.selected);
    this.ul.innerHTML = '';
    period.elements.forEach(function (e) {
      _this.ul.appendChild(e);
    });
    this.el.querySelector(".".concat(_constants.NAMESPACE, "-display")).innerText = this.options.headerText(this.selected);
    return this;
  },

  /**
   * generate dates and DOM elements for a period starting from 'start'
   * @param {Date} start - start date for the period
   * @param {Date} selected - optional, selected date
   * @returns {Object}
   */
  generatePeriod: function generatePeriod(start, selected) {
    var iterator = new Date(start);
    var dates = [];
    var elements = [];

    for (var i = 0; i < this.options.num; i++) {
      dates.push(new Date(iterator));
      var li = document.createElement('li');
      li.style.width = "".concat((this.width / this.options.num).toFixed(1), "px");
      li.innerHTML = (0, _utilities.formatStr)(_templates.CELL, this.options.days[iterator.getDay()], this.options.dateText(iterator));

      if (!this.isAvailable(iterator)) {
        li.classList.add("".concat(_constants.NAMESPACE, "-disabled"));
      }

      if (selected && (0, _utilities.fullDate)(iterator) === (0, _utilities.fullDate)(selected)) {
        li.querySelector(".".concat(_constants.NAMESPACE, "-date")).classList.add("".concat(_constants.NAMESPACE, "-selected"));
      }

      for (var key in this.options.cellClass) {
        if (this.options.cellClass[key](iterator)) {
          li.classList.add(key);
        }
      }

      li.dataset['index'] = i;
      elements.push(li);
      iterator.setDate(iterator.getDate() + 1);
    }

    return {
      dates: dates,
      elements: elements
    };
  },

  /**
   * set the period starting from 'start', set 'offset'th date in the period selected
   * @param {Date} start - start date of the period
   * @param {Number} offset - optional, index of the selected date in the period
   * @returns {WeekView}
   */
  setStart: function setStart(start, offset) {
    var _this2 = this;

    offset = offset || 0;
    var fakeStart = new Date(start);
    fakeStart.setDate(fakeStart.getDate() + this.options.num - 1); // the first available date in the list can be max (num - 1) days earlier

    if (this.isAvailable(start) || this.isAvailable(fakeStart)) {
      var period = this.generatePeriod(start);
      this.ul.innerHTML = '';
      period.elements.forEach(function (e) {
        _this2.ul.appendChild(e);
      });
      var oldStart;

      if (this.dates[0]) {
        oldStart = new Date(this.dates[0]);
      }

      this.dates = period.dates;
      oldStart && this.options.onChangePeriod(oldStart, this.dates[0]);
      var $prev = this.el.querySelector(".".concat(_constants.NAMESPACE, "-prev"));
      var $next = this.el.querySelector(".".concat(_constants.NAMESPACE, "-next"));
      $prev.classList.remove("".concat(_constants.NAMESPACE, "-disabled"));
      $next.classList.remove("".concat(_constants.NAMESPACE, "-disabled"));

      if (this.indexOf(this.options.minDate) > -1) {
        $prev.classList.add("".concat(_constants.NAMESPACE, "-disabled"));
      }

      if (this.options.maxDate && this.indexOf(this.options.maxDate) > -1) {
        $next.classList.add("".concat(_constants.NAMESPACE, "-disabled"));
      }

      var sel = 0;

      if (!this.isAvailable(start)) {
        this.dates.forEach(function (d, i) {
          if ((0, _utilities.fullDate)(d) === (0, _utilities.fullDate)(_this2.options.minDate)) {
            sel = i;
          }
        });
      }

      this.selectDate(this.dates[Math.max(offset, sel)]);
    }

    return this;
  },

  /**
   * try to set the given date selected
   * @param {Date} date 
   * @returns {WeekView}
   */
  selectDate: function selectDate(date) {
    var fd = (0, _utilities.fullDate)(date);
    var fmin = (0, _utilities.fullDate)(this.options.minDate);
    var fmax = null;

    if (this.options.maxDate) {
      fmax = (0, _utilities.fullDate)(this.options.maxDate);
    }

    var fl = (0, _utilities.fullDate)(this.dates[0]);
    var fr = (0, _utilities.fullDate)(this.dates[this.dates.length - 1]);

    if (fd < fmin || fd > fmax) {
      return this;
    }

    var testDate = new Date(fd + ' 00:00:00');
    var leftDate = new Date(fl + ' 00:00:00');
    var rightDate = new Date(fr + ' 00:00:00');

    if (fd < fl) {
      var days = parseInt((rightDate - testDate) / 1000 / 60 / 60 / 24);
      var delta = parseInt(days / this.options.num);
      var offset = this.options.num - days % this.options.num - 1;
      this.setStart((0, _utilities.changeDate)(leftDate, -delta * this.options.num), offset);
    } else if (fd > fr) {
      var _days = parseInt((testDate - leftDate) / 1000 / 60 / 60 / 24);

      var _delta = parseInt(_days / this.options.num);

      var _offset = _days % this.options.num;

      this.setStart((0, _utilities.changeDate)(leftDate, _delta * this.options.num), _offset);
    }

    var index = 0;
    this.dates.forEach(function (d, i) {
      if ((0, _utilities.fullDate)(d) === (0, _utilities.fullDate)(date)) {
        index = i;
      }
    });
    this.ul.querySelectorAll(".".concat(_constants.NAMESPACE, "-date")).forEach(function (e, i) {
      if (i === index) {
        e.classList.add("".concat(_constants.NAMESPACE, "-selected"));
      } else {
        e.classList.remove("".concat(_constants.NAMESPACE, "-selected"));
      }
    });
    this.selected = new Date(this.dates[index]);
    this.options.onSelect(this.selected);
    this.el.querySelector(".".concat(_constants.NAMESPACE, "-display")).innerText = this.options.headerText(this.dates[index]);
    return this;
  },

  /**
   * destroy the instance
   */
  destroy: function destroy() {
    this._unbind();

    this.el.innerHTML = '';
    delete this.el[_constants.NAMESPACE];
  },

  /**
   * tell if the given date is available
   * @param {Date} date
   * @returns {Boolean}
   */
  isAvailable: function isAvailable(date) {
    return Date.parse(date) && (0, _utilities.fullDate)(date) >= (0, _utilities.fullDate)(this.options.minDate) && (!this.options.maxDate || (0, _utilities.fullDate)(date) <= (0, _utilities.fullDate)(this.options.maxDate));
  },

  /**
   * return the given date's index in the current period
   * @param {Date} date
   * @returns {Number}
   */
  indexOf: function indexOf(date) {
    var ret = -1;

    for (var i = 0; i < this.options.num; i++) {
      if ((0, _utilities.fullDate)(this.dates[i]) === (0, _utilities.fullDate)(date)) {
        ret = i;
        break;
      }
    }

    return ret;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(0);

var _utilities = __webpack_require__(2);

exports["default"] = {
  _touchstart: function _touchstart(e) {
    var _this = this;

    if (this.options.minDate < this.dates[0]) {
      var leftPeriod = this.generatePeriod((0, _utilities.changeDate)(this.dates[0], -this.options.num));

      for (var i = leftPeriod.elements.length - 1; i >= 0; i--) {
        leftPeriod.elements[i].classList.add("".concat(_constants.NAMESPACE, "-temp"));

        _this.ul.prepend(leftPeriod.elements[i]);
      }

      this.ul.style.left = -this.width + 'px';
    }

    if (!this.options.maxDate || this.options.maxDate > this.dates[this.dates.length - 1]) {
      var rightPeriod = this.generatePeriod((0, _utilities.changeDate)(this.dates[this.dates.length - 1], 1));
      rightPeriod.elements.forEach(function (e) {
        e.classList.add("".concat(_constants.NAMESPACE, "-temp"));

        _this.ul.append(e);
      });
    }

    this.ul.addEventListener('touchmove', this.handlers.touchmove);
    document.addEventListener('mousemove', this.handlers.touchmove);
    var eventX = e.clientX || e.touches[0].clientX;
    this.touchData.startX = eventX;
    this.touchData.xArr.push([eventX, Date.now()]);
  },
  _touchmove: function _touchmove(e) {
    var l = this.touchData.xArr.length;
    var eventX = e.clientX || e.touches[0].clientX;
    var delta = eventX - this.touchData.xArr[l - 1][0];
    this.touchData.xArr.push([eventX, Date.now()]);
    var old = parseFloat(this.ul.style.left && this.ul.style.left.replace('px', '')) || 0;

    if (delta > 0 // moving right
    && (this.indexOf(this.options.minDate) === -1 // minDate is not in current period
    || old < 0 // or ul is moved already, when no leftPeriod prepended
    ) || delta < 0 && ( // moving left
    !this.options.maxDate || // no maxDate set
    this.indexOf(this.options.maxDate) === -1 // maxDate is not in current period
    || old < -this.width // or ul is moved already, when leftPeriod prepended
    )) {
      // update position
      this.ul.style.left = old + delta + 'px';
    }
  },
  _touchend: function _touchend(e) {
    var last = this.touchData.xArr[this.touchData.xArr.length - 1];

    if (!last) {
      return;
    }

    this.ul.removeEventListener('touchmove', this.handlers.touchmove);
    document.removeEventListener('mousemove', this.handlers.touchmove);
    var delta = last[0] - this.touchData.startX;
    var v = 0;

    if (this.touchData.xArr.length > 1) {
      var last2 = this.touchData.xArr[this.touchData.xArr.length - 2];
      v = (last[0] - last2[0]) / (last[1] - last2[1]) * 1000;
    }

    this.ul.querySelectorAll(".".concat(_constants.NAMESPACE, "-temp")).forEach(function (e) {
      e.remove();
    });

    if (Math.abs(delta) > this.width * _constants.WIDTH_PER_THRESHOLD || Math.abs(v) > _constants.VELOCITY_THRESHOLD) {
      if (delta < 0) {
        this._next();
      } else {
        this._prev();
      }
    } else {
      if (Math.abs(delta) < _constants.DRAG_THRESHOLD) {
        // tap
        var el = e.srcElement || e.target;

        while (el && el.tagName !== 'LI') {
          if (el === this) {
            el = null;
            break;
          }

          el = el.parentElement;
        }

        if (el && !el.classList.contains("".concat(_constants.NAMESPACE, "-disabled"))) {
          this.selectDate(this.dates[el.dataset['index']]);
        }
      }
    }

    this.ul.style.left = '';
    this.touchData.startX = null;
    this.touchData.xArr = [];
  },
  _prev: function _prev() {
    this.setStart((0, _utilities.changeDate)(this.dates[0], -this.options.num));
  },
  _next: function _next() {
    this.setStart((0, _utilities.changeDate)(this.dates[this.options.num - 1], 1));
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(0);

exports["default"] = {
  _bind: function _bind() {
    var _this = this;

    var _loop = function _loop(key) {
      _this.handlers[key] = function (e) {
        if (_this.el.contains(e.target) || e.target === _this.el) {
          e.preventDefault();

          _this['_' + key](e);
        }
      };
    };

    for (var key in this.handlers) {
      _loop(key);
    }

    this.ul.addEventListener('touchstart', this.handlers.touchstart);
    this.ul.addEventListener('touchend', this.handlers.touchend);
    document.addEventListener('mousedown', this.handlers.touchstart);
    document.addEventListener('mouseup', this.handlers.touchend);
    this.el.querySelector(".".concat(_constants.NAMESPACE, "-prev")).addEventListener('click', this.handlers.prev);
    this.el.querySelector(".".concat(_constants.NAMESPACE, "-next")).addEventListener('click', this.handlers.next);
  },
  _unbind: function _unbind() {
    this.ul.removeEventListener('touchstart', this.handlers.touchstart);
    this.ul.removeEventListener('touchend', this.handlers.touchend);
    document.removeEventListener('mousedown', this.handlers.touchstart);
    document.removeEventListener('mouseup', this.handlers.touchend);
    this.el.querySelector(".".concat(_constants.NAMESPACE, "-prev")).removeEventListener('click', this.handlers.prev);
    this.el.querySelector(".".concat(_constants.NAMESPACE, "-next")).removeEventListener('click', this.handlers.next);
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(10);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(12)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// Module
exports.push([module.i, ".week-view {\n    max-width: 100%;\n    overflow: hidden;\n    color: #737373;\n    font-size: 15px;\n}\n.week-view-header {\n    text-align: center;\n}\n.week-view-header > span {\n    display: inline-block;\n}\n.week-view-header > span, .week-view-header svg {\n    vertical-align: middle;\n}\n.week-view-body > ul {\n    white-space: nowrap;\n    position: relative;\n    margin: 0;\n    padding: 0;\n}\n.week-view-body li {\n    display: inline-block;\n    text-align: center;\n}\n.week-view-cell {\n    width: 40px;\n    cursor: pointer;\n}\n.week-view-date {\n    width: 35px;\n    height: 35px;\n    line-height: 35px;\n}\n.week-view-body li div {\n    margin: auto;\n}\n.week-view-selected {\n    background-color: #57b4e0;\n    border-radius: 50%;\n    color: #fff;\n}\n.week-view-header .fa {\n    font-size: 22px;\n    margin: 0 5px;\n}\n.weel-view-header svg {\n    display: block;\n}\n.week-view-display {\n    font-size: 20px;\n    line-height: 1;\n    color: #57b4e0;\n    padding: 0 5px;\n}\n.week-view-disabled {\n    opacity: 0.6;\n}\n.week-view-disabled .week-view-cell{\n    cursor: not-allowed;\n}", ""]);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ])["default"];
});