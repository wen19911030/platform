const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb://127.0.0.1:27017/nodejs");

db.on("error", function(error) {
	console.log(error);
});

// Schema 结构
const mongooseSchema = new mongoose.Schema({
	username: { type: String, default: "匿名用户" },
	password: { type: String },
	email: { type: String },
	time: { type: Date, default: Date.now }
});

const mongooseModel = db.model("mongoose", mongooseSchema);

// // 增加记录 基于model操作
// var doc = {username : 'admin', password : 'admin1', email : '310738057@qq.com'};
// mongooseModel.create(doc, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('save ok');
//     }
//     // 关闭数据库链接
//     db.close();
// });

function addUser(username, password, email) {
	const doc = { username, password, email };
	return new Promise((resolve, reject) => {
		mongooseModel.create(doc, function(error) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log("save ok");
				resolve("ok");
			}
			// 关闭数据库链接
			db.close();
		});
	});
}

function findUser(username, password, email) {}

module.exports = {
	addUser
};

// exports.mongooseSchema = mongooseSchema;
// exports.mongooseModel = mongooseModel;
