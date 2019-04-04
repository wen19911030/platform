const nodemailer = require('nodemailer');
const config = require('config-lite')(__dirname);

const mailTransport = nodemailer.createTransport({
  host: config.email.service,
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
const sendMail = (recipient, subject, html, text = '') => {
  const options = {
    from: config.email.user, // '"你的名字" <你的邮箱地址>',
    to: recipient, // '"用户1" <邮箱地址1>, "用户2" <邮箱地址2>',
    subject,
    text,
    html, // '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>'
    // attachments: [
    //   {
    //     filename: 'img1.png', // 改成你的附件名
    //     path: 'public/images/img1.png', // 改成你的附件路径
    //     cid: '00000001' // cid可被邮件使用
    //   },
    //   {
    //     filename: 'img2.png', // 改成你的附件名
    //     path: 'public/images/img2.png', // 改成你的附件路径
    //     cid: '00000002' // cid可被邮件使用
    //   }
    // ]
  };
  return new Promise((resolve, reject) => {
    mailTransport.sendMail(options, (error) => {
      if (error) {
        reject(error);
      }
      resolve('ok');
    });
  });
};

module.exports = sendMail;
