const express = require('express');
const nodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const user = require('../models/user.js');
const {resDataFormat, getUserInfo} = require('../assets/utils.js');

const checkNotLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;

// rsa解密
let rsakey = null;
fs.readFile(path.join(__dirname, '../assets/rsa_1024_priv.pem'), function(
  err,
  data
) {
  if (err) {
    return console.error(err);
  }
  const privKey = data.toString();
  rsakey = new nodeRSA(privKey);
  rsakey.setOptions({encryptionScheme: 'pkcs1'});
});

router.post('/register', checkNotLogin, (req, res) => {
  user
    .insert(req.body.username, req.body.password, req.body.email)
    .then(result => {
      res.send(resDataFormat(0, 'success', result));
    })
    .catch(err => {
      res.send(resDataFormat(1, err, {}));
    });
});

router.get('/getInfo', checkLogin, (req, res) => {
  res.send(resDataFormat(0, 'success', getUserInfo(req.session.user)));
});

router.post('/login', checkNotLogin, (req, res) => {
  user.findOne({username: req.body.username}).then(result => {
    if (result && result.username) {
      let password = rsakey.decrypt(req.body.password, 'utf8');
      let oriPassword = rsakey.decrypt(result.password, 'utf8');
      if (password === oriPassword) {
        // update logintime
        user.update(req.body.username, '', '', false, true);
        // TODO 不能删除对象属性？
        delete result.password;
        const userInfo = {
          username: result.username,
          email: result.email
        };
        req.session.user = userInfo;
        res.send(resDataFormat(0, 'success', userInfo));
      } else {
        res.send(resDataFormat(-1, '密码错误'));
      }
    } else {
      res.send(resDataFormat(-1, '用户名不存在'));
    }
  });
});

module.exports = router;
