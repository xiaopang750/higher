module.exports = (url, param) => {
  if (!url) {
    return;
  }
  let urlCopy = url;
  let paramArray = [];
  for (let key in param) {
    let value = param[key] || '';
    // 若key已存在，替换
    if (urlCopy.match(new RegExp('[?&]' + key + '='))) {
      urlCopy = urlCopy.replace(new RegExp('([?&])' + key + '=[^&]*'), '$1' + key + '=' + encodeURIComponent(value));
    } else {
      paramArray.push(key + '=' + encodeURIComponent(value));
    }
  }
  let paramString = paramArray.join('&');
  if (paramString) {
    if (urlCopy.indexOf('?') === -1 && urlCopy.indexOf('#') === -1) {
      return urlCopy + '?' + paramString;
    } else if (urlCopy.indexOf('?') === -1) {
      return urlCopy.replace(/#/, '?' + paramString + '#');
    } else if (urlCopy.indexOf('#') === -1) {
      return urlCopy.replace(/$/, '&' + paramString);
    } else {
      return urlCopy.replace(/#/, '&' + paramString + '#');
    }
  }
};
