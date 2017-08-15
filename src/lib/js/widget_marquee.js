(function(){
window.tv_marquee = {
        create: function (ele) {
          //console.log(ele);
                return new marquee(ele);
        }
    };

    var marginContent = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

    function marquee (ele,speed) {
        this._parent = ele.parentNode;
        this._width = ele.parentNode.clientWidth;
        this._originEle = ele;
        this._content = ele.innerHTML;
        this._getTrimContent();
        this._isRunning = false;
        if(!speed)
            this._speed = 20;
        this._isLoop = false;
    }

    marquee.prototype = {
        start: function (circle) {
            if (!this._content || !this._trimContent) return;

            if (this._isRunning === true) {
                this.stop();
            }

            if (!this._marqueeEle) {
                this._marqueeEle = document.createElement("div");
                this._marqueeEle.className = "tv_marquee";
                this._marqueeEle.appendChild(document.createElement('span'));
                //                this._marqueeEle.appendChild(document.createElement('span'));
                this._ani = new yunos_animation.animation(this._marqueeEle);
                this._ani.setEasing("Linear", "easeIn");
            }

            this._parent.removeChild(this._originEle);
            this._parent.appendChild(this._marqueeEle);
            var span = this._marqueeEle.children[0], width;
            span.innerHTML = this._content + marginContent
            //var position = $(span).css('position');
            var position = span.style.position;
            //$(span).css('position','absolute');
            span.style.position = 'absolute';
            width = span.scrollWidth;
            if(position){
                //$(span).css('position',position);
                span.style.position = position;
            }

            span.innerHTML += this._content + marginContent + this._content;
            this._ani.setTransformX(0);
            var that = this;
            this._ani.animate({
                transformX: -width
            }, {
                    duration: width*this._speed,
                    complete: function () {
                        if(circle)
                            that.start(true);
                    }
                });
            this._isRunning = true;
        },
        stop: function () {
            if (this._isRunning === true) {
                this._ani.stop();
                this._parent.removeChild(this._marqueeEle);
                this._originEle.innerHTML = this._content;
                this._parent.appendChild(this._originEle);
                this._isRunning = false;
                if (!this._trimContent) {
                    this.setStr(this._content);
                }
            }
        },
        setStr: function (str) {
            if (!str) return -2;
            if (str === this._content) return -3;

            this._content = str;
            if (!this._isRunning) {
                this._originEle.innerHTML = str;
                return this._getTrimContent();
            } else {
                return -4;
            }
        },
        _getTrimContent: function () {
            var ele = this._originEle,
                ruler = document.createElement("span"),
                str = this._content,
                ellipsisWidth,
                parentWidth;

            ruler.className = "tv_marquee";
            ruler.innerHTML = "...";
            this._parent.appendChild(ruler);

            //var position = $(ruler).css('position');
            //$(ruler).css('position','absolute');
            var position = ruler.style.position;
            ruler.style.position = 'absolute';
            ellipsisWidth = ruler.scrollWidth;


            parentWidth = this._width - ellipsisWidth;

            ruler.innerHTML = str;
            if (ruler.scrollWidth > parentWidth) {
                var size = str.length, min = 0, max = size;
                for (var i = 1; i < size; i++) {
                    ruler.innerHTML = str.substring(0, i);
                    if (ruler.scrollWidth > parentWidth) {
                        i--;
                        break;
                    }
                }
                if (i < size - 1) {
                    this._trimContent = str.substring(0, i) + "...";
                    ele.innerHTML = this._trimContent;
                    this._parent.removeChild(ruler);
                    ruler = null;
                    return i;
                } else {
                    this._trimContent = null;
                    this._parent.removeChild(ruler);
                    ruler = null;
                    return -1;
                }
            } else {
                this._parent.removeChild(ruler);
                ruler = null;
                this._trimContent = null;
                return -1;
            }
            if(position){
                 //$(ruler).css('position',position);
                ruler.style.position = position;
            }

        }
    }
})();
