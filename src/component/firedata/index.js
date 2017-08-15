import Base from '../base/index';

class Fd extends Base {
  event(category, action, params = {}) {
    if (this.isInWebOs) {
      this.guid().then((guid) => {
        console.log(`GUID: ${guid}`);
        params.uid = guid;
        console.log(category);
        console.log(action);
        console.log(params);
        _fd.event(category, action, params);
        console.log('pb send end');
      }).catch((e) => {
        console.log(`GUID ERROR: ${JSON.stringify(e)}`);
      });
    }
  }
  pageView(pageName, params = {}) {
    if (this.isInWebOs) {
      _fd.pageView(pageName, params);
    }
  }
}

export default Fd;
