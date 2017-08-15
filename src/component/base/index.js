import _ from 'underscore';
import cfg from '../../cfg/cfg';

class Base {
  constructor() {
    this.cfg = cfg;
    this.http = blitz.load('http');
    this.file = blitz.load('file');
    this.base = blitz.load('base');
    this.isInWebOs = moye.utils.isBlitz();
  }
  fetch({url = '', header, query = {}, httpType = 'get', postData} = {}) {
    // 暂时只处理了get
    query.partner = cfg.partnerName; // 添加公共的参数
    let parseQuery = this.encodeParam(query);
    let reqUrl = parseQuery ? `${url}?${parseQuery}` : url;
    if (this.isInWebOs) {
      let http = blitz.load('http');
      console.log(`fetch url is: ${reqUrl}`);
      console.log(`fetch query is: ${JSON.stringify(query)}`);
      console.log(`method ${httpType}`);
      return new Promise((resolve, reject) => {
        http.request({
          url: reqUrl,
          header,
          http_type: httpType,
          post_data: postData
        }, function (data) {
          resolve(data);
        }, function (e) {
          reject(`fetch fail: ${JSON.stringify(e)}`);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        console.log(url);
        $.ajax({
          url: reqUrl,
          headers: header,
          method: httpType,
          data: postData,
          success(data) {
            console.log(data);
            resolve(data);
          },
          error() {
            reject(`fetch fail: ${reqUrl}`);
          }
        });
      });
    }
  }

  encodeParam(param) {
    let result = [];
    _.map(param, (val, key) => {
      val = encodeURIComponent(val);
      result.push(`${key}=${val}`);
    });
    return result.length ? result.join('&') : null;
  }
  writeFile(filename, data) {
    // 这里如果用 this.file = blitz.load('file') 会有问题 电视上报错?
    let file = blitz.load('file');
    return new Promise((res, rej) => {
      file.openFile({
        filename,
        mode: 'w+'
      }, () => {
        file.write({
          filename,
          data
        }, (content) => {
          // console.log(`write file ${filename} success`);
          file.closeFile({filename}, (e) => {
            // console.log(`close file ${filename} success`);
          }, (e) => {
            // console.log(`close file ${filename} failed`);
          });
          res(content);
        }, (errRead) => {
          // console.log(`write file ${filename} failed ${JSON.stringify(errRead)}`);
          file.closeFile({filename}, (e) => {
            // console.log(`close file ${filename} success`);
          }, (e) => {
            // console.log(`close file ${filename} failed`);
          });
          rej(errRead);
        });
      }, (errOpen) => {
        console.log(`open file ${filename} failed ${JSON.stringify(errOpen)}`);
        res('');
      });
    });
  }
  readFile(filename) {
    let file = blitz.load('file');
    return new Promise((res, rej) => {
      file.openFile({
        filename,
        mode: 'r',
      }, () => {
        file.read({
          filename
        }, (content) => {
          // console.log('======');
          // console.log(content);
          // console.log('======');
          // console.log(`read file ${filename} success`);
          file.closeFile({filename}, (e) => {
            // console.log(`close file ${filename} success`);
          }, (e) => {
            // console.log(`close file ${filename} failed`);
          });
          res(content.data);
        }, (errRead) => {
          // console.log(`read file ${filename} failed ${JSON.stringify(errRead)}`);
          file.closeFile({filename}, (e) => {
            // console.log(`close file ${filename} success`);
          }, (e) => {
            // console.log(`close file ${filename} failed`);
          });
          rej(errRead);
        });
      }, (errOpen) => {
        // console.log(`open file ${filename} failed ${JSON.stringify(errOpen)}`);
        res('');
      });
    });
  }

  guid() {
    return new Promise((resolve, reject) => {
      this.base.getDeviceInfo({}, (e) => {
        if (e) {
          resolve(e.uuid);
        }
      }, (e) => {
        reject(`guid fail: ${JSON.stringify(e)}`);
      });
    });
  }
}

export default Base;
