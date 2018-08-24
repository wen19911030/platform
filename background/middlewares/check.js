module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
      // 用户未登录，请重新登录
      //   return res.redirect('/signin');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    console.log(req.session);
    if (req.session.user) {
      // 用户已登录
      //   return res.redirect('back'); // 返回之前的页面
    }
    next();
  }
};
