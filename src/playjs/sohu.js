import common from './common.js';
import blitz from '../lib/js/blitz';

let co = common(blitz);

function getPlayUrl() {
  return new Promise((res, rej) => {
    co.fetch({
      url: `http://m.tv.sohu.com/phone_playinfo?callback=&vid=${window.vid}&site=1&appid=tv&api_key=f351515304020cad28c92f70f002261c&plat=17&sver=1.0&partner=1&uid=${window.uid}&muid=1487839109370793&_c=1&pt=2&qd=680&src=10150001&_=${window.tm}`
    })
      .then((result) => {
        res(result);
      });
  });
}

function verify() {
  return new Promise((res, rej) => {
    let url = window.url.match(/[^?]+/)[0];
    co.fetch({
      url: `http://z.m.tv.sohu.com/h5_cc.gif?t=${window.tm}&uid=${window.uid}&vid=${window.vid}&url=${encodeURIComponent(url)}&refer=&screen=768x1024&os=ios&platform=ipad&passport=&position=play_verify&op=click&details=%7B%7D&nid=`,
      header: {
        Cookie: 'SOHUSVP=CYkfNIYACgckJayhsTAuKh2JF9MSGCv2ms4dFMXlxos',
        Referer: url,
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
      }
    })
    .then(() => {
      res();
    })
    .catch(() => {
      res();
    });
  });
}

function wait(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}

function getUid() {
  let t = Math.floor(768);
  let e = Math.floor(1024);
  let i = Math.floor(Math.sqrt(t * t + e * e)) || 0;
  let n = Math.round(2) || 1;
  let a = new Date().getTime() * 1000;
  let s = a + n + i + Math.round(1e3 * Math.random());
  return s;
}

function getDefinition(siteUrl) {
  return new Promise((res, rej) => {
    window.url = siteUrl;
    co.fetch({
      url: siteUrl,
      header: {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
      }
    })
    .then((result) => {
      window.vid = result.ret.match(/vid:([^,]+)/)[1];
      window.tm = new Date().getTime();
      window.uid = getUid();
      return verify();
    })
    .then(() => wait(1500))
    .then(() => getPlayUrl())
    .then((data) => {
      let m3u8List = [];
      data = data.data;
      let m3u8s = data.urls.m3u8;
      let map = {
        nor: '2',
        hig: '3',
        sup: '4'
      };
      for (let vd in m3u8s) {
        let json = {};
        json.bittype = map[vd];
        if (json.bittype) {
          json.url = m3u8s[vd][0];
          m3u8List.push(json);
        }
      }
      m3u8List.sort(function (a, b) {
        return b.bittype - a.bittype;
      });
      if (m3u8List.length > 1) {
        m3u8List.shift();
      }
      res(m3u8List[0].url);
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
