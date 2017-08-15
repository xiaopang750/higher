import common from './common.js';
import blitz from '../lib/js/blitz';

let co = common(blitz);

function getPageInfo(url) {
  return new Promise((res, rej) => {
    co.fetch({
      url,
      header: {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
      }
    })
    .then((result) => {
      let bodyStr = result.ret;
      let playId;
      let playKey;
      let playUrl;
      try {
        playId = bodyStr.match(/_playId\s?=\s?'(\d+)'/)[1];
        playKey = bodyStr.match(/_playKey\s?=\s?'(.+)'/)[1];
        playUrl = bodyStr.match(/_playUrl\s?=\s?'(.+)'/)[1];
      } catch (e) {
        console.log(`step:getPageInfo From bodyStr failed ${e.message}`);
      }
      res({
        playId,
        playKey,
        playUrl
      });
    })
    .catch((err) => {
      rej(err);
    });
  });
}

function getPlayInfo(pageInfo) {
  let {playId, playKey, playUrl} = pageInfo;
  let tm = new Date().getTime();
  return new Promise((res, rej) => {
    co.fetch({
      url: `http://apiontime.wasu.cn/Auth/getVideoUrl?id=${playId}&key=${playKey}&url=${playUrl}&type=jsonp&callback=&_=${tm}`
    })
    .then((result) => {
      res(result);
      // let encryptPlayInfo = result.ret;
      // encryptPlayInfo = encryptPlayInfo.match(/\("(.+)"\)/)[1];
      // encryptPlayInfo = encryptPlayInfo.replace(/\\/gi, '').replace(/"/gi, '');
      // res(encryptPlayInfo);
    })
    .catch((err) => {
      rej(err);
    });
  });
}

function decryptPlayInfo(playInfo) {
  return new Promise((res, rej) => {
    co.fetch({
      url: `http://api.video.browser.tvall.cn:8888/video/api/play/wasu?data=${encodeURIComponent(playInfo)}&action=parseUrl`
    })
    .then((data) => {
      res(data.ret);
    })
    .catch((err) => {
      rej(err);
    });
  });
}

function getDefinition(siteUrl) {
  return new Promise((res, rej) => {
    getPageInfo(siteUrl)
      .then((pageInfo) => {
        return getPlayInfo(pageInfo);
      })
      .then((playInfo) => {
        return decryptPlayInfo(playInfo);
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
