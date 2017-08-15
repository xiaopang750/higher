import filterScene from '../../stage/index/scene/filterScene';
import Videolist from '../videolist/index.js';
import Base from '../base/index';
// import filterData from './mock';

class Sidebar extends Base {
  constructor(scope) {
    super(scope);
    this.tpl = require('../../res/tpl/co_sidebarlist.jade');
    this.data = require('./data.js');

    this.http = blitz.load('http');
    this.oVideolist = new Videolist();
  }
  getInfo(oRole) {
    oRole = $(oRole);
    let url = `${this.cfg.apiHost}/api${oRole.attr('data-href')}`;
    let query = oRole.attr('data-qs');
    query = JSON.parse(decodeURIComponent(query));
    return {
      url,
      query
    };
  }
  getInitReqInfo() {
    let oFirstItem = $('[sidebar]').find('[click-role=filter-list]')[0];
    let {url, query} = this.getInfo(oFirstItem);
    this.reqVideoList(url, query);
  }
  render(ctg) {
    this.ctg = ctg;
    this.oSidebar = $('[sidebar]');
    let self = this;
    let sHtml = this.tpl({list: this.data[ctg]});
    this.oSidebar.html(sHtml);
    let actualHeight = this.calcHeight();
    let viewHeight = $(window).height();
    this.oSidebar.height(actualHeight);
    this.oSidebar.parents('#sidebar').height(viewHeight);
    this.tvSidebar = this.tvSidebar || FocusEngine.getWidgetById('sidebar');
    this.tvSidebar.reRender();
    this.getInitReqInfo();
    this.tvSidebar.on('ok', (e) => {
      self.onOk(e);
    });
  }
  calcHeight() {
    let height = 0;
    let aItem = $('[sidebar] [fe-role]');
    aItem.each((index, item) => {
      height += $(item).height();
    });
    return height;
  }
  onOk(e) {
    let self = this;
    let oRole = e.target.con;
    let sRole = oRole.getAttribute('click-role');
    if (sRole === 'filter-list') {
      let {url, query} = this.getInfo(oRole);
      this.reqVideoList(url, query);
    } else if (sRole === 'filter') {
      let reqUrl = `${this.cfg.apiHost}/api/filter/${this.ctg}/pubtime`;
      this.fetch({
        url: reqUrl
      }).then((filterData) => {
        console.log(`filter ctg is ${self.ctg}`);
        self.operateData(filterData);
        console.log('=====', filterData);
        moye.curScene.showScene(filterScene, {ctg: self.ctg, filterData});
      });
      // moye.curScene.showScene(filterScene, {ctg: this.ctg, filterData});
    }
  }
  operateData(data) {
    for (let ctg in data.tags) {
      for (let type in data.tags[ctg]) {
        if (type === 'area') {
          data.tags[ctg][type].forEach((name, index) => {
            if (name === '中国香港') {
              data.tags[ctg][type][index] = '香港';
            }
          });
        }
      }
    }
  }
  reqVideoList(url, query) {
    query.page = 1;
    query.pagesize = 10;
    this.oVideolist.url = url;
    this.oVideolist.query = query;
    this.oVideolist.load('index', this.ctg);
  }
}

export default Sidebar;
