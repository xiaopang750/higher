/**
 * 视频播放器
 * 包括播放进度条和覆盖在视频上显示的内容
 */
import Loading from '../loading/index';

const KeyCode = moye.keyCodes;
let oLoading = new Loading();
let base = blitz.load('base');

// 提前加载显示背景时间图标
let Img = new Image();
let seekImg = '../../res/img/seek.png';
Img.src = seekImg;

// 将秒数转换为界面上显示的数字：7650 - 01:50:50
function secondsToString(s) {
  if (s == null || isNaN(s) || s < 0) {
    return '';
  } else {
    let h = parseInt(s / 3600, 10);
    let m = parseInt((s - 3600 * h) / 60, 10);
    let second = parseInt(s - 3600 * h - 60 * m, 10);
    if (h < 10) {
      h = `0${h}`;
    }
    if (m < 10) {
      m = `0${m}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }
    return `${h}:${m}:${second}`;
  }
}

const MOVE_SECONDS = 30; // 快进一次进度走30s
class VideoView {
  /**
   * 构造函数
   * @param container {dom} 容器节点
   * @param video {dom} video元素
   * @param vUI {string} 覆盖在video上的ui
   */
  constructor() {
      // 属性列表
    this._seek_bar = null;
    this._seek_text = null;
    this._play_bar = null;
    this._$node = null;
    this._total_seconds = null;
    this._now_play_seconds = null;
    this._loaded_seconds = null;
    this._tmp_time = null;
    this._bar_length = null;
    this._forward_length = null;
    this._confirm_flag = null; // 确认快进标志，快进、退行为（左右按键事件）停止0.8S，后会执行播放器重定位
    this._focus_flag = null; // 焦点标志，焦点标志不在播放器中不会响应按键事件
    this._hideBar_flag = null; // 隐藏进度条标志，无动作3s后隐藏，快进、退完成后0.8S后隐藏。
    this._tiktok_flag = null; // 时钟标志，1s刷新一次播放的时间
    this._longPress_id = null;
    this._isPlaying = null;
    this._video = null;
    this.inited = false;
    this.full = false;
    // this.init(container, video, vUI);
  }

  /**
   * 初始化
   */
  init(container, video, vUI) {
    container = $('#layout-video-wrapper') || container;
    video = container.find('#video') || video;
    vUI = container.find('#video-ui') || vUI;
    container = container[0];
    video = video[0];
    vUI = vUI[0];
    if (this.inited) return;
    this.inited = true;
    let dom = document.createElement('div');
    dom.className = '__progress_bar';
    let html = `
      <span class='__play_time'></span>
      <div class='__bar_bg'></div>
      <div class='__bar_load'></div>
      <div class='__bar_play'>
        <img class='__seek_bar' src='${seekImg}'/>
        <span></span>
      </div>
      <span class='__end_time'></span>
    `;
    dom.innerHTML = html;
    container.appendChild(dom);

    this._video = video;
    this.videoUI = vUI;
    this.viewNode = dom;
    this.container = container;
    this.UiTitle = this.videoUI.querySelector('.video-ui-title');
    this.initData();
    this.initView();
    this.showOrHideProgressBar(true);
    this.bind(container);
    this.events();
  }
  setSrc(src) {
    if (src) {
      this._video.src = src;
    }
  }
  events() {
    let self = this;
    // 成功获取播放长度信息
    this._video.addEventListener('canplay', () => {
      self.initData();
      oLoading.hide();
      self.canShowBar = true;
    }, false);
    this._video.addEventListener('ended', () => {
      console.log('ended');
      self.end();
      self.onEnd && self.onEnd();
    }, false);
    this._video.addEventListener('play', () => {
      console.log('play');
      oLoading.hide();
    }, false);
    // this._video.addEventListener('error', () => {
    //   self.end();
    // }, false);
  }

  /**
   * 事件绑定
   */
  bind(container) {
    document.addEventListener('keydown', (e) => {
      console.log(this._focus_flag);
      console.log(`_focus_flag:${this._focus_flag}`);
      if (!this._focus_flag) {
        return;
      }
      switch (e.keyCode) {
        case KeyCode.LEFT:
          if (this.getProgressBarState() === 'inside') {
            this.showOrHideProgressBar(true);
          } else {
            this.showOrHideProgressBar(true);
            this.fastBackWard();
          }
          break;
        case KeyCode.RIGHT:
          if (this.getProgressBarState() === 'inside') {
            this.showOrHideProgressBar(true);
          } else {
            this.showOrHideProgressBar(true);
            this.fastForward();
          }
          break;
        case KeyCode.ENTER:
          this.showOrHideProgressBar(true);
          if (this._isPlaying) { this.pause(); } else {
            this.play();
          }
          break;
        default:
          break;
      }
    });
  }

  /**
   * 初始化影片信息
   */
  initData() {
    console.log(this._video);
    console.log(`init duration:${this._video.duration}`);
    this._total_seconds = this._video.duration;
    this._now_play_seconds = parseInt(this._video.currentTime, 10);
    this._loaded_seconds = 400;
  }

  /**
   * 初始化UI
   */
  initView() {
    this._play_bar = this.viewNode.querySelector('.__bar_play');
    this._seek_bar = this.viewNode.querySelector('.__seek_bar');
    this._seek_text = this.viewNode.querySelector('.__bar_play > span');
    this._now_text = this.viewNode.querySelector('.__play_time');
    this._end_text = this.viewNode.querySelector('.__end_time');
  }
  calc() {
    console.log('offsetWidth', this.viewNode.querySelector('.__bar_bg').offsetWidth);
    console.log('_forward_length', this._forward_length);
    console.log('textContent', secondsToString(parseInt(this._total_seconds, 10)));
    this._bar_length = parseInt(this.viewNode.querySelector('.__bar_bg').offsetWidth, 10);
    this._forward_length = (30 / this._total_seconds) * this._bar_length;
    // this._end_text.textContent = secondsToString(parseInt(this._total_seconds, 10));
  }
  /**
   * 快进一次
   */
  fastForward() {
    this.showOrHideSeekBar(true);
      // 快进到头
    if (this._now_play_seconds >= this._total_seconds) {
      this._now_play_seconds = this._total_seconds;
      return;
    }
      // 快进30s

    if (this._tmp_time === null) {
      this._tmp_time = this._now_play_seconds;
    }
    this._tmp_time += MOVE_SECONDS;
    if (this._tmp_time > this._total_seconds) {
      this._tmp_time = this._total_seconds;
    }
      // 更新进度条和seekbar
    this._seek_text.textContent = secondsToString(this._tmp_time);
    let width = this._bar_length * (this._tmp_time / this._total_seconds);
    this._play_bar.style.width = `${width}px`;

      // 快进快退停止后800ms, 会引起重新定位
    clearTimeout(this._confirm_flag);
    this._confirm_flag = setTimeout(() => {
      this.locate(true);
    }, 800);
  }

  /**
   * 快退一次
   */
  fastBackWard() {
    this.showOrHideSeekBar(true);
      // 快退到头
    if (this._now_play_seconds <= 0) {
      this._now_play_seconds = 0;
      return;
    }
      // 回退30s
    if (this._tmp_time === null) {
      this._tmp_time = this._now_play_seconds;
    }
    this._tmp_time -= MOVE_SECONDS;
    if (this._tmp_time < 0) {
      this._tmp_time = 0;
    }
      // 更新进度条和seekbar
    this._seek_text.textContent = secondsToString(this._tmp_time);
    let width = this._bar_length * (this._tmp_time / this._total_seconds);
    this._play_bar.style.width = `${width}px`;

      // 快进快退停止后800ms, 会引起重新定位
    clearTimeout(this._confirm_flag);
    this._confirm_flag = setTimeout(() => {
      this.locate(true);
    }, 800);
  }

  /**
   * 定点播放, 完成一次快进或快退时会调用该方法
   */
  locate(hide) {
    this._video.currentTime = this._tmp_time;
    if (hide) {
      this.showOrHideSeekBar(false);
      this.showOrHideProgressBar(false);
    }
    this._now_play_seconds = this._tmp_time;
    this._tmp_time = null;
    this.play();
  }

  /**
   * 播放，进度条的播放行为是开始递增当前播放进度
   */
  watting() {
    oLoading.show();
    this.container.style.display = 'block';
    this.focusOn();
  }
  setTitle(title) {
    this.UiTitle.style.display = 'block';
    this.UiTitle.innerHTML = title;
  }
  play(src) {
    try {
      this.calc();
      this.setSrc(src);
      this.tiktok();
      this._isPlaying = true;
      this.initData();
      this._video.play();
      this.videoUI.querySelector('.video-ui-pause').style.display = 'none';
      setTimeout(() => {
        this.UiTitle.style.display = 'none';
      }, 5000);
      console.log('start play');
      console.log(this._video);
      console.log(`now play url is: ${this._video.src}`);
      ep.emit('onVideoplay');
      // this.onPlay && this.onPlay();
      // FocusEngine.freeze();
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * 暂停，进度条的暂停行为是停止当前播放时间
   */
  pause() {
    clearTimeout(this._tiktok_flag);
    this._isPlaying = false;
    this._video.pause();
    this.videoUI.querySelector('.video-ui-pause').style.display = 'block';
  }

  end(autoNext = true) {
    this._video.pause();
    this._video.src = '';
    this.container.style.display = 'none';
    this._focus_flag = false;
    oLoading.hide();
    // FocusEngine.activate();
    moye.utils.setDefaultKeyEvent(false);
    base.setScreensaverState({
      state: 'on',
    });
    // this.endPlay && this.endPlay();
    ep.emit('onEndplay');
    if (autoNext) {
      ep.emit('autoNext');
    }
  }

  /**
   * 停止播放
   */
  stop() {
    clearTimeout(this._tiktok_flag);
    this._video.setAttribute('src', '');
    this.focusLeave();
      // todo: 播放器控制－停止
  }

  /**
   * 同步加载条进度
   */
  syncLoadedBar() {
      // todo: 同步加载位置
  }

  /**
   * 时钟函数
   * 播放状态下会1s递归调用一次, 刷新当前播放时间与进度条位置
   * 在播放状态下快进、快退会停止进度条位置更新, 播放时间仍会计时
   */
  tiktok() {
      // 刷新播放时间
      // this._now_play_seconds += 1;
    this._now_play_seconds = this._video.currentTime;
      // console.log('----------this._now_play_seconds------:' + this._now_play_seconds);
      // console.log('----------this._total_seconds---------:' + this._total_seconds);
    if (this._now_play_seconds > this._total_seconds) {
      return;
    }

    this._now_text.textContent = `${secondsToString(this._now_play_seconds)}/${secondsToString(this._total_seconds)}`;
      // console.log('this._tmp_time:' + this._tmp_time);
      // console.log('this._bar_length:' + this._bar_length);
      // console.log('this._now_play_seconds:' + this._now_play_seconds);
      // console.log('this._total_seconds:' + this._total_seconds);
    if (this._tmp_time === null) {
      let width = this._bar_length * (this._now_play_seconds / this._total_seconds);
          // console.log('width:'+width);
      this._play_bar.style.width = `${width}px`;
    }

    clearTimeout(this._tiktok_flag);
    this._tiktok_flag = setTimeout(() => {
      this.tiktok();
    }, 1000);
  }

  /**
   * 显示或隐藏定位条
   * 快进、快退时调用
   */
  showOrHideSeekBar(show) {
    if (show) {
      this._seek_bar.style.display = 'block';
      this._seek_text.style.display = 'block';
      this._seek_text.textContent = secondsToString(this._now_play_seconds);
    } else {
      this._seek_bar.style.display = 'none';
      this._seek_text.style.display = 'none';
    }
  }

  /**
   * 显示或隐藏进度条
   * 默认会在显示后5s执行隐藏,
   * 在隐藏时会调用一次播放进度同步, 确保与播放时间误差小于1s
   */
  showOrHideProgressBar(show) {
    if (!this.canShowBar) return;
    if (show) {
      if (this.getProgressBarState() === 'inside') {
              // 确保进度条隐藏时，添加播放进度同步操作
        this._now_play_seconds = this._video.currentTime;
      }
      this.viewNode.style.transition = 'bottom 0.2s ease';
      this.viewNode.style.bottom = '0';
          // this.videoUI.style.display = 'block';
      this.UiTitle.style.display = 'block';
      this.videoUI.querySelector('.video-ui-artist').style.display = 'block';

      clearTimeout(this._hideBar_flag);
      this._hideBar_flag = setTimeout(() => {
        this.showOrHideProgressBar(false);
      }, 5000);
    } else {
      this.showOrHideSeekBar(false);
      this.viewNode.style.transition = 'bottom 0.2s ease';
      this.viewNode.style.bottom = '-0.4rem';
          // this.videoUI.style.display = 'none';
      this.UiTitle.style.display = 'none';
      this.videoUI.querySelector('.video-ui-artist').style.display = 'none';
    }
  }

  /**
   * 当前进度条是否隐藏
   */
  getProgressBarState() {
    if (this.viewNode.style.bottom === '0px') { return 'outside'; } else {
      return 'inside';
    }
  }

  /**
   * 焦点获取，按键响应 flag 为 true
   */
  focusOn() {
    this._focus_flag = true;
    this.videoUI.style.display = 'block';
    base.setScreensaverState({
      state: 'off',
    });
    moye.utils.setDefaultKeyEvent(true);
  }

  /**
   * 焦点离开, 按键响应 flag 为 false
   */
  focusLeave() {
    this._focus_flag = false;
    this.videoUI.style.display = 'none';
    this.viewNode.parentNode.removeChild(this.viewNode);
  }

}

module.exports = VideoView;
