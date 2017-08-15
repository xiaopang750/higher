import _ from 'underscore';
import Base from '../base/index';
import Videolist from '../videolist/index';
// import deji from './mock';

class Filter extends Base {
  constructor(scope) {
    super(scope);
    this.reqInfo = {
      sort: 'pubtime',
      page: 1,
      pagesize: 8
    };
  }
  render(ctg) {
    this.widget = FocusEngine.getWidgetById('filterbar');
    this.scrollList = $('[scroll-list]');
    this.filterbar = $('[filterbar]');
    this.ctg = ctg;
    let scrollHeight = this.scrollList.height();
    let viewHeight = $(window).height();
    this.scrollList.height(scrollHeight);
    this.filterbar.height(viewHeight);
    this.oVideolist = new Videolist();
    this.event();
    let oPubtimeBtn = $('[data-search=pubtime]');
    this.enter(oPubtimeBtn);
  }
  event() {
    let self = this;
    this.widget.on('ok', (e) => {
      let oRole = $(e.target.con);
      self.enter(oRole);
    });
  }
  enter(oRole) {
    let oGroup = oRole.parents('[select-group]');
    let type = oGroup.attr('select-group');
    let val = oRole.attr('data-search');
    oGroup.find('[fe-role]').removeClass('active');
    oRole.addClass('active');
    let reqInfo = this.genFetchInfo(type, val);
    this.oVideolist.url = reqInfo.url;
    this.oVideolist.query = reqInfo.query;
    this.oVideolist.load('filter', this.ctg);
  }
  genFetchInfo(type, val) {
    let query = {};
    this.reqInfo[type] = val;
    _.map(this.reqInfo, (value, key) => {
      if (key !== 'sort') {
        query[key] = value;
      }
    });
    let fetchUrl = `${this.cfg.apiHost}/api/filter/${this.ctg}/${this.reqInfo.sort}`;
    console.log(`fetch filter url is: ${fetchUrl}`);
    console.log(`fetch filter query is: ${JSON.stringify(query)}`);
    return {
      url: fetchUrl,
      query
    };
  }
}

export default Filter;
