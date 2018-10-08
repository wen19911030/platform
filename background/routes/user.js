const express = require('express');
const nodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const user = require('../models/user.js');
const {resDataFormat, getUserInfo, getRandom} = require('../assets/utils.js');
const sendMail = require('../services/email.js');
const {getDefaultLogger, getServiceLogger} = require('../services/log.js');

const checkNotLogin = require('../middlewares/check').checkNotLogin;
const checkLogin = require('../middlewares/check').checkLogin;

// esa加密
let rsaPubKey = null;
fs.readFile(path.join(__dirname, '../assets/rsa_1024_pub.pem'), function(
  err,
  data
) {
  if (err) {
    return console.error(err);
  }
  const pubKey = data.toString();
  rsaPubKey = new nodeRSA(pubKey);
  rsaPubKey.setOptions({encryptionScheme: 'pkcs1'});
});

// rsa解密
let rsaPrivKey = null;
fs.readFile(path.join(__dirname, '../assets/rsa_1024_priv.pem'), function(
  err,
  data
) {
  if (err) {
    return console.error(err);
  }
  const privKey = data.toString();
  rsaPrivKey = new nodeRSA(privKey);
  rsaPrivKey.setOptions({encryptionScheme: 'pkcs1'});
});

router.post('/register', checkNotLogin, (req, res) => {
  user
    .insert(req.body.username, req.body.password, req.body.email)
    .then(result => {
      // TODO 发送验证邮件
      sendMail(
        result.email,
        '验证邮件',
        `<p>这是来自****网站的验证邮件，请点击链接进行验证<a href="http://localhost:3000/verify/email/${Buffer.from(
          req.body.username
        ).toString('base64')}">http://localhost:3000/verify/email/${Buffer.from(
          req.body.username
        ).toString('base64')}</a></p>`
      ).then(result => {
        if (result === 'ok') {
          console.log(result);
        }
      });
      res.send(resDataFormat(0, 'success', result));
    })
    .catch(err => {
      console.log(err);
      res.send(resDataFormat(1, err, {}));
    });
});

router.post('/login', checkNotLogin, (req, res) => {
  user.findOne({username: req.body.username}).then(result => {
    if (result && result.username) {
      let password = rsaPrivKey.decrypt(req.body.password, 'utf8');
      let oriPassword = rsaPrivKey.decrypt(result.password, 'utf8');
      if (password === oriPassword) {
        // update logintime
        user.update(req.body.username, {logintime: Date.now()});
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

router.get('/getInfo', checkLogin, (req, res) => {
  res.send(resDataFormat(0, 'success', getUserInfo(req.session.user)));
});

router.post('/findPassword', checkNotLogin, (req, res) => {
  user.findOne({username: req.body.username}).then(result => {
    if (result && result.username) {
      let newPs = getRandom(8);
      let str = rsaPubKey.encrypt(newPs, 'base64');
      // 更新密码
      const p1 = user.update(req.body.username, {password, str});
      // 发送邮件
      const p2 = sendMail(
        result.email,
        '找回密码',
        `<p>新密码为${newPs}，登陆后请尽早更换密码。</p>`
      );
      Promise.all([p1, p2])
        .then(results => {
          res.send(resDataFormat(0, `新密码已发送到您的${result.email}邮箱里`));
        })
        .catch(err => {
          // TODO 错误处理，
          // 1：邮件发送成功，密码更新失败
          // 2: 邮件发送失败，密码更新成功
          console.log(err);
          res.send(resDataFormat(-1, '邮件发送失败'));
        });
    } else {
      res.send(resDataFormat(-1, '用户名不存在'));
    }
  });
});

module.exports = router;
