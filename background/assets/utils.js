exports.resDataFormat = function(code = 0, message = 'success', data = {}) {
  let obj = {
    code,
    message,
    data
  };
  return JSON.stringify(obj);
};

exports.getUserInfo = function(user) {
  const {username, email} = user;
  return {username, email};
};

exports.getRandom = function(len = 8) {
  let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < len; i++) {
    let n = Math.floor(Math.random() * base.length);
    str += base[n];
  }
  return str;
};
