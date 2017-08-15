import common from './common.js';
import blitz from '../lib/js/blitz';

let co = common(blitz);

function getDefinition(siteUrl) {
  return new Promise((res, rej) => {
    let vid;
    try {
      vid = siteUrl.match(/\/ac(\d+)/)[1];
    } catch (e) {
      vid = siteUrl.match(/ac=(\d+)/)[1];
    }
    let nowPlay;
    try {
      nowPlay = parseInt(siteUrl.match(/.+part=(\d+)/)[1], 10) - 1 || 0;
    } catch (e) {
      nowPlay = 0;
    }
    co.fetch({
      url: `http://api.aixifan.com/contents/${vid}`,
      header: {
        deviceType: 2
      }
    })
    .then((info) => {
      let videoId = info.data.videos[nowPlay].videoId;
      return co.fetch({
        url: `http://www.acfun.tv/video/getVideo.aspx?id=${videoId}`
      });
    })
    .then((result) => {
      let sid = result.sourceId;
      let sign = result.encode;
      return co.fetch({
        url: `http://aplay-vod.cn-beijing.aliyuncs.com/acfun/web?vid=${sid}&ct=85&ev=3&sign=${sign}`
      });
    })
    .then((playData) => {
      let data = playData.data;
      return co.fetch({
        url: 'http://api.video.browser.tvall.cn:8888/video/app/parse/acfun?from=webos',
        http_type: 'post',
        post_data: {
          data: encodeURIComponent(data)
        }
      });
    })
    .then((result) => {
      let streams = result.stream;
      let videoList = [];
      let map = {
        m3u8_hd3: 4,
        m3u8_hd: 3,
        m3u8_mp4: 2,
        m3u8_flv: 1
      };
      streams.forEach(function (item) {
        for (let bit in map) {
          if (item.stream_type === bit) {
            try {
              let json = {};
              json.url = item.m3u8;
              json.bittype = map[bit];
              videoList.push(json);
            } catch (e) {
              console.log(e.message);
            }
          }
        }
      });
      videoList.sort(function (a, b) {
        return b.bittype - a.bittype;
      });
      res(videoList[0].url);
    })
    .catch((e) => {
      rej(e);
    });
  });
}

module.exports = getDefinition;
