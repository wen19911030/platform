const express = require('express');

const router = express.Router();
const user = require('../models/user.js');
const { resDataFormat } = require('../assets/utils.js');

router.get('/email/:username', (req, res) => {
  console.log(req.params.username);
  const username = Buffer.from(req.params.username, 'base64').toString();
  console.log(username);
  user
    .findOne({ username })
    .then((result) => {
      if (result && result.username) {
        if (result.emailIsVerify) {
          res.send(resDataFormat(0, 'email is verified'));
          return;
        }
        user.update(result.username, { emailIsVerify: true }).then(() => {
          res.send(resDataFormat(0, 'email is verified'));
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(resDataFormat(0, 'email is error'));
    });
});

module.exports = router;
