import Sidebar from '../../../component/sidebar/index.js';

class indexScene extends scene {
  constructor(scope) {
    super(scope);
    this.Sidebar = new Sidebar();
    this.nowPageId = 'index';
  }

  onCreate(data) {
    let self = this;
    this.setContentView(require('../../../res/tpl/index.jade'), {}, 'index', {}, () => {
      // self.oSideBar.setData(['1', '2']);
      self.Sidebar.render(data.ctg);
      // oInject.getRemoteJs((injectJs) => {
      //   console.log(injectJs.hash);
      // });
      // oInject.run();
    });
  }
}

export default indexScene;
