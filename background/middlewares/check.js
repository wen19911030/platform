const {resDataFormat, getUserInfo} = require('../assets/utils');

module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      // 用户未登录，请重新登录
      return res.send(resDataFormat(1, 'not login'));
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      // 用户已登录
      res.send(resDataFormat(0, 'success', getUserInfo(req.session.user)));
    }
    next();
  }
};
