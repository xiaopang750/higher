import detailScene from '../../stage/index/scene/detailScene';
import Base from '../base/index';
import Loading from '../loading/index';
import Firedata from '../firedata/index';

class Videolist extends Base {
  constructor(scope, opt = {}) {
    super(scope);
    this.tpl = require('../../res/tpl/co_videolist.jade');

    this.Fd = new Firedata();
    this.oLoading = new Loading();
    this.http = blitz.load('http');
    this.fetchLock = false;
    this.query = this.query || {page: 1, pagesize: 10};
  }
  calc(oWrap, oInner) {
    let col = parseFloat(oWrap.attr('data-col'));
    let w = parseFloat(oWrap.attr('data-width'));
    let space = parseFloat(oWrap.attr('data-space'));
    let scale = oWrap.attr('data-imgScale');
    let unit = oWrap.attr('data-unit');
    let imgH = w / scale;
    let viewWidth = col * w + (col - 1) * space;
    // +0.1 webos内核问题？
    let realWidth = col * (w + space) + 0.1;
    oWrap.css('width', `${viewWidth}${unit}`);
    oInner.css('width', `${realWidth}${unit}`);
    oWrap.find('[fe-role=Widget]').css({
      width: `${w}${unit}`,
      marginRight: `${space}${unit}`,
      marginBottom: `${space}${unit}`,
    });
    oWrap.find('[data-face]').css('height', `${imgH}${unit}`);
  }
  load(pageName, ctg) {
    let self = this;
    this.beforeFetch();
    // let data = mockData;
    // self.totalPage = Math.ceil(data.page.total / this.query.pagesize);
    // self.completeFetch();
    // self.render(data);
    this.fetch({
      url: this.url,
      query: this.query
    }).then((data) => {
      self.totalPage = Math.ceil(data.page.total / this.query.pagesize);
      self.completeFetch();
      self.render(data);
      self.Fd.pageView(`webos-${ctg}-${pageName}`);
    }).catch((e) => {
      self.completeFetch();
    });
  }
  beforeFetch() {
    this.fetchLock = true;
    this.oLoading.show();
  }
  completeFetch() {
    this.fetchLock = false;
    this.oLoading.hide();
  }
  render(data) {
    this.root = moye.curScene.nowPageId;
    data.root = this.root;
    let oVideolist = $(`#${this.root}videolist`);
    let sHtml = this.tpl(data);
    oVideolist.html(sHtml);
    this.tvVideolist = this.tvVideolist || FocusEngine.getWidgetById(`${this.root}videolist`);
    this.tvVideolist.reRender();
    this.calc($(`#${this.root}videolist`), $(`#${this.root}list-wrap`));
    this.addEevent();
  }
  addEevent() {
    let self = this;
    this.listWrap = FocusEngine.getWidgetById(`${this.root}list-wrap`);
    this.listWrap.on('ok', (e) => {
      let curFocus = $(e.target.con);
      let vid = curFocus.attr('data-id');
      let ctg = curFocus.attr('data-ctg');
      moye.curScene.showScene(detailScene, {vid, ctg});
    });

    this.listWrap.on('switchend', (e) => {
      let code = e.keyCode;
      if (code === moye.keyCodes.UP) {
        console.log('need prev');
        if (!self.fetchLock && self.query.page > 1) {
          self.query.page -= 1;
          self.load();
        }
      } else if (code === moye.keyCodes.DOWN && self.query.page < self.totalPage) {
        console.log('need next');
        console.log(self.fetchLock);
        if (!self.fetchLock) {
          self.query.page += 1;
          self.load();
        }
      }
    });

    this.listWrap.on('focus', (e) => {
      let oCur = $(e.target.con);
      let oTitle = oCur.find('[title]').get(0);
      // self.marqueeAnim && self.marqueeAnim.stop();
      if (oTitle) {
        self.marqueeAnim = tv_marquee.create(oTitle);
        self.marqueeAnim.start();
      }
    });

    this.listWrap.on('blur', (e) => {
      self.marqueeAnim.stop();
    });
  }
}

export default Videolist;
