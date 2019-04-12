const mongoose = require('../services/db.js');
const ProjectSchema = require('../schemas/project.js');

const project = mongoose.model('project', ProjectSchema);

function findOne(conditions) {
  return new Promise((resolve, reject) => {
    project.findOne(conditions, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function insert(projectName, projectDesc, projectType, creator) {
  const doc = {
    projectName,
    projectDesc,
    projectType,
    creator,
    createtime: Date.now(), // 创建时间
  };
  return new Promise((resolve, reject) => {
    findOne({ projectName }).then((result) => {
      if (result) {
        reject(new Error('项目名称已存在'));
        return;
      }
      project.create(doc, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
}

function find(conditions) {
  return new Promise((resolve, reject) => {
    project.find(conditions, (err, res) => {
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
    project
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

function update(collectname, val = {}) {
  const conditions = {
    collectname,
  };
  const updatestr = {};
  Object.assign(updatestr, val);
  return new Promise((resolve, reject) => {
    project.updateOne(conditions, updatestr, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function deletecollect(conditions) {
  return new Promise((resolve, reject) => {
    project.remove(conditions, (err, res) => {
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
  find,
  findOne,
  findByPageSize,
  deletecollect,
};
