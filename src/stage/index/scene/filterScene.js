import Filter from '../../../component/filter/index.js';

class filterScene extends scene {
  constructor(scope) {
    super(scope);
    this.oFilter = new Filter();
    this.nowPageId = 'filter';
  }

  onCreate(data = {}) {
    let self = this;
    this.setContentView(require('../../../res/tpl/filter.jade'), data, 'filter', {}, () => {
      console.log('filter view success!');
      self.oFilter.render(data.ctg);
    });
  }
}

export default filterScene;
