const express = require('express');
const jserror = require('../models/jserror.js');
const analytics = require('../models/analytics.js');
const project = require('../models/project.js');

const router = express.Router();

router.post('/list', (req, res) => {
  const size = req.query.size || 20; // 分页参数
  let page = req.query.page || 1; // 当前页码
  // 条件查询参数
  const params = {
    projectId: req.body.projectId,
    errorType: req.body.errorType,
  };
  const mp = {};
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      mp[key] = params[key];
    }
  });
  if (page < 1) {
    page = 1;
  }
  jserror
    .find(mp)
    .then((result) => {
      console.log(result);
      jserror.findByPageSize(mp, size, page).then((docs) => {
        res.json({
          status: 0,
          message: '请求成功',
          total: result.length,
          data: docs,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 1,
        message: '请求失败',
      });
    });
});

router.get('/detail', (req, res) => {
  const { logId, projectId } = req.query;

  Promise.all([
    jserror.findOne({ logId }),
    analytics.findOne({ _id: logId }),
    project.findOne({ _id: projectId }),
  ])
    .then((results) => {
      const data = {
        project: results[2],
        log: results[1],
        error: results[0],
      };

      res.json({
        status: 0,
        message: '请求成功',
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 1,
        message: '请求失败',
        data: err,
      });
    });
});

module.exports = router;
