const {resDataFormat, getUserInfo} = require('../assets/utils');
const {getDefaultLogger, getServiceLogger} = require('../services/log.js');

module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      // 用户未登录，请重新登录
      getServiceLogger('userService').info('用户未登录');
      return res.send(resDataFormat(1, 'not login'));
    }
    getServiceLogger('userService').info('用户已登录');
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
