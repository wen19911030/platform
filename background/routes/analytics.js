const express = require('express');
const queryString = require('query-string');
const collect = require('../models/analytics.js');

const router = express.Router();

/* GET users listing. */
router.get('/add', (req, res) => {
    const parsed = queryString.parse(`${req.url.split('?')[1]}`);
    parsed.screenH = Number.parseInt(parsed.screenH, 10);
    parsed.screenW = Number.parseInt(parsed.screenW, 10);
    parsed.colorDepth = Number.parseInt(parsed.colorDepth, 10);
    parsed.happenTime = Number.parseInt(parsed.happenTime, 10);
    parsed.data = JSON.parse(parsed.data);

    collect.insert(parsed).then((result) => {
        res.send('ok');
    }).catch(err => {
        res.send('error');
    });
});

module.exports = router;
