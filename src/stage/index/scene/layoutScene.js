import VideoPlayer from '../../../component/player/index.js';
import VideoPlayManage from '../../../component/videoPlayManage/index.js';
import indexScene from './indexScene';
import Firedata from '../../../component/firedata/index.js';

class PlayScene extends scene {
  constructor(scope) {
    super(scope);
    this.nowPageId = 'layout';
    this.Fd = new Firedata();
  }

  onCreate(data) {
    window.qiguoPlayer = new VideoPlayer();
    window.qiguoPlayerManage = new VideoPlayManage();
    this.Fd.event('webos', 'startApp');
    this.Fd.pageView('webos-layout');
    this.setContentView(require('../../../res/tpl/layout.jade'), {}, 'layout', {}, () => {});
  }

  onOK(e) {
    let ctg = e.target.con.getAttribute('data-ctg');
    moye.curScene.showScene(indexScene, {ctg});
  }
}

export default PlayScene;
