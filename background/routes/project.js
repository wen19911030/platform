const express = require('express');
const project = require('../models/project.js');
const { resDataFormat } = require('../assets/utils.js');

const router = express.Router();

router.post('/create', (req, res) => {
  const {
    projectName, projectDesc, projectType, creator,
  } = req.body;
  project
    .insert(projectName, projectDesc, projectType, creator)
    .then((result) => {
      res.send(resDataFormat(0, 'success', result));
    })
    .catch((err) => {
      res.send(resDataFormat(1, err.message, {}));
    });
});

router.post('/list', (req, res) => {
  const size = req.query.size || 20; // 分页参数
  let page = req.query.page || 1; // 当前页码
  // 条件查询参数
  const params = {
    projectName: req.body.projectName,
    projectType: req.body.projectType,
    creator: req.body.creator,
  };
  const mp = {};
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      mp[key] = params[key];
    }
  });
  if (mp.projectType === 'public') {
    delete mp.creator;
  }
  if (page < 1) {
    page = 1;
  }
  project
    .find(mp)
    .then((result) => {
      console.log(result);
      project.findByPageSize(mp, size, page).then((docs) => {
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

module.exports = router;
