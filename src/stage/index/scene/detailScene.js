let Detail = require('../../../component/detail/index.js');

class detailScene extends scene {
  constructor(scope) {
    super(scope);
    this.Detail = new Detail();
    this.nowPageId = 'detail';
  }

  onCreate(data = {}) {
    let self = this;
    this.moye.utils.setDefaultKeyEvent(true);
    this.setContentView(require('../../../res/tpl/detail.jade'), data, 'detail', {}, () => {
      // 页面渲染完成异步回调
      self.Detail.load(data);
      let oLayer = FocusEngine.getWidgetById('detail');
      ep.on('onVideoplay', () => {
        oLayer.disable();
      });
      ep.on('onEndplay', () => {
        oLayer.enable();
      });
      console.log('set content view success!');
    });
  }

  onBack() {
    if (window.qiguoPlayer._focus_flag) {
      window.qiguoPlayer.end(false);
      return true;
    } else {
      return false;
    }
  }
}

export default detailScene;
