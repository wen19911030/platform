module.exports = {
  port: 9999,
  session: {
    secret: 'monitor',
    key: 'monitor',
    maxAge: 3600000,
  },
  mongodb: 'mongodb://127.0.0.1:27017/monitor',
  email: {
    service: 'smtp.sina.com',
    user: 'a15711658748@sina.com',
    pass: 'jian-guo-wen',
  },
};
