/**
 * 项目信息
 */
const mongoose = require('../services/db.js');

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String }, // 项目名称
  projectDesc: { type: String }, // 项目描述
  projectType: { type: String }, // 项目类型
  creator: { type: String }, //  创建者
  createtime: { type: Date }, // 创建时间
  updatetime: { type: Date }, // 更新时间
});

module.exports = ProjectSchema;
