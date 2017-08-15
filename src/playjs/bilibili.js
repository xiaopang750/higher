import md5 from '../lib/js/md5';
import common from './common.js';
import blitz from '../lib/js/blitz';

let co = common(blitz);

function reqBili(quality, type) {
  return new Promise((res, rej) => {
    let appkey = '4fa4601d1caa8b48';
    let appSecretkey = 'f7c926f549b9becf1c27644958676a21';
    let params = `appkey=${appkey}&cid=${window.cid}&otype=json&quality=${quality}&type=${type}`;
    let sign = md5(`${params}${appSecretkey}`);
    co.fetch({
      url: `http://interface.bilibili.com/playurl?${params}&sign=${sign}`
    })
      .then((resultBili) => {
        res(resultBili);
      });
  });
}

function getDefinition(siteUrl) {
  return new Promise((res, rej) => {
    siteUrl = siteUrl.match(/[^?]+/)[0];
    let encodeUrl = encodeURIComponent(siteUrl);
    co.fetch({
      url: `http://api.video.browser.tvall.cn:8888/video/webos/play/bilibili/param?href=${encodeUrl}`
    })
    .then((result) => {
      window.aid = result.aid;
      window.cid = result.cid;
      return reqBili('3', 'flv');
    })
    .then((resultBili) => {
      if (resultBili.durl.length && resultBili.durl.length > 1) {
        return reqBili('3', 'mp4');
      } else {
        return resultBili;
      }
    })
    .then((resultBili) => {
      res(resultBili.durl[0].url);
    })
    .catch((err) => {
      rej(err);
    });
  });
}

module.exports = getDefinition;

// function test() {
//   co.wait(document.title)
//     .then(() => {
//       console.log('this is bilibili');
//       return getDefinition('7914807');
//     })
//     .then((playUrl) => {
//       console.log(`the play url is ${playUrl}`);
//     });
// }
//
// test();
