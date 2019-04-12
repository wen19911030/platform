/**
 * 用户信息
 */
const mongoose = require('../services/db.js');

const JserrorSchema = new mongoose.Schema({
  projectId: { type: String }, // 项目编号
  logId: { type: String }, // 日志Id
  happendTime: { type: Number }, // 时间戳
  type: { type: String }, // 类型
  detail: { type: Object }, // 详情
  createtime: { type: Date }, // 创建时间
});

module.exports = JserrorSchema;
