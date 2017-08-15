// TODO 查查为什么引用loadash会报错
import _ from 'underscore';

let env = 'production';
let overrideConfig = require(`./${env}`);
let cfg = {
  env,
  saveInjectHashPath: '/data/data/higher.tv.yunos.com/injectHash.txt',
  saveInjectJsDir: '/data/app/higher.tv.yunos.com/playjs',
  metrics: {
    host: '192.168.1.26'
  },
  partnerName: 'webos'
};

_.extend(cfg, overrideConfig);
console.log(`cfg: ${JSON.stringify(cfg)}`);
export default cfg;
