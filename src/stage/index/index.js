import layoutScene from './scene/layoutScene.js';
import data from '../../res/values/value.json';
// import playScene from './scene/playScene.js';
// import InjectManage from '../../util/injectManage';

// let oInjectManage = new InjectManage();
let option = {
  // 此处请填上你的wpk包名
  packagename: 'higher.tv.yunos.com',
  // 默认数据存放，以下为默认语言配置
  default: {
    lang: {
      type: 'zh',
      data
    }
  }
};

// oInjectManage.init();
moye.init(option);
moye.showScene(layoutScene);
