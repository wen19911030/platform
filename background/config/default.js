const path = require('path');

module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 3600000
  },
  mongodb: 'mongodb://localhost:27017/myblog',
  email: {
    service: 'smtp.sina.com',
    user: 'a15711658748@sina.com',
    pass: 'jian-guo-wen'
  },
  logger: {
    file: {
      level: 'info',
      filename: path.join(__dirname, '../logs/info.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }
  }
};
