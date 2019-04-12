const express = require('express');
const multer = require('multer');
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

function fileFilter(req, file, cb) {
  if (req.body.id && req.body.username && file.originalname.slice(-7) === '.js.map') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({ storage, fileFilter });

router.post('/jsmap', upload.single('file'), (req, res) => {
  const { file } = req;
  if (file && file.size < 5 * 1024 * 1024) {
    res.json({
      status: 0,
      message: '上传成功',
      data: {},
    });
  } else {
    fs.unlink(file.path);
    res.json({
      status: 1,
      message: '上传失败',
      data: {},
    });
  }
});

module.exports = router;
