import allEpisodeScene from '../../stage/index/scene/allEpisodeScene';
import allZongyiEpisodeScene from '../../stage/index/scene/allZongyiEpisodeScene';
// import Reclist from '../reclist/index';
import Base from '../base/index';
import getQueryStringByName from '../../res/js/utils/getQueryStringByName';
import addParam from '../../res/js/utils/addParam';
import GUID from '../../res/js/utils/guid';
import Firedata from '../firedata/index';
import Toast from '../toast/index.js';


let oToast = new Toast();
let Guid = new GUID();

class Detail extends Base {
  constructor(scope) {
    super(scope);
    this.fetchLock = false;
    this.http = blitz.load('http');
    this.Fd = new Firedata();
  }

  render(data, ctg, vid, year) {
    console.log('detail render start');
    // this.guid().then((guid) => {
    //   console.log(`GUID: ${guid}`);
    // }).catch((e) => {
    //   console.log(`GUID ERROR: ${JSON.stringify(e)}`);
    // });
    if (data) {
      this.sitePerEpisode = data.sitePerEpisode;
      this.episodes = data.episodes;
      this.years = data.years;
    }
    this.vid = vid;
    this.oDetail = $('.detail');
    ctg = ctg || this.ctg || 'movie';
    this.ctg = ctg;
    if (ctg === 'movie') {
      this.tpl = require('../../res/tpl/co_detail_movie.jade');

      // this.Reclist = new Reclist();
      // this.Reclist.render(data.recs, this);
    } else if (ctg === 'tv' || ctg === 'comic') {
      this.tpl = require('../../res/tpl/co_detail_tv.jade');
    } else if (ctg === 'zongyi' || ctg === 'jilupian') {
      this.tpl = require('../../res/tpl/co_detail_zongyi.jade');
    }
    let sHtml = this.tpl(data);
    this.oDetail.html(sHtml);

    if (year) {
      // zongyi&jilupian
      if (year === true) {
        year = this.years[0];
      }
      if (this.year !== year) {
        this.year = year;
        this.renderZongyiEpisode(year);
      }
    }
    FocusEngine.getWidgetById('detail').reRender();
    this.addEvent();
    console.log('detail render done');
  }

  renderZongyiEpisode(year) {
    let self = this;
    this.tpl = require('../../res/tpl/co_detail_zongyi_episode.jade');

    this.fetchLock = true;
    this.fetch({
      url: `${this.cfg.apiHost}/api/episode/${this.ctg}/${this.vid}`,
      query: {
        year,
        sort: 'desc'
      }
    }).then((data) => {
      self.fetchLock = false;
      let sHtml = self.tpl({videos: data.videos});
      self.zongyiEpisode = self.zongyiEpisode || $('#zongyiEpisode');
      self.zongyiEpisode.html(sHtml);
      self.sitePerEpisode = data.sitePerEpisode;
      FocusEngine.getWidgetById('detail').reRender();
      self.addEvent();
    }).catch((e) => {
      this.fetchLock = false;
    });
  }

  load(data = {}) {
    let self = this;
    let {vid, ctg} = data;
    self.vid = vid;
    self.ctg = ctg;
    this.fetch({
      url: `${this.cfg.apiHost}/api/detail/${ctg}/${vid}`
    }).then((datas) => {
      console.log(datas.episodes[0].episode);
      if (ctg === 'zongyi' || ctg === 'jilupian') {
        self.render(datas, ctg, vid, true);
      } else {
        self.render(datas, ctg, vid);
      }
      self.Fd.pageView(`webos-${ctg}-detail`);
    }).catch((e) => {
      console.log('no detail data');
      oToast.show('此视频不存在');
      moye.curScene.hideScene();
    });
  }

  addEvent() {
    let self = this;
    let ep;
    this.listWrap = FocusEngine.getWidgetById('co_detail');
    this.listWrap.on('ok', (event) => {
      let okTarget = $(event.target.con);
      if (okTarget.hasClass('play')) {
        // 播放
        ep = okTarget.attr('ep');
        let chooseSource = okTarget.attr('data-source');
        if (ep) {
          window.qiguoPlayerManage.playEp({
            ep,
            sitePerEpisode: self.sitePerEpisode,
            chooseSource,
            source: self.source,
            ctg: window.videoInfo.ctg,
            aid: window.videoInfo.id,
            title: window.videoInfo.title
          });
        }
      } else if (okTarget.hasClass('source-item')) {
        // 源切换
        let fromImg = okTarget.find('img');
        if (fromImg.attr('src')) {
          fromImg.attr('src', fromImg.attr('src').replace(/(-selected|-focused)?\.png/, '.png'));
        }
        let targetImg = okTarget.find('img');
        if (targetImg.attr('src')) {
          targetImg.attr('src', targetImg.attr('src').replace(/(-selected|-focused)?\.png/, '-focused.png'));
        }
        // 因为有updateSelectedSourceForEp的存在
        // 所以用this.preferredSource和this.source区分开
        // 前者表示用户意愿选择的源，后者表示实际可选源中选中的
        // if (updatePreferredSource) {
        //   this.preferredSource = target.attr('data-source');
        // }
        self.source = okTarget.attr('data-source');
      } else if (okTarget.hasClass('episode')) {
        // episode click
        if (okTarget.hasClass('special')) {
          moye.curScene.showScene(allEpisodeScene, {
            sitePerEpisode: self.sitePerEpisode,
            episodes: self.episodes,
            ctg: self.ctg
          });
        } else {
          ep = okTarget.attr('ep');
          if (ep) {
            window.qiguoPlayerManage.playEp({
              ep,
              sitePerEpisode: self.sitePerEpisode,
              chooseSource: self.source,
              ctg: window.videoInfo.ctg,
              aid: window.videoInfo.id,
              title: window.videoInfo.title
            });
          }
        }
      } else if (okTarget.hasClass('zongyi-episode')) {
        // zongyi-episode click
        ep = okTarget.attr('ep');
        if (ep) {
          window.qiguoPlayerManage.playEp({
            ep,
            sitePerEpisode: self.sitePerEpisode,
            chooseSource: self.source,
            ctg: window.videoInfo.ctg,
            aid: window.videoInfo.id,
            title: window.videoInfo.title
          });
        }
      } else if (okTarget.hasClass('zongyi-year') && okTarget.hasClass('special')) {
        moye.curScene.showScene(allZongyiEpisodeScene, {
          years: self.years,
          ctg: self.ctg,
          id: window.videoInfo.id
        });
      }
    });

    this.listWrap.on('focus', (e) => {
      let oCur = $(e.target.con);
      if (oCur.hasClass('source-item')) {
        // 源切换
        let from = oCur.parent().find('.selected');
        from.removeClass('selected');
        let fromImg = from.find('img');
        if (fromImg.attr('src')) {
          fromImg.attr('src', fromImg.attr('src').replace(/(-selected|-focused)?\.png/, '.png'));
        }
        oCur.addClass('selected');
        let targetImg = oCur.find('img');
        if (targetImg.attr('src')) {
          targetImg.attr('src', targetImg.attr('src').replace(/(-selected|-focused)?\.png/, '-focused.png'));
        }
        self.source = oCur.attr('data-source');
      } else if (oCur.hasClass('zongyi-year')) {
        if (!this.fetchLock) {
          oCur.siblings().removeClass('selected');
          if (!oCur.hasClass('special')) {
            let year = oCur.html();
            self.renderZongyiEpisode(year);
          }
        }
      }
    });

    this.listWrap.on('blur', (e) => {
      let oCur = $(e.target.con);
      let fromImg = oCur.find('img');
      if (oCur.hasClass('source-item') && fromImg.attr('src')) {
        fromImg.attr('src', fromImg.attr('src').replace(/(-selected|-focused)?\.png/, '-selected.png'));
      } else if (oCur.hasClass('zongyi-year')) {
        oCur.addClass('selected');
      }
    });
  }

  play(ep) {
    if (ep.indexOf('更新') === -1 && ep.indexOf('全') === -1) {
      ep = ep.match(/\d/g).join('');
    }
    if (!ep || !this.sitePerEpisode) {
      return;
    }
    let sourceInfo = this.sitePerEpisode[ep];
    if (sourceInfo.length > 0) {
      let source = this.source;
      let matchedInfo = sourceInfo.filter(info => info.siteSource === source)[0];
      if (!matchedInfo) {
        source = sourceInfo[0].siteSource;
      }
      let url = matchedInfo ? matchedInfo.siteLink : sourceInfo[0].siteLink;
      let ctg = window.videoInfo.ctg;
      let aid = window.videoInfo.id;
      let from = '';
      try {
        from = getQueryStringByName('from');
      } catch (e) {
        console.log(`getQueryStringByName error: ${e.message}`);
      }
      let shouldShowCover = /\.tvall\.cn/.test(url) ? 0 : 1;
      let playId = Guid.create().value.replace(/-/gi, '');
      let locUrl = addParam(url, {
        __ctg: ctg,
        __aid: aid,
        __ep: ep,
        __qiguo_tv_skip_page: 1,
        playfirst: source,
        __selected_source: source,
        __qiguo_from: from,
        __qiguo_cover: shouldShowCover,
        __play_id: playId
      });
      console.log(`Play id: ${playId}`);
      console.log(`Play url: ${locUrl}`);
      // qiguoPlayerManage.play(locUrl);
    }
  }
}

module.exports = Detail;
