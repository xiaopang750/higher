/*
 * Moye 0.0.2 <Fri Aug 26 2016 15:44:17 GMT+0800 (CST)>
 * Moye 应用框架设计宗旨是告诉开发者如何在 cyclone 系统上开发应用,包括规范应用生 命周期,支持多语言以及开发 Service 服务等。
 * xuanyong (yujie.pyj@alibaba-inc.com) - http://tv.alibaba.net/_site/index.html
 *
 * Copyright 2016, Alibaba Group
 * Released under the MIT license.
*/

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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _moyeUtils = __webpack_require__(1);

	var _moyeUtils2 = _interopRequireDefault(_moyeUtils);

	var _resource = __webpack_require__(2);

	var _resource2 = _interopRequireDefault(_resource);

	var _serviceClient = __webpack_require__(3);

	var _serviceClient2 = _interopRequireDefault(_serviceClient);

	var _scene = __webpack_require__(4);

	var _scene2 = _interopRequireDefault(_scene);

	var _global = __webpack_require__(5);

	var _global2 = _interopRequireDefault(_global);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Moye 框架类
	 * @class
	 */

	var Moye = function () {
	  function Moye() {
	    _classCallCheck(this, Moye);

	    this.utils = _moyeUtils2.default;
	    this.global = new _global2.default();
	    this.sceneList = [];
	    this.focusList = [];
	    this.action = {};
	    this.root = null;
	    this.curScene = null;
	    this.isAtv = false;
	    this.isTplDebug = false;
	    this.animate = false;
	    this.keyCodes = {
	      ENTER: 13, LEFT: 37, UP: 38, RIGHT: 39,
	      DOWN: 40, BACK: 27, MEMU: 18, SOURCE: 690,
	      RECORD: 685, NUM_0: 48, NUM_1: 49, NUM_2: 50,
	      NUM_3: 51, NUM_4: 52, NUM_5: 53, NUM_6: 54,
	      NUM_7: 55, NUM_8: 56, NUM_9: 57, SOUND_UP: 536,
	      SOUND_DOWN: 537, M: 36
	    };
	  }
	  /**
	   * init 初始化方法
	   * @memberOf Moye.prototype
	   * @method init
	   * @param {Object} option 配置参数
	   * @param {Number} [option.tplmode=0] 可选0或1,分别对应简单模板/juicer模板,在setContentView第一个参数传入模板名的时候生效
	   * @param {String} option.packagename=com.yunos.moye.demo 应用包名
	   * @param {Boolean} [option.isAtv=true] 是否使用ATV或FocusEngine引擎
	   * @param {Boolean} [option.animate=false] 是否开启动画效果
	   * @param {Boolean} [option.launcher] 是否是launcher应用
	   * @param {Object} [option.default] 默认配置
	   * @param {Object} [option.default.lang] 默认语言配置
	   * @param {String} option.default.lang.type 默认语言类型(例'zh')
	   * @param {Object} option.default.lang.data 默认语言数据
	   */


	  _createClass(Moye, [{
	    key: 'init',
	    value: function init() {
	      var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      if (this.utils.getType(option) !== '[object Object]') {
	        throw new Error('[Moye] init传入参数类型错误，只接受传入对象。');
	        return false;
	      }
	      option = _extends({
	        tplmode: 0,
	        packagename: 'com.yunos.moye.demo',
	        isAtv: true,
	        animate: false,
	        scene: {}
	      }, option);
	      this.launcher = option.launcher;
	      this.isTplDebug = option.isTplDebug;
	      this.isAtv = option.isAtv;
	      this.animate = option.animate;
	      //this.tplPath = '/data/app/' + option.packagename + '/res/tpl/';
	      this.tplmode = option.tplmode; // 0 ,simple,1 , juicer
	      if (option.default && option.default.lang && this.utils.getType(option.default.lang) === '[object Object]') {
	        this.lang = option.default.lang;
	      } else {
	        this.lang = null;
	      }
	      this.scene = option.scene;
	      this.resource = new _resource2.default(option.packagename, this.lang, this.isTplDebug);
	      this.registerStageListener();
	      if (!this.isAtv) this.onkeyListener();
	    }
	    /**
	     * showScene 显示Scene
	     * @memberOf Moye.prototype
	     * @method showScene
	     * @param {Object} sceneObj scene对象
	     * @param {Object} data 数据
	     */

	  }, {
	    key: 'showScene',
	    value: function showScene(sceneObj) {
	      var _this = this;

	      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (this.curScene) {
	        //触发上一个事件的onPause();
	        this.curScene.onPause();
	      }
	      if (this.utils.getType(data) !== '[object Object]') {
	        throw new Error('[Moye] showScene传入参数(data)类型错误，只接受传入对象。');
	        return false;
	      }
	      this.curScene = new sceneObj(this);
	      this.sceneList.push(this.curScene);
	      this.updateDefaultKeyStatus();
	      //oncreate放到最后，考虑到用户会自己设置default key
	      if (this.sceneList.length <= 1 && this.utils.isBlitz()) {
	        var base = blitz.load('base');
	        base.getPageData({}, function (e) {
	          _this.curScene.onCreate(_extends({}, data, { pageData: e }));
	        }, function (e) {
	          _this.curScene.onCreate(data);
	        });
	      } else {
	        this.curScene.onCreate(data);
	      }
	    }
	    /**
	     * registerStageListener 注册Stage(page show/hide)相关事件监听
	     * @memberOf Moye.prototype
	     * @method registerStageListener
	     */

	  }, {
	    key: 'registerStageListener',
	    value: function registerStageListener() {
	      var _this2 = this;

	      var base = blitz.load('base');
	      if (!this.isAtv) {
	        this.onkeyListener();
	      }
	      if (this.utils.isBlitz()) {
	        base.addListener({
	          name: 'page_show'
	        }, function (e) {
	          _this2.curScene && _this2.curScene.onResume();
	          for (var i = 0, len = _this2.sceneList.length; i < len; i++) {
	            _this2.sceneList[i].onStageShow && _this2.sceneList[i].onStageShow();
	          }
	        }, function (e) {
	          throw new Error('[ Moye ] page_show出错。');
	        });
	        base.addListener({
	          name: 'page_hide'
	        }, function (e) {
	          _this2.curScene && _this2.curScene.onPause();
	          for (var i = 0, len = _this2.sceneList.length; i < len; i++) {
	            _this2.sceneList[i].onStageHide && _this2.sceneList[i].onStageHide();
	          }
	        }, function (e) {
	          throw new Error('[ Moye ] page_hide出错。');
	        });
	        base.addListener({
	          name: 'page_stop'
	        }, function (e) {
	          _this2.curScene && _this2.curScene.onDestroy();
	        }, function (e) {
	          throw new Error('[ Moye ] page_stop出错。');
	        });
	        base.addListener({
	          name: 'stage_resume'
	        }, function (e) {
	          _this2.curScene.onActive();
	        }, function (e) {
	          throw new Error('[ Moye ] stage_resume出错。');
	        });
	        base.addListener({
	          name: 'stage_pause'
	        }, function (e) {
	          _this2.curScene.onInactive();
	        }, function (e) {
	          throw new Error('[ Moye ] stage_pause出错。');
	        });
	      }
	    }
	    /**
	     * onkeyListener 注册键盘相关事件监听
	     * @memberOf Moye.prototype
	     * @method onkeyListener
	     */

	  }, {
	    key: 'onkeyListener',
	    value: function onkeyListener() {
	      var _this3 = this;

	      if (this.isAtv) {
	        this.root.on('keydown', function (e) {
	          _this3.curScene.onKeydown(e);
	        });
	        this.root.on('ok', function (e) {
	          _this3.curScene.onOK(e);
	        });
	        this.root.on('click', function (e) {
	          _this3.curScene.onClick(e);
	        });
	        this.root.on('keyup', function (e) {
	          switch (e.keyCode) {
	            case _this3.keyCodes.BACK:
	              _this3.hideScene();
	              break;
	            default:
	              _this3.curScene.onKeyup(e);
	              break;
	          }
	        });
	      } else {
	        document.body.addEventListener('keydown', function (e) {
	          _this3.curScene.onKeydown(e);
	        });
	        document.body.addEventListener('keyup', function (e) {
	          switch (e.keyCode) {
	            case _this3.keyCodes.BACK:
	              _this3.hideScene();
	              break;
	            case _this3.keyCodes.ENTER:
	              _this3.curScene.onOK(e);
	              break;
	            default:
	              _this3.curScene.onKeyup(e);
	              break;
	          }
	        });
	      }
	    }
	    /**
	     * hideScene 隐藏scene
	     * @memberOf Moye.prototype
	     * @method hideScene
	     * @param {Object} result 需要传入的数据
	     * @param {String} id 关闭后需要现实的Scene Id,不传则默认为显示上一个Scene
	     */

	  }, {
	    key: 'hideScene',
	    value: function hideScene(result, id) {
	      if (id) {
	        this.showSceneById(result, id);
	      } else {
	        this.hideCurScene(result);
	      }
	    }
	    /**
	     * showSceneById 通过Id显示指定Scene
	     * @memberOf Moye.prototype
	     * @method showSceneById
	     * @param {Object} result 需要传入的数据
	     * @param {String} id 需要显示的Scene Id,
	     */

	  }, {
	    key: 'showSceneById',
	    value: function showSceneById(result, id) {
	      var position = this.focusList.indexOf(id);
	      if (position != -1) {
	        //调用当前scene的生命周期方法
	        this.curScene.onPause();
	        this.curScene.onDestroy();
	        this.curScene = null;
	        //获取指定的scene,更新scene堆栈
	        this.sceneList.length = position + 1;
	        //移除中间的view
	        var length = this.focusList.length;
	        for (var i = length - 1; i > position; i--) {
	          var targetId = this.focusList[i];
	          var targetNode = document.getElementById(targetId);
	          targetNode.parentNode.removeChild(targetNode);
	        }
	        this.focusList.length = position + 1;
	        this.render();
	        if (this.isAtv) {
	          this.root.getWidgetById(id).enable();
	          this.atvFocus(id);
	        }

	        this.curScene = this.sceneList[position];
	        this.curScene.onResume(result);
	        this.updateDefaultKeyStatus();
	      } else {
	        throw new Error('[ Moye ] 未发现对应ID的Scene。');
	      }
	    }
	    /**
	     * hideCurScene 隐藏正在显示的Scene
	     * @memberOf Moye.prototype
	     * @method hideCurScene
	     * @param {Object} result 需要传入的数据
	     */

	  }, {
	    key: 'hideCurScene',
	    value: function hideCurScene(result) {
	      var _this4 = this;

	      var sceneList = this.sceneList;

	      this.curScene = sceneList[sceneList.length - 1];
	      var isBack = this.curScene.onBack && this.curScene.onBack();

	      if (sceneList.length === 1) {
	        return;
	      }

	      if (!isBack) {
	        this.curScene.onPause();
	        this.curScene.onDestroy();
	        //清除上一个页面
	        if (this.isAtv) {
	          (function () {
	            var curFocusId = _this4.focusList.pop();
	            //返回时移除上一个dom元素
	            var targetNode = document.getElementById(curFocusId);
	            // //添加离开动画初始化参数
	            if (_this4.animate) {
	              targetNode.style.transform = 'scale(1)';
	              targetNode.style.opacity = 1;
	              targetNode.addEventListener('transitionend', function () {
	                targetNode.parentNode.removeChild(targetNode);
	                curFocusId = null;
	                _this4.render();
	              });
	              targetNode.style.transition = 'all 0.2s ease-in-out';
	              targetNode.style.transform = 'scale(.95)';
	              targetNode.style.opacity = 0;
	            } else {
	              targetNode.parentNode.removeChild(targetNode);
	              curFocusId = null;
	              _this4.render();
	            }
	          })();
	        }

	        var deleteScene = sceneList.pop();
	        deleteScene = null;
	        if (sceneList.length >= 1) {
	          this.curScene = sceneList[sceneList.length - 1];
	          if (this.isAtv) {
	            var _curFocusId = this.focusList[this.focusList.length - 1];
	            //显示当前widget
	            this.root.getWidgetById(_curFocusId).enable();
	            this.atvFocus(_curFocusId);
	          }
	          this.curScene.onResume(result);
	        }
	      }
	      this.updateDefaultKeyStatus();
	    }
	    /**
	     * reload 重载页面
	     * @memberOf Moye.prototype
	     * @method reload
	     */

	  }, {
	    key: 'reload',
	    value: function reload() {
	      var sceneList = this.sceneList,
	          focusList = this.focusList;
	      this.resource.lang = null;
	      this.resource.getResourceValue();
	      //移除dom节点
	      for (var i = 0, len = focusList.length; i < len; i++) {
	        //返回时移除上一个dom元素
	        var targetNode = document.getElementById(focusList[i]);
	        targetNode.parentNode.removeChild(targetNode);
	      }
	      focusList.length = 0;
	      //更新当前scene对象
	      sceneList.length = 1;
	      this.curScene = sceneList[0];
	      this.updateDefaultKeyStatus();
	      this.curScene.onCreate();
	    }
	    /**
	     * updateDefaultKeyStatus 更改系统默认按键处理规则(back键)
	     * @memberOf Moye.prototype
	     * @method updateDefaultKeyStatus
	     */

	  }, {
	    key: 'updateDefaultKeyStatus',
	    value: function updateDefaultKeyStatus() {
	      if (this.sceneList.length > 1 || this.launcher) {
	        this.utils.setDefaultKeyEvent(true);
	      } else {
	        this.utils.setDefaultKeyEvent(false);
	      }
	    }
	    /**
	     * getResource 获取资源操作相关方法
	     * @memberOf Moye.prototype
	     * @method getResource
	     */

	  }, {
	    key: 'getResource',
	    value: function getResource() {
	      return this.resource;
	    }
	  }, {
	    key: 'setContentView',
	    value: function setContentView(tpl, dataobj, tplId, options) {
	      var _this5 = this;

	      var callback = arguments.length <= 4 || arguments[4] === undefined ? function () {} : arguments[4];

	      var containerId = options && options.containerId ? options.containerId : null,
	          isParentShow = options && options.isParentShow ? options.isParentShow : false,
	          focusId = options && options.focusId ? options.focusId : tplId,
	          isFront = options && options.isFront ? options.isFront : false;
	      var osid = containerId ? document.getElementById(containerId) : document.body;
	      var addDom = function addDom(domObj, callback) {
	        if (_this5.animate) {
	          osid.style.transform = 'scale(0.95)';
	          setTimeout(function () {
	            osid.style.transition = 'all 0.2s ease-in-out';
	            osid.style.transform = 'scale(1)';
	          }, 300);
	        }
	        var newDom = _this5.utils.parseToDOM(domObj);
	        if (!newDom.id) newDom.id = tplId;
	        if (isFront) {
	          osid.insertBefore(newDom, osid.childNodes[0]);
	        } else {
	          osid.appendChild(newDom);
	        }
	        if (_this5.isAtv) {
	          _this5.render();
	          _this5.atvFocus(focusId);
	          _this5.focusList.push(tplId);
	          if (_this5.focusList.length > 1) {
	            var parentId = _this5.focusList[_this5.focusList.length - 2];
	            //显示当前widget
	            _this5.root.getWidgetById(parentId).disable();
	            document.getElementById(parentId).style.visibility = isParentShow ? 'visible' : 'hidden';
	          }
	        }
	        callback();
	      };
	      this.resource.getResourceValue(function (lang) {
	        dataobj.lang = lang;
	        if (_this5.utils.getType(tpl) === '[object Function]') {
	          addDom(tpl(dataobj), callback);
	        } else if (_this5.utils.getType(tpl) === '[object String]') {
	          console.log('[Moye] 通过文件名获取模板的方式已不建议使用,请直接require模板文件。');
	          _this5.resource.getTpl(tpl, function (status, data) {
	            if (status) {
	              if ((typeof dataobj === 'undefined' ? 'undefined' : _typeof(dataobj)) !== 'object' || dataobj == null) {
	                dataobj = {};
	              }
	              var str = _this5.tplReplace(data, dataobj);
	              addDom(str, callback);
	            } else {
	              throw new Error('[Moye] 获取模板文件出错。');
	            }
	          });
	        } else {
	          throw new Error('[Moye] setContentView传入参数(tpl)错误，不接受String & Function以外类型。');
	        }
	      });
	    }
	    /**
	     * render 使用atv框架时页面元素变动或初始化焦点后的刷新方法
	     * @memberOf Moye.prototype
	     * @method render
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.root) {
	        this.root.reRender();
	      } else {
	        this.root = window.ATV ? ATV.UI.render() : FocusEngine.render();
	        this.onkeyListener();
	      }
	      return this.root;
	    }

	    //  getContextByFile(tplPath, callback) {
	    //    this.resource.getTpl(tplPath, callback);
	    //  }

	  }, {
	    key: 'assetData',
	    value: function assetData(data, dataObj) {
	      if (!((typeof dataObj === 'undefined' ? 'undefined' : _typeof(dataObj)) === 'object')) {
	        dataObj = {};
	      }
	      dataObj.lang = this.resource.getLang();
	      return this.tplReplace(data, dataObj);
	    }
	    /**
	     * atvFocus 使用atv框架时设置焦点的方法
	     * @memberOf Moye.prototype
	     * @method atvFocus
	     * @param  {String} id 元素Id
	     */

	  }, {
	    key: 'atvFocus',
	    value: function atvFocus(id) {
	      this.root.getWidgetById(id).focus();
	      document.getElementById(id).style.visibility = 'visible';
	    }
	  }, {
	    key: 'getServiceClient',
	    value: function getServiceClient() {
	      return new _serviceClient2.default();
	    }
	  }, {
	    key: 'tplReplace',
	    value: function tplReplace(data, dataobj) {
	      if (this.tplmode == 0) {
	        return this.utils.regexView(data, dataobj);
	      } else {
	        return juicer(data, dataobj);
	      }
	    }
	    /**
	     * getSystemLang 获取系统语言类型
	     * @memberOf Moye.prototype
	     * @method getSystemLang
	     * @param  {Funtion} callback 回调方法
	     */

	  }, {
	    key: 'getSystemLang',
	    value: function getSystemLang(callback) {
	      var property = blitz.load('property');
	      property.getSystemProperty({
	        key: 'persist.sys.language'
	      }, function (e) {
	        var lan = e.result;
	        callback(lan);
	      }, function (e) {});
	    }
	  }]);

	  return Moye;
	}();

	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
	  window.moye = new Moye();
	  window.scene = _scene2.default;
	} else {
	  module.exports = moye = new Moye();
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * MoyeUtils 工具方法
	 * @exports MoyeUtils
	 */
	var MoyeUtils = {
	  /**
	   * isBlitz 是否为blitz
	   * @return {Boolean} true/false
	   */

	  isBlitz: function isBlitz() {
	    return typeof yunos !== 'undefined';
	  },

	  /**
	   * parseToDOM 字符串转DOM对象
	   * @param {String} str DOM字符串
	   * @return {Object} &#60;object Element&#62;
	   */
	  parseToDOM: function parseToDOM(str) {
	    //todo
	    var i = void 0,
	        a = document.createElement('div'),
	        b = document.createDocumentFragment();
	    a.innerHTML = str;
	    while (i = a.firstChild) {
	      b.appendChild(i);
	    }return b;
	  },

	  /**
	   * setDefaultKeyEvent 设置是否阻塞系统默认按键事件
	   * @param {Boolean} value false代表由系统处理,true代表应用处理后不再向上传递给系统
	   */
	  setDefaultKeyEvent: function setDefaultKeyEvent(value) {
	    //false代表由系统处理,true代表应用处理后不再向上传递给系统
	    if (this.isBlitz()) {
	      yunos.context.preventDefaultKeyEvent(value);
	    }
	  },

	  /**
	   * hasClass dom是否存在class
	   * @param {Object} obj DOM对象
	   * @param {String} cls class名称
	   * @return {Boolean} true/false
	   */
	  hasClass: function hasClass(obj, cls) {
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	  },

	  /**
	   * addClass 给dom增加class
	   * @param {Object} obj DOM对象
	   * @param {String} cls class名称
	   */
	  addClass: function addClass(obj, cls) {
	    if (!this.hasClass(obj, cls)) {
	      obj.className += ' ' + cls;
	    }
	  },

	  /**
	   * removeClass 给dom删除class
	   * @param {Object} obj DOM对象
	   * @param {String} cls class名称
	   */
	  removeClass: function removeClass(obj, cls) {
	    if (this.hasClass(obj, cls)) {
	      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	      obj.className = obj.className.replace(reg, ' ');
	    }
	  },

	  /**
	   * writeFile 给dom删除class
	   * @param {Object} param 配置参数
	   * @param {String} param.filename 文件名称
	   * @param {String} param.mode 模式
	   * @param {String} param.data 内容
	   * @param {Funtion(Event)} success 成功回调
	   * @param {Funtion(Event)} fail 失败回调
	   */
	  writeFile: function writeFile(param, success, fail) {
	    var file = blitz.load('file');
	    file.openFile({
	      filename: param.filename,
	      mode: param.mode
	    }, function (e) {
	      console.log('open file success: ' + JSON.stringify(e));
	      file.write({
	        filename: param.filename,
	        data: param.data
	      }, function (e) {
	        console.log('write file success: ' + JSON.stringify(e));
	        success && success(e);
	        file.closeFile({
	          filename: param.filename
	        }, function (e) {
	          console.log('close file success: ' + JSON.stringify(e));
	        }, function (e) {
	          console.log('close file fail: ' + JSON.stringify(e));
	          fail && fail(e);
	        });
	      }, function (e) {
	        console.log('write file fail: ' + JSON.stringify(e));
	        fail && fail(e);
	      });
	    }, function (e) {
	      console.log('open file fail: ' + JSON.stringify(e));
	      fail && fail(e);
	    });
	  },

	  /**
	   * getType 获取参数类型
	   * @param {*} obj 任意元素
	   * @return {String} &#60;object [String,Object,Array,Element···]&#62;
	   */
	  getType: function getType(obj) {
	    var st = {}.toString;
	    return st.call(obj);
	  },
	  regexView: function regexView(htmlContent, arr) {
	    var result = htmlContent.replace(/\$\{(.*?)\}/g, function () {
	      try {
	        var s = arguments[1].toString();
	        //console.log('arrarr:' + JSON.stringify(arr));
	        //console.log('regexView:' + s);
	        var m = eval('arr.' + s);
	        //console.log('regexView mmmm:' + m);
	        if (m == undefined) {
	          return '';
	        } else {
	          return m;
	        }
	      } catch (e) {}
	    });
	    return result.toString();
	  }
	};

	window.MoyeUtils = MoyeUtils;
	exports.default = MoyeUtils;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _moyeUtils = __webpack_require__(1);

	var _moyeUtils2 = _interopRequireDefault(_moyeUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Resource 资源管理
	 * @class
	 * @param {String} appname 应用包名
	 * @param {Boolean} isTplDebug 是否启用模板debug模式
	 */

	var Resource = function () {
	  function Resource(appname, lang, isTplDebug) {
	    _classCallCheck(this, Resource);

	    this.respath = '/data/app/' + appname + '/res/';
	    this.utils = _moyeUtils2.default;
	    this.lang = lang === null ? {} : lang;
	    this.file = blitz.load('file');
	    this.isTplDebug = isTplDebug;
	    this.tpl = {};
	    console.log(this.lang);
	  }
	  /**
	   * getLang 获取当前语言JSON
	   * @memberOf Resource.prototype
	   * @method getLang
	   * @return {Object} JSON
	   */


	  _createClass(Resource, [{
	    key: 'getLang',
	    value: function getLang() {
	      return this.lang;
	    }
	    /**
	     * getString 获取某个key的当前文本
	     * @memberOf Resource.prototype
	     * @method getString
	     * @param  {String} key 语言map的key值
	     * @return {String} 文本
	     */

	  }, {
	    key: 'getString',
	    value: function getString(key) {
	      return this.lang.data[key];
	    }
	    /**
	     * getResourceValue 读取语言配置文件
	     * @memberOf Resource.prototype
	     * @method getResourceValue
	     * @param {Function(lang)} callback 回调函数
	     */

	  }, {
	    key: 'getResourceValue',
	    value: function getResourceValue(callback) {
	      var _this = this;

	      if (!this.utils.isBlitz()) {
	        if (this.lang.type && this.lang.data) {
	          callback && callback(this.lang.data);
	        } else {
	          this.sendAjaxRequest('../../res/values/value.json', function (status, data) {
	            _this.lang.type = 'zh';
	            _this.lang.data = JSON.parse(data);
	            //console.log('getResourceValue sendAjax:' + JSON.stringify(this.lang));
	            callback && callback(_this.lang.data);
	          });
	        }
	      } else {
	        var property = blitz.load('property');
	        property.getSystemProperty({
	          key: 'persist.sys.language'
	        }, function (e) {
	          var lan = e.result;
	          if (lan === _this.lang.type) {
	            callback && callback(_this.lang.data);
	          } else {
	            try {
	              var name = 'value_' + lan + '.json';
	              _this.lang.data = window.require('../../res/values/' + name);
	              _this.lang.type = lan;
	              callback && callback(_this.lang.data);
	            } catch (e) {
	              var _name = 'value.json';
	              _this.lang.data = window.require('../../res/values/' + _name);
	              _this.lang.type = lan;
	              callback && callback(_this.lang.data);
	            }
	          }
	        }, function (e) {
	          callback && callback(_this.lang.data);
	        });
	      }
	    }
	    /**
	     * sendAjaxRequest 简易ajax请求(GET)
	     * @memberOf Resource.prototype
	     * @method sendAjaxRequest
	     * @param {String} url 请求地址
	     * @param {Function(lang)} callback 回调函数
	     */

	  }, {
	    key: 'sendAjaxRequest',
	    value: function sendAjaxRequest(url, callback) {
	      var XMLHttpReq = new XMLHttpRequest(); //创建XMLHttpRequest对象
	      XMLHttpReq.open('GET', url, true);
	      XMLHttpReq.onreadystatechange = function () {
	        if (XMLHttpReq.readyState == 4) {
	          if (XMLHttpReq.status == 200) {
	            var text = XMLHttpReq.responseText;
	            callback(true, text);
	          }
	        }
	      };
	      XMLHttpReq.send(null);
	    }
	    /**
	     * getTpl 简易ajax请求(GET)
	     * @memberOf Resource.prototype
	     * @method getTpl
	     * @param {String} tplfile 模板文件
	     * @param {Function(lang)} callback 回调函数
	     */

	  }, {
	    key: 'getTpl',
	    value: function getTpl(tplfile, callback) {
	      var _this2 = this;

	      if (this.tpl[tplfile] == undefined) {
	        if (!this.utils.isBlitz() || this.isTplDebug) {
	          this.sendAjaxRequest('../../res/tpl/' + tplfile, callback);
	        } else {
	          (function () {
	            var option = {
	              filename: _this2.respath + 'tpl/' + tplfile
	            };
	            _this2.file.openFile(option, function (e) {
	              _this2.file.read(option, function (data) {
	                _this2.tpl[tplfile] = data.data;
	                _this2.file.closeFile(option, function (e) {}, function (e) {
	                  throw new Error('[ Moye ] 关闭文件(' + option.filename + ')出错。');
	                });
	                callback(true, data.data);
	              }, function (e) {
	                callback(false);
	              });
	            }, function (e) {
	              callback(false);
	            });
	          })();
	        }
	      } else {
	        (function () {
	          var option = {
	            filename: _this2.respath + 'tpl/' + tplfile
	          };
	          _this2.file.openFile(option, function (e) {
	            _this2.file.read(option, function (data) {
	              _this2.tpl[tplfile] = data.data;
	              _this2.file.closeFile(option, function (e) {}, function (e) {
	                throw new Error('[ Moye ] 关闭文件(' + option.filename + ')出错。');
	              });
	              callback(true, data.data);
	            }, function (e) {
	              callback(false);
	            });
	          }, function (e) {
	            callback(false);
	          });
	        })();
	      }
	    }
	  }]);

	  return Resource;
	}();

	exports.default = Resource;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _moyeUtils = __webpack_require__(1);

	var _moyeUtils2 = _interopRequireDefault(_moyeUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * ServiceClient 服务类
	 * @class
	 */

	var ServiceClient = function () {
	  function ServiceClient() {
	    _classCallCheck(this, ServiceClient);

	    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
	      //console.log("window html  --- ");
	      var v = _moyeUtils2.default;
	      if (v.isBlitz()) {
	        this.serivceClient = new BlitzServiceClient();
	      } else {
	        this.serivceClient = null;
	      }
	      //console.log("window html  ---  111");
	    } else {
	        //console.log("nodejs js  --- ");
	      }
	  }
	  /**
	   * bindService 绑定服务
	   * @memberOf ServiceClient.prototype
	   * @method bindService
	   * @param  {String} serviceUri 服务URI
	   * @param  {Funtion} callback 回调函数
	   */


	  _createClass(ServiceClient, [{
	    key: 'bindService',
	    value: function bindService(serviceUri, callback) {
	      //console.log("bindService window html  ---  222");
	      this.serivceClient.getService(serviceUri, function (proxy) {
	        callback(proxy);
	      });
	    }
	    /**
	     * unbindService 解绑服务
	     * @memberOf ServiceClient.prototype
	     * @method unbindService
	     * @param  {String} serviceUri 服务URI
	     */

	  }, {
	    key: 'unbindService',
	    value: function unbindService(serviceUri) {
	      this.serivceClient.release(serviceUri);
	    }
	    /**
	     * startService 启动服务
	     * @memberOf ServiceClient.prototype
	     * @method startService
	     * @param  {String} serviceUri 服务URI
	     * @param  {Object} params 参数
	     */

	  }, {
	    key: 'startService',
	    value: function startService(serviceUri, params) {
	      this.serivceClient.startService(serviceUri, params);
	    }
	    /**
	     * stopService 停止服务
	     * @memberOf ServiceClient.prototype
	     * @method stopService
	     * @param  {String} serviceUri 服务URI
	     */

	  }, {
	    key: 'stopService',
	    value: function stopService(serviceUri) {
	      this.serivceClient.stopService(serviceUri);
	    }
	  }]);

	  return ServiceClient;
	}();

	exports.default = ServiceClient;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Scene 页面基类
	 * @class
	 */

	var Scene = function () {
	  function Scene(scope) {
	    _classCallCheck(this, Scene);

	    this.moye = scope;
	    this.global = scope.global;
	  }
	  /**
	   * onCreate scene创建时触发
	   * @memberOf Scene.prototype
	   * @abstract
	   * @method onCreate
	   * @param  {Object} data 传入数据
	   */


	  _createClass(Scene, [{
	    key: 'onCreate',
	    value: function onCreate(data) {}
	    /**
	     * onResume scene恢复时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onResume
	     * @param  {Object} data 传入数据
	     */

	  }, {
	    key: 'onResume',
	    value: function onResume(data) {}
	    /**
	     * onPause scene被遮盖时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onPause
	     */

	  }, {
	    key: 'onPause',
	    value: function onPause() {}
	    /**
	     * onResume scene恢复时触发(与onResume不同的是,不论这个scene是否已经被其他scene覆盖都会被触发)
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onResume
	     * @param  {Object} data 传入数据
	     */

	  }, {
	    key: 'onStageShow',
	    value: function onStageShow(data) {}
	    /**
	     * onPause scene被遮盖时触发(与onPause不同的是,不论这个scene是否已经被其他scene覆盖都会被触发)
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onPause
	     */

	  }, {
	    key: 'onStageHide',
	    value: function onStageHide() {}
	    /**
	     * onDestroy 销毁时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onDestroy
	     */

	  }, {
	    key: 'onDestroy',
	    value: function onDestroy() {}
	    /**
	     * onActive 隐藏系统stage dailog时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onActive
	     */

	  }, {
	    key: 'onActive',
	    value: function onActive() {}
	    /**
	     * onInactive 被系统stage dailog覆盖时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onInactive
	     */

	  }, {
	    key: 'onInactive',
	    value: function onInactive() {}
	    /**
	     * onKeydown keydown时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onKeydown
	     * @param  {Function(Event)} e 事件Event对象
	     */

	  }, {
	    key: 'onKeydown',
	    value: function onKeydown(e) {}
	    /**
	     * onKeyup keyup时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onKeyup
	     * @param  {Function(Event)} e 事件Event对象
	     */

	  }, {
	    key: 'onKeyup',
	    value: function onKeyup(e) {}
	    /**
	     * onOK ok时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onOK
	     * @param  {Function(Event)} e 事件Event对象
	     */

	  }, {
	    key: 'onOK',
	    value: function onOK(e) {}
	    /**
	     * onBack back时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onBack
	     * @example 返回默认关闭当前scene,如果不需要关闭则return true
	     */

	  }, {
	    key: 'onBack',
	    value: function onBack() {}
	    /**
	     * onClick 鼠标click时触发
	     * @memberOf Scene.prototype
	     * @abstract
	     * @method onClick
	     * @param  {Function(Event)} e 事件Event对象
	     */

	  }, {
	    key: 'onClick',
	    value: function onClick(e) {}
	    /**
	     * showScene 显示scene
	     * @memberOf Scene.prototype
	     * @see {@link Moye#showScene}
	     * @borrows <Moye#showScene> as <Scene#showScene>
	     * @method showScene
	     * @param {Object} scenePath scene对象
	     * @param {Object} data 数据
	     */

	  }, {
	    key: 'showScene',
	    value: function showScene(scenePath, data) {
	      return this.moye.showScene(scenePath, data);
	    }
	    /**
	     * hideScene 隐藏scene
	     * @memberOf Scene.prototype
	     * @see {@link Moye#hideScene}
	     * @method hideScene
	     * @param {Object} result 需要传入的数据
	     * @param {String} id 关闭后需要现实的Scene Id,不传则默认为显示上一个Scene
	     */

	  }, {
	    key: 'hideScene',
	    value: function hideScene(result, id) {
	      return this.moye.hideScene(result, id);
	    }
	  }, {
	    key: 'setContentView',
	    value: function setContentView(tpl, data, focusId, options, callback) {
	      this.moye.setContentView(tpl, data, focusId, options, callback);
	    }
	    /**
	     * getResource 获取资源操作相关方法
	     * @memberOf Scene.prototype
	     * @see {@link Moye#getResource}
	     * @method getResource
	     */

	  }, {
	    key: 'getResource',
	    value: function getResource() {
	      return this.moye.getResource();
	    }
	  }, {
	    key: 'getAlertDialog',
	    value: function getAlertDialog() {
	      return window.require('/system/res/alert-dialog.js');
	    }
	  }, {
	    key: 'getKeyCodes',
	    value: function getKeyCodes() {
	      return this.moye.keyCodes;
	    }
	  }, {
	    key: 'getMoye',
	    value: function getMoye() {
	      return this.moye;
	    }
	  }, {
	    key: 'getAtvRoot',
	    value: function getAtvRoot() {
	      return this.moye.root;
	    }
	    /**
	     * atvFocus 使用atv框架时设置焦点的方法
	     * @memberOf Scene.prototype
	     * @see {@link Moye#atvFocus}
	     * @method atvFocus
	     * @param  {String} id 元素Id
	     */

	  }, {
	    key: 'atvFocus',
	    value: function atvFocus(id) {
	      this.moye.atvFocus(id);
	    }
	    /**
	     * atvRender 使用atv框架时页面元素变动或初始化焦点后的刷新方法
	     * @memberOf Scene.prototype
	     * @see {@link Moye#render}
	     * @method atvRender
	     */

	  }, {
	    key: 'atvRender',
	    value: function atvRender() {
	      return this.moye.render();
	    }
	    /**
	     * atvRender 重载页面
	     * @memberOf Scene.prototype
	     * @see {@link Moye#render}
	     * @method atvRender
	     */

	  }, {
	    key: 'reload',
	    value: function reload() {
	      return this.moye.reload();
	    }
	  }, {
	    key: 'isBlitz',
	    value: function isBlitz() {
	      return this.moye.utils.isBlitz();
	    }
	  }]);

	  return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Global 全局变量管理
	 * @class
	 */

	var Global = function () {
	  function Global() {
	    _classCallCheck(this, Global);

	    this.map = {};
	  }
	  /**
	   * get 获取全局变量
	   * @memberOf Global.prototype
	   * @method get
	   * @param  {String} key 变量名
	   * @return {*}     变量值
	   */


	  _createClass(Global, [{
	    key: "get",
	    value: function get(key) {
	      return this.map[key];
	    }
	    /**
	     * set 设置全局变量
	     * @memberOf Global.prototype
	     * @method set
	     * @param {String} key   变量名
	     * @param {*} value 变量值
	     */

	  }, {
	    key: "set",
	    value: function set(key, value) {
	      this.map[key] = value;
	    }
	    /**
	     * each 遍历全局变量
	     * @memberOf Global.prototype
	     * @method each
	     * @param  {Function} callback 回调函数
	     * @default function(item){}
	     */

	  }, {
	    key: "each",
	    value: function each() {
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? function (item) {} : arguments[0];

	      for (var item in this.map) {
	        callback(item);
	      }
	    }
	  }]);

	  return Global;
	}();

	module.exports = Global;

/***/ }
/******/ ]);