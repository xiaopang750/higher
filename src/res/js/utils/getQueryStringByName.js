module.exports = (name, url = location.search) => {
  let result = url.match(new RegExp("[?&]" + name + "=([^\&]+)", "i"));
  if (!result || result.length < 1) {
    return '';
  }
  return decodeURIComponent(result[1]);
};
