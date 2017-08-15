// 这里import blitz 会有问题 不知道为什么
// import blitz from '../lib/js/blitz';
function encodeParam(param) {
  let result = [];
  for (let attr in param) {
    let val = param[attr];
    val = encodeURIComponent(val);
    result.push(`${attr}=${val}`);
  }
  return result.length ? result.join('&') : null;
}

export default function (blitz) {
  let http = blitz.load('http');
  return {
    fetch(opts = {}) {
      let query = encodeParam(opts.query);
      let reqUrl = query ? `${opts.url}?${query}` : opts.url;
      let timeout = opts.timeout || 5000;
      console.log(`fetch url is: ${reqUrl}`);
      return new Promise((resolve, reject) => {
        http.request({
          url: reqUrl,
          header: opts.header,
          http_type: opts.http_type || 'get',
          post_data: opts.post_data
        }, function (data) {
          resolve(data);
        }, function (e) {
          reject(`fetch fail: ${JSON.stringify(e)}`);
        }, timeout);
      });
    }
  };
}
