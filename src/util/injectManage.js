import Base from '../component/base';

class InjectManage extends Base {
  constructor(scope) {
    super(scope);
    this.file = blitz.load('file');
  }
  test() {
    console.log('test');
  }
  init() {
    // 获取本地注入js localHash 请求注入地址inject?hash=${localHash}
    // 返回304则不更新本地hash 和本地js
    // 返回200则更新本地hash 和本地js
    let self = this;
    this.readFile(self.cfg.saveInjectHashPath).then((localHash) => {
      console.log(`local hash is ${localHash}`);
      return self.getRemoteInjectInfo(localHash);
    })
    .then((remoteInjectInfo) => {
      console.log(`remote hash code is ${remoteInjectInfo.hash}`);
      console.log(`remote env is ${remoteInjectInfo.env}`);
      if (remoteInjectInfo.ret_code === 304) {
        console.log('should not update local js');
        throw new Error('local hash equal remote hash');
      }
      self.remoteJs = remoteInjectInfo.content;
      let remoteHash = remoteInjectInfo.hash;
      return self.writeFile(self.cfg.saveInjectHashPath, remoteHash);
    })
    .then(() => {
      console.log('save injectJs ing...');
      console.log(self.remoteJs.length);
      return self.saveInject(self.remoteJs);
    })
    .then(() => {
      console.log('injectJs init over!');
    })
    .catch((e) => {
      console.log(JSON.stringify(e));
    });
  }
  saveInject(list) {
    for (let i = 0; i < list.length; i += 1) {
      let item = list[i];
      let filePath = `${this.cfg.saveInjectJsDir}/${item.name}`;
      // console.log(filePath);
      this.writeFile(filePath, item.content);
    }
  }
  getRemoteInjectInfo(hash = '') {
    return this.fetch({
      url: this.cfg.injectJsUrl,
      query: {
        hash
      }
    });
  }
}

export default InjectManage;
