/**
 * 用户信息
 */
const mongoose = require('../db.js');

const UserSchema = new mongoose.Schema({
  username: {type: String}, // 用户账号
  password: {type: String}, // 密码
  email: {type: String}, // 邮箱地址
  createtime: {type: Date}, // 创建时间
  updatetime: {type: Date}, // 更新时间
  logintime: {type: Date} // 最近登录时间
});

module.exports = UserSchema;
