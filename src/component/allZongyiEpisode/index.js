import Base from '../base/index';
// import getQueryStringByName from '../../res/js/utils/getQueryStringByName';
// import addParam from '../../res/js/utils/addParam';
// import GUID from '../../res/js/utils/guid';
import Firedata from '../firedata/index';

// let Guid = new GUID();

class allZongyiEpisode extends Base {
  constructor(scope) {
    super(scope);
    this.fetchLock = false;
    this.http = blitz.load('http');
    this.Fd = new Firedata();
  }

  render(data, year = data.years[0]) {
    if (year === this.year) {
      return;
    }
    let tabWidth = $('.tabs>li').length * $('.tabs>li').width();
    $('.tabs').width(tabWidth);

    this.renderAllZongyiEpisode(year, data.id);
  }

  renderAllZongyiEpisode(year, id) {
    let self = this;
    self.fetchLock = true;
    let ctg = window.videoInfo.ctg;
    let vid = window.videoInfo.id;
    if (year !== this.year) {
      this.year = year;
      this.fetch({
        url: `http://video.browser.tvall.cn/api/episode/${ctg}/${vid}`,
        query: {
          year
        }
      }).then((data) => {
        self.fetchLock = false;
        let zongyiEpisodeData = data;
        self.tpl = require('../../res/tpl/co_all_zongyi_episode.jade');

        let sHtml = self.tpl({videos: zongyiEpisodeData.videos.slice(0).reverse()});
        self.zongyiEpisodes = self.zongyiEpisodes || $('#zongyiEpisodes>ul');
        self.zongyiEpisodes.html(sHtml);
        self.sitePerEpisode = zongyiEpisodeData.sitePerEpisode;
        FocusEngine.getWidgetById('zongyiEpisodes').reRender();
        self.addEvent();
        self.Fd.pageView(`webos-${ctg}-allEpisode`);
      }).catch((e) => {
        self.fetchLock = false;
      });
    }
  }

  addEvent() {
    let self = this;
    this.listWrap = FocusEngine.getWidgetById('zongyiEpisodes');
    this.tabsWrap = FocusEngine.getWidgetById('allZongyiYear');
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
        if (!self.fetchLock) {
          let oCur = $(e.target.con);
          let year = oCur.html();
          if (year) {
            self.renderAllZongyiEpisode(year);
          }
        }
      });
    }
  }
}

module.exports = allZongyiEpisode;
