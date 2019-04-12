const mongoose = require('../services/db.js');
const JserrorSchema = require('../schemas/jserror.js');

const jserror = mongoose.model('jserror', JserrorSchema);

function findOne(conditions) {
  return new Promise((resolve, reject) => {
    jserror.find(conditions, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
}

function find(conditions) {
  return new Promise((resolve, reject) => {
    jserror.find(conditions, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function findByPageSize(conditions, size, page) {
  return new Promise((resolve, reject) => {
    jserror
      .find({ ...conditions })
      .skip((parseInt(page, 10) - 1) * parseInt(size, 10))
      .limit(parseInt(size, 10))
      .exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}

function insert(projectId, logId, happendTime, type, detail) {
  const doc = {
    projectId,
    logId,
    happendTime,
    type,
    detail,
    createtime: Date.now(), // 创建时间
  };
  return new Promise((resolve, reject) => {
    jserror.create(doc, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function update(collectname, val = {}) {
  const conditions = {
    collectname,
  };
  const updatestr = {};
  Object.assign(updatestr, val);
  return new Promise((resolve, reject) => {
    jserror.updateOne(conditions, updatestr, (err, res) => {
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
  find,
  findByPageSize,
};
