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
  }
};
