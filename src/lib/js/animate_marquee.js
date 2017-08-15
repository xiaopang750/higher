window.yunos_animation = (function ($) {
    var Tween_Algorithm = {
        Linear: {
            easeIn: function (t, b, c, d) {
                return c * t / d + b;
            },
            easeOut: function (t, b, c, d) {
                return c * t / d + b;
            },
            easeInOut: function (t, b, c, d) {
                return c * t / d + b;
            }
        },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - Tween_Algorithm.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) return Tween_Algorithm.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Tween_Algorithm.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
    window.Tween = Tween_Algorithm;

    var platform_webcore = false,
        frameCounter = 0,
        frameTimmer,
        tickTimmer,
        defaultMoveFunc = Tween_Algorithm['Sine']['easeOut'],
        default_duration = 250,
        defaultMode = 0,
        frameAniList,
        tickAniList,
        timerList = [],
        ANIMATE_INFO_KEY = 'animate_info';

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function arraySubtract(arr1, arr2) {
        var retArray = [];
        if (arr1 instanceof Array && arr2 instanceof Array) {
            var len = arr1.length;
            for (var i = 0; i < len; i++) {
                retArray[i] = arr1[i] - arr2[i];
            }
        }

        return retArray;
    }

    function _frameUpdate(curTime, frames) {
        var i = 0,
            aniNums = frames.length;

        while (i < aniNums) {
            //            var stime = Date.now();
            var aniFrame = frames[i],
                aniObj = aniFrame.aniObj,
                domEle = aniObj._node,
                st = aniFrame.st,
                duration = aniFrame.duration;

            if (!domEle || typeof duration === "undefined" || aniFrame.flag !== aniObj._flag || isNaN(duration) || aniObj._isStop) { //如果元素上有其他动画，则取消当前动画
                frames.splice(i, 1);
                aniNums--;
                continue;
            }

            var offx = aniFrame.offx,
                offy = aniFrame.offy,
                offtx = aniFrame.offtx,
                offty = aniFrame.offty,
                offsx = aniFrame.offsx,
                offsy = aniFrame.offsy,
                offopt = aniFrame.offopt,
                offw = aniFrame.offw,
                offh = aniFrame.offh,
                offdeg = aniFrame.offdeg;

            if (curTime >= st + duration || aniObj._isEnd) {
                if (offx) aniObj._left = aniObj._endLeft;
                if (offy) aniObj._top = aniObj._endTop;
                if (offtx) aniObj._transformX = aniObj._endTransformX;
                if (offty) aniObj._transformY = aniObj._endTransformY;
                if (offsx) aniObj._scaleX = aniObj._endScaleX;
                if (offsy) aniObj._scaleY = aniObj._endScaleY;
                if (offopt) aniObj._opacity = aniObj._endOpacity;
                if (offw) aniObj._width = aniObj._endWidth;
                if (offh) aniObj._height = aniObj._endHeight;
                if (offdeg) aniObj._rotate = aniObj._endRotate;

                if (offsx || offsy || offtx || offty) {
                    var transtr = 'translate3d(' + aniObj._transformX + 'px, ' + aniObj._transformY + 'px, 0) scale3d(' + aniObj._scaleX + ', ' + aniObj._scaleY + ', 1)';
                    domEle.style.webkitTransform = transtr;
                    domEle.style.transform = transtr;
                }
                if (offx) domEle.style.left = aniObj._left + 'px';
                if (offy) domEle.style.top = aniObj._top + 'px';
                if (offopt) domEle.style.opacity = aniObj._opacity;
                if (offw) domEle.style.width = aniObj._width + "px";
                if (offh) domEle.style.height = aniObj._height + "px";

                if(offdeg){
                    var transtr = 'rotate(' + aniObj._rotate + 'deg)';
                    domEle.style.webkitTransform = transtr;
                    domEle.style.transform = transtr;
                }

                aniObj._isRunning = false;
                if (aniFrame.complete) {
                    aniFrame.complete.apply(aniObj, aniObj._endArgs);
                }
                frames.splice(i, 1);
                aniNums--;
                continue;
            } else {
                if (curTime < st) {
                    aniFrame.st = curTime;
                } else {
                    var moveVal = aniFrame.moveFunc(curTime - st, 0, 1, duration);
                    if (offtx) aniObj._transformX = aniFrame.btx + offtx * moveVal;
                    if (offty) aniObj._transformY = aniFrame.bty + offty * moveVal;
                    if (offsx) aniObj._scaleX = aniFrame.bsx + offsx * moveVal;
                    if (offsy) aniObj._scaleY = aniFrame.bsx + offsy * moveVal;
                    if (offtx || offty || offsx || offsy) {
                        var transtr = 'translate3d(' + aniObj._transformX + 'px, ' + aniObj._transformY + 'px, 0) scale3d(' + aniObj._scaleX + ', ' + aniObj._scaleY + ', 1)';
                        domEle.style.webkitTransform = transtr;
                        domEle.style.transform = transtr;
                    }
                    if (offx) {
                        aniObj._left = aniFrame.bx + offx * moveVal;
                        domEle.style.left = aniObj._left + 'px';
                    }
                    if (offy) {
                        aniObj._top = aniFrame.by + offy * moveVal;
                        domEle.style.top = aniObj._top + 'px';
                    }
                    if (offopt) {
                        aniObj._opacity = aniFrame.bopt + offopt * moveVal;
                        domEle.style.opacity = aniObj._opacity;
                    }
                    if (offw) {
                        aniObj._width = aniFrame.bw + offw * moveVal;
                        domEle.style.width = aniObj._width + "px";
                    }
                    if (offh) {
                        aniObj._height = aniFrame.bh + offh * moveVal;
                        domEle.style.height = aniObj._height + "px";
                    }

                    if(offdeg){
                        aniObj._rotate = aniFrame.bdeg + offdeg * moveVal;
                        var transtr = 'rotate(' + aniObj._rotate + 'deg)';
                        domEle.style.webkitTransform = transtr;
                        domEle.style.transform = transtr;
                    }
                }
            }

            i++;
            //            var etime = Date.now();
            //            if (domEle.className === "__focus")
            //                console.log("frame Time", etime-stime);
        }
    }

    function _timerUpdate (curTime, frames) {
        var i = 0,
            aniNums = frames.length;

        while (i < aniNums) {
            var aniFrame = frames[i],
                aniObj = aniFrame.aniObj,
                st = aniFrame.st,
                update = aniObj._update,
                finish = aniObj._endFunc,
                duration = aniFrame.duration;

           if (curTime >= st + duration) {
                aniObj._isRunning = false;
                update && update.call(aniObj._target, 1, duration);
                if (finish) {
                   finish.apply(aniObj._target, aniObj._endArgs);
                }
                frames.splice(i, 1);
                aniNums--;
                continue;
           } else {
               if (curTime < st) {
                   aniFrame.st = curTime;
               } else if (update)  {
//                var moveVal = aniObj._easing(curTime - st, 0, 1, duration);
                    var moveVal = curTime - st;
                    aniObj._now = moveVal;
                    update.call(aniObj._target, moveVal/duration, moveVal);
               }
            }
            i++;
        }
    }

//    if (platform_webcore) {
//        frameAniList = [];
//        frameTimmer = setInterval(function () {
//            _frameUpdate(frameCounter, frameAniList);
//            frameCounter++;
//        }, 0);
//    } else {
        tickAniList = [];
        tickTimmer = setInterval(function () {
            var now = Date.now();
            _frameUpdate(now, tickAniList);
//            var t1 = Date.now();
            _timerUpdate(now, timerList);
//            var t2 = Date.now();
//            console.log("frametime", t2-now);
        }, 0);
//    }

    function tv_animation(ele) {
        this._node = ele;
        this._opacity = 1;
        this._scaleX = 1;
        this._scaleY = 1;
        this._width = 1;
        this._height = 1;
        this._left = 0;
        this._top = 0;
        this._transformX = 0;
        this._transformY = 0;
        this._rotate = 0;
        this._endOpacity = 1;
        this._endScaleX = 1;
        this._endScaleY = 1;
        this._endLeft = 0;
        this._endTop = 0;
        this._endTransformX = 0;
        this._endTransformY = 0;
        this._endRotate = 0;
        this._endWidth = 0;
        this._endHeight = 0;
        this._endFunc = null;
        this._isEnd = false;
        this._isStop = false;
        this._isRunning = false;
        this._duration = default_duration;
        this._moveFunc = defaultMoveFunc;
        this._isVisible = true;
        this._flag = 0;
        this._endArgs = [];
    }

    tv_animation.prototype = {
        /**
         *  原型 1：animate( props, duration, easing, complete )
         *  {object} props: CSS属性集
         *  {int} duration: 毫秒数
         *  {function} easing: 动画曲线函数
         *  {function} complete: 动画结束后的回调函数
         *
         *  原型 2：animate( props, options )
         *  {object} props: CSS属性集
         *  {onject} options: 包含 duration、easing、complete 的选项集
         */
        animate: function (props, duration, easing, complete) {
            var aniRunObj = {}, offset;

            // 若为原型2，则从 options 提取 duration、easing、complete
            if (typeof duration === 'object') {
                var opt = duration;
                duration = opt.duration;
                easing = opt.easing;
                complete = opt.complete;
            }

            // 若duration不为数字，则设为默认值
            if (!isNumber(duration)) {
                duration = this._duration;
            }

            // 若complete不为函数，则设为null
            if (complete instanceof Function) {
                aniRunObj.complete = complete;
            } else {
                aniRunObj.complete = this._endFunc;
            }

            // 若easing不为函数，则设为默认函数
            if (easing instanceof Function) {
                aniRunObj.moveFunc = easing;
            } else {
                aniRunObj.moveFunc = this._moveFunc;
            }

            // @Mark
            if (isNumber(props.left)) {
                if (duration === 0) {
                    this.setLeft(props.left);
                } else {
                    offset = props.left - this._left;
                    if (offset) {
                        this._endLeft = props.left;
                        aniRunObj.bx = this._left;
                        aniRunObj.offx = offset;
                    }
                }
            }

            // @Mark
            if (isNumber(props.top)) {
                if (duration === 0) {
                    this.setTop(props.top);
                } else {
                    offset = props.top - this._top;
                    if (offset) {
                        this._endTop = props.top;
                        aniRunObj.by = this._top;
                        aniRunObj.offy = offset;
                    }
                }
            }

            // @Mark
            if (isNumber(props.transformX)) {
                if (duration === 0) {
                    this.setTransformX(props.transformX);
                } else {
                    offset = props.transformX - this._transformX;
                    if (offset) {
                        this._endTransformX = props.transformX;
                        aniRunObj.btx = this._transformX;
                        aniRunObj.offtx = offset;
                    }
                }
            }

            // @Mark
            if (isNumber(props.transformY)) {
                if (duration === 0) {
                    this.setTransformY(props.transformY);
                } else {
                    offset = props.transformY - this._transformY;
                    if (offset) {
                        this._endTransformY = props.transformY;
                        aniRunObj.bty = this._transformY;
                        aniRunObj.offty = offset;
                    }
                }
            }

            // @Mark
            if(isNumber(props.rotate)){
                if(duration === 0){
                    this.setRotate(pros.rotate);
                }else{
                    deg = props.rotate - this._rotate;
                    if(deg){
                        this._endRotate = props.rotate;
                        aniRunObj.bdeg = this._rotate;
                        aniRunObj.offdeg = deg;
                    }
                }
            }


            if (isNumber(props.width)) {
                if (duration === 0) {
                    this.setWidth(props.width);
                } else {
                    offset = props.width - this._width;
                    if (offset) {
                        this._endWidth = props.width;
                        aniRunObj.bw = this._width;
                        aniRunObj.offw = offset;
                    }
                }
            }
            if (isNumber(props.height)) {
                if (duration === 0) {
                    this.setHeight(props.height);
                } else {
                    offset = props.height - this._height;
                    if (offset) {
                        this._endHeight = props.height;
                        aniRunObj.bh = this._height;
                        aniRunObj.offh = offset;
                    }
                }
            }
            if (isNumber(props.opacity)) {
                if (duration === 0) {
                    this.setOpacity(props.opacity);
                } else {
                    offset = props.opacity - this._opacity;
                    if (offset) {
                        this._endOpacity = props.opacity;
                        aniRunObj.bopt = this._opacity;
                        aniRunObj.offopt = offset;
                    }
                }
            }
            if (isNumber(props.scaleX)) {
                if (duration === 0) {
                    this.setScaleX(props.scaleX);
                } else {
                    offset = props.scaleX - this._scaleX;
                    if (offset) {
                        this._endScaleX = props.scaleX;
                        aniRunObj.bsx = this._scaleX;
                        aniRunObj.offsx = offset;
                    }
                }
            }
            if (isNumber(props.scaleY)) {
                if (duration === 0) {
                    this.setScaleY(props.scaleY);
                } else {
                    offset = props.scaleY - this._scaleY;
                    if (offset) {
                        this._endScaleY = props.scaleY;
                        aniRunObj.bsy = this._scaleY;
                        aniRunObj.offsy = offset;
                    }
                }
            }

            this._isEnd = false;
            this._isStop = false;
            this._flag = Date.now();

            // 若时长为0，则直接运行回调函数
            if (duration === 0 && aniRunObj.complete) {
                aniRunObj.complete.apply(this, this._endArgs);
                return;
            }

            aniRunObj.aniObj = this;
            aniRunObj.flag = this._flag;
//            if (!platform_webcore) {

            // 加入动画队列
            aniRunObj.st = Date.now();
                aniRunObj.duration = duration;
                tickAniList.push(aniRunObj);
//            } else {
//                aniRunObj.st = frameCounter;
//                aniRunObj.duration = duration >> 4;
//                frameAniList.push(aniRunObj);
//            }
            this._isRunning = true;

            return this;
        },
        end: function () {
            this._isEnd = true;
            return this;
        },
        stop: function () {
            this._isStop = true;
            return this;
        },
        setEasing: function (mode, type) {
            if (Tween_Algorithm[mode] && Tween_Algorithm[mode][type])
                this._moveFunc = Tween_Algorithm[mode][type];
            return this;
        },
        setDuration: function (duration) {
            if (isNumber(duration)) {
                this._duration = duration;
            }
            return this;
        },
        // @Mark
        setEndFunc: function (endFunc) {
            if (endFunc instanceof Function) {
                this._endFunc = endFunc;
                var argLen = arguments.length;
                if (argLen > 1) {
                    this._endArgs = arguments.slice(1);
                } else {
                    this._endArgs = [];
                }
            } else {
                this._endFunc = null;
            }
            return this;
        },
        setTop: function (y) {
            if (isNumber(y)) {
                this._top = y;
                if (this._node) {
                    this._node.style.top = y + 'px';
                }
            }
            return this;
        },
        setTransformY: function (y) {
            if (isNumber(y)) {
                this._transformY = y;
                if (this._node) {
                    var transtr = 'translate3d(' + this._transformX + 'px, ' + y + 'px, 0) scale3d(' +
                        this._scaleX + ', ' + this._scaleY + ', 1)';
                    this._node.style.webkitTransform = transtr;
                    this._node.style.transform = transtr;
                }
            }
            return this;
        },
        setRotate: function(deg){
            if(isNumber(deg)){
                this._rotate = deg;
                if(this._node){
                    var transtr = 'rotate(' + this._rotate + 'deg)';
                    this._node.style.webkitTransform = transtr;
                    this._node.style.transform = transtr;
                }
            }
        },
        setLeft: function (x) {
            if (isNumber(x)) {
                this._left = x;
                if (this._node) {
                    this._node.style.left = x + 'px';
                }
            }
            return this;
        },
        setTransformX: function (x) {
            if (isNumber(x)) {
                this._transformX = x;
                var transtr = 'translate3d(' + x + 'px, ' + this._transformY + 'px, 0) scale3d(' +
                    this._scaleX + ', ' + this._scaleY + ', 1)';
                this._node.style.webkitTransform = transtr;
                this._node.style.transform = transtr;
            }
            return this;
        },
        setScaleX: function (scaleX) {
            if (isNumber(scaleX)) {
                this._scaleX = scaleX;
                if (this._node) {
                    var transtr = 'translate3d(' + this._transformX + 'px, ' + this._transformY + 'px, 0) scale3d(' + this._scaleX + ', ' + this._scaleY + ', 1)';
                    this._node.style.webkitTransform = transtr;
                    this._node.style.transform = transtr;
                }
            }
            return this;
        },
        setScaleY: function (scaleY) {
            if (isNumber(scaleY)) {
                this._scaleY = scaleY;
                if (this._node) {
                    var transtr = 'translate3d(' + this._transformX + 'px, ' + this._transformY + 'px, 0) scale3d(' + this._scaleX + ', ' + this._scaleY + ', 1)';
                    this._node.style.webkitTransform = transtr;
                    this._node.style.transform = transtr;
                }
            }
            return this;
        },
        setOpacity: function (opacity) {
            if (isNumber(opacity)) {
                this._opacity = opacity;
                var opt = this._opacity;
                if (this._node) {
                    this._node.style.opacity = opt;
                }
            }
            return this;
        },
        setWidth: function (width) {
            if (isNumber(width)) {
                this._width = width;
                if (this._node) {
                    this._node.style.width = this._width + "px";
                }
            }
            return this;
        },
        setHeight: function (height) {
            if (isNumber(height)) {
                this._height = height;
                if (this._node) {
                    this._node.style.height = this._height + "px";
                }
            }
            return this;
        },
        //        setColor: function (color) {
        //            if (color instanceof Array && color.length === 4) {
        //                this._color = color;
        //                if (this._node) {
        //                    this._node.style.color = "rgba(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + "," + color[3] + ")";
        //                }
        //            }
        //            return this;
        //        },
//        setMode: function (mode) {
//            if (mode === 0 || mode === 1) {
//                this._aniMode = mode;
//            } else {
//                this._aniMode = defaultMode;
//            }
//            return this;
//        },
        getTime: function () {
//            if (this._aniMode === 1) {
//                return frameCounter;
//            } else {
                return Date.now();
//            }
        },
        // @Mark
        hide: function (isAnimate) {
            if (!this._isVisible) {
                return;
            }
            this._isVisible = false;

            if (isAnimate) {
                this._endFunc = function () {
                    this._node.style.display = "none";
                    this._endFunc = null;
                };
                this.animate({
                    opacity: 0
                });
            } else {
                this._node.style.display = "none";
            }
        },

        // @Mark
        show: function (isAnimate) {
            if (this._isVisible) {
                return;
            }
            this._isVisible = true;

            if (isAnimate) {
                this._node.style.display = "block";
                this.animate({
                    opacity: 1
                });
            } else {
                this._node.style.display = "block";
            }
        },
        isVisible: function () {
            return this._isVisible;
        }
    };


    function tv_timer (target, update, finish, duration) {
        if (!target) return;

        this._target = target;
        if (isNumber(duration)) {
            this._duration = duration;
        }
        if (update instanceof Function) {
            this._update = target.onTimer;
        }
        if (finish instanceof Function) {
            this._endFunc = finish;
        }
        this._isRunning = false;
        this._now = 0;
    }

    tv_timer.prototype = {
        start: function () {
            if (this._isRunning) return;

            var runObj = {};
            runObj.st = Date.now();
            runObj.duration = this._duration;
            runObj.aniObj = this;
            this._isRunning = true;
            this._now = 0;
            timerList.push(runObj);
        },
        stop: function () {
            this._isRunning = false;
            for (var i = 0, len = timerList.length; i< len; i++) {
                if (timerList[i].aniObj === this) {
                    timerList.splice(i, 1);
                    break;
                }
            }
        },
        status: function () {
            return this._isRunning ? 1 : 0;
        },
        setDuration: function (duration) {
            if (isNumber(duration)) {
                this._duration = duration;
            }
        }
    };

    return {
        animation: tv_animation,
        createAnimation: function (ele) {//console.log(ele instanceof HTMLElement)
            if (typeof ele !== "undefined" && ele instanceof HTMLElement) {
                return new tv_animation(ele);
            } else {
                return null;
            }
        },
        createTimer: function (target, update, finish, duration) {
            if (!target || !target.onTimer) {
                return null;
            }
            return new tv_timer(target, update, finish, duration);
        },
        reset: function () {
//            if (platform_webcore) {
//                clearInterval(frameTimmer);
//                frameAniList = [];
//                frameTimmer = setInterval(function () {
//                    _frameUpdate(frameCounter, frameAniList);
//                    frameCounter++;
//                }, 0);
//            } else {
                tickAniList = [];
                timerList = [];
                clearInterval(tickTimmer);
                tickTimmer = setInterval(function () {
                    var now = Date.now();
                    _frameUpdate(now, tickAniList);
                    _timerUpdate(now, timerList);
                }, 0);
//            }
        }
    }
})(window.Zepto);
