/*
 * Version: 2.0.4
 * Build time: Tue Aug 30 2016 15:54:38 GMT+0800 (CST)
 * Copyright 2016, Alibaba
*/

/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  // webpack鍏ュ彛锛岀敤浜庢墦鍖呮爣绛惧紩鐢ㄧ殑build鏂囦欢锛屽紩鍏ラ〉闈㈠悗浼氬垱寤哄叏灞€鐨凢ocusEngine瀵硅薄銆�

  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _libEngineJs = __webpack_require__(1);

  var _libEngineJs2 = _interopRequireDefault(_libEngineJs);

  if (!window.FocusEngine) {
    window.FocusEngine = _libEngineJs2['default'];
  }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _event = __webpack_require__(2);

  var _event2 = _interopRequireDefault(_event);

  var _widget = __webpack_require__(3);

  var _widget2 = _interopRequireDefault(_widget);

  var _switch = __webpack_require__(4);

  var _switch2 = _interopRequireDefault(_switch);

  var _scroll = __webpack_require__(5);

  var _scroll2 = _interopRequireDefault(_scroll);

  var _grid = __webpack_require__(7);

  var _grid2 = _interopRequireDefault(_grid);

  var _grille = __webpack_require__(8);

  var _grille2 = _interopRequireDefault(_grille);

  // requestAnimationFrame shim for Blitz
  window.requestAnimationFrame = window.requestAnimationFrame || function (operation) {
    setTimeout(operation, 0);
  };

  var Engine = {
    Event: _event2['default'],
    Widget: _widget2['default'],
    Switch: _switch2['default'],
    Scroll: _scroll2['default'],
    Grid: _grid2['default'],
    Grille: _grille2['default'],
    roles: ['Widget', 'Switch', 'Scroll', 'Grid', 'Grille'],
    render: function render() {
      var dom = arguments.length <= 0 || arguments[0] === undefined ? document.body : arguments[0];

      var domRole = dom.getAttribute('fe-role');
      // 濡傛灉fe-role閿欒锛屾姏鍑�
      if (domRole && this.roles.indexOf(domRole) === -1) {
        console.log(dom);
        throw new Error('[' + domRole + ']涓嶆槸鏀寔鐨刦e-role绫诲瀷锛屽彧鏀寔浠ヤ笅绫诲瀷锛�' + this.roles.join('銆�'));
      }
      // 榛樿Widget
      if (!domRole) {
        dom.setAttribute('fe-role', 'Widget');
      }
      // 濡傛灉璇ラ〉闈㈠凡缁忔湁缁勪欢鏍戯紝閭ｄ箞鍙渶瑕乺eRender璇ョ粍浠舵爲鍗冲彲
      if (window.$FocusEngineGlobalRoot) {
        window.$FocusEngineGlobalRoot.reRender();
        return window.$FocusEngineGlobalRoot.getWidgetById(dom.id);
      }
      // 濡傛灉璇ラ〉闈㈣繕娌℃湁缁勪欢鏍戯紝閭ｄ箞闇€瑕佷粠body娓叉煋椤甸潰缁勪欢鏍戯紝鐒跺悗杩斿洖dom瀵瑰簲鐨勭粍浠�
      var bodyRole = document.body.getAttribute('fe-role');
      // 濡傛灉fe-role閿欒锛屾姏鍑�
      if (bodyRole && this.roles.indexOf(bodyRole) === -1) {
        throw new Error('[' + bodyRole + ']涓嶆槸鏀寔鐨刦e-role绫诲瀷锛屽彧鏀寔浠ヤ笅绫诲瀷锛�' + this.roles.join('銆�'));
      }
      // 榛樿Widget
      if (!bodyRole) {
        document.body.setAttribute('fe-role', 'Widget');
        bodyRole = 'Widget';
      }
      window.$FocusEngineGlobalRoot = new this[bodyRole](document.body);
      window.$FocusEngineGlobalRoot.focus();
      window.$FocusEngineGlobalRoot.handleRootEvent();
      return window.$FocusEngineGlobalRoot.getWidgetById(dom.id);
    },

    // 閫氳繃dom鑺傜偣鍒涘缓涓€涓獁idget骞堕€掑綊鍒涘缓dom鐨勫唴閮╳idget
    createWidget: function createWidget(dom) {
      var domRole = dom.getAttribute('fe-role');
      // 濡傛灉fe-role閿欒锛屾姏鍑�
      if (domRole && this.roles.indexOf(domRole) === -1) {
        console.log(dom);
        throw new Error('[' + domRole + ']涓嶆槸鏀寔鐨刦e-role绫诲瀷锛屽彧鏀寔浠ヤ笅绫诲瀷锛�' + this.roles.join('銆�'));
      }
      // 榛樿Widget
      if (!domRole) {
        dom.setAttribute('fe-role', 'Widget');
      }
      return new this[domRole](dom);
    },

    appendWidget: function appendWidget(dom) {
      var widget = this.createWidget(dom);
      while (dom.parentNode) {
        dom = dom.parentNode;
        if (!dom.getAttribute('fe-role')) {
          continue;
        }
        var id = dom.id;
        this.getWidgetById(id).addChildWidget(widget);
        return;
      }
    },

    // 鑾峰彇鏁翠釜椤甸潰缁勪欢鏍戠殑鏍圭粍浠�
    getRoot: function getRoot() {
      return window.$FocusEngineGlobalRoot;
    },

    getWidgetById: function getWidgetById(id) {
      if (window.$FocusEngineGlobalRoot) {
        return window.$FocusEngineGlobalRoot.getWidgetById(id);
      } else {
        return null;
      }
    },

    getFocusedLeaf: function getFocusedLeaf() {
      if (window.$FocusEngineGlobalRoot) {
        return window.$FocusEngineGlobalRoot.getFocusedLeaf();
      } else {
        return null;
      }
    },

    freeze: function freeze(blur) {
      window.$FocusEngineGlobalRoot && window.$FocusEngineGlobalRoot.freeze(blur);
    },

    activate: function activate() {
      window.$FocusEngineGlobalRoot && window.$FocusEngineGlobalRoot.activate();
    }
  };

  exports['default'] = Engine;
  module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Event = (function () {

    /**
     * type锛氫簨浠剁被鍨�
     * target锛氳Е鍙戜簨浠剁殑缁勪欢
     * data锛氬叾浠栦簨浠跺睘鎬э紝濡倇keyCode: 13}
     */

    function Event(type, target, data) {
      _classCallCheck(this, Event);

      this.type = type;
      this._propagationStopped = false;
      this._defaultPrevented = false;
      this._listenerPrevented = false;
      if (target) {
        this.target = target;
      }
      if (data) {
        for (var pro in data) {
          this[pro] = data[pro];
        }
      }
    }

    // 鍋滄鍐掓场

    Event.prototype.stopPropagation = function stopPropagation() {
      this._propagationStopped = true;
    };

    // 璇ヤ簨浠舵槸鍚﹀凡缁忓仠姝㈠啋娉�

    Event.prototype.isPropagationStopped = function isPropagationStopped() {
      return this._propagationStopped;
    };

    // 绂佹榛樿浜嬩欢

    Event.prototype.preventDefault = function preventDefault() {
      this._defaultPrevented = true;
    };

    // 鏄惁宸茬粡绂佹榛樿浜嬩欢

    Event.prototype.isDefaultPrevented = function isDefaultPrevented() {
      return this._defaultPrevented;
    };

    // 绂佹瑙﹀彂閫氳繃on娣诲姞鐨刲istener

    Event.prototype.preventListener = function preventListener() {
      this._listenerPrevented = true;
    };

    // 鏄惁宸茬粡绂佹Listener

    Event.prototype.isListenerPrevented = function isListenerPrevented() {
      return this._listenerPrevented;
    };

    _createClass(Event, null, [{
      key: "VK_ENTER",
      get: function get() {
        return 13;
      }
    }, {
      key: "VK_LEFT",
      get: function get() {
        return 37;
      }
    }, {
      key: "VK_UP",
      get: function get() {
        return 38;
      }
    }, {
      key: "VK_RIGHT",
      get: function get() {
        return 39;
      }
    }, {
      key: "VK_DOWN",
      get: function get() {
        return 40;
      }
    }]);

    return Event;
  })();

  exports["default"] = Event;
  module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _event = __webpack_require__(2);

  var _event2 = _interopRequireDefault(_event);

  var _engine = __webpack_require__(1);

  var _engine2 = _interopRequireDefault(_engine);

  var Widget = (function () {

    /**
     * @param container {HTMLElement} 缁勪欢鐨勫鍣╠om鍏冪礌
     */

    function Widget(container) {
      _classCallCheck(this, Widget);

      if (!container) {
        throw new Error('[Focus Engine Error] 鍒涘缓缁勪欢蹇呴』浼犲叆鐩稿簲鐨勫鍣ㄥ厓绱犮€�');
      }
      this.con = container;

      if (this.con.id) {
        this.id = this.con.id;
      } else {
        // 鐢熸垚闅忔満ID
        var randomId = Math.random().toString().slice(2, 12);
        var confirmed = false;
        while (!confirmed) {
          if (document.getElementById('fe-' + randomId)) {
            randomId = Math.random().toString().slice(2, 12);
          } else {
            confirmed = true;
          }
        }
        this.id = 'fe-' + randomId;
        this.con.id = this.id;
      }
      this.options = this._getOptions(container);
      this.parentWidget = null;
      this.focusedChildWidget = null;
      this.cachedChildWidget = null;
      this.active = true;
      this.disabled = this.options.cfg.disable === 'yes';
      if (this.disabled) {
        this.addClass('fe-disable');
      }
      this.eventListeners = {};

      this._initChildWidgets();
    }

    /**
     * 褰搘idget瀵瑰簲鐨刣om缁撴瀯鍙戠敓鏀瑰彉鏃讹紝杩涜閲嶆柊娓叉煋銆�
     * 娓叉煋浼氭牴鎹彉鍔ㄧ殑dom鏉ラ拡瀵规€х殑杩涜锛屽鏋滄煇涓獁idget鐨勭洿鎺ュ瓙widget娌℃湁鍙樺寲锛岄偅涔堜笉杩涜rerender
     */

    Widget.prototype.reRender = function reRender() {
      if (!document.querySelector('#' + this.id)) {
        return;
      }
      this.con = document.querySelector('#' + this.id);
      this.options = this._getOptions(this.con);
      this._reRenderChildWidget();
    };

    Widget.prototype.getFutureRect = function getFutureRect() {
      var widget = this;
      var rect = widget.getWidgetRect();
      while (widget.getParentWidget()) {
        var _parent = widget.getParentWidget();
        if (_parent instanceof _engine2['default'].Scroll) {
          if (_parent.dir === 'v') {
            rect.top += _parent.futureOffset;
            rect.bottom += _parent.futureOffset;
            rect.centerY += _parent.futureOffset;
          } else if (_parent.dir === 'h') {
            rect.left += _parent.futureOffset;
            rect.right += _parent.futureOffset;
            rect.centerX += _parent.futureOffset;
          }
        }
        if (_parent instanceof _engine2['default'].Grid) {
          if (_parent.horizontal) {
            rect.left += widget.futureOffset;
            rect.right += widget.futureOffset;
            rect.centerX += widget.futureOffset;
          } else {
            rect.top += widget.futureOffset;
            rect.bottom += widget.futureOffset;
            rect.centerY += widget.futureOffset;
          }
        }
        widget = _parent;
      }
      return rect;
    };

    Widget.prototype._reRenderChildWidget = function _reRenderChildWidget() {
      var descendantNodes = Array.prototype.slice.call(this.con.querySelectorAll('[fe-role]'));
      // 鎺掗櫎鎺夋繁灞傛鐨勫彲鍒濆鍖栦负缁勪欢鐨刣om锛�
      // 鍙繚鐣欓亶鍘嗗埌鐨勯灞俤om
      for (var i = 0; i < descendantNodes.length; i++) {
        var descd = descendantNodes[i];
        var role = descd.getAttribute('fe-role');
        if (_engine2['default'].roles.indexOf(role) === -1) {
          console.log(descd);
          throw new Error('[' + role + ']涓嶆槸鏀寔鐨刦e-role绫诲瀷锛屽彧鏀寔浠ヤ笅绫诲瀷锛�' + _engine2['default'].roles.join('銆�'));
        }
        descendantNodes = this._filterArray(descendantNodes, Array.prototype.slice.call(descendantNodes[i].querySelectorAll('[fe-role]')));
      }

      // 棣栧厛鍒犻櫎瀹瑰櫒宸茬粡琚垹闄ょ殑瀛愮粍浠�
      for (var i = 0; i < this.childWidgets.length; i++) {
        if (descendantNodes.indexOf(this.childWidgets[i].getDOMNode()) === -1) {
          this.removeChildWidget(i);
          i--;
          continue;
        }
        var tempRole = this.childWidgets[i].getDOMNode().getAttribute('fe-role');
        if (_engine2['default'].roles.indexOf(tempRole) === -1 || !(this.childWidgets[i] instanceof _engine2['default'][tempRole])) {
          this.removeChildWidget(i);
          i--;
        }
      }

      // 鍏舵閫掑綊閬嶅巻闇€瑕佷繚鎸侊紙瀹瑰櫒杩樺瓨鍦級鐨勫瓙缁勪欢
      for (var i = 0; i < this.childWidgets.length; i++) {
        this.childWidgets[i].reRender();
      }

      // 鏈€鍚庡垱寤烘柊澧炲姞鐨勭粍浠讹紝骞舵坊鍔犲埌瀛愮粍浠朵腑
      for (var i = 0; i < descendantNodes.length && descendantNodes.length > this.childWidgets.length; i++) {
        var tempNode = descendantNodes[i];
        var alreadyHas = false;
        for (var j = 0; j < this.childWidgets.length; j++) {
          var tempWidget = this.childWidgets[j];
          if (tempWidget.getDOMNode() === tempNode) {
            alreadyHas = true;
          }
        }
        if (!alreadyHas) {
          var role = tempNode.getAttribute('fe-role');
          if (_engine2['default'].roles.indexOf(role) !== -1) {
            var newWidget = new _engine2['default'][role](tempNode);
            this.addChildWidget(newWidget, i);
          }
        }
      }

      if (this.focused) {
        this.focus(true, true);
      }
    };

    // 鑾峰彇鏁翠釜椤甸潰缁勪欢鏍戠殑鏍圭粍浠�

    Widget.prototype.getRoot = function getRoot() {
      return window.$FocusEngineGlobalRoot;
    };

    /**
     * 鎸傝捣缁勪欢鏍戙€�
     * @param blur {Boolean} 鏄惁鍦ㄦ寕璧峰悗娓呯┖鐒︾偣閾捐矾銆�
     */

    Widget.prototype.freeze = function freeze(blur) {
      var root = this.getRoot();
      if (!root) {
        return;
      }
      root.active = false;
      if (blur) {
        // 鑻ユ竻绌虹劍鐐癸紝璁板綍鎸傝捣鍓嶅浜庣劍鐐圭姸鎬佺殑鍙跺瓙鑺傜偣
        root.focusedLeafBeforeFreeze = root.getFocusedLeaf();
        root.blur();
      }
    };

    // 婵€娲荤粍浠跺悓鏃惰繕鍘熺劍鐐归摼璺紙鑻ユ寕璧锋椂娓呯┖锛�

    Widget.prototype.activate = function activate() {
      var root = this.getRoot();
      if (!root) {
        return;
      }
      root.active = true;
      // 鑻ユ寕璧风殑鏃跺€欐湁缂撳瓨鐒︾偣锛屾縺娲荤殑鏃跺€欒杩樺師缂撳瓨鐨勭劍鐐�
      if (root.focusedLeafBeforeFreeze) {
        if (document.querySelector('#' + root.focusedLeafBeforeFreeze.id) === root.focusedLeafBeforeFreeze.getDOMNode()) {
          root.focusedLeafBeforeFreeze.focus();
        } else {
          root.focus();
        }
        root.focusedLeafBeforeFreeze = null;
      }
    };

    Widget.prototype.disable = function disable() {
      this.disabled = true;
      this.addClass('fe-disable');
    };

    Widget.prototype.enable = function enable() {
      this.disabled = false;
      this.removeClass('fe-disable');
    };

    Widget.prototype._getOptions = function _getOptions(node) {
      var options = {};
      this.feCfg = this._removeSpaces(node.getAttribute('fe-cfg'));
      var cfg = {};
      if (this.feCfg) {
        var cfgArr = this.feCfg.split(',');
        cfgArr.forEach(function (c) {
          var tmpArr = c.split(':');
          if (tmpArr.length < 2) return false;
          cfg[tmpArr[0]] = tmpArr[1];
        });
      }
      options.cfg = cfg;
      var dataDir = this._removeSpaces(node.getAttribute('fe-goto'));
      var dir = {};
      if (dataDir) {
        var dirArr = dataDir.split(';');
        if (dirArr[0]) dir.up = dirArr[0];
        if (dirArr[1]) dir.right = dirArr[1];
        if (dirArr[2]) dir.down = dirArr[2];
        if (dirArr[3]) dir.left = dirArr[3];
      }
      options.dir = dir;
      options.tab = this._removeSpaces(node.getAttribute('fe-index'));
      return options;
    };

    // 閬嶅巻dom鏍戯紝鑷姩鏄犲皠涓虹粍浠舵爲

    Widget.prototype._initChildWidgets = function _initChildWidgets() {
      this.childWidgets = [];
      var descendantNodes = Array.prototype.slice.call(this.con.querySelectorAll('[fe-role]'));
      // 鎺掗櫎鎺夋繁灞傛鐨勫彲鍒濆鍖栦负缁勪欢鐨刣om锛�
      // 鍙繚鐣欓亶鍘嗗埌鐨勯灞俤om
      for (var i = 0; i < descendantNodes.length; i++) {
        var descd = descendantNodes[i];
        var role = descd.getAttribute('fe-role');
        if (_engine2['default'].roles.indexOf(role) === -1) {
          console.log(descd);
          throw new Error('[' + role + ']涓嶆槸鏀寔鐨刦e-role绫诲瀷锛屽彧鏀寔浠ヤ笅绫诲瀷锛�' + _engine2['default'].roles.join('銆�'));
        }
        descendantNodes = this._filterArray(descendantNodes, Array.prototype.slice.call(descendantNodes[i].querySelectorAll('[fe-role]')));
      }

      var node, w;
      for (var i = 0, j = descendantNodes.length; i < j; i++) {
        node = descendantNodes[i];
        // 濡傛灉fe-role涓哄彲浠ュ垵濮嬪寲鐨勭粍浠跺悕锛屽垯鍒濆鍖栧瓙缁勪欢
        var role = node.getAttribute('fe-role');
        if (_engine2['default'].roles.indexOf(role) !== -1) {
          // 瀛愮粍浠朵笉闇€瑕乫ocus锛屼絾闇€瑕佺户缁€掑綊鍒濆鍖�
          w = new _engine2['default'][role](node);
          this.addChildWidget(w);
        }
      }
    };

    Widget.prototype.handleRootEvent = function handleRootEvent() {
      var that = this;

      document.addEventListener('keydown', function (e) {
        if (!that.active) {
          return;
        }
        e = e || window.event;

        var k = e.keyCode,
            l = that.getFocusedLeaf();

        if (k) {
          l.fire(new _event2['default']('keydown', l, { keyCode: k }));
          if (l && k === _event2['default'].VK_ENTER) {
            l.fire(new _event2['default']('okdown', l, { keyCode: k }));
          }
          e.preventDefault();
        }
      });

      document.addEventListener('keyup', function (e) {
        if (!that.active) {
          return;
        }
        e = e || window.event;

        var k = e.keyCode,
            l = that.getFocusedLeaf();

        if (k) {
          l && l.fire(new _event2['default']('keyup', l, { keyCode: k }));
          if (l && k === _event2['default'].VK_ENTER) {
            l.fire(new _event2['default']('ok', l, { keyCode: k }));
          }
          e.preventDefault();
        }
      });

      document.addEventListener('click', function (e) {
        if (!that.active) {
          return;
        }
        e = e || window.event;

        var t = e.target;
        var w = null;
        while (t && t !== document) {
          // 鑷笅鍚戜笂鎵惧埌绗竴涓粍浠跺鍣�
          if (_engine2['default'].roles.indexOf(t.getAttribute('fe-role')) !== -1) {
            w = that.getWidgetById(t.id);
            // 濡傛灉鏄彾瀛愮粍浠剁殑瀹瑰櫒锛岄偅涔堣Е鍙慶lick浜嬩欢骞秄ocus
            if (w && w.isLeafWidget()) {
              w && w.fire(new _event2['default']('click', w));
              e.preventDefault();
              if (!w.disabled) {
                w.focus();
              }
              return;
              // 濡傛灉鎵惧埌鐨勭涓€涓粍浠朵笉鏄彾瀛愮粍浠讹紝鍒欎笉杩涜鎿嶄綔
            } else {
                return;
              }
            // 涓嶆槸缁勪欢瀹瑰櫒锛岀户缁悜涓婃煡璇�
          } else {
              t = t.parentNode;
            }
        }
      });
    };

    /**
     * 鑾峰彇褰撳墠閫変腑鐨勫彾瀛愯妭鐐�
     * @return {Widget | null} 缁勪欢瀹炰緥
     */

    Widget.prototype.getFocusedLeaf = function getFocusedLeaf() {
      if (this.isLeafWidget()) {
        return this;
      } else if (!this.getFocusedChildWidget()) {
        return null;
      } else {
        return this.getFocusedChildWidget().getFocusedLeaf();
      }
    };

    /**
     * 涓簑idget鐨勫鍣ㄦ坊鍔犵被鍚�
     * @param className {String} 寰呮坊鍔犵殑绫诲悕
     */

    Widget.prototype.addClass = function addClass(className) {
      this.con.classList.add(className);
    };

    /**
     * 涓簑idget鐨勫鍣ㄥ垹闄ょ被鍚�
     * @param className {String} 寰呭垹闄ょ殑绫诲悕
     */

    Widget.prototype.removeClass = function removeClass(className) {
      this.con.classList.remove(className);
    };

    /**
     * 鍒ゆ柇widget鐨勫鍣ㄦ槸鍚︽湁绫诲悕
     * @param className {String} 寰呭垽鏂殑绫诲悕
     * @return {Boolean} 鏄惁鍖呭惈绫诲悕
     */

    Widget.prototype.hasClass = function hasClass(className) {
      return this.con.classList.contains(className);
    };

    /**
     * 鏄剧ず缁勪欢
     */

    Widget.prototype.show = function show() {
      this.con.style.display = 'block';
    };

    /**
     * 闅愯棌缁勪欢
     */

    Widget.prototype.hide = function hide() {
      this.con.style.display = 'none';
    };

    /**
     * 閫変腑褰撳墠缁勪欢锛屽苟閫掑綊閫変腑
     * @param {Boolean} 鏄惁寮哄埗鎵цfocus
     */

    Widget.prototype.focus = function focus(force, preventListener) {
      if (!force && this.focused) {
        return;
      }
      // 濡傛灉涓嶆槸鍙跺瓙鑺傜偣锛屾壘鍒伴粯璁ょ殑鍙跺瓙鑺傜偣锛岃Е鍙慺ocus浜嬩欢
      var willFocusedLeaf = this;
      while (!willFocusedLeaf.isLeafWidget()) {
        var cache = willFocusedLeaf.getCachedChildWidget();
        if (cache && willFocusedLeaf.options.cfg.disable_child_cache !== 'yes') {
          willFocusedLeaf = cache;
          continue;
        }
        var defaul = willFocusedLeaf.getDefaultFocusedChildWidget();
        if (defaul) {
          willFocusedLeaf = defaul;
          continue;
        }
        var first = willFocusedLeaf.getFirstFocusableChildWidget();
        if (first) {
          willFocusedLeaf = first;
          continue;
        }
        break;
      }
      var focusEvent = new _event2['default']('focus', willFocusedLeaf, { force: force });
      if (preventListener) {
        focusEvent.preventListener();
      }
      willFocusedLeaf.fire(focusEvent);
    };

    // focus鏃剁殑榛樿澶勭悊

    Widget.prototype.focusDefault = function focusDefault(e) {
      if (this.focused && !e.force) {
        return;
      }
      var parent = this.getParentWidget();
      if (parent) {
        var oldFocusedChildWidget = parent.getFocusedChildWidget();
        if (oldFocusedChildWidget && oldFocusedChildWidget !== this) {
          oldFocusedChildWidget.blur();
        }
        parent.setFocusedChildWidget(this);
      }
      this.addClass('fe-focus');
      this.focused = true;
      this.cache();
    };

    Widget.prototype.blur = function blur() {
      var parent = this.getParentWidget();
      parent && parent.setFocusedChildWidget(null);
      this.removeClass('fe-focus');
      this.focused = false;
      var focusedChildWidget = this.getFocusedChildWidget();
      if (focusedChildWidget) {
        focusedChildWidget.blur();
      }
      this.fire(new _event2['default']('blur', this));
    };

    Widget.prototype.cache = function cache() {
      if (this.cached) {
        return;
      }
      var parent = this.getParentWidget();
      if (parent) {
        var oldCacheChildWidget = parent.getCachedChildWidget();
        if (oldCacheChildWidget) {
          oldCacheChildWidget.removeClass('fe-cache');
          oldCacheChildWidget.cached = false;
        }
        parent.setCachedChildWidget(this);
      }
      this.addClass('fe-cache');
      this.cached = true;
    };

    /**
     * 褰撳墠缁勪欢鏄惁涓哄彾瀛愯妭鐐�
     * @return {Boolean} 鏄惁涓哄彾瀛愯妭鐐�
     */

    Widget.prototype.isLeafWidget = function isLeafWidget() {
      return !this.getFirstFocusableChildWidget();
    };

    /**
     * 鑾峰彇鐖剁粍浠�
     * @return {Widget} 杩斿洖widget瀹炰緥
     */

    Widget.prototype.getParentWidget = function getParentWidget() {
      return this.parentWidget;
    };

    /**
     * 鑾峰彇褰撳墠閫変腑鐨勫瓙缁勪欢
     * @return {Widget} 杩斿洖widget瀹炰緥
     */

    Widget.prototype.getFocusedChildWidget = function getFocusedChildWidget() {
      if (!this.focusedChildWidget) {
        return null;
      }
      if (this.childWidgets.indexOf(this.focusedChildWidget) === -1) {
        var widgetById = this.getWidgetById(this.focusedChildWidget.id);
        if (this.childWidgets.indexOf(widgetById) !== -1) {
          return widgetById;
        }
        return null;
      }
      return this.focusedChildWidget;
    };

    Widget.prototype.setFocusedChildWidget = function setFocusedChildWidget(widget) {
      if (widget && this.childWidgets.indexOf(widget) === -1) {
        return;
      }
      this.focusedChildWidget = widget;
    };

    Widget.prototype.getCachedChildWidget = function getCachedChildWidget() {
      // 娌℃湁缂撳瓨
      if (!this.cachedChildWidget) {
        return null;
      }
      // 缂撳瓨鐨勫瓙缁勪欢宸茬粡鍒犻櫎
      if (this.childWidgets.indexOf(this.cachedChildWidget) === -1) {
        return null;
      }
      // 缂撳瓨鐨勫瓙缁勪欢disable
      if (this.cachedChildWidget.disabled) {
        return null;
      }
      return this.cachedChildWidget;
    };

    Widget.prototype.setCachedChildWidget = function setCachedChildWidget(widget) {
      if (widget && this.childWidgets.indexOf(widget) === -1) {
        return;
      }
      this.cachedChildWidget = widget;
    };

    Widget.prototype.getDefaultFocusedChildWidget = function getDefaultFocusedChildWidget() {
      if (!this.defaultFocusedChildWidget) {
        return null;
      }
      // 榛樿瀛愮粍浠跺凡缁忓垹闄�
      if (this.childWidgets.indexOf(this.defaultFocusedChildWidget) === -1) {
        return null;
      }
      // 榛樿瀛愮粍浠禿isable
      if (this.defaultFocusedChildWidget.disabled) {
        return null;
      }
      return this.defaultFocusedChildWidget;
    };

    Widget.prototype.getFirstFocusableChildWidget = function getFirstFocusableChildWidget() {
      for (var i = 0; i < this.childWidgets.length; i++) {
        var tempWidget = this.childWidgets[i];
        // 瀛愮粍浠禿isable
        if (tempWidget.disabled) {
          continue;
        }
        return tempWidget;
      }
      return null;
    };

    Widget.prototype.setDefaultFocusedChildWidget = function setDefaultFocusedChildWidget(widget) {
      if (widget && this.childWidgets.indexOf(widget) === -1) {
        return;
      }
      this.defaultFocusedChildWidget = widget;
    };

    /**
     * 鏍规嵁id鑾峰彇缁勪欢瀹炰緥
     * @param id {Number} 缁勪欢id
     */

    Widget.prototype.getWidgetById = function getWidgetById(id) {
      if (this.id === id) {
        return this;
      }
      var rtWidget;
      for (var i = 0, j = this.childWidgets.length; i < j; i++) {
        if (this.childWidgets[i].id === id) {
          return this.childWidgets[i];
        } else {
          rtWidget = this.childWidgets[i].getWidgetById(id);
          if (rtWidget) return rtWidget;
        }
      }
      return null;
    };

    /**
     * 鍦ㄥ瓙缁勪欢鏁扮粍鐨勭壒瀹氫綅缃坊鍔犱竴涓柊鐨勫瓙缁勪欢
     * @param widget {Widget} 缁勪欢瀹炰緥锛屽彲浠ユ槸缁ф壙鑷猈idget鐨勪换鎰忕粍浠跺疄渚�
     * @param index {Number} 缁勪欢鍦ㄧ粍浠跺垪琛ㄧ殑绱㈠紩浣嶇疆锛屼粠0寮€濮嬶紝濡傛灉涓嶄紶锛岄粯璁ゅ湪鏈€鍚庨潰娣诲姞
     */

    Widget.prototype.addChildWidget = function addChildWidget(widget, index) {
      if (!index && index !== 0) index = this.childWidgets.length;
      this.childWidgets.splice(index, 0, widget);
      widget.parentWidget = this;
      if (widget.options.cfg.default_focus === 'yes') {
        this.setDefaultFocusedChildWidget(widget);
      }
    };

    /**
     * 鍒犻櫎瀛愮粍浠舵暟缁勭壒瀹氫綅缃殑瀛愮粍浠�
     * @param widgetOrIndex {Number} 缁勪欢鏈韩锛屾垨缁勪欢鍦ㄧ粍浠跺垪琛ㄧ殑绱㈠紩浣嶇疆锛堜粠0寮€濮嬶級
     */

    Widget.prototype.removeChildWidget = function removeChildWidget(widgetOrIndex) {
      var removeArr;
      if (widgetOrIndex instanceof Widget) {
        for (var i = 0, j = this.childWidgets.length; i < j; i++) {
          if (this.childWidgets[i] === widgetOrIndex) {
            removeArr = this.childWidgets.splice(i, 1);
          }
        }
      } else {
        removeArr = this.childWidgets.splice(widgetOrIndex, 1);
      }

      var removedWidget = removeArr.length ? removeArr[0] : null;
      if (!removedWidget) return;

      // 濡傛灉鍒犻櫎鐨勬濂芥槸褰撳墠閫変腑鐨勫瓙缁勪欢
      if (removedWidget === this.getFocusedChildWidget()) {
        var willFocusedWidget = this.getDefaultFocusedChildWidget() === removedWidget ? this.childWidgets[0] : this.getDefaultFocusedChildWidget();
        willFocusedWidget.focus();
      }
    };

    /**
     * 鑾峰彇瀹瑰櫒dom鑺傜偣
     * @return {HTMLElement}
     */

    Widget.prototype.getDOMNode = function getDOMNode() {
      return this.con;
    };

    // 寰楀埌dom鐨勪笂涓嬪乏鍙冲楂樹腑蹇冧綅缃俊鎭�

    Widget.prototype.getWidgetRect = function getWidgetRect(cache) {
      if (cache && this.rect) {
        return this.rect;
      }
      var el = this.getDOMNode();
      var elRect = el.getBoundingClientRect();
      this.rect = {
        top: elRect.top,
        bottom: elRect.bottom,
        right: elRect.right,
        left: elRect.left,
        width: elRect.width,
        height: elRect.height,
        centerX: elRect.width / 2 + elRect.left,
        centerY: elRect.height / 2 + elRect.top
      };
      return this.rect;
    };

    Widget.prototype.getWidgetRectAsync = function getWidgetRectAsync(cb) {
      var _this = this;

      window.requestAnimationFrame(function () {
        var el = _this.getDOMNode();
        var elRect = el.getBoundingClientRect();
        var rect = {
          top: elRect.top,
          bottom: elRect.bottom,
          right: elRect.right,
          left: elRect.left,
          width: elRect.width,
          height: elRect.height,
          centerX: elRect.width / 2 + elRect.left,
          centerY: elRect.height / 2 + elRect.top
        };
        _this.rect || (_this.rect = rect);
        cb && cb(rect);
      });
    };

    /**
     * 鐩戝惉浜嬩欢
     * @param type {String} 浜嬩欢绫诲瀷
     * @param cb {Function} 浜嬩欢鍥炶皟鍑芥暟
     * @param ctx {Object} 鍥炶皟鍑芥暟鎵ц涓婁笅鏂�
     */

    Widget.prototype.on = function on(type, cb, ctx) {
      var type = type.toLowerCase();
      var listeners = this.eventListeners[type];
      if (!listeners) {
        listeners = this.eventListeners[type] = {};
      }
      if (!listeners[cb]) {
        listeners[cb] = {
          cb: cb,
          ctx: ctx
        };
      }
    };

    /**
     * 瑙ｉ櫎浜嬩欢缁戝畾
     * @param type {String} 浜嬩欢绫诲瀷
     * @param cb {Function} 缁戝畾浜嬩欢鐨勫洖璋冨嚱鏁�
     */

    Widget.prototype.detach = function detach(type, cb) {
      var type = type.toLowerCase();
      var listeners = this.eventListeners[type];
      if (listeners && listeners[cb]) {
        delete listeners[cb];
      }
    };

    /**
     * 瑙﹀彂浜嬩欢锛屾敮鎸佸啋娉″拰鎹曡幏
     * @param type {Event} 浜嬩欢瀵硅薄
     * @param data {Object} 浜嬩欢棰濆鍙傛暟
     */

    Widget.prototype.fire = function fire(e) {
      this.exeEventListeners(e);
      this.exeEventDefault(e);
      var widget = this;
      while (widget.parentWidget && !e.isPropagationStopped()) {
        widget = widget.parentWidget;
        widget.exeEventListeners(e);
        widget.exeEventDefault(e);
      }
    };

    // 鎵ц鑷畾涔夌殑浜嬩欢鐩戝惉

    Widget.prototype.exeEventListeners = function exeEventListeners(e) {
      // 濡傛灉闃绘浜哃istener锛岄偅涔堢姝㈡墽琛�
      if (e.isListenerPrevented()) {
        return;
      }
      var listeners = this.eventListeners[e.type];
      if (listeners) {
        // currentTarget涓虹洃鍚簡鐗瑰畾浜嬩欢鐨勭粍浠跺疄渚嬶紝闇€瑕侀€掑綊鏇存柊
        // target涓鸿Е鍙戜簨浠剁殑鍐掓场婧愮粍浠跺疄渚嬶紝淇濇寔鎭掑畾
        e.currentTarget = this;
        for (var cb in listeners) {
          listeners[cb].cb.call(listeners[cb].ctx, e);
        }
      }
    };

    // 鎵ц榛樿鐨勪簨浠跺鐞�

    Widget.prototype.exeEventDefault = function exeEventDefault(e) {
      // 缁熶竴绠＄悊鎵€鏈夌殑榛樿浜嬩欢澶勭悊锛屼换浣曠户鎵縒idget鐨勭粍浠舵兂澶勭悊鏌愪釜浜嬩欢鍙渶瑕佸鍔犵浉搴旂殑澶勭悊鍑芥暟鍗冲彲锛�
      // 濡傦細scrollend浜嬩欢鐨勫鐞嗗嚱鏁版槸 scrollendDefault銆�
      var eventDefaultHandler = e.type + 'Default';
      this[eventDefaultHandler] && this[eventDefaultHandler](e);
    };

    // 杩涜浜嬩欢鍐掓场澶勭悊
    // exeEventPropagation(e) {
    //   if (e.isPropagationStopped()) {
    //     return;
    //   }
    //   let widget = this;
    //   while ()
    //   if (!e.isPropagationStopped()) {
    //     if (this.parentWidget) {
    //       this.parentWidget.fire(e);
    //     } else {
    //       e.stopPropagation();
    //     }
    //   }
    // }

    /**
     * 閿€姣佺粍浠跺強鍏跺瓙缁勪欢
     * @param isClearDom {Boolean} 閿€姣佺粍浠剁殑鏃跺€欐槸鍚︽妸dom鏋舵瀯杩炲甫閿€姣�
     */

    Widget.prototype.destroy = function destroy(isClearDom) {
      for (var i = 0; i < this.childWidgets.length; i++) {
        this.childWidgets[i].destroy(isClearDom);
      }
      if (this.getParentWidget()) {
        this.getParentWidget().removeChildWidget(this);
      }
      delete this.eventListeners;
      if (isClearDom) {
        this.con.parentNode.removeChild(this.con);
      }
    };

    Widget.prototype._filterArray = function _filterArray(arr1, arr2) {
      return arr1.filter(function (el, i, arr) {
        return arr2.indexOf(el) === -1;
      });
    };

    Widget.prototype._removeSpaces = function _removeSpaces(str) {
      if (!str) {
        return '';
      }
      return str.replace(/\s+/g, '');
    };

    // 寰楀埌缁勪欢浼氳Е鍙戠殑鎵€鏈変簨浠剁被鍨�

    Widget.prototype.getEvents = function getEvents() {
      return ['keydown', 'keyup', 'ok', 'okdown', 'click', 'focus', 'blur'];
    };

    return Widget;
  })();

  exports['default'] = Widget;
  module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _widget = __webpack_require__(3);

  var _widget2 = _interopRequireDefault(_widget);

  var _event = __webpack_require__(2);

  var _event2 = _interopRequireDefault(_event);

  var Switch = (function (_Widget) {
    _inherits(Switch, _Widget);

    /**
     * @param container {HTMLElement} 缁勪欢鐨勫鍣╠om鍏冪礌
     */

    function Switch(container) {
      _classCallCheck(this, Switch);

      _Widget.call(this, container);
      this.minInterval = this.options.cfg.switch_interval > 0 ? this.options.cfg.switch_interval * 1000 : 0;
      // 閰嶇疆锛氭槸鍚︾鐢ㄥ尯鍩熺畻娉�
      this.disableArea = this.options.cfg.switch_disable_area === 'yes';
      // 閰嶇疆锛氭槸鍚︾鐢ㄧ畻娉�
      this.disableShadow = this.options.cfg.switch_disable_shadow === 'yes';
      this.useLeafRect = this.options.cfg.switch_use_leaf_rect === 'yes';
      this.cacheRect = true;
    }

    Switch.prototype.keydownDefault = function keydownDefault(e) {
      if (this.isLeafWidget()) {
        return;
      }
      // 濡傛灉keydown鏄柟鍚戦敭锛岃€屼笖娌℃湁琚樆姝㈤粯璁ゅ鐞嗭紝鍒欒繘琛宻witch鎿嶄綔
      if (!e.isDefaultPrevented() && e.target && [_event2['default'].VK_LEFT, _event2['default'].VK_RIGHT, _event2['default'].VK_UP, _event2['default'].VK_DOWN].indexOf(e.keyCode) !== -1) {
        this.doSwitch(e);
      }
    };

    // 杩涜switch鎿嶄綔

    Switch.prototype.doSwitch = function doSwitch(e) {
      // 濡傛灉灏忎簬璁剧疆鐨勬渶浣庨棿闅旀椂闂达紝鍙栨秷杩欐switch
      var currentTime = new Date().getTime();
      if (currentTime - this.lastKeydownTime < this.minInterval) {
        e.preventDefault();
        return;
      }

      this.lastKeydownTime = currentTime;
      var fChildWidget = this.getFocusedChildWidget();
      var optionDir = fChildWidget.options.dir;
      var newFocusChildWidget = null;

      var oppositeVK = undefined;
      var dirName = undefined;
      if (e.keyCode === _event2['default'].VK_LEFT) {
        oppositeVK = _event2['default'].VK_RIGHT;
        dirName = 'left';
      } else if (e.keyCode === _event2['default'].VK_UP) {
        oppositeVK = _event2['default'].VK_DOWN;
        dirName = 'up';
      } else if (e.keyCode === _event2['default'].VK_RIGHT) {
        oppositeVK = _event2['default'].VK_LEFT;
        dirName = 'right';
      } else if (e.keyCode === _event2['default'].VK_DOWN) {
        oppositeVK = _event2['default'].VK_UP;
        dirName = 'down';
      }

      // 绗竴浼樺厛绾э細缂撳瓨
      if (this.options.cfg.disable_cache_pre !== 'yes' && this.lastKeyCode === oppositeVK && this.lastFocusedChildWidget && !this.lastFocusedChildWidget.disabled) {
        newFocusChildWidget = this.lastFocusedChildWidget;
      }

      // 绗簩浼樺厛绾э細閰嶇疆
      if (!newFocusChildWidget && optionDir && optionDir[dirName]) {
        newFocusChildWidget = this._getSiblingWidgetByCfg(fChildWidget, optionDir[dirName]);
      }

      // 绗笁浼樺厛绾э細闃村奖绠楁硶
      if (!newFocusChildWidget && !this.disableShadow) {
        newFocusChildWidget = this._getSiblingWidgetByShadowAlgorithm(fChildWidget, dirName, e);
      }

      // 绗洓浼樺厛绾э細鍖哄煙绠楁硶
      if (!newFocusChildWidget && !this.disableArea) {
        newFocusChildWidget = this._getSiblingWidgetByAreaAlgorithm(fChildWidget, dirName, e);
      }

      if (!newFocusChildWidget) {
        this.fire(new _event2['default']('switchend', this, { keyCode: e.keyCode }));
        return;
      }

      newFocusChildWidget.focus();
      // 濡傛灉娌℃湁閰嶇疆disable_cache_pre锛岃褰曚笂娆＄殑鐒︾偣鍙婃寜閿�
      if (this.options.cfg.disable_cache_pre !== 'yes') {
        this.lastFocusedChildWidget = fChildWidget;
        this.lastKeyCode = e.keyCode;
      }

      // 涓嶅啀鎵ц鍚庣画鐨勯粯璁や簨浠跺鐞嗭紝浣嗘槸浼氱户缁啋娉°€�
      e.preventDefault();
    };

    Switch.prototype._getSiblingWidgetByCfg = function _getSiblingWidgetByCfg(widget, tabIndex) {
      if (tabIndex == -1) return widget;
      var el;
      for (var i = 0, j = this.childWidgets.length; i < j; i++) {
        var tempChild = this.childWidgets[i];
        if (tempChild === widget) {
          continue;
        }
        if (tempChild.disabled) {
          continue;
        }
        if (tempChild.options.tab === tabIndex && tempChild.getDOMNode().style.display !== 'none') {
          return this.childWidgets[i];
        }
      }
      return null;
    };

    Switch.prototype._getSiblingWidgetByShadowAlgorithm = function _getSiblingWidgetByShadowAlgorithm(widget, dir, e) {
      var currentRect = this.useLeafRect && e ? e.target.getWidgetRect(this.cacheRect) : widget.getWidgetRect(this.cacheRect);
      var matchWidgets = [];
      for (var i = 0; i < this.childWidgets.length; i++) {
        var tempChild = this.childWidgets[i];
        if (tempChild === widget) {
          continue;
        }
        if (tempChild.disabled) {
          continue;
        }
        var tempChildRect = tempChild.getWidgetRect(this.cacheRect);
        var match = false;
        if (dir === 'left') {
          match = tempChildRect.left < currentRect.left && tempChildRect.top < currentRect.bottom && tempChildRect.bottom > currentRect.top;
        }
        if (dir === 'right') {
          match = tempChildRect.right > currentRect.right && tempChildRect.top < currentRect.bottom && tempChildRect.bottom > currentRect.top;
        }
        if (dir === 'up') {
          match = tempChildRect.top < currentRect.top && tempChildRect.left < currentRect.right && tempChildRect.right > currentRect.left;
        }
        if (dir === 'down') {
          match = tempChildRect.bottom > currentRect.bottom && tempChildRect.left < currentRect.right && tempChildRect.right > currentRect.left;
        }
        if (match) {
          matchWidgets.push(tempChild);
        }
      }

      // 濡傛灉娌℃湁鎵惧埌锛屽垯杩斿洖null
      if (matchWidgets.length === 0) {
        return null;
      }

      // 閬嶅巻绗﹀悎鏉′欢鐨勭粍浠跺苟閫夊嚭涓績璺濈鏈€杩戠殑杩斿洖
      var minDis = Infinity;
      var resultWidget = null;
      for (var i = 0; i < matchWidgets.length; i++) {
        var temp = matchWidgets[i];
        var rect = temp.getWidgetRect(this.cacheRect);
        var dis = Math.sqrt(Math.pow(rect.centerX - currentRect.centerX, 2) + Math.pow(rect.centerY - currentRect.centerY, 2));
        if (dis < minDis) {
          minDis = dis;
          resultWidget = temp;
        }
      }
      return resultWidget;
    };

    Switch.prototype._getSiblingWidgetByAreaAlgorithm = function _getSiblingWidgetByAreaAlgorithm(widget, dir, e) {
      var _this = this;

      var currentRect = this.useLeafRect && e ? e.target.getWidgetRect(this.cacheRect) : widget.getWidgetRect(this.cacheRect);
      var cX = currentRect.centerX;
      var cY = currentRect.centerY;
      var filterWidgets = [];

      for (var i = 0, j = this.childWidgets.length; i < j; i++) {
        var tmpW = this.childWidgets[i];
        if (tmpW === widget) {
          continue;
        }
        if (tmpW.disabled) {
          continue;
        }
        var rect = tmpW.getWidgetRect(this.cacheRect);
        var x = rect.centerX - cX;
        var y = (rect.centerY - cY) * -1;
        if (x === 0 && y === 0) {
          continue;
        }
        var isInArea = false;
        if (dir == 'left') {
          isInArea = y + x < 0 && y - x > 0;
        }
        if (dir == 'up') {
          isInArea = y + x >= 0 && y - x >= 0;
        }
        if (dir == 'right') {
          isInArea = y + x > 0 && y - x < 0;
        }
        if (dir == 'down') {
          isInArea = y + x <= 0 && y - x <= 0;
        }

        if (isInArea) {
          filterWidgets.push(tmpW);
        }
      }

      // 濡傛灉娌℃湁鎵惧埌锛屽垯杩斿洖null
      if (filterWidgets.length === 0) {
        return null;
      }

      // 閬嶅巻绗﹀悎鏉′欢鐨勭粍浠跺苟閫夊嚭涓績璺濈鏈€杩戠殑杩斿洖
      var min = Infinity;
      var dis = undefined;
      var retW = null;
      filterWidgets.forEach(function (w) {
        var rect = w.getWidgetRect(_this.cacheRect);
        dis = Math.sqrt(Math.pow(rect.centerX - cX, 2) + Math.pow(rect.centerY - cY, 2));
        if (dis < min) {
          min = dis;
          retW = w;
        }
      });

      return retW;
    };

    Switch.prototype.getEvents = function getEvents() {
      return _Widget.prototype.getEvents.call(this).concat(['switchend']);
    };

    return Switch;
  })(_widget2['default']);

  exports['default'] = Switch;
  module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _switch = __webpack_require__(4);

  var _switch2 = _interopRequireDefault(_switch);

  var _event = __webpack_require__(2);

  var _event2 = _interopRequireDefault(_event);

  var _animate = __webpack_require__(6);

  var _animate2 = _interopRequireDefault(_animate);

  var Scroll = (function (_Switch) {
    _inherits(Scroll, _Switch);

    /**
     * @param container {HTMLElement} 缁勪欢鐨勫鍣╠om鍏冪礌
     */

    function Scroll(container) {
      var _this = this;

      _classCallCheck(this, Scroll);

      _Switch.call(this, container);
      this.cacheRect = false;
      this.dir = this.options.cfg.scroll_dir === 'h' ? this.options.cfg.scroll_dir : 'v';
      this.centerDOM = this.options.cfg.scroll_center === 'document' ? this.options.cfg.scroll_center : 'con';
      this.duration = this.options.cfg.scroll_duration ? parseFloat(this.options.cfg.scroll_duration) : 0.3;
      this.speedupDuration = this.options.cfg.scroll_speedup_duration ? parseFloat(this.options.cfg.scroll_speedup_duration) : this.duration * 0.6;
      this.easing = this.options.cfg.scroll_easing ? this.options.cfg.scroll_easing : 'ease';
      this.speedupEasing = this.options.cfg.scroll_speedup_easing ? this.options.cfg.scroll_speedup_easing : 'linear';
      this.useRAF = this.options.cfg.scroll_use_ram === 'yes' || this.options.cfg.scroll_use_raf === 'yes';
      this.lazyload = this.options.cfg.disable_lazyload !== 'yes';
      this.lazyloadDelay = this.options.cfg.lazyload_delay !== undefined ? parseFloat(this.options.cfg.lazyload_delay) : 0.1;
      this.autoListWidth = this.options.cfg.auto_list_width === 'yes';
      this.conList = this.con.querySelector('.scroll-list');
      this.offset = 0;
      this.desArr = [];
      if (!this.conList) {
        throw new Error('[Focus Engine Scroll Error] Scroll缁勪欢蹇呴』鍚湁涓€涓被鍚嶄负scroll-list鐨勫瓙鍏冪礌銆�');
      }
      var listStyles = getComputedStyle(this.conList);

      if (listStyles.left !== 'auto' && parseInt(listStyles.left) !== 0 && this.dir === 'h') {
        throw new Error('[Focus Engine Scroll Error] 妯悜Scroll瀹瑰櫒鐨�.scroll-list瀛愬厓绱犱笉鍙缃甽eft鍊�');
      }

      if (listStyles.top !== 'auto' && parseInt(listStyles.top) !== 0 && this.dir === 'v') {
        throw new Error('[Focus Engine Scroll Error] 绾靛悜Scroll瀹瑰櫒鐨�.scroll-list瀛愬厓绱犱笉鍙缃畉op鍊�');
      }

      if (listStyles.position === 'static') {
        this.conList.style.position = 'relative';
      }
      this._render();
      if (this.autoListWidth) {
        this._setAutoListWidth();
      }
      var defaultFocusedChild = this.getDefaultFocusedChildWidget();
      if (defaultFocusedChild) {
        this.scrollToWidget(defaultFocusedChild, 0);
      }
      if (this.lazyload) {
        setTimeout(function () {
          _this.loadVisibleImage();
        }, 10);
      }
    }

    // 璁＄畻瀹瑰櫒鍜宭ist鐨勫楂�

    Scroll.prototype._computeScrollRect = function _computeScrollRect() {
      this.conRect = this.getWidgetRect();
      this.conWidth = this.conRect.width;
      this.conHeight = this.conRect.height;
      this.listRect = this.conList.getBoundingClientRect();
      this.listWidth = this.listRect.width;
      this.listHeight = this.listRect.height;
      if (this.centerDOM === 'document') {
        var docRect = document.documentElement.getBoundingClientRect();
        if (this.dir === 'v') {
          this.center = docRect.height / 2;
        } else {
          this.center = docRect.width / 2;
        }
      } else {
        if (this.dir === 'v') {
          this.center = this.conRect.height / 2;
        } else {
          this.center = this.conRect.width / 2;
        }
      }
    };

    // 鑷姩璁剧疆妯悜鍒楄〃鐨勫搴�

    Scroll.prototype._setAutoListWidth = function _setAutoListWidth() {
      this.rightPaddingWithUnit = this.options.cfg.scroll_right_padding;
      this.rightPadding = 0;
      if (this.rightPaddingWithUnit) {
        if (this.rightPaddingWithUnit.indexOf('rem') !== -1) {
          this.rightPadding = parseFloat(this.rightPaddingWithUnit) * parseFloat(document.querySelector('html').style.fontSize);
        } else {
          this.rightPadding = parseFloat(this.rightPaddingWithUnit);
        }
      }
      this.conList.style.width = '99999px';
      for (var i = 0, _length = this.childWidgets.length; i < _length; i++) {
        var right = this.childWidgets[i].getWidgetRect().right;
        var width = right - this.listRect.left + this.rightPadding;
        if (width > this.listWidth) {
          this.listWidth = width;
        }
      }
      this.conList.style.width = this.listWidth + 'px';
    };

    Scroll.prototype.reRender = function reRender() {
      var _this2 = this;

      if (!document.querySelector('#' + this.id)) {
        return;
      }
      this.con = document.querySelector('#' + this.id);
      this.conList = this.con.querySelector('.scroll-list');
      if (!this.conList) {
        throw new Error('[Focus Engine Scroll Error] Scroll缁勪欢蹇呴』鍚湁涓€涓被鍚嶄负scroll-list鐨勫瓙鍏冪礌銆�');
      }
      var listStyles = getComputedStyle(this.conList);

      if (listStyles.position === 'static') {
        this.conList.style.position = 'relative';
      }

      this.options = this._getOptions(this.con);
      this.dir = this.options.cfg.scroll_dir === 'h' ? this.options.cfg.scroll_dir : 'v';
      this.centerDOM = this.options.cfg.scroll_center === 'ducoment' ? this.options.cfg.scroll_center : 'con';
      this.duration = this.options.cfg.scroll_duration ? parseFloat(this.options.cfg.scroll_duration) : 0.3;
      this.easing = this.options.cfg.scroll_easing ? this.options.cfg.scroll_easing : 'linear';
      this.useRAF = this.options.cfg.scroll_use_ram === 'yes' || this.options.cfg.scroll_use_raf === 'yes';
      this._render(true);
      this._reRenderChildWidget();
      if (this.autoListWidth) {
        this._setAutoListWidth();
      }
      if (this.lazyload) {
        setTimeout(function () {
          _this2.loadVisibleImage();
        }, 10);
      }
    };

    Scroll.prototype._render = function _render(isReRender) {
      var _this3 = this;

      this._computeScrollRect();
      if (!isReRender) {
        if (this.dir === 'v') {
          this.conList.style.top = '0px';
        } else {
          this.conList.style.left = '0px';
        }
      }
      if (!this.useRAF) {
        if (this.dir === 'v') {
          this.conList.style.transition = 'top ' + this.duration + 's ' + this.easing;
          this.conList.style.webkitTransition = 'top ' + this.duration + 's ' + this.easing;
        } else {
          this.conList.style.transition = 'left ' + this.duration + 's ' + this.easing;
          this.conList.style.webkitTransition = 'left ' + this.duration + 's ' + this.easing;
        }
        if (!isReRender) {
          // 閬垮厤棣栨render鍚庝篃浼氳Е鍙憇crollend浜嬩欢
          this.rendered = false;
          this.conList.addEventListener('webkitTransitionEnd', function (e) {
            if (e.target !== _this3.conList) {
              return;
            }
            if (_this3.rendered) {
              _this3.fire(new _event2['default']('scrollend', _this3));
            }
            _this3.rendered = true;
          });
          this.conList.addEventListener('transitionend', function (e) {
            if (e.target !== _this3.conList) {
              return;
            }
            if (_this3.rendered) {
              _this3.fire(new _event2['default']('scrollend', _this3));
            }
            _this3.rendered = true;
          });
        }
      }
    };

    Scroll.prototype.focusDefault = function focusDefault(e) {
      _Switch.prototype.focusDefault.call(this, e);
      if (!this.getFirstFocusableChildWidget()) {
        return;
      }
      if (!e.isDefaultPrevented()) {
        // 濡傛灉杩欎簺鍊奸兘鏄�0锛岄偅涔堣鏄庡湪focus涔嬪墠鏄痙isplay:none鐨勶紝鍥犳focus鏃堕噸鏂拌绠楄繖浜涘€�
        if (!this.conWidth && !this.conHeight && !this.listWidth && !this.listHeight && !this.center) {
          this._computeScrollRect();
          if (this.autoListWidth) {
            this._setAutoListWidth();
          }
          var defaultFocusedChild = this.getDefaultFocusedChildWidget();
          if (defaultFocusedChild) {
            this.scrollToWidget(defaultFocusedChild, 0);
            return;
          }
        }
        this.doScroll(e);
      }
    };

    Scroll.prototype.scrollstartDefault = function scrollstartDefault(e) {
      this.loadImageTimeout && clearTimeout(this.loadImageTimeout);
    };

    Scroll.prototype.scrollendDefault = function scrollendDefault(e) {
      var _this4 = this;

      if (this.lazyload && e.target === this) {
        this.loadImageTimeout = setTimeout(function () {
          _this4.loadVisibleImage();
        }, this.lazyloadDelay * 1000);
      }
    };

    Scroll.prototype.doSwitch = function doSwitch(e) {
      _Switch.prototype.doSwitch.call(this, e);
    };

    // 杩涜scroll鎿嶄綔

    Scroll.prototype.doScroll = function doScroll(e) {
      var fWidget = this.getFocusedChildWidget();
      this.scrollToWidget(fWidget, this.duration, e);
    };

    /**
     * 灏唖crolllist婊氬姩鍒版煇涓獁idget鑾峰彇鐒︾偣鏃跺簲璇ュ湪鐨勪綅缃紝浣嗘槸骞朵笉浼歠ocus璇idget
     * @Param {Widget} widget 鐩爣Widget
     * @Param {Event} e 浜嬩欢
     */

    Scroll.prototype.scrollToWidget = function scrollToWidget(widget, duration, e) {
      var offset = this.computeOffsetByWidget(widget);
      if (duration === undefined) {
        duration = this.duration;
      }
      this.scrollListTo(offset, duration, e);
    };

    /**
     * 璁＄畻婊氬姩鍒版煇涓獁idget鏃秎ist鐨刼ffset鍊�
     * @Param   {Widget} widget 鐩爣Widget
     * @Returns {Number} offset鍊�
     */

    Scroll.prototype.computeOffsetByWidget = function computeOffsetByWidget(widget) {
      if (widget.options.cfg.scroll_to_start === 'yes') {
        return 0;
      }
      if (widget.options.cfg.scroll_to_end === 'yes') {
        return this.dir === 'v' ? this.conHeight - this.listHeight : this.conWidth - this.listWidth;
      }
      this._computeScrollRect();
      var dis = this.center - this._getExpectCenter(widget);
      if (this.dir === 'v') {
        if (dis < 0) {
          // 濡傛灉鍚戜笂婊氬姩鏃朵笅杈圭晫鍋忓嚭锛岃缃垚鏈€鍚戜笂鐨勪綅缃紝濡傛灉涓婃婊氬姩宸茬粡杈惧埌椤讹紝杩斿洖銆�
          if (this.offset + dis < this.conHeight - this.listHeight) {
            dis = this.conHeight - this.listHeight - this.offset;
            if (dis > 0) {
              return this.offset;
            }
          }
        } else if (dis > 0) {
          // 鍚屼笂锛岄槻姝笂杈圭晫鍋忓嚭銆�
          if (this.offset * -1 < dis) {
            dis = this.offset * -1;
            if (dis < 0) {
              return this.offset;
            }
          }
        } else {
          return this.offset;
        }
        return this.offset + dis;
      }
      // horizontal
      if (dis < 0) {
        // 濡傛灉鍚戝乏婊氬姩鏃朵笅杈圭晫鍋忓嚭锛岃缃垚鏈€鍚戝乏鐨勪綅缃紝濡傛灉涓婃婊氬姩宸茬粡杈惧埌椤讹紝杩斿洖銆�
        if (this.offset + dis < this.conWidth - this.listWidth) {
          dis = this.conWidth - this.listWidth - this.offset;
          if (dis > 0) {
            return this.offset;
          }
        }
      } else if (dis > 0) {
        // 鍚屼笂锛岄槻姝㈠悜鍙宠竟鐣屽亸鍑�
        if (this.offset * -1 < dis) {
          dis = this.offset * -1;
          if (dis < 0) {
            return this.offset;
          }
        }
      } else {
        return this.offset;
      }
      return this.offset + dis;
    };

    /**
     * 婊氬姩scroll-list鍒颁竴涓綅缃紝des鏄洰鐨勫湴浣嶇疆锛沞鏄簨浠�
     * @Param {Number} des 鐩爣offset鍊�
     * @Param {Event} e 浜嬩欢
     */

    Scroll.prototype.scrollListTo = function scrollListTo(des, duration, e) {
      var _this5 = this;

      if (duration === undefined) {
        duration = this.duration;
      }
      this.fire(new _event2['default']('scrollstart', this));
      if (this.useRAF) {
        if (e && e.type === 'focus') {
          this.futureOffset = des;
        }
        this.desArr.push(des);
        if (this.desArr.length === 1) {
          this.doAnimate(duration, this.easing);
        }
      } else {
        this.offset = des;
        if (this.dir === 'v') {
          this.conList.style.transition = 'top ' + duration + 's ' + this.easing;
          this.conList.style.webkitTransition = 'top ' + duration + 's ' + this.easing;
        } else {
          this.conList.style.transition = 'left ' + duration + 's ' + this.easing;
          this.conList.style.webkitTransition = 'left ' + duration + 's ' + this.easing;
        }
        setTimeout(function () {
          if (_this5.dir === 'v') {
            _this5.conList.style.transition = 'top ' + _this5.duration + 's ' + _this5.easing;
            _this5.conList.style.webkitTransition = 'top ' + _this5.duration + 's ' + _this5.easing;
          } else {
            _this5.conList.style.transition = 'left ' + _this5.duration + 's ' + _this5.easing;
            _this5.conList.style.webkitTransition = 'left ' + _this5.duration + 's ' + _this5.easing;
          }
        }, 1);
        if (this.dir === 'v') {
          this.conList.style.top = this.offset + 'px';
        } else {
          this.conList.style.left = this.offset + 'px';
        }
        if (e && e.type === 'focus') {
          this.futureOffset = this.offset;
        }
      }
    };

    Scroll.prototype.doAnimate = function doAnimate(duration, easing) {
      var _this6 = this;

      // 濡傛灉涓嬫鍔ㄧ敾offset鍦拌窡褰撳墠offset鐩稿悓锛屽彇娑堣繖娆″姩鐢�
      if (this.desArr[0] === this.offset) {
        this.desArr.shift();
        return;
      }
      var endCb = function endCb() {
        _this6.scrollEndTimeout && clearTimeout(_this6.scrollEndTimeout);
        _this6.offset = _this6.desArr.shift();
        if (_this6.desArr.length > 0) {
          _this6.doAnimate(_this6.speedupDuration, _this6.speedupEasing);
        } else {
          _this6.scrollEndTimeout = setTimeout(function () {
            _this6.fire(new _event2['default']('scrollend', _this6));
          }, 50);
        }
      };
      (0, _animate2['default'])({
        dom: this.conList,
        style: this.dir === 'v' ? 'top' : 'left',
        start: this.offset,
        end: this.desArr[0],
        duration: duration,
        easing: easing,
        cb: endCb
      });
    };

    /**
     *寰楀埌涓婃婊氬姩缁撴潫鍚庯紝widget涓績鐐圭浉瀵逛簬con搴旇鎵€鍦ㄧ殑浣嶇疆锛堟按骞虫垨鍨傜洿锛夈€�
     *鐢变簬婊氬姩杩囩▼涓緱鍒扮殑浣嶇疆鏄笉鍑嗙‘鐨勶紝鑰屼笖涔熶笉鏄粴鍔ㄧ粨鏉熷悗搴旇鐨勪綅缃紝鎵€浠ラ€氳繃璁剧疆鐨刼ffset鍜岀浉瀵硅窛绂绘潵璁＄畻銆�
     *widgetRect.centerY - listRect.top鏄痺idget.center鐩稿浜巆onList鐨則op鐨勮窛绂伙紝鐢变簬涓よ€呮槸鍔ㄧ敾杩囩▼涓悓鏃惰幏鍙栫殑锛屾墍浠ュ姩鐢诲鐩稿璺濈鏃犲奖鍝嶃€�
     *涓よ€呯浉鍔犲嵆婊氬姩缁撴潫鍚巜idget.center鐩稿浜巆on鐨勪綅缃€�
     **/

    Scroll.prototype._getExpectCenter = function _getExpectCenter(widget) {
      var widgetRect = widget.getWidgetRect();
      if (this.dir === 'v') {
        return this.offset + widgetRect.centerY - this.listRect.top;
      } else {
        return this.offset + widgetRect.centerX - this.listRect.left;
      }
    };

    Scroll.prototype.getListNode = function getListNode() {
      return this.conList;
    };

    Scroll.prototype.loadVisibleImage = function loadVisibleImage() {
      var conRect = this.getWidgetRect();
      var conLeft = conRect.left;
      var conTop = conRect.top;
      var conRight = conRect.right;
      var conBottom = conRect.bottom;
      var lazyImages = this.con.querySelectorAll('.fe-lazyload');

      var _loop = function (i) {
        var tempImage = lazyImages[i];
        var dataSrc = tempImage.getAttribute('fe-src');
        var rect = tempImage.getBoundingClientRect();
        // 鏈姞杞借繃锛岃€屼笖鍦╲iewport涔嬪唴锛屽姞杞藉浘鐗�
        if (tempImage.src !== dataSrc && !(rect.left <= conLeft && rect.right <= conLeft || rect.left >= conRight && rect.right >= conRight || rect.top >= conBottom && rect.bottom >= conBottom || rect.top <= conTop && rect.bottom <= conTop)) {
          var hiddenImage = new Image();
          hiddenImage.src = dataSrc;
          hiddenImage.onload = function () {
            tempImage.src = dataSrc;
          };
        }
      };

      for (var i = 0; i < lazyImages.length; i++) {
        _loop(i);
      }
    };

    Scroll.prototype.getEvents = function getEvents() {
      return _Switch.prototype.getEvents.call(this).concat(['scrollstart', 'scrollend']);
    };

    return Scroll;
  })(_switch2['default']);

  exports['default'] = Scroll;
  module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

  // const Easing = {
  //   linear(currentIteration, startValue, changeInValue, totalIterations) {
  //     return changeInValue * currentIteration / totalIterations + startValue;
  //   },
  //   // easeInOutSine
  //   ease(currentIteration, startValue, changeInValue, totalIterations) {
  //     return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
  //   },
  //   // easeOutSine
  //   ['ease-out'](currentIteration, startValue, changeInValue, totalIterations) {
  //     return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
  //   },
  //   // easeInSine
  //   ['ease-in'](currentIteration, startValue, changeInValue, totalIterations) {
  //     return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
  //   }
  // };

  // Easing functions refer to 'http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/'
  // import BezierEasing from 'bezier-easing';

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _Easing;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var Easing = (_Easing = {
    linear: function linear(t) {
      return t;
    }
  }, _defineProperty(_Easing, 'ease-in', function easeIn(t) {
    return t * t;
  }), _defineProperty(_Easing, 'ease-out', function easeOut(t) {
    return t * (2 - t);
  }), _defineProperty(_Easing, 'ease-in-out', function easeInOut(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }), _defineProperty(_Easing, 'ease', function ease(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }), _defineProperty(_Easing, 'easeInQuad', function easeInQuad(t) {
    return t * t;
  }), _defineProperty(_Easing, 'easeOutQuad', function easeOutQuad(t) {
    return t * (2 - t);
  }), _defineProperty(_Easing, 'easeInOutQuad', function easeInOutQuad(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }), _defineProperty(_Easing, 'easeInCubic', function easeInCubic(t) {
    return t * t * t;
  }), _defineProperty(_Easing, 'easeOutCubic', function easeOutCubic(t) {
    return --t * t * t + 1;
  }), _defineProperty(_Easing, 'easeInOutCubic', function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }), _defineProperty(_Easing, 'easeInQuart', function easeInQuart(t) {
    return t * t * t * t;
  }), _defineProperty(_Easing, 'easeOutQuart', function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  }), _defineProperty(_Easing, 'easeInOutQuart', function easeInOutQuart(t) {
    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  }), _defineProperty(_Easing, 'easeInQuint', function easeInQuint(t) {
    return t * t * t * t * t;
  }), _defineProperty(_Easing, 'easeOutQuint', function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  }), _defineProperty(_Easing, 'easeInOutQuint', function easeInOutQuint(t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }), _Easing);

  var aniArr = [];
  var aniInterval = null;

  /**
   * DOM鍔ㄧ敾鍑芥暟锛�
   * 鏆備粎鏀寔浠ユ暟瀛楀姞鍗曚綅涓哄€肩殑灞炴€э紝濡倀op銆亀idth绛夛紝涓嶆敮鎸乼ransform绫讳技鐨勫睘鎬с€�
   * 鏆備粎鏀寔涓€娆＄紦鍔ㄤ竴涓睘鎬с€�
   * @Param {Object} cfg 鍏蜂綋鍔ㄧ敾閰嶇疆;
   * @Param {HTMLElement} cfg.dom DOM瀵硅薄锛�
   * @Param {String} cfg.style style灞炴€э紱
   * @Param {Number} cfg.start 璧峰鍊硷紱
   * @Param {Number} cfg.end 缁撴潫鍊硷紱
   * @Param {String} [cfg.unit] 鍗曚綅锛岄粯璁x锛�
   * @Param {Number} [cfg.duration] 鎵ц鍔ㄧ敾闇€瑕佺殑鏃堕棿锛屼互绉掍负鍗曚綅锛岄粯璁�1锛�
   * @Param {Number} [cfg.delay] 鍔ㄧ敾鎵ц鍓嶇殑寤惰繜鏃堕棿锛屼互绉掍负鍗曚綅锛岄粯璁�0锛屼篃灏辨槸涓嶅欢杩燂紱
   * @Param {String} [cfg.easing] 缂撳姩鍑芥暟锛岀洰鍓嶆敮鎸侊細'ease'锛堥粯璁わ級銆�'ease-out'銆�'ease-in'銆�'linear'锛�
   * @Param {Function} [cfg.cb] 鍔ㄧ敾缁撴潫鍚庣殑鍥炶皟鍑芥暟锛�
   */
  function animate(cfg) {
    if (!(cfg && cfg.dom && cfg.style && cfg.start !== undefined && cfg.end !== undefined)) {
      throw new Error('animate鏂规硶鐨刢fg鍙傛暟锛歞om銆乻tyle銆乻tart銆乪nd蹇呴渶锛�');
    }
    var dom = cfg.dom;
    var style = cfg.style;
    var start = cfg.start;
    var end = cfg.end;
    var duration = cfg.duration !== undefined ? cfg.duration * 1000 : 1000;
    var delay = cfg.delay ? cfg.delay * 1000 : 0;
    var easing = cfg.easing || 'ease';
    var unit = cfg.unit || 'px';
    var cb = cfg.cb || null;
    var change = end - start;
    var startTime = Date.now() + delay;
    var endTime = startTime + duration;

    if (change === 0) {
      duration = 0;
    }

    aniArr.push({
      dom: dom,
      style: style,
      start: start,
      change: change,
      end: end,
      duration: duration,
      easing: easing,
      unit: unit,
      cb: cb,
      change: change,
      startTime: startTime,
      endTime: endTime
    });

    if (!aniInterval) {
      var minInterval = window.yunos ? 0 : 10;
      aniInterval = setInterval(function () {
        var now = Date.now();
        var aniLen = aniArr.length;
        var index = 0;

        var _loop = function () {
          var tempAni = aniArr[index];
          if (now < tempAni.startTime) {
            index++;
            return 'continue';
          }
          if (now < tempAni.endTime) {
            var percent = Easing[tempAni.easing]((now - tempAni.startTime) / tempAni.duration);
            tempAni.dom.style[tempAni.style] = tempAni.start + percent * tempAni.change + tempAni.unit;
            index++;
            return 'continue';
          }
          tempAni.dom.style[tempAni.style] = tempAni.end + tempAni.unit;
          setTimeout(function () {
            tempAni.cb && tempAni.cb();
          }, 0);
          aniArr.splice(index, 1);
          aniLen--;
          if (aniLen === 0) {
            clearInterval(aniInterval);
            aniInterval = null;
          }
        };

        while (index < aniLen) {
          var _ret = _loop();

          if (_ret === 'continue') continue;
        }
      }, 0);
    }
  }

  exports['default'] = animate;
  module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _widget = __webpack_require__(3);

  var _widget2 = _interopRequireDefault(_widget);

  var _event = __webpack_require__(2);

  var _event2 = _interopRequireDefault(_event);

  var _animate = __webpack_require__(6);

  var _animate2 = _interopRequireDefault(_animate);

  var Grid = (function (_Widget) {
    _inherits(Grid, _Widget);

    function Grid(container) {
      _classCallCheck(this, Grid);

      _Widget.call(this, container);
      this._init();
      this._writeGridInnerHTML();
      // 鍒濆鍖栧瓙缁勪欢
      _Widget.prototype._initChildWidgets.call(this);
      this._checkWidgets();
    }

    Grid.prototype._initChildWidgets = function _initChildWidgets() {
      return;
    };

    // 鍒ゆ柇grid鏄惁闇€瑕乺eRender姣旇緝鐗规畩锛岄渶瑕佺壒娈婂鐞�

    Grid.prototype.reRender = function reRender() {
      if (!document.querySelector('#' + this.id)) {
        return;
      }
      this.con = document.querySelector('#' + this.id);
      var firstChildWidget = this.childWidgets[0];
      var firstChildNode = this.getDOMNode().children[0];
      var needReRender = false;
      // 鍒ゆ柇绗竴涓瓙dom鏄惁杩樻槸鍘熸潵鐨刣om锛屽鏋滄槸锛屽垯鐢ㄥ師鏉ョ殑templateHTML锛屽鏋滀笉鏄紝鐢ㄦ柊鐨則emplateHTML
      if (firstChildNode !== firstChildWidget.getDOMNode()) {
        this.templateHTML = firstChildNode.outerHTML;
        needReRender = true;
      }
      // 姣旇緝fe-cfg鐨勫嚑涓睘鎬э紝濡傛灉鏈夋敼鍙橈紝鍒欓渶瑕乺eRender
      var options = this._getOptions(this.con);
      if (this.options.cfg.grid_dir !== options.cfg.grid_dir || this.options.cfg.grid_row !== options.cfg.grid_row || this.options.cfg.grid_col !== options.cfg.grid_col) {
        this.options = options;
        needReRender = true;
      }
      if (!needReRender) {
        return;
      }
      this.setCachedChildWidget(null);
      this.setFocusedChildWidget(null);
      this._init();
      this._writeGridInnerHTML();
      _Widget.prototype._initChildWidgets.call(this);
      this._checkWidgets();
      if (this.focused) {
        this.focus(true);
      }
    };

    // 璁剧疆鐢ㄦ埛閰嶇疆鍐呭骞跺垵濮嬪寲Grid

    Grid.prototype._init = function _init() {
      this.horizontal = this.options.cfg.grid_dir === 'h';
      // Grid鍒濆鍖�
      if (isNaN(this.options.cfg.grid_row) || isNaN(this.options.cfg.grid_col)) {
        throw new Error('[Focus Engine Grid Error] Grid缁勪欢蹇呴』璁剧疆琛屽拰鍒楋紒琛屽垪鏁颁负瑙嗗彛鍐呭彲瑙佺殑鏈€澶氳鍒楁暟銆�');
      }
      this.duration = this.options.cfg.grid_duration !== undefined ? parseFloat(this.options.cfg.grid_duration) : 0.3;
      this.speedupDuration = this.options.cfg.grid_speedup_duration !== undefined ? parseFloat(this.options.cfg.grid_speedup_duration) : this.duration * 0.6;
      this.easing = this.options.cfg.grid_easing ? this.options.cfg.grid_easing : 'ease';
      this.speedupEasing = this.options.cfg.grid_speedup_easing ? this.options.cfg.grid_speedup_easing : 'linear';
      this.delay = this.options.cfg.grid_delay !== undefined ? parseFloat(this.options.cfg.grid_delay) : this.duration / this.col / 1.5;
      this.row = parseInt(this.options.cfg.grid_row) + 2;
      this.col = parseInt(this.options.cfg.grid_col);
      if (this.horizontal) {
        this.row = parseInt(this.options.cfg.grid_row);
        this.col = parseInt(this.options.cfg.grid_col) + 2;
      }
      // 灞呬腑鍘熺偣鏁帮紝濡傛灉鏄�1锛屽垯姣忔閮藉眳涓榻愶紝濡傛灉鏄�2锛屽垯涓ゆ帓瀵归綈銆�
      this.originSize = this.options.cfg.grid_origin_size ? parseInt(this.options.cfg.grid_origin_size) : 1;
      // 濡傛灉鏄缃眳涓師鐐规暟锛岄偅涔堣鏁板繀椤荤瓑浜庢帓鏁帮紝寮哄埗鐩哥瓑
      if (this.originSize !== 1) {
        if (this.horizontal) {
          this.col = this.originSize + 2;
        } else {
          this.row = this.originSize + 2;
        }
      }
      // grid瀵瑰簲鐨勫垪琛ㄦ暟鎹�
      this.data = this.data || [];
      // 鍐呭鐨勬覆鏌撳櫒
      this.itemRender = this.itemRender || null;
      // 鏄惁姝ｅ湪婊氬姩涓�
      this.scrolling = false;
      this.upRow = 0;
      this.downRow = this.row - 1;
      this.lefCol = 0;
      this.rightCol = this.col - 1;
      this.origin = 0;
      // 褰撳墠widget瀵瑰簲鐨勬暟鎹�
      this.dataIndex = 0;
    };

    // 鏍规嵁绗竴涓瓙鍏冪礌鏉ュ啓grid鐨勫瓙缁勪欢html

    Grid.prototype._writeGridInnerHTML = function _writeGridInnerHTML() {
      if (!this.templateHTML) {
        var templateDOM = this.getDOMNode().children[0];
        templateDOM.id = '';
        templateDOM.setAttribute('fe-role', 'Widget');
        this.templateHTML = templateDOM.outerHTML;
        this.templateDOM = templateDOM;
      }
      var hBr = '';
      if (this.horizontal) {
        var templateStyles = getComputedStyle(this.templateDOM);
        if (templateStyles.float === 'left' || templateStyles.float === 'right') {
          hBr = '<i style="width:0;height:0;clear:both;float:' + templateStyles.float + ';"></i>';
        } else {
          hBr = '<br style="font-size:0px;"/>';
        }
      }
      var rowHtml = '';
      for (var i = 0; i < this.col; i++) {
        rowHtml += this.templateHTML;
      }
      rowHtml += hBr;
      var gridInnerHTML = '';
      for (var i = 0; i < this.row; i++) {
        gridInnerHTML += rowHtml;
      }
      if (this.horizontal) {
        gridInnerHTML = '<div style="width:99999px;height:100%;">' + gridInnerHTML + '</div>';
      }
      this.getDOMNode().innerHTML = gridInnerHTML;
    };

    // 娓叉煋骞舵鏌ュ瓙缁勪欢

    Grid.prototype._checkWidgets = function _checkWidgets() {
      var conRect = this.getWidgetRect();
      // 瀹瑰櫒鐨勯珮搴�
      this.conHeight = conRect.height;
      // 瀹瑰櫒鐨勫搴�
      this.conWidth = conRect.width;
      // grid瀛愮粍浠惰楂橈紝鍗充笂涓嬩袱涓粍浠朵腑蹇冪偣涔嬮棿鐨勭旱鍚戣窛绂�
      if (this.row > 1) {
        this.rowHeight = this.childWidgets[this.col].getWidgetRect().centerY - this.childWidgets[0].getWidgetRect().centerY;
      }
      // grid瀛愮粍浠跺垪瀹斤紝鍗冲乏鍙充袱涓粍浠朵腑蹇冪偣涔嬮棿鐨勬í鍚戣窛绂�
      this.colWidth = this.childWidgets[1].getWidgetRect().centerX - this.childWidgets[0].getWidgetRect().centerX;
      // 閫変腑鐨勭粍浠剁殑鎺掑垪浣嶇疆鏁扮粍锛屽鏋滄槸1锛岄偅涔堥兘鏄互涓績灞呬腑鎺掑垪锛屽鏋滄槸2锛屽垯涓よ鎺掑垪
      this.originArr = [];
      if (this.originSize === 1) {
        if (this.horizontal) {
          this.originArr.push(this.conWidth / 2);
        } else {
          this.originArr.push(this.conHeight / 2);
        }
      } else {
        if (this.horizontal) {
          for (var i = 0, halfWidth = this.colWidth / 2; i < this.originSize; i++) {
            this.originArr.push(halfWidth + i * this.colWidth);
          }
        } else {
          for (var i = 0, halfHeight = this.rowHeight / 2; i < this.originSize; i++) {
            this.originArr.push(halfHeight + i * this.rowHeight);
          }
        }
      }
      // 褰撳墠widget
      this.curWid = this.childWidgets[0];
      // 妫€鏌ュ瓙缁勪欢
      for (var i = 0; i < this.childWidgets.length; i++) {
        var widget = this.childWidgets[i];
        var styles = getComputedStyle(widget.getDOMNode());
        // if (styles.position === 'static') {
        //   widget.getDOMNode().style.position = 'relative';
        // } else if (styles.position !== 'relative') {
        //   throw new Error('[Focus Engine Grid Error] Grid缁勪欢鐨勫瓙缁勪欢涓嶅彲璁剧疆闄elative澶栫殑鍏跺畠瀹氫綅锛�');
        // }
        // if (styles.top !== 'auto' && parseInt(styles.top) !== 0 && !this.horizontal) {
        //   throw new Error('[Focus Engine Grid Error] Grid缁勪欢鐨勫瓙缁勪欢涓嶅彲璁剧疆top锛�');
        // }
        // if (styles.left !== 'auto' && parseInt(styles.left) !== 0 && this.horizontal) {
        //   throw new Error('[Focus Engine Grid Error] Grid缁勪欢鐨勫瓙缁勪欢涓嶅彲璁剧疆left锛�');
        // }
        // 鍒濆鏃惰widget鐨勪腑蹇冪偣璺濋《閮ㄨ窛绂�
        widget.oriOffsetCY = widget.getWidgetRect().centerY - conRect.top;
        widget.oriCenteY = widget.oriOffsetCY;
        // 鍒濆鏃惰widget鐨勪腑蹇冪偣璺濆乏渚ц窛绂�
        widget.oriOffsetCX = widget.getWidgetRect().centerX - conRect.left;
        widget.oriCenteX = widget.oriOffsetCX;
        // 璁板綍璇ョ粍浠跺浜庣鍑犺
        widget.row = Math.floor(i / this.col);
        // 璁板綍璇ョ粍浠跺浜庣鍑犲垪
        widget.col = i % this.col;
        // 绾綍褰撳墠offset
        widget.offset = 0;
        widget.animationArr = [];
        widget.isEmpty = true;
        // 鐩稿浜庡綋鍓嶄腑鐨勫瓙缁勪欢锛岀粍浠剁殑琛屾暟锛岃礋浠ｈ〃鍦ㄤ笂鏂癸紝姝ｄ唬琛ㄥ湪涓嬫柟
        widget.offsetRow = widget.row;
        // 鐩稿浜庡綋鍓嶄腑鐨勫瓙缁勪欢锛岀粍浠剁殑鍒楁暟锛岃礋浠ｈ〃鍦ㄥ乏渚э紝姝ｄ唬琛ㄥ湪鍙充晶
        widget.offsetCol = widget.col;
        widget.whichData = i;
      }
    };

    Grid.prototype.keydownDefault = function keydownDefault(e) {
      if (this.stopSwitch) {
        e.preventDefault();
        return;
      }
      if (e.isDefaultPrevented()) {
        return;
      }
      var nexIndex = this._getNextDataIndex(e.keyCode);
      if (nexIndex !== -1) {
        e.preventDefault();
        var nexFocWid = null;
        if (this.horizontal) {
          nexFocWid = this.childWidgets[Math.floor(nexIndex / this.row) % this.col + nexIndex % this.row * this.col];
        } else {
          nexFocWid = this.childWidgets[Math.floor(nexIndex / this.col) % this.row * this.col + nexIndex % this.col];
        }
        nexFocWid.focus();
      }
    };

    Grid.prototype._getNextDataIndex = function _getNextDataIndex(keyCode) {
      var nexIndex = this.dataIndex;
      // 鍚戝乏
      if (keyCode === _event2['default'].VK_LEFT) {
        if (!this.horizontal && nexIndex % this.col !== 0) {
          return --nexIndex;
        }
        if (this.horizontal && nexIndex >= this.row) {
          return nexIndex -= this.row;
        }
        return -1;
      }
      if (keyCode === _event2['default'].VK_RIGHT) {
        if (!this.horizontal && nexIndex % this.col !== this.col - 1 && nexIndex + 1 < this.data.length) {
          return ++nexIndex;
        }
        if (this.horizontal && nexIndex + this.row < this.data.length) {
          return nexIndex += this.row;
        }
        if (this.horizontal && nexIndex + this.row >= this.data.length && Math.floor(nexIndex / this.row) < Math.floor((this.data.length - 1) / this.row)) {
          return this.data.length - 1;
        }
        if (this.horizontal) {
          this.fire(new _event2['default']('reachend', this));
        }
        return -1;
      }
      if (keyCode === _event2['default'].VK_UP) {
        if (!this.horizontal && nexIndex >= this.col) {
          return nexIndex -= this.col;
        }
        if (this.horizontal && nexIndex % this.row !== 0) {
          return --nexIndex;
        }
        return -1;
      }
      if (keyCode === _event2['default'].VK_DOWN) {
        if (!this.horizontal && nexIndex + this.col < this.data.length) {
          return nexIndex += this.col;
        }
        if (!this.horizontal && nexIndex + this.col >= this.data.length && Math.floor(nexIndex / this.col) < Math.floor((this.data.length - 1) / this.col)) {
          return this.data.length - 1;
        }
        if (this.horizontal && nexIndex % this.row !== this.row - 1 && nexIndex + 1 < this.data.length) {
          return ++nexIndex;
        }
        if (!this.horizontal) {
          this.fire(new _event2['default']('reachend', this));
        }
        return -1;
      }
      return -1;
    };

    Grid.prototype.focusDefault = function focusDefault(e) {
      _Widget.prototype.focusDefault.call(this, e);
      // 濡傛灉鏄痵etData璋冪敤锛岄偅涔堝彧闇€瑕佹洿鏀筬ocus鐘舵€侊紝鏃犻渶绉诲姩
      if (this.isSetData) {
        return;
      }
      // focus鏃剁洃娴嬩竴娆″鍣ㄥ楂橈紝濡傛灉閮芥槸0锛岃鏄巉ocus鍓嶆槸display:none锛岄渶瑕侀噸鏂癬checkWidgets
      if (!this.conHeight && !this.conWidth) {
        this._checkWidgets();
      }
      var nexWid = this.getFocusedChildWidget();
      this.dataIndex = nexWid.whichData;
      this.curWid = nexWid;
      // 妯悜Grid濡傛灉涓婁笅鍒囨崲锛屽垯涓嶆粴鍔�
      if (this.horizontal && nexWid.offsetCol === 0) {
        return;
      }
      // 绾靛悜Grid濡傛灉宸﹀彸鍒囨崲锛屽垯涓嶆粴鍔�
      if (!this.horizontal && nexWid.offsetRow === 0) {
        return;
      }
      this._computeGridStatus(nexWid);
      this._computeAllWidgetStatus(nexWid);
    };

    // 鏍规嵁鐒︾偣widget璁＄畻绾靛悜Grid婊氬姩鐨勪竴浜涚姸鎬�
    // curWid锛氬綋鍓嶇劍鐐瑰瓙缁勪欢

    Grid.prototype._computeGridStatus = function _computeGridStatus(curWid) {
      if (this.horizontal) {
        this._computeGridStatus_h(curWid);
      } else {
        this._computeGridStatus_v(curWid);
      }
    };

    // 鏍规嵁鐒︾偣widget璁＄畻绾靛悜Grid婊氬姩鐨勪竴浜涚姸鎬侊細
    // 1. 鏄悜涓婅繕鏄悜涓嬫粴鍔紱2. 婊氬姩缁撴潫鍚庝笂涓嬪悇鏈夊灏戣锛�3. 鐒︾偣缁勪欢鐨勪綅缃�

    Grid.prototype._computeGridStatus_v = function _computeGridStatus_v(curWid) {
      // 濡傛灉鏄痵etData璋冪敤锛岄偅涔堜竴浜涘睘鎬т笉闇€瑕佸啀娆¤绠�
      if (!this.isSetData) {
        // 纭畾鏄悜涓婅繕鏄悜涓嬫粴鍔�
        this.isUp = curWid.offsetRow < 0;
        // 纭畾涓嬫focus瀛愮粍浠剁殑origin
        if (this.isUp && this.origin > 0) {
          this.origin--;
        } else if (!this.isUp && this.origin < this.originArr.length - 1) {
          this.origin++;
        }
      }

      // 閫変腑鐨勭粍浠剁殑涓績鐐瑰簲鍦ㄧ殑浣嶇疆
      this.focsedCY = this.originArr[this.origin];
      // 纭畾婊氬姩缁撴潫鍚庡綋鍓嶉€変腑鐨勮涓婁笅鍚勫簲璇ユ湁澶氬皯琛�
      // 娌℃湁璁剧疆originSize鐨勬儏鍐�
      if (this.originSize === 1) {
        this.upRow = Math.floor(this.row / 2);
        this.downRow = Math.floor(this.row / 2);
        var curDataRow = Math.floor(this.dataIndex / this.col);
        var lastDataRow = Math.floor((this.data.length - 1) / this.col);
        var tempFocsedCY = this.focsedCY;
        // 鍒拌揪搴曢儴鐨勬儏鍐�
        var downOffset = (lastDataRow - curDataRow) * this.rowHeight + this.rowHeight / 2;
        if (downOffset < tempFocsedCY) {
          this.focsedCY = this.conHeight - downOffset;
          this.downRow = lastDataRow - curDataRow;
          this.upRow = this.row - 1 - this.downRow;
        }
        // 鍒拌揪椤堕儴鐨勬儏鍐碉紝濡傛灉鍚屾椂鍒拌揪椤堕儴鍜屽簳閮紝鍒欐寜椤堕儴绠�
        var upOffset = curDataRow * this.rowHeight + this.rowHeight / 2;
        var listHeight = (lastDataRow + 1) * this.rowHeight;
        if (upOffset < tempFocsedCY || listHeight < this.conHeight) {
          this.focsedCY = upOffset;
          this.upRow = curDataRow;
          this.downRow = this.row - 1 - this.upRow;
          return;
        }
        // 璁剧疆originSize鐨勬儏鍐�
      } else {
          this.upRow = this.origin + 1;
          this.downRow = this.originSize - this.origin;
          // 鍒拌揪椤堕儴鐨勬儏鍐�
          if (Math.floor(this.dataIndex / this.col) === 0) {
            this.upRow = 0;
            this.downRow = this.row - 1;
            return;
          }
          // 鍒拌揪搴曢儴鐨勬儏鍐�
          if (Math.floor(this.dataIndex / this.col) === Math.floor((this.data.length - 1) / this.col)) {
            this.upRow = this.row - 1;
            this.downRow = 0;
          }
        }
    };

    // 鏍规嵁鐒︾偣widget璁＄畻妯悜Grid婊氬姩鐨勪竴浜涚姸鎬侊細
    // 1. 鏄悜宸﹁繕鏄悜鍙虫粴鍔紱2. 婊氬姩缁撴潫鍚庡乏鍙冲悇鏈夊灏戝垪锛�3. 鐒︾偣缁勪欢鐨勪綅缃�

    Grid.prototype._computeGridStatus_h = function _computeGridStatus_h(curWid) {
      // 濡傛灉鏄痵etData璋冪敤锛岄偅涔堜竴浜涘睘鎬т笉闇€瑕佸啀娆¤绠�
      if (!this.isSetData) {
        // 纭畾鏄悜涓婅繕鏄悜涓嬫粴鍔�
        this.isLeft = curWid.offsetCol < 0;
        // 纭畾涓嬫focus瀛愮粍浠剁殑origin
        if (this.isLeft && this.origin > 0) {
          this.origin--;
        } else if (!this.isLeft && this.origin < this.originArr.length - 1) {
          this.origin++;
        }
      }

      // 閫変腑鐨勭粍浠剁殑涓績鐐瑰簲鍦ㄧ殑浣嶇疆
      this.focsedCX = this.originArr[this.origin];
      // 纭畾婊氬姩缁撴潫鍚庡綋鍓嶉€変腑鐨勮宸﹀彸鍚勫簲璇ユ湁澶氬皯鍒�
      // 娌℃湁璁剧疆originSize鐨勬儏鍐�
      if (this.originSize === 1) {
        this.leftCol = Math.floor(this.col / 2);
        this.rightCol = Math.floor(this.col / 2);
        var curDataCol = Math.floor(this.dataIndex / this.row);
        var lastDataCol = Math.floor((this.data.length - 1) / this.row);
        var tempFocsedCX = this.focsedCX;
        // 鍒拌揪鍙抽儴鐨勬儏鍐�
        var rightOffset = (lastDataCol - curDataCol) * this.colWidth + this.colWidth / 2;
        if (rightOffset < tempFocsedCX) {
          this.focsedCX = this.conWidth - rightOffset;
          this.rightCol = lastDataCol - curDataCol;
          this.leftCol = this.col - 1 - this.rightCol;
        }
        // 鍒拌揪宸﹂儴鐨勬儏鍐碉紝濡傛灉鍚屾椂鍒拌揪宸﹂儴鍜屽彸閮紝鍒欐寜宸﹂儴绠�
        var leftOffset = curDataCol * this.colWidth + this.colWidth / 2;
        var listWidth = (lastDataCol + 1) * this.colWidth;
        if (leftOffset < tempFocsedCX || listWidth < this.conWidth) {
          this.focsedCX = leftOffset;
          this.leftCol = curDataCol;
          this.rightCol = this.col - 1 - this.leftCol;
          return;
        }
        // 璁剧疆originSize鐨勬儏鍐�
      } else {
          this.leftCol = this.origin + 1;
          this.rightCol = this.originSize - this.origin;
          // 鍒拌揪宸﹂儴鐨勬儏鍐�
          if (this.dataIndex < this.row) {
            this.leftCol = 0;
            this.rightCol = this.col - 1;
            return;
          }
          // 鍒拌揪鍙抽儴鐨勬儏鍐�
          if (Math.floor(this.dataIndex / this.row) === Math.floor((this.data.length - 1) / this.row)) {
            this.leftCol = this.col - 1;
            this.rightCol = 0;
          }
        }
    };

    // 鏍规嵁Grid鐨勭姸鎬佽绠楁瘡涓獁idget鑷韩鐨勭姸鎬�
    // curWid锛氬綋鍓嶇劍鐐瑰瓙缁勪欢

    Grid.prototype._computeAllWidgetStatus = function _computeAllWidgetStatus(curWid) {
      if (this.horizontal) {
        this._computeAllWidgetStatus_h(curWid);
      } else {
        this._computeAllWidgetStatus_v(curWid);
      }
    };

    // 绾靛悜Grid浣跨敤

    Grid.prototype._computeAllWidgetStatus_v = function _computeAllWidgetStatus_v(curWid) {
      var curWidRow = curWid.row;
      var curDataRow = Math.floor(this.dataIndex / this.col);
      this._computeRowWidgetStatus(curWidRow, curDataRow, 0);
      for (var i = -1; i >= -this.upRow; i--) {
        this._computeRowWidgetStatus(curWidRow, curDataRow, i);
      }
      for (var i = 1; i <= this.downRow; i++) {
        this._computeRowWidgetStatus(curWidRow, curDataRow, i);
      }
    };

    // 妯悜Grid浣跨敤

    Grid.prototype._computeAllWidgetStatus_h = function _computeAllWidgetStatus_h(curWid) {
      var curWidCol = curWid.col;
      var curDataCol = Math.floor(this.dataIndex / this.row);
      this._computeColWidgetStatus(curWidCol, curDataCol, 0);
      for (var i = -1; i >= -this.leftCol; i--) {
        this._computeColWidgetStatus(curWidCol, curDataCol, i);
      }
      for (var i = 1; i <= this.rightCol; i++) {
        this._computeColWidgetStatus(curWidCol, curDataCol, i);
      }
    };

    // 璁剧疆鏌愯widget鐨勭姸鎬侊紝绾靛悜Grid浣跨敤
    // 濡傦細鍔ㄧ敾銆佷綅缃€亀hichData绛�

    Grid.prototype._computeRowWidgetStatus = function _computeRowWidgetStatus(curWidRow, curDataRow, offsetRow) {
      var widRow = (curWidRow + offsetRow + this.row) % this.row;
      var dataRow = curDataRow + offsetRow;
      for (var i = 0; i < this.col; i++) {
        var widget = this.childWidgets[this.col * widRow + i];
        var whichData = this.col * dataRow + i;
        var visibilityAfterAnimation = 'visible';
        if (whichData >= this.data.length || whichData < 0) {
          visibilityAfterAnimation = 'hidden';
        }
        widget.whichData = whichData;
        widget.whichDataRow = dataRow;
        if (this.isSetData) {
          widget.offset = this.focsedCY + offsetRow * this.rowHeight - widget.oriCenteY;
          widget.getDOMNode().style.top = widget.offset + 'px';
          widget.getDOMNode().style.visibility = visibilityAfterAnimation;
          widget.offsetRow = offsetRow;
        } else {
          var delayCount = i;
          if (this.isUp) {
            delayCount = this.col - delayCount - 1;
          }
          var nexOffset = this.focsedCY + offsetRow * this.rowHeight - widget.oriCenteY;
          widget.futureOffset = nexOffset;
          widget.animationArr.push({
            offset: nexOffset,
            duration: this.duration,
            jump: widget.offsetRow * offsetRow < 0,
            visibility: visibilityAfterAnimation
          });
          this.triggerWidgetAnimation(widget, delayCount * this.delay);
          widget.offsetRow = offsetRow;
        }
      }
    };

    // 璁剧疆鏌愯widget鐨勭姸鎬侊紝妯悜Grid浣跨敤
    // 濡傦細鍔ㄧ敾銆佷綅缃€亀hichData绛�

    Grid.prototype._computeColWidgetStatus = function _computeColWidgetStatus(curWidCol, curDataCol, offsetCol) {
      var widCol = (curWidCol + offsetCol + this.col) % this.col;
      var dataCol = curDataCol + offsetCol;
      for (var i = 0; i < this.row; i++) {
        var widget = this.childWidgets[widCol + i * this.col];
        var whichData = dataCol * this.row + i;
        var visibilityAfterAnimation = 'visible';
        if (whichData >= this.data.length || whichData < 0) {
          visibilityAfterAnimation = 'hidden';
        }
        widget.whichData = whichData;
        widget.whichDataCol = dataCol;
        if (this.isSetData) {
          widget.offset = this.focsedCX + offsetCol * this.colWidth - widget.oriCenteX;
          widget.getDOMNode().style.left = widget.offset + 'px';
          widget.getDOMNode().style.visibility = visibilityAfterAnimation;
          widget.offsetCol = offsetCol;
        } else {
          var delayCount = i;
          if (this.isLeft) {
            delayCount = this.row - delayCount - 1;
          }
          var nexOffset = this.focsedCX + offsetCol * this.colWidth - widget.oriCenteX;
          widget.futureOffset = nexOffset;
          widget.animationArr.push({
            offset: nexOffset,
            duration: this.duration,
            jump: widget.offsetCol * offsetCol < 0,
            visibility: visibilityAfterAnimation
          });
          this.triggerWidgetAnimation(widget, delayCount * this.delay);
          widget.offsetCol = offsetCol;
        }
      }
    };

    // 濡傛灉鏄繕鏈紑濮嬪姩鐢伙紝璁＄畻鍔ㄧ敾寤惰繜涓旇Е鍙戝姩鐢�

    Grid.prototype.triggerWidgetAnimation = function triggerWidgetAnimation(widget, delay) {
      if (!this.scrolling) {
        this.scrolling = true;
        this.fire(new _event2['default']('scrollstart', this));
      }
      if (widget.animationArr.length === 1) {
        this.startScroll(widget, delay);
      }
    };

    Grid.prototype.startScroll = function startScroll(widget, delay, speedup) {
      var _this = this;

      var endCb = function endCb() {
        _this.scrollEndTimeout && clearTimeout(_this.scrollEndTimeout);
        var preAnimation = widget.animationArr.shift();
        widget.offset = preAnimation.offset;
        widget.getDOMNode().style.visibility = preAnimation.visibility;
        if (widget.animationArr.length > 0) {
          _this.startScroll(widget, 0, true);
        } else {
          _this.scrollEndTimeout = setTimeout(function () {
            if (_this.scrolling) {
              _this.scrolling = false;
              _this.fire(new _event2['default']('scrollend', _this));
            }
          }, 100);
        }
      };
      this.stopSwitch = widget.animationArr.length >= parseInt((this.horizontal ? this.col : this.row) / 2);
      var animation = widget.animationArr[0];
      if (animation.jump) {
        if (!widget.isEmpty) {
          this.itemRender(widget.getDOMNode());
          widget.isEmpty = true;
        }
      }
      var duration = animation.duration;
      var easing = this.easing;
      if (speedup) {
        easing = this.speedupEasing;
        if (duration !== 0) {
          duration = this.speedupDuration;
        }
      }
      (0, _animate2['default'])({
        dom: widget.getDOMNode(),
        style: this.horizontal ? 'left' : 'top',
        start: animation.jump ? animation.offset : widget.offset,
        end: animation.offset,
        duration: duration,
        delay: delay,
        easing: easing,
        cb: endCb
      });
    };

    Grid.prototype.scrollendDefault = function scrollendDefault(e) {
      var _this2 = this;

      if (e.isDefaultPrevented()) {
        return;
      }
      if (this.scrolling) {
        return;
      }
      this.loadContentTimeout && clearTimeout(this.loadContentTimeout);
      this.loadContentTimeout = setTimeout(function () {
        _this2.loadContent();
      }, 100);
    };

    Grid.prototype.scrollstartDefault = function scrollstartDefault(e) {
      if (e.isDefaultPrevented()) {
        return;
      }
      this.loadContentTimeout && clearTimeout(this.loadContentTimeout);
      // Blitz鍐呮牳鎻愪緵鐨勭姝㈠浘鐗囧姞杞界殑鏂规硶锛屼紭鍖栧姩鐢�
      window.stopImgLoading && window.stopImgLoading();
    };

    Grid.prototype.setItemRender = function setItemRender(fun) {
      this.itemRender = fun;
    };

    Grid.prototype.addData = function addData(data) {
      if (!Array.isArray(data)) {
        return;
      }
      var newData = this.data.concat(data);
      var dataIndex = this.focused ? this.getFocusedChildWidget().whichData : this.dataIndex;
      this.setData(newData, dataIndex, this.origin);
    };

    Grid.prototype.setData = function setData(data, index, origin) {
      if (Array.isArray(data)) {
        this.data = data.concat([]);
      }
      if (this.horizontal) {
        this.allDataCol = Math.floor(this.data.length / this.row);
      } else {
        this.allDataRow = Math.floor(this.data.length / this.col);
      }
      if (index !== undefined && index < this.data.length) {
        this.dataIndex = index;
      } else {
        this.dataIndex = 0;
      }
      if (origin !== undefined && origin < this.originSize) {
        this.origin = origin;
      } else {
        this.origin = Math.floor(this.dataIndex / this.col);
        if (this.origin >= this.originSize) {
          this.origin = this.originSize - 1;
        }
      }
      var nexWid = this.childWidgets[Math.floor(this.dataIndex / this.col) % this.row * this.col + this.dataIndex % this.col];
      this.isSetData = true;
      this._computeGridStatus(nexWid);
      this._computeAllWidgetStatus(nexWid);
      nexWid.dataIndex = this.dataIndex;
      if (this.focused) {
        nexWid.focus(true, true);
      } else {
        nexWid.cache();
      }
      this.curWid = nexWid;
      this.loadContent();
      this.isSetData = false;
    };

    // 鍔犺浇鍐呭锛宼est琛ㄧず鏄惁鏄彧灏濊瘯鍔犺浇锛屽鏋滄槸锛屽彧鏄洿鏀圭姸鎬佷絾涓嶄細鐪熸鍔犺浇鍐呭

    Grid.prototype.loadContent = function loadContent() {
      for (var i = 0, _length = this.childWidgets.length; i < _length; i++) {
        var widget = this.childWidgets[i];
        // 濡傛灉鏄痵etData璋冪敤锛岄偅涔堥渶瑕佸己鍒堕噸鏂版覆鏌搃tem
        if (widget.isEmpty || this.isSetData) {
          var item = this.data[widget.whichData];
          this.itemRender && this.itemRender(widget.getDOMNode(), item);
          widget.isEmpty = false;
        }
      }
      // Blitz鍐呮牳鎻愪緵鐨勬仮澶嶅浘鐗囧姞杞界殑鏂规硶
      window.resumeImgLoading && window.resumeImgLoading();
      this.fire(new _event2['default']('contentloaded', this));
    };

    Grid.prototype.getEvents = function getEvents() {
      return _Widget.prototype.getEvents.call(this).concat(['reachend', 'contentloaded']);
    };

    return Grid;
  })(_widget2['default']);

  exports['default'] = Grid;
  module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _engine = __webpack_require__(1);

  var _engine2 = _interopRequireDefault(_engine);

  var _widget = __webpack_require__(3);

  var _widget2 = _interopRequireDefault(_widget);

  var _event = __webpack_require__(2);

  var _event2 = _interopRequireDefault(_event);

  var _animate = __webpack_require__(6);

  var _animate2 = _interopRequireDefault(_animate);

  // TODO:琛ュ厖娉ㄩ噴

  var Grille = (function (_Widget) {
    _inherits(Grille, _Widget);

    function Grille(container) {
      _classCallCheck(this, Grille);

      _Widget.call(this, container);
      this._init();
    }

    Grille.prototype._init = function _init() {
      var _this = this;

      // this.horizontal = this.options.cfg.grille_dir === 'h';
      // 鍒涘缓鍐呴儴鐨刲ist
      this.listDom = document.createElement('div');
      this.listDom.style.position = 'relative';
      this.listDom.style.width = '100%';
      this.con.innerHTML = '';
      this.con.appendChild(this.listDom);
      this.duration = this.options.cfg.duration !== undefined ? parseFloat(this.options.cfg.duration) : 0.3;
      this.delay = this.options.cfg.delay !== undefined ? parseFloat(this.options.cfg.delay) : 0.1;
      this.easing = this.options.cfg.easing ? this.options.cfg.easing : 'ease-out';
      this.bottomPadding = this.options.cfg.bottom_padding !== undefined ? parseFloat(this.options.cfg.bottom_padding) : 0;
      this.visibleRow = this.options.cfg.visible_row !== undefined ? parseInt(this.options.cfg.visible_row) : 5;
      this.listDom.style.transition = 'transform ' + this.duration + 's ' + this.easing;
      this.listDom.addEventListener('transitionend', function (e) {
        if (e.target === _this.listDom) {
          _this.fire(new _event2['default']('scrollend', _this));
        }
      });
      this.getWidgetRect();
      this.align = this.rect.height / 2;
      this.offset = 0;
      this._reset();
    };

    Grille.prototype._reset = function _reset() {
      // 璁板綍鏈€鍚庝竴涓猧tem鏄鍑犺绗嚑鍒�
      this.lastWidgetRow = 0;
      this.lastWidgetCol = 0;
      this.lastWidgetCenter = 0;
      this.listHeight = 0;
      // 鐢ㄤ簩缁存暟缁勮褰曞瓙widget锛屼究浜庢煡鎵�
      this.childrenArr = [];
      // 鍙褰曞瓙Widget
      this.childWidgets = [];
      // 璁板綍鎵€鏈夌被鍨嬬殑瀛愪唬
      this.childItems = [];
      this.focusPos = {
        row: 0,
        col: 0
      };
    };

    Grille.prototype.setData = function setData(data, index) {
      var _this2 = this;

      this.isSetData = true;
      if (this.childItems.length == 0) {
        this.listDom.innerHTML = '';
        this._reset();
        this.dataIndex = index !== undefined ? index : 0;
        this.data = [].concat(data);
        this._renderChildren();
        return;
      }
      var transitionEndSetted = false;
      for (var i = 0; i < this.childItems.length; i++) {
        var item = this.childItems[i];
        if (item.con && item.visible) {
          item.con.style.transform = 'scale3d(0.3,0.3,0.3)';
          if (!transitionEndSetted) {
            transitionEndSetted = true;
            item.con.addEventListener('transitionend', function (e) {
              _this2.listDom.innerHTML = '';
              _this2._reset();
              _this2.dataIndex = index !== undefined ? index : 0;
              _this2.data = [].concat(data);
              _this2._renderChildren();
            });
          }
        }
      }
    };

    Grille.prototype.addData = function addData(data) {
      this.data = this.data.concat(data);
      this._renderChildren();
    };

    Grille.prototype.setItemRender = function setItemRender(itemRender) {
      this.itemRender = itemRender;
    };

    Grille.prototype._renderChildren = function _renderChildren() {
      var _this3 = this;

      // renderChildren鏃堕渶瑕佸悓鏃舵湁data涓旀湁itemRender
      if (!this.data || !this.itemRender) {
        return;
      }
      this.isSetData && (this.listDom.style.visibility = 'hidden');

      var _loop = function (i) {
        var tempData = _this3.data[i];
        var dom = _this3.itemRender(tempData);
        // 濡傛灉render杩斿洖鐨勬槸string锛岄偅涔堝皢string parse鎴恉om瀵硅薄
        if (typeof dom === 'string') {
          var tmp = document.createElement('div');
          tmp.innerHTML = dom;
          if (tmp.children.length > 1) {
            throw new Error('[Focus Engine Grille Error] Grille缁勪欢鐨刬temRender杩斿洖鐨勫瓧绗︿覆蹇呴』鏄彲瑙ｆ瀽鎴愪竴涓猟om瀵硅薄銆�');
          }
          dom = tmp.children[0];
        }
        var lazyDom = dom.querySelector('.grille-lazyload');
        lazyDom && dom.removeChild(lazyDom);
        _this3.listDom.appendChild(dom);
        if (!dom.getAttribute('fe-role')) {
          _this3.childItems.push(dom);
          return 'continue';
        }
        var widget = _engine2['default'].createWidget(dom);
        _this3.addChildWidget(widget);
        _this3.childItems.push(widget);
        widget.data = tempData;
        widget.index = i;
        widget.lazyDom = lazyDom;
        widget.getWidgetRectAsync(function (widgetRect) {
          // 璁＄畻姝ｅ父鎯呭喌涓嬶紝璇idget鑾峰彇鐒︾偣鏃舵暣涓垪琛ㄧ殑鍋忕Щ閲�
          // 鍒濆鎯呭喌涓嬶紝缁勪欢涓績鐐硅窛绂诲鍣╰op鐨勮窛绂�
          widget.oriOffset = widgetRect.centerY - _this3.rect.top - _this3.offset;
          if (_this3.listHeight < widgetRect.bottom - _this3.rect.top - _this3.offset + _this3.bottomPadding) {
            _this3.listHeight = widgetRect.bottom - _this3.rect.top - _this3.offset + _this3.bottomPadding;
          }
          if (!_this3.lastWidgetCenter) {
            // 绗竴涓獁idget鏃�
            widget.row = _this3.lastWidgetRow;
            widget.col = _this3.lastWidgetCol;
            _this3.lastWidgetCenter = widgetRect.centerY;
            _this3.childrenArr[_this3.lastWidgetRow] = [widget];
          } else if (widgetRect.centerY - _this3.offset === _this3.lastWidgetCenter) {
            // 鍚屼竴琛岀殑鎯呭喌
            widget.row = _this3.lastWidgetRow;
            _this3.lastWidgetCol++;
            widget.col = _this3.lastWidgetCol;
            _this3.childrenArr[_this3.lastWidgetRow].push(widget);
          } else if (widgetRect.centerY - _this3.offset > _this3.lastWidgetCenter) {
            // 鎹㈣鐨勬儏鍐�
            _this3.lastWidgetRow++;
            widget.row = _this3.lastWidgetRow;
            _this3.lastWidgetCol = 0;
            widget.col = _this3.lastWidgetCol;
            _this3.lastWidgetCenter = widgetRect.centerY - _this3.offset;
            _this3.childrenArr[_this3.lastWidgetRow] = [widget];
          }
          if (widget.row <= _this3.visibleRow) {
            widget.visible = true;
            widget.con.style.transition = 'transform ' + _this3.duration * 0.8 + 's ' + _this3.easing;
          }
          if (i === _this3.data.length - 1) {
            _this3.focused && _this3.childItems[_this3.dataIndex].focus();
            if (_this3.isSetData) {
              setTimeout(function () {
                _this3.listDom.style.visibility = 'visible';
                var setWidget = _this3.childItems[_this3.dataIndex];
                _this3.loadContent();
                _this3._doScroll(setWidget);
                _this3.setCachedChildWidget(setWidget);
              }, 100);
            }
          }
        });
      };

      for (var i = this.childItems.length; i < this.data.length; i++) {
        var _ret = _loop(i);

        if (_ret === 'continue') continue;
      }
    };

    Grille.prototype.focusDefault = function focusDefault(e) {
      _Widget.prototype.focusDefault.call(this, e);
      if (e.target === this) {
        return;
      }
      if (this.isSetData) {
        return;
      }
      this.dataIndex = e.target.index;
      this._doScroll(e.target);
    };

    Grille.prototype._doScroll = function _doScroll(curWidget) {
      var _this4 = this;

      this.focusPos.row = curWidget.row;
      this.focusPos.col = curWidget.col;
      // 濡傛灉鍒楄〃楂樺害灏忎簬瀹瑰櫒楂樺害锛屼笉婊氬姩
      if (this.listHeight < this.rect.height) {
        return;
      }
      var offset = this.align - curWidget.oriOffset;
      // 鍒拌揪椤堕儴鐨勬儏鍐�
      if (offset > 0) {
        offset = 0;
      }
      // 鍒拌揪搴曢儴鐨勬儏鍐�
      if (this.listHeight - curWidget.oriOffset < this.rect.height - this.align) {
        offset = this.rect.height - this.listHeight;
      }
      // 閰嶇疆浣嶇疆鐨勬儏鍐�
      if (curWidget.data.align !== undefined) {
        offset = this.align - curWidget.oriOffset;
      }
      // 濡傛灉鍚屼竴琛岋紝涓嶆粴鍔�
      if (this.offset === offset && !this.isSetData) {
        return;
      }
      if (this.isSetData) {
        this.listDom.style.transition = '';
        this.listDom.style.transform = 'translateY(' + (offset + this.rect.height) + 'px)';
        this.offset = offset + this.rect.height;
        setTimeout(function () {
          _this4.listDom.style.transition = 'transform ' + _this4.duration + 's ' + _this4.easing;
          _this4.listDom.style.transform = 'translateY(' + offset + 'px)';
          var des = -_this4.rect.height / 3;
          _this4.offset = offset;
          !_this4.isScrolling && _this4.fire(new _event2['default']('scrollstart', _this4, { des: des }));
          _this4.isSetData = false;
        }, 10);
      } else {
        this.listDom.style.transition = 'transform ' + this.duration + 's ' + this.easing;
        this.listDom.style.transform = 'translateY(' + offset + 'px)';
        var des = offset - this.offset;
        this.offset = offset;
        !this.isScrolling && this.fire(new _event2['default']('scrollstart', this, { des: des }));
      }
    };

    Grille.prototype.keydownDefault = function keydownDefault(e) {
      var curRow = this.focusPos.row;
      var curCol = this.focusPos.col;
      if (e.keyCode === _event2['default'].VK_UP && curRow > 0) {
        curRow--;
        if (curCol >= this.childrenArr[curRow].length) {
          curCol = this.childrenArr[curRow].length - 1;
        }
        e.preventDefault();
      }
      if (e.keyCode === _event2['default'].VK_DOWN && curRow < this.lastWidgetRow) {
        curRow++;
        if (curCol >= this.childrenArr[curRow].length) {
          curCol = this.childrenArr[curRow].length - 1;
        }
        e.preventDefault();
      }
      if (e.keyCode === _event2['default'].VK_LEFT && curCol > 0) {
        curCol--;
        e.preventDefault();
      }
      if (e.keyCode === _event2['default'].VK_RIGHT && curCol < this.childrenArr[curRow].length - 1) {
        curCol++;
        e.preventDefault();
      }
      if (curRow === this.focusPos.row && curCol === this.focusPos.col) {
        return;
      } else {
        this.focusPos.row = curRow;
        this.focusPos.col = curCol;
        var tempWidget = this.childrenArr[curRow][curCol];
        tempWidget.focus();
      }
    };

    Grille.prototype.scrollstartDefault = function scrollstartDefault(e) {
      this.isScrolling = true;
      clearTimeout(this.loadContentTimeout);
      var curWidget = this.childItems[this.dataIndex];
      for (var i = 0; i < this.childWidgets.length; i++) {
        var widget = this.childWidgets[i];
        var delay = -Math.abs(widget.col - curWidget.col) * e.des * this.delay;
        widget.con.style.transform = 'translateY(' + delay + 'px)';
      }
    };

    Grille.prototype.scrollendDefault = function scrollendDefault(e) {
      var _this5 = this;

      this.isScrolling = false;
      var curWidget = this.childItems[this.dataIndex];
      for (var i = 0; i < this.childWidgets.length; i++) {
        var widget = this.childWidgets[i];
        var loadRowMax = Math.floor(this.visibleRow / 2);
        if (Math.abs(widget.row - curWidget.row) <= loadRowMax) {
          widget.con.style.transition = 'transform ' + this.duration * 0.8 + 's ' + this.easing;
          widget.visible = true;
        } else if (widget.visible) {
          widget.con.style.transition = '';
          widget.visible = false;
        }
        widget.con.style.transform = '';
      }
      this.loadContentTimeout = setTimeout(function () {
        _this5.loadContent();
      }, 500);
    };

    Grille.prototype.loadContent = function loadContent() {
      for (var i = 0; i < this.childWidgets.length; i++) {
        var widget = this.childWidgets[i];
        if (widget.lazyDom && widget.visible && !widget.lazyLoaded) {
          widget.con.appendChild(widget.lazyDom);
          widget.lazyLoaded = true;
        } else if (widget.lazyDom && !widget.visible && widget.lazyLoaded) {
          widget.con.removeChild(widget.lazyDom);
          widget.lazyLoaded = false;
        }
      }
      this.fire(new _event2['default']('contentloaded', this));
    };

    Grille.prototype.getEvents = function getEvents() {
      return _Widget.prototype.getEvents.call(this).concat(['scrollstart', 'scrollend', 'contentloaded']);
    };

    return Grille;
  })(_widget2['default']);

  exports['default'] = Grille;
  module.exports = exports['default'];

/***/ }
/******/ ]);
