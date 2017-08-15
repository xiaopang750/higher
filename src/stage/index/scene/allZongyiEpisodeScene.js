import AllZongyiEpisode from '../../../component/allZongyiEpisode/index';

class allZongyiEpisodeScene extends scene {
  constructor(scope) {
    super(scope);
    this.AllZongyiEpisode = new AllZongyiEpisode();
    this.nowPageId = 'allZongyiEpisode';
  }

  onCreate(data = {}) {
    let self = this;
    this.setContentView(require('../../../res/tpl/allZongyiEpisode.jade'), data, 'allZongyiEpisode', {}, () => {
      // 页面渲染完成异步回调
      self.AllZongyiEpisode.render(data);
      console.log('set AllZongyiEpisode view success!');
      let oLayerAllZongyi = FocusEngine.getWidgetById('allZongyiEpisode');
      ep.on('onVideoplay', () => {
        oLayerAllZongyi.disable();
      });
      ep.on('onEndplay', () => {
        oLayerAllZongyi.enable();
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

export default allZongyiEpisodeScene;
