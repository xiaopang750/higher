import common from './common.js';
import blitz from '../lib/js/blitz';

let co = common(blitz);

function getVid(url) {
  let vid;
  try {
    vid = url.match(/(\d+).html/)[1];
  } catch (e) {
    console.log(`获取vid 失败 ${e.message}`);
  }
  return vid;
}

function getLetvKey(sTime) {
  var i = 0;
  while (true) {
    if (i >= 8) {
      return (0xB074319 ^ sTime);
    }
    var j = sTime & 0x1;
    sTime = (sTime >> 1) + (j << 31);
    ++i;
  }
}

function getTmpUrl(vid) {
  let stime = new Date().getTime() / 1000;
  return new Promise((res, rej) => {
    co.fetch({
      url: `http://player-pc.le.com/mms/out/video/playJson.json?platid=3&splatid=304&tss=no&id=${vid}&detect=1&dvtype=1000&accessyx=1&domain=www.le.com&tkey=${getLetvKey(stime)}&devid=7F3A0FC5E1C30379ED1104DC7B6F55057AE7149B&source=1001&lang=cn&region=cn&isHttps=0`
    })
    .then((playInfo) => {
      let mainInfo = playInfo.msgs.playurl;
      let domain = mainInfo.domain[0];
      let dispatch = mainInfo.dispatch;
      let tail;
      for (let vd in dispatch) {
        tail = dispatch[vd][0];
      }
      let tmpUrl = `${domain}${tail}&format=1&expect=3&p1=0&p2=06&termid=2&ostype=un&hwtype=ipad&vid=${mainInfo.vid}&`;
      res(tmpUrl);
    })
    .catch((err) => {
      rej(err);
    });
  });
}

function getPlayUrl(tmpUrl) {
  return new Promise((res, rej) => {
    co.fetch({
      url: tmpUrl
    })
    .then((playInfo) => {
      let playUlr = playInfo.location;
      res(playUlr);
    })
    .catch((err) => {
      rej(err);
    });
  });
}

function getDefinition(siteUrl) {
  let vid = getVid(siteUrl);
  return new Promise((res, rej) => {
    getTmpUrl(vid)
      .then((tmpUrl) => {
        return getPlayUrl(tmpUrl);
      })
      .then((playUrl) => {
        res(playUrl);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

module.exports = getDefinition;
