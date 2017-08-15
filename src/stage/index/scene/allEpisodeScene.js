import AllEpisode from '../../../component/allEpisode/index';

class allEpisodeScene extends scene {
  constructor(scope) {
    super(scope);
    this.AllEpisode = new AllEpisode();
    this.nowPageId = 'allEpisode';
  }

  onCreate(data = {}) {
    let self = this;
    this.setContentView(require('../../../res/tpl/allEpisode.jade'), data, 'allEpisode', {}, () => {
      // 页面渲染完成异步回调
      self.AllEpisode.render(data);
      console.log('set allEpisode view success!');
      let oLayerAll = FocusEngine.getWidgetById('allEpisode');
      ep.on('onVideoplay', () => {
        oLayerAll.disable();
      });
      ep.on('onEndplay', () => {
        oLayerAll.enable();
      });
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

export default allEpisodeScene;
