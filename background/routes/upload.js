const express = require('express');
const multer = require('multer');
const async = require('async');
const fs = require('fs');

const router = express.Router();

const createFolder = (folder) => {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

// 检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

const uploadFolder = 'uploads/';

createFolder(uploadFolder);

// 通过 filename 属性定制
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const path = `${uploadFolder}/${req.body.id}`;
    if (!fsExistsSync(path)) {
      createFolder(path);
    }
    cb(null, path); // 保存的路径，备注：需要自己创建
  },
  filename(req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

function saveFile(file, callback) {
  callback(null, 'complete');
}

router.post('/jsmap', upload.array('file', 10), (req, res) => {
  console.log(req.files);
  const { files } = req;
  async.mapLimit(
    files,
    3,
    (file, callback) => {
      saveFile(file, callback);
    },
    (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.send('error');
        return;
      }
      res.send('ok');
    },
  );
});

module.exports = router;
