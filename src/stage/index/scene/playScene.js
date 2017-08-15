import VideoPlayer from '../../../component/player/index.js';


class PlayScene extends scene {
  constructor(scope) {
    super(scope);
    this.nowPageId = 'play';
  }
  onCreate(data) {
    console.log('on create');
    this.setContentView(require('../../../res/tpl/play.jade'), {}, 'play', {}, () => {
      // let oLayer = FocusEngine.getWidgetById('play');
      self.videoPlayer = window.videoPlayer = new VideoPlayer();
      self.videoPlayer.init();
      ep.on('onVideoplay', function () {
        console.log('================123123123');
      });
      ep.on('onEndplay', function () {
        console.log('================123123123');
      });
      self.videoPlayer.setTitle('fandeji');
      self.videoPlayer.watting();
      self.videoPlayer.play('https://cn-sh6-cc.acgvideo.com/vg2/c/02/12131254-1-hd.mp4?expires=1488798300&ssig=jvYo7YLVnHng8OIBAuSnxg&oi=1995938950&nfa=bis14H4eAMzDbQqu90Ft2w==&dynamic=1');
      // self.videoPlayer.onPlay = () => {
      //   oLayer.disable();
      // };
      // self.videoPlayer.endPlay = () => {
      //   oLayer.enable();
      // };
      // self.videoPlayer.play('http://116.242.0.78/ws.acgvideo.com/8/d2/12877245-1.mp4?wsTime=1483705220&wsSecret2=071c2e842423c1dec1002b8e8bcc23e8&oi=1995935463&rate=140&wshc_tag=0&wsts_tag=586f6905&wsid_tag=76f78ee7&wsiphost=ipdbm');
      // setTimeout(() => {
      //   self.videoPlayer.init();
      //   self.videoPlayer.play('http://cn-gdjm6-dx.acgvideo.com/vg4/4/ad/12877245-1.mp4?expires=1483764600&ssig=Czt0HgfXUKQKGeUJoUrD6w&oi=248635535&nfa=BaDS8BUFZDb8iKo4Vfwarw==&dynamic=1');
      // }, 3000);

      // setTimeout(() => {
      //   self.videoPlayer.end();
      // }, 10000);
      //
      // setTimeout(() => {
      //   self.videoPlayer.init();
      //   self.videoPlayer.play('http://116.242.0.78/ws.acgvideo.com/8/d2/12877245-1.mp4?wsTime=1483705220&wsSecret2=071c2e842423c1dec1002b8e8bcc23e8&oi=1995935463&rate=140&wshc_tag=0&wsts_tag=586f6905&wsid_tag=76f78ee7&wsiphost=ipdbm');
      // }, 20000);
    });
  }
  onBack() {
    // 用 this.videoPlayer 在电视上是 undefined?
    if (window.videoPlayer._focus_flag) {
      window.videoPlayer.end();
    }
  }
  onOK(e) {
    console.log('234234234234');
    let href = e.target.con.getAttribute('data-href');
    if (href) {
      let base = blitz.load('base');
      base.startPageForResult({
        blitzOpenType: 'h5',
        data: {
          url: 'http://m.acfun.cn/v/?ac=2573650',
          pageName: 'acfun'
        }
      }, (data) => {
        console.log(`Result=${JSON.stringify(data)}`);
        self.videoPlayer.init();
        self.videoPlayer.play(data.result.data);
      });
    }
  }
}

export default PlayScene;
