/**
 * 用户信息
 */
const mongoose = require('../services/db.js');

const AnalyticsSchema = new mongoose.Schema({
  screenH: { type: Number }, // 屏幕高度
  screenW: { type: Number }, // 屏幕宽度
  colorDepth: { type: Number }, // 目标设备或缓冲器上的调色板的比特深度
  lang: { type: String }, //  邮箱是否验证
  sessionId: { type: String }, // 设备sessionId
  account: { type: String }, // 项目编号
  userId: { type: String }, // 用户账号
  domain: { type: String }, // 域名
  url: { type: String }, // 当前链接
  title: { type: String }, // 页面标题
  referrer: { type: String }, // 来源页面地址
  r: { type: String }, // 随机字符串
  data: { type: Object }, // 埋点数据
  createtime: { type: Date }, // 创建时间
  happenTime: { type: Number }, // 事件触发时间（时间戳）
});

module.exports = AnalyticsSchema;
