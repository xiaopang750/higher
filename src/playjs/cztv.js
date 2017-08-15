import common from './common.js';
import blitz from '../lib/js/blitz';

let co = common(blitz);

function getType(url) {
  let type;
  if (url.indexOf('/vplay/') !== -1) {
    type = 'letv';
  } else {
    type = 'noraml';
  }
  return type;
};

function getNormal(url) {
  return new Promise((res, rej) => {
    co.fetch({
      url: url,
      header: {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
      }
    })
    .then((result) => {
      let bodyStr = result.ret.match(/vid:([^,]+)/)[1];
      let playUrl = bodyStr.match(/video.+src="(.+)"/)[1];
      res(playUrl);
    })
    .catch((err) => {
      rej(err);
    });
  });
};

function getLetvCloud(vid) {
  return new Promise((res, rej) => {
    co.fetch({
      url: `http://api.cms.cztv.com/mms/out/video/playJson?id=${vid}&platid=&splatid=1002&format=1&tkey=&domain=m.tv.cztv.com&pt=4&at=1`,
    })
    .then((playInfo) => {
      let playUrl = playInfo.playurl.dispatch[0].url[0].yf;
      res(playUrl);
    })
    .catch((err) => {
      rej(err);
    });
  });
}

function getVid(url) {
  return url.match(/vplay\/(\d+).html/)[1];
}

function getDefinition(siteUrl) {
  return new Promise((res, rej) => {
    let type = getType(siteUrl);
    let vid = getVid(siteUrl);
    if (type === 'letv') {
      getLetvCloud(vid).then((playUrl) => {
        res(playUrl);
      })
      .catch((err) => {
        rej(err);
      });
    } else {
      getNormal(vid).then((playUrl) => {
        res(playUrl);
      })
      .catch((err) => {
        rej(err);
      });
    }
  });
}

module.exports = getDefinition;
