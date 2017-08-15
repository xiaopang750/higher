import Base from '../base/index';
// import getQueryStringByName from '../../res/js/utils/getQueryStringByName';
// import addParam from '../../res/js/utils/addParam';
// import GUID from '../../res/js/utils/guid';
import Firedata from '../firedata/index';

// let Guid = new GUID();

class allEpisode extends Base {
  constructor(scope) {
    super(scope);
    this.http = blitz.load('http');
    this.Fd = new Firedata();
  }

  render(data) {
    let {episodes, sitePerEpisode, tab = 0} = data;
    if (tab === this.tab) {
      return;
    }
    this.tab = tab;
    if (episodes) {
      this.episodes = episodes;
    } else {
      episodes = this.episodes;
    }
    if (sitePerEpisode) {
      this.sitePerEpisode = sitePerEpisode;
    }
    this.oEpisodes = $('.episodes');
    this.tpl = require('../../res/tpl/co_all_episode.jade');

    let sHtml = this.tpl({episodes, tab});
    this.oEpisodes.html(sHtml);
    FocusEngine.getWidgetById('episodes').reRender();
    this.addEvent();
    this.Fd.pageView(`webos-${data.ctg}-allEpisode`);
  }

  addEvent() {
    let self = this;
    this.listWrap = FocusEngine.getWidgetById('episodes');
    this.tabsWrap = FocusEngine.getWidgetById('tabs');
    this.listWrap.on('ok', (event) => {
      let okTarget = $(event.target.con);
      let ep = okTarget.attr('ep');
      if (ep) {
        window.qiguoPlayerManage.playEp({
          ep,
          sitePerEpisode: self.sitePerEpisode,
          source: self.source,
          ctg: window.videoInfo.ctg,
          aid: window.videoInfo.id,
          title: window.videoInfo.title
        });
      }
    });

    if (this.tabsWrap) {
      this.tabsWrap.on('focus', (e) => {
        let oCur = $(e.target.con);
        oCur.siblings().removeClass('selected');
        oCur.addClass('selected');
        self.render({tab: oCur.index()});
      });
    }
  }
}

module.exports = allEpisode;
