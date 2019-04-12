/* eslint-disable func-names */
exports.resDataFormat = function (status = 0, message = '', data = {}) {
  const obj = {
    status,
    message,
    data,
  };
  return JSON.stringify(obj);
};

exports.getUserInfo = function (user = {}) {
  const { username, email } = user;
  return { username, email };
};

exports.getRandom = function (len = 8) {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < len; i += 1) {
    const n = Math.floor(Math.random() * base.length);
    str += base[n];
  }
  return str;
};
