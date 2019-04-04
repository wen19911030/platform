const mongoose = require('mongoose');
const config = require('config-lite')(__dirname);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
/**
 * 连接
 */
mongoose.connect(
  config.mongodb,
  {useNewUrlParser: true}
);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + config.mongodb);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
