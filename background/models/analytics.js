const mongoose = require('../services/db.js');
const AnalyticsSchema = require('../schemas/analytics.js');

const analytics = mongoose.model('analytics', AnalyticsSchema);

function findOne(conditions) {
  return new Promise((resolve, reject) => {
    analytics.find(conditions, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
}

function insert({
  screenH, screenW, colorDepth, lang, sessionId,
  account, userId, happenTime, domain, url, title, referrer, data, r,
}) {
  const doc = {
    screenH,
    screenW,
    colorDepth,
    lang,
    sessionId,
    account,
    userId,
    happenTime,
    domain,
    url,
    title,
    referrer,
    data,
    r,
    createtime: Date.now(), // 创建时间
  };
  return new Promise((resolve, reject) => {
    analytics.create(doc, (err, res) => {
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
    analytics.updateOne(conditions, updatestr, (err, res) => {
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
    analytics.remove(conditions, (err, res) => {
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
  deletecollect,
};
