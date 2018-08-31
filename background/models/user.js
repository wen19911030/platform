const moment = require('moment');
const mongoose = require('../services/db.js');
const UserSchema = require('../schemas/user.js');

const user = mongoose.model('users', UserSchema);

/**
 * 插入
 */

// 添加 mongoose 静态方法，静态方法在Model层就能使用
// User.statics.findbyusername = function(username, callback) {
// 	return this.model("User").find({ username: username }, callback);
// };
// User.statics.findbyemail = function(email, callback) {
// 	return this.model("User").find({ email: email }, callback);
// };

function insert(username, password, email) {
  const doc = {
    username,
    password,
    email,
    createtime: Date.now(), // 创建时间
    updatetime: Date.now(), // 更新时间
    logintime: Date.now() // 最近登录时间
  };
  return new Promise((resolve, reject) => {
    const p1 = findOne({username});
    const p2 = findOne({email});

    return Promise.all([p1, p2]).then(res => {
      if (res[0]) {
        // TODO username 已存在
        reject('username exist');
        return;
      }
      if (res[1]) {
        // TODO email 已存在
        reject('email exist');
        return;
      }
      user.create(doc, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
}

function update(username, password, email, isUpdate, isLogin) {
  const conditions = {
    username
  };
  let updatestr = {};
  if (password) {
    updatestr.password = password;
  }
  if (email) {
    updatestr.email = email;
  }
  if (isUpdate) {
    updatestr.updatetime = Date.now();
  }
  if (isLogin) {
    updatestr.logintime = Date.now();
  }
  return new Promise((resolve, reject) => {
    user.updateOne(conditions, updatestr, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function findOne(conditions) {
  return new Promise((resolve, reject) => {
    user.find(conditions, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
}

function deleteOne() {}

module.exports = {
  insert,
  update,
  findOne,
  deleteOne
};
