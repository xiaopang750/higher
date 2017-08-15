import _ from 'underscore';
import Base from '../base/index';
import Firedata from '../firedata/index.js';
import Toast from '../toast/index.js';

let oToast = new Toast();
let oFd = new Firedata();
let base = blitz.load('base');

const playSites = [
  'acfun',
  'bilibili',
  'sohu',
  'le',
  'wasu',
  'cztv'
];

class videoPlay extends Base {
  constructor(scope) {
    super(scope);
    this.events();
  }
  events() {
    let self = this;
    ep.on('autoNext', () => {
      console.log(`try to play next video error status: ${self.errors}`);
      if (!self.errors) {
        oToast.show('自动播放下一集');
        self.getParamToPlay(1);
      }
    });
  }
  getPlayUrl(sources) {
    let matchedInfo = sources.filter(info => info.siteSource === this.chooseSource)[0];
    let url = matchedInfo ? matchedInfo.siteLink : sources[0].siteLink;
    return url;
  }
  getParamToPlay(number = 0) {
    let nowIndex = _.findIndex(this.playList, {
      episode: this.ep
    });
    let newIndex = nowIndex + number;
    let nowInfo = this.playList[newIndex];
    if (nowInfo) {
      let {title, sources} = nowInfo;
      let playUrl = this.getPlayUrl(sources);
      this.play(playUrl, title);
      this.ep = nowInfo.episode;
    }
  }
  getPlayEpisode(sitePerEpisode, title, ctg) {
    let playList = _.map(sitePerEpisode, (item, key) => {
      let info = {};
      let parseTitle;
      if (ctg === 'tv' || ctg === 'comic') {
        parseTitle = `${title} 第${key}集`;
      } else if (ctg === 'zongyi') {
        parseTitle = `${title} 第${key}期`;
      } else {
        parseTitle = title;
      }
      info.episode = key;
      info.title = parseTitle;
      info.sources = item;
      return info;
    });
    return playList;
  }
  playEp({ep, sitePerEpisode, chooseSource, ctg, aid, title}) {
    console.log(chooseSource);
    let url;
    let sourceInfo = sitePerEpisode[ep];
    if (sourceInfo.length > 0) {
      let matchedInfo = sourceInfo.filter(info => info.siteSource === chooseSource)[0];
      if (!matchedInfo) {
        chooseSource = sourceInfo[0].siteSource;
      }
      url = matchedInfo ? matchedInfo.siteLink : sourceInfo[0].siteLink;
    }
    if (/iqiyi.com/.test(url)) {
      url = url.replace('www.iqiyi.com', 'm.iqiyi.com');
      base.startPage('http://newcdn.tvall.cn/20170516135919/test.html');
      // base.startPage({
      //   blitzOpenType: 'h5',
      //   data: {
      //     url: 'http://newcdn.tvall.cn/20170516133403/test.html',
      //     uaPlatform: 'iPhone; CPU iPhone OS 9_1 like Mac OS X'
      //   }
      // });
    } else {
      this.errors = null;
      if (ep.indexOf('更新') === -1 && ep.indexOf('全') === -1) {
        ep = ep.match(/\d/g).join('');
      }
      if (!ep || !sitePerEpisode) {
        return;
      }
      this.playList = this.getPlayEpisode(sitePerEpisode, title, ctg);
      this.ep = ep;
      this.chooseSource = chooseSource;
      this.getParamToPlay();
    }
  }
  play(siteUrl, title) {
    let self = this;
    let href = siteUrl.match(/(http|https):\/\/[^/]+/)[0];
    let nowPagePlayer = window.qiguoPlayer;
    for (let i = 0; i < playSites.length; i += 1) {
      let site = playSites[i];
      let reg = new RegExp(site);
      if (reg.test(href)) {
        let getDefinition = require(`../../playjs/${site}.js`);
        console.log(`match to play: ${site}`);
        nowPagePlayer.init();
        nowPagePlayer.watting();
        getDefinition(siteUrl)
          .then((playUrl) => {
            console.log(`now play url is: ${playUrl}`);
            // loading过程中用户也可能按返回键 回退后fetch过程还会执行
            // 但是不应该吊起播放了
            let isCanPlay = nowPagePlayer._focus_flag;
            console.log(`is can play: ${isCanPlay}`);
            if (isCanPlay) {
              nowPagePlayer.setTitle(title);
              nowPagePlayer.play(playUrl);
              oFd.event('webos', 'playSuc');
            }
          })
          .catch((e) => {
            console.log(`can not play this url ${siteUrl}`);
            oFd.event('webos', 'playFail', {url: siteUrl});
            self.errors = true;
            nowPagePlayer.end();
            moye.utils.setDefaultKeyEvent(true);
            oToast.show('播放地址获取失败');
          });
        break;
      }
    }
  }
}

export default videoPlay;
