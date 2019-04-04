const mongoose = require('../services/db.js');
const UserSchema = require('../schemas/user.js');

const user = mongoose.model('users', UserSchema);

function insert(username, password, email, emailIsVerify = false) {
  const doc = {
    username,
    password,
    email,
    emailIsVerify,
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

function update(username, val = {}) {
  const conditions = {
    username
  };
  let updatestr = {};
  Object.assign(updatestr, val);
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

function deleteUser(conditions) {
  return new Promise((resolve, reject) => {
    user.remove(conditions, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = {
  insert,
  update,
  findOne,
  deleteUser
};
