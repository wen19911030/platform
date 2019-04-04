/* eslint-disable func-names */
exports.resDataFormat = function (code = 0, message = 'success', data = {}) {
  const obj = {
    code,
    message,
    data,
  };
  return JSON.stringify(obj);
};

exports.getUserInfo = function (user) {
  const { username, email } = user;
  return { username, email };
};

exports.getRandom = function (len = 8) {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < len; i++) {
    const n = Math.floor(Math.random() * base.length);
    str += base[n];
  }
  return str;
};
