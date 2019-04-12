const express = require('express');
const queryString = require('query-string');
const SourceMap = require('source-map');
const fs = require('fs');
const path = require('path');
const analytics = require('../models/analytics.js');
const jserror = require('../models/jserror.js');

const router = express.Router();

const { readFileSync } = fs;
const { SourceMapConsumer } = SourceMap;

function saveErrorLog(projectId, logId, happendTime, type, detail) {
  jserror
    .insert(projectId, logId, happendTime, type, detail)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

/* GET users listing. */
router.get('/add', (req, res) => {
  const parsed = queryString.parse(`${req.url.split('?')[1]}`);
  parsed.screenH = Number.parseInt(parsed.screenH, 10);
  parsed.screenW = Number.parseInt(parsed.screenW, 10);
  parsed.colorDepth = Number.parseInt(parsed.colorDepth, 10);
  parsed.happenTime = Number.parseInt(parsed.happenTime, 10);
  parsed.data = JSON.parse(parsed.data);

  analytics
    .insert(parsed)
    .then((result) => {
      res.send('ok');
      const { logInfo } = result.data;
      if (result.data.type === 'JS_ERROR' && logInfo.error_type === 'ERROR_RUNTIME') {
        const str = logInfo.source.slice(logInfo.source.lastIndexOf('/') + 1);
        const filepath = path.join(__dirname, `../uploads/${result.account}/${str}.map`);
        const rawSourceMap = JSON.parse(readFileSync(filepath, 'utf8'));
        new SourceMapConsumer(rawSourceMap).then((consumer) => {
          const pos = consumer.originalPositionFor({
            line: logInfo.lineno,
            column: logInfo.colno,
          });

          // 压缩前的所有源文件列表
          const { sources } = consumer;
          // 根据查到的source，到源文件列表中查找索引位置
          const posIndex = sources.indexOf(pos.source);
          // 到源码列表中查到源代码
          const smContent = consumer.sourcesContent[posIndex];
          // 将源代码串按"行结束标记"拆分为数组形式
          const rawLines = smContent.split(/\r?\n/g);
          // 输出源码行，因为数组索引从0开始，故行数需要-1
          let code = '';
          for (let i = -6; i < 5; i += 1) {
            if (i !== 0) {
              code += `<pre>${rawLines[pos.line + i]}</pre>`;
            } else {
              code += `<pre style="color: red;">${rawLines[pos.line + i]}</pre>`;
            }
          }
          pos.code = code;
          // TODO 保存错误
          // eslint-disable-next-line no-underscore-dangle
          saveErrorLog(result.account, result._id, result.happenTime, logInfo.error_type, pos);
          consumer.destroy();
        });
      }
    })
    .catch(() => {
      res.send('error');
    });
});

module.exports = router;
