import Base from '../base/index';

class Reclist extends Base {
  constructor(scope) {
    super(scope);
    this.ctg = 'movie';
    this.http = blitz.load('http');
  }

  render(recs, detail) {
    this.detail = detail;
    this.oReclist = $('#reclist>ul');
    this.tpl = require('../../res/tpl/co_reclist.jade');

    let sHtml = this.tpl({recs});
    this.oReclist.html(sHtml);
    let recUl = $('#reclist>ul');
    let singleWidth = recUl.find('li').width();
    recUl.css('width', `${singleWidth * recs.length}px`);
    FocusEngine.getWidgetById('reclist').reRender();
    this.addEvent();
  }

  addEvent() {
    let self = this;
    this.listWrap = FocusEngine.getWidgetById('reclist');
    this.listWrap.on('ok', (e) => {
      let vid = $(e.target.con).attr('data-id');
      self.detail.load({vid, ctg: 'movie'});
    });
    // this.listWrap.on('switchEnd', (e) => {
    //   if (e.keyCode) {
    //     FocusEngine.getWidgetById('play').focus();
    //   }
    // });
  }
}

module.exports = Reclist;
