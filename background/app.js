const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

// log only 4xx and 5xx responses to console
app.use(logger('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' })
}))


// session 中间件
app.use(
  session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({
      // 将 session 存储到 mongodb
      url: config.mongodb // mongodb 地址
    })
  })
);
// 添加body解析
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 导入路由
const userRouter = require('./routes/user');
const verifyRouter = require('./routes/verify');
const analytics = require('./routes/analytics');

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/api/user', userRouter);
app.use('/jsSDKAnalytics', analytics);
app.use('/verify', verifyRouter);

app.listen(config.port, () => {
  console.log('node start');
});

module.exports = app;
