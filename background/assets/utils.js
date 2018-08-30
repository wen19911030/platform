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
