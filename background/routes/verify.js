const express = require('express');
const router = express.Router();
const user = require('../models/user.js');

router.get('/email', (req, res) => {
  res.send('ok');
});

module.exports = router;
