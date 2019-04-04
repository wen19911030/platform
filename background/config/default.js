const path = require('path');

module.exports = {
  port: 3000,
  session: {
    secret: 'monitor',
    key: 'monitor',
    maxAge: 3600000
  },
  mongodb: 'mongodb://localhost:27017/monitor',
  email: {
    service: 'smtp.sina.com',
    user: 'a15711658748@sina.com',
    pass: 'jian-guo-wen'
  },
};
